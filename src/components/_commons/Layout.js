import React from 'react';
import Body from './_Body';
import NavBar from './_NavBar';

function Layout({children}){
  return (
    <>
      <NavBar />
      <Body content={children} />
    </>
  )

}
export default Layout;