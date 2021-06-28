//convert integer into coordinates ex 0 = [0,0] , 10 = [1, 0], 44 = [4,4];
//from 0-99 (10x10 board)

//this helper is no longer needed once recieve attack changes. 
const getCoordinates = (number) => {
    if (number < 10) {
        return [0, number];
    } else {
        let coord = number.toString().split("").map(Number);
        return coord;
    }
};


export { getCoordinates };