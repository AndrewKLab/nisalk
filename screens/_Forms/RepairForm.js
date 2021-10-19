import React, { useEffect, useState, useRef } from 'react';
import { Text, View, FlatList, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { transportActions } from '../../_actions';
import { connect } from 'react-redux';
import { Alert, Loading, TSListItem } from '../../_components';
import { Button, Headline, Caption, Title, TextInput, Surface, IconButton, Dialog, Portal, Paragraph } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { styles } from '../../_styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';




const RepairForm = ({ dispatch, navigation, jwt, route, user, requests_type }) => {
    const { ts, theme } = route.params;

    const [visible, setVisible] = useState(false);

    const [mark, setMark] = useState(ts !== null ? ts.lk_ts_brand : '');
    const [model, setModel] = useState(ts !== null ? ts.lk_ts_model : '');
    const [number, setNumber] = useState(ts !== null ? ts.lk_ts_reg_number : '');

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const [selectedRepairType, setSelectedRepairType] = useState('1');
    const [selectedMalfunctionType, setSelectedMalfunctionType] = useState('');

    const [mileage, setMileage] = useState('');
    const [operating, setOperating] = useState('');
    const [note, setNote] = useState('');

    const [sendError, setSendError] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatePiker = () => {
        setShow(true);
    };

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

    const sendMessage = (mn_date, mn_vid_rep, mn_malfunction_id, mn_kilometrage, mn_runing_time, mn_notes, mn_ts_id) => {
        setSendError('');
        if(mn_vid_rep === '' || mn_malfunction_id === ''){
            showModal('Пожалуйста заполните все обязательные поля!');
        } else if(mn_malfunction_id === '5' && mn_notes === '') {
            showModal('Пожалуйста заполните все обязательные поля!');
        } else {
            dispatch(transportActions.createRepairRequest(jwt, moment(mn_date).format('YYYY-MM-DD'), mn_vid_rep, mn_malfunction_id, mn_kilometrage, mn_runing_time, mn_notes, mn_ts_id.lk_ts_id, showModal))
        }
    }

    return (
        <ScrollView style={styles.formContainer}>
            <View style={styles.formInputsContainer}>

                <Title style={{ marginBottom: 8 }}>{`${number} ${mark} ${model}`}</Title>
                <TouchableWithoutFeedback onPress={showDatePiker}>
                    <View>
                        <Paragraph>{"Требуемая дата проведения ремонта:"}</Paragraph>
                        <View style={[styles.formInput, { padding: 14, borderWidth: 1, borderRadius: 2, borderColor: 'rgba(0,0,0,0.54)' }]}>
                            <Paragraph style={{fontSize: 16}}>{moment(date).format("DD.MM.YYYY")}</Paragraph>
                        </View>
                    </View>
                </TouchableWithoutFeedback >
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}

                <Paragraph>{"Вид ремонта:"}</Paragraph>
                <View style={[styles.formInput, { borderRadius: 2, borderWidth: 1, borderColor: 'rgba(0,0,0,0.54)', }]}>
                    <Picker
                        selectedValue={selectedRepairType}
                        dropdownIconColor={'#000'}
                        prompt="Вид ремонта:"
                        onValueChange={(itemValue, itemIndex) => setSelectedRepairType(itemValue)}
                    >
                        <Picker.Item label={'Отложенный ремонт'} value={'1'} />
                        <Picker.Item label={'Срочный ремонт'} value={'2'} />
                    </Picker>
                </View>

                <Paragraph>{"Описание неисправности"}</Paragraph>
                <View style={[styles.formInput, { borderRadius: 2, borderWidth: 1, borderColor: 'rgba(0,0,0,0.54)', }]}>
                    <Picker
                        selectedValue={selectedMalfunctionType}
                        dropdownIconColor={'#000'}
                        prompt="Описание неисправности"
                        onValueChange={(itemValue, itemIndex) => setSelectedMalfunctionType(itemValue)}
                    >
                        <Picker.Item label={'Выберите тип несиправности'} value={''} />
                        <Picker.Item label={'Рулевое управление'} value={'1'} />
                        <Picker.Item label={'Ходовая часть'} value={'2'} />
                        <Picker.Item label={'Тормозная система'} value={'3'} />
                        <Picker.Item label={'Электрооборудование'} value={'4'} />
                        <Picker.Item label={'Прочее'} value={'5'} />
                    </Picker>
                </View>

                <TextInput
                    mode={'outlined'}
                    label="Пробег км."
                    keyboardType='numeric'
                    value={mileage}
                    style={styles.formInput}
                    onChangeText={text => setMileage(text)}
                />

                <TextInput
                    mode={'outlined'}
                    label="Наработка в м.ч"
                    keyboardType='numeric'
                    value={operating}
                    style={styles.formInput}
                    onChangeText={text => setOperating(text)}
                />

                <TextInput
                    mode={'outlined'}
                    label="Примечание"
                    value={note}
                    style={styles.formInput}
                    onChangeText={text => setNote(text)}
                />

                <Button style={{ marginBottom: 8 }} mode="contained" onPress={() => sendMessage(date, selectedRepairType, selectedMalfunctionType, mileage, operating, note, ts)}>Отправить</Button>
            </View>

            <Portal>
                <Dialog visible={visible} onDismiss={hideModal}>
                    <Dialog.Title>{sendError !== '' ? 'Ошибка' : 'Спасибо'}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{sendError !== '' ? sendError : 'Ваша заявка на ремонт была отправленна!'}</Paragraph>
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
    const { requests_type } = state.requests;
    return {
        jwt,
        user,
        transports,
        transports_loading,
        transports_error,
        requests_type
    };
};

const connectedRepairForm = connect(mapStateToProps)(RepairForm)
export { connectedRepairForm as RepairForm };