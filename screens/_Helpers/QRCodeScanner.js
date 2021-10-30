import React, { useEffect, useRef } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';

import { transportActions } from '../../_actions';
import { connect } from 'react-redux';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QRCodeScannerScreen = ({dispatch, navigation, jwt,}) => {
    const scanner = useRef();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            scanner.current.reactivate()
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);

    const onSuccess = e => {
        var url = e.data.split('/');
        var ts_id = url[url.length - 1];
        dispatch(transportActions.getTransport(jwt, ts_id, navigation))
    };

    return (
        <QRCodeScanner
            ref={scanner}
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.torch}
            showMarker={true}
        />
    );
}

const mapStateToProps = (state) => {
    const { jwt } = state.authentication;
    return {
        jwt
    };
};

const connectedQRCodeScannerScreen = connect(mapStateToProps)(QRCodeScannerScreen)
export { connectedQRCodeScannerScreen as QRCodeScannerScreen };
