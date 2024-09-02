import { Container, Header } from 'semantic-ui-react';

import classes from './App.module.scss';
import 'semantic-ui-css/semantic.min.css';

import { SearchComp } from './features/starWars/pages/searchPage/components/Search/Search';
import { Logo } from './app/components/Logo';
import { mainLogo } from './assets/logo';

const App = () => {
  return (
    <div className={classes.appContainer}>

      <Container textAlign='center' fluid >
        <Logo imageUrl={mainLogo} />
        <Header as='h3' color='yellow'>Data Search</Header>
        <SearchComp />
      </Container>

    </div>
  )
}

export default App
