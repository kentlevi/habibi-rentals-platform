# Habibi & Shaun Rentals Siquijor

A Vite + React rental booking site for Habibi & Shaun Rentals Siquijor, with a private admin area for booking inquiries and fleet availability.

## Demo Goals

- Show a polished public rental website for tourists.
- Route Facebook/social visitors into clearer booking inquiries.
- Display fleet pricing, requirements, pickup points, and rental notes before chat.
- Provide an admin-dashboard concept for booking requests and daily pickups.

## Local Run

```bash
npm install
npm run dev
```

Open:

- Public site: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`
- Admin dashboard: `http://localhost:3000/admin`

## Demo Walkthrough

1. Start at the hero and explain the problem: guests message from Facebook without complete details.
2. Use the booking widget to select vehicle type, pickup location, and dates.
3. Show the filtered fleet and explain visible pricing, seats, fuel policy, and requirements.
4. Open a vehicle detail modal and click `Start Booking Request`.
5. Fill the inquiry form and show the generated WhatsApp handoff.
6. Open `/admin/login` and show the private admin area.
7. Show the Website Inquiry Inbox and refresh it after a public form submission.
8. In the admin dashboard, change request statuses and fleet availability.
9. Scroll through How It Works and FAQ to show customer-facing rental guidance.

## Deployment

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

For Vercel, `vercel.json` rewrites all routes to `index.html` so `/admin` and `/admin/login` work on refresh.

## Still Needs Real Business Inputs

- Real phone and WhatsApp number.
- Real email.
- Real admin emails.
- Final rental rates and policies.
- Real pickup address and service areas.
- Real customer testimonials or approved Facebook review screenshots.
- Firestore persistence for inquiry records, request statuses, and fleet availability controls.

## Data Notes

The current version stores inquiry submissions, request statuses, and fleet availability changes in browser `localStorage`
through `src/lib/operations.ts`. This keeps the site interactive without requiring production Firestore writes yet.

When moving to production, replace the local persistence functions with Firestore reads/writes. `firestore.rules`
already includes a future `inquiries` collection shape for public create-only inquiry submissions plus admin-only reads and updates.
