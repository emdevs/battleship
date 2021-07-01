import React, {useEffect} from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "../utils/items";

const BoardSquare = (props) => {
    const {position, occupied, setShip} = props;

    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.SHIP,
            drop: (item, monitor) => {
                console.log(item.name);
                // updateBoard({...item, position});
                setShip({...item, position});
            },
            hover: (item, monitor) => {
                // console.log(item.squareIndex);
                //add a method here? for ship shadow? (need current board square, and item.length and item.squareIndex AND direction
            }
            //maybe use canDrop later
            // collect: (monitor) => ({
            // isOver: !!monitor.isOver()
            // })
    }))


    return (
        <div
        ref={drop}
        style={{
            backgroundColor: occupied? "pink" : "rgb(79, 150, 231)",
            border: false ? "1px red solid" : "1px green solid",
        }}
        />
    )
};
export default BoardSquare;