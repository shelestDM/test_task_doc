import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
    return (
        <div className='navbar'>
          <div className='navbar_item'>
           <Link to='/course' className='link'>Курс валют</Link>
            <Link to='/converter' className='link'>Конвертер валют</Link>
          </div>
        </div>
    );
};

export default NavBar;