/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;
var Collapsible = require('Collapsible');

var BACON_IPSUM = 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

var CONTENT = [
  {
    title: 'First',
    content: BACON_IPSUM,
  },
  {
    title: 'Second',
    content: BACON_IPSUM,
  },
  {
    title: 'Third',
    content: BACON_IPSUM,
  },
  {
    title: 'Fourth',
    content: BACON_IPSUM,
  },
  {
    title: 'Fifth',
    content: BACON_IPSUM,
  },
];

var Example = React.createClass({
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
      <View style={styles.container}>
        <Text style={styles.title}>Accordion Example</Text>
        {CONTENT.map((accordion, key) =>
          <View key={key}>
            <TouchableHighlight onPress={() => this._toggleAccordion(key)}>
              <View style={styles.header}>
                <Text style={styles.headerText}>{accordion.title}</Text>
              </View>
            </TouchableHighlight>
            <Collapsible collapsed={this.state.activeAccordion !== key}>
              <View style={styles.content}>
                <Text>{accordion.content}</Text>
              </View>
            </Collapsible>
          </View>
        )}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

AppRegistry.registerComponent('Example', () => Example);
