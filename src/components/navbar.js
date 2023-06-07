import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';

import NavbarItem from './navbarItem';

function Navbar(props) {
  return (
    <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-primary'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          Clínica Médica
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarResponsive'
          aria-controls='navbarResponsive'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-medicos'
              label='Médicos'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' 
            href='/listagem-pacientes' 
            label='Pacientes' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-secretarias'
              label='Secretárias'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem 
            render='true' 
            href='/listagem-consultas' 
            label='Consultas' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem 
            render='true' 
            href='/listagem-procedimentos' 
            label='Procedimentos' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/login' label='Entrar' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/' label='Sair' />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;