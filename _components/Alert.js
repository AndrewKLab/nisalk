import * as React from 'react';
import { View, } from 'react-native';
import { IconButton } from 'react-native-paper';
import { styles } from '../_styles/styles';
import { Error } from './';


export const Alert = ({ children, message, onRefreshError }) => {
    return (
        <View style={styles.alert}>
            <Error>{message}</Error>
            <IconButton
                icon="refresh"
                size={30}
                color={'#2f7cfe'}
                onPress={() => onRefreshError()}
            />
        </View>
    );
}
