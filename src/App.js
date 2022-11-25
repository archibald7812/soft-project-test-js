import React from 'react';
import { Layout } from './components/Layout/Layout';
import classnames from 'classnames';
import styles from './App.module.css'
import { NavPanel } from './components/NavPanel/NavPanel';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { TodoPage } from './pages/TodoPage/TodoPage';
import { PostsPage } from './pages/PostsPage/PostsPage';


function App() {
  return (
    <BrowserRouter>
      <div className={classnames(styles.root)}>
        <Layout>
          <NavPanel />
          <Routes>
            <Route index element={<HomePage />}></Route>
            <Route path='/todos' element={<TodoPage />}></Route>
            <Route path='/posts' element={<PostsPage />}></Route>
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;