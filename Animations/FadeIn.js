import React from 'react'
import { Animated, Dimensions } from 'react-native'

class FadeIn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            positionLeft: new Animated.Value(Dimensions.get('window').width)
        }
    }

    componentDidMount() {
        Animated.spring(
            this.state.positionLeft,
            {
                toValue: 0
            }
        ).start()
    }

    render() {
        return (
            <Animated.View style={{ left: this.state.positionLeft }}>
                {/* ici FadeIn est appele en tant que parent d'autres components, il faut lui dire d'afficher ses
                enfants sinon on a un espace vide */}
                {this.props.children}
            </Animated.View>
        )
    }
}

export default FadeIn