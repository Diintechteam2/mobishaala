# Mobishaala Dashboard - Login Setup Guide

## Overview

The dashboard now requires email-based login authentication. Only users with the configured email address can access the dashboard.

## Backend Setup

### Step 1: Install Backend Dependencies

```bash
cd mobishaala-backend
npm install
```

### Step 2: MongoDB Setup

You have two options:

#### Option A: Local MongoDB Installation

1. Download and install MongoDB Community Edition from: https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   - **Windows**: MongoDB should start automatically as a service
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

#### Option B: MongoDB Atlas (Cloud - Recommended for beginners)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (free tier is sufficient)
4. Create a database user
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/mobishaala`)

### Step 3: Configure Environment Variables

Create a `.env` file in the `mobishaala-backend` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mobishaala
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mobishaala

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
ALLOWED_EMAIL=admin@mobishaala.com
```

**Important:**
- Replace `JWT_SECRET` with a strong random string (at least 32 characters)
- Set `ALLOWED_EMAIL` to the email address you want to use for login
- For MongoDB Atlas, replace the connection string with your actual credentials

### Step 4: Create Initial User Account

After MongoDB is running, create the first user:

```bash
cd mobishaala-backend
npm run setup-user
```

Or with a custom password:
```bash
npm run setup-user your_custom_password
```

**Default password:** `admin123` (if not specified)

### Step 5: Start Backend Server

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will run on `https://mobishaala-backend-zcxm.onrender.com`

## Frontend Setup

The frontend is already configured. Just make sure:

1. The backend server is running on `https://mobishaala-backend-zcxm.onrender.com`
2. If you changed the backend port, update the API URL in:
   - `src/dashboard/pages/Login.jsx`
   - `src/dashboard/components/ProtectedRoute.jsx`

## Testing the Login

1. Start the backend server
2. Start the frontend: `npm run dev` (from root directory)
3. Navigate to `http://localhost:5173/dashboard` (or your frontend URL)
4. You will be redirected to `/login`
5. Login with:
   - **Email:** The email you set in `ALLOWED_EMAIL` (default: `admin@mobishaala.com`)
   - **Password:** The password you set when creating the user (default: `admin123`)

## Security Notes

- ✅ Only the email in `ALLOWED_EMAIL` can login
- ✅ Passwords are securely hashed using bcrypt
- ✅ JWT tokens expire after 7 days
- ⚠️ Change the default password after first login
- ⚠️ Use a strong `JWT_SECRET` in production
- ⚠️ Never commit `.env` file to version control
- ⚠️ Use HTTPS in production

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env` is correct
- Check if port 5000 is available

### Can't login
- Verify user exists: Check MongoDB or run `npm run setup-user` again
- Check if email matches `ALLOWED_EMAIL` in `.env`
- Check browser console for errors
- Verify backend is running on port 5000

### Connection refused
- Make sure backend server is running
- Check CORS settings if accessing from different origin
- Verify API URLs in frontend code match backend URL

## Next Steps

After successful setup:
1. Change the default password
2. Configure production environment variables
3. Set up proper MongoDB backup strategy
4. Configure HTTPS for production deployment

