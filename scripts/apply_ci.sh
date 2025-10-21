#!/usr/bin/env bash
set -euo pipefail

# Ensure the branch exists and is up to date
git fetch origin
git checkout -B copilot/ri-core-scaffold origin/copilot/ri-core-scaffold || git checkout -b copilot/ri-core-scaffold

# Ensure workflow directory exists
mkdir -p .github/workflows

# Write the workflow file
cat > .github/workflows/ci.yml <<'EOF'
name: Riverbraid CI Pipeline

concurrency:
  group: riverbraid-${{ github.ref }}
  cancel-in-progress: true

on:
  push:
    branches:
      - main
      - copilot/ri-core-scaffold
  pull_request:
    branches:
      - main

permissions:
  contents: read
  pages: write

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Python 3.11
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install --no-cache-dir -r requirements.txt

      - name: Run tests
        run: |
          pytest -q

      - name: Upload test artifacts
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: pytest-results
          path: .pytest_cache

      - name: Build Docker image (local CI image, not pushed)
        uses: docker/build-push-action@v4
        with:
          context: .
          push: false
          tags: riverbraid/riverbraid-substrate-core:ci-${{ github.sha }}

  deploy-ui:
    needs: test-and-build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment:
      name: github-pages
      url: https://riverbraid.github.io/riverbraid-substrate-core/
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Deploy /ui to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./ui
EOF

# Prepend README badges if not already added
if ! grep -q "Build Status" README.md; then
  cat <<'BADGES' | cat - README.md > README.tmp && mv README.tmp README.md
[![Build Status](https://github.com/Riverbraid/riverbraid-substrate-core/actions/workflows/ci.yml/badge.svg)](https://github.com/Riverbraid/riverbraid-substrate-core/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy](https://img.shields.io/badge/UI%20Deploy-GitHub%20Pages-blue)](https://riverbraid.github.io/riverbraid-substrate-core/)

BADGES
fi

# Stage and commit changes
git add .github/workflows/ci.yml README.md
git commit -m "chore(ci): add Riverbraid CI Pipeline (pytest + Docker + GH Pages) and README badges" || echo "No new changes to commit"

# Push branch (this triggers the workflow run)
git push origin copilot/ri-core-scaffold

# Create pull request via GitHub CLI
gh pr create \
  --title "Scaffold: RI OS v7.0 substrate core (copilot/ri-core-scaffold)" \
  --body "Adds the Riverbraid CI Pipeline (install deps, pytest, Docker image build, artifact upload, and GH Pages deployment) and updates README badges." \
  --base main --head copilot/ri-core-scaffold
