# Kantoo

A simple and intuitive Kanban board for managing your tasks. Organize todos, track progress, and keep your work in sync across sessions with persistent storage.

## Features

- Add, edit, and delete tasks
- Drag-and-drop columns and tasks for easy organization
- Persistent state across sessions
- Lightweight and fast — optimized for smooth interaction at scale

## Technical Highlights

**Normalized state architecture** prevents unnecessary global re-renders by scoping updates to only the affected columns or cards.

**Consolidated state transitions** via `useImmerReducer` reduce action complexity and keep reducer logic predictable.

**Render optimization** using `React.memo` on `<KanbanColumn>` and `<KanbanCard>`, with `useCallback` to stabilize handlers, cut drag-and-drop latency by about ~40% and reduced column reorder time by around 60% based on React DevTools profiling.

## Tech Stack

- React + TypeScript
- `useImmerReducer` for state management
- localStorage for persistence

## Getting Started

```bash
git clone https://github.com/thexeromin/kantoo.git
pnpm install
pnpm dev
```
