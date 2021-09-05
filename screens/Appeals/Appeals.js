import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { transportActions } from '../../_actions';
import { connect } from 'react-redux';
import { Alert, Loading, TSListItem } from '../../_components';
import { Searchbar, Button, Paragraph } from 'react-native-paper';
import { styles } from '../../_styles/styles';

const Appeals = ({ dispatch, navigation, jwt, transports, transports_loading, transports_error }) => {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchTranstortList, setSearchTranstortList] = React.useState('');

    const onChangeSearch = (query) => {
        setSearchQuery(query)
        if (query !== '') {
            var rg_value = new RegExp(query, "i");
            const result = transports.filter(item => item.lk_ts_brand !== null && item.lk_ts_reg_number.match(rg_value) !== null);
            setSearchTranstortList(result)
            console.log(result);

        }

    };

    useEffect(() => {
        dispatch(transportActions.getTransports(jwt)).then(() => { setLoading(false) })
    }, []);

    const EmptyTSListComponent = () => {
        return (
            <View style={{
                justifyContent: 'space-between',
                marginHorizontal: 8,
                marginVertical: 5,
                borderColor: "#e0e0e0",
                backgroundColor: '#fff',
                borderWidth: 1,
                borderRadius: 8,
            }}>
                <Paragraph style={{ textAlign: 'center', marginVertical: 30 }}>Транспортные средсва не найдены.</Paragraph >
                <ScrollView style={styles.transportFormButtonContainer}>
                    <Button compact={true} style={styles.transportFormButton} mode="contained" onPress={() => console.log('Pressed')}>Техподдержка</Button>
                    <Button compact={true} style={styles.transportFormButton} mode="contained" onPress={() => console.log('Pressed')}>Заказать мониторнинг</Button>
                    <Button compact={true} style={styles.transportFormButton} mode="contained" onPress={() => console.log('Pressed')}>Заказ или ремонт тахографа</Button>
                    <Button compact={true} style={styles.transportFormButton} mode="contained" onPress={() => console.log('Pressed')}>Свободное обращение</Button>
                </ScrollView>
            </View>
        );
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
                ListEmptyComponent={EmptyTSListComponent}
                renderItem={({ item, index }) => (
                    <TSListItem item={item} index={index} navigation={navigation} onPress={() => { navigation.navigate('AppealsItemScreen', { item }) }} />
                )}
                keyExtractor={(item, index) => item.lk_ts_id}
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

const connectedAppeals = connect(mapStateToProps)(Appeals)
export { connectedAppeals as Appeals };