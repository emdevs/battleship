import React, {useState, useEffect} from "react";
import BoardSquare from "./BoardSquare";

const Board = (props) => {
    const {board, update} = props;
    let [currentShip, setCurrentShip] = useState(null);

    useEffect(() => {
        if (currentShip) {
            update(currentShip);
        }
    }, [currentShip]);

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