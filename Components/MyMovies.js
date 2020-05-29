import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import FilmList from './FilmList'

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
        <FilmList
          films={this.props.myMovies} 
          navigation={this.props.navigation}
          myLists={true}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  }
})


const mapStateToProps = state => {
  return {
    myMovies: state.toggleSeen.myMovies
  }
}

export default connect(mapStateToProps)(Favorites)