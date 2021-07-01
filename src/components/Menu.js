const Menu = (props) => {
    //should display custom message based on win or lose. 
    const { restartFn } = props;

    return (
        <div id="menu">
            Gameover!
            <button onClick={restartFn}>Restart</button>
        </div>
    )
}

export default Menu;