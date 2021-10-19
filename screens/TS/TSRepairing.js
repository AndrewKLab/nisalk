import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { transportActions } from '../../_actions';
import { connect } from 'react-redux';
import { Alert, Loading, TSRepairingListItem } from '../../_components';
import { Button, Headline, Paragraph } from 'react-native-paper';
import { styles } from '../../_styles/styles';


const TSRepairing = ({ dispatch, navigation, route, jwt, repairing_transport, repairing_transport_loading, repairing_transport_error }) => {
    const { ts } = route.params;
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        dispatch(transportActions.getRepairingTransport(jwt, ts.lk_ts_id)).then(() => { setLoading(false) })
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        if (!repairing_transport_loading) { dispatch(transportActions.getRepairingTransport(jwt, ts.lk_ts_id)).then(() => { setRefreshing(false) }) }
    };

    const onRefreshError = () => {
        setLoading(true);
        if (!repairing_transport_loading) { dispatch(transportActions.getRepairingTransport(jwt, ts.lk_ts_id)).then(() => { setLoading(false) }) }
    }

    const EmptyRepairingTSListComponent = () => {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{
                    padding: 20,
                    borderColor: "#e0e0e0",
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderRadius: 8,
                }}>
                    <Paragraph style={{ textAlign: 'center', }}>Заявки на ремонт не найдены.</Paragraph >
                </View>
            </View>
        );
    }

    if (loading || repairing_transport_loading) return <Loading />
    if (repairing_transport_error !== null) return <Alert message={repairing_transport_error} onRefreshError={onRefreshError} />

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={repairing_transport}
                contentContainerStyle={{ flexGrow: 1 }}
                ListEmptyComponent={EmptyRepairingTSListComponent}
                renderItem={({ item, index }) => (
                    <TSRepairingListItem item={item} index={index} navigation={navigation} />
                )}
                onRefresh={onRefresh}
                refreshing={refreshing}
                keyExtractor={(item, index) => item.lk_ts_id}
            />
        </View>
    )
}

const mapStateToProps = (state) => {
    const { jwt } = state.authentication;
    const { repairing_transport, repairing_transport_loading, repairing_transport_error } = state.transport;
    return {
        jwt,
        repairing_transport,
        repairing_transport_loading,
        repairing_transport_error
    };
};

const connectedTSRepairing = connect(mapStateToProps)(TSRepairing)
export { connectedTSRepairing as TSRepairing };