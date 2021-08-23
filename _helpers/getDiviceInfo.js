import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';

export const getDiviceInfo = async () => {
    const model = Platform.constants.Model;
    const mac = await DeviceInfo.getMacAddress();
    const token = await messaging().getToken();
    console.log(token)
    return { model, mac, token }
}