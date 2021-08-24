import * as React from 'react';
import { StyleSheet } from 'react-native';
import { red100 } from 'react-native-paper/lib/typescript/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textInput: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 5,
    borderColor: 'rgb(197, 197, 197)',
    borderWidth: 0.5,
    width: '100%',
    height: 50,
    padding: 8,
    marginBottom: 12,
    color: '#020202',
  },

  button: {
    backgroundColor: 'blue',
    color: '#fff',
    margin: 5,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  //Error
  error: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: 'rgb(253, 236, 234)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginVertical: 8
  },

  errorIcon: {
    marginRight: 12
  },

  errorText: {
    color: 'rgb(97, 26, 21)',
    paddingVertical: 8
  },

  //Error
  alert: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  alertIcon: {
    marginRight: 12
  },

  alertText: {
    color: 'rgb(97, 26, 21)',
    paddingVertical: 8
  },

  //LoginPage
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'rgb(255, 255, 255)',
  },

  loginView: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    maxWidth: 400
  },

  loginIcon: {
    backgroundColor: '#2f7cfe',
    borderRadius: 32,
    paddingVertical: 6,
    paddingHorizontal: 16,
    fontSize: 50,
    overflow: 'hidden',
  },

  //LoginPage
  listitem: {
    marginHorizontal: 8,
    marginVertical: 5,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 8
  },
  listitemTop: {
    padding: 8,
    borderColor: "#e0e0e0",
  },
  listitemTextFT: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },

  listitemCenter: {
    padding: 8,
    paddingVertical: 8,
  },

  listitemText: {
    flexDirection: "row",
    color: '#020202',
  },

  listitemTextTitle: {
    fontWeight: 'bold',
    color: '#020202',
  },

  listitemBottom: {
    padding: 8,
    borderColor: "#e0e0e0",
    borderTopWidth: 1,
  },

  listitemChat: {
    borderColor: "#e0e0e0",
    backgroundColor: "#f7f7f9",
    borderBottomWidth: 1,
    elevation: 4
  },

  //Message
  message: {
    marginHorizontal: 8,
    marginVertical: 4,
    
  },

  messageLeft: {
    alignItems: 'flex-start',
  },

  messageRight: {
    alignItems: 'flex-end',
  },

  messageText: {
    width: "auto",
    padding: 8,
    maxWidth: "70%",

  },


  messageTextLeft: {
    backgroundColor: '#e4e3e9',
    borderRadius: 8,
    borderBottomLeftRadius: 0,
  },

  messageTextRight: {
    backgroundColor: '#047ffe',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },

  messageTextColorLeft: {
    color: '#020202',
  },

  messageTextColorRight: {
    color: '#fff',
  },

  messageUserDatatime: {
    flexDirection: 'row',
    marginBottom: 2,
  },

  messagUserName: {
    fontSize: 10,
    color: '#878787',
    fontWeight: 'bold'
  },

  messageDataTime: {
    color: '#878787',
    fontSize: 10,
  },

  //Link
  link: {
    flexShrink: 1
  },

  fileLeft: {
    color: '#574A97'
  },

  fileRight: {
    color: '#020202'
  },

  //chatInput
  chatInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f9',
    alignItems: 'flex-end',
    padding: 5
  },
  chatInput: {
    flex: 1,
    borderRadius: 0,
  },

  //Badge
  badge: {
    backgroundColor: '#2f7cfe',
    lineHeight: 14,
    },

  fabbadge: {
    position: 'absolute',
    margin: 16,
    right: 11,
    bottom: 30,
    backgroundColor: '#2f7cfe',
  },

  //FAB
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e4e3e9',
  },

  //filesBoard
  filesBoard: {
    flexDirection: 'row',
    borderColor: 'rgb(197, 197, 197)',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    backgroundColor: '#f7f7f9',
  },

  filesBoardItem: {
    margin: 14,
    marginHorizontal: 7,
    padding: 10,
    elevation: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },

  filesBoardDellFileButton:{
    backgroundColor: '#fff',
    position: 'absolute',
    elevation: 1,
    right: -12,
    top: -12
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },

//File

file: {
  backgroundColor: '#fff',
  flexDirection: 'row',
minWidth: 80,
  padding: 8,
  borderRadius: 8
},

  fileIcon:{
    fontSize: 32,
  },

  fileText:{
 marginHorizontal: 8,
 flexShrink: 1,
 fontSize: 10
  }


});

