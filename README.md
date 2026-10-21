# QuestClass — Navegação em Stack

Base da turma ao final da aula de navegação com Expo Router e TypeScript. O aplicativo abre a Jornada, envia o ID e a origem ao tocar na missão e consulta os dados locais na tela de detalhes.

Esta versão ainda não consome APIs. O consumo de JSON e a criação de uma lista serão desenvolvidos com os alunos na próxima aula.

## Executar

Com Node.js 22.13 ou superior e npm:

```bash
npm ci
npm start
```

Para abrir no navegador, execute `npm run web`. Para executar no celular, use uma versão do Expo Go ou um development build compatível com o Expo SDK 57 e as dependências do projeto.

## Estrutura

```text
src/
  app/
    _layout.tsx       Fontes, StatusBar e Stack
    index.tsx         Rota da Jornada
    missao/[id].tsx   Parâmetros, consulta local e detalhe
  screens/           Jornada
  components/        Componentes visuais reutilizáveis
  mocks/             Missões, jogador e chefe locais
  types/             Tipos dos dados
  theme.ts           Cores e fontes
  utils/             Mensagens de interface
assets/              Imagens e ícones locais
```

O ponto de entrada é `expo-router/entry`. O card usa `router.push` para enviar `id` e `origem`. O detalhe lê `useLocalSearchParams` e encontra a missão com `quests.find`. O botão Voltar usa `router.back`, com retorno à Jornada quando a tela foi aberta sem histórico.

## Conferência da aula

- Toque no Ogro do Estado, confira seus dados e volte para a Jornada.
- Abra `/missao/goblin-das-props` diretamente e confira a outra missão.
- Abra `/missao/inexistente` e use a saída para a Jornada.
- O menu inferior continua demonstrativo. As demais áreas ainda não estão implementadas.

```bash
npm run lint
npm run typecheck
```

## Material

- [Aula de navegação em Stack](https://www.figma.com/slides/5BpWb7Oxaj46TmV7F8S20s).
- [Próxima aula: consumo de APIs e trabalho de acervo de livros](https://www.figma.com/slides/jkc6UJZtDeRZKNbP9Y8VuH).
- [Documentação do Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/).

As apresentações ficam no Figma. O repositório contém a base do aplicativo, sem soluções antecipadas da próxima aula.
