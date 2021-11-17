import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { transportActions } from '../../_actions';
import { connect } from 'react-redux';
import { Alert, Loading, TSListItem } from '../../_components';
import { Button, Headline, Caption } from 'react-native-paper';
import { styles } from '../../_styles/styles';


const TSItem = ({ dispatch, navigation, route }) => {
    const { item } = route.params;

    const goToForm = (title, theme) => {
        switch (theme) {
            case 4:
                navigation.navigate('RepairFormScreen', { title: title, theme: theme, ts: item })
                break;
            case 5:
                navigation.navigate('FillsFormScreen', { title: title, theme: theme, ts: item })
                break;
            default:
                navigation.navigate('TSFormScreen', { title: title, theme: theme, ts: item })
                break;
        }

    }

    return (
        <View style={styles.transportItemContainer}>
            <View style={styles.transportItem}>
                <Headline style={styles.transportItemTitle}>{`${item.lk_ts_reg_number} ${item.lk_ts_brand}`}</Headline>
                <View style={styles.transportItemText} >
                    <Caption>{`Модель: ${item.lk_ts_model}`}</Caption>
                </View>
            </View>
            <ScrollView style={styles.transportFormButtonContainer}>
                <Button compact={true} style={styles.transportFormButton} contentStyle={styles.transportFormButtonContent} mode="contained" onPress={() => goToForm('Техподдержка', 1)}>Техподдержка</Button>
                <Button compact={true} style={styles.transportFormButton} contentStyle={styles.transportFormButtonContent} mode="contained" onPress={() => goToForm('Заказать мониторнинг', 2)}>Заказать мониторнинг</Button>
                <Button compact={true} style={styles.transportFormButton} contentStyle={styles.transportFormButtonContent} mode="contained" onPress={() => goToForm('Заказ или ремонт тахографа', 3)}>Заказ или ремонт тахографа</Button>
                <Button compact={true}
                    disabled={item.mn_current_status === 'Исполнение' || item.mn_current_status === "Создан"}
                    style={styles.transportFormButton} 
                    contentStyle={item.mn_current_status === 'Исполнение' || item.mn_current_status === "Создан" ? styles.transportFormButtonContentDis : styles.transportFormButtonContent}
                    mode="contained"
                    onPress={() => goToForm('Ремонт', 4)}>{item.mn_current_status === 'Исполнение' || item.mn_current_status === "Создан" ? 'Ремонт' : 'Ремонт уже зарегистрирован'}</Button>
                <Button compact={true} style={styles.transportFormButton} contentStyle={styles.transportFormButtonContent} mode="contained" onPress={() => goToForm('Заправки', 5)}>Заправки</Button>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = (state) => {
    const { jwt } = state.authentication;
    const { transports, transports_loading, transports_error } = state.transport;
    return {
        jwt,
        transports,
        transports_loading,
        transports_error
    };
};

const connectedTSItem = connect(mapStateToProps)(TSItem)
export { connectedTSItem as TSItem };