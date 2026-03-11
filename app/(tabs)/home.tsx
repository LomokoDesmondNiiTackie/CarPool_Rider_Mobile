import BookRide from '@/component/book/ride';
import Humberger from '@/component/header/humberger';
import QrCodeS from '@/component/header/qrCode';
import Wallet from '@/component/wallet/wallet';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomePage() {
  return (
    <>

    <SafeAreaView style={{ flex: 1, paddingTop: 20, paddingInline: 20, backgroundColor: "#F8F8FF" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Humberger/>
          <QrCodeS/>
        </View>
        <View style={styles.body}>
          <Wallet/>
          <BookRide/>
        </View>
        
      </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 40,
    backgroundColor: "#F8F8FF"
  },
  header: { 
    height: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 7,
    paddingInline: 20,

  },
  body: {
    width:"80%",
    height: "70%",
    display: 'flex',
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 40,
    backgroundColor: "#F8F8FF"

  },  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});