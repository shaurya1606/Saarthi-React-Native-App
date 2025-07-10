# Saarthi - Healthcare Products Payment System
  
## Overview
Saarthi is a comprehensive healthcare products management and payment system that combines a React Native mobile application with a Python-based payment processing backend. The system is designed to facilitate easy access to essential healthcare products while providing a seamless payment experience.

## Project Structure
```
saarthi/
├── my-app/                 # React Native Mobile Application
│   ├── assets/            # Images, fonts, and other static assets 
│   ├── components/        # Reusable React components
│   ├── expo-router/       # Expo routing configuration
│   └── package.json       # Node dependencies and scripts
├── server/                # Backend server files
├── main.py               # Python backend for payment processing
└── transactions.db       # SQLite database for transaction records
```

## Features

### Mobile Application (React Native)
- Modern UI with Expo Router navigation
- Camera integration for QR code scanning
- Real-time payment status updates
- Responsive design with native components
- Blur effects and haptic feedback
- Cross-platform support (iOS & Android)

### Backend System (Python)
- Razorpay payment integration
- QR code generation for payments
- Real-time payment status tracking
- Transaction history management
- Admin dashboard with analytics
- Secure payment processing
- SQLite database for transaction storage

## Tech Stack

### Frontend (Mobile App)
- React Native
- Expo Framework
- TypeScript
- React Navigation
- Native UI Components

### Backend
- Python
- SQLite
- Razorpay API
- Tkinter (Admin UI)
- Matplotlib (Analytics)

## Setup Instructions

### Mobile App Setup
1. Navigate to the my-app directory:
   ```bash
   cd my-app
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup
1. Install Python dependencies:
   ```bash
   pip install requests pillow qrcode python-dotenv matplotlib
   ```

2. Configure environment variables:
   Create a `.env` file with:
   ```
   KEY_ID=your_razorpay_key_id
   KEY_SECRET=your_razorpay_secret
   EMAIL=your_email
   NUMBER=your_phone_number
   ```

3. Run the backend server:
   ```bash
   python main.py
   ```

## Features in Detail

### Payment Processing
- QR code-based payment initiation
- 120-second payment window
- Real-time status updates
- Transaction logging
- Payment success notifications

### Admin Dashboard
- Transaction history viewing
- Product-wise filtering
- Analytics visualization
- CSV export functionality
- Secure admin access

### Security Features
- Environment variable protection
- Admin password protection
- Secure payment gateway integration
- Database transaction logging

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
This project is proprietary and confidential.

## Contact
For support or queries, please contact the development team. 
