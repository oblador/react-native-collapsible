# react-native-collapsible
*Animated collapsible component for React Native, good for accordions, toggles etc*

Pure JavaScript, supports dynamic content heights and components that is aware of its `collapsed` state (good for toggling arrows etc).

## Installation

```
npm install --save react-native-collapsible
```

## Usage

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

## Demo

![demo](https://cloud.githubusercontent.com/assets/378279/8047315/0237ca2c-0e44-11e5-9a16-1da052406eb0.gif)

## Accordion Example

Check full example in the `Example` folder. 

```js
var React = require('react-native');
var {
  View,
  Text,
  TouchableHighlight,
} = React;
var Collapsible = require('Collapsible');

var AccordionView = React.createClass({
  getInitialState: function() {
    return {
      activeAccordion: false
    };
  },

  _toggleAccordion(accordion) {
    this.setState({
      activeAccordion: this.state.activeAccordion === accordion ? false : accordion,
    });
  },

  render: function() {
    return (
      <View>
        <TouchableHighlight onPress={() => this._toggleAccordion('first')}>
          <Text>First</Text>
        </TouchableHighlight>
        <Collapsible collapsed={this.state.activeAccordion !== 'first'}>
          <Text>First Content</Text>
        </Collapsible>
        <TouchableHighlight onPress={() => this._toggleAccordion('second')}>
          <Text>Second</Text>
        </TouchableHighlight>
        <Collapsible collapsed={this.state.activeAccordion !== 'second'}>
          <Text>Second Content</Text>
        </Collapsible>
      </View>
    );
  }
});
```

## License

[MIT License](http://opensource.org/licenses/mit-license.html).

