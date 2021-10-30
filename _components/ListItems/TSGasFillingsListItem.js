import * as React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { styles } from '../../_styles/styles';
import { List, Headline, Caption } from 'react-native-paper';
import moment from 'moment';


export const TSGasFillingsListItem = ({ children, item, }) => {

    return (
        <TouchableOpacity disabled={item.mn_current_status === null} disabled>
            <View style={styles.listitem}>

                <View style={[styles.listitemTop, { borderBottomWidth: item.lk_gf_fuel_type || item.lk_gf_fuel_filled_amount  ? 1 : 0 }]}>
                    <View style={styles.listitemTextFT}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                            <Text style={[styles.listitemTextTitle, { color: '#0F47A5', }]}>{item.lk_ts_reg_number}</Text>
                        </View>
                    </View>
                </View>
                {item.lk_gf_fuel_type || item.lk_gf_fuel_filled_amount ?
                    <View style={styles.listitemCenter}>
                        {item.lk_gf_fuel_type ? <Text style={styles.listitemText}><Text style={styles.listitemTextTitle}>Тип топлива: </Text>{`${item.lk_gf_fuel_type}`}</Text>: null}
                        {item.lk_gf_fuel_filled_amount ? <Text style={styles.listitemText}><Text style={styles.listitemTextTitle}>Литры: </Text>{`${item.lk_gf_fuel_filled_amount} л.`}</Text>: null}
                        {item.lk_gf_notes ? <Text style={styles.listitemText}><Text style={styles.listitemTextTitle}>Примечание: </Text>{item.lk_gf_notes}</Text>: null}
                    </View>
                    : null
                }
                {item.lk_gf_date ?
                    <View style={styles.listitemBottom}>
                        {/* {item.mn_current_status && <Text style={styles.listitemText}><Text style={styles.listitemTextTitle}>Статус заявки: </Text>{item.mn_current_status}</Text>} */}
                        {item.lk_gf_date && <Text style={styles.listitemText}><Text style={styles.listitemTextTitle}>Дата регистрации: </Text>{moment.unix(item.lk_gf_date).format("DD.MM.YYYY hh:mm")}</Text>}
                    </View>
                    : null
                }
            </View>
        </TouchableOpacity>
    );
}
