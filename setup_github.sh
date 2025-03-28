#!/bin/bash

# AI Image Generator - GitHub Setup Script
# This script helps you initialize Git and create the first commit

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install Git first."
    exit 1
fi

# Initialize git repository if not already initialized
if [ ! -d .git ]; then
    echo "Initializing Git repository..."
    git init
fi

# Check if remote origin already exists
REMOTE_EXISTS=$(git remote | grep origin || echo "")
if [ -z "$REMOTE_EXISTS" ]; then
    echo "Please enter your GitHub repository URL (e.g., https://github.com/username/ai-image-generator.git):"
    read REPO_URL
    
    if [ -z "$REPO_URL" ]; then
        echo "No repository URL provided. You'll need to add it manually later with:"
        echo "git remote add origin YOUR_REPOSITORY_URL"
    else
        echo "Adding remote origin..."
        git remote add origin $REPO_URL
    fi
else
    echo "Remote origin already exists."
fi

# Add all files to staging
echo "Adding files to staging..."
git add .

# Commit changes
echo "Creating initial commit..."
git commit -m "Initial commit: AI Image Generator using OpenAI DALL-E 3 and GPT-4o"

# Instructions for pushing
echo ""
echo "==============================================================="
echo "Repository initialized and files committed successfully!"
echo "==============================================================="
echo ""
echo "To push your code to GitHub, run:"
echo "git push -u origin main"
echo ""
echo "If your default branch is named 'master' instead of 'main', use:"
echo "git push -u origin master"
echo ""
echo "Make sure you've created the repository on GitHub first."
echo "==============================================================="