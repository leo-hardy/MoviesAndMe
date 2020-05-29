// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import FadeIn from '../Animations/FadeIn'

class FilmItem extends React.Component {

    constructor(props) {
        super(props)
    }

    _displayFavImage() {
        if (this.props.isFilmFavorite){
          sourceImage = require('../Images/ic_favorite.png')
          return (
            <Image 
              style={styles.fav_image} 
              source={sourceImage}/>
          )
        }
        return
      }
      

    render() {
        const { film, displayDetailForFilm } = this.props
        return (
            <FadeIn>
                <TouchableOpacity
                    onPress={() => displayDetailForFilm(film.id)}
                    style={ this.props.myMovies ? styles.main_container_bis : styles.main_container}>
                    <Image
                        style={ this.props.myMovies ? styles.image_rounded : styles.image}
                        source={{uri: getImageFromApi(film.poster_path)}}
                    />
                    <View style={styles.content_container}>
                        <View style={styles.header_container}>
                            {this._displayFavImage()}
                            <Text style={styles.title_text}>{film.title}</Text>
                            { !this.props.myMovies &&
                                <Text style={styles.vote_text}>{film.vote_average}</Text>
                            }
                        </View>
                        { !this.props.myMovies &&
                                <View style={styles.description_container}>
                                    <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                                    {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
                                </View>
                        }{ !this.props.myMovies &&
                                <View style={styles.date_container}>
                                    <Text style={styles.date_text}>{film.release_date}</Text>
                                </View>
                        }
                    </View>
                </TouchableOpacity>
            </FadeIn>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height:  190,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'black',
        opacity: 0.7
    },
    main_container_bis: {
        height:  110,
        flexDirection: 'row',
        backgroundColor: 'white',
        opacity: 0.7,
        justifyContent: 'center'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray',
    },
    image_rounded: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 50,
        backgroundColor: 'gray',
    },
    content_container: {
        flex: 1,
        margin: 5,
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    fav_image: {
        height: 25,
        width: 25,
        margin: 5,
    }
})

  export default FilmItem