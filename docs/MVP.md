# MVP - TeamHub
## The Purpose of an MVP
 The TeamHub MVP is a minimal viable version of the system for managing projects and tasks within a team, allowing users to create projects, manage tasks, and collaborate with each other in real time.

 The main goal of the MVP is to validate the product’s core value: the ease of collaborating on tasks within projects.

## Core MVP Features
 ### 🔐 Authentication
  - User registration
  - Email verification
  - Authorization (JWT)
  - Logout

 ### 📁 Projects
  - Create a project
  - View project list
  - Invite participants
  - Assign roles (Owner / Member)

 ### ✅ Tasks
  - Create a task within a project
  - Edit a task
  - Delete a task
  - Assign an assignee
  - Change task status
  - Set a deadline

 ### 💬 Chat
  - Group chat within a project
  - Real-time messaging (WebSocket)
  - Displaying online status

 ### 🔔 Notifications
  - Notifications about new tasks
  - Notifications about task changes
  - Internal notifications
  - Email notifications

## What is NOT included in the MVP
 1. Kanban board
 2. Task comments
 3. Files and attachments
 4. Search
 5. Analytics
 6. Mobile app
 7. Advanced reports

## MVP Readiness Criteria
 The MVP is considered complete if the user can:
  1. Register and log in
  2. Create a project
  3. Add members
  4. Create a task
  5. Assign a task to a user
  6. Change a task’s status
  7. Communicate in the project chat
  8. Receive event notifications

## Conclusion

 TeamHub MVP is a basic collaboration system that allows a team to organize projects and tasks in a single space.

---

# Roles in TeamHub
## 1. User
 A standard registered user of the system.

 ### Capabilities:
  - registration and login
  - creating projects
  - participating in projects (if invited)
  - working with tasks within projects

## 2. Project Owner
 The project creator or a user with maximum permissions within the project.

 ### Capabilities:
  - full project management
  - inviting/removing participants
  - assigning roles
  - creating and deleting tasks
  - managing project settings

## 3. Project Member
 A user invited to the project.

 ### Capabilities:
  - View the project
  - Create and edit tasks (if permitted)
  - Participate in chat
  - Change task statuses (depending on permissions)

---

# Business Scenarios - MVP

## 1. User Registration & Login Flow
 The user registers in the system, verifies their email address, and logs in to their account.

## 2. Project Creation Flow
 The user creates a new project and becomes its Owner.

## 3. Project Member Invitation Flow
 The Owner invites another user to the project, assigning them the role of Member.

## 4. Task Management Flow
 A Member or Owner creates a task within the project, assigns an assignee, and sets a deadline.

## 5. Task Lifecycle Flow
 The task consists of the following stages:
  - To Do
  - In Progress
  - Done

## 6. Real-time Chat Flow
 Project members exchange messages in the project's shared chat via WebSocket.

## 7. Notification Flow
 The system sends notifications:
  - when a task is assigned
  - when a task's status changes
  - when someone is invited to the project