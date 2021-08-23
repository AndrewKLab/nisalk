import React, { useCallback, useState } from "react";
import { View, Alert, Text } from "react-native";
import { Surface } from 'react-native-paper';
import { styles } from "../_styles/styles";
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import Icon from 'react-native-vector-icons/FontAwesome';

export const File = ({ url, title, style, mb }) => {

    const [downloadProgress, setDownloadProgress] = useState(0)

    const downloadFile = async (booksTitle, bookList) => {
        let downloadedBooksCount = 0;
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
            console.log("BLAH DOES NOT EXIST");
        }

        let result = await RNFS.downloadFile({
            fromUrl: url,
            toFile: path_to_file,
            discretionary: true,
            progressDivider: 100,
            progressInterval: 100,
            begin: (res) => {
                console.log(`${url} ${RNFS.ExternalDirectoryPath}/${title}`)
                downloadedBooksCount += 1;
                console.log(`${downloadedBooksCount}. Kayıt İndirilmeye Başlandı`)
            },
            // progress: (res) => {
            //   const downloadPercent = ((((res.bytesWritten / 1000) * 100) / book.filesizeKB))
            //   console.log(downloadPercent)
            //   setDownloadProgress(downloadPercent > 100 ? 100 : downloadPercent);
            // }
        }).promise;
        console.log(result.statusCode)
        setDownloadProgress((downloadedBooksCount) * 100);


        // if (downloadedBooksCount == booksCount) {
        //     console.log("İndirme Tamamlanı")
        // }

    }



    return (
        <Surface style={[styles.file, {marginBottom: mb}]} >
            <Icon name="file" style={styles.fileIcon} />
            <Text style={[styles.fileText, style]} onPress={downloadFile} textBreakStrategy={'simple'}>

                {title.slice(11)}
            </Text>
        </Surface>
    );
}