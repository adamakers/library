class Book {
  constructor(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  // add book
  // remove book
  // return all book objects (getter)
  books = [];


  static generateISBN() {
    let isbn = '';
    
    for (let i = 0; i < 9; i++) {
      isbn += Math.floor((Math.random() * 9) + 1);
    }
    
    return isbn;
  }

  static addBook(book) {
    book.isbn = generateISBN();
    this.books.push(book);
  }
}

class GUI {
  // render a tile
  static createTile(book) {
    return `
      <div class="book-tile" data-idx=${idx}>
        <h2>${book.title}</h2>
        <p class="author-name">${book.author}</p>
        <p class="page-count">${book.pages} pages</p>
        <p class="page-count">ISBN ${book.isbn}</p>
        <button class="read-btn ${book.read ? 'has-read' : ''}">${book.read ? 'Read' : 'Not Read'}</button>
        <button class="remove-btn">Remove</button>
      </div>
    `;
  }


  //
  static renderLibrary(books) {
    const libraryContainer = document.querySelector('.container');
    
    let libStr = '';
    
    books.forEach( book => {
      libStr += this.createTile(book);
    });

    libraryContainer.insertAdjacentHTML('afterbegin', libStr);
  }
}

