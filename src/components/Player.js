//player takes in enemy gameboard, so that it can attack it. 
const Player = (gameboard) => {
    let pickedSquares = [];
    let all_squares;

    //shuffle array containing numbers from 0..99
    (() => {
        let array = [...Array(100).keys()];

        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        all_squares = array;
    })();


    const pickSquare = (number) => {
        if (!pickedSquares.includes(number)) {
            //can check if recieveAttack returns true or false (can set up popup notif);
            gameboard.recieveAttack(number);
            pickedSquares.push(number);
            return true;
        }
        return false;
    };

    const pickRandomSquare = () => {
        let number = all_squares.shift();

        if (!pickedSquares.includes(number)) {
            gameboard.recieveAttack(number);
            pickedSquares.push(number);
            return number;
        }
        return false;
    }

    return { pickSquare, pickRandomSquare };
};


export default Player;