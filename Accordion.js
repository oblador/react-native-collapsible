/**
 * @providesModule Accordion
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  View,
  Text,
  TouchableHighlight,
} = React;

var Collapsible = require('./Collapsible');

var COLLAPSIBLE_PROPS = Object.keys(Collapsible.propTypes);
var VIEW_PROPS = Object.keys(View.propTypes);

var Accordion = React.createClass({
  propTypes: {
    sections:               React.PropTypes.array.isRequired,
    renderHeader:           React.PropTypes.func.isRequired,
    renderContent:          React.PropTypes.func.isRequired,
    onChange:               React.PropTypes.func,
    align:                  React.PropTypes.oneOf(['top', 'center', 'bottom']),
    duration:               React.PropTypes.number,
    easing:                 React.PropTypes.string,
    initiallyActiveSection: React.PropTypes.number,
    underlayColor:          React.PropTypes.string,
  },

  getDefaultProps: function() : Object {
    return {
      underlayColor: 'black',
    };
  },

  getInitialState: function() : Object {
    return {
      activeSection: this.props.initiallyActiveSection,
    };
  },

  _toggleSection(section : number) : void {
    var activeSection = this.state.activeSection === section ? false : section;
    this.setState({ activeSection });
    if(this.props.onChange) {
      this.props.onChange(activeSection);
    }
  },

  render() : ReactElement {
    var viewProps = {};
    var collapsibleProps = {};
    Object.keys(this.props).forEach((key) => {
      if(COLLAPSIBLE_PROPS.indexOf(key) !== -1) {
        collapsibleProps[key] = this.props[key];
      } else if(VIEW_PROPS.indexOf(key) !== -1) {
        viewProps[key] = this.props[key];
      }
    });

    return (
      <View {...viewProps}>
      {this.props.sections.map((section, key) => (
        <View key={key}>
          <TouchableHighlight onPress={() => this._toggleSection(key)} underlayColor={this.props.underlayColor}>
            {this.props.renderHeader(section, key, this.state.activeSection === key)}
          </TouchableHighlight>
          <Collapsible collapsed={this.state.activeSection !== key} {...collapsibleProps}>
            {this.props.renderContent(section, key, this.state.activeSection === key)}
          </Collapsible>
        </View>
      ))}
      </View>
    );
  }
});

module.exports = Accordion;
