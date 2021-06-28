const BoardMask = (props) => {
    const { board, cover, clickFn } = props;

    let [toggled, untoggled] = (cover)? ["unhidden", "hidden"] : ["shaded", ""];

    let flat_board = board.flat(Infinity);
    return(
        <div className="board-mask">
            {
            flat_board.map((v, i) => {
                return(
                    <div 
                    id={(cover)? i : null}
                    key={i}
                    className={(v === "")? untoggled : toggled }
                    onClick={(cover)? (e) => clickFn(e) : null}
                    />
                );
            })
            }
        </div>
    )
}

export default BoardMask;