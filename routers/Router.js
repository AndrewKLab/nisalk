import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect, useDispatch } from 'react-redux';
import { userActions } from '../_actions';
import { HeaderRight } from '../_components';
import AsyncStorage from '@react-native-async-storage/async-storage';


//screens
import { LoginScreen, ReqestsScreen, ReqestСhatScreen, Appeals, TS } from '../screens';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MainStackNavigator = createStackNavigator();
export const MainNavigator = ({ }) => {
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



  return (
    <NavigationContainer>
      <MainStackNavigator.Navigator initialRouteName={initialRouteName}>
        <MainStackNavigator.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <MainStackNavigator.Screen
          options={{ headerShown: false }}
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
      </MainStackNavigator.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();
const BottomTabNavigator = ({ dispatch }) => {
  return (
    <Tab.Navigator
      initialRouteName="MyTasks"
      tabBarOptions={{
        activeTintColor: '#2f7cfe',
      }}
    >
      <Tab.Screen
        name="Appeals"
        component={connectedAppealsNavigator}
        options={{
          tabBarLabel: 'Обращения',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="pen" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MyTasks"
        component={connectedMyTasks}
        options={{
          tabBarLabel: 'Мои заявки',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="car" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="TS"
        component={connectedTSNavigator}
        options={{
          tabBarLabel: 'ТС',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={26} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}

const AppealsStackNavigator = createStackNavigator();
const AppealsNavigator = ({ }) => {
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
    <AppealsStackNavigator.Navigator initialRouteName={'Reqests'} screenOptions={({ navigation, route }) => screenOptions(navigation, route)}>
      <AppealsStackNavigator.Screen
        options={({ navigation, route }) => ({ title: 'НИСА lk', headerLeft: () => null, })}
        name="AppealsScreen"
        component={Appeals}
      />
    </AppealsStackNavigator.Navigator>
  );
}

const AppealsMapStateToProps = (state) => {
  return {
    jwt: state.authentication.jwt,
  };
};
const connectedAppealsNavigator = connect(AppealsMapStateToProps)(AppealsNavigator);




const MyTasksStackNavigator = createStackNavigator();
const MyTasks = ({ }) => {
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
    <MyTasksStackNavigator.Navigator initialRouteName={'Reqests'} screenOptions={({ navigation, route }) => screenOptions(navigation, route)}>
      <MyTasksStackNavigator.Screen
        options={({ navigation, route }) => ({ title: 'НИСА lk', headerLeft: () => null, })}
        name="Reqests"
        component={ReqestsScreen}
      />
      <MyTasksStackNavigator.Screen
        options={({ navigation, route }) => ({ title: `Заявка №${route.params.request}` })}
        name="ReqestСhat"
        component={ReqestСhatScreen}
      />
    </MyTasksStackNavigator.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    jwt: state.authentication.jwt,
  };
};
const connectedMyTasks = connect(mapStateToProps)(MyTasks);


const TSStackNavigator = createStackNavigator();
const TSNavigator = ({ }) => {
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
    <TSStackNavigator.Navigator initialRouteName={'Reqests'} screenOptions={({ navigation, route }) => screenOptions(navigation, route)}>
      <TSStackNavigator.Screen
        options={({ navigation, route }) => ({ title: 'НИСА lk', headerLeft: () => null, })}
        name="TSScreen"
        component={TS}
      />
    </TSStackNavigator.Navigator>
  );
}

const TSMapStateToProps = (state) => {
  return {
    jwt: state.authentication.jwt,
  };
};
const connectedTSNavigator = connect(TSMapStateToProps)(TSNavigator);
