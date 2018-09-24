import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight } from 'react-native';
import Collapsible from './Collapsible';
import { ViewPropTypes } from './config';

const COLLAPSIBLE_PROPS = Object.keys(Collapsible.propTypes);
const VIEW_PROPS = Object.keys(ViewPropTypes);

export default class Accordion extends Component {
  static propTypes = {
    sections: PropTypes.array.isRequired,
    renderHeader: PropTypes.func.isRequired,
    renderContent: PropTypes.func.isRequired,
    renderSectionTitle: PropTypes.func,
    onChange: PropTypes.func,
    align: PropTypes.oneOf(['top', 'center', 'bottom']),
    duration: PropTypes.number,
    easing: PropTypes.string,
    activeSections: PropTypes.arrayOf(PropTypes.number),
    underlayColor: PropTypes.string,
    touchableComponent: PropTypes.func,
    touchableProps: PropTypes.object,
    disabled: PropTypes.bool,
    expandFromBottom: PropTypes.bool,
    expandMultiple: PropTypes.bool,
    onAnimationEnd: PropTypes.func,
  };

  static defaultProps = {
    activeSections: [],
    underlayColor: 'black',
    disabled: false,
    expandFromBottom: false,
    expandMultiple: false,
    touchableComponent: TouchableHighlight,
    renderSectionTitle: () => null,
    onAnimationEnd: () => null,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSections: props.activeSections,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.activeSections !== undefined &&
      this.props.activeSections !== prevProps.activeSections
    ) {
      this.setState({
        activeSections: this.props.activeSections,
      });
    }
  }

  _toggleSection(section) {
    if (!this.props.disabled) {
      let activeSections = [];

      if (this.state.activeSections.includes(section)) {
        activeSections = this.state.activeSections.filter(a => a !== section);
      } else if (this.props.expandMultiple) {
        activeSections = [...this.state.activeSections, section];
      } else {
        activeSections = [section];
      }

      if (this.props.activeSections === undefined) {
        this.setState({ activeSections });
      }

      if (this.props.onChange) {
        this.props.onChange(activeSections);
      }
    }
  }

  handleErrors = () => {
    if (!Array.isArray(this.props.sections)) {
      throw new Error('Sections should be an array');
    }
  };

  render() {
    let viewProps = {};
    let collapsibleProps = {};

    Object.keys(this.props).forEach(key => {
      if (COLLAPSIBLE_PROPS.indexOf(key) !== -1) {
        collapsibleProps[key] = this.props[key];
      } else if (VIEW_PROPS.indexOf(key) !== -1) {
        viewProps[key] = this.props[key];
      }
    });

    this.handleErrors();

    const Touchable = this.props.touchableComponent;
    const { activeSections } = this.state;

    const renderCollapsible = (section, key) => (
      <Collapsible
        collapsed={!activeSections.includes(key)}
        {...collapsibleProps}
        onAnimationEnd={() => this.props.onAnimationEnd(section, key)}
      >
        {this.props.renderContent(
          section,
          key,
          activeSections.includes(key),
          this.props.sections
        )}
      </Collapsible>
    );

    return (
      <View {...viewProps}>
        {this.props.sections.map((section, key) => (
          <View key={key}>
            {this.props.renderSectionTitle(
              section,
              key,
              activeSections.includes(key)
            )}

            {this.props.expandFromBottom && renderCollapsible(section, key)}

            <Touchable
              onPress={() => this._toggleSection(key)}
              underlayColor={this.props.underlayColor}
              {...this.props.touchableProps}
            >
              {this.props.renderHeader(
                section,
                key,
                activeSections.includes(key),
                this.props.sections
              )}
            </Touchable>

            {!this.props.expandFromBottom && renderCollapsible(section, key)}
          </View>
        ))}
      </View>
    );
  }
}
