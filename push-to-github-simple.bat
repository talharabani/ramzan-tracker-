@echo off
echo ========================================
echo Ramadan Tracker - Push to GitHub
echo ========================================
echo.

echo Step 1: Authenticating with GitHub CLI...
gh auth login
echo.

echo Step 2: Pushing to GitHub...
git push -u origin main
echo.

echo ========================================
echo Push Complete!
echo ========================================
echo.
echo Your repository is now at:
echo https://github.com/talharabani/ramzan-tracker-
echo.
echo Next: Deploy to Vercel
echo 1. Go to https://vercel.com
echo 2. Import your GitHub repository
echo 3. Add environment variables
echo 4. Deploy!
echo.
pause
