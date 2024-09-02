import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { createBrowserHistory } from 'history';

import classes from './App.module.scss';

import 'semantic-ui-css/semantic.min.css';


//pages/main components
import { CategoryPage } from './features/starWars/pages/categoryPage/components/categoryPage/CategoryPage';
import { SearchComp } from './features/starWars/pages/searchPage/components/Search/Search';

const App = () => {

  return (
    <div className={classes.appContainer}>
      <Router>
        <Routes>
          <Route path='/' element={<SearchComp />} />
          <Route path='category/:title' element={<CategoryPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
