import * as React from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';

import {useAsyncStorage} from "../hooks/useAsyncStorage";

const DetailsView = ({route}) => {
  const {name} = route.params;
  const [detailsSource, setDetailsSource] = useAsyncStorage(
    `@pokeDex_details_${name}`,);
  if(!detailsSource) return <ActivityIndicator/>;
  return (
    <View style={styles.container}>
      <Image 
      style={styles.image}
      source={{
        uri: detailsSource.sprites.back_default,
      }}/>
      <Text>{name}</Text>
      {detailsSource.stats.map(item => (
        <View>
          <Text>{`${item.stat.name}: ${item.base_stat}`}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',

  },
  image: {
    width: 100,
  }
}

export default DetailsView;
