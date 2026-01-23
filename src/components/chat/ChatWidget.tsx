import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGuestChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { session, messages, loading, sending, sendMessage } = useGuestChat();

  useEffect(() => {
    if (session) {
      setShowIntro(false);
    }
  }, [session]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    const result = await sendMessage(
      message.trim(),
      showIntro ? guestName : undefined,
      showIntro ? guestEmail : undefined
    );
    
    if (result) {
      setMessage('');
      setShowIntro(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Unread count for admin messages
  const unreadCount = messages.filter(
    (m) => m.sender_type === 'admin' && !m.is_read
  ).length;

  return (
    <>
      {/* Chat Bubble */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all hover:scale-105 hover:bg-primary/90',
          isOpen && 'hidden'
        )}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          'fixed bottom-6 right-6 z-50 flex w-80 flex-col overflow-hidden rounded-xl bg-background shadow-2xl transition-all duration-300 sm:w-96',
          isOpen ? 'h-[500px] opacity-100' : 'h-0 opacity-0 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-primary px-4 py-3 text-white">
          <div>
            <h3 className="font-semibold">Chat with us</h3>
            <p className="text-xs text-white/80">We typically reply within minutes</p>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : (
            <>
              {/* Welcome message */}
              {messages.length === 0 && (
                <div className="mb-4 rounded-lg bg-muted p-3">
                  <p className="text-sm text-muted-foreground">
                    👋 Hi there! How can we help you today? Send us a message and we'll respond as soon as possible.
                  </p>
                </div>
              )}

              {/* Intro form for first message */}
              {showIntro && messages.length === 0 && (
                <div className="mb-4 space-y-2">
                  <Input
                    placeholder="Your name (optional)"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="text-sm"
                  />
                  <Input
                    placeholder="Your email (optional)"
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="text-sm"
                  />
                </div>
              )}

              {/* Message list */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'mb-3 flex',
                    msg.sender_type === 'guest' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg px-3 py-2',
                      msg.sender_type === 'guest'
                        ? 'bg-primary text-white'
                        : 'bg-muted text-foreground'
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                    <p
                      className={cn(
                        'mt-1 text-xs',
                        msg.sender_type === 'guest'
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
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t bg-background p-3">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={sending}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!message.trim() || sending}
              size="icon"
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
