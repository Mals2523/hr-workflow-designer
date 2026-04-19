# HR Workflow Designer

A visual HR workflow builder — drag, connect, configure, and simulate workflows like onboarding and leave approval.

Built as a case study for Tredence Studio's AI Engineering Internship.

---

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

---

## What It Does

- Drag 5 node types onto a canvas and connect them
- Configure each node via a dynamic right-panel form
- Simulate the workflow and see step-by-step execution
- Export / Import workflows as JSON

---

## Key Architecture Decisions

**Zustand over Context**
Canvas and form state update at different frequencies. A single Context would re-render every node on every form keystroke. Zustand selectors prevent this.

**Node Form Registry**
Each node type maps to a form component via a registry object. Adding a new node type = one new file. No switch statements, no touching existing code.

**MSW over static JSON**
Components call `fetch('/automations')` — they don't know if it's a mock or real API. Swapping to a real backend requires zero component changes.

**DFS Cycle Detection**
An HR workflow with a loop would simulate infinitely. Added cycle detection to catch this — errors are mapped to specific nodeIds so the UI highlights the exact problem node.

**Rule-based Suggestions**
After dropping a node, the sidebar suggests what comes next based on HR workflow patterns. Logic lives in `useSmartSuggestions.ts` — swappable for an LLM without touching UI code.

---

## Tech Stack

| | |
|---|---|
| React 18 + Vite | Fast dev, modern React |
| TypeScript strict | Typed interfaces for all 5 node shapes |
| React Flow | Node-based UI engine |
| Zustand | Selector-based state, no unnecessary re-renders |
| MSW | Network-level API mocking |
| Tailwind CSS | Utility-first styling |

---

## Completed

- ✅ 5 custom node types with TypeScript interfaces
- ✅ Dynamic forms with registry pattern
- ✅ MSW mock API — `/automations` and `/simulate`
- ✅ Simulation with step-by-step execution log
- ✅ Graph validation + visual error badges on nodes
- ✅ DFS cycle detection
- ✅ Smart node suggestions
- ✅ Export / Import JSON
- ✅ MiniMap, zoom, drag and drop

## Would Add With More Time

- Undo/Redo via Zustand + immer
- LLM-based suggestions (hook is already abstracted for this)
- localStorage persistence
- Unit tests — Jest + RTL
- Backend with FastAPI + PostgreSQL