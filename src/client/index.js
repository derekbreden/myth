window.m = require('myth/node_modules/mithril-myth')
window.socket = require('./socket') // import syntax hoists erg ...
m.nest = (which) => m.component(m.nest.data[which])
m.nest.data = require('./tmp_modules')