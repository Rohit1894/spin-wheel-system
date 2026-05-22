## Realtime Spin Wheel Multiplayer Backend

A realtime multiplayer spin wheel backend system built using Node.js, Express, MongoDB, and Socket.IO.

The system supports realtime gameplay, automatic wheel lifecycle management, fair elimination logic, wallet transactions, winner payouts, and refund handling.


## Features

- JWT Authentication
- Wallet System
- Transaction Ledger
- Realtime Socket.IO Events
- Automatic Wheel Worker
- Fair Elimination Engine
- Winner Payout System
- Refund Handling
- Edge Case Protection


## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- bcryptjs


## Architecture

Client

   ↓
   
Express + Socket.IO Server

   ↓
   
MongoDB


## Folder Structure

src/

 ├── controllers
 
 ├── services
 
 ├── routes
 
 ├── middleware
 
 ├── models
 
 ├── jobs
 
 ├── socket
 
 ├── utils
 
 └── validators


## API Documentation

POST /auth/register

POST /auth/login

POST /auth/logout

GET  /test/me

POST /wheel/create

POST /wheel/:id/join

GET  /wheel/active

GET  /health


## Socket Events

- user-joined
- wheel-started
- user-eliminated
- winner-announced
- wheel-aborted

## edge cases
- duplicate joins
- insufficient balance
- invalid tokens
- inactive wheels
- automatic refunds
- single active wheel restriction
- realtime room isolation



## Setup

npm install

npm run dev


## Environment Variables


PORT=

MONGO_URI=

JWT_SECRET=


