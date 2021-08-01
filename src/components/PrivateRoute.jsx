import React from 'react';
import { Route,Redirect } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../context/Authcontext';

const PrivateRoute = ({component:RouteComponent,...rest}) => {
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser);
    return (
      <Route
        {...rest}
        render={routeProps =>
          currentUser !==null? (
            <RouteComponent {...routeProps} />
          ) : (
            <Redirect to={"/login"} />
          )
        }
      />
    );
  };
 
export default PrivateRoute;