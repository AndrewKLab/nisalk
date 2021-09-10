import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { transportActions } from '../../_actions';
import { connect } from 'react-redux';
import { Alert, Loading, TSListItem } from '../../_components';
import { Button, Headline, Caption } from 'react-native-paper';
import { styles } from '../../_styles/styles';


const Appeals = ({ dispatch, navigation, route }) => {
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     dispatch(transportActions.getTransports(jwt)).then(() => { setLoading(false) })
    // }, []);

    // if (loading || transports_loading) return <Loading />
    // if (transports_error !== null) return <Alert message={transports_error} onRefreshError={onRefreshError} />

    const goToForm = (title, theme) => {
        navigation.navigate('AppealsFormScreen', { title: title, theme: theme, ts: null })
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

const connectedAppeals = connect(mapStateToProps)(Appeals)
export { connectedAppeals as Appeals };