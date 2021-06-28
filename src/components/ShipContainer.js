//container that has shipProps during setup of battleship. 
import ShipProp from "./ShipProp";

const ShipContainer = (props) => {
    const { ships } = props;

    return (
        <div id="ship-container">
            {
            Object.keys(ships).map((key, i) => {
                return (
                <ShipProp 
                key={key}
                length={ships[key].length}
                name={key}
                />
                )
            })
            }
        </div>
    )
}

export default ShipContainer;