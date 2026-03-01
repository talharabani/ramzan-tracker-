# 🔧 Render Environment Variables Setup

## ❌ CRITICAL ISSUE: Missing Environment Variables

Your 500 error is caused by **missing JWT_SECRET** on Render!

When `generateToken()` tries to sign a JWT without `JWT_SECRET`, it throws an error.

---

## ✅ FIX: Add Environment Variables on Render

### Step 1: Go to Render Dashboard
https://dashboard.render.com

### Step 2: Select Your Service
Click on: **ramzan-tracker** (your backend service)

### Step 3: Go to Environment Tab
Click: **Environment** in the left sidebar

### Step 4: Add Required Variables

Click **"Add Environment Variable"** and add these **4 variables**:

#### 1. MONGODB_URI
```
Key: MONGODB_URI
Value: mongodb+srv://username:password@cluster.mongodb.net/ramadan-tracker?retryWrites=true&w=majority
```

**How to get this:**
1. Go to: https://cloud.mongodb.com
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `ramadan-tracker`

**Example:**
```
mongodb+srv://talha:MyPassword123@cluster0.abc123.mongodb.net/ramadan-tracker?retryWrites=true&w=majority
```

---

#### 2. JWT_SECRET
```
Key: JWT_SECRET
Value: ramadan-tracker-super-secret-jwt-key-2026-production
```

**Important:**
- Use a long, random string
- Never share this publicly
- This is used to sign authentication tokens

**Generate a secure secret:**
```bash
# Option 1: Use this random string
ramadan-tracker-jwt-secret-a8f3k2m9p4x7z1q5w8e3r6t9y2u5i8o1

# Option 2: Generate your own (Node.js)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

#### 3. NODE_ENV
```
Key: NODE_ENV
Value: production
```

This tells the app it's running in production mode.

---

#### 4. PORT
```
Key: PORT
Value: 10000
```

**Note:** Render automatically sets this, but it's good to be explicit.

---

### Step 5: Save Changes

After adding all 4 variables, click **"Save Changes"**

Render will automatically **redeploy** your service with the new environment variables.

---

## 🔍 Verify Environment Variables

### Check Render Logs

1. Go to your service on Render
2. Click **"Logs"** tab
3. Look for this output:

```
🔍 Environment Check:
- PORT: 10000
- NODE_ENV: production
- MONGODB_URI: ✅ Set
- JWT_SECRET: ✅ Set
✅ MongoDB Connected
🚀 Server running on port 10000
==> Your service is live 🎉
```

If you see **"❌ Missing"** for any variable, go back and add it!

---

## 🔒 MongoDB Atlas Network Access

### Allow Render to Connect

1. Go to: https://cloud.mongodb.com
2. Click your cluster
3. Click **"Network Access"** in left sidebar
4. Click **"Add IP Address"**
5. Click **"Allow Access from Anywhere"**
6. Enter: `0.0.0.0/0`
7. Click **"Confirm"**

**Why?** Render uses dynamic IPs, so we need to allow all IPs.

**Security:** MongoDB still requires username/password authentication.

---

## 🧪 Test Your Backend

### 1. Test Health Endpoint

Open in browser:
```
https://ramzan-tracker.onrender.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Server is running",
  "environment": "production",
  "mongodb": "connected"
}
```

### 2. Test Registration

Use Postman or curl:

```bash
curl -X POST https://ramzan-tracker.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "test123"
  }'
```

Expected response (200):
```json
{
  "_id": "...",
  "fullName": "Test User",
  "email": "test@example.com",
  "totalPoints": 0,
  "currentLevel": 1,
  "streakCount": 0,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

If you get this, **backend is working!** ✅

---

## 🚨 Common Errors & Solutions

### Error: "JWT_SECRET is not set"

**Cause:** Missing JWT_SECRET environment variable

**Solution:**
1. Go to Render dashboard
2. Environment tab
3. Add JWT_SECRET variable
4. Save and wait for redeploy

---

### Error: "MongoServerError: bad auth"

**Cause:** Wrong MongoDB username or password

**Solution:**
1. Go to MongoDB Atlas
2. Database Access → Database Users
3. Verify username and password
4. Update MONGODB_URI on Render
5. Make sure password doesn't contain special characters (or URL encode them)

**URL Encoding:**
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`

---

### Error: "MongoServerError: IP not whitelisted"

**Cause:** MongoDB Atlas blocking Render's IP

**Solution:**
1. Go to MongoDB Atlas
2. Network Access
3. Add IP: `0.0.0.0/0`
4. Save

---

### Error: "CORS policy blocked"

**Cause:** Frontend domain not allowed

**Solution:**
Already fixed in `backend/server.js`:
```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://ramzan-tracker.vercel.app',
    'https://ramzan-tracker-*.vercel.app',
  ],
  credentials: true
};
app.use(cors(corsOptions));
```

If your Vercel URL is different, update the origin array.

---

## 📋 Environment Variables Checklist

On Render, you should have:

- [x] **MONGODB_URI** - MongoDB connection string
- [x] **JWT_SECRET** - Secret key for JWT tokens
- [x] **NODE_ENV** - Set to "production"
- [x] **PORT** - Set to 10000 (or auto-set by Render)

---

## 🔄 After Setting Variables

1. **Render auto-redeploys** (2-3 minutes)
2. **Check logs** for "✅ MongoDB Connected"
3. **Test health endpoint**
4. **Test registration**
5. **Test from frontend**

---

## 📝 Example .env File (For Reference)

**DO NOT commit this file to GitHub!**

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://talha:MyPassword123@cluster0.abc123.mongodb.net/ramadan-tracker?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=ramadan-tracker-jwt-secret-a8f3k2m9p4x7z1q5w8e3r6t9y2u5i8o1

# Server Port
PORT=10000

# Node Environment
NODE_ENV=production
```

---

## 🎯 Next Steps

1. ✅ Add all 4 environment variables on Render
2. ✅ Wait for Render to redeploy (2-3 min)
3. ✅ Check logs for success messages
4. ✅ Test health endpoint
5. ✅ Test registration from frontend
6. ✅ Everything should work! 🎉

---

**Once environment variables are set, your 500 error will be fixed!** ✅
