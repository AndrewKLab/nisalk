import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { transportActions } from '../../_actions';
import { connect } from 'react-redux';
import { Alert, Loading, TSListItem } from '../../_components';
import { Button, Headline, Caption } from 'react-native-paper';
import { styles } from '../../_styles/styles';


const TSItem = ({ dispatch, navigation, route }) => {
    const [loading, setLoading] = useState(true);

    const { item } = route.params;
    // useEffect(() => {
    //     dispatch(transportActions.getTransports(jwt)).then(() => { setLoading(false) })
    // }, []);

    // if (loading || transports_loading) return <Loading />
    // if (transports_error !== null) return <Alert message={transports_error} onRefreshError={onRefreshError} />
    return (
        <View style={styles.transportItemContainer}>
            <View style={styles.transportItem}>
                <Headline style={styles.transportItemTitle}>{item.lk_ts_brand}</Headline>
                <View style={styles.transportItemText} >
                    <Caption>{`Модель: ${item.lk_ts_model}`}</Caption>
                    <Caption>{`Номер: ${item.lk_ts_reg_number}`}</Caption>
                </View>
            </View>
            <ScrollView style={styles.transportFormButtonContainer}>
                <Button style={styles.transportFormButton} mode="contained" onPress={() => console.log('Pressed')}>Техподдержка</Button>
                <Button style={styles.transportFormButton} mode="contained" onPress={() => console.log('Pressed')}>Заказать мониторнинг</Button>
                <Button style={styles.transportFormButton} mode="contained" onPress={() => console.log('Pressed')}>Заказ или ремонт тахографа</Button>
                <Button style={styles.transportFormButton} mode="contained" onPress={() => console.log('Pressed')} disabled={true}>Заправки</Button>
                <Button style={styles.transportFormButton} mode="contained" onPress={() => console.log('Pressed')} disabled={true}>Ремонт</Button>
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