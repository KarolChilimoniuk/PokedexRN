import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const useAsyncStorage = key => {
  const [storedValue, setStoredValue] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        const value = jsonValue != null ? JSON.parse(jsonValue) : null;
        setStoredValue(value);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [key]);

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  return [storedValue, storeData];
};
