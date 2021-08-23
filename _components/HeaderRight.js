import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { IconButton, Portal, Dialog, Paragraph, Button } from 'react-native-paper';
import { styles } from '../_styles/styles';
import { userActions } from '../_actions';
import { connect, useDispatch } from 'react-redux';

export const HeaderRight = ({ navigation }) => {
    const [visible, setVisible] = React.useState(false);
    const dispatch = useDispatch();

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const logOut = () => {
        hideDialog()
        dispatch(userActions.logout(navigation))
    }

    return (
        <View>

            <IconButton
                icon="exit-to-app"
                color={'#ffffff'}
                size={25}
                onPress={showDialog}
            />
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} style={{ alignSelf: 'center'}}>
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
