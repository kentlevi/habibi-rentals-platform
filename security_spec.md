# Security Spec

## Data Invariants
- A vehicle can be read by anyone, but created/updated only by admins.
- A reservation belongs to a vehicle and a user.
- A reservation can be read by its owner or the admin.
- A reservation can be created by a user, but they cannot double-book a vehicle (complex to enforce fully in rules without transaction/cloud fn, but we can do our best with status).
- A reservation's user must match the auth.uid.

## The "Dirty Dozen" Payloads
1. Create vehicle as non-admin (Should fail)
2. Update vehicle price as non-admin (Should fail)
3. Write reservation for another user's uid (Should fail)
4. Reservation with missing required fields (Should fail)
5. Reservation with invalid status (Should fail)
6. Read someone else's reservation (Should fail)
7. Update someone else's reservation (Should fail)
8. Update reservation status bypass (Should fail if not admin or owner)
9. Delete vehicle as non-admin (Should fail)
10. Create reservation with additional garbage fields (Should fail)
11. Update reservation without providing all required fields in the change (Should fail if schema violated)
12. Reservation start_date not matching a valid datetime (Should fail if we had strict validation, though string size is checked).
