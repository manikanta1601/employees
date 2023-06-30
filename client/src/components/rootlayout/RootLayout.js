import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarMain from '../navbar/NavbarMain';
import { domainContext } from '../../context/DomainContextProvider';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';
import './rootlayout.css';

function RootLayout() {
  const location = useLocation();
  const [path, setPath] = useState('none');
  const [domain, setDomain] = useContext(domainContext);

  useEffect(() => {
    const url = location.pathname.replace('/', '');
    if (url.length === 0) {
      setPath('home');
    } else {
      setPath(url);
    }
  }, [location]);

  useEffect(() => {
    const url = window.location.href;
    const baseURL = url.split('/').slice(0, 3).join('/');
    setDomain(baseURL.replace('://', '://server.'));
    console.log(domain);
  }, [location]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage:
          'url(https://img.freepik.com/free-vector/gradient-background-vector-spring-green_53876-117272.jpg?size=626&ext=jpg&ga=GA1.2.539893135.1686191687&semt=ais)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <NavbarMain />
      <div>
        {/* placeholder */}
        <Outlet />
      </div>
      <div style={{ marginTop: 'auto' }}>
        <Footer />
      </div>
    </div>
  );
}

export default RootLayout;
