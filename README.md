# react-native-collapsible
*Animated collapsible component for React Native, good for accordions, toggles etc*

Pure JavaScript, supports dynamic content heights and components that is aware of its `collapsed` state (good for toggling arrows etc).

## Installation

```
npm install --save react-native-collapsible
```

## Collapsible Usage

```js
var Collapsible = require('Collapsible');
<Collapsible collapsed={isCollapsed}>
  <SomeCollapsedView />
</Collapsible>
```

## Properties

| Prop | Description | Default |
|---|---|---|
|**`collapsed`**|Wether to show the child components or not|`true`|
|**`duration`**|Duration of transition in milliseconds|`300`|
|**`easing`**|Name of [easing function](https://github.com/chenglou/tween-functions)|`easeOutCubic`|

## Accordion Usage

This is a convenience component for a common use case, see demo below. 

```js
var Accordion = require('Accordion');
<Accordion 
  sections={['Section 1', 'Section 2', 'Section 3']}
  renderHeader={this._renderHeader}
  renderContent={this._renderContent}
/>
```

## Properties

| Prop | Description |
|---|---|---|
|**`sections`**|An array of sections passed to the render methods|
|**`renderHeader(content, index)`**|A function that should return a renderable representing the header|
|**`renderContent(content, index)`**|A function that should return a renderable representing the content|
|**`onChange(index)`**|An optional function that is called when currently active section is changed, `index === false` when collapsed|
|**`duration`**|See `Collapsible`|
|**`easing`**|See `Collapsible`|

## Accordion Usage

This is a convenience component for the common use case. 

## Demo

![demo](https://cloud.githubusercontent.com/assets/378279/8047315/0237ca2c-0e44-11e5-9a16-1da052406eb0.gif)

## Example 

Check full example in the `Example` folder. 

```js
var React = require('react-native');
var Accordion = require('Accordion');

var SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: Lorem ipsum...,
  }
];

var AccordionView = React.createClass({
  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  },

  _renderContent(section) {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  },

  render: function() {
    return (
      <Accordion
        sections={SECTIONS}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
    );
  }
});
```

## License

[MIT License](http://opensource.org/licenses/mit-license.html).

