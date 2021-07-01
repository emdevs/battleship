import './App.css';
import { Game, Display } from "./components/Game";


const App = (props) => {
  //check win state here. if win, then render component that displays message who won. 
  //component will render message and button to restart game. 

  //game will need to take in board layout eventually.
  //

  let game = Game();

  //game over menu th

  return (
    <div className="App">
      <h1>Battleship!</h1>
      <Display game={game}/>
    </div>
  );
}

export default App;
