/**
 * BookHub — Gerenciador de Obras
 * Script principal (script.js)
 * Implementação em Vanilla JavaScript (ES6+)
 */

'use strict';

// =============================================================================
// 1. Constantes e Dados Iniciais
// =============================================================================
const STORAGE_KEY = 'bookhub_obras_v1';

/**
 * Obras fictícias iniciais para demonstrar o funcionamento da interface
 * caso o usuário acesse a plataforma pela primeira vez.
 */
const INITIAL_BOOKS = [
    {
        id: 'book-init-1',
        title: 'Dom Casmurro',
        author: 'Machado de Assis',
        genre: 'Literatura Clássica',
        year: 1899,
        description: 'Obra-prima do realismo brasileiro. Narra as memórias de Bento Santiago e as complexidades de seu relacionamento com Capitu sob a ótica do ciúme e da dúvida.'
    },
    {
        id: 'book-init-2',
        title: '1984',
        author: 'George Orwell',
        genre: 'Ficção Científica',
        year: 1949,
        description: 'Um clássico distópico que retrata um regime totalitário sob a vigilância constante do Grande Irmão, abordando censura e manipulação histórica.'
    },
    {
        id: 'book-init-3',
        title: 'O Pequeno Príncipe',
        author: 'Antoine de Saint-Exupéry',
        genre: 'Filosofia',
        year: 1943,
        description: 'Uma fábula poética e sensível sobre infância, amizade, amor e a essência invisível aos olhos que conecta as pessoas.'
    }
];

// =============================================================================
// 2. Elementos do DOM
// =============================================================================
const DOM = {
    form: document.getElementById('bookForm'),
    titleInput: document.getElementById('bookTitle'),
    authorInput: document.getElementById('bookAuthor'),
    genreSelect: document.getElementById('bookGenre'),
    yearInput: document.getElementById('bookYear'),
    descriptionInput: document.getElementById('bookDescription'),
    booksGrid: document.getElementById('booksGrid'),
    emptyState: document.getElementById('emptyState'),
    totalBooksCount: document.getElementById('totalBooksCount'),
    toastNotification: document.getElementById('toastNotification'),
    errorTitle: document.getElementById('errorTitle'),
    errorAuthor: document.getElementById('errorAuthor'),
    errorGenre: document.getElementById('errorGenre'),
    errorYear: document.getElementById('errorYear')
};

let toastTimeout = null;

// =============================================================================
// 3. Persistência no LocalStorage
// =============================================================================

/**
 * Obtém a lista de obras salvas no LocalStorage.
 * Se for a primeira execução, inicializa com o conjunto de demonstração.
 * @returns {Array<Object>} Lista de obras
 */
function getStoredBooks() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === null) {
            saveBooks(INITIAL_BOOKS);
            return [...INITIAL_BOOKS];
        }
        return JSON.parse(stored) || [];
    } catch (error) {
        console.error('Erro ao ler dados do LocalStorage:', error);
        return [];
    }
}

/**
 * Grava a lista atualizada de obras no LocalStorage.
 * @param {Array<Object>} books - Lista de livros a salvar
 */
function saveBooks(books) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch (error) {
        console.error('Erro ao salvar no LocalStorage:', error);
        showToast('Não foi possível salvar os dados no navegador.', 'error');
    }
}

// =============================================================================
// 4. Validação e Manipulação de Formulário
// =============================================================================

/**
 * Limpa as mensagens e os estilos de erro de todos os campos.
 */
function clearValidationErrors() {
    const errorElements = [DOM.errorTitle, DOM.errorAuthor, DOM.errorGenre, DOM.errorYear];
    errorElements.forEach(el => {
        if (el) el.textContent = '';
    });

    const inputElements = [DOM.titleInput, DOM.authorInput, DOM.genreSelect, DOM.yearInput];
    inputElements.forEach(el => {
        if (el) el.classList.remove('has-error');
    });
}

/**
 * Exibe mensagem de erro e adiciona classe visual a um campo específico.
 * @param {HTMLElement} inputEl Campo de formulário
 * @param {HTMLElement} errorEl Elemento onde a mensagem será exibida
 * @param {string} message Texto do erro
 */
