-- Create chat_sessions table
CREATE TABLE public.chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id UUID NOT NULL,
  guest_name TEXT,
  guest_email TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_message_at TIMESTAMPTZ DEFAULT now(),
  admin_user_id UUID REFERENCES auth.users(id)
);

-- Create chat_messages table
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('guest', 'admin')),
  sender_id UUID,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Chat Sessions RLS Policies
CREATE POLICY "Anyone can create chat sessions"
  ON public.chat_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view chat sessions"
  ON public.chat_sessions FOR SELECT
  USING (true);

CREATE POLICY "Admins can update chat sessions"
  ON public.chat_sessions FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

-- Chat Messages RLS Policies
CREATE POLICY "Anyone can send messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view messages"
  ON public.chat_messages FOR SELECT
  USING (true);

CREATE POLICY "Admins can update messages"
  ON public.chat_messages FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

-- Create indexes for performance
CREATE INDEX idx_chat_sessions_guest_id ON public.chat_sessions(guest_id);
CREATE INDEX idx_chat_sessions_status ON public.chat_sessions(status);
CREATE INDEX idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX idx_chat_messages_created_at ON public.chat_messages(created_at);

-- Enable realtime for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;

-- Create trigger for updated_at
CREATE TRIGGER update_chat_sessions_updated_at
  BEFORE UPDATE ON public.chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();