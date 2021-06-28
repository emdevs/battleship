import React, {useEffect} from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "../utils/items";

const BoardSquare = (props) => {
    const {position, occupied, setShip, setShadow} = props;

    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.SHIP,
            drop: (item, monitor) => {
                console.log(item.name);
                setShip({...item, position});
            },
            hover: (item, monitor) => {
                //add a method here?
            },
            collect: (monitor) => ({
            isOver: !!monitor.isOver()
            })
    }))


    return (
        <div
        ref={drop}
        style={{
            backgroundColor: occupied? "pink" : "rgb(79, 150, 231)",
            border: isOver ? "2px red solid" : "2px green solid",
        }}
        />
    )
};
export default BoardSquare;