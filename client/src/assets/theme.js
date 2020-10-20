import {createMuiTheme} from '@material-ui/core/styles';

const theme = {
    palette: {
        primary: {
            main: "#30665D", //rgb(97, 205, 187)
        },
        secondary: {
            main: "#7A3B30", //rgb(244, 117, 96)
        },
        primaryAlternative: {
            main: "rgb(232, 168, 56)" //rgb(232, 168, 56)
        },
        secondaryAlternative: {
            main: "rgb(241, 225, 91)" //rgb(241, 225, 91)
        }
    },
};

export default createMuiTheme(theme);
