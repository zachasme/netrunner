/* eslint-env browser */

import App from 'lib/shared/components/app';
import * as actions from './shared/actions';

import React from 'react';

actions.bootstrap();

export function renderToDOM(container){
  let element = React.createElement(App);
  return React.render(element, container);
}
