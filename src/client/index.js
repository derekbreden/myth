window.m = require('myth/node_modules/mithril-myth')
window.socket = require('./socket') // import syntax hoists erg ...
m.child = function(which, extra){
  extra = extra || {}
  extra.parent = this
  if(this.name&&this.name!=='root')
    for(let i in this)
      if(i !== 'children' && i !== 'parent')
        extra[i] = this[i]
  return m.component(m.child.data[which], extra, which)
}
m.child.data = require('./tmp_modules')