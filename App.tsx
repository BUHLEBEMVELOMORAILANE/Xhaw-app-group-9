import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, FlatList, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Spring Smart">
        <Stack.Screen name="Spring Smart" component={AuthScreen} />
        <Stack.Screen name="Shopping Items" component={ShoppingItemsScreen} />
        <Stack.Screen name="Item Details" component={ShoppingDetailScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Cash Out" component={CashOutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Auth Screen
function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSubmit = () => {
    if (isLoginMode) {
      Alert.alert('Logged In!', `Email: ${email}, Password: ${password}`);
      navigation.navigate('Shopping Items');
    } else {
      Alert.alert('Signed Up!', `Email: ${email}, Password: ${password}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLoginMode ? 'Login' : 'Sign Up'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={isLoginMode ? 'Login' : 'Sign Up'} onPress={handleSubmit} />
      <Button
        title={`Switch to ${isLoginMode ? 'Sign Up' : 'Login'}`}
        onPress={() => setIsLoginMode((prev) => !prev)}
      />
    </View>
  );
}

// Sample image URLs (replace with actual images as needed)
const imageUrls = [
  'https://via.placeholder.com/150?text=Product+1',
  'https://via.placeholder.com/150?text=Product+2',
  'https://via.placeholder.com/150?text=Product+3',
  'https://via.placeholder.com/150?text=Product+4',
  'https://via.placeholder.com/150?text=Product+5',
  'https://via.placeholder.com/150?text=Product+6',
  'https://via.placeholder.com/150?text=Product+7',
  'https://via.placeholder.com/150?text=Product+8',
  'https://via.placeholder.com/150?text=Product+9',
  'https://via.placeholder.com/150?text=Product+10',
];

function ShoppingItemsScreen({ navigation }) {
  const items = Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Item ${i + 1}`,
    price: `$${(i + 1) * 5}`,
    image: imageUrls[i % imageUrls.length],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Items</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
            <Button
              title="Shop"
              onPress={() => navigation.navigate('Item Details', {
                title: item.title,
                price: item.price,
                image: item.image,
              })}
            />
          </View>
        )}
      />
      <View style={styles.navButtons}>
        <Button title="About Us" onPress={() => navigation.navigate('About')} />
        <Button title="Contact Us" onPress={() => navigation.navigate('Contact')} />
        <Button title="Cash Out" onPress={() => navigation.navigate('Cash Out')} />
      </View>
    </View>
  );
}

// Cash Out Screen
function CashOutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cash Out</Text>
      <Text>Proceed with cashing out your selected items.</Text>
    </View>
  );
}

// Shopping Detail Screen
function ShoppingDetailScreen({ route }) {
  const { title, price, image } = route.params;

  return (
    <View style={[styles.container, styles.detailContainer]}>
      <Text style={styles.detailTitle}>{title}</Text>
      <Image source={{ uri: image }} style={styles.detailImage} />
      <Text style={styles.detailPrice}>{price}</Text>
      <Text style={styles.detailDescription}>
        This is a detailed description of chosen Product {title}.
      </Text>
    </View>
  );
}

// About Screen
function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.aboutText}>
        Welcome to our shopping app! We are committed to providing the best products and services to our customers.
        Explore a wide range of items carefully curated just for you.
      </Text>
    </View>
  );
}

// Contact Screen
function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.contactText}>
        For any inquiries or assistance, please reach out to us:
      </Text>
      <Text style={styles.contactText}>Email: support@shoppingapp.com</Text>
      <Text style={styles.contactText}>Phone: +1 234 567 8900</Text>
      <Text style={styles.contactText}>Address: 123 Shopping Street, City, Country</Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  itemContainer: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  itemTitle: {
    fontSize: 18,
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 8,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  detailContainer: {
    backgroundColor: '#f0f8ff',
  },
  detailTitle: {
    fontSize: 30,
    marginBottom: 10,
  },
  detailImage: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  detailPrice: {
    fontSize: 24,
    color: 'gray',
  },
  detailDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  aboutText: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  contactText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
