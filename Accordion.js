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
    initiallyActiveSection: PropTypes.number,
    activeSection: PropTypes.oneOfType([
      PropTypes.bool, // if false, closes all sections
      PropTypes.number, // sets index of section to open
    ]),
    underlayColor: PropTypes.string,
    touchableComponent: PropTypes.func,
    touchableProps: PropTypes.object,
    disabled: PropTypes.bool,
    expandFromBottom: PropTypes.bool,
    onAnimationEnd: PropTypes.func,
  };

  static defaultProps = {
    underlayColor: 'black',
    disabled: false,
    expandFromBottom: false,
    touchableComponent: TouchableHighlight,
    renderSectionTitle: () => null,
    onAnimationEnd: () => null,
  };

  constructor(props) {
    super(props);

    // if activeSection not specified, default to initiallyActiveSection
    this.state = {
      activeSection:
        props.activeSection !== undefined
          ? props.activeSection
          : props.initiallyActiveSection,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.activeSection !== undefined &&
      this.props.activeSection !== prevProps.activeSection
    ) {
      this.setState({
        activeSection: this.props.activeSection,
      });
    }
  }

  _toggleSection(section) {
    if (!this.props.disabled) {
      const activeSection =
        this.state.activeSection === section ? false : section;

      if (this.props.activeSection === undefined) {
        this.setState({ activeSection });
      }
      if (this.props.onChange) {
        this.props.onChange(activeSection);
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

    const renderCollapsible = (section, key) => (
      <Collapsible
        collapsed={this.state.activeSection !== key}
        {...collapsibleProps}
        onAnimationEnd={() => this.props.onAnimationEnd(section, key)}
      >
        {this.props.renderContent(
          section,
          key,
          this.state.activeSection === key,
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
              this.state.activeSection === key
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
                this.state.activeSection === key,
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
