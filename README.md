# React Native Range Slider

### Example

```JSX
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
