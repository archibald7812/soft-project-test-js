import React from 'react';
import { Layout } from './components/Layout/Layout';
import classnames from 'classnames';
import styles from './App.module.css'
import { NavPanel } from './components/NavPanel/NavPanel';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { TodoPage } from './pages/TodoPage/TodoPage';
import { PostsPage } from './pages/PostsPage/PostsPage';
import { AlbumsPage } from './pages/AlbumsPage/AlbumsPage';
import { fetchAlbums } from "./features/albums/albumsSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAlbums())
  }, [])

  return (
    <BrowserRouter>
      <div className={classnames(styles.root)}>
        <Layout>
          <NavPanel />
          <Routes>
            <Route index element={<HomePage />}></Route>
            <Route path='/todos' element={<TodoPage />}></Route>
            <Route path='/posts' element={<PostsPage />}></Route>
            <Route path='/albums' element={<AlbumsPage />}></Route>
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}