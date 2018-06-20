import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './Root';


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);
console.log(module.hot, 'hot')
if (module.hot) {
  module.hot.accept('./Root', () => {
    const newApp = require('./Root').default;
    render(newApp);
  });
}
