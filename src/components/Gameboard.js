import Ship from "./Ship"
import {getCoordinates as getCoord} from "./Helpers"
import {default_board, default_ships} from "./Defaults"

const Gameboard = (layout=default_board, allShips=default_ships) => {
    let board = layout;
    let ships = allShips;
    let missedShots = [];

    const placeShip = (shipName, coords, board=board) => {
        //ensure smaller coordinate is always first. 
        let coordinates = (coords[0] > coords[1])? [coords[1], coords[0]] : coords;
        let boardCopy = JSON.parse(JSON.stringify(board));
        let start = getCoord(coordinates[0]);
        let end = getCoord(coordinates[1]);

        //make sure that it cant be placed out of the board, or cannot overlap with other ships. 

        //this presumes both shipName is valid, and coords .

        if (start[0] == end[0]) {
            //ship is horizontal
            for (let i=start[1]; i < end[1] + 1; i++) {
                if (boardCopy[start[0]][i] === "") {
                    boardCopy[start[0]][i] = shipName;
                } else {
                    return board;
                }
            }
        } else {
            //ship is vertical
            for (let i=start[0]; i < end[0] + 1; i++) {
                if (boardCopy[i][start[1]] === "") {
                    boardCopy[i][start[1]] = shipName;
                } else {
                    return board;
                }
            }
        }
        //externally set board to boardCopy
        board = boardCopy;
        return boardCopy;
    }

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

    const allSunk = () => {
        //check the ships hash. if each ship reports sunk, then all sunk. 
        for (var shipName in ships) {
            if (!(ships[shipName].isSunk())) {
                return false;
            }
        }
        return true;
    };

    return { board, placeShip, recieveAttack, allSunk };
};

export default Gameboard;