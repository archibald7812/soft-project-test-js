import React from 'react';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage/HomePage';
import classnames from 'classnames';
import styles from './App.module.css'
import { NavPanel } from './components/NavPanel/NavPanel';
import { Provider } from 'react-redux'
import { store } from './app/store';

function App() {
  return (
    <Provider store={store}>
      <div className={classnames(styles.root)}>
        <Layout>
          <NavPanel />
          <HomePage />
        </Layout>
      </div>
    </Provider>

  );
}

export default App;