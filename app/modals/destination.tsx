import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Back from "@/component/destination/back";
import Search from "@/component/destination/search";
import DropOff from "@/component/destination/dropOff";

const C = { black: "#111111", red: "#ff5a5f", white: "#f8f8ff", green: "#058c42" };

const ALL_DESTINATIONS = [
  { id: "0", title: "Tema Community 5 Junction", subtitle: "Your usual pickup", preferred: true },
  { id: "1", title: "Accra Central, Kinbu Rd",   subtitle: "Accra CBD"         },
  { id: "2", title: "Airport Residential Area",  subtitle: "Near Kotoka Airport"},
  { id: "3", title: "Osu, Oxford Street",         subtitle: "Osu, Accra"        },
  { id: "4", title: "East Legon, Boundary Rd",   subtitle: "East Legon"        },
  { id: "5", title: "Madina Market",              subtitle: "Madina, Accra"     },
];

export default function Destination() {
  const [query, setQuery] = useState("");

  const filtered = ALL_DESTINATIONS.filter((d) =>
    d.title.toLowerCase().includes(query.toLowerCase())
  );

  // Always show preferred first
  const sorted = [...filtered].sort((a, b) =>
    (b.preferred ? 1 : 0) - (a.preferred ? 1 : 0)
  );

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.screen}>

        {/* Header */}
        <View style={styles.header}>
          <Back />
          <View style={styles.headerCenter}>
            <Text style={styles.headerEyebrow}>SELECT</Text>
            <Text style={styles.headerTitle}>Destination</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Red rule */}
        <View style={styles.redRule} />

        {/* Search */}
        <View style={styles.searchWrap}>
          <Search value={query} onChange={setQuery} />
        </View>

        {/* Section label */}
        <Text style={styles.sectionLabel}>
          {query ? `Results for "${query}"` : "Available Drop-offs"}
        </Text>

        {/* List */}
        <FlatList
          data={sorted}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No destinations found.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <DropOff
              text={item.title}
              subtitle={item.subtitle}
              isPreferred={!!item.preferred}
            />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingTop: 56,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerEyebrow: {
    color: C.red,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 3,
  },
  headerTitle: {
    color: C.black,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  headerSpacer: {
    width: 38, // mirrors Back button width to keep title centered
  },

  redRule: {
    height: 3,
    width: 36,
    backgroundColor: C.red,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },

  // Search
  searchWrap: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  // Section label
  sectionLabel: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.8,
    color: "#AAA",
    paddingHorizontal: 20,
    marginBottom: 12,
    textTransform: "uppercase",
  },

  // List
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  // Empty
  empty: {
    alignItems: "center",
    paddingTop: 40,
  },
  emptyText: {
    color: "#AAA",
    fontSize: 15,
    fontWeight: "600",
  },
});