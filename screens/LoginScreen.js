import React, { useEffect } from 'react';
import { Text, View, TextInput,  } from 'react-native';
import { Button } from 'react-native-paper';
import { connect, useDispatch } from 'react-redux';
import { styles } from '../_styles/styles';
import { userActions } from '../_actions';
import { Error } from '../_components';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({login_error, login_loading, navigation}) => {
  const dispatch = useDispatch();
  const [username, onChangeLogin] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [error, setError] = React.useState('');


  function signin(username, password) {
    if(username !== "" && password !== ""){
      setError("")
      dispatch(userActions.signin(username, password, navigation))
    } else {
      setError("Заполните пожалуйста поля ввода логина и пароля.");
    }
    // navigation.navigate('HomeScreen');
  }
  return (
    <View style={styles.loginContainer}>
      <Icon name="lock" color="#fff" style={styles.loginIcon}/>
      <View style={styles.loginView}>
        {error !== '' ? <Error>{error}</Error> : login_error !== null ? <Error>{login_error}</Error> : null}
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => onChangeLogin(text)}
          value={username}
          placeholder={'Логин'}
          placeholderTextColor={'#999999'}
          textContentType={'username'}
          autoCompleteType={'username'}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => onChangePassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder={'Пароль'}
          placeholderTextColor={'#999999'}
          textContentType={'password'}
          autoCompleteType={'password'}
        />
        <Button
          onPress={() => signin(username, password)}
          mode="contained"
          loading={login_loading}
        >Войти</Button>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  const {login_error, login_loading} = state.authentication
  return {
    login_error,
    login_loading
  };
};

const connectedLoginScreen = connect(mapStateToProps)(LoginScreen)
export {connectedLoginScreen as LoginScreen};
