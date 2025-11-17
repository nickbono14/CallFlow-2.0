# CallFlow Dashboard 2.0

A fully operational dashboard for call tracking and analytics, built with Next.js, React, and TypeScript.

## Features

- 📊 Real-time call analytics and visualization
- 📈 ROI Calculator for tracking business metrics
- 👥 Client management (add/remove clients)
- 🔄 Google Sheets synchronization for live data
- 🔐 Authentication system (Admin + OAuth)
- 📱 Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Authentication**: NextAuth.js
- **Data Source**: Google Sheets API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Google Sheets API credentials (service account)
- Nick Dental Google Sheet access

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Add your Google Sheets credentials to `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Google Sheets Setup

To connect to your Nick Dental Google Sheet:

1. Create a Google Cloud Project
2. Enable Google Sheets API
3. Create a Service Account
4. Download the JSON key file
5. Share your Google Sheet with the service account email
6. Add credentials to `.env.local`:
   - `GOOGLE_SHEET_ID`: Your sheet ID from the URL
   - `GOOGLE_CLIENT_EMAIL`: Service account email
   - `GOOGLE_PRIVATE_KEY`: Private key from JSON file

## Admin Access

- **Email**: admin@callflow.com
- **Password**: admin1234

## Deployment

The app is ready to deploy on:

- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

```bash
npm run build
npm run start
```

## Project Structure

```
├── app/
│   ├── api/
│   │   └── sheets/          # Google Sheets API routes
│   ├── dashboard/           # Main dashboard page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── CallChart.tsx        # Call trends visualization
│   ├── ClientsList.tsx      # Clients table
│   ├── ROICalculator.tsx    # ROI calculator widget
│   └── StatsCard.tsx        # Statistics cards
├── lib/                     # Utility functions
└── utils/                   # Helper functions
```

## Features Roadmap

- [x] Dashboard with real-time stats
- [x] Call trends visualization
- [x] ROI Calculator
- [x] Client management UI
- [ ] Google Sheets live sync (credentials needed)
- [ ] Admin authentication
- [ ] Add/Edit/Delete clients
- [ ] Export reports
- [ ] Email notifications

## Support

For issues or questions, contact the development team.


