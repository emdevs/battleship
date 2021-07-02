const Ship = (shipLength) => {
    let hitCoords = [];
    const length = shipLength;

    //hit only if coords not already in hitCoords
    const hit = (coord) => {
        if (!hitCoords.includes(coord)) {
            hitCoords.push(coord);
        }
    };
    const isSunk = () => hitCoords.length === length;
    
    return {length, hit, hitCoords, isSunk}
};

export default Ship;