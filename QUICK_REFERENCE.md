# ⚡ Quick Reference - Environment Variables

## 🎯 Copy These EXACTLY Into Render

When creating your Render service, add these 4 environment variables:

---

### 1. MONGODB_URI
```
mongodb+srv://talhaishaqrabani9490_db_user:Rabani9490@cluster0.tcagqoe.mongodb.net/ramadan-tracker?retryWrites=true&w=majority
```

**CRITICAL:**
- No spaces before or after
- Must start with `mongodb+srv://`
- Must end with `&w=majority`

---

### 2. JWT_SECRET
```
ramadan-tracker-jwt-secret-2026-production-secure-key
```

---

### 3. NODE_ENV
```
production
```

---

### 4. PORT
```
10000
```

---

## 🔧 Render Service Settings

**Root Directory:**
```
backend
```

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

---

## ✅ Test URLs

**Backend Health:**
```
https://ramzan-tracker.onrender.com/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "message": "Server is running",
  "environment": "production",
  "mongodb": "connected"
}
```

---

## 🚨 Common Errors

### "Invalid scheme" Error
**Fix:** MONGODB_URI has spaces. Delete and re-paste exactly as shown above.

### "bad auth" Error
**Fix:** Wrong password. Verify password is `Rabani9490` in MongoDB Atlas.

### "IP not whitelisted" Error
**Fix:** MongoDB Atlas → Network Access → Add `0.0.0.0/0`

---

## 📋 Deployment Checklist

- [ ] Delete old Render service
- [ ] Create new Render service
- [ ] Set root directory to `backend`
- [ ] Add all 4 environment variables
- [ ] Deploy and check logs
- [ ] Test health endpoint
- [ ] Deploy frontend on Vercel
- [ ] Test registration

---

**Read `DEPLOY_FROM_SCRATCH.md` for complete step-by-step guide!**
