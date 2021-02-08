import React from 'react';
import {Link} from 'react-router-dom';

const SignInHeadGuest = () => {
  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        {/* <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" /> */}
        <img src="img/bg-header.jpg" />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <header className="page-header">
        <div className="logo">
          <Link className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <div className="user-block">
          <Link to="/login" className="user-block__link">Sign in</Link>
        </div>
      </header>
    </section>
  );
};

export default SignInHeadGuest;
