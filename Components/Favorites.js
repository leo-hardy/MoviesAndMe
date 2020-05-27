// Components/Favorites.js

import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import FilmList from './FilmList'
import Avatar from './Avatar'

class Favorites extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.avatar_container}>
          <Avatar/>
        </View>
        <FilmList
          films={this.props.favoritesFilm} 
          navigation={this.props.navigation}
          favoriteList={true}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  avatar_container: {
    alignItems: 'center'
  }
})


const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites)