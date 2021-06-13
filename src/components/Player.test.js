import Player from "./Player";
import Gameboard from "./Gameboard";

describe("pickSquare function works", () => {
    let gb = Gameboard();
    let player = Player(gb);

    test("new square picked", () => {
        expect(player.pickSquare(1)).toBe(true);
    });

    test("square already picked", () => {
        expect(player.pickSquare(1)).toBe(false);
    });

    test("new square picked", () => {
        expect(player.pickSquare(4)).toBe(true);
    });
});

describe("pickRandomSquare function works", () => {
    let gb = Gameboard();
    let player = Player(gb);

    //for 100 random moves, a number cannot be picked twice. (must always return true)
    for (let i=0; i < 100; i++) {
        test("randomMove is made", () => {
            expect(player.pickRandomSquare()).toBe(true);
        })
    }
});