/**
 * @providesModule Collapsible
 * @flow
 */
'use strict';

var React = require('react-native');
var tweenState = require('react-tween-state');
var {
  Animated,
  Easing,
  View,
} = React;

var Collapsible = React.createClass({
  mixins: [tweenState.Mixin],

  propTypes: {
    collapsed:  React.PropTypes.bool,
    duration:   React.PropTypes.number,
    easing:     React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
    ]),
  },

  getDefaultProps() : Object {
    return {
      collapsed:  true,
      duration:   300,
      easing:     'out',
    };
  },

  componentWillReceiveProps(props : Object) {
    if(props.collapsed !== this.props.collapsed) {
      this._toggleCollapsed(props.collapsed);
    }
  },

  getInitialState() : Object {
    return {
      height: (Animated ? new Animated.Value(0) : 0),
      contentHeight: 0,
    };
  },

  _toggleCollapsed(collapsed : bool) {
    var height = collapsed ? 0 : this.state.contentHeight;
    var { easing, duration } = this.props;

    if(typeof easing === 'string') {
      if(easing.substr(0, 'ease'.length) === 'ease') {
        if(Easing) {
          // This is referencing a function in the tween-functions library, try to see if there's a
          // similar function in the bundled Easing component
          easing = easing.substr(4, 1).toLowerCase() + easing.substr(5);
        }
      } else if(!Easing) {
        // And the opposite
        easing = 'ease' + easing.substr(0, 1).toUpperCase() + easing.substr(1);
      }
      if(Easing) {
        easing = Easing[easing](Easing.ease);
      } else {
        easing = tweenState.easingTypes[easing];
      }
    }

    if(Animated) {
      if(this._animation) {
        this._animation.stop();
      }
      this._animation = Animated.timing(this.state.height, {
        toValue: height,
        duration,
        easing,
      }).start();
    } else {
      this.tweenState('height', {
        easing:   easing,
        duration: this.props.duration,
        endValue: height,
      });
    }
  },

  _handleLayoutChange(event : Object) {
    var contentHeight = event.nativeEvent.layout.height;
    var height = this.props.collapsed ? 0 : contentHeight
    this.setState({
      height: (Animated ? new Animated.Value(height) : height),
      contentHeight,
    });
  },

  render() {
    var Container = (Animated ? Animated.View : View);
    var style = {
      overflow: 'hidden',
      height: (Animated ? this.state.height : this.getTweeningValue('height'))
    };
    return (
      <Container style={style} pointerEvents={this.props.collapsed ? 'none' : 'auto'}>
        <View ref="content" onLayout={this._handleLayoutChange}>
          {this.props.children}
        </View>
      </Container>
    );
  }
});

module.exports = Collapsible;
