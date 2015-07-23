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

var ANIMATED_EASING_PREFIXES = ['easeInOut', 'easeOut', 'easeIn'];

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
      easing:     'easeOutCubic',
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
      if(Easing) {
        var prefix, found = false;
        for (var i = 0; i < ANIMATED_EASING_PREFIXES.length; i++) {
          prefix = ANIMATED_EASING_PREFIXES[i];
          if(easing.substr(0, prefix.length) === prefix) {
            easing = easing.substr(prefix.length, 1).toLowerCase() + easing.substr(prefix.length + 1);
            prefix = prefix.substr(4, 1).toLowerCase() + prefix.substr(5);
            console.log(prefix, easing);
            easing = Easing[prefix](Easing[easing || 'ease']);
            found = true;
            break;
          }
        };
        if(!found) {
          easing = Easing[easing];
        }
      } else {
        easing = tweenState.easingTypes[easing];
      }
      if(!easing) {
        throw new Error('Invalid easing type "' + this.props.easing +'"');
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
