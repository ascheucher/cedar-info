/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sys = require('sys')
var exec = require('child_process').exec;
var child;

// Get list of things
exports.index = function(req, res) {
    /*res.json([
  {
  name : 'Development Tools',
  info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }
  ]); */
    child = exec("cat /proc/cpuinfo", function(error, stdout, stderr) {
        sys.print('stdout: ' + stdout);
        sys.print('\n');

        var longLine = stdout.replace(/\n/gm, '#-#');
        var cores = longLine.split(/#-#\s*#-#/gm);

        var processors = [];
        var idx = 0;
        cores.forEach(function(core) {
            var trimmedCores = core.trim();
            if (trimmedCores.length > 0) {
                var attributes = trimmedCores.split('#-#');
                attributes.forEach(function(attribute) {
                    var tokens = attribute.split(/\s*:\s*/gm);
                    var attrName = tokens[0].replace(' ', '_');
                    if (attrName === 'processor') {
                        processors.push({
                            id: tokens[1],
                            attrs: []
                        })
                        idx++;
                    } else {
                        processors[idx - 1].attrs.push({name: attrName, value: tokens[1]});
                    }
                });
            }
        });

        processors.forEach(function(processor) {
            sys.print(JSON.stringify(processor) + '\n');
        });

        if (error !== null) {
            console.log('exec error: ' + error);
        }

        res.json(processors);
    });
};
