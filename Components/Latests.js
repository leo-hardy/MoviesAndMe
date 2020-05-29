import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import FilmList from './FilmList'
import { getLatestFilms } from '../API/TMDBApi'


class Latests extends React.Component {

  constructor(props) {
    super(props)
    this.page = 0
    this.totalPages = 0
    this.state = {
        films: [],
        isLoading: false
    }
    // data binding
    this._loadFilms = this._loadFilms.bind(this)
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

  _loadFilms() {
    this.setState({ isLoading: true })
    getLatestFilms(this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
        films: [ ...this.state.films, ...data.results ],
        isLoading: false
        })
    })
  }

  componentDidMount() {
      this._loadFilms()
  }

  render() {
    return (
      <View style={styles.main_container}>
        <FilmList
          films={this.state.films} 
          navigation={this.props.navigation}
          loadFilms={this._loadFilms}
          page={this.page}
          totalPages={this.totalPages}
          myLists={false}
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

export default Latests