import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import shapeOfUser from '../../utils/shape-of-user';
import {AuthorizationStatus} from '../../utils/constants';
import {getAuthorizationStatus, getUser} from '../../store/authorizationReducer/selectors';
import {logOutThunk} from '../../store/api-actions';

const UserAvatar = (props) => {
  return (
    <div className="user-block" style={{position: `relative`}}>
      {
        props.authorizationStatus === AuthorizationStatus.AUTH
          ? <div className="user-block__avatar">
            <Link to="/mylist"><img src={props.user.avatar_url} alt="User avatar" width="63" height="63" /></Link>
            <p style={{position: `absolute`, top: `3px`, right: `75px`, fontSize: `17px`}} onClick={props.logOut}>{props.user.email}</p>
          </div>
          : <div className="user-block">
            <Link to="/login" className="user-block__link">Sign in</Link>
          </div>
      }
    </div>
  );
};

UserAvatar.propTypes = {
  "user": shapeOfUser(),
  "authorizationStatus": PropTypes.string,
  "logOut": PropTypes.func
};

const mapStateToProps = (store) => ({
  user: getUser(store),
  authorizationStatus: getAuthorizationStatus(store),
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOutThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);
