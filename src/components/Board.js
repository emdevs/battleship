import React, {useState, useEffect} from "react";
import BoardSquare from "./BoardSquare";

const Board = (props) => {
    const {board, update} = props;
    let [currentShip, setCurrentShip] = useState(null);
    // let [highlights, setHighlights] = useState([]);

    // a little redundant, mayb ejust pass update board function directly down to board square
    useEffect(() => {
        if (currentShip) {
            update(currentShip);
        }
    }, [currentShip]);

    function updateHighlights(position, length, index, direction){
        //doesnt matter if position isnt valid (over 9 or negative), it wont be shown on board
        let indexes = [];
        let [y, x] = position;
        
        //assume its horizontal for now
        for (let i=(0-index); i < length-index; i++) {
            //what if index is 1? (-1, 0, 1)
            indexes.push(y, x+i);
        }
        // setHighlights(indexes);
    }

    return (
        <div className="gameboard">
            {
                board.map((row, y) => {
                    return(
                        row.map((value, x) => {
                            return(
                                <BoardSquare 
                                key={[y,x]}
                                position={[y,x]}
                                occupied={(value === "")? false : true}
                                setShip={setCurrentShip}  
                                />
                            )
                        })
                    )
                })
            }
        </div>
    );
}

export default Board;