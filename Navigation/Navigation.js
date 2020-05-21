import React from 'react'
import {StyleSheet, Image } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator } from 'react-navigation-tabs'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: "Rechercher",
            headerStyle: {
                backgroundColor: '#fec16c'
            }
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: "Fiche du film"
        }
    }
})

const FavoriteStackNavigator = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: "Favoris",
            headerStyle: {
                backgroundColor: '#fc6362'
            }
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: "Fiche du film",
        }
    }
})


const MoviesTabNavigator = createBottomTabNavigator({
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
          tabBarIcon: () => {
              return <Image 
                        source={require('../Images/ic_search.png')} 
                        style={styles.icon} />
          },
          tabBarOptions: {
            showLabel: false,
            showIcon: true,
            activeBackgroundColor: '#fec16c',
            inactiveBackgroundColor: '#FFFFFF'
        }
      }
    },
    Favorites: {
      screen: FavoriteStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
            return <Image 
                      source={require('../Images/ic_favorite.png')} 
                      style={styles.icon} /> 
            },
            tabBarOptions: {
                showLabel: false,
                showIcon: true,
                activeBackgroundColor: '#fc6362',
                inactiveBackgroundColor: '#FFFFFF'
            }
        }
    }
})

  const styles = StyleSheet.create({
      icon: {
          width: 30,
          height: 30
      }
  })
  
  export default createAppContainer(MoviesTabNavigator)