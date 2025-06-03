# SAARTHI Mobile App

SAARTHI is a React Native mobile application designed to provide easy access to feminine hygiene products through smart vending machines across campus locations.

## Features

- **Authentication**
  - Login with username/password
  - Google sign-in integration
  - Terms of Service and Privacy Policy

- **Period Tracking**
  - Weekly calendar view
  - Period countdown
  - Health statistics tracking
  - Personalized health assistant

- **Product Search**
  - Grid view of available products
  - Search functionality
  - Real-time stock updates
  - Easy add-to-cart

- **QR Code Scanner**
  - Built-in QR code scanning
  - Flash control
  - Camera permissions handling

- **Order History**
  - List of past orders
  - Order details with date and time
  - Delivery status tracking
  - Location information

- **Vending Machine Map**
  - Campus map with machine locations
  - Floor-wise machine listing
  - Current location indicator

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on Android/iOS:
```bash
   npm run android
   # or
   npm run ios
   ```

## Tech Stack

- React Native
- Expo Router
- Expo Camera
- TypeScript

## Design

The app follows a consistent design language with:
- Pink color scheme (#FFE4E1, #FF69B4, #FF1493)
- Card-based layouts
- Clean typography
- Rounded corners
- Emoji icons for navigation

## Project Structure

```
app/
├── (tabs)/
│   ├── _layout.tsx
│   ├── home.tsx
│   ├── search.tsx
│   ├── scanner.tsx
│   ├── orders.tsx
│   └── map.tsx
├── _layout.tsx
└── index.tsx
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
