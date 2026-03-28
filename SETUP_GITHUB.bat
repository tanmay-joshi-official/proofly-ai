@echo off
REM Proofly AI - GitHub Setup Script for Windows
REM Run this script after creating your GitHub repository

echo Creating GitHub repository...

REM GitHub credentials
set GITHUB_USERNAME=tanmay-joshi-official
set REPO_NAME=proofly-ai

REM Add remote origin
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

REM Push to GitHub
echo Pushing to GitHub...
git push -u origin main

echo Done! Your code should now be on GitHub.
echo Repository: https://github.com/tanmay-joshi-official/proofly-ai
pause
