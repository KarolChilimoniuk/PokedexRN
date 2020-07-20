import * as React from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {useAsyncStorage} from "../hooks/useAsyncStorage";

const BerriesView = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Berries</Text>
    </View>
  );
};

export default BerriesView;