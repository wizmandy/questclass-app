import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RewardBadge } from "../../components/RewardBadge";
import { quests } from "../../mocks/quests";
import { colors, fonts } from "../../theme";

export default function MissionDetails() {
  const { id, origem } = useLocalSearchParams<{ id: string; origem?: string }>();
  const quest = quests.find((item) => item.id === id);

  function handleBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }

  if (!quest) {
    return (
      <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
        <View style={styles.content}>
          <Text style={styles.title}>Missão não encontrada</Text>
          <Text style={styles.description}>Confira o identificador no endereço.</Text>
          <Link href="/" replace asChild>
            <Pressable style={styles.button} accessibilityRole="button">
              <Text style={styles.buttonText}>Ir para Jornada</Text>
            </Pressable>
          </Link>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
      <Stack.Screen options={{ title: quest.title }} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>DETALHES DA MISSÃO</Text>
        <Text style={styles.title}>{quest.title}</Text>
        <Text style={styles.origin}>
          Origem: {origem === "jornada" ? "Jornada" : "Link direto"}
        </Text>
        <View style={styles.card}>
          <Text style={styles.description}>{quest.description}</Text>
          <Text style={styles.metadata}>Dificuldade: {quest.difficulty}</Text>
          {quest.dueDate && (
            <Text style={styles.metadata}>Entrega: {quest.dueDate}</Text>
          )}
          <Text style={styles.label}>RECOMPENSAS</Text>
          <View style={styles.rewards}>
            <RewardBadge amount={quest.reward.xp} kind="xp" />
            <RewardBadge amount={quest.reward.coins} kind="coins" />
          </View>
        </View>
        <Pressable onPress={handleBack} style={styles.button} accessibilityRole="button">
          <Text style={styles.buttonText}>Voltar</Text>
        </Pressable>
        <Text style={styles.caption}>ID recebido: {id}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    padding: 20, gap: 20, width: "100%", maxWidth: 600, alignSelf: "center",
  },
  eyebrow: { color: colors.purple, fontFamily: fonts.bold, fontSize: 12 },
  title: { color: colors.text, fontFamily: fonts.bold, fontSize: 24, lineHeight: 31 },
  origin: { color: colors.orange, fontFamily: fonts.regular, fontSize: 13 },
  card: {
    padding: 20, gap: 16, borderRadius: 16, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border,
  },
  description: {
    color: colors.text, fontFamily: fonts.regular, fontSize: 16, lineHeight: 25,
  },
  metadata: { color: colors.text, fontFamily: fonts.regular, fontSize: 14 },
  label: { color: colors.purple, fontFamily: fonts.bold, fontSize: 12 },
  rewards: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  button: {
    minHeight: 48, padding: 14, borderRadius: 12,
    backgroundColor: colors.purple, alignItems: "center", justifyContent: "center",
  },
  buttonText: { color: colors.background, fontFamily: fonts.bold, fontSize: 16 },
  caption: { color: colors.text, fontFamily: fonts.regular, fontSize: 12 },
});
