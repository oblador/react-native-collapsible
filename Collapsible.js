import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Animated,
  Easing,
  View,
} from 'react-native';

const ANIMATED_EASING_PREFIXES = ['easeInOut', 'easeOut', 'easeIn'];

// For some reason 0 heights won't hide overflow in RN 0.12+
const ALMOST_ZERO = 0.00000001;

class Collapsible extends Component {
  static propTypes = {
    align: PropTypes.oneOf(['top', 'center', 'bottom']),
    collapsed: PropTypes.bool,
    collapsedHeight: PropTypes.number,
    duration: PropTypes.number,
    easing: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    style: View.propTypes.style,
  };

  static defaultProps = {
    align: 'top',
    collapsed: true,
    collapsedHeight: ALMOST_ZERO,
    duration: 300,
    easing: 'easeOutCubic',
  };

  componentWillReceiveProps(props) {
    if (props.collapsed !== this.props.collapsed) {
      this._toggleCollapsed(props.collapsed);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      height: new Animated.Value(props.collapsedHeight),
      contentHeight: 0,
      animating: false,
    };
  }

  _toggleCollapsed(collapsed) {
    const height = collapsed ? this.props.collapsedHeight : this.state.contentHeight;
    const { duration } = this.props;
    let easing = this.props.easing;
    if (typeof easing === 'string') {
      let prefix;
      let found = false;
      for (let i = 0; i < ANIMATED_EASING_PREFIXES.length; i++) {
        prefix = ANIMATED_EASING_PREFIXES[i];
        if (easing.substr(0, prefix.length) === prefix) {
          easing = easing.substr(prefix.length, 1).toLowerCase() + easing.substr(prefix.length + 1);
          prefix = prefix.substr(4, 1).toLowerCase() + prefix.substr(5);
          easing = Easing[prefix](Easing[easing || 'ease']);
          found = true;
          break;
        }
      }
      if (!found) {
        easing = Easing[easing];
      }
      if (!easing) {
        throw new Error('Invalid easing type "' + this.props.easing + '"');
      }
    }

    if (this._animation) {
      this._animation.stop();
    }
    this.setState({ animating: true });
    this._animation = Animated.timing(this.state.height, {
      toValue: height,
      duration,
      easing,
    }).start(event => this.setState({ animating: false }));
  }

  _handleLayoutChange(event) {
    const contentHeight = event.nativeEvent.layout.height;
    const height = this.props.collapsed ? this.props.collapsedHeight : contentHeight;
    this.setState({
      height: new Animated.Value(height),
      contentHeight,
    });
  }

  render() {
    const { height, contentHeight } = this.state;
    const style = {
      overflow: 'hidden',
      height: height,
    };
    let contentStyle = {};
    if (this.props.align === 'center') {
      contentStyle.transform = [{
        translateY: height.interpolate({
          inputRange: [0, contentHeight],
          outputRange: [contentHeight / -2, 0],
        }),
      }];
    } else if (this.props.align === 'bottom') {
      contentStyle.transform = [{
        translateY: height.interpolate({
          inputRange: [0, contentHeight],
          outputRange: [-contentHeight, 0],
        }),
      }];
    }
    return (
      <Animated.View style={style} pointerEvents={this.props.collapsed ? 'none' : 'auto'}>
        <Animated.View style={[this.props.style, contentStyle]} onLayout={this.state.animating ? undefined : event => this._handleLayoutChange(event)}>
          {this.props.children}
        </Animated.View>
      </Animated.View>
    );
  }
}

module.exports = Collapsible;
