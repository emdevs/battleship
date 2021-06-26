import React, {useState} from "react";
import {useDrag} from "react-dnd";
import ItemTypes from "../utils/items";

const ShipProp = (props) => {
    const {length, name} = props;
    
    let [orientation, setOrientation] = useState("horizontal");

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.SHIP,
        item: {
                name: name,
                length: length,
                orientation: orientation
            },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [orientation])

    return (
        <div 
        className="ship-prop"
        ref={drag}
        onContextMenu={(e) => {
            e.preventDefault();
            setOrientation(
            (orientation === "horizontal")?
            "vertical" :
            "horizontal");
        }
        }
        style={{
            opacity: isDragging ? 0.5 : 1,
            fontWeight: 'bold',
            cursor: 'move',
        }}
        >{name}{orientation}</div>
    )
};

export default ShipProp;