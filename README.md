# Real-Time Poll Rooms

A full-stack web application that allows users to create polls, share them via public links, and view real-time voting results.

## Features

- Create polls with multiple options

- Shareable public poll links

- Real-time vote updates using WebSockets

- Persistent data storage with MongoDB

- Basic fairness and anti-abuse mechanisms

## Tech Stack

- Frontend: React (Vite)

- Backend: Node.js, Express

- Database: MongoDB

- Real-Time: Socket.IO

## Deployment: 

Vercel (frontend), Render (backend)

## Fairness / Anti-Abuse Mechanisms Implemented

**1. Browser-Level Voting Restriction (Frontend – localStorage)**

The frontend uses localStorage to record whether a user has already voted in a specific poll. After a vote is submitted, a flag (voted_<pollId>) is stored in the browser. On subsequent visits or page refreshes, the application detects this flag and disables further voting attempts while displaying appropriate feedback to the user.

**Purpose:**
This mechanism prevents repeated voting through page refreshes or accidental multiple submissions from the same browser session and provides immediate feedback at the UI level.

**2. Server-Side Validation (Backend Enforcement)**

All voting actions are validated on the backend before being accepted. The server verifies each vote request to ensure that duplicate or invalid voting attempts are rejected, preventing manipulation through direct API calls or frontend tampering.

**Purpose:**
This ensures that vote integrity does not rely solely on client-side checks and that all votes are validated authoritatively on the server.

## Edge Cases Handled

The application includes explicit handling for multiple edge cases to ensure correctness and stability:

- Poll creation requires a valid question and a minimum of two options.

- Invalid or non-existent poll IDs return appropriate error responses.

- Invalid vote option indices are rejected by the backend.

- Duplicate voting attempts are blocked through frontend state and server-side validation.

- Page refreshes do not reset the voting state for the same browser.

- Real-time vote updates are synchronized across all connected clients.

- Client-side routing issues on direct page reloads (e.g., /poll/:id) are handled using proper deployment rewrites.

## Known Limitations

- The application is deployed using free-tier hosting services (Vercel for the frontend and Render for the backend). As a result, the backend may experience a short cold-start delay after periods of inactivity.

- Browser-based voting restrictions rely on local storage and can be bypassed by switching browsers or clearing storage. This is a known limitation of client-side mechanisms.

- The application is intentionally designed as an anonymous poll system and does not include user authentication, which limits stronger identity-based abuse prevention but keeps the platform simple and accessible for this assignment.

## Links

Live App: real-time-poll-rooms-nu.vercel.app

Backend API: real-time-poll-backend.onrender.com

## Notes

- Real-time functionality is implemented using WebSockets (Socket.IO).

- All poll data is persistently stored in MongoDB.

- Polls are accessible through public, shareable links without requiring user authentication.

