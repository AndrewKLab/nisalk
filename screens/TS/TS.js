import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { transportActions } from '../../_actions';
import { connect } from 'react-redux';
import { Alert, Loading } from '../../_components';
import { List, Headline, Caption } from 'react-native-paper'


const TS = ({ dispatch, jwt, transports, transports_loading, transports_error }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(transportActions.getTransports(jwt)).then(() => { setLoading(false) })
    }, []);

    if (loading || transports_loading) return <Loading />
    if (transports_error !== null) return <Alert message={transports_error} onRefreshError={onRefreshError} />
    return (

        <FlatList
            data={transports}
            ListEmptyComponent={() => (
                <View style={{ marginTop: '50%', justifyContent: 'center', alignItems: 'center' }}><Text>У вас пока что нет заявок.</Text></View>
            )}
            renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => {console.log(123)}}>
                    <Headline>{item.lk_ts_brand}</Headline>
                    <Caption>{`Модель: ${item.lk_ts_model}`}</Caption>
                    <Caption>{`Номер: ${item.lk_ts_reg_number}`}</Caption>
                </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item.lk_ts_id}
        />
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

const connectedTS = connect(mapStateToProps)(TS)
export { connectedTS as TS };