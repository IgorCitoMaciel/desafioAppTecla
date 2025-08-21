# Gerenciador de Usuários

Um aplicativo React Native para gerenciamento de usuários com funcionalidades de CRUD (Create, Read, Update, Delete) e busca avançada.

## 🚀 Funcionalidades

### 📋 Listagem de Usuários

- Visualização em cards com informações detalhadas:
  - Nome
  - Email
  - Endereço
  - Data de Nascimento
- Paginação para navegação eficiente
- Layout responsivo e moderno

### 🔍 Busca Avançada

- Busca com autocompletar
- Filtros por:
  - Nome
  - Email
  - Listagem completa
- Sugestões em tempo real durante a digitação
- Limite de 5 sugestões por vez para melhor usabilidade

### ✏️ Gerenciamento de Usuários

- Criação de novos usuários
- Edição de usuários existentes
- Exclusão de usuários com confirmação
- Validação de dados

### 💅 Interface

- Design moderno e intuitivo
- Feedback visual para ações do usuário
- Cards com sombras e cantos arredondados
- Ícones intuitivos para ações
- Cores consistentes e agradáveis

## 🛠️ Tecnologias Utilizadas

- React Native
- TypeScript
- Styled Components
- React Native Vector Icons
- Context API para gerenciamento de estado

## 📦 Estrutura do Projeto

```
src/
├── components/
│   ├── SearchBar/      # Componente de busca com autocompletar
│   ├── UserCard/       # Card de exibição do usuário
│   ├── UserForm/       # Formulário de criação/edição
│   └── Pagination/     # Navegação entre páginas
├── services/
│   └── api/           # Configuração e chamadas da API
├── shared/
│   └── theme/         # Temas e cores do aplicativo
├── hooks/
│   └── useUsers/      # Hook personalizado para gerenciamento de usuários
└── pages/
    └── Home/          # Página principal do aplicativo
```

## 🚀 Como Executar

1. Clone o repositório

```bash
git clone [url-do-repositorio]
```

2. Instale as dependências

```bash
npm install
# ou
yarn install
```

3. Execute o projeto

```bash
npm start
# ou
yarn start
```

## 📱 Funcionalidades da Interface

### Busca de Usuários

- Digite no campo de busca para ver sugestões
- Selecione entre busca por nome ou email
- Clique em uma sugestão para selecioná-la
- Use o botão 'X' para limpar a busca

### Gerenciamento de Usuários

- Clique no '+' para adicionar novo usuário
- Use o ícone de lápis para editar
- Use o ícone de lixeira para excluir
- Confirme as ações quando solicitado

### Navegação

- Use os botões de paginação para navegar entre as páginas
- Visualize o número total de páginas
- Acompanhe a página atual
