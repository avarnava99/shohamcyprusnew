

# Build User Account / Profile Page

## Overview
Create a user profile page at `/account` where logged-in users can view and edit their profile information (full name, phone, company). The page will read from and write to the existing `profiles` table. A link to the account page will be added in the TopBar for logged-in users.

## Changes

### 1. Create `src/pages/Account.tsx`
A new page using the existing Layout component with:
- Hero banner matching other pages' style
- Profile form with fields: Full Name, Email (read-only from auth), Phone, Company
- Load current profile data on mount from the `profiles` table
- Save button that updates the `profiles` table
- Redirect to `/login` if user is not authenticated
- Success/error toast notifications on save

### 2. Update `src/App.tsx`
- Import the new Account page
- Add route: `<Route path="/account" element={<Account />} />`

### 3. Update `src/components/layout/TopBar.tsx`
- Add a "My Account" link (using the User icon) next to the user's email for logged-in users
- Links to `/account`

## Technical Notes
- The `profiles` table already exists with columns: `full_name`, `phone`, `company`, `avatar_url`
- RLS policies already allow users to view/update their own profile
- The `handle_new_user` trigger already creates a profile row on signup
- No database changes needed

