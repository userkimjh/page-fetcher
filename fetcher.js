const request = require('request');
const readline = require('readline');
const fs = require('fs');
const { constants } = require('buffer');
const argv = process.argv; 

const url = argv[2];
const path = argv[3];


rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


const writeFile = (path, content) => {
  fs.writeFile(path, content, error => {
    if (error) {
      if (error.errno === -2) {
        console.log("No such file or directory")
        process.exit();
      }
    }
  });
};

request(url, (error, response, body) => {
  if (error.errno === -3008) {
    console.log("URL Invalid")
    process.exit();
  }
  // check if file path is valid
  // check if url is valid
  fs.access(path, constants.F_OK, (err) => {
    if (err === null) {
      rl.question("The file already exists, would you like to overwrite the file? [y/n]", ans => {
        rl.close()
        (ans === "y") ? writeFile(path) : process.exit();
        })
    } else {
      writeFile(path, body);
    }
  })
})
