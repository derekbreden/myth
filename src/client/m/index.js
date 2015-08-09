let m = require('myth/node_modules/mithril-myth')
m.prop = require('./model')(m)
m.route = require('./route')(m)
m.remember = require('./remember')(m)
export default m