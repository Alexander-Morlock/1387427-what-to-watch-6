import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {sendAuthorizationThunk} from '../../store/api-actions';
import {AuthorizationStatus} from '../../utils/constants';
import {getAuthorizationStatus} from '../../store/authorization-reducer/selectors';

const SignIn = ({authorizationStatus, sendAuthorization}) => {
  const [validationError, setValidationError] = useState(null);

  const history = useHistory();
  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      history.push(`/`);
    }
  }, [authorizationStatus]);

  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmitHandler = (evt) => {
    const email = emailRef.current;
    const password = passwordRef.current;
    evt.preventDefault();
    if (!email.value || !(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/i.test(email.value))) {
      setValidationError(`email`);
    } else if (!password.value || password.value.split(``).some((x) => x === ` `)) {
      setValidationError(`password`);
    } else {
      sendAuthorization(emailRef.current.value, passwordRef.current.value);
    }
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={onSubmitHandler}>
          {validationError === `email` && <div className="sign-in__message">
            <p>Please enter a valid email address</p>
          </div>}
          {validationError === `password` && <div className="sign-in__message">
            <p>Please enter a valid password</p>
          </div>}
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                ref={emailRef} />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                ref={passwordRef} />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <footer className="page-footer">
        <div className="logo">
          <Link to="/" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

SignIn.propTypes = {
  authorizationStatus: PropTypes.string,
  sendAuthorization: PropTypes.func
};

const mapStateToProps = (store) => ({
  authorizationStatus: getAuthorizationStatus(store)
});

const mapDispatchToProps = (dispatch) => ({
  sendAuthorization: (id) => dispatch(sendAuthorizationThunk(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
