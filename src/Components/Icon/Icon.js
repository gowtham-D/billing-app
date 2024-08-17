import PropTypes from "prop-types";

import { IconButton } from "@mui/material";
import { CheckRounded, Error, Warning, Delete, AddCircleOutline, Edit, Info } from "@mui/icons-material";

function Icon(props) {
    let { icon, size, onTap, color } = props;

    let isButton = typeof onTap === "function";
    let el;

    switch (icon) {
        case "add": el = <AddCircleOutline fontSize={size} color={color} />; break;
        case "edit": el = <Edit fontSize={size} color={color} />; break;
        case "delete": el = <Delete fontSize={size} color={color} />; break;
        case "success": el = <CheckRounded fontSize={size} color={color} />; break;
        case "error": el = <Error fontSize={size} color={color} />; break;
        case "warning": el = <Warning fontSize={size} color={color} />; break;
        case "info": el = <Info fontSize={size} color={color} />; break;
        default:break;
    }

    if (!el) {
        return null;
    }
    if (isButton) {
        return <IconButton onClick={onTap}>{el}</IconButton>
    } else {
        return el
    }

}

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.string,
    color: PropTypes.string,
    onTap: PropTypes.func,
}

export default Icon;