/**
 * Build (build.js)
 * ----------------
 * @author OhLabs™ <@OhLabsIO> (https://ohlabs.io)
 * @since  0.1.0
 * @desc   Development build script.
 *         Concats all required files, strips
 *         comments, and removes empty lines.
 */

// require 'fs'
var exec = require('child_process').exec;

// list library requirements
var src = [
  './src/internals/mixins.styl',
  './src/internals/config.styl',
  './src/resets/reset.styl',
  './src/resets/normalize.styl',
  './src/variables/colors.styl',
  './src/variables/easings.styl',
  './src/variables/media.styl',
  './src/functions/easing.styl',
  './src/functions/em-rem.styl',
  './src/functions/percentage.styl',
  './src/functions/random.styl',
  './src/mixins/animate.styl',
  './src/mixins/clockhand.styl',
  './src/mixins/layout.styl',
  './src/mixins/nth.styl',
  './src/mixins/placeholder.styl',
  './src/mixins/real-height.styl',
  './src/mixins/size.styl',
  './src/mixins/spring-from.styl',
  './src/mixins/spring-in-place.styl',
  './src/mixins/spring-to.styl',
  './src/mixins/states.styl',
  './src/mixins/text-background.styl',
  './src/mixins/unsplash.styl',
]

// deasync function …
var when = function() {
  var args = arguments;
  return {
    then: function(done) {
      var counter = 0;
      for(var i = 0; i < args.length; i++) {
        args[i](function() {
          counter++;
          if(counter === args.length) {
            done();
          }
        });
      }
    }
  };
};

// concat source
function concatSrc( done ) {

  // require 'concat-files'
  var concat = require('concat-files');

    // concat
    concat(src, './lib/stylus-mixer.styl', function() {
      done()
    });

}

// strip library
function stripLib() {

  // require 'fs'
  var fs = require('fs');

  // require 'strip'
  var strip = require('strip-comment');

  // read file
  var lib = fs.readFileSync('./lib/stylus-mixer.styl', { encoding: 'utf8' });

  // strip comments
  var stripped = strip.js(lib);

  // strip empty lines
  var stripped = stripped.replace(/^\s*[\r\n]/gm, '');

  // write file
  fs.writeFile('./lib/stylus-mixer.styl', stripped);

}

// execute deasynchronously
when( concatSrc ).then( stripLib );

// log done
console.log('> all done \n')
