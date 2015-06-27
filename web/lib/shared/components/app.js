import CardList from './card_list';
import store from 'lib/shared/store';

import React from 'react';

/*import { RouteStore } from 'laosdirg-flux-router/store'

import {ActorsPage} from 'lib/shared/actor/components/actors_page.jsx!'
import {CasesPage} from 'lib/shared/case/components/cases_page.jsx!'

import { Mixin as FluxMixin } from 'laosdirg-flux/integrations/react'*/

//------------------------------------------------------------------------------

export default class App extends React.Component {

  /*mixins: [ FluxMixin, React.addons.PureRenderMixin ],

  statics: {
    stores: [ RouteStore ],
  },*/


  constructor(props){
    super(props);
    this.state = this.getStateFromStores();
  }

  getStateFromStores() {
    return {
      cards: store.state.get('cards')
    };
  }

  handleStoreChanged() {
    console.log('lol', store.state.toJS());
    // PERF: This bad boy should debounce setState untill dispatch is over
    // PERF: Seriosuly; right now it rerenders the component once per store
    this.setState(this.getStateFromStores());
  }

  /**
   * Attach change listeners when component mounts
   */
  componentDidMount() {
    store.addChangeListener(this.handleStoreChanged.bind(this));
  }

  render() {
    return (
      <div className="FTApp">
        hej
        <CardList cards={this.state.cards} />
      </div>
    );
  }

}
