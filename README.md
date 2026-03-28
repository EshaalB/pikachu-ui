# Pikachu UI

**A dynamic, interactive Pokémon collection dashboard built with React and Express.**

## Features

- **Authentication**: Secure user registration and login with JWT-based sessions.
- **Dashboard**: A vibrant, Pokémon-themed interface for managing your collection.
- **Carousel View**: Browse your Pokémon in a unique, rotating carousel.
- **Real-time Updates**: Add and delete Pokémon instantly without page reloads.
- **Responsive Design**: Built with modern CSS and a mobile-first mindset.

## Tech Stack

- **Frontend**: React, Vite, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd creature-collector
    ```

2.  **Backend Setup**

    ```bash
    cd creature-collector
    npm install
    # Create a .env file in the root directory
    cp .env.example .env
    # Edit .env with your MongoDB URI and SESSION_SECRET
    npm start
    ```

3.  **Frontend Setup**
    ```bash
    cd ../creature-collector-client
    npm install
    npm run dev
    ```

## Usage

1.  Open your browser and navigate to `http://localhost:5173`.
2.  Register a new account or log in.
3.  Start collecting Pokémon!

## Project Structure

```
creature-collector/
├── controllers/      # Business logic
├── models/           # Mongoose schemas
├── routes/           # API routes
├── server.js         # Express server entry point

creature-collector-client/
├── src/
│   ├── components/   # React components
│   ├── api/          # API client
│   └── App.jsx       # Main application
└── public/           # Static assets
```
