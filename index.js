const fs = require('fs');
const inquirer = require('inquirer');
const { createSVG } = require('./lib/svg');

async function promptUser() {
    const questions = [
        {
            type: 'input',
            name: 'text',
            message: 'Enter up to three characters:',
            validate: function (value) {
                return value.length <= 3 ? true : 'Please enter up to three characters.';
            }
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter the text color (keyword or hexadecimal number):'
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape:',
            choices: ['circle', 'triangle', 'square']
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter the shape color (keyword or hexadecimal number):'
        }
    ];

    const answers = await inquirer.prompt(questions);

    // Call a function to create SVG content using the provided answers
    const svgContent = createSVG(answers.text, answers.textColor, answers.shape, answers.shapeColor);

    // Write SVG content to a file named logo.svg
    fs.writeFileSync('logo.svg', svgContent);

    console.log('Generated logo.svg');
}

// Execute the prompt function
promptUser();
