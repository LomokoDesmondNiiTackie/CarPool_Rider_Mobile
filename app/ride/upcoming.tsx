import { View, Text, FlatList, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'


function RideCard() {
    return (
        <View style={styles.card}>
            <View style={styles.logo}>
                <Ionicons name="car-outline" size={30} color="#666" />
            </View>
            <View style={styles.details}>
                <Text>Accra to Tema</Text>
                <Text>Departure: 8:00 am</Text>
            </View>
        </View>
    )
}

export default function Upcoming() {
  return (
    <View style={styles.container}>
      <FlatList
        data={[1, 2, 3, 4, 5]} // Sample data for rides
        keyExtractor={(item) => item.toString()}
        renderItem={() => <RideCard />}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    list: {
        width: "100%",
        gap: 10
    },
    card: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        padding: 20,
        backgroundColor: "#f0f0f0",
        borderRadius: 10
    },
    logo: {
        width: 50,
        height: 50,
        backgroundColor: "#ccc",
        borderRadius: 25
    },
    details: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 5
    }
}) 