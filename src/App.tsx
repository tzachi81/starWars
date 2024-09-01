import { Container, Header } from "semantic-ui-react";
import "./App.css";

import { SearchComp } from "./features/starWars/components/Search/Search"

import 'semantic-ui-css/semantic.min.css'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Container fluid>
          <Header as='h1'>Starwars Data Search</Header>
          <SearchComp />
        </Container>
      </header>
    </div>
  )
}

export default App
