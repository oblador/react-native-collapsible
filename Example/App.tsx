import React from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const BACON_IPSUM =
  'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

const CONTENT = [
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

const SELECTORS = [
  {
    title: 'First',
    value: 0,
  },
  {
    title: 'Third',
    value: 2,
  },
  {
    title: 'None',
  },
];

export default function App() {
  const [activeSections, setActiveSections] = React.useState<number[]>([]);
  const [collapsed, setCollapsed] = React.useState(true);
  const [multipleSelect, setMultipleSelect] = React.useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
        <Text style={styles.title}>Accordion Example</Text>

        <View style={styles.multipleToggle}>
          <Text style={styles.multipleToggle__title}>Multiple Select?</Text>
          <Switch
            value={multipleSelect}
            onValueChange={(a) => setMultipleSelect(a)}
          />
        </View>

        <View style={styles.selectors}>
          <Text style={styles.selectTitle}>Select:</Text>

          {SELECTORS.map((selector) => (
            <TouchableOpacity
              key={selector.title}
              onPress={() =>
                setActiveSections(
                  typeof selector.value === 'number' ? [selector.value] : []
                )
              }
            >
              <View style={styles.selector}>
                <Text
                  style={
                    selector.value === activeSections[0] &&
                    styles.activeSelector
                  }
                >
                  {selector.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={() => setCollapsed((prev) => !prev)}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Single Collapsible</Text>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={collapsed} align="center">
          <View style={styles.content}>
            <Text>
              Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
              ribs
            </Text>
          </View>
        </Collapsible>
        <Accordion
          activeSections={activeSections}
          sections={CONTENT}
          touchableComponent={TouchableOpacity}
          expandMultiple={multipleSelect}
          renderHeader={(section, _, isActive) => (
            <Animatable.View
              duration={400}
              style={[
                styles.header,
                isActive ? styles.active : styles.inactive,
              ]}
              transition="backgroundColor"
            >
              <Text style={styles.headerText}>{section.title}</Text>
            </Animatable.View>
          )}
          renderContent={(section, _, isActive) => (
            <Animatable.View
              duration={400}
              style={[
                styles.content,
                isActive ? styles.active : styles.inactive,
              ]}
              transition="backgroundColor"
            >
              <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
                {section.content}
              </Animatable.Text>
            </Animatable.View>
          )}
          duration={400}
          onChange={setActiveSections}
          renderAsFlatList={false}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});
