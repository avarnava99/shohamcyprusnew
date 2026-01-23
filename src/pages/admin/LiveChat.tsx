import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAdminChat, ChatSession, ChatMessage } from '@/hooks/useChat';
import { supabase } from '@/integrations/supabase/client';
import { MessageCircle, Send, User, Clock, X, Archive } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

const LiveChat = () => {
  const {
    sessions,
    loading,
    unreadCounts,
    fetchMessages,
    sendMessage,
    markAsRead,
    closeSession,
  } = useAdminChat();

  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'closed'>('active');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setAdminId(data.user.id);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectSession = async (session: ChatSession) => {
    setSelectedSession(session);
    const msgs = await fetchMessages(session.id);
    setMessages(msgs);
    await markAsRead(session.id);
  };

  // Subscribe to realtime updates for selected session
  useEffect(() => {
    if (!selectedSession) return;

    const channel = supabase
      .channel(`admin-chat:${selectedSession.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${selectedSession.id}`,
        },
        (payload) => {
          const newMsg = payload.new as ChatMessage;
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          // Mark as read immediately if it's a guest message
          if (newMsg.sender_type === 'guest') {
            markAsRead(selectedSession.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedSession, markAsRead]);

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedSession || !adminId) return;

    setSending(true);
    const result = await sendMessage(selectedSession.id, newMessage.trim(), adminId);
    
    if (result) {
      setNewMessage('');
    } else {
      toast.error('Failed to send message');
    }
    setSending(false);
  };

  const handleCloseSession = async () => {
    if (!selectedSession) return;
    
    const success = await closeSession(selectedSession.id);
    if (success) {
      toast.success('Chat session closed');
      setSelectedSession(null);
      setMessages([]);
    } else {
      toast.error('Failed to close session');
    }
  };

  const filteredSessions = sessions.filter((s) => {
    if (filter === 'active') return s.status === 'active';
    if (filter === 'closed') return s.status === 'closed';
    return true;
  });

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Chat</h1>
          <p className="text-muted-foreground mt-1">
            Manage conversations with website visitors
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sessions List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Conversations</CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant={filter === 'active' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('active')}
                  >
                    Active
                  </Button>
                  <Button
                    variant={filter === 'closed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('closed')}
                  >
                    Closed
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                ) : filteredSessions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <MessageCircle className="h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      No {filter === 'all' ? '' : filter} conversations
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredSessions.map((session) => (
                      <button
                        key={session.id}
                        onClick={() => handleSelectSession(session)}
                        className={cn(
                          'w-full p-4 text-left transition-colors hover:bg-muted/50',
                          selectedSession?.id === session.id && 'bg-muted'
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {session.guest_name || 'Anonymous Visitor'}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {session.guest_email || 'No email provided'}
                              </p>
                            </div>
                          </div>
                          {(unreadCounts[session.id] || 0) > 0 && (
                            <Badge variant="default" className="shrink-0">
                              {unreadCounts[session.id]}
                            </Badge>
                          )}
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {session.last_message_at
                            ? formatDistanceToNow(new Date(session.last_message_at), {
                                addSuffix: true,
                              })
                            : 'No messages yet'}
                        </div>
                        {session.status === 'closed' && (
                          <Badge variant="secondary" className="mt-2">
                            Closed
                          </Badge>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2">
            {selectedSession ? (
              <>
                <CardHeader className="border-b pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {selectedSession.guest_name || 'Anonymous Visitor'}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {selectedSession.guest_email || 'No email provided'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {selectedSession.status === 'active' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCloseSession}
                        >
                          <Archive className="mr-1 h-4 w-4" />
                          Close Chat
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedSession(null);
                          setMessages([]);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex h-[400px] flex-col p-0">
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    {messages.length === 0 ? (
                      <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-muted-foreground">
                          No messages yet
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={cn(
                              'flex',
                              msg.sender_type === 'admin'
                                ? 'justify-end'
                                : 'justify-start'
                            )}
                          >
                            <div
                              className={cn(
                                'max-w-[70%] rounded-lg px-3 py-2',
                                msg.sender_type === 'admin'
                                  ? 'bg-primary text-white'
                                  : 'bg-muted text-foreground'
                              )}
                            >
                              <p className="text-sm whitespace-pre-wrap">
                                {msg.message}
                              </p>
                              <p
                                className={cn(
                                  'mt-1 text-xs',
                                  msg.sender_type === 'admin'
                                    ? 'text-white/70'
                                    : 'text-muted-foreground'
                                )}
                              >
                                {formatTime(msg.created_at)}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </ScrollArea>

                  {/* Input */}
                  {selectedSession.status === 'active' && (
                    <div className="border-t p-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type your reply..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSend();
                            }
                          }}
                          disabled={sending}
                          className="flex-1"
                        />
                        <Button
                          onClick={handleSend}
                          disabled={!newMessage.trim() || sending}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </>
            ) : (
              <div className="flex h-[500px] flex-col items-center justify-center">
                <MessageCircle className="h-16 w-16 text-muted-foreground/30" />
                <p className="mt-4 text-lg font-medium text-muted-foreground">
                  Select a conversation
                </p>
                <p className="text-sm text-muted-foreground">
                  Choose a chat from the list to view messages
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default LiveChat;
