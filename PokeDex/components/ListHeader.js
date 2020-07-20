import React from 'react';
import {View, TextInput} from 'react-native';

export const ListHeader = props => {
  return (
    <View>
      <TextInput placeholder="search" onChangeText={props.onChange} />
    </View>
  );
};
