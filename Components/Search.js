import React from 'react'
import {StyleSheet, View, Button, TextInput, FlatList, ActivityIndicator} from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

    constructor(props){
        super(props)
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading: false,
        }
        this.searchedText = ""
    }

    _loadFilms(){
        if (this.searchedText.length > 0){
            this.setState({ isLoading: true})
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    // on concatene le tableau de films avec le tableau des nouveaux films
                    films: [...this.state.films, ...data.results],
                    isLoading: false
                })
            })
        }
    }

    _displayLoading(){
        if (this.state.isLoading){
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _searchTextInputChanged(text){
        this.searchedText= text
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, () => {
            this._loadFilms()
        })
    }

    render(){
        return(
            <View style={styles.maincontainer}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Titre du film"
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._searchFilms()}/>
                <Button style={{height: 50}} title={'Rechercher'} onPress={() => this._searchFilms()}/>
                <FlatList
                    data={this.state.films}
                    keyExtractor= {(item) => item.id.toString()}
                    // on gere le scroll infini
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages){
                            this._loadFilms()
                        }
                    }}
                    renderItem={({item}) => <FilmItem film={item}/>}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    maincontainer:{
        marginTop: 20,
        flex: 1
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search