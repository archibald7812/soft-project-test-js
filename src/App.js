import React, { useEffect } from 'react';
import { Layout } from './components/Layout/Layout';
import classnames from 'classnames';
import styles from './App.module.css'
import { HashRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { TodoPage } from './pages/TodoPage/TodoPage';
import { PostsPage } from './pages/PostsPage/PostsPage';
import { AlbumsPage } from './pages/AlbumsPage/AlbumsPage';
import { SinglePost } from './components/SinglePost/SinglePost';
import { AddPost } from './components/AddPost/AddPost';

export const App = () => {
  return (
    <HashRouter>
      <div className={classnames(styles.root)}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='posts'>
              <Route index element={<PostsPage />}></Route>
              <Route path='edit/:postId' element={<SinglePost />}></Route>
              <Route path='create' element={<AddPost />}></Route>
            </Route>
            <Route path='albums' element={<AlbumsPage />}></Route>
            <Route path='todos' element={<TodoPage />}></Route>
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}