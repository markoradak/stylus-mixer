// deasync function
var when = function() {
  var args = arguments;  // the functions to execute first
  return {
    then: function(done) {
      var counter = 0;
      for(var i = 0; i < args.length; i++) {
        // call each function with a function to call on done
        args[i](function() {
          counter++;
          if(counter === args.length) {  // all functions have notified they're done
            done();
          }
        });
      }
    }
  };
};

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

function concatSrc( done ) {

  var concat = require('concat-files');

    concat(src, './lib/stylus-mixer.styl', function() {
      done()
    });

}

function stripLib() {

  var fs = require('fs');
  var lib = fs.readFileSync('./lib/stylus-mixer.styl', { encoding: 'utf8' });
  var strip = require('strip-comment');

  var stripped = strip.js(lib);
  var stripped = stripped.replace(/^\s*[\r\n]/gm, '');

  fs.writeFile('./lib/stylus-mixer.styl', stripped);

}

when( concatSrc ).then( stripLib );
