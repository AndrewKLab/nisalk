import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { styles } from '../_styles/styles';


export const Error = ({ children }) => {
  return (
    <View style={styles.error}>
      <Text style={styles.errorText}>{children}</Text>
    </View>
  );
}
