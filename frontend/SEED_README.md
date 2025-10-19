# Firebase Seed Script

This script populates your Firebase Firestore database with:
- **8 Austin-area Toyota/Lexus dealerships** (from austinDealers.ts)
- **Vehicle inventory** (3-6 vehicles per dealership, with variations in color/VIN/price)

## Setup

1. Make sure you have Firebase credentials set in your `.env.local` file:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install firebase
   ```

## Running the Script

### Option 1: Using Node.js directly (Recommended)
```bash
cd frontend
node seed-firebase.cjs
```

### Option 2: Using tsx (TypeScript execution)
```bash
cd frontend
npx tsx src/scripts/seed-firebase.ts
```

## What Gets Created

### Dealerships Collection
Each dealership document includes:
- name, brand (Toyota/Lexus)
- address, city, state, zipCode
- location (lat/lon coordinates)
- phone, website (optional)
- createdAt timestamp

### Vehicles Collection
Each vehicle document includes:
- dealershipId, dealershipName (linked to dealership)
- make, model, year, trim
- price (MSRP with slight variation), msrp
- mileage (0-50 miles for new cars)
- color (random from 9 options)
- vin (randomly generated 17-character VIN)
- category (sedan, suv, hybrid, truck)
- status ('available')
- features (array of vehicle features)
- images (placeholder)
- createdAt timestamp

## Data Generated
- **8 dealerships** across Austin metro area
- **~30-50 vehicles** total (3-6 per dealership, with 1-3 instances of each model)
- Vehicles based on your existing mockVehicles data:
  - Toyota Corolla, Camry, RAV4, Highlander, Prius, Tacoma
  - Camry Hybrid, RAV4 Prime

## Notes
- Each dealership gets a random selection of 3-6 vehicle models
- Each model may have 1-3 instances (different colors/VINs)
- Prices vary slightly (+/- $1000) from base MSRP
- All vehicles start with 'available' status
- Script uses batch writes for dealerships (faster)
- Script uses individual writes for vehicles (to avoid batch size limits)

## Troubleshooting

**Error: Missing Firebase credentials**
- Make sure your `.env.local` file has all Firebase config values
- Restart your terminal after adding environment variables

**Error: Permission denied**
- Check your Firebase Security Rules
- Make sure you have write access to `dealerships` and `vehicles` collections
- You may need to temporarily relax rules or run as authenticated admin

**Script hangs or times out**
- Check your internet connection
- Verify Firebase project is active
- Try running with fewer vehicles (modify `randomStock(3, 6)` to `randomStock(1, 2)`)
