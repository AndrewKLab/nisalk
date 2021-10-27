import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { notificationsActions } from '../../_actions';
import { connect } from 'react-redux';
import { Alert, Loading, NotificationListItem, EmptyListComponent } from '../../_components';
import { Searchbar, Button, Paragraph } from 'react-native-paper';
import { styles } from '../../_styles/styles';


const NotificationsScreen = ({ dispatch, route, navigation, jwt, notifications, notifications_loading, notifications_error }) => {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchNotificationsList, setSearchNotificationsList] = useState('');

    const onChangeSearch = (query) => {
        setSearchQuery(query)
        if (query !== '') {
            var rg_value = new RegExp(query, "i");
            const result = notifications.filter(
                item => item.lk_ts_brand !== null && item.lk_ts_brand.match(rg_value) !== null ||
                item.lk_ts_reg_number !== null && item.lk_ts_reg_number.match(rg_value) !== null
            );
            setSearchNotificationsList(result)
        }

    };

    useEffect(() => {
        dispatch(notificationsActions.getNotifications(jwt)).then(() => { setLoading(false) })
    }, []);


    const onRefresh = () => {
        setRefreshing(true);
        if (!notifications_loading) { dispatch(notificationsActions.getNotifications(jwt)).then(() => { setRefreshing(false) }) }
    };

    const onRefreshError = () => {
        setLoading(true);
        if (!notifications_loading) { dispatch(notificationsActions.getNotifications(jwt)).then(() => { setLoading(false) }) }
    }

    if (loading || notifications_loading) return <Loading />
    if (notifications_error !== null) return <Alert message={notifications_error} onRefreshError={onRefreshError} />
    return (
        <View style={{ flex: 1 }}>
            {/* <Searchbar
                placeholder="Поиск"
                onChangeText={onChangeSearch}
                value={searchQuery}
            /> */}
            <FlatList
                data={searchQuery === '' ? notifications : searchNotificationsList}
                ListEmptyComponent={<EmptyListComponent message={'Транспортные средства не найдены.'} />}
                contentContainerStyle={{ flexGrow: 1 }}
                renderItem={({ item }) => (
                    <NotificationListItem item={item} index={item.lk_ts_id} navigation={navigation}  />
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
    const { notifications, notifications_loading, notifications_error } = state.notifications;
    return {
        jwt,
        notifications,
        notifications_loading,
        notifications_error
    };
};

const connectedNotificationsScreen = connect(mapStateToProps)(NotificationsScreen)
export { connectedNotificationsScreen as NotificationsScreen };