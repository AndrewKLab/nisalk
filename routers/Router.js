import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect, useDispatch } from 'react-redux';
import { userActions } from '../_actions';
import { HeaderRight } from '../_components';
import AsyncStorage from '@react-native-async-storage/async-storage';


//screens
import { 
  LoginScreen, 
  
  //Reqests
  ReqestsScreen, 
  ReqestСhatScreen, 
  
  //Appeals
  Appeals, 

  //TS
  TS, 
  TSItem,

  //TSRepairing
  TSRepairing,

  //forms
  TSForm,
  RepairForm,
  FeedbackForm,
} from '../screens';

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
          options={{ headerShown: false, gesturesEnabled: false }}
          name="Login"
          component={LoginScreen}
        />
        <MainStackNavigator.Screen
          options={({ navigation, route }) => ({ headerShown: false, gesturesEnabled: false, })}
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
      </MainStackNavigator.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();
const BottomTabNavigator = ({ dispatch, route, navigation }) => {

  return (
    <Tab.Navigator
      initialRouteName={route.params !== undefined ? route.params.screen : "MyTasks"}
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: 'rgba(255, 255, 255, 0.54)',
        tabStyle: { backgroundColor: '#2f7cfe' },

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
            <MaterialCommunityIcons name="chat" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="TS"
        component={connectedTSNavigator}
        options={{
          tabBarLabel: 'ТС',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="car" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="TSRepair"
        component={connectedTSRepairNavigator}
        options={{
          tabBarLabel: 'Ремонт',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="car-cog" color={color} size={26} />
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
    <AppealsStackNavigator.Navigator initialRouteName={'AppealsScreen'} screenOptions={({ navigation, route }) => screenOptions(navigation, route)}>
      <AppealsStackNavigator.Screen
        options={({ navigation, route }) => ({ title: 'НИСА lk', headerLeft: () => null, })}
        name="AppealsScreen"
        component={Appeals}
      />
      <TSStackNavigator.Screen
        options={({ navigation, route }) => ({ title: route.params.title })}
        name="TSFormScreen"
        component={TSForm}
      />
      <TSStackNavigator.Screen
        options={({ navigation, route }) => ({ title: route.params.title })}
        name="FeedbackFormScreen"
        component={FeedbackForm}
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
        options={({ navigation, route }) => ({ title: `Заявка №${route.params.task_lk_id}` })}
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
    <TSStackNavigator.Navigator initialRouteName={'TSScreen'} screenOptions={({ navigation, route }) => screenOptions(navigation, route)}>
      <TSStackNavigator.Screen
        options={({ navigation, route }) => ({ title: 'НИСА lk', headerLeft: () => null })}
        initialParams={{ type: 'info' }}
        name="TSScreen"
        component={TS}
      />
      <TSStackNavigator.Screen
        options={({ navigation, route }) => ({ title: 'НИСА lk' })}
        name="TSItemScreen"
        component={TSItem}
      />
      <TSStackNavigator.Screen
        options={({ navigation, route }) => ({ title: route.params.title })}
        name="TSFormScreen"
        component={TSForm}
      />
      <TSStackNavigator.Screen
        options={({ navigation, route }) => ({ title: route.params.title })}
        name="RepairFormScreen"
        component={RepairForm}
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

const TSRepairStackNavigator = createStackNavigator();
const TSRepairNavigator = ({ }) => {
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
    <TSRepairStackNavigator.Navigator initialRouteName={'TSScreen'} screenOptions={({ navigation, route }) => screenOptions(navigation, route)}>
      <TSRepairStackNavigator.Screen
        options={({ navigation, route }) => ({ title: 'НИСА lk', headerLeft: () => null })}
        name="TSRepairingScreen"
        component={TSRepairing}
      />
    </TSRepairStackNavigator.Navigator>
  );
}

const TSRepairMapStateToProps = (state) => {
  return {
    jwt: state.authentication.jwt,
  };
};
const connectedTSRepairNavigator = connect(TSRepairMapStateToProps)(TSRepairNavigator);
