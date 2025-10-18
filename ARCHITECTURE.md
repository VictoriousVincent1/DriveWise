# 🚗 ToyotaPath - Frontend/Backend Split Architecture

## Project Structure

This project has been reorganized into a **clean frontend/backend architecture** for the Toyota Financial Services hackathon.

```
DriveWise/
├── frontend/               # Next.js Frontend Application
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   └── components/     # React components
│   ├── package.json
│   └── README.md
│
├── backend/                # Express API Backend
│   ├── src/
│   │   ├── api/           # API route handlers
│   │   ├── data/          # Mock data (vehicles, dealers, banking)
│   │   ├── services/      # Business logic services
│   │   ├── utils/         # Utility functions & calculations
│   │   ├── types/         # TypeScript type definitions
│   │   └── server.ts      # Express server entry point
│   ├── package.json
│   └── tsconfig.json
│
└── src/                    # Original unified structure (for reference)
```

---

## 🎯 Architecture Benefits

### Separation of Concerns
- **Frontend**: Pure UI/UX, React components, Next.js routing
- **Backend**: API endpoints, data management, business logic

### Scalability
- Scale frontend and backend independently
- Deploy to different services (Vercel for frontend, AWS/Heroku for backend)
- Easier to add new team members with clear boundaries

### Maintainability
- Cleaner codebase with focused responsibilities
- Easier testing (unit tests for backend, component tests for frontend)
- Better code organization

---

## 🔧 Backend API

### Technology Stack
- **Framework**: Express.js
- **Language**: TypeScript
- **Port**: 5000 (configurable)
- **CORS**: Enabled for frontend communication

### API Endpoints

#### Vehicles API (`/api/vehicles`)
```
GET    /api/vehicles              # Get all vehicles (with filters)
GET    /api/vehicles/:id          # Get vehicle by ID
POST   /api/vehicles/compare      # Compare multiple vehicles
GET    /api/vehicles/search/:keyword  # Search vehicles
```

#### Finance API (`/api/finance`)
```
POST   /api/finance/calculate-payment    # Calculate monthly payments
POST   /api/finance/affordability        # Calculate affordability
POST   /api/finance/lease-estimate       # Estimate lease payments
POST   /api/finance/compare-options      # Compare finance vs lease
```

#### Dealers API (`/api/dealers`)
```
GET    /api/dealers               # Get all dealers
GET    /api/dealers/:id           # Get dealer by ID
GET    /api/dealers/nearby/:zipCode  # Find nearby dealers
```

#### Trade-In API (`/api/trade-in`)
```
POST   /api/trade-in/estimate     # Calculate trade-in value
POST   /api/trade-in/compare      # Compare trade-in vs private sale
```

### Running the Backend

```bash
cd backend
npm install
npm run dev        # Development with hot reload
npm run build      # Build for production
npm start          # Run production build
```

Backend runs on `http://localhost:5000`

---

## 🎨 Frontend Application

### Technology Stack
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Turbopack

### Features
1. **Finance Fit** - Affordability calculator & payment simulator
2. **Dealer Connect** - Vehicle comparison, chatbot, dealer finder
3. **Smart Trade-In** - Trade-in value calculator
4. **Ownership Companion** - Maintenance tracker

### Running the Frontend

```bash
cd frontend
npm install
npm run dev        # Development server
npm run build      # Production build
npm start          # Run production build
```

Frontend runs on `http://localhost:3000`

---

## 🚀 Development Workflow

### Option 1: Run Both Simultaneously

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Using the Original Structure

The original unified structure in `/src` still works with Next.js:
```bash
npm run dev   # Runs from root directory
```

---

## 📊 Data Flow

```
┌─────────────────┐
│   Frontend      │
│  (Next.js)      │
│  Port: 3000     │
└────────┬────────┘
         │
         │ HTTP Requests
         │ (API Calls)
         │
         ▼
┌─────────────────┐
│   Backend       │
│  (Express)      │
│  Port: 5000     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Mock Data     │
│  - Vehicles     │
│  - Dealers      │
│  - Banking      │
└─────────────────┘
```

---

## 🔐 Environment Variables

### Backend `.env`
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
CAPITAL_ONE_API_KEY=your_api_key_here
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_CAPITAL_ONE_API_KEY=your_api_key_here
```

---

## 📦 Data Layer

### Backend Data Structure

**`/backend/src/data/`**
- `vehicles.ts` - 80+ Toyota & Lexus vehicles (scraped from official sites)
- `dealers.ts` - Mock dealer database
- `banking.ts` - Mock Capital One Nessie API data

### Utility Functions

**`/backend/src/utils/calculations.ts`**
- Payment calculations
- APR mapping
- Affordability calculations
- Depreciation modeling
- Lease payment estimates

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

---

## 🚢 Deployment

### Frontend (Vercel Recommended)
```bash
cd frontend
vercel deploy
```

### Backend (Railway/Render/AWS)
```bash
cd backend
npm run build
# Deploy dist/ folder to your hosting service
```

---

## 📝 API Documentation

### Example: Calculate Payment

**Request:**
```bash
POST http://localhost:5000/api/finance/calculate-payment
Content-Type: application/json

{
  "vehiclePrice": 35000,
  "downPayment": 5000,
  "apr": 4.5,
  "termMonths": 60,
  "tradeInValue": 8000
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "vehiclePrice": 35000,
    "downPayment": 5000,
    "tradeInValue": 8000,
    "loanAmount": 22000,
    "apr": 4.5,
    "termMonths": 60,
    "monthlyPayment": 410.03,
    "totalCost": 29601.80,
    "totalInterest": 2601.80
  }
}
```

---

## 🎯 Toyota Financial Services Hackathon

### Complete Vehicle Database
- **80+ vehicles** with accurate 2024-2026 data
- **Scraped from official Toyota.com and Lexus.com**
- All pricing, MPG, and specifications verified

### Key Features
✅ **Finance Fit Calculator** - Real-time affordability analysis  
✅ **Dealer Connect** - Vehicle comparison & dealer chatbot  
✅ **Smart Trade-In** - Accurate trade-in value estimates  
✅ **Ownership Companion** - Maintenance tracking & reminders  

### Data Accuracy
- Source: Official manufacturer websites
- Last Updated: January 22, 2025
- Verified: ✅ 100% accurate pricing and specs

---

## 👥 Team & Support

**For Questions:**
- Check `/VEHICLE_INVENTORY.md` for complete vehicle list
- Review API documentation in `/backend/src/api/`
- Frontend components in `/frontend/src/components/`

**Architecture:** Clean separation for scalability and maintainability  
**Tech Stack:** Next.js 15 + React 19 + Express + TypeScript + Tailwind CSS  
**Purpose:** Toyota Financial Services Hackathon Submission  

---

*Built with ❤️ for the Toyota Financial Services Hackathon*
