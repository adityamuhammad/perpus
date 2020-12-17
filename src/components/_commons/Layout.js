import React from 'react';
import NavBar from './_NavBar';

function Layout(props){
  return (
      <div>
        <NavBar />

        <main className="mb-auto h-screen bg-gray-100" >
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* <!-- Replace with your content --> */}
            {props.children}
            {/* <!-- /End replace --> */}
          </div>
        </main>
      </div>
  )

}
export default Layout;