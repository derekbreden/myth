// Modifies console.log etc to pass to server
'use strict';

require('./console');

// Builds server side

require('./build_app');

// Builds client side

require('./build_html');

require('./build_css');

require('./build_js');

require('./build_client');

// clean, reload_browser, watch, default

require('./clean');

require('./reload_client');

require('./watch');

require('./default');