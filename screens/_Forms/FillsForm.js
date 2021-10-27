import React, { useState } from 'react';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { transportActions } from '../../_actions';
import { connect } from 'react-redux';
import { Button, Title, TextInput, Dialog, Portal, Paragraph } from 'react-native-paper';
import { styles } from '../../_styles/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';




const FillsForm = ({ dispatch, navigation, jwt, route, create_fill_reqest_loading, create_fill_reqest_message, create_fill_reqest_error }) => {
    const { ts } = route.params;

    const [visible, setVisible] = useState(false);

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const [time, setTime] = useState(new Date());
    const [showTime, setShowTime] = useState(false);

    const [selectedFuelType, setSelectedFuelType] = useState('ДТ');

    const [liters, setLiters] = useState('');
    const [note, setNote] = useState('');

    const [sendError, setSendError] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || date;
        setShowTime(Platform.OS === 'ios');
        setTime(currentTime);
    };

    const showDatePiker = () => {
        setShow(true);
    };

    const showTimePiker = () => {
        setShowTime(true);
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

    const sendMessage = (action, lk_gf_ts_id, lk_gf_data_source, lk_gf_id, date, time, lk_gf_fuel_type, lk_gf_fuel_filled_amount, lk_gf_notes) => {
        setSendError('');
        if (lk_gf_fuel_filled_amount === '') {
            showModal('Пожалуйста заполните поле "Литры"!');
        } else {
            dispatch(transportActions.createFillRequest(jwt, action, lk_gf_ts_id, lk_gf_data_source, lk_gf_id, moment(date).format('YYYY-MM-DD'), moment(time).format('HH:MM'),lk_gf_fuel_type, lk_gf_fuel_filled_amount, lk_gf_notes, showModal))
        }
    }

    return (
        <ScrollView style={styles.formContainer}>
            <View style={styles.formInputsContainer}>

                <Title style={{ marginBottom: 8 }}>{`${ts !== null ? ts.lk_ts_reg_number : ''} ${ts !== null ? ts.lk_ts_brand : ''} ${ts !== null ? ts.lk_ts_model : ''}`}</Title>
                <View style={{flexDirection: 'row'}}>
                    <TouchableWithoutFeedback onPress={showDatePiker} style={{width: '50%'}}>
                        <View style={{width: '50%'}}>
                            <Paragraph>{"Дата:"}</Paragraph>
                            <View style={[styles.formInput, { padding: 14, borderWidth: 1, borderRadius: 2, borderColor: 'rgba(0,0,0,0.54)', width: '100%' }]}>
                                <Paragraph style={{ fontSize: 16 }}>{moment(date).format("DD.MM.YYYY")}</Paragraph>
                            </View>
                        </View>
                    </TouchableWithoutFeedback >
                    <TouchableWithoutFeedback onPress={showTimePiker} style={{width: '50%'}}>
                        <View style={{width: '50%'}}>
                            <Paragraph>{"Время:"}</Paragraph>
                            <View style={[styles.formInput, { padding: 14, borderWidth: 1, borderRadius: 2, borderColor: 'rgba(0,0,0,0.54)', width: '100%' }]}>
                                <Paragraph style={{ fontSize: 16 }}>{moment(time).format("HH:MM")}</Paragraph>
                            </View>
                        </View>
                    </TouchableWithoutFeedback >
                </View>
                {show && (
                    <DateTimePicker
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
                {showTime && (
                    <DateTimePicker
                        value={time}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeTime}
                    />
                )}

                <Paragraph>{"Топливо:"}</Paragraph>
                <View style={[styles.formInput, { borderRadius: 2, borderWidth: 1, borderColor: 'rgba(0,0,0,0.54)', }]}>
                    <Picker
                        selectedValue={selectedFuelType}
                        dropdownIconColor={'#000'}
                        prompt="Вид ремонта:"
                        onValueChange={(itemValue, itemIndex) => setSelectedFuelType(itemValue)}
                    >
                        <Picker.Item label={'ДТ'} value={'ДТ'} />
                        <Picker.Item label={'Аи80'} value={'Аи80'} />
                        <Picker.Item label={'Аи92'} value={'Аи92'} />
                        <Picker.Item label={'Аи95'} value={'Аи95'} />
                        <Picker.Item label={'Аи98'} value={'Аи98'} />
                        <Picker.Item label={'Аи100'} value={'Аи100'} />
                        <Picker.Item label={'Пропан'} value={'Пропан'} />
                        <Picker.Item label={'Метан'} value={'Метан'} />
                        <Picker.Item label={'Био'} value={'Био'} />
                    </Picker>
                </View>

                <TextInput
                    mode={'outlined'}
                    label="Литры"
                    keyboardType='numeric'
                    value={liters}
                    style={styles.formInput}
                    onChangeText={text => setLiters(text)}
                />

                <TextInput
                    mode={'outlined'}
                    label="Примечания"
                    value={note}
                    style={styles.formInput}
                    onChangeText={text => setNote(text)}
                />

                <Button style={{ marginBottom: 8 }} mode="contained" loading={create_fill_reqest_loading} onPress={() => sendMessage('add', ts.lk_ts_id, 2, "", date, time, selectedFuelType, liters, note)}>Отправить</Button>
            </View>

            <Portal>
                <Dialog visible={visible} onDismiss={hideModal}>
                    <Dialog.Title>{sendError !== '' ? 'Ошибка' : 'Спасибо'}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{sendError !== '' ? sendError : create_fill_reqest_message}</Paragraph>
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
    const { create_fill_reqest_loading, create_fill_reqest_message, create_fill_reqest_error } = state.transport;
    return {
        jwt,
        user,
        create_fill_reqest_loading,
        create_fill_reqest_message,
        create_fill_reqest_error,
    };
};

const connectedFillsForm = connect(mapStateToProps)(FillsForm)
export { connectedFillsForm as FillsForm };