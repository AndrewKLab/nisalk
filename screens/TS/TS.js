import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { transportActions } from '../../_actions';
import { connect } from 'react-redux';
import { Alert, Loading, TSListItem, EmptyListComponent } from '../../_components';
import { Searchbar, Button, Paragraph } from 'react-native-paper';
import { styles } from '../../_styles/styles';


const TS = ({ dispatch, route, navigation, jwt, transports, transports_loading, transports_error }) => {
    const { type } = route.params;
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTranstortList, setSearchTranstortList] = useState('');

    const onChangeSearch = (query) => {
        setSearchQuery(query)
        if (query !== '') {
            var rg_value = new RegExp(query, "i");
            const result = transports.filter(
                item => item.lk_ts_brand !== null && item.lk_ts_brand.match(rg_value) !== null ||
                item.lk_ts_reg_number !== null && item.lk_ts_reg_number.match(rg_value) !== null
            );
            setSearchTranstortList(result)
        }

    };

    useEffect(() => {
        dispatch(transportActions.getTransports(jwt)).then(() => { setLoading(false) })
    }, []);


    const onRefresh = () => {
        setRefreshing(true);
        if (!transports_loading) { dispatch(transportActions.getTransports(jwt)).then(() => { setRefreshing(false) }) }
    };

    const onRefreshError = () => {
        setLoading(true);
        if (!transports_loading) { dispatch(transportActions.getTransports(jwt)).then(() => { setLoading(false) }) }
    }

    if (loading || transports_loading) return <Loading />
    if (transports_error !== null) return <Alert message={transports_error} onRefreshError={onRefreshError} />
    return (
        <View style={{ flex: 1 }}>
            <Searchbar
                placeholder="Поиск"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <FlatList
                data={searchQuery === '' ? transports : searchTranstortList}
                ListEmptyComponent={<EmptyListComponent message={'Транспортные средства не найдены.'} />}
                contentContainerStyle={{ flexGrow: 1 }}
                renderItem={({ item }) => (
                    <TSListItem item={item} index={item.lk_ts_id} navigation={navigation} onPress={() => { type === 'info' ? navigation.navigate('TSItemScreen', { item }) : navigation.navigate('TSRepairingScreen', { title: `${item.lk_ts_reg_number} ${item.lk_ts_brand} ${item.lk_ts_model}`, ts: item }) }} />
                )}
                onRefresh={onRefresh}
                refreshing={refreshing}
                keyExtractor={(item) => item.lk_ts_id}
            />
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

const connectedTS = connect(mapStateToProps)(TS)
export { connectedTS as TS };