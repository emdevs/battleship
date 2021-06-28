//takes in a boolean for visibility as well as a function and name when clicked. 
const Button = (props) => {
    const {name, fn, visible} = props;

    return (
        <button
        onClick={fn}
        style={{
            display: visible? "block" : "none"
        }}
        >
        {name}
        </button>

    )
};

export default Button;