const Ship = (shipLength) => {
    let hitCoords = [];
    const length = shipLength;

    const hit = (coord) => hitCoords.push(coord);
    const isSunk = () => hitCoords.length === length;
    
    return {length, hit, hitCoords, isSunk}
};

export default Ship;