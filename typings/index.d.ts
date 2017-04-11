declare namespace __ReactNativeCollapsible {
  export type Alignment =
    'top' |
    'center' |
    'bottom';

  export type EasingMode =
    'linear' |
    'easeInQuad' |
    'easeOutQuad' |
    'easeInOutQuad' |
    'easeInCubic' |
    'easeOutCubic' |
    'easeInOutCubic' |
    'easeInQuart' |
    'easeOutQuart' |
    'easeInOutQuart' |
    'easeInQuint' |
    'easeOutQuint' |
    'easeInOutQuint' |
    'easeInSine' |
    'easeOutSine' |
    'easeInOutSine' |
    'easeInExpo' |
    'easeOutExpo' |
    'easeInOutExpo' |
    'easeInCirc' |
    'easeOutCirc' |
    'easeInOutCirc' |
    'easeInElastic' |
    'easeOutElastic' |
    'easeInOutElastic' |
    'easeInBack' |
    'easeOutBack' |
    'easeInOutBack' |
    'easeInBounce' |
    'easeOutBounce' |
    'easeInOutBounce';

  interface CollapsibleProps {
    collapsed?: boolean;
    align?: Alignment
    collapsedHeight?: number;
    duration?: number;
    easing?: React.EasingFunction | EasingMode;
    style?: React.ViewStyle
  }

  export default class Collapsible extends React.Component<CollapsibleProps, {}> { }
}

declare module "react-native-collapsible" {
  export = __ReactNativeCollapsible;
}
