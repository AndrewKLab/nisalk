import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, BackHandler } from 'react-native';
import { Button, Text, Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { reqestsActions } from '../../_actions';
import { Loading, ListItem, Alert, EmptyListComponent } from '../../_components';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";


const ReqestsScreen = ({ dispatch, jwt, requests, requests_loading, requests_error, requests_type, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [requestsType, setRequestsType] = useState('opened');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRequestsList, setSearchRequestsList] = useState('');

  const onChangeSearch = (query) => {
    setSearchQuery(query)
    if (query !== '') {
      var rg_value = new RegExp(query, "i");
      const result = requests.filter(item => 
        item.task_lk_number !== null && item.task_lk_number.match(rg_value) !== null ||
        item.task_lk_mark !== null && item.task_lk_mark.match(rg_value) !== null ||
        item.task_lk_id !== null && String(item.task_lk_id).match(rg_value) !== null
        );
      setSearchRequestsList(result)

    }
  };



  useEffect(() => {
    dispatch(reqestsActions.getReuests(jwt)).then(() => setLoading(false))


    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        if (notification.tag === undefined) {
          console.log(navigation)
          navigation.navigate('ReqestСhat', { task_lk_id: notification.data.task })
        }
      },


      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });

    messaging().onMessage(remoteMessage => {
      const title = remoteMessage.notification.title;
      const body = remoteMessage.notification.body;
      const task = remoteMessage.data.task;
      const message = remoteMessage.data.message;

      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: "fcm_fallback_notification_channel",
        vibrate: true, // (optional) default: true
        priority: "high", // (optional) set notification priority, default: high
        largeIcon: "",
        smallIcon: "ic_launcher_round",
        /* iOS and Android properties */
        title: title, // (optional)
        message: body, // (required)
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        data: remoteMessage.data
      });

      dispatch(reqestsActions.addMessage(task, message, remoteMessage.data));

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
      if (requestsType) {
        dispatch(reqestsActions.getReuests(jwt)).then(() => {
          setRefreshing(false);
        });
      } else {
        dispatch(reqestsActions.getArchiveReuests(jwt)).then(() => {
          setRefreshing(false);
        });
      }

    }
  };

  const onRefreshError = () => {
    setLoading(true);
    if (!requests_loading) {
      if (requestsType) {
        dispatch(reqestsActions.getReuests(jwt)).then(() => {
          setLoading(false);
        });
      } else {
        dispatch(reqestsActions.getArchiveReuests(jwt)).then(() => {
          setLoading(false);
        });
      }

    }
  };

  const goToChat = (task_lk_id) => {
    navigation.navigate('ReqestСhat', { task_lk_id: task_lk_id })
  }

  const changeRequestsType = (btn) => {
    setRequestsType(btn);
    if (btn === 'opened') {
      if (requests_type === "close") {
        setLoading(true);
        dispatch(reqestsActions.getReuests(jwt)).then(() => setLoading(false));
      }
    } else {
      if (requests_type === "open") {
        setLoading(true);
        dispatch(reqestsActions.getArchiveReuests(jwt)).then(() => setLoading(false));
      }
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
        style={{ elevation: 0 }}
      />
      <View style={{ flexDirection: 'row', padding: 8, justifyContent: 'space-around', backgroundColor: '#fff', elevation: 2 }}>
        <Button mode={requestsType === 'opened' ? "contained" : "outlined"} style={{ elevation: 0, flex: 1, marginRight: 8 }} onPress={() => { changeRequestsType('opened') }}>Открытые</Button>
        <Button mode={requestsType === 'closed' ? "contained" : "outlined"} style={{ elevation: 0, flex: 1 }} onPress={() => { changeRequestsType('closed') }}>Закрытые</Button>
      </View>
      {loading || requests_loading ? <Loading /> :
        requests_error !== null ? <Alert message={requests_error} onRefreshError={onRefreshError} /> :
          <FlatList
            data={searchQuery === '' ? requests : searchRequestsList}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={<EmptyListComponent message={'Заявки не найдены.'} />}
            renderItem={({ item }) => (
              <ListItem item={item} index={item.task_lk_id} onPress={() => goToChat(item.task_lk_id)} />
            )}
            onRefresh={onRefresh}
            refreshing={refreshing}
            keyExtractor={(item) => item.task_lk_id}
          />
      }
    </SafeAreaView>
  );
}


const mapStateToProps = (state) => {
  const { jwt } = state.authentication;
  const { requests, requests_loading, requests_error, requests_type } = state.requests;
  return {
    jwt,
    requests,
    requests_loading,
    requests_error,
    requests_type,
  };
};

const connectedReqestsScreen = connect(mapStateToProps)(ReqestsScreen)
export { connectedReqestsScreen as ReqestsScreen };
