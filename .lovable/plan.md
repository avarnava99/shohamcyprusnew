

# Plan: Berth Planning Schedule via Email-to-Database Pipeline

## Overview
Set up a system where you forward the DP World berth planning PDF to a Resend inbound email address. An edge function receives the webhook, fetches the PDF attachment, parses the vessel data, and stores it in the database. The Limassol Port Schedule page will display this data in a clean, auto-refreshing table.

---

## How It Works (Simple Flow)

1. You forward the berth planning PDF (2-3 times daily) to a dedicated email address (e.g. `berth@yourdomain.resend.app` or your custom domain)
2. Resend receives the email and sends a webhook notification to our edge function
3. The edge function fetches the PDF attachment from Resend, parses the vessel table data, and saves it to the database
4. The Limassol Port Schedule page automatically shows the latest berthing schedule in a nice table

---

## Setup Required on Resend Dashboard

Before implementation, you will need to:

1. Go to **Resend Dashboard > Receiving Emails**
2. Note your Resend inbound email address (e.g. `anything@yourdomain.resend.app`)
3. Go to **Webhooks > Add Webhook**
4. Set the endpoint URL to the edge function URL (we will provide this after creating it)
5. Select the `email.received` event type

---

## Implementation Steps

### Step 1: Create Database Table

New table `berth_schedule` to store parsed vessel movements:

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| day | text | Day of week (WED, THU, etc.) |
| vessel_name | text | Vessel name |
| voyage_no | text | Voyage number |
| movement | text | IN/OUT + PORT/STBD |
| quay | text | NORTH, CNTR, EAST, etc. |
| pilot_time | text | Pilot station time |
| all_fast | text | All fast time (for arrivals) |
| tug1 | text | Primary tug |
| tug2 | text | Secondary tug |
| agent | text | Ship agent |
| loa | text | Length overall |
| comments | text | Additional comments |
| period_start | timestamptz | Schedule period start |
| period_end | timestamptz | Schedule period end |
| received_at | timestamptz | When the email was received |
| created_at | timestamptz | Record creation time |

RLS: Public read access, service role write access.

### Step 2: Create Edge Function `receive-berth-schedule`

This edge function will:
1. Receive the Resend `email.received` webhook event
2. Use the Resend Attachments API to fetch the PDF attachment
3. Use Lovable AI (Gemini) to parse the PDF content into structured JSON -- since the PDF has a complex table layout, AI-based extraction will be more reliable than manual parsing
4. Insert the parsed rows into the `berth_schedule` table
5. Delete old records (keep only the latest schedule)

### Step 3: Update Limassol Port Schedule Page

Replace the current "link to InfoGate" placeholder with a live berthing schedule table showing:
- A responsive table with vessel name, movement (IN/OUT), quay, times, tugs, agent
- Color-coded badges for arrivals (green) vs departures (red)
- "Last updated" timestamp showing when the schedule was last received
- The schedule period displayed prominently
- Keep the InfoGate external link as a secondary reference
- Auto-refresh via React Query with a 5-minute refetch interval

### Step 4: Add Route for Berth Schedule (optional)

Could also add a dedicated "Berthing Schedule" card on the Ports of Cyprus index page, or enhance the existing Limassol Port Schedule entry.

---

## Files to Create/Modify

| File | Change |
|------|--------|
| `supabase/functions/receive-berth-schedule/index.ts` | New edge function - webhook receiver |
| `supabase/config.toml` | Add function config (verify_jwt = false) |
| Database migration | New `berth_schedule` table |
| `src/components/port/LimassolScheduleDetails.tsx` | Replace with live berthing table |
| `src/components/port/BerthScheduleTable.tsx` | New component for the schedule table |

---

## Technical Details

### Edge Function: `receive-berth-schedule`

```text
1. Receive POST from Resend webhook
2. Validate event.type === "email.received"
3. Call Resend API: GET /emails/{email_id}/attachments
4. Find PDF attachment, download via download_url
5. Send PDF content to Gemini AI for structured extraction
6. Parse AI response into berth_schedule rows
7. Delete previous schedule data
8. Insert new rows into berth_schedule table
9. Return 200 OK
```

### AI-Powered PDF Parsing

The berth planning PDF has a complex multi-column table. Rather than building a fragile regex parser, we will use Gemini (available via Lovable AI) to extract the data reliably. The prompt will instruct it to return a structured JSON array of vessel movements.

### Frontend Table Design

```text
+------------------------------------------------------------------+
|  Berth Planning Schedule                    Last updated: 15:28  |
|  Period: 11/02/2026 16:00 - 12/02/2026 23:59                    |
+------------------------------------------------------------------+
| Day | Vessel         | IN/OUT | Quay  | Pilot | Agent    | LOA  |
|-----|----------------|--------|-------|-------|----------|------|
| WED | PATRIS         |  OUT   | NORTH | 17:00 | Salamis  | 193  |
| WED | LUCY BORCHARD  |  OUT   | CNTR  | 17:45 | THE CYPR | 133  |
| WED | MSC ELMA       |  IN    | CNTR  | 18:15 | Mediterr | 300  |
| THU | MEDKON ONO     |  IN    | CNTR  | 06:00 | Feeder S | 148  |
+------------------------------------------------------------------+
```

- IN movements shown with a green badge
- OUT movements shown with a red/orange badge
- Responsive: on mobile, shows a card layout instead of a table
- "Berth Planner" name shown as source attribution

