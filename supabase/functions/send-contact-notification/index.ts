import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactNotificationRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  submissionType: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, subject, message, submissionType }: ContactNotificationRequest = await req.json();

    console.log("Sending contact notification email for:", { name, email, submissionType });

    // Determine form type for email template
    let formType = "Contact Form";
    if (submissionType === "quote") formType = "Quote Request";
    else if (submissionType === "container_order") formType = "Container Order";
    else if (submissionType === "container_pricing") formType = "Container Pricing Request";

    const emailSubject = subject 
      ? `[Shoham ${formType}] ${subject}` 
      : `[Shoham ${formType}] New submission from ${name}`;

    // Build email content with appropriate styling
    const emailContent = submissionType === "container_order" 
      ? buildContainerOrderEmail(name, email, phone, company, message)
      : buildStandardEmail(name, email, phone, company, subject, message, formType);

    const emailResponse = await resend.emails.send({
      from: "Shoham Website <notifications@shoham.com.cy>",
      to: ["websales@shoham.com.cy"],
      reply_to: email,
      subject: emailSubject,
      html: emailContent,
    });

function buildStandardEmail(name: string, email: string, phone: string | undefined, company: string | undefined, subject: string | undefined, message: string, formType: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #003366; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #003366; }
        .value { margin-top: 5px; }
        .message-box { background: white; padding: 15px; border-left: 4px solid #F97316; margin-top: 10px; }
        .footer { padding: 15px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New ${formType} Submission</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
          </div>
          ${phone ? `
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value"><a href="tel:${phone}">${phone}</a></div>
          </div>
          ` : ''}
          ${company ? `
          <div class="field">
            <div class="label">Company:</div>
            <div class="value">${company}</div>
          </div>
          ` : ''}
          ${subject ? `
          <div class="field">
            <div class="label">Subject:</div>
            <div class="value">${subject}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Message:</div>
            <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">
          This email was sent from the Shoham website contact form.
        </div>
      </div>
    </body>
    </html>
  `;
}

function buildContainerOrderEmail(name: string, email: string, phone: string | undefined, company: string | undefined, message: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #003366; color: white; padding: 20px; text-align: center; }
        .header h1 { margin: 0; }
        .badge { display: inline-block; background: #F97316; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; margin-top: 10px; }
        .content { padding: 20px; background: #f9f9f9; }
        .section { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; }
        .section-title { font-weight: bold; color: #003366; font-size: 14px; margin-bottom: 10px; border-bottom: 2px solid #F97316; padding-bottom: 5px; }
        .field { margin-bottom: 8px; }
        .label { font-weight: bold; color: #666; font-size: 12px; }
        .value { color: #333; }
        .map-link { display: inline-block; background: #003366; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; margin-top: 10px; }
        .message-box { background: #fff; padding: 15px; border-left: 4px solid #F97316; margin-top: 10px; white-space: pre-line; }
        .footer { padding: 15px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚢 New Container Order</h1>
          <span class="badge">Requires Follow-up</span>
        </div>
        <div class="content">
          <div class="section">
            <div class="section-title">📞 Contact Information</div>
            <div class="field">
              <span class="label">Name:</span> <span class="value">${name}</span>
            </div>
            <div class="field">
              <span class="label">Email:</span> <span class="value"><a href="mailto:${email}">${email}</a></span>
            </div>
            ${phone ? `<div class="field"><span class="label">Phone:</span> <span class="value"><a href="tel:${phone}">${phone}</a></span></div>` : ''}
            ${company ? `<div class="field"><span class="label">Company:</span> <span class="value">${company}</span></div>` : ''}
          </div>
          
          <div class="section">
            <div class="section-title">📋 Order Details</div>
            <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">
          This container order was submitted from the Shoham website.
        </div>
      </div>
    </body>
    </html>
  `;
}

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse.data }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
