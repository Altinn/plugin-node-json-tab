'use strict';

const fs = require('fs-extra'),
  glob = require('glob');

let config = require('./package.json');
let fileTypes = [];

    fileTypes = ["json"]

    if (fileTypes.length === 1 && fileTypes[0] === '') {
      console.log('No filetype(s) provided. Returning unconfigured!');
      return;
    }

    for (let i = 0; i < fileTypes.length; i++) {
      if (fileTypes[i].charAt(0) === '.') {
        fileTypes[i] = fileTypes[i].slice(1);
      }
    }

    console.log('Adding configuration for tabs', fileTypes, 'inside package.json');
    config.fileTypes = fileTypes;
    fs.outputFileSync('./package.json', JSON.stringify(config, null, 2), 'utf-8');

