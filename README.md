
# DriveWise

## Overview
DriveWise is a modern, full-stack web application for smarter car buying, financing, and dealer engagement. Built with Next.js, React, TypeScript, Tailwind CSS, and Firebase, it delivers a seamless experience for both customers and dealer employees.

### Key Features
- **Finance Fit**: Personalized affordability analysis, payment simulation, and financial tips.
- **Dealer Connect**: Find and book appointments with certified dealers, compare vehicles, and chat with an AI assistant.
- **Smart Trade-In**: Get instant trade-in estimates, VIN scanning, and market value analysis.
- **Dealer Dashboard**: Dealer employees can manage appointments, view client financial profiles, and track inventory.

### Technologies
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Express.js, Firebase Firestore, Capital One Nessie API (mocked)
- **Authentication**: Firebase Auth
- **Deployment**: Vercel, Node.js

## Quick Start

```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm run dev

# Backend (if needed)
cd ../backend
npm install
npm run dev
```

App runs at http://localhost:3000

## Project Structure

```
DriveWise/
├── frontend/
│   ├── src/
│   │   ├── app/                # Next.js App Router pages & features
│   │   ├── components/         # Reusable React components
│   │   ├── lib/                # API helpers, Firebase config
│   │   ├── types/              # Shared TypeScript types
│   │   └── ...
│   ├── public/                 # Static assets
│   ├── package.json
│   └── ...
├── backend/
│   ├── src/                    # Express API routes
│   ├── package.json
│   └── ...
├── firestore.rules             # Firestore security rules
└── ...
```

## API & Environment
- Set `NEXT_PUBLIC_API_URL` in `frontend/.env.local` to point to your backend (default: `http://localhost:5001`).
- Backend exposes REST endpoints for dealers, vehicles, appointments, and financial data.

## Usage
- Customers sign up, complete financial profile, and book appointments with dealers.
- Dealers log in, view appointments, and access client financial/saved car data.
- All data is stored securely in Firebase Firestore.

## Contributing
- Fork the repo, create a feature branch, and submit a pull request.
- See `frontend/README.md` for frontend-specific setup and scripts.


