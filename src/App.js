import React from 'react';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage/HomePage/HomePage';
import classnames from 'classnames';
import styles from './App.module.css'
import { NavPanel } from './components/NavPanel/NavPanel';
import { TodoPage } from './pages/HomePage/TodoPage/TodoPage';

function App() {
  return (

    <div className={classnames(styles.root)}>
      <Layout>
        <NavPanel />
        <TodoPage />
      </Layout>
    </div>


  );
}

export default App;