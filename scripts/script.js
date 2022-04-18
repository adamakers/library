const addBookBtn = document.querySelector('.add-book-btn');
const clearBookBtn = document.querySelector('.clear-book-btn');

const modal = document.querySelector('.modal');
const modalExitBtn = document.querySelector('.exit-btn');

// ARRAY OF BOOKS
const libraryArray = [];

function Book(title, author, pages, read) {
  this.title = tile;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.changeReadStatus = function () {
  this.read = !this.read;
}


//opens modal for adding book
function openAddBookModal() {
  modal.classList.add('active');
}

//exits modal
function exitModal() {
  modal.classList.remove('active');
}

//adds book to elements




addBookBtn.addEventListener('click', openAddBookModal);

modalExitBtn.addEventListener('click', exitModal);