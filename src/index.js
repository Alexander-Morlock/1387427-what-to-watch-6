import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/app';
const movieDatabase = [
  {title: `Fantastic Beasts: The Crimes of Grindelwald`, imgPath: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`, hrefPath: `movie-page.html`},
  {title: `Bohemian Rhapsody`, imgPath: `img/bohemian-rhapsody.jpg`, hrefPath: `movie-page.html`},
  {title: `Macbeth`, imgPath: `img/macbeth.jpg`, hrefPath: `movie-page.html`},
  {title: `Aviator`, imgPath: `img/aviator.jpg`, hrefPath: `movie-page.html`},
  {title: `We need to talk about Kevin`, imgPath: `img/we-need-to-talk-about-kevin.jpg`, hrefPath: `movie-page.html`},
  {title: `What We Do in the Shadows`, imgPath: `img/what-we-do-in-the-shadows.jpg`, hrefPath: `movie-page.html`},
  {title: `Revenant`, imgPath: `img/revenant.jpg`, hrefPath: `movie-page.html`},
  {title: `Johnny English`, imgPath: `img/johnny-english.jpg`, hrefPath: `movie-page.html`},
  {title: `Shutter Island`, imgPath: `img/shutter-island.jpg`, hrefPath: `movie-page.html`},
  {title: `Pulp Fiction`, imgPath: `img/pulp-fiction.jpg`, hrefPath: `movie-page.html`},
  {title: `No Country for Old Men`, imgPath: `img/no-country-for-old-men.jpg`, hrefPath: `movie-page.html`},
  {title: `Snatch`, imgPath: `img/snatch.jpg`, hrefPath: `movie-page.html`},
  {title: `Moonrise Kingdom`, imgPath: `img/moonrise-kingdom.jpg`, hrefPath: `movie-page.html`},
  {title: `Seven Years in Tibet`, imgPath: `img/seven-years-in-tibet.jpg`, hrefPath: `movie-page.html`},
  {title: `Midnight Special`, imgPath: `img/midnight-special.jpg`, hrefPath: `movie-page.html`},
  {title: `War of the Worlds`, imgPath: `img/war-of-the-worlds.jpg`, hrefPath: `movie-page.html`},
  {title: `Dardjeeling Limited`, imgPath: `img/dardjeeling-limited.jpg`, hrefPath: `movie-page.html`},
  {title: `Orlando`, imgPath: `img/orlando.jpg`, hrefPath: `movie-page.html`},
  {title: `Mindhunter`, imgPath: `img/mindhunter.jpg`, hrefPath: `movie-page.html`},
  {title: `Midnight Special`, imgPath: `img/midnight-special.jpg`, hrefPath: `movie-page.html`}
];

ReactDOM.render(<App data={movieDatabase} />, document.querySelector(`#root`));
