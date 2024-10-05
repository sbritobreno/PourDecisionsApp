import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/constants';

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading...</Text> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',      
    backgroundColor: COLORS.primary, 
  },
  loadingText: {
    fontSize: 28,
    color: COLORS.black,  
  },
});

export default Loading;
