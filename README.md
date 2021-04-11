# React Native Range Slider
Range Slider for React Native using [react-native-gesture-handler](https://www.npmjs.com/package/react-native-gesture-handler).

[![IMG-A64-C68-A192-B2-1.jpg](https://i.postimg.cc/wTbjcsHr/IMG-A64-C68-A192-B2-1.jpg)](https://postimg.cc/QH1DjCFg)

Installation
---

Using Yarn:
```
yarn add @m15r/react-native-range-slider
```

Using NPM:
```
npm install @m15r/react-native-range-slider
```

If you wish to use vibration when sliding the handles, follow the installation instructions for [react-native-haptic-feedback](https://github.com/junina-de/react-native-haptic-feedback) and enable the ```vibrate``` prop on your RangeSlider.

Example
---

```jsx
import RangeSlider from '@m15r/react-native-range-slider'

export default function RangeSliderExample() {

  const handleChange = (values) => {
    // Your logic
  }

  return (
    <RangeSlider
      range={[0,100]}
      defaultValues={[25,75]}
      onChange={handleChange} />
  )
  
}
```

Props
---

Prop          | Description   | Default | Required |
------------- | ------------- | ------------- | ------------- |
range         | Array containing min. and max. values | `[0,100]` | :white_check_mark: |
defaultValues | Initial values for the range slider | `[25,75]` | :white_check_mark: |
onChange      | Returns an array with min. and max. values |
barHeight     | Height of the slider bar | `30` |
barStyle      | Apply custom styling to the bar | `{}` |
fillStyle     | Apply custom styling to the fill between handles | `{}` |
handleSize    | Size of the handles | `30` |
handleStyle   | Apply custom styling to the handles | `{}` |
vibrate       | Vibrate when moving the handle using [react-native-haptic-feedback](https://github.com/junina-de/react-native-haptic-feedback) | `false` |


