````markdown
# Meeting Action Items Tracker

A web app to extract action items from meeting transcripts and manage them.

## Features

- Paste meeting transcript → extract action items (task, owner, due date)
- Add, edit, delete, and mark action items as done
- View recent transcripts
- CRUD operations for action items stored in MongoDB
- Gemini AI integrated for NLP extraction
- Frontend: React + Tailwind CSS
- Backend: Node.js + Express + MongoDB

## Live 

- **Live App:** [https://aggroso-meeting-action-tracker.vercel.app]

## Setup

1. Clone the repository & install dependencies (frontend + backend):

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
````

2. Add `.env` in backend with:

```
PORT=4000
MONGO_URI=<your-mongodb-uri>
GENAI_API_KEY=<your-gemini-api-key>
```

3. Start servers:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```