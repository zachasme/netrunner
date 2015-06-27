/* eslint-env browser */

import {renderToDOM} from 'lib/netrunner';

// wait for dom before mounting
//window.addEventListener('DOMContentLoaded', () => {
  // render state to ui (and bind store listeners)
  let container = document.getElementById('main');

  renderToDOM(container);
//});
