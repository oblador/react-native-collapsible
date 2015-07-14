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

var COLLAPSIBLE_PROPS = ['duration', 'easing'];

var Accordion = React.createClass({
  propTypes: {
    sections:       React.PropTypes.array.isRequired,
    renderHeader:   React.PropTypes.func.isRequired,
    renderContent:  React.PropTypes.func.isRequired,
    onChange:       React.PropTypes.func,
    duration:       React.PropTypes.number,
    easing:         React.PropTypes.string,
  },

  getInitialState: function() {
    return {
      activeSection: false
    };
  },

  _toggleSection(section) {
    var activeSection = this.state.activeSection === section ? false : section;
    this.setState({ activeSection });
    if(this.props.onChange) {
      this.props.onChange(activeSection);
    }
  },

  render() {
    var collapsibleProps = {};
    Object.keys(this.props).forEach((key) => {
      if(COLLAPSIBLE_PROPS.indexOf(key) !== -1) {
        collapsibleProps[key] = this.props[key];
      }
    });

    return (
      <View>
      {this.props.sections.map((section, key) =>
        <View key={key}>
          <TouchableHighlight onPress={() => this._toggleSection(key)}>
            {this.props.renderHeader(section, key)}
          </TouchableHighlight>
          <Collapsible collapsed={this.state.activeSection !== key} {...collapsibleProps}>
            {this.props.renderContent(section, key)}
          </Collapsible>
        </View>
      )}
      </View>
    );
  }
});

module.exports = Accordion;
