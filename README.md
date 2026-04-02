# Kantoo

A simple and intuitive Kanban board for managing your tasks. Organize todos, track progress, and keep your work in sync across sessions with persistent localStorage.

## Features

- **Add, edit, and delete tasks**
- **Drag-and-drop columns and tasks** for easy organization
- **Persistent state** with localStorage
- **Lightweight and fast**

## Technical Decisions

- Normalized state architecture to prevent unnecessary global state updates
- Managed complex state transitions using `useImmerReducer` to consolidate multi-action updates

## Getting Started

1. Clone the repo:

   ```bash
   git clone <repo-url>
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the app:

   ```bash
   pnpm dev
   ```

## Technologies

- React + TypeScript
- useImmerReducer for state management
- localStorage for persistence
