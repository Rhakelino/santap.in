const fs = require('fs');
const { createCanvas } = require('canvas');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'sequence');
const frameCount = 240;
const width = 1920;
const height = 1080;

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function generateImages() {
    console.log('Generating images...');
    for (let i = 1; i <= frameCount; i++) {
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Background gradient that changes over time
        const hue = (i / frameCount) * 360;
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, `hsl(${hue}, 50%, 20%)`);
        gradient.addColorStop(1, `hsl(${(hue + 40) % 360}, 50%, 10%)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Add some random noise/shapes to make it look like "scrollytelling" movement
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        const x = (i * 15) % width;
        const y = (Math.sin(i * 0.1) * height / 4) + height / 2;
        ctx.beginPath();
        ctx.arc(x, y, 100, 0, Math.PI * 2);
        ctx.fill();

        // Text equivalent
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 100px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`Frame ${i}`, width / 2, height / 2);

        const buffer = canvas.toBuffer('image/jpeg');
        const fileName = `ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
        fs.writeFileSync(path.join(outputDir, fileName), buffer);

        if (i % 20 === 0) console.log(`Generated ${i}/${frameCount}`);
    }
    console.log('Done!');
}

generateImages();
