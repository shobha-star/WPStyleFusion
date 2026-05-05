const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

content = content.replace(/black-start/g, 'indigo-start');
content = content.replace(/black-end/g, 'indigo-end');
content = content.replace(/text-black/g, 'text-indigo-950');
content = content.replace(/bg-black\//g, 'bg-indigo-950/');
content = content.replace(/border-black\//g, 'border-indigo-950/');
content = content.replace(/shadow-black\//g, 'shadow-indigo-950/');

fs.writeFileSync('app/page.tsx', content);
