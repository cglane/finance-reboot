import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ReactDOMServer from 'react-dom/server';
import Root from './Root';


const render = (Component) => {
  ReactDOMServer.renderToString(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);
if (module.hot) {
  module.hot.accept('./Root', () => {
    const newApp = require('./Root').default;
    render(newApp);
  });
}
