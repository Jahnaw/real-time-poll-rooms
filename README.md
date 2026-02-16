Real-Time Poll Rooms
A full-stack web application that allows users to create polls, share them via public links, and view real-time voting results.

🚀 Features
Create polls with multiple options
Shareable public poll links
Real-time vote updates using WebSockets
Persistent data storage with MongoDB
Basic fairness and anti-abuse mechanisms

🛠 Tech Stack
Frontend: React (Vite)
Backend: Node.js, Express
Database: MongoDB
Real-Time: Socket.IO

Deployment: Vercel (frontend), Render (backend)

⚖️ Fairness / Anti-Abuse Mechanisms
1. Browser-Level Restriction
The frontend uses browser storage to prevent repeated voting from the same browser session and disables voting after a submission.

2. Server-Side Validation
All votes are validated on the backend to prevent duplicate or invalid submissions through direct API calls or client-side manipulation.

🧪 Edge Case Handling
Validation for poll creation and voting inputs
Graceful handling of invalid poll IDs
Duplicate vote prevention
Real-time synchronization across clients
Support for direct page reloads on poll URLs

⚠️ Known Limitations
The backend is deployed on a free-tier hosting service and may experience short cold-start delays after inactivity.
Browser-based restrictions can be bypassed by clearing storage or switching browsers.
The application does not include user authentication and is designed as an anonymous polling system.

📎 Links
Live App: real-time-poll-rooms-nu.vercel.app
Backend API: real-time-poll-backend.onrender.com

📌 Notes
This project was built as part of a full-stack assignment focusing on correctness, real-time behavior, and thoughtful handling of edge cases.
