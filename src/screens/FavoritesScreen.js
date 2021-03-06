import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../components/Card';
import {addFavorites, deleteFavorites} from '../redux/actions/favoritesActions';
import {notifier} from '../utils/notifier';

const FavoritesScreen = ({navigation}) => {
  const {favorites} = useSelector(state => state.favoritesReducer);
  const dispatch = useDispatch();

  const handleAddFavorite = item => {
    const selected = favorites.some(favorite => favorite.id === item.id);
    if (selected) {
      dispatch(deleteFavorites(item.id));
      notifier(
        'Success',
        'Successfully removed from your favorites',
        'success',
      );
    } else {
      dispatch(addFavorites(item));
      notifier('Success', 'Successfully added to your favorites', 'success');
    }
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.notFavoritesContainer}>
          <Text style={styles.notFavoritesText}>
            Your favorite list is empty
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          style={styles.listContainer}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <Card
              {...item}
              key={index}
              onPress={() => navigation.navigate('MovieDetail', {id: item.id})}
              onPressFavorite={() => handleAddFavorite(item)}
              fill={
                favorites.some(favorite => favorite.id === item.id)
                  ? '#000000'
                  : 'none'
              }
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#000000',
  },
  listContainer: {},
  notFavoritesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFavoritesText: {
    color: '#555353',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default FavoritesScreen;
