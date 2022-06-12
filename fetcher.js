const request = require('request');
const fs = require('fs');
const argv = process.argv; 

const url = argv[2];
const path = argv[3];
console.log('start')
request(url, (error, response, body) => {
  console.log('1')
  let content = body;
  fs.writeFile(path, content, error => {
    console.log('2')
    if (error) {
      console.log(error);
    }
  })
})
