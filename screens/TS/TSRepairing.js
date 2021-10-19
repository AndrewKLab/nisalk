import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { transportActions } from '../../_actions';
import { connect } from 'react-redux';
import { Alert, Loading, TSRepairingListItem } from '../../_components';
import { Button, Searchbar, Paragraph } from 'react-native-paper';
import { styles } from '../../_styles/styles';


const TSRepairing = ({ dispatch, navigation, route, jwt, repairing_transport, repairing_transport_loading, repairing_transport_error }) => {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTranstortList, setSearchTranstortList] = useState('');


    const onChangeSearch = (query) => {
        setSearchQuery(query)
        if (query !== '') {
            var rg_value = new RegExp(query, "i");
            const result = repairing_transport.filter(item => item.lk_ts_reg_number.match(rg_value) !== null);
            setSearchTranstortList(result)
        }

    };

    useEffect(() => {
        dispatch(transportActions.getRepairingTransport(jwt)).then(() => { setLoading(false) })
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        if (!repairing_transport_loading) { dispatch(transportActions.getRepairingTransport(jwt)).then(() => { setRefreshing(false) }) }
    };

    const onRefreshError = () => {
        setLoading(true);
        if (!repairing_transport_loading) { dispatch(transportActions.getRepairingTransport(jwt)).then(() => { setLoading(false) }) }
    }

    const EmptyRepairingTSListComponent = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
            <Searchbar
                placeholder="Поиск"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <FlatList
                data={searchQuery === '' ? repairing_transport : searchTranstortList}
                contentContainerStyle={{ flexGrow: 1 }}
                ListEmptyComponent={EmptyRepairingTSListComponent}
                renderItem={({ item, index }) => (
                    <TSRepairingListItem item={item} index={index} navigation={navigation} />
                )}
                onRefresh={onRefresh}
                refreshing={refreshing}
                keyExtractor={(item, index) => item.mn_id}
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