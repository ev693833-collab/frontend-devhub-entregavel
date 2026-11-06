# BookHub — Gerenciador de Obras Literárias

O **BookHub** é uma aplicação web moderna, responsiva e intuitiva desenvolvida para catalogar e gerenciar acervos de livros e obras literárias. O sistema permite cadastrar, listar e excluir títulos com feedback visual imediato e persistência de dados localmente no navegador.

---

## 🎯 Objetivo do Projeto

Atender aos requisitos de entrega da disciplina / atividade prática de Front-end:
1. **Estrutura básica em HTML5**: marcação semântica, acessível e organizada.
2. **Estilização com CSS3**: arquivo externo desacoplado, layout responsivo com Grid e Flexbox, design clean e agradável.
3. **Interações dinâmicas com JavaScript**: arquivo externo desacoplado, validação de campos, manipulação dinâmica do DOM e persistência com `LocalStorage`.
4. **Interface visual completa**: tela com cabeçalho/título, formulário de cadastro de livros e grade de listagem de obras com ação de exclusão.
5. **Organização em pasta `frontend`**: modularização clara da camada visual.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando **tecnologias nativas (Vanilla)**, garantindo leveza, compatibilidade e performance máxima sem necessidade de frameworks pesados:

- **HTML5 Semântico**: Uso de tags semânticas (`header`, `main`, `section`, `article`, `footer`, `form`, `label`, `input`, `select`, `textarea`).
- **CSS3 Moderno**: CSS Grid, Flexbox, Variáveis CSS (Custom Properties), tipografia responsiva e efeitos de transição fluidos.
- **JavaScript (ES6+)**: Manipulação de eventos, criação e remoção de elementos no DOM, validações preventivas e persistência via `localStorage`.

---

## 📁 Estrutura de Pastas e Arquivos

```text
devhub-entregavel/
│
├── frontend/
│   ├── index.html          # Estrutura da página (HTML5)
│   ├── css/
│   │   └── style.css       # Folha de estilos visual (CSS3)
│   └── js/
│       └── script.js       # Regras de negócio e interações (JavaScript ES6+)
│
├── .gitignore              # Arquivos ignorados pelo Git
└── README.md               # Documentação completa do projeto
```

---

## 🖥️ Funcionalidades da Aplicação

1. **Formulário de Cadastro**:
   - Título da obra (obrigatório)
   - Autor (obrigatório)
   - Categoria/Gênero (seleção pré-definida com diversas opções)
   - Ano de publicação (com validação numérica e limites)
   - Sinopse / Descrição da obra (opcional)
   - Validações em tempo real com mensagens de erro visuais.

2. **Listagem de Obras**:
   - Renderização dinâmica em cartões (cards) organizados em grid responsivo.
   - Badge com gênero literário, autor com ícone e ano em destaque.
   - Contador dinâmico de obras no cabeçalho.
   - Estado vazio (*empty state*) exibido de forma amigável quando não houver livros cadastrados.

3. **Exclusão de Livros**:
   - Botão para remover obras individualmente com atualização instantânea na tela.

4. **Persistência no Navegador**:
   - Todas as inclusões e exclusões são salvas no `LocalStorage`, permanecendo disponíveis ao recarregar a página.

---

## 💻 Como Executar Localmente

### Opção 1: Execução Direta no Navegador
1. Entre na pasta `frontend/`.
2. Dê um duplo clique no arquivo `index.html` (ou clique com botão direito e selecione seu navegador preferido).

### Opção 2: Live Server (VS Code)
1. Abra o diretório do projeto no **Visual Studio Code**.
2. Clique com o botão direito no arquivo `frontend/index.html`.
3. Escolha **"Open with Live Server"**.

---

## 📤 Como Publicar o Código no GitHub

Para publicar este projeto em um novo repositório no seu GitHub, siga os passos abaixo no terminal:

```bash
# 1. Certifique-se de estar na raiz do projeto:
cd "c:\Users\Pedro Henrique\Desktop\Devhub\devhub entregavel"

# 2. Adicione os arquivos ao Git:
git add .

# 3. Crie o primeiro commit:
git commit -m "feat: primeira versao visual do BookHub (frontend)"

# 4. Crie um novo repositório vazio no GitHub (ex: bookhub-frontend)

# 5. Conecte o repositório remoto:
git remote add origin https://github.com/ev693833-collab/frontend-devhub-entregavel.git

# 6. Envie o código para o GitHub:
git branch -M main
git push -u origin main
```
