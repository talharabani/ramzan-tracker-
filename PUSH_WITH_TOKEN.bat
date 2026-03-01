@echo off
cls
echo ========================================
echo Push to GitHub with Personal Access Token
echo ========================================
echo.
echo Step 1: Get Your Personal Access Token
echo ----------------------------------------
echo.
echo 1. Opening GitHub token page...
start https://github.com/settings/tokens
echo.
echo 2. Click "Generate new token (classic)"
echo 3. Give it a name: "Ramadan Tracker"
echo 4. Select scope: [X] repo (full control)
echo 5. Click "Generate token"
echo 6. COPY THE TOKEN (you won't see it again!)
echo.
pause
echo.
echo Step 2: Enter Your Token
echo ----------------------------------------
echo.
set /p token="Paste your token here and press Enter: "
echo.
echo Step 3: Pushing to GitHub...
echo ----------------------------------------
echo.
git push https://%token%@github.com/talharabani/ramzan-tracker-.git main
echo.
if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo SUCCESS! Code pushed to GitHub!
    echo ========================================
    echo.
    echo Your repository: https://github.com/talharabani/ramzan-tracker-
    echo.
    echo Next Steps:
    echo 1. Go to Vercel: https://vercel.com
    echo 2. Click "New Project"
    echo 3. Import your repository
    echo 4. Add environment variables
    echo 5. Deploy!
    echo.
) else (
    echo.
    echo ========================================
    echo PUSH FAILED!
    echo ========================================
    echo.
    echo Possible issues:
    echo 1. Token is incorrect
    echo 2. Repository doesn't exist
    echo 3. No permission to push
    echo.
    echo Try:
    echo 1. Check if repository exists at: https://github.com/talharabani/ramzan-tracker-
    echo 2. If not, create it first at: https://github.com/new
    echo 3. Make sure token has 'repo' scope
    echo.
)
pause
