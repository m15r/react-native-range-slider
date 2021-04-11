# React Native Range Slider

### Installation

Using Yarn:
```
yarn add react-native-rangeslider
```

Using NPM:
```
npm install react-native-rangeslider
```

### Example

```jsx
import RangeSlider from 'react-native-rangeslider'

export default function RangeSliderExample() {

  const handleChange = (values) => {
    // Your logic
  }

  return (
    <RangeSlider
      range={[0,100]}
      defaultValues={[25,75]}
      onChange={handleChange}
      vibrate />
  )
  
}
```
