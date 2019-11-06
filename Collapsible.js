import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Animated, { Easing } from 'react-native-reanimated'
import { ViewPropTypes } from './config'

const { spring, timing } = Animated

const ANIMATED_EASING_PREFIXES = ['easeInOut', 'easeOut', 'easeIn']

export default class Collapsible extends Component {
  static propTypes = {
    align: PropTypes.oneOf(['top', 'center', 'bottom']),
    collapsed: PropTypes.bool,
    collapsedHeight: PropTypes.number,
    enablePointerEvents: PropTypes.bool,
    duration: PropTypes.number,
    easing: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    style: ViewPropTypes.style,
    onAnimationEnd: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    align: 'top',
    collapsed: true,
    collapsedHeight: 0,
    enablePointerEvents: false,
    duration: 300,
    easing: 'easeOutCubic',
    onAnimationEnd: () => null,
  }

  constructor(props) {
    super(props)
    this.state = {
      measuring: false,
      measured: false,
      height: new Animated.Value(props.collapsedHeight),
      contentHeight: 0,
      animating: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.collapsed !== this.props.collapsed) {
      this.setState({ measured: false }, () => this._componentDidUpdate(prevProps))
    } else {
      this._componentDidUpdate(prevProps)
    }
  }

  componentWillUnmount() {
    this.unmounted = true
  }

  _componentDidUpdate(prevProps) {
    if (prevProps.collapsed !== this.props.collapsed) {
      this._toggleCollapsed(this.props.collapsed)
    } else if (this.props.collapsed && prevProps.collapsedHeight !== this.props.collapsedHeight) {
      this.state.height.setValue(this.props.collapsedHeight)
    }
  }

  contentHandle = null

  _handleRef = ref => {
    this.contentHandle = ref
  }

  _measureContent(callback) {
    this.setState(
      {
        measuring: true,
      },
      () => {
        requestAnimationFrame(() => {
          if (!this.contentHandle) {
            this.setState(
              {
                measuring: false,
              },
              () => callback(this.props.collapsedHeight),
            )
          } else {
            this.contentHandle.getNode().measure((x, y, width, height) => {
              this.setState(
                {
                  measuring: false,
                  measured: true,
                  contentHeight: height,
                },
                () => callback(height),
              )
            })
          }
        })
      },
    )
  }

  _toggleCollapsed(collapsed) {
    if (collapsed) {
      this._transitionToHeight(this.props.collapsedHeight)
    } else if (!this.contentHandle) {
      if (this.state.measured) {
        this._transitionToHeight(this.state.contentHeight)
      }
      return
    } else {
      this._measureContent(contentHeight => {
        this._transitionToHeight(contentHeight)
      })
    }
  }

  _transitionToHeight(height) {
    const config = {
      toValue: height,
      damping: 13,
      mass: 1,
      stiffness: 101.6,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    }
    const config2 = {
      duration: 300,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    }

    this._animIn = spring(this.state.height, config)
    this._animOut = timing(this.state.height, config2)
    this.setState({ animating: true })
    if (height === 0) {
      this._animOut.start(({ finished }) => {
        if (finished) {
          this.setState({ animating: false })
        }
      })
    } else {
      this._animIn.start(({ finished }) => {
        if (finished) {
          this.setState({ animating: false })
        }
      })
    }
  }

  _handleLayoutChange = event => {
    const contentHeight = event.nativeEvent.layout.height
    if (
      this.state.animating ||
      this.props.collapsed ||
      this.state.measuring ||
      this.state.contentHeight === contentHeight
    ) {
      return
    }

    this.state.height.setValue(contentHeight)
    this.setState({ contentHeight })
  }

  render() {
    const { collapsed, enablePointerEvents } = this.props
    const { height, contentHeight, measuring, measured } = this.state
    const hasKnownHeight = !measuring && (measured || collapsed)
    const style = hasKnownHeight && {
      overflow: 'hidden',
      height: height,
    }
    const contentStyle = {}
    if (measuring) {
      contentStyle.position = 'absolute'
      contentStyle.opacity = 0
    }
    return (
      <Animated.View style={style} pointerEvents={!enablePointerEvents && collapsed ? 'none' : 'auto'}>
        <Animated.View
          ref={this._handleRef}
          style={[this.props.style, contentStyle]}
          onLayout={this.state.animating ? undefined : this._handleLayoutChange}
        >
          {this.props.children}
        </Animated.View>
      </Animated.View>
    )
  }
}
