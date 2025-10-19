# 🎨 Drive Wise Frontend

## Next.js 15 + React 19 + TypeScript + Tailwind CSS

### Overview
The frontend application for Drive Wise, built for the Toyota Financial Services hackathon. Features a modern, responsive UI with real-time financial calculations and vehicle comparisons.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Application runs on **http://localhost:3000**

---

## 📁 Project Structure

```
frontend/src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── finance-fit/       # Finance Fit feature
│   ├── dealer-connect/    # Dealer Connect feature
│   ├── trade-in/          # Trade-In calculator
│   └── ownership/         # Ownership companion
│
└── components/            # React Components
    ├── finance-fit/
    │   ├── AffordabilityCalculator.tsx
    │   └── PaymentSimulator.tsx
    ├── dealer-connect/
    │   ├── DealerChatbot.tsx
    │   ├── DealerList.tsx
    │   └── VehicleComparison.tsx
    ├── trade-in/
    │   └── TradeInCalculator.tsx
    └── ownership/
        └── MaintenanceTracker.tsx
```

---

## 🎯 Features

### 1. Finance Fit
- **Affordability Calculator**: Determine budget based on income & credit score
- **Payment Simulator**: Interactive sliders for payment scenarios
- **Financing vs Leasing**: Compare options side-by-side

### 2. Dealer Connect
- **Vehicle Comparison**: Compare up to 3 vehicles
- **AI Chatbot**: Get instant answers about vehicles
- **Dealer Finder**: Locate nearby certified dealers

### 3. Smart Trade-In
- **Value Calculator**: Estimate trade-in value
- **VIN Lookup**: Auto-fill vehicle details
- **Depreciation Modeling**: See value over time

### 4. Ownership Companion
- **Maintenance Tracker**: Schedule service reminders
- **Cost Tracking**: Monitor ownership costs
- **Warranty Info**: Track coverage details

---

## 🔌 API Integration

### Backend Connection
The frontend connects to the Express backend running on port 5000:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Example: Fetch vehicles
const response = await fetch(`${API_URL}/vehicles`);
const data = await response.json();
```

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_CAPITAL_ONE_API_KEY=your_api_key
```

---

## 🎨 Styling

### Tailwind CSS
- Utility-first CSS framework
- Custom color palette for Toyota branding
- Responsive design (mobile-first)

### Design System
```css
/* Primary Colors */
--toyota-red: #EB0A1E
--toyota-blue: #0047BA

/* Typography */
Font: Inter (system font stack)
```

---

## 🧩 Component Library

### Shared Components
- `Button` - Consistent button styles
- `Card` - Content containers
- `Input` - Form inputs
- `Slider` - Range inputs for calculators

### Feature Components
Each feature has dedicated components in `/components/{feature}/`

---

## 📱 Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

All components are fully responsive with mobile-first approach.

---

## 🔧 Development

### Commands
```bash
npm run dev      # Start dev server with hot reload
npm run build    # Create production build
npm start        # Run production server
npm run lint     # Run ESLint
```

### Tech Stack
- **Framework**: Next.js 15.5.6
- **React**: 19.0.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 3.4
- **Build Tool**: Turbopack

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Manual Deployment
```bash
npm run build
# Deploy .next/ folder to hosting service
```

---

## 📊 Performance

- **First Load**: < 2s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

Optimized with Next.js image optimization and code splitting.

---

*Part of Drive Wise - Toyota Financial Services Hackathon*
