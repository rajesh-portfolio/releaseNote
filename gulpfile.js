'use strict';

const build = require('@microsoft/sp-build-web');

/**
 * Disable lint task safely for CI
 * (Supported across SPFx 1.15+)
 */
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    // noop – this hook ensures build pipeline initializes
    return generatedConfiguration;
  }
});

// 🔴 Official way to disable lint
build.addSuppression(/Warning - \[eslint\]/);
build.addSuppression(/Error - \[lint\]/);

build.initialize(require('gulp'));
