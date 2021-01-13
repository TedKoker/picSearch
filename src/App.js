import React from 'react'
import {Route} from 'react-router-dom'
import Search from './components/search/Searcht'
import Pictures from './components/Pictures'
import './sass/main.scss'

function App() {
  return (
    <div>
      <Search />
      <Route path="/search" component={Pictures}/>
    </div>
  );
}

export default App;
