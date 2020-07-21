import * as React from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import AnimatedBar from '../components/AnimatedBar';
import {useAsyncStorage} from "../hooks/useAsyncStorage";
import getType from './pokeType';

const DetailsView = ({route}) => {
  const {name} = route.params;
  const [detailsSource, setDetailsSource] = useAsyncStorage(
    `@pokeDex_details_${name}`,);
  if(!detailsSource) return <ActivityIndicator/>;
  return (
    <View style={styles.container}>
      <View style={styles.pokeBackground}></View>
      <View style={styles.imageContainer}>
        <View style={styles.typeContainer}>
          <Image 
           style={styles.image}
           source={{
             uri: detailsSource.sprites.front_default,
          }}/>
          <Text style={styles.typeText}>normal</Text>
        </View>
        <View style={styles.typeContainer}>
          <Image 
           style={styles.image}
           source={{
             uri: detailsSource.sprites.front_shiny,
           }}/>
           <Text style={styles.typeText}>shiny</Text>
        </View>
      </View>
        <Text style={styles.nameText}>{name}</Text>
      {/* <Image 
         style={styles.typeImg}
         source={{
           uri: getType(detailsSource.types[0].type.name),
         }}/> */}
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
  pokeBackground: {
    backgroundColor: 'rgba(85, 158, 223, 0.7)',
    height: 150,
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    position: 'relative',
  },
  imageContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  image: {
    height: 150,
    width: 150,
  },
  // typeImg: {
  //   height: 20,
  //   width: 20,
  // },
  nameText: {
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    color: '#4F4F4F',
    fontSize: 30,
    marginBottom: 20,
    marginTop: 40,
    textTransform: 'capitalize',
  },
  statsContainer: {
     borderTopLeftRadius: 48,
     borderTopRightRadius: 48,
     flexDirection: 'row',
     alignItems: 'center',
  },
  statsText: {
    color: '#4F4F4F',
    marginRight: 4,
    textTransform: 'uppercase',
  },
  typeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  typeText: {
    color: '#4F4F4F',
    textTransform: 'capitalize',
  },
  bar: {
    height: 8,
    backgroundColor: `#516AAC`,
  }
}

export default DetailsView;
