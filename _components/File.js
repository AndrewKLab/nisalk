import React, { useEffect, useState } from "react";
import { View, Alert, Text, TouchableOpacity } from "react-native";
import { Surface, ProgressBar } from 'react-native-paper';
import { styles } from "../_styles/styles";
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import Icon from 'react-native-vector-icons/FontAwesome';

export const File = ({ url, title, style, mb, index, files }) => {


    const [downloadProgress, setDownloadProgress] = useState(0);
    const [isDownloaded, setIsDownloaded] = useState(false);

    useEffect(() => {
        existsFile();
    }, []);

    const existsFile = async () => {
         if(await RNFS.exists(`${RNFS.ExternalDirectoryPath}/${title}`)){
            setIsDownloaded(true);
         }
    }

    const downloadFile = async () => {
        let downloadedFilesCount = 0;
        const filesCount = files.length;
        let path_to_file = `${RNFS.ExternalDirectoryPath}/${title}`;


        if (await RNFS.exists(path_to_file)) {
            FileViewer.open(`file:///${RNFS.ExternalDirectoryPath}/${title}`)
                .then(() => {
                    // success
                })
                .catch(error => {
                    // error
                });

        } else {
            var fileSizeKB = 0;
            let result = await RNFS.downloadFile({
                fromUrl: url,
                toFile: path_to_file,
                discretionary: true,
                progressDivider: 100,
                progressInterval: 100,
                begin: (res) => {
                    fileSizeKB = res.contentLength / 1024;
                    downloadedFilesCount += 1;
                    console.log(`${downloadedFilesCount}. Kayıt İndirilmeye Başlandı`)
                },
                progress: (res) => {
                  const downloadPercent = ((((res.bytesWritten / 1024) * 100) / fileSizeKB))
                  console.log(downloadPercent / 100)
                  setDownloadProgress(downloadPercent > 100 ? 100 : downloadPercent / 100);
             }
            }).promise;
            setDownloadProgress((downloadedFilesCount) * 100);
            setIsDownloaded(true);
        }

        // if (downloadedBooksCount == booksCount) {
        //     console.log("İndirme Tamamlanı")
        // }

    }

    return (
        <TouchableOpacity key={index} style={[styles.file, { marginBottom: mb, backgroundColor: isDownloaded ? '#8CB7FF' : "#FFFFFF" }]} onPress={downloadFile}>
            <Icon name="file" style={styles.fileIcon} color={'#020202'} />
            <Text style={[styles.fileText, style]} textBreakStrategy={'simple'}>
                {title.slice(11)}
            </Text>
            {downloadProgress !== 0 && downloadProgress !== 100 && <View opacity={0.9} style={[styles.file, {
                position: 'absolute', top: 8, right: 4, left: 4, bottom: 8, alignItems: 'center', alignSelf: 'center',
                height: '100%',
                backgroundColor: '#e4e3e9'
            }]}>
                <ProgressBar style={{ minWidth: '100%' }} progress={downloadProgress} color={'#000'} />
            </View>}
        </TouchableOpacity>

    );
}