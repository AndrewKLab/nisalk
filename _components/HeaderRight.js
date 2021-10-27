import React, { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Menu, Portal, Dialog, Paragraph, Button, RadioButton, IconButton } from 'react-native-paper';
import { styles } from '../_styles/styles';
import { userActions } from '../_actions';
import DeviceInfo from 'react-native-device-info';

import { connect } from 'react-redux';

const HeaderRight = ({ navigation, dispatch, jwt, user, source }) => {

    const [visibleMenu, setVisibleMenu] = useState(false);
    const openMenu = () => setVisibleMenu(true);
    const closeMenu = () => setVisibleMenu(false);

    const [visibleDialog, setVisibleDialog] = useState(false);
    const showDialog = () => setVisibleDialog(true);
    const hideDialog = () => setVisibleDialog(false);

    const [visibleSourceDialog, setVisibleSourceDialog] = useState(false);
    const showSourceDialog = () => setVisibleSourceDialog(true);
    const hideSourceDialog = () => setVisibleSourceDialog(false);

    const [sourceState, setSourceState] = useState(source);



    const logOut = () => {
        hideDialog()
        dispatch(userActions.logout(jwt, navigation))
    }

    const changeSource = () => {
        hideSourceDialog()
        dispatch(userActions.setSource(sourceState))
    }

    return (
        <View style={{flexDirection:'row'}}>
            <IconButton
                icon="bell"
                color={'#ffffff'}
                size={25}
                onPress={() => navigation.navigate('Notifications')}
            />
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
                <Menu.Item title={user && `${user.lastname} ${user.firstname}`} disabled />
                {user && user.id === 282 ? <Menu.Item icon="source-branch" title={`Ресурс`} onPress={() => { closeMenu(), showSourceDialog() }} /> : null}
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

            <Portal>
                <Dialog visible={visibleSourceDialog} onDismiss={hideSourceDialog} style={{ alignSelf: 'center' }}>
                    <Dialog.Title>Измеить ресурс</Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group onValueChange={newValue => setSourceState(newValue)} value={sourceState}>
                            <View style={styles.radioListItem}>
                                <Text>lk.atc52.ru</Text>
                                <RadioButton value="https://lk.atc52.ru/api" />
                            </View>
                            <View style={styles.radioListItem}>
                                <Text>1.lk.atc52.ru</Text>
                                <RadioButton value="http://1.lk.atc52.ru/api" />
                            </View>
                            <View style={styles.radioListItem}>
                                <Text>2.lk.atc52.ru</Text>
                                <RadioButton value="http://2.lk.atc52.ru/api" />
                            </View>
                        </RadioButton.Group>

                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {dispatch(userActions.logout(jwt, navigation)).then(()=>changeSource()) }}>Применить</Button>
                        <Button onPress={hideSourceDialog}>Закрыть</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const mapStateToProps = (state) => {
    const { jwt, user, source } = state.authentication;
    return {
        jwt, user, source
    };
};

const connectedHeaderRight = connect(mapStateToProps)(HeaderRight)
export { connectedHeaderRight as HeaderRight };
