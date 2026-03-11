import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Car, Clock, CheckCircle, CalendarClock } from 'lucide-react-native';

const C = { black: "#111111", red: "#ff5a5f", white: "#f8f8ff", green: "#058c42" };
const Tab = createMaterialTopTabNavigator();

const UPCOMING = [
  { id: "1", from: "Accra",      to: "Tema",       time: "8:00 AM",  date: "Today" },
  { id: "2", from: "Spanner",    to: "37 Military", time: "7:30 AM", date: "Tomorrow" },
];

const PAST = [
  { id: "3", from: "Tema",       to: "Accra CBD",  time: "5:00 PM",  date: "Feb 22" },
  { id: "4", from: "Madina",     to: "Osu",        time: "8:00 AM",  date: "Feb 20" },
  { id: "5", from: "East Legon", to: "Airport",    time: "6:30 AM",  date: "Feb 18" },
  { id: "6", from: "Accra",      to: "Tema",       time: "8:00 AM",  date: "Feb 15" },
  { id: "7", from: "Tema",       to: "Accra CBD",  time: "5:00 PM",  date: "Feb 12" },
];

// ── Ride Card ──
function RideCard({ item, upcoming }: { item: any; upcoming: boolean }) {
  return (
    <View style={[styles.card, upcoming && styles.cardUpcoming]}>
      {/* Left accent */}
      <View style={[styles.accentBar, { backgroundColor: upcoming ? C.red : C.green }]} />

      {/* Icon */}
      <View style={[styles.iconWrap, { backgroundColor: upcoming ? C.red + "18" : C.green + "18" }]}>
        <Car color={upcoming ? C.red : C.green} size={20} />
      </View>

      {/* Details */}
      <View style={styles.cardBody}>
        <View style={styles.cardTopRow}>
          <Text style={styles.route} numberOfLines={1}>
            {item.from} → {item.to}
          </Text>
          <View style={[styles.statusBadge, {
            backgroundColor: upcoming ? C.red + "18" : C.green + "18",
            borderColor:     upcoming ? C.red + "44" : C.green + "44",
          }]}>
            {upcoming
              ? <CalendarClock color={C.red}   size={11} />
              : <CheckCircle   color={C.green} size={11} />
            }
            <Text style={[styles.statusText, { color: upcoming ? C.red : C.green }]}>
              {upcoming ? "Scheduled" : "Completed"}
            </Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Clock   color="#AAA" size={12} />
            <Text style={styles.metaText}>{item.time}</Text>
          </View>
          <View style={styles.metaDot} />
          <View style={styles.metaItem}>
            <CalendarClock color="#AAA" size={12} />
            <Text style={styles.metaText}>{item.date}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function UpcomingRides() {
  return (
    <View style={styles.tabScreen}>
      <FlatList
        data={UPCOMING}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RideCard item={item} upcoming={true} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState label="No upcoming rides" />}
      />
    </View>
  );
}

function PastRides() {
  return (
    <View style={styles.tabScreen}>
      <FlatList
        data={PAST}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RideCard item={item} upcoming={false} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState label="No past rides" />}
      />
    </View>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <View style={styles.empty}>
      <Car color="#DDD" size={40} />
      <Text style={styles.emptyText}>{label}</Text>
    </View>
  );
}

export default function MapPage() {
  return (
    <SafeAreaView style={styles.screen}>

      {/* Page header */}
      <View style={styles.header}>
        <Text style={styles.headerEyebrow}>HISTORY</Text>
        <Text style={styles.headerTitle}>My Rides</Text>
        <View style={styles.redRule} />
      </View>

      {/* Top tabs */}
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: "800",
            letterSpacing: 0.5,
            textTransform: "none",
          },
          tabBarActiveTintColor:   C.red,
          tabBarInactiveTintColor: "#AAA",
          tabBarIndicatorStyle: {
            backgroundColor: C.red,
            height: 3,
            borderRadius: 2,
          },
          tabBarStyle: {
            backgroundColor: C.white,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: "#EBEBF0",
          },
          tabBarPressColor: C.red + "18",
        }}
      >
        <Tab.Screen name="Upcoming" component={UpcomingRides} />
        <Tab.Screen name="Past"     component={PastRides}     />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F8FF",
  },

  // Header
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: C.white,
  },
  headerEyebrow: {
    color: C.red,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 6,
  },
  headerTitle: {
    color: C.black,
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.8,
    marginBottom: 12,
  },
  redRule: {
    height: 3,
    width: 36,
    backgroundColor: C.red,
    borderRadius: 2,
  },

  // Tab screen bg
  tabScreen: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  listContent: {
    padding: 20,
    paddingBottom: 120,
  },

  // Card
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.white,
    borderRadius: 18,
    marginBottom: 12,
    padding: 14,
    paddingLeft: 18,
    gap: 12,
    overflow: "hidden",
    shadowColor: C.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  cardUpcoming: {
    borderColor: C.red + "30",
  },
  accentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: {
    flex: 1,
    gap: 7,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  route: {
    fontSize: 15,
    fontWeight: "800",
    color: C.black,
    flex: 1,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: "#888",
    fontWeight: "500",
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#CCC",
  },

  // Empty
  empty: {
    alignItems: "center",
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    color: "#CCC",
    fontSize: 15,
    fontWeight: "600",
  },
});