import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

const Filters = ({setSearchType}) => {
  const [checked, setChecked] = React.useState('movie');
  return (
    <View style={styles.container}>
      <View style={styles.filterButton}>
        <Text>Filmes</Text>
        <RadioButton
          value="movie"
          status={ checked === 'movie' ? 'checked' : 'unchecked' }
          onPress={() => {
            setSearchType('movie');
            setChecked('movie');
          }}
        />
      </View>

      <View style={styles.filterButton}>
        <Text>Seriados</Text>
        <RadioButton
          value="tv"
          status={ checked === 'tv' ? 'checked' : 'unchecked' }
          onPress={() => {
            setSearchType('tv');
            setChecked('tv');
          }}
        />
      </View>

      <View style={styles.filterButton}>
        <Text>Pessoas</Text>
        <RadioButton       
          value="person"
          status={ checked === 'person' ? 'checked' : 'unchecked' }
          onPress={() => {
            setSearchType('person');
            setChecked('person');
          }}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center'
  },
  filterButton: {
    flex: 1,
    margin: 10,
  }
});

export default Filters;