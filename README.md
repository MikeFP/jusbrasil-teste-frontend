# Teste front-end JusBrasil

Um website SPA (*Single Page Application*) para pesquisar e visualizar as informações de processos jurídicos por CNJ, utilizando a API da Digesto.

## Requisitos

Para construir o projeto, é necessário ter o [Node](https://nodejs.org/en/download/) instalado na máquina, que já inclui o [NPM](https://www.npmjs.com/).

## Instalação

Acesse a pasta raiz do projeto no terminal e rode o comando:

```sh
npm install
```

## Servir website localmente

Para rodar o projeto em um servidor local, use:

```sh
npm run dev
```

O website estará disponível no endereço http://localhost:3000/.

# Para desenvolvedores

Este projeto foi desenvolvido utilizando o framework [Vue.js](https://vuejs.org/) configurado com Typescript e o [Vite](https://vitejs.dev/) como servidor de desenvolvimento e *bundler*.

## Configuração de IDE recomendada

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (e desabilite o Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Suporte para tipagem de arquivos `.vue` em TS

O Typescript não lida com informações de tipo em arquivos `.vue` por padrão, então o Vue substitui o CLI `tsc` com `vue-tsc` para verificar os tipos. Em editores, é preciso do [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) para tornar o servidor de linguagem do Typescript ciente dos tipos `.vue`.

Se o plugin Typescript não for rápido suficiente para você, o Volar implementou o [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669), que possui melhor performance. Você pode habilitar da seguinte forma:

1. Desabilite a extensão de TypeScript interna
    1) Rode `Extensions: Show Built-in Extensions` na paleta de comandos do VSCode.
    2) Encontre `TypeScript and JavaScript Language Features`, clique com o lado direito e selecione `Disable (Workspace)`.
2. Recarregue a janela do VSCode ao rodar `Developer: Reload Window` na paleta de comandos.

## Personalizar configurações

Veja [Vite Configuration Reference](https://vitejs.dev/config/).

## Rodar o projeto

```sh
npm install
```

### Compilar e *Hot Reload* para Desenvolvimento

```sh
npm run dev
```

### Checar tipos, compilar e minificar para Produção

```sh
npm run build
```

### Rodar Testes Unitários com [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Rodar Linter [ESLint](https://eslint.org/)

```sh
npm run lint
```
