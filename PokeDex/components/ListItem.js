import React, {useEffect, useState} from 'react';
import getType from '../Views/pokeType';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  View
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';

import {fetchPokemonDetails} from '../apiService';
import {useAsyncStorage} from '../hooks/useAsyncStorage';

const AbortController = window.AbortController;

export const ListItem = props => {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [detailsSource, setDetailsSource] = useAsyncStorage(
    `@pokeDex_details_${props.name}`,
  );
  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      const signal = controller.signal;
      setIsLoading(true);
      const pokemonDetails = await AsyncStorage.getItem(
        `@pokeDex_details_${props.name}`,
      );
      if (pokemonDetails == null) {
        const response = await fetchPokemonDetails(props.url, signal);
        setDetailsSource(response);
      }
      setDetails(detailsSource);
      setIsLoading(false);

      return () => controller.abort();
    })();
  }, [detailsSource]);

  const isActive = !isLoading && details != null;

  const renderDetails = () => {
    if (!isActive) {
      return <ActivityIndicator size="small" />;
    }

    return (
      <View style={styles.pokemonContainer}>
        <Image
          source={{
            uri: details.sprites.front_default,
          }}
          style={styles.image}
        />
        <View>
        <Text style={styles.text}>{details.name}</Text>
        <Text style={styles.textId}>#{details.id}</Text>
        </View>
        {/* <Image
          source={{
            uri: getType(details.types[0].type.name),
          }}
          style={styles.image}
        /> */}
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Details', {
          name: props.name,
        })
      }
      disabled={!isActive}
      key={props.index}
      style={[
        styles.itemContainer,
        props.isRefreshing && styles.disableItemContainer,
      ]}>
      {renderDetails()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#4F4F4F',
    fontSize: 20,
    fontWeight: '100',
    fontSize: 20,
    marginRight: 20,
    textTransform: 'capitalize',
  },
  textId: {
    color: '#A4A4A4',
    fontSize: 15,
  },
  itemContainer: {
    padding: 8,

  },
  disableItemContainer: {
    backgroundColor: '#eee',
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 20,
  },
  pokemonContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DFDFDF',
    flexDirection: 'row',
    minWidth: 310,
    width: "100%",
  }
});
