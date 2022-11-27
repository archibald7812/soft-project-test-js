import React, { useEffect } from 'react';
import { Layout } from './components/Layout/Layout';
import classnames from 'classnames';
import styles from './App.module.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { TodoPage } from './pages/TodoPage/TodoPage';
import { PostsPage } from './pages/PostsPage/PostsPage';
import { AlbumsPage } from './pages/AlbumsPage/AlbumsPage';
import { SinglePost } from './components/SinglePost/SinglePost';
import { AddPost } from './components/AddPost/AddPost';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from './features/photos/photosSlice';


export const App = () => {

  const dispatch = useDispatch()
  const albums = useSelector((state) => {
    return state.albums.albums
  })

  const arrayOfUrls = []

  for (let album of albums) {
    arrayOfUrls.push(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`)
  }

  useEffect(() => {
    dispatch(fetchPhotos(arrayOfUrls))
  }, [albums])

  return (
    <BrowserRouter>
      <div className={classnames(styles.root)}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='posts'>
              <Route index element={<PostsPage />}></Route>
              <Route path='edit/:postId' element={<SinglePost />}></Route>
              <Route path='add' element={<AddPost />}></Route>
            </Route>
            <Route path='albums' element={<AlbumsPage />}></Route>
            <Route path='todos' element={<TodoPage />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}