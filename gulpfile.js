'use strict';

const build = require('@microsoft/sp-build-web');

// ✅ HARD disable lint task (this is the key)
build.rig.getTasks().get('lint').enabled = false;

build.initialize(require('gulp'));
