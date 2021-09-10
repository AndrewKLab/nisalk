import React, { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Menu, Portal, Dialog, Paragraph, Button, Divider, IconButton } from 'react-native-paper';
import { styles } from '../_styles/styles';
import { userActions } from '../_actions';
import DeviceInfo from 'react-native-device-info';

import { connect } from 'react-redux';

const HeaderRight = ({ navigation, dispatch, jwt }) => {

    const [visibleMenu, setVisibleMenu] = useState(false);
    const openMenu = () => setVisibleMenu(true);
    const closeMenu = () => setVisibleMenu(false);

    const [visibleDialog, setVisibleDialog] = useState(false);
    const showDialog = () => setVisibleDialog(true);
    const hideDialog = () => setVisibleDialog(false);



    const logOut = () => {
        hideDialog()
        dispatch(userActions.logout(jwt, navigation))
    }

    return (
        <View>
            <Menu
                visible={visibleMenu}
                onDismiss={closeMenu}
                anchor={
                    <IconButton
                        icon="dots-horizontal"
                        color={'#ffffff'}
                        size={25}
                        onPress={openMenu}
                    />
                }>
                <Menu.Item icon="exit-to-app" onPress={() => { closeMenu(), showDialog() }} title="Выход" />

                <Menu.Item title={`Версия: ${DeviceInfo.getVersion()}`} disabled />
            </Menu>

            <Portal>
                <Dialog visible={visibleDialog} onDismiss={hideDialog} style={{ alignSelf: 'center' }}>
                    <Dialog.Title>Выход</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Вы точно хотите выйти из этого аккаунта?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={logOut}>Да</Button>
                        <Button onPress={hideDialog}>Нет</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const mapStateToProps = (state) => {
    const { jwt } = state.authentication;
    return {
        jwt,
    };
};

const connectedHeaderRight = connect(mapStateToProps)(HeaderRight)
export { connectedHeaderRight as HeaderRight };
