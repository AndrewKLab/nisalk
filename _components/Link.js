import React, { useCallback, useState } from "react";
import { TouchableOpacity, Text, Alert, Linking } from "react-native";
import { styles } from "../_styles/styles";
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

export const Link = ({ url, title, style }) => {

    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    const [downloadProgress, setDownloadProgress] = useState(0)

    const downloadFile = async (booksTitle, bookList) => {
        let downloadedBooksCount = 0;
        let path_to_file = `${RNFS.ExternalDirectoryPath}/${title}`;
        if (await RNFS.exists(path_to_file)){
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
        <Text style={[styles.link, style]} onPress={downloadFile} textBreakStrategy={'simple'}>{title.slice(11)}</Text>
    );
}