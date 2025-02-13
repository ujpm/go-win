# Store current package.json
Copy-Item package.json package.json.backup

# Create temporary package.json content without backend dependencies
$packageJson = Get-Content package.json | ConvertFrom-Json
$packageJson.dependencies.PSObject.Properties.Remove('@prisma/client')
$packageJson.dependencies.PSObject.Properties.Remove('prisma')
$packageJson.dependencies.PSObject.Properties.Remove('bcryptjs')
$packageJson.dependencies.PSObject.Properties.Remove('express')
$packageJson.dependencies.PSObject.Properties.Remove('jsonwebtoken')

if ($packageJson.devDependencies) {
    $packageJson.devDependencies.PSObject.Properties.Remove('@types/bcryptjs')
    $packageJson.devDependencies.PSObject.Properties.Remove('@types/express')
    $packageJson.devDependencies.PSObject.Properties.Remove('@types/jsonwebtoken')
}

# Save temporary package.json
$packageJson | ConvertTo-Json -Depth 10 | Set-Content package.json

# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Cloudflare Pages (if you have wrangler CLI installed)
# wrangler pages deploy dist

# Restore original package.json
Move-Item package.json.backup package.json -Force

# Reinstall original dependencies
npm install
