const fs = require('fs');
const path = require('path');

const filePath = path.join('c:', 'Users', 'mansh', 'Desktop', 'fortfolio', 'style.css');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
let braceCount = 0;
let inComment = false;
let errors = [];

lines.forEach((line, index) => {
    const lineNum = index + 1;
    let trimmed = line.trim();

    // Check for JS style comments
    if (trimmed.includes('//') && !trimmed.includes('https://')) {
        errors.push(`Line ${lineNum}: Potential JS comment '//' found.`);
    }

    // Check for unclosed comments
    let charIndex = 0;
    while (charIndex < trimmed.length) {
        if (!inComment && trimmed.substr(charIndex, 2) === '/*') {
            inComment = true;
            charIndex++;
        } else if (inComment && trimmed.substr(charIndex, 2) === '*/') {
            inComment = false;
            charIndex++;
        }
        charIndex++;
    }

    if (!inComment) {
        let cleanLine = line.replace(/\/\*[\s\S]*?\*\//g, '');

        for (let char of line) {
            if (char === '{') braceCount++;
            if (char === '}') braceCount--;
        }

        // Semicolon check
        if (cleanLine.includes(':') && !cleanLine.includes('{') && !cleanLine.includes('}') && !cleanLine.trim().endsWith(';') && !cleanLine.trim().endsWith(',')) {
            if (cleanLine.match(/^\s*[a-zA-Z-]+\s*:\s*[^;]+$/)) {
                errors.push(`Line ${lineNum}: Missing semicolon? '${trimmed}'`);
            }
        }

        // Invalid comma check for scalar properties (extended)
        const noCommaProps = ['margin', 'padding', 'width', 'height', 'top', 'left', 'right', 'bottom', 'font-size', 'line-height', 'gap', 'border-radius', 'border', 'border-width'];
        noCommaProps.forEach(prop => {
            // Regex to find 'property: val1, val2' where no parens exist (to exclude rgba etc)
            const regex = new RegExp(`^\\s*${prop}\\s*:.*,`, 'i');
            if (regex.test(cleanLine) && !cleanLine.includes('(') && !cleanLine.includes(')')) {
                errors.push(`Line ${lineNum}: Invalid comma in '${prop}'? '${trimmed}'`);
            }
        });
    }
});

if (braceCount !== 0) {
    errors.push(`Unbalanced braces! Final count: ${braceCount}`);
}
if (inComment) {
    errors.push(`Unclosed comment at end of file!`);
}

if (errors.length > 0) {
    console.log("Errors found:");
    errors.forEach(e => console.log(e));
} else {
    console.log("No obvious errors found.");
}
