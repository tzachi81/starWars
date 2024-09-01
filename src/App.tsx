import { Container, Header } from "semantic-ui-react";
import "./App.css";

import { SearchComp } from "./features/starWars/components/Search/Search"

import 'semantic-ui-css/semantic.min.css'

const App = () => {
  return (
    <div className="App">
      
        <Container textAlign="center" fluid >
          <Header as='h1'>Starwars Data Search</Header>
          <SearchComp />
        </Container>
      
    </div>
  )
}

export default App
