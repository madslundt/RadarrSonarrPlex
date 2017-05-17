'use strict';

var _ = require('lodash');
var missingSupport = require('./missing-support');
var Detector = require('./detect-feature-use');
var Multimatch = require('multimatch');

function doiuse(options) {
  var browserQuery = options.browsers;
  var onFeatureUsage = options.onFeatureUsage;
  var ignoreOptions = options.ignore;
  var ignoreFiles = options.ignoreFiles;

  return {
    info: function info() {
      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _missingSupport = missingSupport(browserQuery, opts.from);

      var browsers = _missingSupport.browsers;
      var features = _missingSupport.features;

      return {
        browsers: browsers,
        features: features
      };
    },

    postcss: function postcss(css, result) {
      var from = undefined;
      if (css.source && css.source.input) {
        from = css.source.input.file;
      }

      var _missingSupport2 = missingSupport(browserQuery, from);

      var features = _missingSupport2.features;

      var detector = new Detector(_.keys(features));
      return detector.process(css, function (_ref) {
        var feature = _ref.feature;
        var usage = _ref.usage;
        var ignore = _ref.ignore;

        if (ignore && ignore.indexOf(feature) !== -1) {
          return;
        }
        if (ignoreOptions && ignoreOptions.indexOf(feature) !== -1) {
          return;
        }

        if (ignoreFiles && Multimatch(usage.source.input.from, ignoreFiles).length > 0) {
          return;
        }

        var messages = [];
        if (features[feature].missing) {
          messages.push('not supported by: ' + features[feature].missing);
        }
        if (features[feature].partial) {
          messages.push('only partially supported by: ' + features[feature].partial);
        }

        var message = features[feature].title + ' ' + messages.join(' and ') + ' (' + feature + ')';

        result.warn(message, { node: usage, plugin: 'doiuse' });

        if (onFeatureUsage) {
          var loc = usage.source;
          loc.original = css.source.input.map ? {
            start: css.source.input.map.consumer().originalPositionFor(loc.start),
            end: css.source.input.map.consumer().originalPositionFor(loc.end)
          } : {
            start: loc.start,
            end: loc.end
          };

          message = (loc.original.start.source || loc.input.file || loc.input.from) + ':' + loc.original.start.line + ':' + loc.original.start.column + ': ' + message;

          onFeatureUsage({
            feature: feature,
            featureData: features[feature],
            usage: usage,
            message: message
          });
        }
      });
    }
  };
}

module.exports = doiuse;