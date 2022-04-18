const addBookBtn = document.querySelector('.add-book-btn');
const clearBookBtn = document.querySelector('.clear-book-btn');

const modal = document.querySelector('.modal');
const modalExitBtn = document.querySelector('.exit-btn');

// form elements
const bookTitleInp = document.querySelector('#title');
const bookAuthorInp = document.querySelector('#author');
const bookPagesInp = document.querySelector('#pages');
const bookReadStatusInp = document.querySelector('#read-status');
const formSubmitBtn = document.querySelector('.form-btn');

let libraryArray = [];


////////// CONSTRUCTORS //////////
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.changeReadStatus = function () {
  this.read = !this.read;
}

////////// EVENT HANDLERS //////////
function addBookToLibrary(e) {
  e.preventDefault();

  const title = bookTitleInp.value;
  const author = bookAuthorInp.value;
  const pages = bookPagesInp.value;
  const readStatus = bookReadStatusInp.checked;

  libraryArray.push(new Book(title, author, pages, readStatus));

  clearForm();
  exitModal();

  updateLibraryDisplay();
}

//adds book to elements
function updateLibraryDisplay() {

  clearLibraryDisplay();

  const mainContainer = document.querySelector('main .container');

  const strArr = libraryArray.map(book => {
    return `
    <div class="book-tile">
    <h2>${book.title}</h2>
    <p class="author-name">${book.author}</p>
    <p class="read-status ${book.read ? 'has-read' : ''}">${book.read ? 'Completed' : 'In Progress'}</p>
    <button class="read-btn">Not read</button>
    <button class="remove-btn">Remove</button>
    </div>
    `;
  }).join('');

  mainContainer.insertAdjacentHTML('beforeend', strArr);
}

function clearLibraryDisplay() {
  const mainContainer = document.querySelector('main .container');

  mainContainer.textContent = '';
}

function clearForm() {
  bookTitleInp.value = '';
  bookAuthorInp.value = '';
  bookPagesInp.value = '';
  bookReadStatusInp.checked = false;
}

//opens modal for adding book
function openAddBookModal() {
  modal.classList.add('active');
}

//exits modal
function exitModal() {
  modal.classList.remove('active');
}

//removes all books from library and display
function nukeAllBooks() {
  const confirmClear = confirm('Are you sure you want to clear all library books?');

  if (confirmClear) {
    libraryArray = [];
    clearLibraryDisplay();
  }
  return;

}



////////// EVENT LISTENERS //////////
addBookBtn.addEventListener('click', openAddBookModal);

clearBookBtn.addEventListener('click', nukeAllBooks);

modalExitBtn.addEventListener('click', exitModal);

formSubmitBtn.addEventListener('click', addBookToLibrary);


// TODO not read button needs to have different status when book is in progress
// TODO remove book button
// TODO 