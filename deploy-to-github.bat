@echo off
echo ========================================
echo Ramadan Tracker - GitHub Deployment
echo ========================================
echo.

echo Step 1: Initializing Git repository...
git init
echo.

echo Step 2: Adding all files...
git add .
echo.

echo Step 3: Creating initial commit...
git commit -m "Initial commit - Ramadan Spiritual Growth Tracker"
echo.

echo Step 4: Adding remote repository...
git remote add origin https://github.com/talharabani/ramzan-tracker-.git
echo.

echo Step 5: Setting main branch...
git branch -M main
echo.

echo Step 6: Pushing to GitHub...
git push -u origin main
echo.

echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Go to https://vercel.com
echo 2. Import your GitHub repository
echo 3. Add environment variables (see DEPLOYMENT_GUIDE.md)
echo 4. Deploy!
echo.
pause
