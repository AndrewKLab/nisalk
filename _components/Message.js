import React, { useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../_styles/styles';
import { Link, File } from '../_components';
import moment from 'moment';
import { configApi } from '../_services';
import RNFS from 'react-native-fs';

export function Message({ item, index, onLayout }) {
    const listComponent = useMemo(() => {
        var files = item.files !== null && files !== undefined ? item.files.split(',') : null;
        return (
            <View style={[styles.message, item.type !== "i" ? styles.messageLeft : styles.messageRight]} key={index} onLayout={onLayout}>
                <View style={styles.messageUserDatatime}><Text style={styles.messagUserName}>{`${item.lastname} ${item.firstname} ${item.middlename}`}</Text><Text style={styles.messageDataTime}>{` ${moment.unix(item.time).format("DD.MM.YYYY HH:mm:ss")}`}</Text></View>
                <View style={[styles.messageText, item.type !== "i" ? styles.messageTextLeft : styles.messageTextRight]}>
                    {item.message !== null ? <Text style={item.type !== "i" ? styles.messageTextColorLeft : styles.messageTextColorRight}>{item.message}</Text> : null}
                    {files !== null && files !== undefined ? files.map((itm, inx) => <File index={inx} files={files} style={item.type !== "i" ? styles.fileLeft : styles.fileRight} mb={files.length  === inx + 1 ? 0 : 8} title={itm} url={`${configApi.apiUrl.slice(0, -4)}/storage/${itm}`} />) : null}
                </View>
            </View>
        );
    }, [item]);

    return listComponent;
}
