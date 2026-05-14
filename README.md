# WorkflowX Backend

Backend server for the Collaborative Workflow Orchestration System.

---

# Overview

This backend provides APIs and workflow engine logic for collaborative project and task management.

It supports:

* authentication
* project collaboration
* task dependency management
* execution planning
* realtime synchronization
* optimistic concurrency control
* retry handling
* workflow simulation

---

# Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.IO
* bcrypt
* Jest

---

# Features

## Authentication

* User signup
* User login
* JWT token authentication
* Password hashing using bcrypt

## Project Management

* Create projects
* Invite collaborators
* Join project using invite token

## Task Management

* Create tasks
* Edit tasks
* Retry failed tasks
* Task history tracking
* Task status updates

## Workflow Engine

* Dependency-aware execution planning
* Cycle detection
* Resource locking
* Retry mechanism
* Daily simulation engine

## Realtime Features

* Live task updates using Socket.IO
* Instant synchronization across users

## Security

* Protected APIs
* Access middleware
* Invite token expiration
* Environment variables

## Additional Features

* Webhook integration
* Audit logging
* Validation middleware
* Error handling middleware

---

# Installation

## Clone Repository

```bash
git clone <repository_url>
```

---

# Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

# Run Development Server

```bash
npm run dev
```

---

# Folder Structure

```text
backend/
 ├── config/
 ├── controllers/
 ├── middleware/
 ├── models/
 ├── routes/
 ├── services/
 ├── sockets/
 ├── tests/
 ├── utils/
 └── server.js
```

---

# Main APIs

## Authentication APIs

```http
POST /api/auth/signup
POST /api/auth/login
```

---

## Project APIs

```http
GET /api/projects
POST /api/projects
POST /api/projects/:id/invite
POST /api/projects/join
```

---

## Task APIs

```http
POST /api/tasks
PUT /api/tasks/:id
POST /api/tasks/:id/retry
GET /api/tasks/:id/history
```

---

## Workflow APIs

### Compute Execution Plan

```http
POST /api/projects/:projectId/compute-execution
```

### Daily Simulation

```http
POST /api/projects/:projectId/simulate
```

---

# Core Concepts Used

## Graph Algorithms

Tasks are represented as graph nodes.

## DFS Traversal

Used for dependency cycle detection.

## Topological Sorting

Used for execution planning.

## Greedy Scheduling

Used in daily simulation engine.

---

# Optimistic Concurrency Control

Each task contains a version number.

Before updating:

* frontend sends current version
* backend compares latest version

If versions mismatch:

* update rejected

This prevents stale updates.

---

# Resource Locking

Two running tasks cannot use the same resource simultaneously.

Example:

```text
Task A → resourceTag = database
Task B → resourceTag = database
```

If Task A is running:

* Task B cannot start.

---

# Realtime Communication

Socket.IO events:

* task-created
* task-updated
* retry-attempted

---

# Testing

Run tests:

```bash
npm test
```

---

# Deployment

Recommended:

* Backend → Render
* Database → MongoDB Atlas

---

# Future Improvements

* Redis queue support
* Background workers
* Role-based access control
* Docker support
* Kubernetes deployment
* Notification system

---

# Author

Akash Pandit
