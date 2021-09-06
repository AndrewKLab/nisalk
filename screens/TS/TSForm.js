import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { reqestsActions } from '../../_actions';
import { connect } from 'react-redux';
import { Alert, Loading, TSListItem } from '../../_components';
import { Button, Headline, Caption, Title, TextInput, Surface, IconButton, Dialog, Portal, Paragraph } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { styles } from '../../_styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';


const TSForm = ({ dispatch, navigation, jwt, route, user }) => {
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = React.useState(false);
    const { ts, theme } = route.params;
    const [mark, setMark] = useState(ts !== null ? ts.lk_ts_brand : '');
    const [model, setModel] = useState(ts !== null ? ts.lk_ts_model : '');
    const [number, setNumber] = useState(ts !== null ? ts.lk_ts_reg_number : '');
    const [message, setMessage] = useState('');
    const [fileList, setFileList] = useState([]);


    // useEffect(() => {
    //     dispatch(transportActions.getTransports(jwt)).then(() => { setLoading(false) })
    // }, []);

    // if (loading || transports_loading) return <Loading />
    // if (transports_error !== null) return <Alert message={transports_error} onRefreshError={onRefreshError} />

    const selectfileList = async () => {
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
            });
            for (const res of results) {
                console.log('selectfileList() : ' + JSON.stringify(res));
            }
            // fileList.map((item, index)=> results.filter(file => item.name === file.name).length !== 0 ? : item)
            // var fl = fileList.length === 0 ? results : fileList.push(results)
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

    const showModal = () => setVisible(true);
    const hideModal = () => {
        setVisible(false);
        navigation.goBack();
    }

    const sendMessage = (theme, message, mark, model, number, fileList) => {
        dispatch(reqestsActions.createRequest(jwt, theme, message, user !== undefined ? user.orgs[0].org_id : 0, mark, model, number, number.slice(6), fileList, showModal))
    }


    return (
        <ScrollView style={styles.formContainer}>
            <View style={styles.formOrgContainer}>
                <Caption>Организация</Caption>
                {user !== undefined ? user.orgs > 1 ? <Headline>{JSON.stringify(user.orgs)}</Headline> : <Headline>{user.orgs.map((item, index) => item.org_name)}</Headline> : null}
            </View>
            <View style={styles.formInputsContainer}>
                {theme !== 6 ?
                    <>
                        <Title style={{ marginBottom: 8 }}>Транспорное средство</Title>
                        <TextInput
                            mode={'outlined'}
                            label="Марка"
                            value={mark}
                            style={styles.formInput}
                            onChangeText={text => setMark(text)}
                        />
                        <TextInput
                            mode={'outlined'}
                            label="Модель"
                            value={model}
                            style={styles.formInput}
                            onChangeText={text => setModel(text)}
                        />
                        <TextInput
                            mode={'outlined'}
                            label="Номер"
                            value={number}
                            style={styles.formInput}
                            onChangeText={text => setNumber(text)}
                        />
                        <TextInput
                            mode={'outlined'}
                            label="Описание проблеммы"
                            value={message}
                            style={styles.formInput}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={text => setMessage(text)}
                        />
                    </>
                    :
                    <>
                        <TextInput
                            mode={'outlined'}
                            label="Задать вопрос"
                            value={message}
                            style={styles.formInput}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={text => setMessage(text)}
                        />
                    </>
                }
                <Button style={styles.formInput} icon="file" mode="outlined" onPress={selectfileList}>Прикрепить файлы</Button>
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
                <Button style={styles.formInput} mode="contained" onPress={() => sendMessage(theme, message, mark, model, number, fileList)}>Отправить</Button>
            </View>

            <Portal>
                <Dialog visible={visible} onDismiss={hideModal}>
                    <Dialog.Title>Спасибо</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Ваша заявка была отправленна!</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideModal}>Закрыть</Button>
                    </Dialog.Actions>
                </Dialog>

            </Portal>
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    const { jwt, user } = state.authentication;
    const { transports, transports_loading, transports_error } = state.transport;
    return {
        jwt,
        user,
        transports,
        transports_loading,
        transports_error
    };
};

const connectedTSForm = connect(mapStateToProps)(TSForm)
export { connectedTSForm as TSForm };