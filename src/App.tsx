
import React from 'react';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

import DocumentList from './pages/DocumentList'
import DocumentItem from './pages/DocumentItem';

function App() {
  return (

    <div className="App">
      <Router>
        <Route path="/documents">
          <DocumentList />
        </Route>

        <Route path="/document/:documentId">
          <DocumentItem />
        </Route>


      </Router>
      
    </div>

  );
}

export default App;
