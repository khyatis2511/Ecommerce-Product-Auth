/* eslint-disable import/no-extraneous-dependencies */
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { user } from '../../Redux/user/userSlice';

interface PrivateRouteProps {
  component: React.ComponentType
}

const PrivateRoute: FC<PrivateRouteProps> = ({ component: RouteComponent }) => {
  const userData = useSelector(user);

  if (userData && Object.keys(userData).length !== 0 && userData.id) {
    return <RouteComponent />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
