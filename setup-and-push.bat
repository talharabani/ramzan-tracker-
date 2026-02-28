@echo off
cls
echo ========================================
echo Ramadan Tracker - GitHub Setup
echo ========================================
echo.
echo Current Status:
echo - Git repository: Ready
echo - Files committed: Yes
echo - Remote: https://github.com/talharabani/ramzan-tracker-.git
echo.
echo ========================================
echo Choose Your Method:
echo ========================================
echo.
echo 1. Use GitHub Desktop (Easiest - Recommended)
echo 2. Use Personal Access Token
echo 3. Change to different repository
echo 4. Exit
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto desktop
if "%choice%"=="2" goto token
if "%choice%"=="3" goto change
if "%choice%"=="4" goto end

:desktop
echo.
echo ========================================
echo Method 1: GitHub Desktop
echo ========================================
echo.
echo Steps:
echo 1. Download GitHub Desktop from: https://desktop.github.com/
echo 2. Install and sign in
echo 3. File -^> Add Local Repository
echo 4. Select this folder
echo 5. Click "Publish repository"
echo.
echo Opening GitHub Desktop download page...
start https://desktop.github.com/
echo.
pause
goto end

:token
echo.
echo ========================================
echo Method 2: Personal Access Token
echo ========================================
echo.
echo Step 1: Generate token at: https://github.com/settings/tokens
echo         - Click "Generate new token (classic)"
echo         - Select scope: repo
echo         - Copy the token
echo.
start https://github.com/settings/tokens
echo.
set /p token="Paste your token here: "
echo.
echo Pushing to GitHub...
git push https://%token%@github.com/talharabani/ramzan-tracker-.git main
echo.
if %errorlevel% equ 0 (
    echo ========================================
    echo Success! Repository pushed!
    echo ========================================
    echo.
    echo View at: https://github.com/talharabani/ramzan-tracker-
    echo.
    echo Next: Deploy to Vercel
    echo Go to: https://vercel.com
) else (
    echo ========================================
    echo Push failed! Try another method.
    echo ========================================
)
echo.
pause
goto end

:change
echo.
echo ========================================
echo Method 3: Change Repository
echo ========================================
echo.
set /p username="Enter your GitHub username: "
set /p reponame="Enter repository name (default: ramzan-tracker-): "
if "%reponame%"=="" set reponame=ramzan-tracker-
echo.
echo Updating remote to: https://github.com/%username%/%reponame%.git
git remote set-url origin https://github.com/%username%/%reponame%.git
echo.
echo Remote updated! Now create the repository on GitHub:
echo 1. Go to: https://github.com/new
echo 2. Repository name: %reponame%
echo 3. Click "Create repository"
echo.
start https://github.com/new
echo.
echo After creating the repository, press any key to push...
pause
echo.
echo Pushing to GitHub...
git push -u origin main
echo.
if %errorlevel% equ 0 (
    echo ========================================
    echo Success! Repository pushed!
    echo ========================================
    echo.
    echo View at: https://github.com/%username%/%reponame%
) else (
    echo ========================================
    echo Push failed! You may need to authenticate.
    echo Try Method 1 (GitHub Desktop) or Method 2 (Token)
    echo ========================================
)
echo.
pause
goto end

:end
echo.
echo Thank you for using Ramadan Tracker Setup!
echo.
pause
