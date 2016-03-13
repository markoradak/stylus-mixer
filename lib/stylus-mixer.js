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

var stylus = require( 'stylus' ),
    path = require( 'path' ),
    nodes = stylus.nodes,
    utils = stylus.utils;

exports = module.exports = function() {

  return function( style ){
    style.include( __dirname );
  };

};

exports.version = require( path.join( __dirname, '../package.json' ) ).version;

exports.path = __dirname;
