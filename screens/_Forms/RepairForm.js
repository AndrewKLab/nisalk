import React, {useState } from 'react';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { transportActions } from '../../_actions';
import { connect } from 'react-redux';
import { Button, Title, TextInput, Dialog, Portal, Paragraph } from 'react-native-paper';
import { styles } from '../../_styles/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';




const RepairForm = ({ dispatch, navigation, jwt, route, create_repair_reqest_loading, create_repair_reqest_error, create_repair_reqest_message }) => {
    const { ts } = route.params;

    const [visible, setVisible] = useState(false);

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

                <Title style={{ marginBottom: 8 }}>{`${ts !== null ? ts.lk_ts_reg_number : ''} ${ts !== null ? ts.lk_ts_brand : ''} ${ts !== null ? ts.lk_ts_model : ''}`}</Title>
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

                <Button style={{ marginBottom: 8 }} mode="contained" loading={create_repair_reqest_loading} onPress={() => sendMessage(date, selectedRepairType, selectedMalfunctionType, mileage, operating, note, ts)}>Отправить</Button>
            </View>

            <Portal>
                <Dialog visible={visible} onDismiss={hideModal}>
                    <Dialog.Title>{sendError !== '' ? 'Ошибка' : 'Спасибо'}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{sendError !== '' ? sendError : 'Ваша заявка на ремонт была отправлена!'}</Paragraph>
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
    const { create_repair_reqest_loading, create_repair_reqest_error, create_repair_reqest_message } = state.transport;
    return {
        jwt,
        user,
        create_repair_reqest_loading,
        create_repair_reqest_error,
        create_repair_reqest_message
    };
};

const connectedRepairForm = connect(mapStateToProps)(RepairForm)
export { connectedRepairForm as RepairForm };