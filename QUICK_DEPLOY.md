# Quick Deploy Guide 🚀

## Push to GitHub (Windows)

Simply run:
```bash
deploy-to-github.bat
```

Or manually:
```bash
git init
git add .
git commit -m "Initial commit - Ramadan Tracker"
git remote add origin https://github.com/talharabani/ramzan-tracker-.git
git branch -M main
git push -u origin main
```

## Deploy to Vercel

### 1. Prepare MongoDB
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create free cluster
- Get connection string

### 2. Deploy on Vercel
- Go to [Vercel](https://vercel.com)
- Click "New Project"
- Import `talharabani/ramzan-tracker-`
- Add environment variables:
  - `MONGODB_URI`: Your MongoDB connection string
  - `JWT_SECRET`: Random secret (32+ characters)
  - `NODE_ENV`: production
- Click "Deploy"

### 3. Done! 🎉
Your app will be live at: `https://your-project.vercel.app`

## Environment Variables

Generate JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

MongoDB URI format:
```
mongodb+srv://username:password@cluster.mongodb.net/ramadan-tracker
```

## Need Help?
See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.
