import { Stack } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, fonts } from "../theme";

type Missao = {
    id: number;
    title: string;
    body: string;
};

export default function MissoesRoute(){
    const [missoes, setMissoes] = useState<Missao[]>([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    //Função para buscar as missões da API
    async function buscarMissoes() {
        setCarregando(true);
        setErro("");

        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
            if(!response.ok){
                throw new Error("Erro ao buscar missões");
            }
            const data = await response.json();
            setMissoes(data);
        }catch (batata: any){
            setErro(batata.message);
        }finally{
            setCarregando(false);
        }
    }

    return (
            <SafeAreaView style={styles.screen}
                edges={["bottom", "left", "right"]}>
                <Stack.Screen options={{ title: "Missões da API" }} />
                <View style={styles.header}>
                    <Button title="Carregar missões"
                        onPress={buscarMissoes} disabled={carregando} />
                    {carregando && <ActivityIndicator color={colors.purple} />}
                    {!!erro && <Text style={styles.body}>{erro}</Text>}
                </View>
                {
                    <FlatList
                        data={missoes}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.list}
                        renderItem={
                            ({item}) => (
                                <View style={styles.card}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.body}>{item.body}</Text>
                                </View>
                            )
                        }
                    />
                }
            </SafeAreaView>
        );
}

const styles = StyleSheet.create({
        screen: {
            flex: 1,
            backgroundColor: colors.background
        },
        header: {
            padding: 20,
            gap: 12
        },
        list: {
            padding: 20,
            gap: 16
        },
        card: {
            padding: 16,
            gap: 8,
            borderRadius: 12,
            backgroundColor: colors.surface
        },
        title: {
            color: colors.text,
            fontFamily: fonts.bold,
            fontSize: 18
        },
        body: {
            color: colors.text,
            fontFamily: fonts.regular,
            fontSize: 16,
            lineHeight: 24
        }
    });