//main game loop

import React from "react";
import {layout_2} from "./Defaults";
import Ship from "./Ship";
import Gameboard from "./Gameboard";
import Player from "./Player";


//later game should take in specific layout i think
const Game = () => {
    //create players and gameboards;
    //create two gameboards.
    let p1_gameboard = Gameboard(layout_2, {"ship": Ship(3)});
    let p2_gameboard = Gameboard(layout_2, {"ship": Ship(3)});
    //create two players. one will be pickSquare, other random squares (vs computer);
    
    let p1 = Player(p2_gameboard);
    let ai = Player(p1_gameboard);

    const startRound = (number) => {
        console.log(number);
        p1.pickSquare(number);
        // p2.pickRandomSquare();

        if (p1_gameboard.allSunk() === true) {
            console.log("You lost!");
        } else if (p2_gameboard.allSunk() === true) {
            console.log("You win!");
        }
    }
    return { startRound, p1_gameboard, p2_gameboard };
};


const Display = (props) => {

    // attach event listener to each square, onClick should be a player.pickSquare
    //get boards passed in as prop maybe.
    let { game } = props;
    

    // console.log(game);
    let board_1 = game.p1_gameboard.board;
    // console.log(board_1);
    let board_2 = game.p2_gameboard.board;
    
    const clickedSquare = (e) => {
        game.startRound(e.target.id);

        //get the

        // let square = document.getElementByID(e.target.id);
        // square.classList.remove("hidden");

        // remove hidden class if there is one
        //each onlcik should start a new round. evaluate square, then call ai move. 
    };

    //convert to arr (input if hidden or not (different styling, and click events))


    //draw board hidden needs to be grey, reveal color (blue or red) based on hit or miss
    //enemy board will always be visibile. should have visual cue to see where 
    const drawBoard = (board, hidden) => {
        let flat_board = board.flat(Infinity);

        if (hidden) {
            return (
                <React.Fragment>
                    {
                    flat_board.map((v, i) => {
                        return ( 
                            <div 
                            id={i}
                            key={i}
                            className={(v === "")? `blank hidden` : `ship hidden`}
                            onClick={(e) => clickedSquare(e)}
                            />
                        )
                    })
                    }
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    {
                    flat_board.map((v, i) => {
                        return <div key={i} className={(v === "")? "blank" : "ship"}/>
                    })
                    }
                </React.Fragment>
            )
        }
    }

    //needs information about gameboards.
    return (
        <div id="game">
            <div className="gameboard">
                { drawBoard(board_1, true) }
            </div>
            <div className="gameboard">
                { drawBoard(board_2, false) }
            </div>
        </div>
    )
};


export { Game, Display };
