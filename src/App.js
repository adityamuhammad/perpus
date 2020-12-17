import React from 'react';
import Book from './components/books/Book';
import Member from './components/members/Member';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './utils/protectedRoute';
import Borrowing from './components/borrowings/Borrowing';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <ProtectedRoute exact path="/" component={Borrowing}/>
          <ProtectedRoute exact path="/peminjaman" component={Borrowing} />
          <ProtectedRoute exact path="/buku" component={Book}/>
          <ProtectedRoute exact path="/anggota" component={Member}/>
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
