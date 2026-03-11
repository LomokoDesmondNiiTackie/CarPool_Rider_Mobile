import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { Check, Pencil} from 'lucide-react-native';

const C = { black: "#111111", red: "#ff5a5f", white: "#f8f8ff", green: "#058c42" };


export default function EditableField({
  icon: Icon, label, value, accent = C.red, keyboardType = "default", setValue
}: {
  icon: any; label: string; value: string; accent?: string; keyboardType?: any; setValue : any
}) {
  const [editing, setEditing] = useState(false);
  const [val, setVal]         = useState(value);
  const [saved, setSaved]     = useState(false);

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setValue(val)
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <View style={styles.fieldWrap}>
      <View style={[styles.fieldIcon, { backgroundColor: accent + "18" }]}>
        <Icon color={accent} size={16} />
      </View>
      <View style={styles.fieldBody}>
        <Text style={styles.fieldLabel}>{label}</Text>
        {editing ? (
          <TextInput
            style={styles.fieldInput}
            value={val}
            onChangeText={setVal}
            autoFocus
            keyboardType={keyboardType}
            onSubmitEditing={handleSave}
            returnKeyType="done"
          />
        ) : (
          <Text style={styles.fieldValue} numberOfLines={1}>{val}</Text>
        )}
      </View>
      <TouchableOpacity
        style={[styles.fieldAction, {
          backgroundColor: saved ? C.green + "18" : editing ? C.green + "18" : accent + "18",
          borderColor:     saved ? C.green + "44" : editing ? C.green + "44" : accent + "33",
        }]}
        onPress={editing ? handleSave : () => setEditing(true)}
      >
        {saved
          ? <Check   color={C.green} size={14} />
          : editing
          ? <Check   color={C.green} size={14} />
          : <Pencil  color={accent}  size={14} />
        }
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  fieldWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },
  fieldIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldBody: {
    flex: 1,
    gap: 2,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "#AAA",
    textTransform: "uppercase",
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: "700",
    color: C.black,
  },
  fieldInput: {
    fontSize: 14,
    fontWeight: "700",
    color: C.black,
    padding: 0,
    borderBottomWidth: 1.5,
    borderBottomColor: C.green,
  },
  fieldAction: {
    width: 30,
    height: 30,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

});