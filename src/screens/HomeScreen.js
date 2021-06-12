import React, { useState, useEffect } from 'react';
import { TouchableOpacity, FlatList, View, Text, StyleSheet, Image } from 'react-native';
import SearchBar from '../components/SearchBar';
import tmdb from '../api/tmdb';
import Filters from "../components/Filters";
import { MaterialIcons } from '@expo/vector-icons'; 


const HomeScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [filter, setSearchType] = useState('movie');
  const [baseURL, setBaseURL] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    searchTmdb(text)
    getConfigs();
  }, [filter]);

  async function getConfigs(){
    try {
      const response = await tmdb.get('/configuration');
      setBaseURL(response.data.images.base_url);
    } catch (error) {
      
    }
  }
  
  async function searchTmdb(query) {
    try {
      const response = await tmdb.get(`/search/${filter}`, {
        params: {
          query,
          include_adult: false
        }
      });
      setResults(response.data.results);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <SearchBar
        value={text}
        onTextChange={(t) => setText(t)}
        onTextSubmit={(t) => searchTmdb(t)}
        style={styles.busca}
        />
      <Filters 
        setSearchType={setSearchType}
      />
      <FlatList
        style={styles.resultados }
        data={results}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View > 
              <TouchableOpacity 
                onPress={() => navigation.navigate("Details",
                  {
                    id: item.id,
                    filter,
                    baseURL
                  }
                )}
              >
                <View style={styles.item}>
                <Image 
                  style={styles.image}
                  source={
                    {
                      uri:`${baseURL}w500/${ item.poster_path || item.backdrop_path || item.profile_path}`
                    }
                }/>

                  {/* <MaterialIcons name="image" size={24} color="black" /> */}
                <Text>{item.original_title || item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  filtros: {
    flex:1
  },
  busca:{
    flex:1
  },
  resultados:{
    flex:8
  },
  image: {
    width: 150,
    height: 150,
    marginLeft: 10,
    marginRight:10
  },
  item:{
    flexDirection: 'row',
    alignItems:'center'
  }

});

export default HomeScreen;