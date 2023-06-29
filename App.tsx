import { StatusBar } from 'expo-status-bar'
import { useRef, useState } from 'react'
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Animated,
  TextInputProps,
} from 'react-native'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <View className="flex-1 justify-center bg-gray-50 px-10">
      <View className="flex h-1/5 items-center justify-start">
        <Text className="font-title text-3xl text-gray-900">
          Gerenciador filantrópico
        </Text>
      </View>

      <View className="flex h-2/5 flex-col items-center justify-start">
        <AnimatedPlaceholderInput
          placeholderText="Usuário"
          viewClassName="my-6 w-full"
        />

        <AnimatedPlaceholderInput
          placeholderText="Senha"
          secureTextEntry
          viewClassName="my-6 w-full"
        />

        <View className="flex flex-row justify-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {}}
            className="mx-4 w-24 items-center rounded bg-red-500 px-4 py-2"
          >
            <Text className="font-title text-sm uppercase text-gray-50">
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {}}
            className="mx-4 w-24 items-center rounded bg-red-500 px-4 py-2"
          >
            <Text className="font-title text-sm uppercase text-gray-50">
              Sair
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  )
}

interface AnimatedPlaceholderInputProps extends TextInputProps {
  placeholderText: string
  viewClassName: string
}

export function AnimatedPlaceholderInput({
  placeholderText,
  viewClassName,
  ...rest
}: AnimatedPlaceholderInputProps) {
  const inputRef = useRef(null)
  const labelPosition = useRef(new Animated.Value(20)).current
  const [isFocused, setIsFocused] = useState(false)
  const [text, setText] = useState('')

  const handleFocus = () => {
    setIsFocused(true)
    Animated.timing(labelPosition, {
      toValue: 15,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (text === '') {
      Animated.timing(labelPosition, {
        toValue: 20,
        duration: 200,
        useNativeDriver: false,
      }).start()
    }
  }
  return (
    <View className={`relative ${viewClassName}`}>
      <Animated.Text
        className={`absolute left-3 top-2 text-lg text-gray-400 ${
          isFocused || text ? '-translate-y-6 text-sm text-red-500' : ''
        } pointer-events-none transition-all duration-300`}
        style={{ top: labelPosition }}
      >
        {placeholderText}
      </Animated.Text>
      <TextInput
        {...rest}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={text}
        onChangeText={(value) => setText(value)}
        className="focus:outline-non w-full  rounded-md border-b-2  border-gray-300  p-3 font-body text-lg text-gray-800 focus:border-red-500"
      />
    </View>
  )
}
