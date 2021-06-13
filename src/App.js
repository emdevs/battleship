import './App.css';
import { Game, Display } from "./components/Game";


function App() {
  return (
    <div className="App">
      <h1>Battleship!</h1>
      <p>Rules and all that. </p>
      <Display game={Game()}/>
    </div>
  );
}

export default App;
