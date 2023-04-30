/* eslint-disable import/no-extraneous-dependencies */
import React, { FC, useEffect, useState } from 'react';
import '../App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Register from '../ViewController/Register';
import Login from '../ViewController/Login';
import { setUserData } from '../Redux/user/userSlice';
import fetchData from '../utils/fetchData';
import { LOGGED_IN_USER_DATA } from '../utils/apiEndPoint';
import PrivateRoute from '../View/PrivateRoute';
import Home from '../ViewController/Home/Home';
import AddProduct from '../ViewController/AddProduct';

const App : FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = localStorage.getItem('loggedInUserId');
    fetchData(LOGGED_IN_USER_DATA, 'POST', { id }).then((res) => {
      if (res && res.status === 200) {
        const { data } = res;
        dispatch(setUserData(data.id, data.name, data.email));
        setLoading(false);
      } else {
        setLoading(false);
      }
    }).catch((error) => {
      if (error) {
        // console.log('LOGGED_IN_USER_DATA api : ', error);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div>
        <h2>Loading ...</h2>
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<PrivateRoute component={Home} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/product"
            element={<PrivateRoute component={AddProduct} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
