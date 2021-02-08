import React from 'react';
import {Link} from 'react-router-dom';

const MoreLikeThis = () => {
  return (
    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>
        <div className="catalog__movies-list">
          <article className="small-movie-card catalog__movies-card">
            <div className="small-movie-card__image">
              <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width={280} height={175} />
            </div>
            <h3 className="small-movie-card__title">
              <Link className="small-movie-card__link" to="movie-page.html">Fantastic Beasts: The Crimes of Grindelwald</Link>
            </h3>
          </article>
          <article className="small-movie-card catalog__movies-card">
            <div className="small-movie-card__image">
              <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width={280} height={175} />
            </div>
            <h3 className="small-movie-card__title">
              <Link className="small-movie-card__link" to="movie-page.html">Bohemian Rhapsody</Link>
            </h3>
          </article>
          <article className="small-movie-card catalog__movies-card">
            <div className="small-movie-card__image">
              <img src="img/macbeth.jpg" alt="Macbeth" width={280} height={175} />
            </div>
            <h3 className="small-movie-card__title">
              <Link className="small-movie-card__link" to="movie-page.html">Macbeth</Link>
            </h3>
          </article>
          <article className="small-movie-card catalog__movies-card">
            <div className="small-movie-card__image">
              <img src="img/aviator.jpg" alt="Aviator" width={280} height={175} />
            </div>
            <h3 className="small-movie-card__title">
              <Link className="small-movie-card__link" to="movie-page.html">Aviator</Link>
            </h3>
          </article>
        </div>
      </section>
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

export default MoreLikeThis;
