import * as React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from '../_styles/styles';


export const Loading = ({ children, style, containerStyle }) => {
    let styleProp = style == undefined ? {} : style;
    return (
        <View style={[styles.loading, styleProp]}>
            <ActivityIndicator animating={true} color={'#2f7cfe'} />
        </View>
    );
}
