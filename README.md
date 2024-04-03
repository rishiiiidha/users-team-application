# Users Team Application

This application empowers individuals to connect across domains, form teams, and collaborate effectively. It fosters innovation and growth through a diverse talent pool.

## Technology Stack

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** React, TailwindCSS

## Deployment

- **Backend:** Render
- **Frontend:** Vercel

## Endpoints

**Base URL:** https://team-users-application.onrender.com/api/users

### Users

- GET /users: Retrieves all users with optional filtering and searching.
  - Query parameters: name, domain, gender, available
- GET /users/:id: Retrieves a specific user by ID.
- POST /users: Creates a new user.
- PUT /users/:id: Updates an existing user.
- DELETE /users/:id: Deletes a user.

### Teams

- GET /teams: Retrieves all teams.
- GET /teams/:id: Retrieves a specific team by ID.
- POST /teams: Creates a new team.
- PUT /teams/:id: Updates an existing team.
- DELETE /teams/:id: Deletes a team.

## Frontend

- URL: [https://team-users-application.vercel.app/](https://team-users-application.vercel.app/)


