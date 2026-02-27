

# Enhance the My Account Page

## Overview
The current account page only has a basic profile form. We'll expand it into a tabbed dashboard with profile management, submission history, container order history, and a password change section -- giving users a much richer account experience.

## What You'll Get

1. **Tabbed layout** with 3 sections: Profile, My Submissions, and Security
2. **Profile tab** (current form, improved with account info like member-since date)
3. **My Submissions tab** showing:
   - Contact form submissions and quote requests the user has made (matched by email)
   - Container orders the user has placed (matched by email)
   - Each with date, status badge, and summary
4. **Security tab** with a password change form

## Database Changes

New RLS policies are needed so users can see their own submissions by email:

- **contact_submissions**: Add SELECT policy: `auth.jwt()->>'email' = email`
- **container_orders**: Add SELECT policy: `auth.jwt()->>'email' = email`

This lets authenticated users view only their own submissions without exposing anyone else's data.

## Technical Details

### 1. Database migration
Add two new RLS policies allowing users to read their own rows from `contact_submissions` and `container_orders` by matching their auth email to the `email` column.

### 2. Rebuild `src/pages/Account.tsx`
- Use Tabs component (already available via shadcn) for Profile / My Submissions / Security
- **Profile tab**: Keep existing form, add "Member since" date from `profiles.created_at`
- **My Submissions tab**:
  - Fetch from `contact_submissions` where email matches
  - Fetch from `container_orders` where email matches
  - Display as card lists with date, type/subject, status badge (color-coded: new/pending/completed)
  - "No submissions yet" empty state with link to Contact page
- **Security tab**:
  - Password change form (current password not needed with Supabase `updateUser`)
  - New password + confirm password fields
  - Uses `supabase.auth.updateUser({ password })` 

### 3. Files changed
- `src/pages/Account.tsx` -- major rewrite with tabs and new sections
- Database migration -- 2 new RLS policies

