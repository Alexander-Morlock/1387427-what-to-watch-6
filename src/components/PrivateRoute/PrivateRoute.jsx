import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {AuthorizationStatus} from '../../utils/constants';

const PrivateRoute = ({render, path, exact, authorizationStatus}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render(routeProps)
            : <Redirect to={`/login`} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  "authorizationStatus": PropTypes.string,
  "path": PropTypes.string,
  "exact": PropTypes.string,
  "render": PropTypes.func,
  "component": PropTypes.Component
};

const mapStateToProps = (store) => ({
  authorizationStatus: store.authorizationStatus
});

export default connect(mapStateToProps)(PrivateRoute);
