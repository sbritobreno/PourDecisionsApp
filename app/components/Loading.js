import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    backgroundColor: '#374C7B', 
  },
  loadingText: {
    fontSize: 28,
    color: '#000',  
  },
});

export default Loading;
