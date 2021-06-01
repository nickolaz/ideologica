import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "../store/store";

export const PrivateRoute = ({ component: Component, ...rest } : any) => {
  const token = useSelector((state : RootState) => state.home.token);
  return (
    <Route
      {...rest}
      render={props => {
        if (token) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
