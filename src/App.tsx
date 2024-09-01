import "./App.css";
import { Search } from "./features/starWars/components/Search/Search"
import logo from "./logo.svg"

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Search />
      </header>
    </div>
  )
}

export default App
