# 🔧 Fixed: Server Error During Registration/Login

## What Was Wrong?

Your frontend was trying to connect to `http://localhost:5000` (local backend), but:
- ❌ Backend is not running locally
- ✅ Backend is deployed on Render: https://ramzan-tracker.onrender.com

## What I Fixed

Updated `src/config/api.js` to always use Render backend:

```javascript
// Before (causing error)
const API_URL = import.meta.env.PROD 
  ? 'https://ramzan-tracker.onrender.com'
  : 'http://localhost:5000';  // ❌ Not running!

// After (fixed)
const API_URL = 'https://ramzan-tracker.onrender.com';  // ✅ Always use Render
```

---

## Test Now (Locally)

1. **Stop your dev server** (Ctrl+C)
2. **Restart it:**
   ```bash
   npm run dev
   ```
3. **Try to register/login again**

⚠️ **First request may take 30 seconds** (Render wakes up from sleep)

---

## Push to GitHub

After testing locally, push the fix:

```bash
git add src/config/api.js
git commit -m "Fix: Use Render backend for all environments"
git push
```

Vercel will auto-deploy the fix! 🚀

---

## Alternative: Run Backend Locally

If you want to develop with local backend:

### 1. Check MongoDB Connection
Make sure `backend/.env` has your MongoDB URI:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 2. Start Backend
```bash
cd backend
npm run dev
```

### 3. Update API Config
Change `src/config/api.js` back to:
```javascript
const API_URL = 'http://localhost:5000';
```

### 4. Start Frontend
```bash
npm run dev
```

---

## Why This Happened

When running `npm run dev` (Vite development mode):
- `import.meta.env.PROD` = `false`
- So it tried to use `http://localhost:5000`
- But backend wasn't running locally
- Result: "Server error during registration"

Now it always uses Render backend, which is already running! ✅

---

## Test Checklist

After restarting dev server:

- [ ] Open http://localhost:5173
- [ ] Click "Register"
- [ ] Fill in details
- [ ] Wait 30 seconds (first request)
- [ ] Should register successfully! ✅
- [ ] Try login
- [ ] Should work! ✅

---

## Render Backend Status

Check if backend is running:
- Open: https://ramzan-tracker.onrender.com/api/health
- Should show: `{"status":"ok","message":"Server is running"}`

If it shows error:
1. Go to https://dashboard.render.com
2. Check your service status
3. View logs for errors
4. Verify MongoDB connection

---

## Next Steps

1. ✅ Test locally (restart dev server)
2. ✅ Push fix to GitHub
3. ✅ Vercel auto-deploys
4. ✅ Test on Vercel URL
5. ✅ Share your app!

---

**The fix is ready! Just restart your dev server and test.** 🎉
