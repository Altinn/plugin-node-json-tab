"use strict";

const fs = require('fs-extra'),
  path = require('path'),
  fileTypes = require('./../package.json').fileTypes;

/**
 * The backend method that is called during the patternlab-pattern-write-end event.
 * Responsible for looking for a companion filetype file alongside a pattern file and outputting it if found.
 * @param patternlab - the global data store
 * @param pattern - the pattern object being iterated over
 */
function findTab(patternlab, pattern) {

  //exit if either of these two parameters are missing
  if (!patternlab) {
    console.error('plugin-node-json-tab: patternlab object not provided to findTab');
    process.exit(1);
  }

  if (!pattern) {
    console.error('plugin-node-json-tab: pattern object not provided to findTab');
    process.exit(1);
  }

  //derive the custom filetype paths from the pattern relPath
  var customFileTypePath = path.join(patternlab.config.paths.source.patterns, pattern.relPath);

  //loop through all configured types
  for (let i = 0; i < fileTypes.length; i++) {

    customFileTypePath = customFileTypePath.substr(0, customFileTypePath.lastIndexOf(".")) + '.' + fileTypes[i];
    var customFileTypeOutputPath = patternlab.config.paths.public.patterns + pattern.getPatternLink(patternlab, 'custom', '.' + fileTypes[i]);

    //look for a custom filetype for this template
    try {
        fs.outputFileSync(customFileTypeOutputPath, JSON.stringify(pattern.jsonFileData, null, '\t'));
    }
    catch (err) {
      console.log('plugin-node-json-tab:There was an error parsing sibling JSON for ' + pattern.relPath);
      console.log(err);
    }
  }
}

module.exports = findTab;
