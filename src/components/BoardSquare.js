import React from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "../utils/items";

const BoardSquare = (props) => {
    const {position, occupied, setShip} = props;

    //maybe its becasue useDrop hook is never update with new ship setShip values. 
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.SHIP,
            drop: (item, monitor) => {
                console.log(item.name);
                setShip({...item, position});
            },
            collect: (monitor) => ({
            isOver: !!monitor.isOver()
            })
    }))
    //update whenever item changes?

    return (
        <div
        ref={drop}
        style={{
            backgroundColor: occupied? "pink" : "grey",
            border: isOver ? "2px red solid" : "2px green solid",
        }}
        />
    )
};
export default BoardSquare;

    //investigate implementing canDrop
    //should color the square sadjacent o it based on length
    //pass in func that highlights nearby squares??? how????