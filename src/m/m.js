let m = require('../../node_modules/myth/node_modules/mithril')
m.prop = require('./model')(m)
m.route = require('./route')(m)
m.remember = require('./remember')(m)
export default m