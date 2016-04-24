/**
 * Build (build.js)
 * ----------------
 * @author Marko Radak <@iammarkoradak>
 * @since  0.1.0
 * @desc   Development build script.
 *         Concats all required files, strips
 *         comments, and removes empty lines.
 */

// list library requirements
var src = [
  './src/internals/config/config.styl',
  './src/internals/support/support.styl',
  './src/internals/functions/aliases.styl',
  './src/internals/functions/queries.styl',
  './src/internals/functions/shorthand.styl',
  './src/tools/vendors/keyframes.styl',
  './src/tools/vendors/props.styl',
  './src/tools/vendors/transform.styl',
  './src/tools/vendors/values.styl',
  './src/tools/legacy/legacy-background.styl',
  './src/tools/legacy/legacy-color.styl',
  './src/tools/legacy/legacy-opacity.styl',
  './src/tools/important/important.styl',
  './src/tools/reset/reset.styl',
  './src/tools/reset/normalize.styl',
  './src/components/variables/colors.styl',
  './src/components/variables/easings.styl',
  './src/components/variables/media.styl',
  './src/components/functions/easing.styl',
  './src/components/functions/em-rem.styl',
  './src/components/functions/percentage.styl',
  './src/components/functions/random.styl',
  './src/components/mixins/animate.styl',
  './src/components/mixins/background-gradient.styl',
  './src/components/mixins/clockhand.styl',
  './src/components/mixins/layout.styl',
  './src/components/mixins/real-height.styl',
  './src/components/mixins/size.styl',
  './src/components/mixins/spring-from.styl',
  './src/components/mixins/spring-in-place.styl',
  './src/components/mixins/spring-to.styl',
  './src/components/mixins/states.styl',
  './src/components/mixins/text-background.styl',
  './src/components/mixins/text-gradient.styl',
  './src/components/mixins/unsplash.styl',
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
