#!/bin/bash

# Store current package.json
cp package.json package.json.backup

# Create a temporary package.json for frontend deployment
jq 'del(.dependencies["@prisma/client", "prisma", "bcryptjs", "express", "jsonwebtoken"]) | del(.devDependencies["@types/bcryptjs", "@types/express", "@types/jsonwebtoken"])' package.json > package.json.temp
mv package.json.temp package.json

# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Cloudflare Pages (if you have wrangler CLI installed)
# wrangler pages deploy dist

# Restore original package.json
mv package.json.backup package.json

# Reinstall original dependencies
npm install
