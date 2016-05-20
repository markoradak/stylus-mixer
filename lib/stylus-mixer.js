/**
 * Mixer (stylus-mixer.styl)
 * -------------------------
 * @author  Marko Radak <@iammarkoradak>
 * @version 0.1.0
 * @desc    Stylus library offering powerfull
 *          functions and mixins, as well as
 *          advanced auto-prefixing with property
 *          lookup, global resets, normalization,
 *          and much more.
 */

var stylus       = require( 'stylus' ),
    poststylus   = require( 'poststylus' ),
    autoprefixer = require( 'autoprefixer' ),
    important    = require( 'postcss-safe-important' ),
    path         = require( 'path' ),
    isS          = require( 'lodash/isString' ),
    isN          = require( 'lodash/isNumber' ),
    isO          = require( 'lodash/isObject' ),
    isB          = require( 'lodash/isBoolean' ),
    isA          = require( 'lodash/isArray' ),
    nodes        = stylus.nodes,
    utils        = stylus.utils;

exports = module.exports = function() {

  return function( style ){

    style.include( __dirname );

    style.define('configurePlugins', ( data ) => {

      var conf = parse(data);

      if (isS(conf.browsers)) conf.browsers = conf.browsers.split(/\ *, */g);
      if (isO(conf.browsers)) conf.browsers = Object.keys(conf.browsers)
        .reduce((a,k) => { a[parseInt(k)] = conf.browsers[k]; return a },[]);

      if ( conf.autoPrefixer ) {
        style.use( poststylus( [ autoprefixer( {
          browsers: conf.browsers
        })]))
      }

      if ( conf.autoImportant ) {
        style.use( poststylus([important]) )
      }

    });

  };

};

function parse (data) {
  if (isS(data.val)) {
    return data.val;
  } else if (isS(data.string)) {
    return data.string;
  } else if (isN(data.val)) {
    return data.val;
  } else if (isB(data.val)) {
    return data.val;
  } else if (isO(data.vals)) {
    return Object.keys(data.vals).reduce((o,k) => {
      o[k] = parse(data.vals[k]); return o;
    },{});
  } else if (isA(data.nodes)) {
    if (data.nodes.length > 1) {
      return data.nodes.map(parse);
    } else {
      return parse(data.nodes[0]);
    }
  }
}

exports.version = require( path.join( __dirname, '../package.json' ) ).version;

exports.path = __dirname;