function setFieldError(inputEl, errorEl, message) {
    if (inputEl) inputEl.classList.add('has-error');
    if (errorEl) errorEl.textContent = message;
}

/**
 * Valida os dados fornecidos pelo usuário no formulário.
 * @param {Object} data Dados submetidos
 * @returns {boolean} Retorna true se válido, false caso contrário
 */
function validateBookData(data) {
    clearValidationErrors();
    let isValid = true;
    const currentYear = new Date().getFullYear();

    if (!data.title || data.title.trim() === '') {
        setFieldError(DOM.titleInput, DOM.errorTitle, 'Por favor, informe o título da obra.');
        isValid = false;
    }

    if (!data.author || data.author.trim() === '') {
        setFieldError(DOM.authorInput, DOM.errorAuthor, 'Por favor, informe o nome do autor.');
        isValid = false;
    }

    if (!data.genre || data.genre.trim() === '') {
        setFieldError(DOM.genreSelect, DOM.errorGenre, 'Selecione uma categoria ou gênero.');
        isValid = false;
    }

    const yearNumber = Number(data.year);
    if (!data.year || data.year.trim() === '') {
        setFieldError(DOM.yearInput, DOM.errorYear, 'Informe o ano de publicação.');
        isValid = false;
    } else if (isNaN(yearNumber) || yearNumber < 1 || yearNumber > currentYear + 1) {
        setFieldError(DOM.yearInput, DOM.errorYear, `Ano inválido (deve ser entre 1 e ${currentYear + 1}).`);
        isValid = false;
    }

    return isValid;
}

/**
 * Trata o envio do formulário de cadastro.
 * @param {Event} event 
 */
function handleFormSubmit(event) {
    event.preventDefault();

    const bookData = {
        title: DOM.titleInput.value.trim(),
        author: DOM.authorInput.value.trim(),
        genre: DOM.genreSelect.value.trim(),
        year: DOM.yearInput.value.trim(),
        description: DOM.descriptionInput.value.trim()
    };

    if (!validateBookData(bookData)) {
        return;
    }

    // Criação do objeto da nova obra com id exclusivo
    const newBook = {
        id: 'book-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
        year: parseInt(bookData.year, 10),
        description: bookData.description
    };

    // Adiciona ao início da lista
    const currentBooks = getStoredBooks();
    currentBooks.unshift(newBook);
    saveBooks(currentBooks);

    // Atualiza a visualização
    renderBooks(currentBooks);

    // Reseta o formulário e limpa validações
    DOM.form.reset();
    clearValidationErrors();
    DOM.titleInput.focus();

    showToast(`"${newBook.title}" foi cadastrado com sucesso!`, 'success');
}

// =============================================================================
// 5. Exclusão de Obras
// =============================================================================

/**
 * Remove uma obra pelo seu ID e atualiza a interface.
 * @param {string} id Identificador único da obra
 */
function deleteBook(id) {
    const currentBooks = getStoredBooks();
    const bookToDelete = currentBooks.find(b => b.id === id);

    if (!bookToDelete) return;

    const updatedBooks = currentBooks.filter(b => b.id !== id);
    saveBooks(updatedBooks);
    renderBooks(updatedBooks);

    showToast(`"${bookToDelete.title}" foi removido do acervo.`, 'info');
}

// =============================================================================
// 6. Renderização da Interface
// =============================================================================

/**
 * Constrói de forma segura o elemento de card HTML para uma obra.
 * @param {Object} book Dados da obra
 * @returns {HTMLElement} Elemento article do card
 */
