import React, { useState, useRef, useEffect } from 'react'
import { Animated, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'

interface RangSliderProps {
    range: number[]
    defaultValues?: number[]
    barHeight?: number
    barStyle?: any
    handleSize?: number
    handleStyle?: any
    onChange?(range: number[]): any
    vibrate?: boolean
}

function RangeSlider({
    range = [0,100],
    defaultValues = [0,0],
    barHeight = 30,
    barStyle = {},
    handleSize = 30,
    handleStyle = {},
    onChange = () => {},
    vibrate = false
}: RangSliderProps) {

    const [ barWidth, setBarWidth ] = useState(300)
    const minValueRef = useRef(defaultValues[0])
    const maxValueRef = useRef(defaultValues[1])
    const minTouchX = useRef(new Animated.Value(0)).current
    const maxTouchX = useRef(new Animated.Value(0)).current
    const unusedTouchX = useRef(new Animated.Value(0)).current
    const ReactNativeHapticFeedback = vibrate ? require('react-native-haptic-feedback').default : undefined

    const onBarLayout = ({ nativeEvent }: any) => {
        setBarWidth(nativeEvent.layout.width)
    }

    const triggerVibration = () => {
        if (ReactNativeHapticFeedback) {
            ReactNativeHapticFeedback.trigger('impactLight', {
                enableVibrateFallback: false,
                ignoreAndroidSystemSettings: false
            })
        }
    }

    const pixelRatio = () => {
        return (range[1] - range[0]) / barWidth
    }
    

    const onMinValueChange = ({ nativeEvent }: any) => {
        const { absoluteX } = nativeEvent
        const value = Math.round(absoluteX * pixelRatio()) + range[0]
        if (value >= range[0] && value <= maxValueRef.current && value != minValueRef.current) {
            minValueRef.current = value
            minTouchX.setValue(absoluteX)
            if (vibrate) triggerVibration()
            onChange([ minValueRef.current, maxValueRef.current ])
        }
    }

    const onMaxValueChange = ({ nativeEvent }: any) => {
        const { absoluteX } = nativeEvent
        const value = Math.round(absoluteX * pixelRatio()) + range[0]
        if (value <= range[1] && value >= minValueRef.current && value != maxValueRef.current) {
            maxValueRef.current = value
            maxTouchX.setValue(absoluteX)
            if (vibrate) triggerVibration()
            onChange([ minValueRef.current, maxValueRef.current ])
        }
    }

    const onMinPanGestureEvent = Animated.event([{ nativeEvent: { translationX: unusedTouchX } }], {
        useNativeDriver: true, listener: onMinValueChange
    })

    const onMaxPanGestureEvent = Animated.event([{ nativeEvent: { translationX: unusedTouchX } }], {
        useNativeDriver: true, listener: onMaxValueChange
    })

    const minTranslateX = minTouchX.interpolate({
        inputRange: [ 0, barWidth - handleSize ],
        outputRange: [ 0, barWidth - handleSize ],
        extrapolate: 'clamp'
    })

    const maxTranslateX = maxTouchX.interpolate({
        inputRange: [ 0, barWidth - handleSize ],
        outputRange: [ 0, barWidth - handleSize ],
        extrapolate: 'clamp',
    })

    useEffect(() => {
        minTouchX.setValue((minValueRef.current - range[0]) / pixelRatio())
        maxTouchX.setValue((maxValueRef.current - range[0]) / pixelRatio())
    }, [ barWidth ])

    const renderHandle = (translateX) => {
        return (
            <Animated.View style={{
                aspectRatio: 1,
                backgroundColor: 'white',
                borderRadius: handleSize / 2,
                height: undefined,
                left: 0,
                position: 'absolute',
                top: -((handleSize - barHeight) / 2),
                transform: [{ translateX: translateX }],
                width: handleSize,
                elevation: 1,
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.12,
                shadowRadius: 4,
                ...handleStyle
            }} />
        )
    }

    return (
        <View>
            <Animated.View
                onLayout={onBarLayout}
                style={{
                    backgroundColor: '#f2f2f2',
                    borderRadius: barHeight / 2,
                    height: barHeight,
                    position: 'relative',
                    width: '100%',
                    ...barStyle
                }}
            >
                <PanGestureHandler onGestureEvent={onMinPanGestureEvent}>
                    {renderHandle(minTranslateX)}
                </PanGestureHandler>
                <PanGestureHandler onGestureEvent={onMaxPanGestureEvent}>
                    {renderHandle(maxTranslateX)}
                </PanGestureHandler>
            </Animated.View>
        </View>
    )

}

export default RangeSlider