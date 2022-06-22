class Book {
  constructor(title, author, pages, read) {
    this.title = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  updateReadStatus() {
    this.read = !this.read;
  }
}

// Library class to hold collection of books
class Library {
  static books = [];

  static generateISBN() {
    let isbn = '';
    
    for (let i = 0; i < 9; i++) {
      isbn += Math.floor((Math.random() * 9) + 1);
    }
    
    return isbn;
  }

  static addBook(book) {
    book.isbn = this.generateISBN();
    this.books.push(book);
  }

  static removeBook(isbn) {
    this.books = this.books.filter( book => book.isbn != isbn);
  }

  static clearBooks() {
    this.books = [];
  }
}

// GUI to handle all drawing events
class GUI {
  // render a tile
  static createTile(book) {
    return `
      <div class="book-tile" data-isbn=${book.isbn}>
        <h2>${book.title}</h2>
        <p class="author-name">${book.author}</p>
        <p class="page-count">${book.pages} pages</p>
        <p class="page-count">ISBN ${book.isbn}</p>
        <button class="read-btn ${book.read ? 'has-read' : ''}">${book.read ? 'Read' : 'Not Read'}</button>
        <button class="remove-btn">Remove</button>
      </div>
    `;
  }

  // draw all books
  static renderLibrary(books) {
    const libraryContainer = document.querySelector('.book-container');
    
    let libStr = '';
    
    this.clearLibraryEl();

    books.forEach( book => {
      libStr += this.createTile(book);
    });
    
    libraryContainer.insertAdjacentHTML('afterbegin', libStr);
  }
  
  static clearLibraryEl() {
    const libraryContainer = document.querySelector('.book-container');
    libraryContainer.innerHTML = '';
  }

  // show modal
  static showModal() {
    document.querySelector('.modal').classList.add('active');
  }
  
  static hideModal() {
    const modal = document.querySelector('.modal');
    modal.querySelectorAll('input').forEach(item => {
      item.checked = false;
      item.value = '';
    });
    document.querySelector('.modal').classList.remove('active');
  }
}

class Events {
  static addBookBtn = document.querySelector('.add-book-btn');
  static clearBookBtn = document.querySelector('.clear-book-btn');
  static formSubmitBtn = document.querySelector('.form-btn');
  static formExitBtn = document.querySelector('.exit-btn');
  static bookContainerEl = document.querySelector('.book-container');


  static addBookHandler(e) {
    GUI.showModal();
  }

  static clearBookHandler(e) {
    Library.clearBooks();
    GUI.renderLibrary(Library.books);
  }

  static formSubmitHandler(e) {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const readStatus = document.querySelector('#read-status').checked;
  
    const book = new Book(title, author, pages, readStatus);
    Library.addBook(book);
  
    GUI.renderLibrary(Library.books);
    GUI.hideModal();
  }

  static formExitHandler(e) {
    GUI.hideModal();
  }

  static tileButtonsHandler(e) {
    if (e.target.classList.contains('read-btn')) {
      const clickedISBN = e.target.parentElement.dataset.isbn;
      const bookIdx = Library.books.findIndex( book => book.isbn === clickedISBN);
  
      Library.books[bookIdx].updateReadStatus();
      GUI.renderLibrary(Library.books);
    } else if (e.target.classList.contains('remove-btn')) {
      const clickedISBN = e.target.parentElement.dataset.isbn;
  
      Library.removeBook(clickedISBN);
      GUI.renderLibrary(Library.books);
    }
  }

  static enableAllHandlers() {
    this.addBookBtn.addEventListener('click', this.addBookHandler);
    this.clearBookBtn.addEventListener('click', this.clearBookHandler);
    this.formSubmitBtn.addEventListener('click', this.formSubmitHandler);
    this.formExitBtn.addEventListener('click', this.formExitHandler);
    this.bookContainerEl.addEventListener('click', this.tileButtonsHandler);
  }
}

Events.enableAllHandlers();
