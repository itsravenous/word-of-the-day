var fs = require('fs');

// Oh boy
fs.writeFileSync('./config.json', fs.readFileSync('./config.example.json'));

console.log('Done');

