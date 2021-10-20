import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-paper';
import { styles } from '../../_styles';
import moment from 'moment';

export const ListItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.listitem}>

                <View style={[styles.listitemTop, { borderBottomWidth: item.task_lk_mark || item.task_lk_model || item.task_lk_number ? 1 : 0 }]}>
                    <View style={styles.listitemTextFT}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: "27%" }}>
                            <Text style={[styles.listitemTextTitle, { marginRight: 8, color: '#0F47A5', }]}>№{item.task_lk_id}</Text>
                            <View>
                                <Badge style={styles.badge} visible={item.unread_messages > 0} size={20}>{item.unread_messages}</Badge>
                            </View>
                        </View>
                        <Text style={{ width: '73%', textAlign: 'right' }}>{item.task_lk_name}</Text>
                    </View>
                </View>
                {item.task_lk_mark || item.task_lk_model || item.task_lk_number ?
                    <View style={styles.listitemCenter}>
                        {item.task_lk_number && <Text>{item.task_lk_number}</Text>}
                        {item.task_lk_mark && <Text style={styles.listitemText}><Text >{item.task_lk_mark && item.task_lk_mark} </Text>{item.task_lk_model && item.task_lk_model}</Text>}
                    </View>
                    : null
                }
                {item.task_lk_status || item.task_lk_time_create ?
                <View style={styles.listitemBottom}>
                        {item.task_lk_status && <Text style={styles.listitemText}><Text style={styles.listitemTextTitle}>Статус заявки: </Text>{item.task_lk_status}</Text>}
                        {item.task_lk_time_create && <Text style={styles.listitemText}><Text style={styles.listitemTextTitle}>Дата регистрации: </Text>{moment.unix(item.task_lk_time_create).format("DD.MM.YYYY")}</Text>}
                </View>
                : null
                }
            </View>
        </TouchableOpacity>
    );
}
