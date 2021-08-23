import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-paper';
import { styles } from '../_styles/styles';


export const ListItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.listitem}>

                <View style={[styles.listitemTop, { borderBottomWidth: item.task_lk_mark || item.task_lk_model || item.task_lk_number ? 1 : 0 }]}>
                    <View style={styles.listitemTextFT}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: "27%" }}>
                            <Text style={[styles.listitemTextTitle, { marginRight: 8 }]}>№{item.task_lk_id}</Text>
                            <View>
                                <Badge style={styles.badge} visible={item.unread_messages > 0} size={20}>{item.unread_messages}</Badge>
                            </View>
                        </View>
                        <Text style={{ width: '73%', textAlign: 'right' }}>{item.task_lk_name}</Text>
                    </View>
                </View>
                {item.task_lk_mark || item.task_lk_model || item.task_lk_number ?
                    <View style={styles.listitemCenter}>
                        {item.task_lk_mark && <View style={styles.listitemText}><Text style={styles.listitemTextTitle}>Марка: </Text><Text>{item.task_lk_mark} </Text></View>}
                        {item.task_lk_model && <View style={styles.listitemText}><Text style={styles.listitemTextTitle}>Модель: </Text><Text>{item.task_lk_model} </Text></View>}
                        {item.task_lk_number && <View style={styles.listitemText}><Text style={styles.listitemTextTitle}>Номер: </Text><Text>{item.task_lk_number}</Text></View>}
                    </View>
                    : null
                }
                {item.task_lk_status && <View style={styles.listitemBottom}><Text style={styles.listitemText}><Text style={styles.listitemTextTitle}>Статус заявки: </Text>{item.task_lk_status}</Text></View>}
            </View>
        </TouchableOpacity>
    );
}
