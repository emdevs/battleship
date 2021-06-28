//main game loop
import React, { useState, useEffect } from "react";
import {default_board, layout_2, default_ships} from "./Defaults";

import { getCoordinates as getCoord} from "./Helpers";

import Ship from "./Ship";
import Gameboard from "./Gameboard";
import Player from "./Player";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


import Board from "./Board";
import ShipProp from "./ShipProp";
import ShipContainer from "./ShipContainer";
import BoardMask from "./BoardMask";
import Button from "./Button";

//Game sets up gameboards for player and compter, as well as checkState method. 
const Game = () => {
    //make computer board randomly select from randomly generated templates. 
    let p1_gameboard = Gameboard(layout_2, {"ship": Ship(3)});
    //we are setting up p2_gameboard, which makes us player 2. change this later
    let p2_gameboard = Gameboard();
    //create two players. one will be pickSquare, other random squares (vs computer);
    
    let p1 = Player(p2_gameboard);
    let p2 = Player(p1_gameboard);

    const checkState = () => {
        if (p1_gameboard.allSunk() === true) {
            //return true false or nothing. (true player wins, false comp wins, nothing is nothing)
            //use in display to trigger render of alert component?
            console.log("You lost!");
        } else if (p2_gameboard.allSunk() === true) {
            console.log("You win!");
        }
    }

    const playerChoice = (number) => {
        console.log(number)
        return p1.pickSquare(number);
    };

    const computerChoice = () => p2.pickRandomSquare();

    return { p1_gameboard, p2_gameboard, playerChoice, computerChoice, checkState };
};

//Display for Battleship Game. 
const Display = (props) => {
    let { game } = props;

    let computerBoard = game.p1_gameboard.getBoard();
    let [playerBoard, setPlayerBoard] = useState(game.p2_gameboard.getBoard());

    //hides computer's board underneath
    let [computerMask, setComputerMask] = useState(default_board);
    //reveals what squares opponent has picked. 
    let [playerMask, setPlayerMask] = useState(default_board);

    //is the game ready? (player 2's gameboard set. )
    let [gameReady, setGameReady] = useState(false);
    let [endGame, setEndGame] = useState(false);

    //ships to be setup with shipProp.
    let [ships, setShips] = useState(default_ships);
    
    
    //METHODS

    const updateMask = (mask, setMask, position, value) => {
        let temp = JSON.parse(JSON.stringify(mask));
        let coords = getCoord(position);
        temp[coords[0]][coords[1]] = value;
        setMask(temp);
    };

    //after player makes move (that changes board mask)
    useEffect(() => {
        if (!endGame){
            let random_choice = game.computerChoice();
            updateMask(playerMask, setPlayerMask, random_choice, "u");

            if (game.p1_gameboard.allSunk()) {
                console.log("You lost");
                setEndGame(true);
            }
        }
    }, [computerMask]);

    const clickedSquare = (e) => {
        let number = e.target.id;

        if (!endGame) {
            if (game.playerChoice(number)) {
                updateMask(computerMask, setComputerMask, number, "u");
                if (game.p2_gameboard.allSunk()) {
                    console.log("You won!");
                    setEndGame(true);
                }
            } else {
                console.log("You already picked that square!")
            }
        };
    };

    const updateShipContainer = (shipName) => {
        console.log(shipName);
        setShips(Object.keys(ships)
        .filter(key => key !== shipName)
        .reduce((obj, key) => {
        obj[key] = ships[key];
        return obj;
        }, {}));
    }

    //toUpdate Board for start of game (placing ships. )
    //will update the display of board as well as ship container. 
    function updateBoardDisplay(gameboard, setBoard) {
        return ((info) => {
            if (gameboard.placeShip(info.name, info.position, info.length, info.orientation)) {
                setBoard(gameboard.getBoard());
                updateShipContainer(info.name);
            }
        })
    }

    //reset ship container and board.
    function resetAll(setBoard, setShips) {
        return (()=> {
            //needs to also reset gameboard (TEmp fix)
            game.p2_gameboard = Gameboard();
            setBoard(default_board);
            setShips(default_ships);
        })
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <Button name="Reset" fn={resetAll(setPlayerBoard, setShips)} visible={!gameReady}/>
            <Button name="Start Game" fn={() => setGameReady(true)} visible={!gameReady && Object.keys(ships).length === 0}/>
            

            <div id="game">
                {(gameReady)? 
                <div className="board-container">
                    <BoardMask board={computerMask} cover={true} clickFn={clickedSquare}/>
                    <Board board={computerBoard}/>
                </div> :

                <ShipContainer ships={ships}/>
                }

                <div className="board-container">
                    {gameReady &&
                    <BoardMask 
                    board={playerMask}
                    cover={false}
                    clickFn={clickedSquare}
                    />
                    }
                    <Board 
                    board={playerBoard}
                    update={updateBoardDisplay(game.p2_gameboard, setPlayerBoard)}
                    />
                </div>
            </div>
        </DndProvider>
    )
};

export { Game, Display };

//seperate board container? 


{/* <div className="board-container">
                    {drawBoardMask(computerMask, true)}
                    {drawBoard(computerBoard)}
                </div>
                
                <div className="board-container">
                    {drawBoardMask(playerMask, false)}
                    {drawBoard(playerBoard)}
                </div>
 */}

