import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';

notifee.createChannel({
  id: 'foreground-notifications',
  name: 'Уведомления при открытом приложении',
  badge: true,
  bypassDnd: false,
  description: 'Данный канал предназначен для уведомлений которые приходят когда это приложение открыто и оно не находится в свернутом соостоянии.',
  sound: 'default',
  lights: true,
  vibration: true,
  importance: AndroidImportance.HIGH,
  visibility: AndroidVisibility.PUBLIC
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
