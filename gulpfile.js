'use strict';

const build = require('@microsoft/sp-build-web');

// 🔴 Disable ESLint (CI-safe)
build.addSuppression(/eslint/);

build.initialize(require('gulp'));
