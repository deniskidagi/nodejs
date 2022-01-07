const chalk = require('chalk')
const fs = require('fs')



fs.writeFileSync('notes.txt', 'this file was created with node.js!')
fs.appendFileSync('notes.txt', 'this is theappended file in the previous notes.txt')

console.log(chalk.green.bold.inverse('success'))