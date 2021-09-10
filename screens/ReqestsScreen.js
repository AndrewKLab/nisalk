import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, BackHandler } from 'react-native';
import { Button, Text, Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { styles } from '../_styles/styles';
import { reqestsActions } from '../_actions';
import { Loading, ListItem, Alert } from '../_components';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";


const ReqestsScreen = ({ dispatch, jwt, requests, requests_loading, requests_error, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [requestsType, setRequestsType] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRequestsList, setSearchRequestsList] = useState('');

  const onChangeSearch = (query) => {
    setSearchQuery(query)
    if (query !== '') {
      var rg_value = new RegExp(query, "i");
      const result = requests.filter(item => item.task_lk_number !== null && item.task_lk_number.match(rg_value) !== null || item.task_lk_id !== null && String(item.task_lk_id).match(rg_value) !== null);
      setSearchRequestsList(result)
      console.log(result);

    }

  };



  useEffect(() => {
    dispatch(reqestsActions.getReuests(jwt)).then(() => setLoading(false))
    //console.log(navigation.navigate('Reqests'))

    messaging().onMessage(remoteMessage => {
      const title = remoteMessage.notification.title;
      const body = remoteMessage.notification.body;
      const task = remoteMessage.data.task;
      const message = remoteMessage.data.message;

      PushNotification.localNotification({
        channelId: "1337",
        title: title,
        message: body
      });

      dispatch(reqestsActions.addMessage(task, message))

      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage.data));

    });

    messaging().onNotificationOpenedApp(remoteMessage => {

      console.log(
        'Notification caused app to open from background state:',
        JSON.stringify(remoteMessage.data.task),
      );
      navigation.navigate('ReqestСhat', { task_lk_id: remoteMessage.data.task })
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          navigation.navigate('ReqestСhat', { task_lk_id: remoteMessage.data.task })
        }
      });

  }, [jwt]);

  const onRefresh = () => {
    setRefreshing(true);
    if (!requests_loading) {
      dispatch(reqestsActions.getReuests(jwt)).then(() => {
        setRefreshing(false);
      });
    }
  };

  const onRefreshError = () => {
    setLoading(true);
    if (!requests_loading) {
      dispatch(reqestsActions.getReuests(jwt)).then(() => {
        setLoading(false);
      });
    }
  };

  const goToChat = (task_lk_id) => {
    navigation.navigate('ReqestСhat', { task_lk_id: task_lk_id })
  }

  const changeRequestsType = () => {
    setRequestsType(!requestsType)
    if (!requestsType) {
      setLoading(true);
      dispatch(reqestsActions.getReuests(jwt)).then(() => setLoading(false));
    } else {
      setLoading(true);
      dispatch(reqestsActions.getArchiveReuests(jwt)).then(() => setLoading(false));
    }
  }

  // if (loading) return <Loading />;
  // if (requests_error !== null) return <Alert message={requests_error} onRefreshError={onRefreshError} />

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Searchbar
        placeholder="Поиск"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{elevation: 0}}
      />
      <View style={{ flexDirection: 'row', padding: 8, justifyContent: 'space-around', backgroundColor: '#fff', elevation: 2 }}>
        <Button mode={requestsType ? "contained" : "outlined"} style={{ elevation: 0 }} onPress={() => changeRequestsType()}>Открытые</Button>
        <Button mode={!requestsType ? "contained" : "outlined"} style={{ elevation: 0 }} onPress={() => changeRequestsType()}>Закрытые</Button>
      </View>
      {loading || requests_loading ? <Loading /> :
        requests_error !== null ? <Alert message={requests_error} onRefreshError={onRefreshError} /> :
          <FlatList
            data={searchQuery === '' ? requests : searchRequestsList}
            ListEmptyComponent={() => (
              <View style={{ marginTop: '50%', justifyContent: 'center', alignItems: 'center' }}><Text>У вас пока что нет заявок.</Text></View>
            )}
            renderItem={({ item, index }) => (
              <ListItem item={item} index={index} onPress={() => goToChat(item.task_lk_id)} />
            )}
            onRefresh={onRefresh}
            refreshing={refreshing}
            keyExtractor={(item, index) => item.task_lk_id}
          />
      }
    </SafeAreaView>
  );
}


const mapStateToProps = (state) => {
  const { jwt } = state.authentication;
  const { requests, requests_loading, requests_error } = state.requests;
  return {
    jwt,
    requests,
    requests_loading,
    requests_error,
  };
};

const connectedReqestsScreen = connect(mapStateToProps)(ReqestsScreen)
export { connectedReqestsScreen as ReqestsScreen };
