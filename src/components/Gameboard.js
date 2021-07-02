import Ship from "./Ship"
import {getCoordinates as getCoord} from "./Helpers"
import {default_board, default_ships} from "./Defaults"

const Gameboard = (layout=default_board, allShips=default_ships) => {
    let board = layout;
    let ships = allShips;
    let missedShots = [];

    const getBoard = () => board;
    const getShips = () => ships;

    const placeShip = (name, start, length, orientation) => {
        let boardCopy = JSON.parse(JSON.stringify(board));
        //get x and y numbers from start coordinate
        let [y, x] = start;

        if (orientation === "horizontal") {
            for (let i=x; i < x+length; i++) {
                if (board[y][i] === "") {
                    boardCopy[y][i] = name;
                } else {
                    return false;
                }
            }
        } else {
            if (y+length > 10) { return false };

            for (let i=y; i < y+length; i++) {
                if (board[i][x] === "") {
                    boardCopy[i][x] = name;
                } else {
                    return false;
                }
            }
        }
        board = boardCopy;
        return true;
    };

    //change recieve attack later to coordinates [0,0]
    const recieveAttack = (number) => {
        let coord = getCoord(number);
        let square = board[coord[0]][coord[1]];

        if (square === "") {
            missedShots.push(number);
            return false;
        } else {
            //there is a ship there, hit it. 
            for (var shipName in ships) {
                if (shipName === square) {
                    ships[shipName].hit(number);
                }
                return true;
            }
        }
    }

    //maybe a function to count remaining ships? 
    const remainingShips = () => {
        let counter = 0;
        for (var shipName in ships) {
            if (!ships[shipName].isSunk()) {
                counter += 1;
            }
        }
        return counter;
    }

    const allSunk = () => remainingShips() === 0;

    //check can safely remove board
    return { getBoard, getShips, placeShip, remainingShips, recieveAttack, allSunk };
};

export default Gameboard;

