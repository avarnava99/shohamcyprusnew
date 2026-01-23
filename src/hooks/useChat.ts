import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface ChatSession {
  id: string;
  guest_id: string;
  guest_name: string | null;
  guest_email: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  last_message_at: string | null;
  admin_user_id: string | null;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  sender_type: 'guest' | 'admin';
  sender_id: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

const GUEST_ID_KEY = 'shoham_chat_guest_id';

export const getOrCreateGuestId = (): string => {
  let guestId = localStorage.getItem(GUEST_ID_KEY);
  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem(GUEST_ID_KEY, guestId);
  }
  return guestId;
};

export const useGuestChat = () => {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const guestId = getOrCreateGuestId();

  // Fetch or create session
  const initializeSession = useCallback(async () => {
    try {
      // Look for existing active session
      const { data: existingSessions, error: fetchError } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('guest_id', guestId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      if (existingSessions && existingSessions.length > 0) {
        setSession(existingSessions[0] as ChatSession);
        await fetchMessages(existingSessions[0].id);
      }
    } catch (error) {
      console.error('Error initializing chat session:', error);
    } finally {
      setLoading(false);
    }
  }, [guestId]);

  const fetchMessages = async (sessionId: string) => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return;
    }

    setMessages((data || []) as ChatMessage[]);
  };

  const createSession = async (guestName?: string, guestEmail?: string) => {
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        guest_id: guestId,
        guest_name: guestName || null,
        guest_email: guestEmail || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating session:', error);
      return null;
    }

    setSession(data as ChatSession);
    return data as ChatSession;
  };

  const sendMessage = async (message: string, guestName?: string, guestEmail?: string) => {
    setSending(true);
    try {
      let currentSession = session;

      // Create session if doesn't exist
      if (!currentSession) {
        currentSession = await createSession(guestName, guestEmail);
        if (!currentSession) {
          throw new Error('Failed to create session');
        }
      }

      // Send message
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          session_id: currentSession.id,
          sender_type: 'guest',
          sender_id: guestId,
          message,
        })
        .select()
        .single();

      if (error) throw error;

      // Update last_message_at
      await supabase
        .from('chat_sessions')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', currentSession.id);

      return data as ChatMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      return null;
    } finally {
      setSending(false);
    }
  };

  // Subscribe to realtime updates
  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  useEffect(() => {
    if (!session) return;

    const channel: RealtimeChannel = supabase
      .channel(`chat:${session.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${session.id}`,
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          setMessages((prev) => {
            // Avoid duplicates
            if (prev.some((m) => m.id === newMessage.id)) return prev;
            return [...prev, newMessage];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  return {
    session,
    messages,
    loading,
    sending,
    sendMessage,
    guestId,
  };
};

export const useAdminChat = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

  const fetchSessions = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .order('last_message_at', { ascending: false });

      if (error) throw error;
      setSessions((data || []) as ChatSession[]);

      // Fetch unread counts
      await fetchUnreadCounts((data || []) as ChatSession[]);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUnreadCounts = async (sessionsList: ChatSession[]) => {
    const counts: Record<string, number> = {};

    for (const session of sessionsList) {
      const { count, error } = await supabase
        .from('chat_messages')
        .select('*', { count: 'exact', head: true })
        .eq('session_id', session.id)
        .eq('sender_type', 'guest')
        .eq('is_read', false);

      if (!error) {
        counts[session.id] = count || 0;
      }
    }

    setUnreadCounts(counts);
  };

  const fetchMessages = async (sessionId: string): Promise<ChatMessage[]> => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return [];
    }

    return (data || []) as ChatMessage[];
  };

  const sendMessage = async (sessionId: string, message: string, adminId: string) => {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        sender_type: 'admin',
        sender_id: adminId,
        message,
      })
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      return null;
    }

    // Update last_message_at
    await supabase
      .from('chat_sessions')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', sessionId);

    return data as ChatMessage;
  };

  const markAsRead = async (sessionId: string) => {
    await supabase
      .from('chat_messages')
      .update({ is_read: true })
      .eq('session_id', sessionId)
      .eq('sender_type', 'guest')
      .eq('is_read', false);

    setUnreadCounts((prev) => ({ ...prev, [sessionId]: 0 }));
  };

  const closeSession = async (sessionId: string) => {
    const { error } = await supabase
      .from('chat_sessions')
      .update({ status: 'closed' })
      .eq('id', sessionId);

    if (error) {
      console.error('Error closing session:', error);
      return false;
    }

    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: 'closed' } : s))
    );
    return true;
  };

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // Subscribe to realtime updates for all sessions
  useEffect(() => {
    const channel = supabase
      .channel('admin-chat')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_sessions',
        },
        () => {
          fetchSessions();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          if (newMessage.sender_type === 'guest') {
            setUnreadCounts((prev) => ({
              ...prev,
              [newMessage.session_id]: (prev[newMessage.session_id] || 0) + 1,
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchSessions]);

  const totalUnread = Object.values(unreadCounts).reduce((a, b) => a + b, 0);

  return {
    sessions,
    loading,
    unreadCounts,
    totalUnread,
    fetchMessages,
    sendMessage,
    markAsRead,
    closeSession,
    refetch: fetchSessions,
  };
};
