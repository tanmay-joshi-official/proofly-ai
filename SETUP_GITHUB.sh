#!/bin/bash

# Proofly AI - GitHub Setup Script
# Run this script after creating your GitHub repository

echo "🔄 Setting up GitHub remote..."

REPO_URL="https://github.com/tanmay-joshi-official/proofly-ai.git"

# Add remote origin
git remote add origin "$REPO_URL"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo "✅ Done! Your code should now be on GitHub."
echo "📝 Repository: https://github.com/tanmay-joshi-official/proofly-ai"
