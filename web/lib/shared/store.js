import dispatcher from 'lib/shared/dispatcher';

import Immutable from 'immutable';

export class ChangeEmitter {
  constructor() {
    this._listeners = [];
  }

  addChangeListener(listener) {
    this._listeners.push(listener);
  }

  removeChangeListener(listener) {
    let index = this._listeners.indexOf(listener);
    this._listeners.splice(index, 1);
  }

  emitChange() {
    this._listeners.forEach(listener => listener());
  }
}

class Store extends ChangeEmitter {
  constructor(dispatcher) {
    super();

    this.displayName = this.constructor.name;

    // Initialize state
    let state = Immutable.fromJS(this.getInitialState());
    console.log('State initialized in store: "%s".', this.displayName, state.toJS());

    // Ensure state is not mutated directly; mutate only in action handler
    // (basically the same as `this.state = state` but with mutation-warning)
    Object.defineProperty(this, 'state', {
      enumerable: true,
      get(){
        return state
      },
      set( value ){
        warn("State was set directly on " + this.displayName + ". Do not set store state directly.", new Error().stack)
        state = value
      }
    });

    // Register action handler, returning dispatch token (used with waitFor)
    this.DISPATCH_TOKEN = dispatcher.register(payload => {
      // Compute next state. Action handlers must return new state object
      let nextState = this.handleAction(payload);

      // Ensure validity of returned state; it must be an immutable collection
      let isStateValid = nextState instanceof Immutable.Iterable;
      if (!isStateValid) {
        throw new Error('Store handler on ' + this.displayName + ' returned invalid state. Always return an Immutable object.');
      }

      // Check for state change, which is easy, thanks to immutable collections
      let hasStateChanged = nextState !== this.state;
      if (hasStateChanged) {
        // If so, update state and emit change event
        state = nextState;
        console.log('State changed in store: "%s".', this.displayName, state.toJS());
        this.emitChange();
      }
    });
  }

  getInitialState() {
    return {
      cards: []
    };
  }

  handleAction(action) {
    switch (action.type) {
      case 'BOOTSTRAP_DONE':
        return this.state.set('cards', action.cards);

      default:
        return this.state;
    }
  }
}

export default new Store(dispatcher);
