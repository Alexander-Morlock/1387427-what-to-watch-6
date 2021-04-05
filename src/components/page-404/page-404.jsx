import React from 'react';
import {NavLink} from 'react-router-dom';

const Page404 = () => {
  return (
    <div style={{display: `flex`}}>
      <div style={{margin: `auto`, marginTop: `300px`}}>
        <h1 style={{fontSize: `90px`}}>404.</h1>
        <h3>Page not found</h3>
        <NavLink to='/'>Main page</NavLink>
      </div>
    </div>
  );
};

export default Page404;
