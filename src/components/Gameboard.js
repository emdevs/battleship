// Gameboards should be able to place ships at
// specific coordinates by calling the ship factory function.

//assign each ship a name..

import Ship from "./Ship"


let default_board = [
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""]
];

let default_ships = {
    ca_1: Ship(5),
    bs_1: Ship(4),
    bs_2: Ship(4),
    cr_1: Ship(3),
    cr_2: Ship(3),
    cr_3: Ship(3),
    ds_1: Ship(2),
    ds_2: Ship(2),
    ds_3: Ship(2),
    ds_4: Ship(2)
};

const Gameboard = (layout=default_board, allShips=default_ships) => {
    let board = layout;
    let ships = allShips;
    let missedShots = [];

    //convert integer into coordinates ex 0 = [0,0] , 10 = [1, 0], 44 = [4,4];
    //from 0-99 (10x10 board)
    const getCoord = (number) => {
        if (number < 9) {
            return [0, number];
        } else {
            let coord = number.toString().split("").map(Number);
            return coord;
        }
    };

    const placeShip = (shipName, coords, board) => {
        //ensure smaller coordinate is always first. 
        let coordinates = (coords[0] > coords[1])? [coords[1], coords[0]] : coords;
        let boardCopy = JSON.parse(JSON.stringify(board));
        let start = getCoord(coordinates[0]);
        let end = getCoord(coordinates[1]);

        if (start[0] == end[0]) {
            //ship is horizontal
            for (let i=start[1]; i < end[1] + 1; i++) {
                boardCopy[start[0]][i] = shipName;
            }
        } else {
            //ship is vertical
            for (let i=start[0]; i < end[0] + 1; i++) {
                boardCopy[i][start[1]] = shipName;
            }
        }
        return boardCopy;
    }

    const recieveAttack = (number) => {
        let coord = getCoord(number);
        let square = board[coord[0]][coord[1]];

        if (square === "") {
            missedShots.push(number);
        } else {
            //there is a ship there, hit it. 
            for (var shipName in ships) {
                if (shipName === square) {
                    ship.hit(number);
                }
            }
        }
        return missedShots;
    }

    return { board, placeShip, recieveAttack };
};

export default Gameboard;