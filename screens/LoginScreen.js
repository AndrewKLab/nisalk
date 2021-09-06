import React, { useEffect } from 'react';
import { View, TextInput, } from 'react-native';
import { Button, Paragraph, Text } from 'react-native-paper';
import { connect, useDispatch } from 'react-redux';
import { styles } from '../_styles/styles';
import { userActions } from '../_actions';
import { Error } from '../_components';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ login_error, login_loading, navigation }) => {
  const dispatch = useDispatch();
  const [username, onChangeLogin] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [error, setError] = React.useState('');


  function signin(username, password) {
    if (username !== "" && password !== "") {
      setError("")
      dispatch(userActions.signin(username, password, navigation))
    } else {
      setError("Заполните пожалуйста поля ввода логина и пароля.");
    }
    // navigation.navigate('HomeScreen');
  }
  return (
    <View >
      <View style={{ backgroundColor: '#fff', height: '20%', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
          width: '80%',
          borderColor: "#e0e0e0",
          borderWidth: 1,
          borderRadius: 8,

        }}>
          <Paragraph style={{margin: 8}}>Для входа в Приложение воспользуйтесть паролем и логином от ЛК</Paragraph>
        </View>
      </View>
      <View style={[styles.loginContainer, { height: '60%' }]}>

        <Icon name="lock" color="#fff" style={styles.loginIcon} />
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
      <View style={{ backgroundColor: '#fff', height: '20%', alignItems: 'center', }}>
        <View style={{
          width: '80%',
          borderColor: "#e0e0e0",
          borderWidth: 1,
          borderRadius: 8,
          padding: 8,

        }}>
          <Paragraph>для регистрации в приложении оставьте запрос</Paragraph>
          <Text dataDetectorType={'phoneNumber'}>+79960023821</Text>
          <Paragraph>Viber, WhatsApp, Telegram</Paragraph>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  const { login_error, login_loading } = state.authentication
  return {
    login_error,
    login_loading
  };
};

const connectedLoginScreen = connect(mapStateToProps)(LoginScreen)
export { connectedLoginScreen as LoginScreen };
