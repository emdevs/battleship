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

//later game should take in specific layout i think
const Game = () => {
    //create players and gameboards;
    //create two gameboards.
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

//display for gameboards;

const Display = (props) => {
    //hides computer's board underneath

    let { game } = props;

    let [b1Mask, setB1Mask] = useState(default_board);
    //reveals what squares opponent has picked. 
    let [b2Mask, setB2Mask] = useState(default_board);
    let [endGame, setEndGame] = useState(false);


    //ships to be setup with shipProp.
    //if ships key length is 0, then popup menu to ask to start vs reset board
    let [ships, setShips] = useState(default_ships);
    
    let board_1 = game.p1_gameboard.getBoard();
    let [board_2, setBoard_2] = useState(game.p2_gameboard.getBoard());

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
            updateMask(b2Mask, setB2Mask, random_choice, "u");

            if (game.p1_gameboard.allSunk()) {
                console.log("You lost");
                setEndGame(true);
            }
        }
    }, [b1Mask]);

    const clickedSquare = (e) => {
        let number = e.target.id;

        if (!endGame) {
            if (game.playerChoice(number)) {
                updateMask(b1Mask, setB1Mask, number, "u");
                if (game.p2_gameboard.allSunk()) {
                    console.log("You won!");
                    setEndGame(true);
                }
            } else {
                console.log("You already picked that square!")
            }
        };
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

    //square that will contain all moveable ship pieces
    const drawShipContainer = (ships) => {

        return (
            <div id="ship-container">
                {
                Object.keys(ships).map((key, i) => {
                    return (
                    <ShipProp 
                    key={key}
                    length={ships[key].length}
                    name={key}
                    />
                    )
                })
                }
            </div>
        )
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

    return (
        <DndProvider backend={HTML5Backend}>
            <div id="game">
                {drawShipContainer(ships)}
                <Board 
                board={board_2}
                update={updateBoardDisplay(game.p2_gameboard, setBoard_2)}
                />
                
            </div>
        </DndProvider>
    )
};

export { Game, Display };

{/* <div className="board-container">
                    {drawBoardMask(b1Mask, true)}
                    {drawBoard(board_1)}
                </div>
                
                <div className="board-container">
                    {drawBoardMask(b2Mask, false)}
                    {drawBoard(board_2)}
                </div>
 */}

