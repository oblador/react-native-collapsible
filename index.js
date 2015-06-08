/**
 * @providesModule Collapsible
 */
'use strict';

var React = require('react-native');
var tweenState = require('react-tween-state');
var {
  View,
} = React;

var Collapsible = React.createClass({
  mixins: [tweenState.Mixin],

  propTypes: {
    collapsed:  React.PropTypes.bool,
    duration: React.PropTypes.number,
    easing:   React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      collapsed:  true,
      duration: 300,
      easing:   'easeOutCubic',
    };
  },

  componentWillReceiveProps(props) {
    if(props.collapsed !== this.props.collapsed) {
      this._toggleCollapsed(props.collapsed);
    }
  },

  getInitialState() {
    return {
      height: 0,
      contentHeight: 0,
    };
  },

  _toggleCollapsed(collapsed) {
    this.tweenState('height', {
      easing: tweenState.easingTypes[this.props.easing],
      duration: this.props.duration,
      endValue: collapsed ? 0 : this.state.contentHeight,
    });
  },

  _handleLayoutChange(event) {
    var { height } = event.nativeEvent.layout;
    this.setState({
      height: this.props.collapsed ? 0 : height,
      contentHeight: height,
    });
  },

  render() {
    var style = {
      overflow: 'hidden',
      height:   this.getTweeningValue('height')
    };
    return (
      <View style={style} pointerEvents={this.props.collapsed ? 'none' : 'auto'}>
        <View ref="content" onLayout={this._handleLayoutChange}>
          {this.props.children}
        </View>
      </View>
    );
  }
});

module.exports = Collapsible;
