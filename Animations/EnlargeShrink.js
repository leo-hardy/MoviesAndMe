import React from 'react'
import { Animated, Dimensions } from 'react-native'

class EnlargeShrink extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            scaleValue: new Animated.Value(this._getSize())
        }
    }

    _getSize() {
        return this.props.shouldEnlarge ? 80 : 40
    }

    componentDidUpdate() {
        Animated.spring(
            this.state.scaleValue,
            {
                toValue: this._getSize(),
                useNativeDriver: false // specify true or false is mandatory
            }
        ).start()
    }

    render() {
        return (
            <Animated.View style={{ width: this.state.scaleValue, height: this.state.scaleValue }}>
                {/* ici EnlargeShrink est appele en tant que parent d'autres components, il faut lui dire d'afficher ses
                enfants sinon on a un espace vide */}
                {this.props.children}
            </Animated.View>
        )
    }
}

export default EnlargeShrink