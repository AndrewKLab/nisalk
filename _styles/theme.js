import { DefaultTheme } from 'react-native-paper';
import color from 'color';

export const theme = {
    ...DefaultTheme,
    roundness: 2,

    colors: {
        ...DefaultTheme.colors,
        primary: '#2f7cfe',
        accent: '#f1c40f',
        text: "#020202",
        disabled: color('#000000').alpha(0.26).rgb().string(),
        placeholder: color('#000000').alpha(0.54).rgb().string(),
        backdrop: color('#000000').alpha(0.5).rgb().string(),
    },
};