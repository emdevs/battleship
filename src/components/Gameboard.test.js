import Gameboard from "./Gameboard";
import Ship from "./Ship";

const board_1 = [
    ["","","","","","","three","three","three",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","one","","","","","","","",""],
    ["","","","","","","","","two",""],
    ["","","","","","","","","two",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""]
];

const board_2 = [
    ["ds_1","ds_1","","","","","","","",""],
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

describe("placeShip function works", () => {
    //will automatically use default (empty) board
    let gb = Gameboard();

    test("New ship placed", () => {
        expect(gb.placeShip("three", [0,0], 3, "horizontal")).toBe(true);
    });

    test("Board changed", () => {
        expect(gb.getBoard()).toEqual(
            [
                ["three","three","three","","","","","","",""],
                ["","","","","","","","","",""],
                ["","","","","","","","","",""],
                ["","","","","","","","","",""],
                ["","","","","","","","","",""],
                ["","","","","","","","","",""],
                ["","","","","","","","","",""],
                ["","","","","","","","","",""],
                ["","","","","","","","","",""],
                ["","","","","","","","","",""]
            ]
        )
    });

    test("Space occupied, ship not placed", () => {
        expect(gb.placeShip("two", [0,0], 2, "horizontal")).toBe(false);
    })

    test("Space occupied, ship not placed", () => {
        expect(gb.placeShip("four", [0,2], 4, "vertical")).toBe(false);
    })

    test("New ship placed", () => {
        expect(gb.placeShip("three", [4,0], 3, "vertical")).toBe(true);
    });

    test("New ship placed", () => {
        expect(gb.placeShip("six", [6,2], 6, "horizontal")).toBe(true);
    });

    test("Out of bounds, ship not placed", () => {
        expect(gb.placeShip("three", [9,0], 3, "vertical")).toBe(false);
    })

    test("Out of bounds, ship not placed", () => {
        expect(gb.placeShip("three", [0,9], 3, "horizontal")).toBe(false);
    })

    test("Out of bounds, ship not placed", () => {
        expect(gb.placeShip("three", [8,9], 3, "horizontal")).toBe(false);
    })
    
    test("New ship placed", () => {
        expect(gb.placeShip("three", [7,0], 3, "vertical")).toBe(true);
    })
});


//Test if recieveAttack correctly alters missedShots array
describe("recieveAttack function works", () => {
    let gb = Gameboard(board_1);

    test("recieve attack hits ship", () => {
        expect(gb.recieveAttack(31)).toEqual(true);
    });

    test("recieve attack misses", () => {
        expect(gb.recieveAttack(10)).toEqual(false);
    });

    test("recieve attack misses", () => {
        expect(gb.recieveAttack(42)).toEqual(false);
    })

    test("recieve attack hits ship", () => {
        expect(gb.recieveAttack(8)).toEqual(true);
    })
});

//test if all ships sunk correctly. 
describe("allSunk function works correctly", () => {
    let gb = Gameboard(board_2, {ds_1: Ship(2)});
    
    test("not all ships sunk", () => {
        expect(gb.allSunk()).toEqual(false);
    });

    test("all ships sunk", () => {
        gb.recieveAttack(0);
        gb.recieveAttack(1);

        expect(gb.allSunk()).toEqual(true);
    });

    let gb2 = Gameboard(board_1, {one: Ship(1), two: Ship(2), three: Ship(3)});

    test("not all ships sunk", () => {
        expect(gb2.allSunk()).toEqual(false);
    })

    test("not all ships sunk", () => {
        gb2.recieveAttack(6);
        gb2.recieveAttack(7);
        gb2.recieveAttack(8);

        expect(gb2.allSunk()).toEqual(false);
    })
});


