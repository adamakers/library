const mainContainer = document.querySelector('main .container');

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

  const strArr = libraryArray.map((book, idx) => {
    return `
    <div class="book-tile" data-idx=${idx}>
      <h2>${book.title}</h2>
      <p class="author-name">${book.author}</p>
      <p class="page-count">${book.pages}</p>
      <button class="read-btn ${book.read ? 'has-read' : ''}">${book.read ? 'Read' : 'Not Read'}</button>
      <button class="remove-btn">Remove</button>
    </div>
    `;
  }).join('');

  mainContainer.insertAdjacentHTML('beforeend', strArr);
}

function clearLibraryDisplay() {
  mainContainer.textContent = '';
}


function removeSingleBook(e) {
  if (!e.target.classList.contains('remove-btn')) return;

  const idx = e.target.parentElement.dataset.idx;

  libraryArray.splice(idx, 1);

  updateLibraryDisplay();
}

//toggles the read attribute
function toggleRead(e) {
  if (!e.target.classList.contains('read-btn')) return;

  const idx = e.target.parentElement.dataset.idx;

  libraryArray[idx].changeReadStatus();

  updateLibraryDisplay();
}


//opens modal for adding book
function openAddBookModal() {
  modal.classList.add('active');
}

//exits modal
function exitModal() {
  modal.classList.remove('active');
}

function clearForm() {
  bookTitleInp.value = '';
  bookAuthorInp.value = '';
  bookPagesInp.value = '';
  bookReadStatusInp.checked = false;
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

// For quickly creating new tiles for testing
function quickCreate() {
  for (let i = 0; i < 6; i++) {
    libraryArray.push(new Book(i, i, i, true));
  }

  updateLibraryDisplay();
}



////////// EVENT LISTENERS //////////
addBookBtn.addEventListener('click', openAddBookModal);

clearBookBtn.addEventListener('click', nukeAllBooks);

modalExitBtn.addEventListener('click', exitModal);

formSubmitBtn.addEventListener('click', addBookToLibrary);

mainContainer.addEventListener('click', removeSingleBook)

mainContainer.addEventListener('click', toggleRead)