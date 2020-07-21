import * as React from 'react';
import { useEffect, useState } from 'react';
import {View, Text, Image } from 'react-native';
import pokeBerries from "../images/manyBerries.png"

const BerriesView = () => {
  console.log(berriesList);
  const [berriesList, getBerries ] = useState([]);
  const [loading, setLoading ] = useState(true);
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/berry')
    .then(res => res.json())
    .then(JSONres => JSONres.results)
    .then(berries => { 
      getBerries([...berries]);
      setLoading(false);
      })
    .catch(e => console.log(message));
  }, []);
    if(loading) { 
      return (<Text>Something gone wrong...</Text>)
    } else {
      return (<View style={styles.container}>
                  <Image
                    source={require('../images/manyBerries.png')}
                    style={styles.image}
                  />
                  {
                  berriesList.map(el => <Text style={styles.text}>{el.name}</Text>)}
              </View>);
    }
};

const styles = {
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  image: {
    height: 170,
    width: '100%',
    marginBottom: 40,
  },
  text: {
    textTransform: 'capitalize',
  },
}

export default BerriesView;