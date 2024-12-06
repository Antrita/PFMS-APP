# Personal Finance Management System (PFMS)

A full-stack personal finance management application built with FARM Stack (FastAPI, React, MongoDB) integrated with Open Banking India API for demo purposes and RazorpayX API for production.

## Tech Stack

### Frontend
- React
- React Router DOM
- React Bootstrap
- Axios
- Recharts for data visualization
- Lucide React for icons

### Backend
- FastAPI
- MongoDB with Motor
- Pydantic for data validation
- Python-Jose for JWT
- uvicorn for ASGI server

## Project Structure
```
pfms/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── styles/
│       └── App.jsx
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── models/
│   │   └── config.py
│   └── main.py
├── .gitignore
├── README.md
└── requirements.txt
```

## Features
- Dashboard with financial overview
- Transaction management
- Expense analytics and visualization
- Profile management
- Bank account integration
- Budget tracking

## Setup Instructions

### Backend Setup
1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a .env file with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   DATABASE_NAME=your_database_name
   JWT_SECRET=your_jwt_secret
   ```
5. Run the backend server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file:
   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints
- `/api/transactions/` - Transaction management
- `/api/dashboard/summary` - Dashboard data
- `/api/analytics/summary` - Analytics data
- `/api/profile/` - User profile management

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add a new feature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request