import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { EasingMode } from './index';

export interface AccordionProps<T> {
  /**
   * An array of sections passed to the render methods
   */
  sections: T[];

  /**
   * A function that should return a renderable representing the header
   */
  renderHeader(
    content: T,
    index: number,
    isActive: boolean,
    sections: T[]
  ): React.ReactElement<{}>;

  /**
   * A function that should return a renderable representing the footer
   */
  renderFooter?(
    content: T,
    index: number,
    isActive: boolean,
    sections: T[]
  ): React.ReactElement<{}>;

  /**
   * A function that should return a renderable representing the section title above the touchable
   */
  renderSectionTitle?(
    content: T,
    index: number,
    isActive: boolean,
    sections: T[]
  ): React.ReactElement<{}>;

  /**
   * A function that should return a renderable representing the content
   */
  renderContent(
    content: T,
    index: number,
    isActive: boolean,
    sections: T[]
  ): React.ReactElement<{}>;

  /**
   * A function that is called when the currently active section(s) are updated.
   */
  onChange(indexes: number[]): void;

  /**
   * Used to extract a unique key for a given item at the specified index. Key is used for caching
   * and as the react key to track item re-ordering. The default extractor checks `item.key`, then
   * falls back to using the index, like React does.
   */
  keyExtractor?: (item: T, index: number) => number | string;

  /**
   * Controls whether user can interact with accordion
   */
  disabled?: boolean;

  /**
   * Expand content from the bottom instead of the top
   *
   * @default false
   */
  expandFromBottom?: boolean;

  /**
   * Allow more than one section to be expanded at a time. Defaults to false for legacy behavior.
   *
   * @default false
   */
  expandMultiple?: boolean;

  /**
   * Control which indices from keyEctractor in the sections array are currently
   * open. If empty, closes all sections.
   */
  activeSections: number[] | string[];

  /**
   * The color of the underlay that will show through when tapping on headers.
   *
   * @default black
   */
  underlayColor?: string;

  /**
   * Alignment of the content when transitioning, can be top, center or bottom
   *
   * @default top
   */
  align?: 'top' | 'center' | 'bottom';

  /**
   * Duration of transition in milliseconds
   *
   * @default 300
   */
  duration?: number;

  /**
   * Function or function name from Easing (or tween-functions if < RN 0.8). Collapsible will try to combine Easing functions for you if you name them like tween-functions.
   *
   * @default easeOutCubic
   */
  easing?: EasingMode | any;

  /**
   * Component to use for the Touchable
   *
   * @default TouchableHighlight
   */
  touchableComponent?: React.ComponentClass;

  /**
   * Object of props to pass to the touchable component
   */
  touchableProps?: {};

  /**
   * Optional styling for the section container
   */
  sectionContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Optional styling for the Accordion container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Render the Accordion as a FlatList. Defaults to false for legacy behavior.
   *
   * @default false
   */
  renderAsFlatList?: boolean;
}

export default class Accordion<T> extends React.Component<AccordionProps<T>> {}
