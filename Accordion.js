import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, FlatList } from 'react-native';
import Collapsible from './Collapsible';
import { ViewPropTypes } from './config';

const COLLAPSIBLE_PROPS = Object.keys(Collapsible.propTypes);
const VIEW_PROPS = Object.keys(ViewPropTypes);

export default class Accordion extends Component {
  static propTypes = {
    sections: PropTypes.array.isRequired,
    renderHeader: PropTypes.func.isRequired,
    renderContent: PropTypes.func.isRequired,
    renderFooter: PropTypes.func,
    renderSectionTitle: PropTypes.func,
    activeSections: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    align: PropTypes.oneOf(['top', 'center', 'bottom']),
    duration: PropTypes.number,
    easing: PropTypes.string,
    underlayColor: PropTypes.string,
    touchableComponent: PropTypes.func,
    touchableProps: PropTypes.object,
    disabled: PropTypes.bool,
    expandFromBottom: PropTypes.bool,
    expandMultiple: PropTypes.bool,
    onAnimationEnd: PropTypes.func,
    keyExtractor: PropTypes.func,
    numColumns: PropTypes.number,
    sectionContainerStyle: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,
    renderAsFlatList: PropTypes.bool,
  };

  static defaultProps = {
    underlayColor: 'black',
    disabled: false,
    expandFromBottom: false,
    expandMultiple: false,
    touchableComponent: TouchableHighlight,
    keyExtractor: (item, index) => index.toString(),
    renderSectionTitle: () => null,
    onAnimationEnd: () => null,
    numColumns: 1,
    sectionContainerStyle: {},
    renderAsFlatList: false,
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

      onChange && onChange(updatedSections);
    }
  }

  _renderContainer = (section, key, renderCollapsible) => {
    const {
      activeSections,
      sectionContainerStyle,
      expandFromBottom,
      sections,
      underlayColor,
      touchableProps,
      touchableComponent: Touchable,
      renderHeader,
      renderFooter,
      renderSectionTitle,
    } = this.props;
    return (
      <View key={key} style={sectionContainerStyle}>
        {renderSectionTitle(section, key, activeSections.includes(key))}

        {expandFromBottom && renderCollapsible(section, key)}

        <Touchable
          onPress={() => this._toggleSection(key)}
          underlayColor={underlayColor}
          {...touchableProps}
        >
          {renderHeader(section, key, activeSections.includes(key), sections)}
        </Touchable>

        {!expandFromBottom && renderCollapsible(section, key)}

        {renderFooter &&
          renderFooter(section, key, activeSections.includes(key), sections)}
      </View>
    );
  };

  render() {
    let viewProps = {};
    let collapsibleProps = {};

    Object.keys(this.props).forEach(key => {
      if (COLLAPSIBLE_PROPS.includes(key)) {
        collapsibleProps[key] = this.props[key];
      } else if (VIEW_PROPS.includes(key)) {
        viewProps[key] = this.props[key];
      }
    });

    const {
      activeSections,
      containerStyle,
      sections,
      onAnimationEnd,
      keyExtractor,
      renderContent,
      renderAsFlatList,
    } = this.props;

    const renderCollapsible = (section, key) => (
      <Collapsible
        collapsed={!activeSections.includes(key)}
        {...collapsibleProps}
        onAnimationEnd={() => onAnimationEnd(section, key)}
      >
        {renderContent(section, key, activeSections.includes(key), sections)}
      </Collapsible>
    );

    if (renderAsFlatList) {
      return (
        <FlatList
          style={containerStyle}
          data={sections}
          extraData={activeSections}
          nestedScrollEnabled={true}
          keyExtractor={keyExtractor}
          renderItem={({ item, index }) => {
            const section = item;
            const key = keyExtractor(item, index);
            return this._renderContainer(section, key, renderCollapsible);
          }}
          {...viewProps}
        />
      );
    } else {
      return (
        <View style={containerStyle} {...viewProps}>
          {sections.map((section, index) => {
            const key = keyExtractor(section, index);
            return this._renderContainer(section, key, renderCollapsible);
          })}
        </View>
      );
    }
  }
}
