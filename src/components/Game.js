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
import ShipContainer from "./ShipContainer";
import BoardMask from "./BoardMask";
import Button from "./Button";
import Menu from "./Menu";

//Game sets up gameboards for player and compter
const Game = () => {
    //make computer board randomly select from randomly generated templates. 
    let computer_gb = Gameboard(layout_2, {"ship": Ship(3)});
    let player_gb = Gameboard();

    let computer = Player(player_gb);
    let player = Player(computer_gb);

    const playerChoice = (number) =>  player.pickSquare(number);
    const computerChoice = () => computer.pickRandomSquare();

    return { computer_gb, player_gb, playerChoice, computerChoice };
};

//Display for Battleship Game. 
const Display = (props) => {
    let { game } = props;

    let computerBoard = game.computer_gb.getBoard();
    let [playerBoard, setPlayerBoard] = useState(game.player_gb.getBoard());

    let [computerMask, setComputerMask] = useState(default_board);
    let [playerMask, setPlayerMask] = useState(default_board);

    //is the game ready? (player 2's gameboard set. )
    let [gameReady, setGameReady] = useState(false);
    let [endGame, setEndGame] = useState(false);

    //ships to be setup with shipProp.
    let [ships, setShips] = useState(game.player_gb.getShips());
    
    
    //METHODS
    //after player makes move (that changes board mask)
    useEffect(() => {
        if (!endGame){
            let random_choice = game.computerChoice();
            setTimeout(updateMask(playerMask, setPlayerMask, random_choice, "u"), 700);

            if (game.player_gb.allSunk()) {
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
                if (game.computer_gb.allSunk()) {
                    console.log("You won!");
                    setEndGame(true);
                }
            } else {
                console.log("You already picked that square!")
            }
        };
    };

    const updateMask = (mask, setMask, position, value) => {
        let temp = JSON.parse(JSON.stringify(mask));
        let coords = getCoord(position);
        temp[coords[0]][coords[1]] = value;
        setMask(temp);
    };


    const updateShipContainer = (shipName) => {
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
    //should only deal with resetting player board
    function resetAll(setBoard, setShips) {
        return (()=> {
            //needs to also reset gameboard (TEmp fix)
            game.player_gb = Gameboard();
            setBoard(game.player_gb.getBoard());
            setShips(game.player_gb.getShips());
        })
    }
    //seperate function for resetting computer board. 

    function restartGame(){
        //should reset player board and also generate new random computer board

        setEndGame(false);
        setGameReady(false);
        resetAll(setPlayerBoard, setShips)();
    }

    return (
        <DndProvider backend={HTML5Backend}>

            {endGame &&
            <Menu restartFn={restartGame}/>
            }

            {/* instead of visible, maybe have disabled. put these buttons on a seperate pop up menu */}
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
                    update={updateBoardDisplay(game.player_gb, setPlayerBoard)}
                    />
                </div>
            </div>
        </DndProvider>
    )
};

export { Game, Display };
