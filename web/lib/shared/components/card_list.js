import Card from './card';

import React from 'react';

export default class CardList extends React.Component {
  render() {
    return <div>
      <h1>Cards</h1>
      <ol>
        {this.props.cards.map(
          card => <li key={card.get('code')}><Card card={card} /></li>
        )}
      </ol>
    </div>;
  }
}
