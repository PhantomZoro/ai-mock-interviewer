# Complete Software Setup Guide (Windows)

This guide walks you through installing and configuring **every** tool needed for the AI Mock Interviewer project on Windows.

---

## Table of Contents

1. [System Requirements](#1-system-requirements)
2. [Git & Git Bash](#2-git--git-bash)
3. [Node.js & pnpm](#3-nodejs--pnpm)
4. [Python](#4-python)
5. [Docker Desktop](#5-docker-desktop)
6. [VS Code Setup](#6-vs-code-setup)
7. [PostgreSQL Client Tools](#7-postgresql-client-tools)
8. [Redis Client Tools](#8-redis-client-tools)
9. [Google OAuth Setup](#9-google-oauth-setup)
10. [Groq API Setup](#10-groq-api-setup)
11. [AWS Account & CLI Setup](#11-aws-account--cli-setup)
12. [Vercel Setup](#12-vercel-setup)
13. [GitHub Setup](#13-github-setup)
14. [Verification Checklist](#14-verification-checklist)

---

## 1. System Requirements

### Minimum Hardware
```
• RAM: 8GB (16GB recommended)
• Storage: 20GB free space
• CPU: 4 cores recommended (with virtualization support)
```

### Operating System
- **Windows 10** (version 2004 or higher) or **Windows 11**
- Virtualization must be enabled in BIOS (for Docker)

### Check Virtualization is Enabled

1. Open Task Manager (Ctrl + Shift + Esc)
2. Go to "Performance" tab
3. Click on "CPU"
4. Look for "Virtualization: Enabled"

If disabled, you'll need to enable it in BIOS (search for your laptop/PC model + "enable virtualization").

---

## 2. Git & Git Bash

Git Bash provides a Unix-like terminal on Windows.

### Step 2.1: Download and Install Git

1. Go to: https://git-scm.com/download/win
2. Download the installer (64-bit)
3. Run the installer with these settings:
   - Select Components: ✅ Git Bash Here, ✅ Git GUI Here
   - Default editor: Select "Use Visual Studio Code as Git's default editor"
   - PATH environment: Select "Git from the command line and also from 3rd-party software"
   - HTTPS transport: Select "Use the OpenSSL library"
   - Line ending conversions: Select "Checkout Windows-style, commit Unix-style"
   - Terminal emulator: Select "Use MinTTY"
   - Default branch: Select "Override the default branch name" → `main`
   - Everything else: Default options

### Step 2.2: Verify Installation

Open **Git Bash** (search in Start Menu):

```bash
git --version
# Should output: git version 2.x.x
```

### Step 2.3: Configure Git Identity

```bash
# Set your name and email (use your GitHub email)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set VS Code as default editor
git config --global core.editor "code --wait"

# Set default branch name
git config --global init.defaultBranch main

# Verify configuration
git config --list
```

### Step 2.4: Setup SSH Key for GitHub

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"
# Press Enter for default location
# Enter passphrase (optional)

# Start SSH agent
eval "$(ssh-agent -s)"

# Add key to agent
ssh-add ~/.ssh/id_ed25519

# Display public key (copy this)
cat ~/.ssh/id_ed25519.pub
```

**Add to GitHub:**
1. Go to GitHub.com → Settings → SSH and GPG keys
2. Click "New SSH key"
3. Paste your public key
4. Save

**Test connection:**
```bash
ssh -T git@github.com
# Should output: Hi username! You've successfully authenticated...
```

---

## 3. Node.js & pnpm

### Step 3.1: Install nvm-windows

> ⚠️ **Important**: Use `nvm-windows`, NOT the Unix `nvm`. They are different!

1. Go to: https://github.com/coreybutler/nvm-windows/releases
2. Download `nvm-setup.exe` (latest release)
3. Run the installer, accept all defaults
4. **Close Git Bash completely and reopen it**

```bash
# Verify nvm is installed
nvm --version
# Should output: 1.1.x
```

### Step 3.2: Install Node.js 18 LTS

```bash
# Install Node.js 18
nvm install 18

# Use Node.js 18
nvm use 18

# Verify installation
node --version
# Should output: v18.x.x

npm --version
# Should output: 10.x.x
```

### Step 3.3: Install pnpm

```bash
# Install pnpm globally
npm install -g pnpm

# Verify installation
pnpm --version
# Should output: 8.x.x or 9.x.x
```

### Step 3.4: Create Project .nvmrc (Later)

When you create your project, add this file so others know which Node version to use:

```bash
# In project root
echo "18" > .nvmrc
```

---

## 4. Python

### Step 4.1: Check if Python is Already Installed

```bash
python --version
# If you see Python 3.10+ you're good! Skip to Step 4.3
```

### Step 4.2: Install Python (if needed)

1. Go to: https://www.python.org/downloads/windows/
2. Download Python 3.11 or 3.12 installer (64-bit)
3. Run installer
4. **Important**: Check ✅ "Add Python to PATH" at the bottom!
5. Click "Install Now"
6. **Close and reopen Git Bash**

### Step 4.3: Verify Python Installation

```bash
python --version
# Should output: Python 3.11.x or 3.12.x

pip --version
# Should output: pip 23.x.x or 24.x.x
```

### Step 4.4: Install Required Python Packages

```bash
# Install packages (use --user to avoid permission issues)
pip install --user fastapi uvicorn docker

# Verify installation
pip show fastapi
```

> **Note**: If you get "Access is denied" errors, always add `--user` flag to pip commands. This installs to your user directory instead of system directory.

---

## 5. Docker Desktop

Docker runs our PostgreSQL, Redis, and code execution containers.

### Step 5.1: Install Docker Desktop

1. Go to: https://www.docker.com/products/docker-desktop/
2. Download "Docker Desktop for Windows"
3. Run the installer
4. **Important**: When prompted, select ✅ "Use WSL 2 instead of Hyper-V"
   - If WSL2 isn't installed, Docker will prompt you to install it
   - Follow the prompts to install WSL2
5. Complete installation
6. **Restart your computer**

### Step 5.2: Configure Docker Desktop

1. Launch Docker Desktop from Start Menu
2. Wait for Docker to start (whale icon in system tray stops animating)
3. You may need to accept the license agreement
4. If prompted to complete WSL2 setup, follow the instructions

### Step 5.3: Verify Docker Installation

Open Git Bash:

```bash
docker --version
# Should output: Docker version 24.x.x or 25.x.x

docker compose version
# Should output: Docker Compose version v2.x.x

# Test Docker is working
docker run hello-world
# Should pull image and print "Hello from Docker!"
```

### Step 5.4: Docker Settings (Recommended)

1. Open Docker Desktop
2. Click ⚙️ Settings
3. **Resources** → **Advanced**:
   - Memory: 4GB minimum (8GB recommended)
   - CPUs: 2 minimum (4 recommended)
4. **Resources** → **WSL Integration**:
   - Enable integration with your default WSL distro
5. Click "Apply & Restart"

### Troubleshooting Docker

**"Docker daemon is not running":**
- Make sure Docker Desktop is running (whale icon in system tray)
- Try restarting Docker Desktop

**"Virtualization not enabled":**
- Restart computer and enter BIOS
- Enable "Intel VT-x" or "AMD-V" virtualization
- Save and restart

**WSL2 errors:**
```powershell
# Open PowerShell as Administrator and run:
wsl --update
wsl --set-default-version 2
```

---

## 6. VS Code Setup

### Step 6.1: Install VS Code

1. Go to: https://code.visualstudio.com/
2. Download the Windows installer
3. Run installer with these options:
   - ✅ Add "Open with Code" to Windows Explorer context menu
   - ✅ Add to PATH
4. **Restart Git Bash** after installation

```bash
# Verify VS Code is in PATH
code --version
```

### Step 6.2: Install Required Extensions

Open VS Code, press `Ctrl+Shift+X` to open Extensions, and install:

**Essential:**
- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- Prisma (`prisma.prisma`)
- Docker (`ms-azuretools.vscode-docker`)

**Recommended:**
- Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
- GitLens (`eamodio.gitlens`)
- Error Lens (`usernamehw.errorlens`)
- Thunder Client (`rangav.vscode-thunder-client`)
- Auto Rename Tag (`formulahendry.auto-rename-tag`)
- Path Intellisense (`christian-kohler.path-intellisense`)
- Material Icon Theme (`pkief.material-icon-theme`)

**Python:**
- Python (`ms-python.python`)
- Pylance (`ms-python.vscode-pylance`)

**Install via command line (Git Bash):**
```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension prisma.prisma
code --install-extension ms-azuretools.vscode-docker
code --install-extension bradlc.vscode-tailwindcss
code --install-extension eamodio.gitlens
code --install-extension usernamehw.errorlens
code --install-extension rangav.vscode-thunder-client
code --install-extension ms-python.python
code --install-extension ms-python.vscode-pylance
```

### Step 6.3: VS Code Settings

After creating your project, add `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.tabSize": 2,
  "files.eol": "\n",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "typescript.tsdk": "node_modules/typescript/lib",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
  },
  "[python]": {
    "editor.defaultFormatter": "ms-python.python"
  },
  "tailwindCSS.includeLanguages": {
    "typescriptreact": "html"
  }
}
```

---

## 7. PostgreSQL Client Tools

We run PostgreSQL in Docker, but need client tools for debugging.

### Step 7.1: Install psql via PostgreSQL Installer

1. Go to: https://www.postgresql.org/download/windows/
2. Download the installer
3. Run installer
4. **Uncheck everything EXCEPT "Command Line Tools"**
   - We only need psql, not the full server
5. Complete installation

### Step 7.2: Add to PATH

1. Open Start Menu, search "Environment Variables"
2. Click "Edit the system environment variables"
3. Click "Environment Variables"
4. Under "System variables", find `Path`, click Edit
5. Add: `C:\Program Files\PostgreSQL\15\bin` (adjust version number)
6. Click OK on all dialogs
7. **Restart Git Bash**

```bash
# Verify psql
psql --version
# Should output: psql (PostgreSQL) 15.x
```

### Step 7.3: Alternative - Use Docker psql

If you don't want to install PostgreSQL tools, use Docker:

```bash
# Connect to PostgreSQL in Docker (after starting containers)
docker exec -it ai-interviewer-db psql -U postgres -d ai_interviewer_dev
```

### Step 7.4: GUI Tool (Optional)

**pgAdmin** or **DBeaver** provide visual database management:
- pgAdmin: https://www.pgadmin.org/download/pgadmin-4-windows/
- DBeaver: https://dbeaver.io/download/

---

## 8. Redis Client Tools

### Step 8.1: Use Docker redis-cli

Redis doesn't have a native Windows client. Use Docker:

```bash
# Connect to Redis in Docker (after starting containers)
docker exec -it ai-interviewer-redis redis-cli

# Test commands
PING
# Should return: PONG
```

### Step 8.2: GUI Tool (Optional)

**RedisInsight** provides visual Redis management:
- Download: https://redis.com/redis-enterprise/redis-insight/

Or use VS Code extension:
- Redis (`cweijan.vscode-redis-client`)

---

## 9. Google OAuth Setup

### Step 9.1: Create Google Cloud Project

1. Go to: https://console.cloud.google.com/
2. Sign in with your Google account
3. Click "Select a project" → "New Project"
4. Project name: `ai-mock-interviewer`
5. Click "Create"

### Step 9.2: Enable Google+ API

1. In Google Cloud Console, select your project
2. Go to "APIs & Services" → "Library"
3. Search for "Google+ API"
4. Click on it and click "Enable"

### Step 9.3: Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" → "Create"
3. Fill in:
   - App name: `AI Mock Interviewer`
   - User support email: Your email
   - Developer contact email: Your email
4. Click "Save and Continue"
5. **Scopes**: Click "Add or Remove Scopes"
   - Select: `email`, `profile`, `openid`
   - Click "Update"
6. Click "Save and Continue"
7. **Test users**: Add your email
8. Click "Save and Continue"

### Step 9.4: Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Application type: "Web application"
4. Name: `AI Mock Interviewer Web`
5. **Authorized JavaScript origins:**
   ```
   http://localhost:3000
   http://localhost:5173
   ```
6. **Authorized redirect URIs:**
   ```
   http://localhost:3000/api/v1/auth/google/callback
   ```
7. Click "Create"
8. **Copy and save** the Client ID and Client Secret!

### Step 9.5: Add to Environment Variables

Create `.env` file in your project:

```bash
GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

---

## 10. Groq API Setup

Groq provides free API access to fast LLMs (Llama, Mixtral).

### Step 10.1: Create Groq Account

1. Go to: https://console.groq.com/
2. Sign up with email or Google
3. Verify your email

### Step 10.2: Generate API Key

1. Once logged in, go to "API Keys"
2. Click "Create API Key"
3. Name it: `ai-mock-interviewer`
4. **Copy the API key immediately** (you won't see it again!)

### Step 10.3: Add to Environment Variables

```bash
# In your .env file:
GROQ_API_KEY=gsk_your_api_key_here
```

### Step 10.4: Test API Key

```bash
# Test with curl in Git Bash
curl -X POST "https://api.groq.com/openai/v1/chat/completions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama-3.1-70b-versatile",
    "messages": [{"role": "user", "content": "Say hello!"}],
    "max_tokens": 50
  }'
```

### Groq Free Tier Limits

```
• Requests per minute: 30
• Requests per day: 14,400
• Tokens per minute: 6,000
```

---

## 11. AWS Account & CLI Setup

### Step 11.1: Create AWS Account

1. Go to: https://aws.amazon.com/
2. Click "Create an AWS Account"
3. Enter email and account name
4. Complete verification and payment setup
5. Select "Basic support - Free"

### Step 11.2: Create IAM User

1. Sign in to AWS Console
2. Go to "IAM" service
3. Users → "Add users"
4. User name: `ai-interviewer-dev`
5. Check ✅ "Programmatic access"
6. Next: Permissions → "Attach policies directly"
7. Select:
   - `AmazonEC2FullAccess`
   - `AmazonRDSFullAccess`
   - `AmazonS3FullAccess`
   - `CloudWatchFullAccess`
8. Create user
9. **Download the CSV** with Access Key ID and Secret Access Key!

### Step 11.3: Install AWS CLI

1. Download: https://awscli.amazonaws.com/AWSCLIV2.msi
2. Run the installer
3. **Restart Git Bash**

```bash
# Verify installation
aws --version
# Should output: aws-cli/2.x.x
```

### Step 11.4: Configure AWS CLI

```bash
aws configure

# Enter when prompted:
# AWS Access Key ID: YOUR_ACCESS_KEY_FROM_CSV
# AWS Secret Access Key: YOUR_SECRET_KEY_FROM_CSV
# Default region name: us-east-1
# Default output format: json

# Verify configuration
aws sts get-caller-identity
```

---

## 12. Vercel Setup

Vercel will host our React frontend for free.

### Step 12.1: Create Vercel Account

1. Go to: https://vercel.com/
2. Click "Sign Up"
3. **Sign up with GitHub** (recommended)
4. Authorize Vercel

### Step 12.2: Install Vercel CLI

```bash
npm install -g vercel

vercel --version
# Should output: Vercel CLI 32.x.x

# Login to Vercel
vercel login
# Select "Continue with GitHub"
# Browser will open to authorize
```

---

## 13. Claude Code Setup

Claude Code is Anthropic's agentic coding assistant that runs in your terminal.

### Step 13.1: Install Claude Code

**Method 1: npm (Recommended)**
```bash
# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version
```

**Method 2: If npm method doesn't work**
```bash
# Try the direct installer
# Visit: https://docs.anthropic.com/en/docs/claude-code
# Download the Windows installer and run it

# After installation, restart Git Bash and verify:
claude --version
```

**Method 3: Using npx (no installation)**
```bash
# Run without installing globally
npx @anthropic-ai/claude-code
```

### Step 13.2: First Run & Authentication

```bash
# Navigate to any project folder
cd ~/Projects

# Start Claude Code
claude

# On first run:
# 1. A browser window will open automatically
# 2. Log in to your Anthropic account (or create one at console.anthropic.com)
# 3. You need Claude Max subscription ($100/mo) OR API credits
# 4. Authorize Claude Code
# 5. Return to terminal - you'll see the Claude Code prompt
```

### Step 13.3: Verify It Works

```bash
# Start Claude Code
claude

# You should see:
# ╭─────────────────────────────────────────╮
# │ Claude Code                             │
# │ Type your message or /help for commands │
# ╰─────────────────────────────────────────╯

# Type "hello" to test
# Type /exit to quit
```

### Troubleshooting Claude Code

**"command not found" after npm install:**
```bash
# Check npm global bin location
npm config get prefix

# The output might be something like:
# C:\Users\YourName\AppData\Roaming\npm

# Make sure this path is in your Windows PATH:
# 1. Windows Search → "Environment Variables"
# 2. Edit PATH under User variables
# 3. Add: C:\Users\YourName\AppData\Roaming\npm
# 4. Restart Git Bash

# Alternative: Use npx instead
npx @anthropic-ai/claude-code
```

**npm install fails with permission errors:**
```bash
# Try with --force flag
npm install -g @anthropic-ai/claude-code --force

# Or fix npm permissions
npm config set prefix ~/npm-global
export PATH=~/npm-global/bin:$PATH
npm install -g @anthropic-ai/claude-code
```

**Authentication issues:**
1. You need an Anthropic account: https://console.anthropic.com
2. Claude Code requires either:
   - Claude Max subscription ($100/month with 5x usage)
   - Claude Pro subscription ($20/month)
   - API credits in your account
3. Check your subscription: https://claude.ai/settings/subscription

**Using Claude Code:**
- Start: `claude` in your project directory
- Exit: `/exit` or Ctrl+D
- Help: `/help` for all commands
- Clear: `/clear` to reset conversation

---

## 14. GitHub Setup

### Step 14.1: Create GitHub Account (if needed)

1. Go to: https://github.com/
2. Sign up with email
3. Verify email

### Step 14.2: Create Repository

1. Click "+" → "New repository"
2. Repository name: `ai-mock-interviewer`
3. Description: `AI-powered mock interview platform for DSA and System Design`
4. Select "Private"
5. **DO NOT** initialize with README
6. Click "Create repository"

### Step 14.3: Clone Repository

```bash
# Clone via SSH
git clone git@github.com:YOUR_USERNAME/ai-mock-interviewer.git

# Enter the directory
cd ai-mock-interviewer
```

---

## 15. Verification Checklist

Run this verification in **Git Bash**:

```bash
echo "========================================="
echo "   AI Mock Interviewer - Setup Check"
echo "========================================="
echo ""

echo "=== Git ===" 
git --version

echo ""
echo "=== Node.js ===" 
node --version
npm --version

echo ""
echo "=== pnpm ===" 
pnpm --version

echo ""
echo "=== Python ===" 
python --version
pip --version

echo ""
echo "=== Docker ===" 
docker --version
docker compose version

echo ""
echo "=== AWS CLI ===" 
aws --version

echo ""
echo "=== Vercel CLI ===" 
vercel --version

echo ""
echo "=== Claude Code ===" 
claude --version

echo ""
echo "=== VS Code ===" 
code --version

echo ""
echo "=== Docker Test ===" 
docker run --rm hello-world 2>/dev/null && echo "Docker is working!" || echo "Docker failed!"

echo ""
echo "========================================="
echo "   Verification Complete!"
echo "========================================="
```

### Expected Output

```
=========================================
   AI Mock Interviewer - Setup Check
=========================================

=== Git ===
git version 2.43.0.windows.1

=== Node.js ===
v18.19.0
10.2.3

=== pnpm ===
8.14.0

=== Python ===
Python 3.12.1
pip 24.0

=== Docker ===
Docker version 24.0.7, build afdd53b
Docker Compose version v2.23.3-desktop.2

=== AWS CLI ===
aws-cli/2.15.0

=== Vercel CLI ===
Vercel CLI 32.7.2

=== VS Code ===
1.85.1

=== Docker Test ===
Docker is working!

=========================================
   Verification Complete!
=========================================
```

---

## Quick Reference

### All Versions Summary

| Tool | Minimum | Recommended |
|------|---------|-------------|
| Windows | 10 (2004+) | 11 |
| Node.js | 18.x | 18.19.x LTS |
| npm | 9.x | 10.x |
| pnpm | 8.x | 8.14.x |
| Python | 3.10 | 3.11 or 3.12 |
| Docker | 24.x | Latest |
| Git | 2.x | Latest |

### Service URLs (Development)

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000 |
| PostgreSQL | localhost:5432 |
| Redis | localhost:6379 |
| Code Executor | http://localhost:8000 |

### Default Credentials

| Service | Username | Password |
|---------|----------|----------|
| PostgreSQL | postgres | postgres |
| Redis | - | - |

---

## Troubleshooting

### "command not found" after installation

Close Git Bash completely and reopen it. Windows needs to reload PATH.

### Docker won't start

1. Make sure virtualization is enabled in BIOS
2. Open PowerShell as Admin and run: `wsl --update`
3. Restart Docker Desktop

### nvm command not found

1. Make sure you installed nvm-windows (not Unix nvm)
2. Close and reopen Git Bash
3. Check if `C:\Users\YourName\AppData\Roaming\nvm` exists

### Python not found

1. Reinstall Python with ✅ "Add to PATH" checked
2. Or manually add to PATH: `C:\Users\YourName\AppData\Local\Programs\Python\Python311`

### Git Bash shows weird characters

Add to `~/.bashrc`:
```bash
export LANG=en_US.UTF-8
```

---

## Next Steps

Once all verifications pass:

1. ✅ Create GitHub repository
2. ✅ Clone repository locally  
3. ✅ Start with Phase 0, Task P0.1.1
4. ✅ Begin building!
