import { useState } from "react";
import { format } from "date-fns";
import { Mail, Phone, Building2, Calendar, MessageSquare, CheckCircle, Clock, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  submission_type: string;
  status: string;
  created_at: string;
}

interface SubmissionCardProps {
  submission: Submission;
  onStatusChange: () => void;
}

const SubmissionCard = ({ submission, onStatusChange }: SubmissionCardProps) => {
  const [updating, setUpdating] = useState(false);

  const updateStatus = async (newStatus: string) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ status: newStatus })
        .eq("id", submission.id);

      if (error) throw error;
      
      toast.success(`Status updated to ${newStatus}`);
      onStatusChange();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500 hover:bg-blue-600"><Clock className="h-3 w-3 mr-1" /> New</Badge>;
      case "read":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600"><CheckCircle className="h-3 w-3 mr-1" /> Read</Badge>;
      case "replied":
        return <Badge className="bg-green-500 hover:bg-green-600"><Reply className="h-3 w-3 mr-1" /> Replied</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "quote":
        return <Badge variant="outline" className="border-accent text-accent">Quote Request</Badge>;
      case "container_pricing":
        return <Badge variant="outline" className="border-purple-500 text-purple-500">Container Pricing</Badge>;
      default:
        return <Badge variant="outline">Contact</Badge>;
    }
  };

  return (
    <Card className={`${submission.status === "new" ? "border-l-4 border-l-blue-500" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{submission.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {format(new Date(submission.created_at), "MMM dd, yyyy 'at' HH:mm")}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getTypeBadge(submission.submission_type)}
            {getStatusBadge(submission.status)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${submission.email}`} className="text-primary hover:underline">
              {submission.email}
            </a>
          </div>
          {submission.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${submission.phone}`} className="hover:underline">
                {submission.phone}
              </a>
            </div>
          )}
          {submission.company && (
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{submission.company}</span>
            </div>
          )}
        </div>

        {submission.subject && (
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Subject</div>
            <div className="text-sm">{submission.subject}</div>
          </div>
        )}

        <div>
          <div className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
            <MessageSquare className="h-4 w-4" /> Message
          </div>
          <div className="text-sm bg-muted p-3 rounded-md whitespace-pre-wrap">
            {submission.message}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          {submission.status === "new" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateStatus("read")}
              disabled={updating}
            >
              Mark as Read
            </Button>
          )}
          {submission.status !== "replied" && (
            <Button
              size="sm"
              onClick={() => updateStatus("replied")}
              disabled={updating}
            >
              Mark as Replied
            </Button>
          )}
          <Button
            size="sm"
            variant="secondary"
            asChild
          >
            <a href={`mailto:${submission.email}?subject=Re: ${submission.subject || 'Your inquiry'}`}>
              Reply via Email
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionCard;
