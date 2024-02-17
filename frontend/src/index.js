import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as components from './components';
import * as reducers from './reducers';

const reducer = combineReducers({
  ...reducers,
  // Remove the reference to routerReducer for React Router v6
});

const store = createStore(reducer);
const root = createRoot(document.getElementById('root'));

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route
          path="/"
          element={<components.Menu><components.App /></components.Menu>}
        />
        <Route
          path="bar"
          element={<components.Menu><components.Bar /></components.Menu>}
        />
        <Route
          path="home"
          element={<components.Menu><components.Home /></components.Menu>}
        />
      </Routes>
    </Router>
  </Provider>
);

root.render(<App />);