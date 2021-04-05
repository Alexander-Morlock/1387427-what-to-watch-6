import React from 'react';

const Loader = () => <img src="/img/icons/loader.gif" alt="loader icon"
  style={{position: `absolute`,
    left: `50%`,
    top: `100px`,
    transform: `translateX(-50%)`,
    zIndex: `999`,
    borderRadius: `50%`}} />;

export default Loader;
