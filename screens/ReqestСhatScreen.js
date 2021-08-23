import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, Keyboard, FlatList, Image } from 'react-native';
import { TextInput, Text, IconButton, Surface, Badge } from 'react-native-paper';
import { connect } from 'react-redux';
import { styles } from '../_styles/styles';
import { reqestsActions } from '../_actions';
import { Loading, Message } from '../_components';
import EmojiBoard from 'react-native-emoji-board';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';


const ReqestСhatScreen = ({ dispatch, jwt, request_messages, route, user }) => {
  const [show, showEmo] = useState(false);
  const [message, onChangeMessage] = useState('');
  const [numberOfLines, setNumberOfLines] = useState(1);
  const [fileList, setFileList] = useState([]);
  const itemHeights = [];
  const input = useRef(null)
  const messlist = useRef(null);
  const onClick = emoji => {
    onChangeMessage(message + emoji.code)
  };

  const item = request_messages;
  useEffect(() => {
    const o_mess_arr = request_messages.messages.filter(mess => mess.type === "o");
    if (o_mess_arr.length > 0) {
      const o_mess = o_mess_arr[o_mess_arr.length - 1];
      dispatch(reqestsActions.readMessages(jwt, o_mess.type, o_mess.request_id, o_mess.o_id));
    }
  }, []);

  const typeText = (text) => {
    onChangeMessage(text)
    //if(numberOfLines <= 3){setNumberOfLines(numberOfLines + 1)}
  }

  const scrollToIndex = (index) => {
    messlist.current.scrollToIndex({ animated: true, index: index });
  }

  const scrollToLastReadedMessage = () => {
    const o_mess_arr = request_messages.messages.filter(mess => mess.type === "o");
    const o_mess = o_mess_arr[o_mess_arr.length - 1]
    const toMess = request_messages.messages.find(function (element) { if (element.o_id === o_mess.o_id) { return element } else { return false; } })
    dispatch(reqestsActions.readMessages(jwt, o_mess.type, o_mess.request_id, o_mess.o_id))
    messlist.current.scrollToItem({ animated: true, item: toMess })
  }

  const openEmoBoard = () => {
    if (input.current.isFocused()) {
      scrollToIndex(request_messages.messages.length - 1);
      Keyboard.dismiss();
      showEmo(!show);
    } else {
      scrollToIndex(request_messages.messages.length - 1);
      showEmo(!show);
    }
  }

  const sendMessage = () => {
    dispatch(reqestsActions.sendMessage(jwt, message, item.task_lk_id, user, fileList)).then(() => {
      scrollToIndex(request_messages.messages.length - 1)
      onChangeMessage('');
      setFileList([])
    })
  }


  const selectfileList = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      for (const res of results) {
        console.log('selectfileList() : ' + JSON.stringify(res));
      }
      // fileList.map((item, index)=> results.filter(file => item.name === file.name).length !== 0 ? : item)
      // var fl = fileList.length === 0 ? results : fileList.push(results)
      setFileList(results)
    }
    catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled from multiple doc picker');
      }
      else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  const dellFileFromfilelist = (file) => {
    const nfl = fileList.filter(item => item.uri !== file.uri);
    console.log(file.name, nfl)
    setFileList(nfl)
  }

  const renderItem = ({ item, index }) => {
    return <Message index={index} item={item} onLayout={object => itemHeights[index] = object.nativeEvent.layout.height} />
  }


  const getItemLayout = (data, index) => {
    return { length: 100, offset: 100 * index, index }
  }



  return (
    <SafeAreaView style={{ flexDirection: "column", flex: 1, }}>
      <View style={[styles.listitemChat]}>
        <View style={[styles.listitemTop, { borderBottomWidth: item.task_lk_mark || item.task_lk_model || item.task_lk_number ? 1 : 0 }]}>
          <View style={styles.listitemTextFT}>
            <Text style={[styles.listitemTextTitle, {width: '17%'}]}>№{item.task_lk_id} </Text>
            <Text style={[{width: '83%', textAlign: 'right'}]}>{item.task_lk_name}</Text>
          </View>
        </View>
        {item.task_lk_mark || item.task_lk_model || item.task_lk_number ?
          <View style={styles.listitemCenter}>
            {item.task_lk_mark && <View style={styles.listitemText}><Text style={styles.listitemTextTitle}>Марка: </Text><Text style={{ color: '#020202' }}>{item.task_lk_mark} </Text></View>}
            {item.task_lk_model && <View style={styles.listitemText}><Text style={styles.listitemTextTitle}>Модель: </Text><Text style={{ color: '#020202' }}>{item.task_lk_model} </Text></View>}
            {item.task_lk_number && <View style={styles.listitemText}><Text style={styles.listitemTextTitle}>Номер: </Text><Text style={{ color: '#020202' }}>{item.task_lk_number}</Text></View>}
          </View>
          : null
        }
        {item.task_lk_status && <View style={styles.listitemBottom}><Text style={styles.listitemText}><Text style={styles.listitemTextTitle}>Статус заявки: </Text>{item.task_lk_status}</Text></View>}
      </View>

      <View style={{ justifyContent: 'space-between', flex: 1 }}>

        <FlatList
          ref={messlist}
          data={request_messages.messages}
          initialScrollIndex={request_messages.messages.length - 1}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          keyExtractor={(item, index) => index}
        />
        {/* {request_messages.unread_messages > 0 &&
          <View>
            <IconButton
              style={styles.fab}
              icon="chevron-down"
              size={28}
              onPress={() => scrollToLastReadedMessage()}
            />
            <Badge style={styles.fabbadge} visible={request_messages.unread_messages > 0} size={20}>{request_messages.unread_messages}</Badge>
          </View>
        } */}
        {fileList.length > 0 &&
          <View style={styles.filesBoard}>
            <FlatList
              data={fileList}
              horizontal
              renderItem={({ item, index }) => (
                <Surface style={styles.filesBoardItem} key={index}>
                  <IconButton
                    icon="close"
                    size={15}
                    style={styles.filesBoardDellFileButton}
                    onPress={() => dellFileFromfilelist(item)}
                  />
                  <Icon name="file" color="gray" size={25} />
                  <Text>{item.name.length > 4 ? "..." + item.name.substr(item.name.length - 8) : item.name}</Text>
                </Surface>
              )}
              keyExtractor={(item, index) => index}
            />

          </View>
        }
        <View style={styles.chatInputContainer}>
          <IconButton
            icon="paperclip"
            size={20}
            onPress={() => selectfileList()}
          />
          <TextInput
            ref={input}
            style={[styles.chatInput, numberOfLines < 2 && { height: 40 }]}
            mode={'flat'}
            onChangeText={(text) => typeText(text)}
            value={message}
            placeholder={'Ваше сообщение'}
            underlineColor={'f7f7f9'}
            multiline={false}
            dense={true}
            onFocus={() => {
              scrollToIndex(request_messages.messages.length - 1);
              showEmo(false)
            }}
            numberOfLines={numberOfLines}
          />
          <IconButton
            icon="emoticon-outline"
            size={20}
            onPress={() => openEmoBoard()}
          />
          <IconButton
            icon="send"
            size={20}
            onPress={() => sendMessage()}
          />

        </View>
        <View style={{ height: show === false ? 0 : 'auto' }}>
          <EmojiBoard containerStyle={{ position: 'relative' }} showBoard={show} onClick={onClick} />
        </View>

      </View>

    </SafeAreaView >
  );
}

const mapStateToProps = (state) => {
  const { jwt, user } = state.authentication;
  const { request_messages } = state.requests;
  return {
    jwt,
    user,
    request_messages,
  };
};

const connectedReqestСhatScreen = connect(mapStateToProps)(ReqestСhatScreen)
export { connectedReqestСhatScreen as ReqestСhatScreen };
