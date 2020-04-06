import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import axios from 'axios';

const useAxios = url => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then(response => setData(response.data))
      .catch(e => Alert.alert('Error', e.message));
  }, [url]);

  return data;
};
export default useAxios;
