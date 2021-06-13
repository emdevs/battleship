//main game loop
import React, { useState } from "react";
import {default_board, layout_2} from "./Defaults";

import { getCoordinates as getCoord} from "./Helpers";

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
    let p2 = Player(p1_gameboard);

    //why not game playerchoice then random choice (evaluate board state before bot)
    //instead of start round. 

    //gameend

    const checkState = () => {
        if (p1_gameboard.allSunk() === true) {
            //return true false or nothing. (true player wins, false comp wins, nothing is nothing)
            //use in display to trigger render of alert component?
            console.log("You lost!");
        } else if (p2_gameboard.allSunk() === true) {
            console.log("You win!");
        }
    }

    //NEED TO CALL THESE METHODS INDIVIDUALLY IN DISPLAY. 
    const playerChoice = (number) => {
        console.log(number)
        return p1.pickSquare(number);
    };

    const computerChoice = () => p2.pickRandomSquare();

    return { p1_gameboard, p2_gameboard, playerChoice, computerChoice, checkState };
};


const Display = (props) => {
    //hides computer's board underneath
    let [b1Mask, setB1Mask] = useState(default_board);
    //reveals what squares opponent has picked. 
    let [b2Mask, setB2Mask] = useState(default_board);

    let { game } = props;
    
    let board_1 = game.p1_gameboard.board;
    let board_2 = game.p2_gameboard.board;
    
    const updateMask = (mask, setMask, position, value) => {
        let temp = JSON.parse(JSON.stringify(mask));
        let coords = getCoord(position);
        temp[coords[0]][coords[1]] = value;
        setMask(temp);
    };

    const clickedSquare = (e) => {
        let number = e.target.id;

        //if player choice is valid and executed
        if (game.playerChoice(number)) {
            let random_choice = game.computerChoice();

            updateMask(b1Mask, setB1Mask, number, "u");
            updateMask(b2Mask, setB2Mask, random_choice, "u");

            //check for win here
            game.checkState();
        } else {
            console.log("You already picked that square!")
        }
    };

    //cover is whether or not the mask should hide board underneath or not. 
    const drawBoardMask = (board, cover) => {
        let [toggled, untoggled] = (cover)? ["unhidden", "hidden"] : ["shaded", ""];

        let flat_board = board.flat(Infinity);
        return(
            <div className="board-mask">
                {
                flat_board.map((v, i) => {
                    return(
                        <div 
                        id={(cover)? i : null}
                        key={i}
                        className={(v === "")? untoggled : toggled }
                        onClick={(cover)? (e) => clickedSquare(e) : null}
                        />
                    );
                })
                }
            </div>
        )
    }

    const drawBoard = (board) => {
        let flat_board = board.flat(Infinity);

        return (
            <div className="gameboard">
                {
                flat_board.map((v, i) => {
                    return <div key={i} className={(v === "")? "blank" : "ship"}/>
                })
                }
            </div>
        )
    }

    return (
        <div id="game">
            <div className="board-container">
                {drawBoardMask(b1Mask, true)}
                {drawBoard(board_1)}
            </div>
            
            <div className="board-container">
                {drawBoardMask(b2Mask, false)}
                {drawBoard(board_2)}
            </div>
        </div>
    )
};


export { Game, Display };
