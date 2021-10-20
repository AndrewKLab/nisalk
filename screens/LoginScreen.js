import React, { useState, useRef, useEffect } from 'react';
import { View, BackHandler } from 'react-native';
import { Button, Paragraph, Text, TextInput, Checkbox } from 'react-native-paper';
import { connect, useDispatch } from 'react-redux';
import { styles } from '../_styles/styles';
import { userActions } from '../_actions';
import { Error } from '../_components';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ login_error, login_loading, navigation }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [username, onChangeLogin] = useState('');
  const [password, onChangePassword] = useState('');
  const [checked, setChecked] = useState(true);
  const [visableInfo, setVisableInfo] = useState(true);
  const [passwordVisable, setPasswordVisable] = useState(true);
  const textInputLogin = useRef(null);
  const textInputPassword = useRef(null);

  function signin(username, password) {
    if (username !== "" && password !== "") {
      setError("")
      dispatch(userActions.signin(username, password, navigation))
    } else {
      setError("Заполните пожалуйста поля ввода логина и пароля.");
    }
    // navigation.navigate('HomeScreen');
  }

  const HideInfo = () => {
    if (textInputLogin.current.isFocused() || textInputPassword.current.isFocused()) {
      setVisableInfo(false)
    } else {
      setVisableInfo(true)
    }
  }
  return (
    <View >
      {visableInfo &&
        <View style={{ backgroundColor: '#fff', height: '20%', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{
            width: '80%',
            borderColor: "#e0e0e0",
            borderWidth: 1,
            borderRadius: 8,

          }}>
            <Paragraph style={{ margin: 8 }}>Для входа в Приложение воспользуйтесть паролем и логином от ЛК</Paragraph>
          </View>
        </View>
      }

      <View style={[styles.loginContainer, { height: visableInfo === true ? '60%' : '100%' }]}>

        <Icon name="lock" color="#fff" style={styles.loginIcon} />
        <View style={styles.loginView}>
          {error !== '' ? <Error>{error}</Error> : login_error !== null ? <Error>{login_error}</Error> : null}
          <View style={{ marginBottom: 8 }}>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={textInputLogin}
                style={styles.textInput}
                mode={"outlined"}
                onChangeText={(text) => onChangeLogin(text)}
                value={username}
                label={'Логин'}
                textContentType={'username'}
                autoCompleteType={checked ? 'username' : 'off'}
                onFocus={() => { HideInfo() }}
                onBlur={() => { HideInfo() }}
                testID="UserName"
              />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                ref={textInputPassword}
                style={styles.textInput}
                mode={"outlined"}
                onChangeText={(text) => onChangePassword(text)}
                value={password}
                secureTextEntry={passwordVisable}
                label={'Пароль'}
                right={<TextInput.Icon name="eye" onPress={() => setPasswordVisable(!passwordVisable)} />}
                textContentType={'password'}
                autoCompleteType={checked ? 'password' : 'off'}
                onFocus={() => { HideInfo() }}
                onBlur={() => { HideInfo() }}
                testID="Password"
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text>Запомнить меня</Text>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
                color="#2f7cfe"
              />
            </View>
          </View>
          <Button onPress={() => signin(username, password)} mode="contained" loading={login_loading}>Войти</Button>
        </View>
      </View>
      {visableInfo &&
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
      }
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
