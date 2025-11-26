# Institute Dashboard Debug Guide

## Console Logs Added

I've added comprehensive console logs to help debug the blank screen issue. When you click the Login button, check the browser console (F12) for these logs:

### 1. Login Button Click
- `🔐 Login clicked for institute:` - Shows institute data
- `📦 Institute data:` - Full JSON of institute object
- `🚀 Navigating to:` - Target URL

### 2. Route Navigation
- `📱 InstituteDashboardApp rendered` - Main app component loaded
- `📍 Current pathname:` - Current route path

### 3. Layout Component
- `🏢 InstituteDashboardLayout rendered` - Layout component loaded
- `📍 Current location:` - Full location object
- `🆔 Institute ID from params:` - ID from URL params
- `📋 Institute data from localStorage:` - Data stored in localStorage
- `✅ Institute data validated:` - Confirmation if data is valid

### 4. Hero Editor Component
- `🎨 HeroEditor rendered, Institute ID:` - Component loaded
- `🔄 HeroEditor useEffect triggered` - Data fetch started
- `📡 Fetching content for institute:` - API call initiated
- `🔑 Token exists:` - Authentication token check
- `🌐 API URL:` - Full API endpoint
- `📤 Making GET request...` - Request sent
- `📥 Response status:` - HTTP status code
- `✅ API Response:` - Full response data
- `📝 Hero data:` - Parsed hero section data
- `✅ Content set successfully` - Data loaded
- `🏁 Fetch complete` - Process finished

## What to Check

1. **Open Browser Console (F12)**
2. **Click Login button on an institute**
3. **Check console logs in order:**

### Expected Flow:
```
🔐 Login clicked for institute: {...}
📦 Institute data: {...}
🚀 Navigating to: /institute-dashboard/J92PET1JB8FK/hero
📱 InstituteDashboardApp rendered
📍 Current pathname: /institute-dashboard/J92PET1JB8FK/hero
🏢 InstituteDashboardLayout rendered
📍 Current location: {...}
🆔 Institute ID from params: J92PET1JB8FK
📋 Institute data from localStorage: {...}
✅ Institute data validated: J92PET1JB8FK
🎨 HeroEditor rendered, Institute ID: J92PET1JB8FK
🔄 HeroEditor useEffect triggered
📡 Fetching content for institute: J92PET1JB8FK
🔑 Token exists: true
🌐 API URL: https://mobishaala-backend-zcxm.onrender.com/api/institute-content/J92PET1JB8FK
📤 Making GET request...
📥 Response status: 200 OK
✅ API Response: {...}
📝 Hero data: {...}
✅ Content set successfully
🏁 Fetch complete
```

## Common Issues to Look For

### Issue 1: No Navigation Logs
- **Symptom:** No logs after clicking Login
- **Fix:** Check if button click handler is working

### Issue 2: Route Not Matching
- **Symptom:** `InstituteDashboardApp rendered` but no layout logs
- **Fix:** Check route path in App.jsx

### Issue 3: No Institute Data
- **Symptom:** `⚠️ No institute data found`
- **Fix:** Check localStorage, ensure institute data is saved

### Issue 4: API Error
- **Symptom:** `❌ API Error:` in console
- **Fix:** Check backend server, check token, check API endpoint

### Issue 5: Component Not Rendering
- **Symptom:** No `HeroEditor rendered` log
- **Fix:** Check route matching, check for JavaScript errors

## Network Tab Check

Also check the **Network tab** in browser DevTools:
1. Filter by "institute-content"
2. Check if request is being made
3. Check request headers (Authorization token)
4. Check response status and data

## Quick Fixes

If you see errors:

1. **Token missing:** Login to admin dashboard first
2. **404 error:** Check backend server is running
3. **500 error:** Check backend logs, check MongoDB connection
4. **CORS error:** Check backend CORS settings
5. **Route not found:** Check route paths match exactly

## Next Steps

After checking console logs:
1. Share the console output
2. Share any error messages
3. Share Network tab requests/responses
4. This will help identify the exact issue

