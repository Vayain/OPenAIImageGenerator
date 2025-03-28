# Setting Up GitHub Repository

This guide will help you back up your AI Image Generator project to GitHub.

## Prerequisites

1. [GitHub account](https://github.com/join)
2. Git installed on your local machine ([download here](https://git-scm.com/downloads))

## Steps to Create and Push to GitHub

### 1. Create a new GitHub repository

1. Log in to your GitHub account
2. Click the "+" button in the top-right corner and select "New repository"
3. Enter a repository name (e.g., "ai-image-generator")
4. Add an optional description
5. Choose to make it public or private
6. You can initialize with a README (though we'll be pushing our own)
7. Click "Create repository"

### 2. Initialize Git in your project (if not already done)

```bash
# Navigate to your project directory
cd /path/to/your/project

# Initialize git repository
git init
```

### 3. Create a .gitignore file

Create a `.gitignore` file in your project root to exclude sensitive information and unnecessary files:

```
# Dependencies
node_modules/
.pnp/
.pnp.js

# Build outputs
dist/
build/
.output/

# Environment variables - IMPORTANT!
.env
.env.*
!.env.example

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea/
.vscode/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Operating System Files
.DS_Store
Thumbs.db
```

### 4. Create a sample .env.example file

Create a template for environment variables that others can use:

```
# Database connection
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# OpenAI API key
OPENAI_API_KEY=your_openai_api_key
```

### 5. Stage, commit, and push your changes

```bash
# Add all files to staging
git add .

# Commit your changes with a descriptive message
git commit -m "Initial commit: AI Image Generator using OpenAI DALL-E 3 and GPT-4o"

# Add the GitHub repository as a remote
git remote add origin https://github.com/yourusername/ai-image-generator.git

# Push your changes to GitHub
git push -u origin main
```

Note: If your default branch is named `master` instead of `main`, use:
```bash
git push -u origin master
```

## Best Practices for GitHub Management

1. **Make regular commits with clear messages**
   - Use present tense ("Add feature" not "Added feature")
   - Be descriptive but concise

2. **Utilize branches for new features or major changes**
   ```bash
   git checkout -b feature/new-feature-name
   ```

3. **Create meaningful pull requests**
   - Describe the changes made
   - Reference any relevant issues

4. **Protect sensitive data**
   - Never commit API keys or credentials
   - Use environment variables and .gitignore

5. **Keep documentation updated**
   - Update README.md as the project evolves
   - Document significant architectural changes

## Additional GitHub Features to Consider

1. **GitHub Issues** - Track bugs and feature requests
2. **GitHub Projects** - Project management boards
3. **GitHub Actions** - Set up continuous integration/deployment
4. **GitHub Pages** - Host documentation

## Setting Up GitHub Actions (Optional)

You can create a basic CI workflow by adding a `.github/workflows/ci.yml` file:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run linting
      run: npm run lint
      
    - name: Build project
      run: npm run build
```