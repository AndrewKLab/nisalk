import React, { useEffect, useState, useRef } from 'react';
import { Text, View, FlatList, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { reqestsActions } from '../../_actions';
import { connect } from 'react-redux';
import { Alert, Loading, TSListItem } from '../../_components';
import { Button, Headline, Caption, Title, TextInput, Surface, IconButton, Dialog, Portal, Paragraph } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { styles } from '../../_styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';




const FeedbackForm = ({ dispatch, navigation, jwt, route, user, create_reqest_loading, create_reqest_error, requests_type }) => {
    const [visible, setVisible] = useState(false);
    const { theme } = route.params;

    const [message, setMessage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [selectedValue, setSelectedValue] = useState(user !== undefined && user.orgs !== undefined ? user.orgs.length > 1 ? '' : user.orgs[0].org_id : '');
    const [sendError, setSendError] = useState('');

    const selectfileList = async () => {
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
            });
            for (const res of results) {
                console.log('selectfileList() : ' + JSON.stringify(res));
            }
            setFileList(results)
        }
        catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Canceled from multiple doc picker');
            }
            else {
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    }

    const dellFileFromfilelist = (file) => {
        const nfl = fileList.filter(item => item.uri !== file.uri);
        console.log(file.name, nfl)
        setFileList(nfl)
    }

    const showModal = (error) => {
        if (error) {
            setSendError(error)
        }
        setVisible(true);
    };
    const hideModal = () => {
        setVisible(false);
        if (sendError === '') {
            navigation.goBack();

        }
    }

    const sendMessage = (theme, message, mark, model, number, fileList) => {
        setSendError('');
        dispatch(reqestsActions.createRequest(jwt, theme, message, user !== undefined && user.orgs !== undefined ? user.orgs[0].org_id : 0, mark, model, number, number.slice(6), fileList, showModal, user, requests_type))
    }


    return (
        <ScrollView style={styles.formContainer}>
            <View style={styles.formOrgContainer}>
                <Caption>??????????????????????</Caption>
                {user !== undefined && user.orgs !== undefined ? user.orgs.length > 1 ?
                    <View style={{ borderRadius: 2, borderWidth: 1.5, borderColor: '#a8a8a8', }}>
                        <Picker
                            selectedValue={selectedValue}
                            dropdownIconColor={'#000'}
                            prompt="??????????????????????:"
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label={'???????????????? ??????????????????????'} value={''} />
                            {user.orgs.map((item, index) => <Picker.Item key={index} label={item.org_name} value={item.org_id} />)}

                        </Picker>
                    </View>
                    :
                    <Headline>{user.orgs.map((item, index) => item.org_name)}</Headline> : null}
            </View>
            <View style={styles.formInputsContainer}>
                <TextInput
                    mode={'outlined'}
                    label="???????????? ????????????"
                    value={message}
                    style={styles.formInput}
                    disabled={selectedValue === ''}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={text => setMessage(text)}
                />
                <Button style={[styles.formInput, { marginBottom: 24 }]} icon="file" mode="outlined" disabled={selectedValue === ''} onPress={selectfileList}>???????????????????? ??????????</Button>
                {fileList.length > 0 &&
                    <View style={[styles.filesBoard, { marginBottom: 8 }]}>
                        <FlatList
                            data={fileList}
                            horizontal
                            renderItem={({ item, index }) => (
                                <Surface style={styles.filesBoardItem} key={index}>
                                    <IconButton
                                        icon="close"
                                        size={15}
                                        style={styles.filesBoardDellFileButton}
                                        onPress={() => dellFileFromfilelist(item)}
                                    />
                                    <Icon name="file" color="gray" size={25} />
                                    <Text>{item.name.length > 4 ? "..." + item.name.substr(item.name.length - 8) : item.name}</Text>
                                </Surface>
                            )}
                            keyExtractor={(item, index) => index}
                        />

                    </View>
                }
                <Button style={{ marginBottom: 8 }} mode="contained" loading={create_reqest_loading} disabled={selectedValue === ''} onPress={() => sendMessage(theme, message, '', '', '', fileList)}>??????????????????</Button>
            </View>

            <Portal>
                <Dialog visible={visible} onDismiss={hideModal}>
                    <Dialog.Title>{sendError !== '' ? '????????????' : '??????????????'}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{sendError !== '' ? sendError : '???????? ???????????? ???????? ??????????????????????!'}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideModal}>??????????????</Button>
                    </Dialog.Actions>
                </Dialog>

            </Portal>
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    const { jwt, user } = state.authentication;
    const { create_reqest_loading, create_reqest_error } = state.requests;
    const { requests_type } = state.requests;
    return {
        jwt,
        user,
        create_reqest_loading,
        create_reqest_error,
        requests_type
    };
};

const connectedFeedbackForm = connect(mapStateToProps)(FeedbackForm)
export { connectedFeedbackForm as FeedbackForm };