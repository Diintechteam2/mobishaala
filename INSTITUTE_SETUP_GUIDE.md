# Institute Registration System - Setup Guide

## Overview

Complete institute registration system has been implemented with:
- ✅ Backend API with MongoDB
- ✅ Unique Institute ID generation (format: CDIDBYFG34GD)
- ✅ Cloudinary integration for image uploads
- ✅ Comprehensive form with all required fields
- ✅ Dashboard display of all registered institutes

## Backend Setup

### 1. Install Dependencies

```bash
cd mobishaala-backend
npm install
```

This will install:
- express
- mongoose
- cloudinary
- multer
- And other dependencies

### 2. Configure Environment Variables

Update `mobishaala-backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mobishaala
JWT_SECRET=your_super_secret_jwt_key
ALLOWED_EMAIL=admin@mobishaala.com

# Cloudinary (Required for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Get Cloudinary Credentials

1. Sign up at https://cloudinary.com (free tier available)
2. Go to Dashboard
3. Copy:
   - Cloud Name
   - API Key
   - API Secret
4. Add them to `.env` file

### 4. Start Backend Server

```bash
npm start
# or for development
npm run dev
```

## Frontend

The frontend is already configured. Just make sure:
- Backend is running on `https://mobishaala-backend-zcxm.onrender.com`
- You are logged in to the dashboard

## How to Use

### Adding an Institute

1. Login to dashboard at `http://localhost:5173/login`
2. Navigate to **Institutes** page from sidebar
3. Click **"+ Add Institute"** button
4. Fill in the form:
   - **Required fields** (marked with *):
     - Business Name
     - Business Owner Name
     - Business Number
     - Business Email
     - Business GST Number
     - Business PAN Number
     - Business Mobile Number (10 digits)
     - Business Category
     - City
     - Pin Code (6 digits)
     - Business Address
   - **Optional fields**:
     - Business Website
     - Business YouTube Channel
     - Annual Turnover Range
     - Business Logo (image file)
     - Institute Image (image file)
5. Click **"Add Institute"**
6. A unique Institute ID will be automatically generated (e.g., CDIDBYFG34GD)

### Viewing Institutes

- All registered institutes are displayed in a table
- Shows: Institute ID, Business Name, Owner, Email, City, Category, Status, Created Date
- Institutes are sorted by creation date (newest first)

## Institute ID Format

- Format: `CDIDBYFG34GD` (12 characters)
- Type: Alphanumeric, uppercase
- Auto-generated when creating a new institute
- Unique for each institute
- Used to differentiate and fetch institute-specific data

## API Endpoints

### GET /api/institutes
Get all institutes (requires authentication)

### POST /api/institutes
Create new institute (requires authentication + multipart/form-data)

### GET /api/institutes/:id
Get single institute by ID

### PUT /api/institutes/:id
Update institute

### DELETE /api/institutes/:id
Delete institute

## File Uploads

- Images are uploaded to Cloudinary
- Business Logo → saved in `mobishaala/institutes/logos/`
- Institute Image → saved in `mobishaala/institutes/images/`
- Maximum file size: 5MB
- Supported formats: All image types

## Database Schema

Each institute stores:
- Unique Institute ID
- Business information (name, owner, number, email)
- Tax information (GST, PAN)
- Contact information (mobile, address, city, pin code)
- Category and turnover range
- Website and YouTube channel
- Logo and image URLs (from Cloudinary)
- Status (Draft/Live/Archived)
- Timestamps (created, updated)

## Troubleshooting

### Images not uploading?
- Check Cloudinary credentials in `.env`
- Verify Cloudinary account is active
- Check file size (max 5MB)
- Ensure file is an image format

### Can't create institute?
- Verify backend is running
- Check if logged in (token in localStorage)
- Verify all required fields are filled
- Check browser console for errors

### Institutes not showing?
- Check backend is running
- Verify MongoDB connection
- Check network tab for API errors
- Ensure authentication token is valid

## Next Steps

1. Set up Cloudinary account and add credentials
2. Start backend server
3. Login to dashboard
4. Start adding institutes!

