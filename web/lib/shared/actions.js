import dispatcher from './dispatcher';

import * as api from 'lib/api';

import Immutable from 'immutable';


export function bootstrap(){
  dispatcher.dispatch({type: 'BOOTSTRAP_BEGUN'});
  api.initialize().then(cards => {
    dispatcher.dispatch({
      type: 'BOOTSTRAP_DONE',
      cards: Immutable.fromJS(cards)
    });
  });
}
