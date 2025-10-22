const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const toIco = require('to-ico')

const sizes = [16, 32, 48, 64, 128, 192, 512]
const inputSvg = path.join(__dirname, '../public/logo.svg')
const outputDir = path.join(__dirname, '../public')
const appDir = path.join(__dirname, '../src/app')

async function generateFavicons() {
  console.log('Generating favicons...')

  // Generate PNG favicons for different sizes
  for (const size of sizes) {
    await sharp(inputSvg)
      .resize(size, size)
      .png()
      .toFile(path.join(outputDir, `favicon-${size}x${size}.png`))
    console.log(`✓ Generated favicon-${size}x${size}.png`)
  }

  // Generate apple-touch-icon
  await sharp(inputSvg)
    .resize(180, 180)
    .png()
    .toFile(path.join(outputDir, 'apple-touch-icon.png'))
  console.log('✓ Generated apple-touch-icon.png')

  // Generate favicon.ico with multiple sizes (16x16, 32x32, 48x48)
  const icoSizes = [16, 32, 48]
  const icoBuffers = []

  for (const size of icoSizes) {
    const buffer = await sharp(inputSvg).resize(size, size).png().toBuffer()
    icoBuffers.push(buffer)
  }

  const icoBuffer = await toIco(icoBuffers)
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer)
  console.log('✓ Generated favicon.ico in src/app/')

  console.log('✓ All favicons generated successfully!')
}

generateFavicons().catch(console.error)