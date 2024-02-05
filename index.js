const fs = require('fs');

async function getUserInput() {
    // Import inquirer
    const inquirer = await import('inquirer');

    // Prompts
    const answers = await inquirer.default.prompt([
        {
            name: 'text',
            type: 'input',
            message: 'Enter One to three characters for the logo:',
            validate: input => input.length <= 3
        },
        {
            name: 'textColor',
            type: 'input',
            message: 'Enter a color keyword or hexadecimal for your preferred text color:'
        },
        {
            name: 'shape',
            type: 'list',
            message: 'Choose a Preferred shape:',
            choices: ['circle', 'triangle', 'square']
        },
        {
            name: 'shapeColor',
            type: 'input',
            message: 'Enter a color keyword or hexadecimal for shape color:'
        }
    ]);
    return answers;
}


// Generate svg
function generateSVG({ text, textColor, shape, shapeColor }) {
    const svgHeader = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;
    let svgShape = '';
    let svgText = '';

    // Shape Center
    const centerX = 150;
    const centerY = 100;

    switch (shape) {
        case 'circle':
            const radius = 50; 
            svgShape = `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="${shapeColor}" />`;
            svgText = `<text x="${centerX}" y="${centerY}" font-size="20" text-anchor="middle" dominant-baseline="central" fill="${textColor}">${text}</text>`;
            break;
        case 'triangle':
            // Height for equilateral triangle
            const triangleHeight = Math.sqrt(3) / 2 * 100; 
            svgShape = `<polygon points="${centerX - 50},${centerY + triangleHeight / 2} ${centerX},${centerY - triangleHeight / 2} ${centerX + 50},${centerY + triangleHeight / 2}" fill="${shapeColor}" />`;
            svgText = `<text x="${centerX}" y="${centerY + 10}" font-size="20" text-anchor="middle" dominant-baseline="middle" fill="${textColor}">${text}</text>`;
            break;
        case 'square':
            const squareSize = 100;
            svgShape = `<rect x="${centerX - squareSize / 2}" y="${centerY - squareSize / 2}" width="${squareSize}" height="${squareSize}" fill="${shapeColor}" />`;
            svgText = `<text x="${centerX}" y="${centerY}" font-size="20" text-anchor="middle" dominant-baseline="middle" fill="${textColor}">${text}</text>`;
            break;
    }

    const svgFooter = `</svg>`;

    return svgHeader + svgShape + svgText + svgFooter;
}


function saveSVG(svgString) {
    fs.writeFileSync('logo.svg', svgString);
    console.log('Generated logo.svg');
}

async function main() {
    const userInput = await getUserInput();
    const svgContent = generateSVG(userInput);
    saveSVG(svgContent);
}

main();