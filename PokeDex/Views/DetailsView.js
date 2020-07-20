import * as React from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import AnimatedBar from '../components/AnimatedBar';
import {useAsyncStorage} from "../hooks/useAsyncStorage";

const DetailsView = ({route}) => {
  const {name} = route.params;
  const [detailsSource, setDetailsSource] = useAsyncStorage(
    `@pokeDex_details_${name}`,);
  if(!detailsSource) return <ActivityIndicator/>;
  let imgSrc = detailsSource.sprites.front_default;
  return (
    <View style={styles.container}>
      <Image 
      style={styles.image}
      source={{
        uri: imgSrc,
      }}/>
      <Text>{name}</Text>
      {detailsSource.stats.map((item, i) => (
        <View key={i} style={styles.statsContainer}>
          <Text style={styles.statsText}>{`${item.stat.name}: ${item.base_stat}`}</Text>
          <View style={[styles.bar, {width: item.base_stat}]}></View>
          <AnimatedBar value={item.base_stat} index={i}/>
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
    height: 150,
    width: 150,
  },
  statsContainer: {
     flexDirection: 'row',
     alignItems: 'center',
  },
  statsText: {
    marginRight: 4,
  },
  bar: {
    height: 8,
    backgroundColor: `#516AAC`,
  }
}

export default DetailsView;
