# react-native-collapsible
*Animated collapsible component for React Native using the Animated API*

Pure JavaScript, supports dynamic content heights and components that is aware of its `collapsed` state (good for toggling arrows etc).

## Installation

```
npm install --save react-native-collapsible
```

## Collapsible Usage

```js
import Collapsible from 'react-native-collapsible';
<Collapsible collapsed={isCollapsed}>
  <SomeCollapsedView />
</Collapsible>
```

## Properties

| Prop | Description | Default |
|---|---|---|
|**`align`**|Alignment of the content when transitioning, can be `top`, `center` or `bottom`|`top`|
|**`collapsed`**|Whether to show the child components or not|`true`|
|**`collapsedHeight`**|Which height should the component collapse to|`0`|
|**`duration`**|Duration of transition in milliseconds|`300`|
|**`easing`**|Function or function name from [`Easing`](https://github.com/facebook/react-native/blob/master/Libraries/Animated/src/Easing.js) (or [`tween-functions`](https://github.com/chenglou/tween-functions) if < RN 0.8). Collapsible will try to combine `Easing` functions for you if you name them like `tween-functions`. |`easeOutCubic`|

## Accordion Usage

This is a convenience component for a common use case, see demo below. 

```js
import Accordion from 'react-native-collapsible/Accordion';
<Accordion 
  sections={['Section 1', 'Section 2', 'Section 3']}
  renderHeader={this._renderHeader}
  renderContent={this._renderContent}
/>
```

## Properties

| Prop | Description |
|---|---|
|**`sections`**|An array of sections passed to the render methods|
|**`renderHeader(content, index, isActive)`**|A function that should return a renderable representing the header|
|**`renderContent(content, index, isActive)`**|A function that should return a renderable representing the content|
|**`onChange(index)`**|An optional function that is called when currently active section is changed, `index === false` when collapsed|
|**`initiallyActiveSection`**|Set which index in the `sections` array is initially open. Defaults to none. |
|**`activeSection`**|Control which index in the `sections` array is currently open. Defaults to none. If false, closes all sections.|
|**`underlayColor`**|The color of the underlay that will show through when tapping on headers. Defaults to black. |
|**`touchableComponent`**| The touchable component used in the Accordion. Defaults to `TouchableHighlight` |
|**`touchableProps`**| Properties for the `touchableComponent` |
|**`align`**|See `Collapsible`|
|**`duration`**|See `Collapsible`|
|**`easing`**|See `Collapsible`|

## Demo

![demo](https://cloud.githubusercontent.com/assets/378279/8047315/0237ca2c-0e44-11e5-9a16-1da052406eb0.gif)

## Example 

Check full example in the `Example` folder. 

```js
import React, { Component } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  }
];

class AccordionView extends Component {
  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  }

  render() {
    return (
      <Accordion
        sections={SECTIONS}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
    );
  }
}
```

### Transition backgrounds

If you combine with the [`react-native-animatable`](https://github.com/oblador/react-native-animatable) library you can easily transition the background color between the active and inactive state or add animations. 

Lets augment the example above with:
```js
import * as Animatable from 'react-native-animatable';

(...)

  _renderHeader(section, index, isActive) {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{ backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)') }}>
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  }

  _renderContent(section, i, isActive) {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{ backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)') }}>
        <Animatable.Text
          duration={300}
          easing="ease-out"
          animation={isActive ? 'zoomIn' : false}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

(...)
```

To produce this (slowed down for visibility): 

![accordion-demo](https://cloud.githubusercontent.com/assets/378279/10767769/2ddfe234-7cb4-11e5-8ef1-c0f8c67ead58.gif)

## Contributing
Interested in contributing to this repo? Have a look at our [Contributing Guide](https://github.com/oblador/react-native-collapsible/blob/master/.github/CONTRIBUTING.MD)

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/oblador">
          <img width="150" height="150" src="https://github.com/oblador.png?v=3&s=150">
          <br>
          <strong>Joel Arvidsson</strong>
        </a>
        <br>
        Author
      </td>
      <td align="center">
        <a href="https://github.com/iRoachie">
          <img width="150" height="150" src="https://github.com/iRoachie.png?v=3&s=150">
          </br>
          <strong>Kyle Roach</strong>
        </a>
        <br>
        Maintainer
      </td>
    </tr>
  <tbody>
</table>

## License
[MIT License](http://opensource.org/licenses/mit-license.html). © Joel Arvidsson 2015-2017
