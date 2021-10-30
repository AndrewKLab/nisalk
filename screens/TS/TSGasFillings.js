import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { transportActions } from '../../_actions';
import { connect } from 'react-redux';
import { Alert, Loading, TSGasFillingsListItem, EmptyListComponent } from '../../_components';
import { Button, Searchbar, Paragraph } from 'react-native-paper';
import { styles } from '../../_styles/styles';


const TSGasFillings = ({ dispatch, navigation, route, jwt, gas_filligs_transport_loading, gas_filligs_transport_error, gas_filligs_transport }) => {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTranstortList, setSearchTranstortList] = useState('');


    const onChangeSearch = (query) => {
        setSearchQuery(query)
        if (query !== '') {
            var rg_value = new RegExp(query, "i");
            const result = gas_filligs_transport.filter(item => item.lk_ts_reg_number.match(rg_value) !== null);
            setSearchTranstortList(result)
        }

    };

    useEffect(() => {
        dispatch(transportActions.getGasFillingsTransport(jwt)).then(() => { setLoading(false) })
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        if (!gas_filligs_transport_loading) { dispatch(transportActions.getGasFillingsTransport(jwt)).then(() => { setRefreshing(false) }) }
    };

    const onRefreshError = () => {
        setLoading(true);
        if (!gas_filligs_transport_loading) { dispatch(transportActions.getGasFillingsTransport(jwt)).then(() => { setLoading(false) }) }
    }

    if (loading || gas_filligs_transport_loading) return <Loading />
    if (gas_filligs_transport_error !== null) return <Alert message={gas_filligs_transport_error} onRefreshError={onRefreshError} />

    return (
        <View style={{ flex: 1 }}>
            <Searchbar
                placeholder="Поиск"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <FlatList
                data={searchQuery === '' ? gas_filligs_transport : searchTranstortList}
                contentContainerStyle={{ flexGrow: 1 }}
                ListEmptyComponent={<EmptyListComponent message={'Заявки на заправку не найдены.'} />}
                renderItem={({ item, index }) => (
                    <TSGasFillingsListItem item={item} index={index} navigation={navigation} />
                )}
                onRefresh={onRefresh}
                refreshing={refreshing}
                keyExtractor={(item, index) => item.lk_gf_id}
            />
        </View>
    )
}

const mapStateToProps = (state) => {
    const { jwt } = state.authentication;
    const { gas_filligs_transport_loading, gas_filligs_transport_error, gas_filligs_transport } = state.transport;
    return {
        jwt,
        gas_filligs_transport_loading,
        gas_filligs_transport_error,
        gas_filligs_transport,
    };
};

const connectedTSGasFillings = connect(mapStateToProps)(TSGasFillings)
export { connectedTSGasFillings as TSGasFillings };