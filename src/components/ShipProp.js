import React, {useState} from "react";
import {useDrag} from "react-dnd";
import ItemTypes from "../utils/items";

const ShipProp = (props) => {
    const {length, name} = props;
    
    let [orientation, setOrientation] = useState("horizontal");
    let [squareIndex, setSquareIndex] = useState(0);

    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.SHIP,
        item: {
                name: name,
                length: length,
                orientation: orientation,
                squareIndex: squareIndex
            },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [orientation, squareIndex])

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
            cursor: 'move',
        }}
        >
            {
                [...Array(length)].map((_, index) => {
                    return(
                    <div 
                    key={index}
                    style={
                        {display: (orientation === "vertical")? "block" : "inline-block"}
                    }
                    onMouseDown={() => setSquareIndex(index)}
                    />
                    )
                })
            }
        </div>
    )
};

export default ShipProp;