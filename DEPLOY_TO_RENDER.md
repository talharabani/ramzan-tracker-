# Deploy Backend to Render - Quick Guide 🚀

## Why Render?
- ✅ **100% FREE** (no credit card needed)
- ✅ 750 hours/month (enough for 24/7 for 31 days)
- ✅ Auto-deploy from GitHub
- ✅ Easy setup (5 minutes)

## Step-by-Step Guide

### Step 1: Sign Up (1 minute)
1. Go to: **https://render.com**
2. Click **"Get Started"**
3. Sign up with **GitHub**
4. Authorize Render to access your repositories

### Step 2: Create Web Service (2 minutes)
1. Click **"New +"** (top right)
2. Select **"Web Service"**
3. Find and select: **`talharabani/ramzan-tracker-`**
4. Click **"Connect"**

### Step 3: Configure Service (2 minutes)

Fill in these settings:

```
Name: ramzan-tracker-api
Region: Oregon (US West) - or closest to you
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
```

**Instance Type:**
- Select: **"Free"** (0$/month)

### Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these 3 variables:

**Variable 1:**
```
Key: MONGODB_URI
Value: your_mongodb_connection_string
```

**Variable 2:**
```
Key: JWT_SECRET
Value: your_random_secret_key
```

**Variable 3:**
```
Key: NODE_ENV
Value: production
```

**Variable 4:**
```
Key: PORT
Value: 10000
```

### Step 5: Deploy!
1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment
3. Watch the logs (it will show progress)

### Step 6: Get Your API URL
Once deployed, you'll see:
```
Your service is live at https://ramzan-tracker-api.onrender.com
```

**Copy this URL!** You'll need it for the frontend.

---

## Update Frontend

### Edit src/config/api.js

Replace the API URL with your Render URL:

```javascript
const API_URL = import.meta.env.PROD 
  ? 'https://ramzan-tracker-api.onrender.com/api'  // Your Render URL
  : 'http://localhost:5000/api';

export default API_URL;
```

### Push to GitHub

```bash
git add src/config/api.js
git commit -m "Update API URL for Render"
git push
```

Vercel will auto-deploy the frontend with the new API URL!

---

## MongoDB Setup (If Not Done)

### Get MongoDB Atlas Connection String

1. **Go to:** https://www.mongodb.com/cloud/atlas
2. **Sign up** (free account)
3. **Create Cluster:**
   - Choose: **M0 Free**
   - Region: Choose closest to you
   - Click "Create"

4. **Create Database User:**
   - Security → Database Access
   - Add New Database User
   - Username: `ramadan_user`
   - Password: Generate secure password (save it!)
   - Database User Privileges: Read and write to any database

5. **Whitelist IP:**
   - Security → Network Access
   - Add IP Address
   - Click "Allow Access from Anywhere"
   - IP: `0.0.0.0/0`
   - Click "Confirm"

6. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `ramadan-tracker`

Example:
```
mongodb+srv://ramadan_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ramadan-tracker?retryWrites=true&w=majority
```

---

## Generate JWT Secret

Run in PowerShell:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or use any random 32+ character string like:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

---

## Test Your Deployment

### 1. Check Backend is Running
Open in browser:
```
https://ramzan-tracker-api.onrender.com/api/health
```

Should return: `{"status":"ok"}` or similar

### 2. Check Frontend
Open your Vercel URL:
```
https://your-app.vercel.app
```

Try to:
- Register a new account
- Login
- Complete a task
- View profile

---

## Important Notes

### Free Tier Limitations
- **Spins down after 15 minutes** of inactivity
- **Takes ~30 seconds** to spin up on first request after sleep
- **750 hours/month** (enough for 24/7 for 31 days)

### How to Keep It Awake (Optional)
Use a free uptime monitor:
1. Go to: https://uptimerobot.com
2. Add monitor for your Render URL
3. Ping every 5 minutes
4. Keeps service awake!

---

## Troubleshooting

### Deployment Failed?
**Check:**
- Root Directory is set to `backend`
- Build Command is `npm install`
- Start Command is `npm start`
- All environment variables are set

**View Logs:**
- Click on your service
- Go to "Logs" tab
- Check for errors

### MongoDB Connection Error?
**Check:**
- MongoDB Atlas allows connections from `0.0.0.0/0`
- Connection string is correct
- Password doesn't have special characters (or is URL encoded)
- Database user has read/write permissions

### API Returns 404?
**Check:**
- Service is running (not failed)
- URL is correct: `https://your-service.onrender.com/api/...`
- Routes are defined in backend

### Frontend Can't Connect?
**Check:**
- API URL in `src/config/api.js` is correct
- CORS is enabled in backend (should be by default)
- Frontend is redeployed after API URL change

---

## Upgrade Options (Optional)

If you need always-on service:
- **Render Paid:** $7/month for always-on
- **Cyclic:** Free and always-on (alternative)
- **Vercel Pro:** $20/month (includes backend)

---

## Summary

✅ **What You Did:**
1. Signed up for Render (free)
2. Connected GitHub repository
3. Configured backend service
4. Added environment variables
5. Deployed!

✅ **What You Have:**
- Frontend on Vercel: `https://your-app.vercel.app`
- Backend on Render: `https://ramzan-tracker-api.onrender.com`
- Database on MongoDB Atlas (free)

✅ **Total Cost:** $0/month! 🎉

---

**Your Ramadan Tracker is now fully deployed and FREE!** 🌙✨

Need help? Check the logs in Render dashboard or see `FREE_BACKEND_DEPLOYMENT.md` for alternatives.
