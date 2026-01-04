# API Gateway & Rate Limiting System

> A production-style backend project that simulates a real API Gateway. It serves as the entry point for incoming traffic, handling stateless authentication, request throttling, and abuse prevention using JWTs and Redis atomic counters.

## Features

* **Stateless Authentication:** Secure user verification using JSON Web Tokens (JWT).
* **High-Performance Rate Limiting:** Utilizes Redis `INCR` and TTL for atomic, concurrency-safe request counting.
* **Per-User Isolation:** Limits are enforced on a per-user basis rather than per-IP, ensuring fair usage.
* **Traffic Control:** automatically rejects excess traffic with HTTP `429 Too Many Requests` status.
* **Middleware Pipeline:** modular Express.js architecture separating auth, limiting, and business logic.

## Tech Stack

* **Runtime:** Node.js & Express.js
* **Caching/Limiting:** Redis (Upstash)
* **Database:** MongoDB (User persistence)
* **Authentication:** JWT (JSON Web Tokens)

## Prerequisites

Before running this project, ensure you have the following:

* Node.js (v14+)
* A MongoDB connection string (Local or Atlas)
* A Redis instance (Local or Upstash)

## Installation

1. **Clone the repository:**
```bash
git clone https://github.com/DarshanTate/api-gateway-rate-limiter.git

```


2. **Navigate to the backend directory:**
```bash
cd api-gateway-rate-limiter/backend

```


3. **Install dependencies:**
```bash
npm install

```



## Environment Variables

Create a `.env` file in the `backend` directory and add the following configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
RATE_LIMIT=10
REDIS_URL=your_redis_url
REDIS_TOKEN=your_redis_token

```

## Usage

1. **Start the backend server:**
```bash
npm run dev

```


The server will start at `http://localhost:5000`.

2. **Launch the Client:**
Open `frontend/index.html` in your browser (using Live Server is recommended).

4. **Test the Limits:**
* Log in to generate a token.
* Repeatedly click "Call Protected API."
* Once the limit (e.g., 10 requests) is exceeded within the TTL window (60s), the server will return a `429` error.





---

