import * as React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { styles } from '../../_styles/styles';
import { List, Headline, Caption } from 'react-native-paper';
import moment from 'moment';


export const TSRepairingListItem = ({ children, item, }) => {

    const malfunctionType = (mn_malfunction_id) => {
        switch (mn_malfunction_id) {
            case '1':
                return 'Рулевое управление'
            case '2':
                return 'Ходовая часть'
            case '3':
                return 'Тормозная система'
            case '4':
                return 'Электрооборудование'
            case '5':
                return 'Прочее'
            default:
                return 'Рулевое управление'
        }
    }

    return (
        <TouchableOpacity>
            <View style={styles.listitem}>

                <View style={[styles.listitemTop, { borderBottomWidth: item.mn_vid_rep || item.mn_kilometrage || item.mn_runing_time || item.mn_notes ? 1 : 0 }]}>
                    <View style={styles.listitemTextFT}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                            <Text style={[styles.listitemTextTitle, { color: '#0F47A5', }]}>{item.lk_ts_reg_number}</Text>
                            <Text style={[styles.listitemTextTitle]}>{malfunctionType(item.mn_malfunction_id)}</Text>
                        </View>
                    </View>
                </View>
                {item.mn_vid_rep || item.mn_kilometrage || item.mn_runing_time || item.mn_notes ?
                    <View style={styles.listitemCenter}>
                        {item.mn_vid_rep ? <Text>{item.mn_vid_rep === 1 ? 'Отложенный ремонт' : 'Срочный ремонт'}</Text> : null}
                        {item.mn_kilometrage ? <Text style={styles.listitemText}><Text style={styles.listitemTextTitle}>Пробег: </Text>{`${item.mn_kilometrage} км.`}</Text>: null}
                        {item.mn_runing_time ? <Text style={styles.listitemText}><Text style={styles.listitemTextTitle}>Наработка: </Text>{`${item.mn_runing_time} м.ч.`}</Text>: null}
                        {item.mn_notes ? <Text style={styles.listitemText}><Text style={styles.listitemTextTitle}>Примечание: </Text>{item.mn_notes}</Text>: null}
                    </View>
                    : null
                }
                {item.mn_current_status || item.mn_date ?
                    <View style={styles.listitemBottom}>
                        {item.mn_current_status && <Text style={styles.listitemText}><Text style={styles.listitemTextTitle}>Статус заявки: </Text>{item.mn_current_status}</Text>}
                        {item.mn_date && <Text style={styles.listitemText}><Text style={styles.listitemTextTitle}>Дата регистрации: </Text>{moment.unix(item.mn_date).format("DD.MM.YYYY")}</Text>}
                    </View>
                    : null
                }
            </View>
        </TouchableOpacity>
    );
}
