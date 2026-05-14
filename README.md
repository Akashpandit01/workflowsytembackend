<div align="center">

<img src="YOUR_LOGO_URL" width="120"/>

# WorkflowX Backend

### Collaborative Workflow Orchestration System Backend

<p>
Advanced workflow engine backend built using Node.js, Express.js, MongoDB, Socket.IO, and graph-based execution planning.
</p>

<br/>

<img src="https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js"/>
<img src="https://img.shields.io/badge/Express.js-API-black?style=for-the-badge&logo=express"/>
<img src="https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb"/>
<img src="https://img.shields.io/badge/Socket.IO-Realtime-black?style=for-the-badge&logo=socketdotio"/>
<img src="https://img.shields.io/badge/JWT-Authentication-blue?style=for-the-badge&logo=jsonwebtokens"/>

<br/>
<br/>

<a href="YOUR_RENDER_LINK">
  <img src="https://img.shields.io/badge/Live_API-Render-46E3B7?style=for-the-badge&logo=render"/>
</a>

<a href="YOUR_GITHUB_LINK">
  <img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github"/>
</a>

</div>

---

# Project Introduction

WorkflowX is a collaborative workflow orchestration backend designed to manage complex project execution with dependency-aware task scheduling, realtime collaboration, concurrency handling, and workflow simulation.

Unlike basic CRUD systems, this backend implements workflow engine concepts using graph algorithms and realtime event-driven architecture.

The system supports:

* dependency-aware task execution
* realtime synchronization
* optimistic concurrency control
* retry mechanisms
* workflow simulation
* resource locking
* audit logging
* webhook integrations

---

# Core Features

## Authentication & Security

* JWT Authentication
* bcrypt password hashing
* Protected APIs
* Secure invite token system
* Validation middleware
* Access control middleware

---

## Project Collaboration

* Create projects
* Invite collaborators
* Join using secure invite links
* Shared project workspace

---

## Advanced Task Management

* Create/update/delete tasks
* Task retry system
* Version history tracking
* Task dependency handling
* Task status lifecycle

---

## Workflow Engine

* Dependency graph validation
* Cycle detection using DFS
* Topological sorting
* Execution planning engine
* Daily workflow simulation

---

## Realtime Communication

Implemented using Socket.IO.

Realtime events:

* task-created
* task-updated
* retry-attempted

---

## Concurrency Handling

Optimistic concurrency control prevents stale updates when multiple users edit tasks simultaneously.

Each task contains:

* versionNumber
* history tracking

---

## Resource Locking

Two running tasks cannot use the same resource simultaneously.

Example:

```text
Task A → resourceTag = database
Task B → resourceTag = database
```

If Task A is running:

* Task B cannot start.

---

# Tech Stack

| Technology | Purpose                |
| ---------- | ---------------------- |
| Node.js    | Backend Runtime        |
| Express.js | REST APIs              |
| MongoDB    | Database               |
| Mongoose   | ODM                    |
| JWT        | Authentication         |
| Socket.IO  | Realtime Communication |
| bcrypt     | Password Hashing       |
| Jest       | Testing                |

---

# Backend Architecture

```text
Client
  ↓
Express APIs
  ↓
Controllers
  ↓
Services Layer
  ↓
MongoDB
  ↓
Socket.IO Events
```

---

# Graph Algorithms Used

## DFS Traversal

Used for:

* dependency cycle detection

## Topological Sorting

Used for:

* execution planning

## Greedy Scheduling

Used for:

* daily workflow simulation

Time Complexity:

O(V + E)

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

# Installation

## Clone Repository

```bash
git clone YOUR_GITHUB_LINK
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
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

---

# Run Development Server

```bash
npm run dev
```

---

# Main APIs

## Authentication

```http
POST /api/auth/signup
POST /api/auth/login
```

---

## Projects

```http
GET /api/projects
POST /api/projects
POST /api/projects/:id/invite
POST /api/projects/join
```

---

## Tasks

```http
POST /api/tasks
PUT /api/tasks/:id
POST /api/tasks/:id/retry
GET /api/tasks/:id/history
```

---

## Workflow Engine

### Compute Execution Plan

```http
POST /api/projects/:projectId/compute-execution
```

### Daily Simulation

```http
POST /api/projects/:projectId/simulate
```

---

# Testing

Run tests:

```bash
npm test
```

---

# Deployment

## Backend Deployment

Deployed on Render.

## Database

MongoDB Atlas

---

# Future Improvements

* Redis queue support
* Background workers
* Docker support
* Kubernetes deployment
* Notification service
* Advanced scheduling algorithms

---

# Learning Outcomes

This project helped improve understanding of:

* MERN stack development
* backend architecture
* realtime systems
* graph algorithms
* concurrency handling
* workflow engine design

---

# Author

## Akash Pandit

Full Stack MERN Developer
