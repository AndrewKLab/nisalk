import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect, useDispatch } from 'react-redux';
import { userActions } from './_actions';
import { HeaderRight } from './_components';
import AsyncStorage from '@react-native-async-storage/async-storage';

//screens
import { LoginScreen, ReqestsScreen, ReqestСhatScreen } from './screens';

const Stack = createStackNavigator();
const Router = ({ }) => {
  const dispatch = useDispatch();
  const [initialRouteName, setInitialRouteName] = useState("");

  useEffect(() => {
    AsyncStorage.getItem('user').then((result) => {
      dispatch(userActions.setInit(result))
      if (result === null) {
        setInitialRouteName("Login")
      } else {
        dispatch(userActions.validateToken(result, null, true, setInitialRouteName))
      }
    });
  }, []);

  if (initialRouteName === "") { return null }

  const screenOptions = (navigation, route) => {
    return {
      headerRight: () => <HeaderRight navigation={navigation} />,
      headerStyle: {
        backgroundColor: '#2f7cfe',
      },
      headerTintColor: '#ffffff'
    };
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={({ navigation, route }) => screenOptions(navigation, route)}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={({ navigation, route }) => ({ title: 'НИСА lk', headerLeft: ()=> null, })}
          name="Reqests"
          component={ReqestsScreen}
        />
        <Stack.Screen
          options={({ navigation, route }) => ({ title: `Заявка №${route.params.request}` })}
          name="ReqestСhat"
          component={ReqestСhatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const mapStateToProps = (state) => {
  return {
    jwt: state.authentication.jwt,
  };
};

export default connect(mapStateToProps)(Router);
