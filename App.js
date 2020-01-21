import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Picker } from 'react-native';

export default function App() {

  const [init, setInit] = useState(false)
  const [currencyFrom, setCurrencyFrom] = useState("")
  const [currencyTo, setCurrencyTo] = useState("")
  const [value, setValue] = useState(0)
  const [converted, setConverted] = useState(0)

   const fetchRestaurants = () => {
     setInit(true)
  }

  const calculate = () => {
    
    fetch(`https://api.exchangeratesapi.io/latest?base=${currencyFrom}`)
      .then(resp => resp.json())
      .then(resp =>  {
        console.log(currencyFrom)
        console.log(currencyTo)

        console.log(resp.rates[currencyTo])
        let rate = resp.rates[currencyTo]
        let output = rate ? rate * value : 1 * value
        setConverted(output)
      })
  }



  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   };
  // }, [])

    const converter = ()=> {

      return (
        <React.Fragment>
        <View style={{flex: 1, margin: 40}}>
          <Text>Select which currency you want to convert from</Text>
            <TextInput 
            keyboardType="numeric"
            style={styles.input}
            placeholder="E.g 10.00"
            onChangeText={(val)=> setValue(val)}
            />
          <Picker
            selectedValue={currencyFrom}
            style={{height: 50, width: 300}}
            onValueChange={(currency, itemIndex) => setCurrencyFrom(currency)
            }>
              {["GBP","EUR", "USD", "BRL"].map((currency, index)=> <Picker.Item label={currency} value={currency} key={index}/>)}
          </Picker>
        </View>
        <View style={{flex: 2}}>
          <Text>Select which currency you want to convert to</Text>
          
          <Picker
            selectedValue={currencyTo}
            style={{height: 50, width: 300}}
            onValueChange={(currency, itemIndex) => setCurrencyTo(currency)
            }>
              {["GBP","EUR", "USD", "BRL"].map((currency, index)=> <Picker.Item label={currency} value={currency} key={index}/>)}
          </Picker>
        </View>
        <View style={{flex: 1}}>
        <Button
          title='Calculate'
          onPress={calculate}
        />

         <Text style={styles.input}>{converted}</Text>
        </View>
        </React.Fragment>
        )
    }
  






  return (
      <View style={styles.mainContainer}>
        { !init ? (
            <React.Fragment>
              <Text>Welcome to Alex API Converter</Text>
              <Button
              title='Click her to get started'
              onPress={fetchRestaurants}
              />
            </React.Fragment>
            
        ) : (converter())}
      </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // flexDirection: 'column-reverse',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 8
  }
});


// <View style={{flex: 1, backgroundColor: "blue"}}>
//           <Text >Hello {name}. Welcome back to Mobile development world!</Text>
//           <Text>hello from view 1</Text>
//         </View>
//         <View style={{flex: 2,backgroundColor: "yellow"}}>
//           <Text >Hello {name}. Welcome back to Mobile development world!</Text>
//           <Text>hello from view 1</Text>
//           <Button 
//           title='Update State'
//           onPress={fetchRestaurants}
//           />
//           <TextInput 
//           style={styles.input}
//           placeholder="E.g Alex"
//           onChangeText={(val)=> setName(val)}
//           />
//         </View>
//         <View style={{flex: 2, backgroundColor: "red"}}>
//           <Text >Hello Alex. Welcome back to Mobile development world!!</Text>
//           <Text>from state {cat}</Text>
//         </View>