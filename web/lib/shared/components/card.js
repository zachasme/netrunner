import React from 'react';

export default React.createClass({
  render: function() {
    return <div>{this.props.card.get('title')}</div>;
  }
});
