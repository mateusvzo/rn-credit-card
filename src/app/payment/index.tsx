import { Text, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import { CARD_SIDE, CreditCard } from "@/components/credit-card";

import { styles } from "./styles";
import { Input } from "@/components/input";
import { useState } from "react";

export function Payment() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [code, setCode] = useState("");

  const cardSide = useSharedValue(CARD_SIDE.FRONT);

  function showFrontCard() {
    cardSide.value = CARD_SIDE.FRONT;
  }

  function showBackCard() {
    cardSide.value = CARD_SIDE.BACK;
  }

  function handleFlipCard() {
    if (cardSide.value === CARD_SIDE.FRONT) {
      showBackCard();
    } else {
      showFrontCard();
    }
  }

  return (
    <View style={styles.container}>
      <CreditCard 
        cardSide={cardSide} 
        data={{ 
          name, 
          number: number.replace(/(\d{4})(?=\d)/g, "$1 "),   // regex for 4 digits + space
          date, 
          code 
        }} 
      />
      <TouchableOpacity style={styles.button} onPress={handleFlipCard}>
        <Text>Inverter</Text>
      </TouchableOpacity>

      <View style={styles.form}>
        <Input
          placeholder="Nome do Titular"
          onChangeText={setName}
          value={name}
          onFocus={showFrontCard}
        />
        <Input
          placeholder="Número do cartão"
          onChangeText={setNumber}
          value={number}
          keyboardType="numeric"
          maxLength={16}
          onFocus={showBackCard}
        />

        <View style={styles.inputInline}>
          <Input
            placeholder="01/02"
            style={styles.smallInput}
            onChangeText={setDate}
            value={date}
            onFocus={showBackCard}
          />
          <Input
            placeholder="123"
            onChangeText={setCode}
            value={code}
            style={styles.smallInput}
            keyboardType="numeric"
            onFocus={showBackCard}
          />
        </View>
      </View>
    </View>
  );
}
