import * as React from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { styles } from '../../_styles/styles';
import { List, Headline, Caption, Paragraph } from 'react-native-paper';
import moment from 'moment';


export const NotificationListItem = ({ children, item, onPress, }) => {
    return (
        <TouchableOpacity style={styles.transportListItem} onPress={onPress}>
            <Caption style={[styles.transportListItemTitle]}>{moment.unix(item.lk_nf_date).format("DD.MM.YYYY")}</Caption>
            <View style={styles.transportListItemText}>
                <Paragraph>{`${item.lk_nf_message.replace('<br>', '\n')}`}</Paragraph>
            </View>
        </TouchableOpacity>
    );
}
