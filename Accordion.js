import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import Collapsible from './Collapsible';

const COLLAPSIBLE_PROPS = [
  'align',
  'collapsed',
  'collapsedHeight',
  'enablePointerEvents',
  'duration',
  'easing',
  'style',
  'onAnimationEnd',
];

export default class Accordion extends Component {
  static defaultProps = {
    underlayColor: 'black',
    disabled: false,
    expandFromBottom: false,
    expandMultiple: false,
    touchableComponent: TouchableHighlight,
    renderSectionTitle: () => null,
    onAnimationEnd: () => null,
    sectionContainerStyle: {},
  };

  _toggleSection(section) {
    if (!this.props.disabled) {
      const { activeSections, expandMultiple, onChange } = this.props;

      let updatedSections = [];

      if (activeSections.includes(section)) {
        updatedSections = activeSections.filter(a => a !== section);
      } else if (expandMultiple) {
        updatedSections = [...activeSections, section];
      } else {
        updatedSections = [section];
      }

      if (onChange) {
        onChange(updatedSections);
      }
    }
  }

  render() {
    const {
      activeSections,
      expandMultiple,
      onChange,
      containerStyle,
      sectionContainerStyle,
      expandFromBottom,
      sections,
      underlayColor,
      touchableProps,
      touchableComponent: Touchable,
      onAnimationEnd,
      renderContent,
      renderHeader,
      renderFooter,
      renderSectionTitle,
      disabled,
      ...restProps
    } = this.props;

    const viewProps = {};
    const collapsibleProps = {};

    Object.keys(restProps).forEach(key => {
      if (COLLAPSIBLE_PROPS.includes(key)) {
        collapsibleProps[key] = restProps[key];
      } else {
        viewProps[key] = restProps[key];
      }
    });

    const renderCollapsible = (section, key) => (
      <Collapsible
        collapsed={!activeSections.includes(key)}
        {...collapsibleProps}
        onAnimationEnd={() => onAnimationEnd(section, key)}
      >
        {renderContent(section, key, activeSections.includes(key), sections)}
      </Collapsible>
    );

    return (
      <View style={containerStyle} {...viewProps}>
        {sections.map((section, key) => (
          <View key={key} style={sectionContainerStyle}>
            {renderSectionTitle(section, key, activeSections.includes(key))}

            {expandFromBottom && renderCollapsible(section, key)}

            <Touchable
              onPress={() => this._toggleSection(key)}
              underlayColor={underlayColor}
              {...touchableProps}
              accessibilityState={{
                expanded: activeSections.includes(key),
              }}
            >
              {renderHeader(
                section,
                key,
                activeSections.includes(key),
                sections
              )}
            </Touchable>

            {!expandFromBottom && renderCollapsible(section, key)}

            {renderFooter &&
              renderFooter(
                section,
                key,
                activeSections.includes(key),
                sections
              )}
          </View>
        ))}
      </View>
    );
  }
}
