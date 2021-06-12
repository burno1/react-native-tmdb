import React, { useEffect, useState } from 'react';
import { Text, Image, View ,StyleSheet } from 'react-native';
import tmdb from '../api/tmdb';

const DetailsScreen = ({ navigation, route, baseURL}) => {
  const [movie, setMovie] = useState({});

  async function getInfo(id,filter) {
    try {
      const response = await tmdb.get(`/${filter}/${id}`, {
        params: {
          include_adult: false
        }
      });
      setMovie(response.data);
      console.log(response.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    console.log(baseURL);
    getInfo(route.params.id, route.params.filter)
  },[]);

  return (
    <View style={styles.mainContainer}>

      <Text style={{fontSize:20, fontWeight: "bold"}}>{movie.original_title || movie.name}{"\n"}</Text>
      <Image 
        style={styles.image}
        source={
          {
            uri:`${route.params.baseURL}w500/${ movie.poster_path || movie.backdrop_path || movie.profile_path}`
          }
        }/>
        
        <Text><Text style={{fontSize:18, fontWeight:'bold'}}>{route.params.filter != 'person' ? 'Sinopse:' : 'Biography'} {"\n"}</Text>{movie.overview || movie.biography}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    marginLeft: 10,
  },
  mainContainer: {
    margin:20
  }
});

export default DetailsScreen;