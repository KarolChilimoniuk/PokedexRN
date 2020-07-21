import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  FlatList,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {fetchPokemonsList} from '../apiService';
import {useDebounce} from '../hooks/useDebounce';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import {ListHeader} from '../components/ListHeader';
import {ListItem} from '../components/ListItem';

const HomeView = ({navigation}) => {
  const [data, setData] = useState([]);
  const [source, setSource] = useAsyncStorage('@pokeDexList');

  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const list = await AsyncStorage.getItem('@pokeDexList');

      if (list == null) {
        const response = await fetchPokemonsList();
        setSource(response.results);
      }
      setData(source);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshPokemonsList = async () => {
    setIsRefreshing(true);
    const response = await fetchPokemonsList();
    await setSource(response.results);
    setData(source);
    setIsRefreshing(false);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filterPokemons = useCallback(
    term =>
      source.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase()),
      ),
    [source],
  );

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filteredPokemons = filterPokemons(debouncedSearchTerm);
      setData(filteredPokemons);
    } else {
      setData(source);
    }
  }, [debouncedSearchTerm, source, filterPokemons]);

  const barStyle = Platform.OS === 'ios' ? 'default' : 'light-content';
  const isLoading = data == null;

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor='rgba(85, 158, 223, 0.7)'/>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.listHeader}>pokemons</Text>
        </View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            onRefresh={refreshPokemonsList}
            refreshing={isRefreshing}
            ListHeaderComponent={<ListHeader onChange={setSearchTerm} />}
            data={data}
            scrollEnabled={!isRefreshing}
            keyExtractor={(item, index) => item.name + index}
            windowSize={2}
            renderItem={({item, index}) => {
              return (
                <ListItem
                  isRefreshing={isRefreshing}
                  name={item.name}
                  index={index}
                  url={item.url}
                  navigation={navigation}
                />
              );
            }}
            style={styles.pokemonList}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'rgba(85, 158, 223, 0.7)',
    flex: 1,
  },
  container: {
    backgroundColor: '#eee',
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: '100',
  },
  itemContainer: {
    padding: 8,
  },
  disableItemContainer: {
    backgroundColor: '#eee',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 60,
  },
  listHeader: {
    color: '#4F4F4F',
    fontSize: 40,
    textTransform: 'capitalize',
  },
  pokemonList: {
    backgroundColor: 'white',
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    padding: 40,
    width: '100%',
  }
});

export default HomeView;
