/* eslint-env browser */

export function initialize() {
  return fetch('http://netrunnerdb.com/api/cards/').then(
    response => response.json()
  );
}
