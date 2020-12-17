import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth';
import Layout from '../components/_commons/Layout';

export const ProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={
      (props) => {
        if(auth.isAuthenticated()){
          return (
            <Layout>
              <Component {...rest} />
            </Layout>
          )
        }
        return <Redirect to={
          {
            pathname: "/signin",
            state: {
              from: props.location
            }
          }
        } />
      }
    } />
  )
}
