#!/usr/bin/env node

process.argv.push('--gulpfile')
process.argv.push('./node_modules/myth/build/gulpfile')
process.argv.push('--cwd')
process.argv.push('./')

require('../node_modules/gulp/bin/gulp')