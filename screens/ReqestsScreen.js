import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View } from 'react-native';
import { List, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { styles } from '../_styles/styles';
import { reqestsActions } from '../_actions';
import { Loading, ListItem, Alert } from '../_components';
import messaging from '@react-native-firebase/messaging';


const ReqestsScreen = ({ dispatch, jwt, requests, requests_loading, requests_error, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    dispatch(reqestsActions.getReuests(jwt)).then(() => {
      setLoading(false)
    })
    //console.log(navigation.navigate('Reqests'))

    messaging().onMessage(remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

    });

    messaging().onNotificationOpenedApp(remoteMessage => {

      console.log(
        'Notification caused app to open from background state:',
        JSON.stringify(remoteMessage.data.task),
      );
      dispatch(reqestsActions.getReuestMessages(jwt, remoteMessage.data.task, navigation))
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
            dispatch(reqestsActions.getReuestMessages(jwt, remoteMessage.data.task, navigation))
          );
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

  if (loading) {
    return <Loading />;
  }

  if (requests_error !== null) {
    return <Alert message={requests_error} onRefreshError={onRefreshError} />;
  }
  const goToChat = (id) => {
    dispatch(reqestsActions.getReuestMessages(jwt, id, navigation))
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={requests}
        ListEmptyComponent={()=>(
          <View style={{  marginTop: '50%', justifyContent: 'center', alignItems: 'center'}}><Text>У вас пока что нет заявок.</Text></View>
        )}
        renderItem={({ item, index }) => (
          <ListItem item={item} index={index} onPress={() => goToChat(item.task_lk_id)} />
        )}
        onRefresh={onRefresh}
        refreshing={refreshing}
        keyExtractor={(item, index) => item.task_lk_id}
      />
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
