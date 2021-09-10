import * as React from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { styles } from '../../_styles/styles';
import { List, Headline, Caption } from 'react-native-paper';


export const TSListItem = ({ children, item, onPress, }) => {
    return (
        <TouchableOpacity style={styles.transportListItem} onPress={onPress}>
            <Headline style={styles.transportListItemTitle}>{item.lk_ts_reg_number}</Headline>
            <View style={styles.transportListItemText}>
                <Caption>{`${item.lk_ts_brand} - ${item.lk_ts_model}`}</Caption>
            </View>
        </TouchableOpacity>
    );
}
