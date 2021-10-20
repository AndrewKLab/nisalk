import React from 'react';
import { View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { styles } from '../_styles';

export const EmptyListComponent = ({ children, message }) => {
    return (
        <View style={styles.emptyListComponent}>
            <View style={styles.emptyListComponentContainer}>
                <Paragraph style={{ textAlign: 'center', }}>{message}</Paragraph >
                {children}
            </View>
        </View>
    );
}
