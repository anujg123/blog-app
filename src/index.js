import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthLayout, Login } from './components/index';
import AllPost from './pages/AllPost';
import EditPost from './pages/EditPost';
import Post from './pages/Post';
import AddPost from './pages/AddPost'
import Signup from './pages/Signup';
import Home from './pages/Home.js'

const router=createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    children : [
      {
        path: '/',
        element: <Home/>
      },
      {
        path : '/login',
        element : (
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path : '/signup',
        element : (
          <AuthLayout authentication={false}>
            <Signup/>
          </AuthLayout>
        )
      },
      {
        path : '/all-posts',
        element : (
          <AuthLayout authentication>
          {" "}
            <AllPost/>
          </AuthLayout>
        )
      },
      {
        path : '/add-post',
        element : (
          <AuthLayout authentication>
          {" "}
            <AddPost/>
          </AuthLayout>
        )
      },
      {
        path : '/edit-post/:slug',
        element : (
          <AuthLayout authentication>
          {" "}
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path : '/post/:slug',
        element : (
          <AuthLayout authentication>
          {" "}
            <Post/>
          </AuthLayout>
        )
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
    <App/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
