'use strict';

var agents = require('caniuse-lite').agents;

module.exports = {
  formatBrowserName: function formatBrowserName(browserKey, versions) {
    var browserName = (agents[browserKey] || {}).browser;
    if (!versions) {
      return browserName;
    }
    return browserName + ' (' + versions.join(',') + ')';
  }
};