function createBookCardElement(book) {
    const card = document.createElement('article');
    card.className = 'book-card';
    card.setAttribute('data-id', book.id);

    // Cabeçalho do Card
    const header = document.createElement('div');
    header.className = 'book-card-header';

    const genreBadge = document.createElement('span');
    genreBadge.className = 'book-genre-badge';
    genreBadge.textContent = book.genre;
    genreBadge.title = book.genre;

    const yearBadge = document.createElement('span');
    yearBadge.className = 'book-year-badge';
    yearBadge.textContent = book.year;

    header.appendChild(genreBadge);
    header.appendChild(yearBadge);

    // Corpo do Card
    const body = document.createElement('div');
    body.className = 'book-card-body';

    const titleEl = document.createElement('h3');
    titleEl.className = 'book-title';
    titleEl.textContent = book.title;

    const authorEl = document.createElement('p');
    authorEl.className = 'book-author';
    authorEl.innerHTML = `
        <svg class="book-author-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    `;
    const authorText = document.createTextNode(` ${book.author}`);
    authorEl.appendChild(authorText);

    body.appendChild(titleEl);
    body.appendChild(authorEl);

    // Descrição (somente se preenchida)
    if (book.description && book.description.trim() !== '') {
        const descEl = document.createElement('p');
        descEl.className = 'book-description';
        descEl.textContent = book.description;
        body.appendChild(descEl);
    }

    // Rodapé do Card
    const footer = document.createElement('div');
    footer.className = 'book-card-footer';

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn-delete';
    deleteBtn.setAttribute('aria-label', `Excluir obra ${book.title}`);
    deleteBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
        <span>Excluir</span>
    `;

    deleteBtn.addEventListener('click', () => {
        deleteBook(book.id);
    });

    footer.appendChild(deleteBtn);

    // Montagem final
    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(footer);

    return card;
}

/**
 * Renderiza todos os livros na tela ou o estado vazio.
 * Atualiza também o contador geral no cabeçalho.
 * @param {Array<Object>} books Lista de livros a ser renderizada
 */
function renderBooks(books) {
    DOM.booksGrid.innerHTML = '';

    // Atualiza contador
    if (DOM.totalBooksCount) {
        DOM.totalBooksCount.textContent = books.length;
    }

    if (books.length === 0) {
        DOM.emptyState.classList.remove('hidden');
        DOM.booksGrid.classList.add('hidden');
        return;
    }

    DOM.emptyState.classList.add('hidden');
    DOM.booksGrid.classList.remove('hidden');

    const fragment = document.createDocumentFragment();
    books.forEach(book => {
        const card = createBookCardElement(book);
        fragment.appendChild(card);
    });

    DOM.booksGrid.appendChild(fragment);
}

/**
 * Exibe notificação temporária de feedback visual.
 * @param {string} message Texto da notificação
 * @param {'success'|'info'|'error'} type Tipo de toast
 */
function showToast(message, type = 'success') {
    if (!DOM.toastNotification) return;

    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }

    DOM.toastNotification.textContent = message;
    DOM.toastNotification.className = `toast-notification ${type}`;

    toastTimeout = setTimeout(() => {
        DOM.toastNotification.classList.add('hidden');
    }, 4000);
}

// =============================================================================
// 7. Eventos em Tempo Real e Inicialização
// =============================================================================

/**
 * Configura remoção de erro visual à medida que o usuário interage com os campos.
 */
function setupInputValidationListeners() {
    DOM.titleInput.addEventListener('input', () => {
        if (DOM.titleInput.value.trim() !== '') {
            DOM.titleInput.classList.remove('has-error');
            DOM.errorTitle.textContent = '';
        }
    });

    DOM.authorInput.addEventListener('input', () => {
        if (DOM.authorInput.value.trim() !== '') {
            DOM.authorInput.classList.remove('has-error');
            DOM.errorAuthor.textContent = '';
        }
    });

    DOM.genreSelect.addEventListener('change', () => {
        if (DOM.genreSelect.value !== '') {
            DOM.genreSelect.classList.remove('has-error');
            DOM.errorGenre.textContent = '';
        }
    });

    DOM.yearInput.addEventListener('input', () => {
        if (DOM.yearInput.value.trim() !== '') {
            DOM.yearInput.classList.remove('has-error');
            DOM.errorYear.textContent = '';
        }
    });
}

/**
 * Inicialização da aplicação.
 */
function init() {
    DOM.form.addEventListener('submit', handleFormSubmit);
    setupInputValidationListeners();

    // Carrega e renderiza as obras do LocalStorage
    const initialList = getStoredBooks();
    renderBooks(initialList);
}

// Executa a inicialização quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
