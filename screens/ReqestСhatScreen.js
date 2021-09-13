import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, Keyboard, FlatList } from 'react-native';
import { Text, IconButton, Surface, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { styles } from '../_styles/styles';
import { reqestsActions } from '../_actions';
import { Loading, Alert, Message } from '../_components';
import EmojiBoard from 'react-native-emoji-board';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';


const ReqestСhatScreen = ({ dispatch, route, user, jwt, request_messages, request_messages_loading, request_messages_error, request_messages_is_end }) => {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [show, showEmo] = useState(false);
  const [message, onChangeMessage] = useState('');
  const [fileList, setFileList] = useState([]);
  const input = useRef(null)
  const messlist = useRef(null);


  const { task_lk_id } = route.params;

  useEffect(() => {
    dispatch(reqestsActions.getReuestMessages(jwt, task_lk_id, offset, limit)).then(() => {
      setLoading(false);
      setOffset(offset + limit);
    })
  }, []);

  //При положении скрола меньше 50 сделай lazy load следующих сообщений
  const onScrollMessages = (e) => {
    if (e.nativeEvent.contentOffset.y < 50 && loadingMore === false && !request_messages_is_end) {
      setLoadingMore(true);
      dispatch(reqestsActions.getMoreReuestMessages(jwt, task_lk_id, offset, limit)).then(() => {
        setLoadingMore(false);
        setOffset(offset + limit);
      })
    }
  }

  //Открыть борд с эмоциями
  const openEmoBoard = () => {
    if (input.current.isFocused()) Keyboard.dismiss();
    scrollToBottom();
    showEmo(!show);
  }

  //Отправить сообщение
  const sendMessage = () => {
    dispatch(reqestsActions.sendMessage(jwt, message, request_messages.task_lk_id, user, fileList)).then(() => {
      onChangeMessage('');
      setFileList([])
    })
  }

  //Выбрать фаил из файловой системы
  const selectfileList = async () => {
    try {
      const selectedFiles = await DocumentPicker.pickMultiple({ type: [DocumentPicker.types.allFiles] });
      setFileList(selectedFiles)
    }
    catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled from multiple doc picker', err);
      }
      else {
        console.log('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  //Удалить фаил из списка выбранных файлов 
  const dellFileFromfilelist = (file) => {
    const nfl = fileList.filter(item => item.uri !== file.uri);
    setFileList(nfl)
  }

  //Скролл в низ списка сообщений
  const scrollToBottom = () => { messlist.current.scrollToIndex({ animated: true, index: 0 }) }

  if (loading || request_messages_loading) return <Loading />
  if (request_messages_error !== null) return <Alert message={request_messages_error} />

  return (
    <SafeAreaView style={{ flexDirection: "column", flex: 1, }}>
      <View style={[styles.listitemChat]}>
        <View style={[styles.listitemTop, { borderBottomWidth: request_messages.task_lk_mark || request_messages.task_lk_model || request_messages.task_lk_number ? 1 : 0 }]}>
          <View style={styles.listitemTextFT}>
            <Text style={[styles.listitemTextTitle, { width: '17%' }]}>№{request_messages.task_lk_id} </Text>
            <Text style={[{ width: '83%', textAlign: 'right' }]}>{request_messages.task_lk_name}</Text>
          </View>
        </View>
        {request_messages.task_lk_mark || request_messages.task_lk_model || request_messages.task_lk_number ?
          <View style={styles.listitemCenter}>
            {request_messages.task_lk_number && <Text>{request_messages.task_lk_number}</Text>}
            {request_messages.task_lk_mark && <Text style={styles.listitemText}><Text >{request_messages.task_lk_mark && request_messages.task_lk_mark} </Text>{request_messages.task_lk_model && request_messages.task_lk_model}</Text>}
          </View>
          : null
        }
        {request_messages.task_lk_status || request_messages.task_lk_time_create ?
          <View style={styles.listitemBottom}>
            {request_messages.task_lk_status && <Text style={styles.listitemText}><Text style={styles.listitemTextTitle}>Статус заявки: </Text>{request_messages.task_lk_status}</Text>}
            {request_messages.task_lk_time_create && <Text style={styles.listitemText}><Text style={styles.listitemTextTitle}>Дата регистрации: </Text>{moment.unix(request_messages.task_lk_time_create).format("DD.MM.YYYY")}</Text>}
          </View>
          : null
        }
      </View>

      <View style={{ justifyContent: 'space-between', flex: 1 }}>

        <FlatList
          ref={messlist}
          inverted
          ListFooterComponent={loadingMore && <Loading style={{ backgroundColor: '#f2f2f2', height: 50 }} />}
          data={request_messages.messages}
          renderItem={({ item, index }) => <Message index={index} item={item} />}
          onScroll={(e) => onScrollMessages(e)}
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
          <View style={{ flex: 1 }}>
            <TextInput
              ref={input}
              multiline
              style={[styles.chatInput], { maxHeight: 120, }}
              mode={'flat'}
              onChangeText={(text) => onChangeMessage(text)}
              value={message}
              placeholder={'Ваше сообщение'}
              underlineColor={'f7f7f9'}
              dense={true}
              onFocus={() => {
                scrollToBottom();
                showEmo(false)
              }}
            />
          </View>
          <IconButton
            icon="emoticon-outline"
            size={20}
            onPress={() => openEmoBoard()}
          />
          <IconButton
            icon="send"
            size={20}
            disabled={message === ""}
            onPress={() => sendMessage()}
          />

        </View>
        <View style={{ height: show === false ? 0 : 'auto' }}>
          <EmojiBoard containerStyle={{ position: 'relative' }} showBoard={show} onClick={emoji => onChangeMessage(message + emoji.code)} />
        </View>

      </View>

    </SafeAreaView >
  );
}

const mapStateToProps = (state) => {
  const { jwt, user } = state.authentication;
  const { request_messages, request_messages_loading, request_messages_error, request_messages_is_end } = state.requests;
  return {
    jwt,
    user,
    request_messages,
    request_messages_loading,
    request_messages_error,
    request_messages_is_end
  };
};

const connectedReqestСhatScreen = connect(mapStateToProps)(ReqestСhatScreen)
export { connectedReqestСhatScreen as ReqestСhatScreen };
