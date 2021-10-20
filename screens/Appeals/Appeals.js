import React from 'react';
import {ScrollView } from 'react-native';
import { Button} from 'react-native-paper';
import { styles } from '../../_styles/styles';


export const Appeals = ({navigation}) => {

    const goToForm = (title, theme) => {
        switch (theme) {
            case 6:
                navigation.navigate('FeedbackFormScreen', { title: title, theme: theme, ts: null})
                break;
            default:
                navigation.navigate('TSFormScreen', { title: title, theme: theme, ts: null})
                break;
        }
    }

    return (
        <ScrollView style={styles.transportFormButtonContainer}>
            <Button compact={true} style={styles.transportFormButton} contentStyle={styles.transportFormButtonContent} mode="contained" onPress={() => goToForm('Техподдержка', 1)}>Техподдержка</Button>
            <Button compact={true} style={styles.transportFormButton} contentStyle={styles.transportFormButtonContent} mode="contained" onPress={() => goToForm('Заказать мониторнинг', 2)}>Заказать мониторнинг</Button>
            <Button compact={true} style={styles.transportFormButton} contentStyle={styles.transportFormButtonContent} mode="contained" onPress={() => goToForm('Заказ или ремонт тахографа', 3)}>Заказ или ремонт тахографа</Button>
            <Button compact={true} style={styles.transportFormButton} contentStyle={styles.transportFormButtonContent} mode="contained" onPress={() => goToForm('Свободное обращение', 6)}>Свободное обращение</Button>
        </ScrollView>
    )
}