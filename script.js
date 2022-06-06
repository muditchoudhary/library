// Global Variables
let myLibrary = [];
let values = [];
inputIds = ['title', 'author', 'pages'];
radioIds = ['read', 'not-read'];

function Book(title, author, pages, status) {
  // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary() {
    //   Take user input for the book
    const title = values[0];
    const author = values[1];
    const pages = values[2];
    const status = values[3];
    values = [];
    // Creating new object of book
    const book = new Book(title, author, pages, status);
// Store the book object into the array
    myLibrary.push(book);
}

function submitForm() {
    // Query all the values from input tags and store in values variable
    getInputTextValues(inputIds);
    checkReadStatus();
    // Clear all the values from input tags
    // It's temporarly because submitting from reloades
    //  the page, myLibrary array gets reset.
    clearInputTextValues(inputIds);
    clearRadioValues(radioIds);

    addBookToLibrary();
}

function getInputTextValues(arr) {
    for (i in arr) {
        const value = document.querySelector(`#${arr[i]}`).value;
        values.push(value);
    }
}

function checkReadStatus() {
    const isRead = document.querySelector('#read').checked;
    if (isRead === true) {
        values.push(isRead);
        return;
    }
    values.push(isRead);
}

function clearInputTextValues(arr) {
    for (i in arr) {
        document.querySelector(`#${arr[i]}`).value = '';
    }
}

function clearRadioValues(arr) {
    for (i in arr) {
        document.querySelector(`#${arr[i]}`).checked = false;
    }
}

function displaybook() {
    // Loop through each book
    // Display books in a formatted way
}

function showInputForm() {
    // Unhide input form
    bookInputForm.style.display = 'block';
}

function hideInputForm() {
    // Hide input form
    clearInputTextValues(inputIds);
    clearRadioValues(radioIds);
    bookInputForm.style.display = 'none';
}

// Button to add new books
const addBookBtn = document.querySelector('.add-btn');
addBookBtn.addEventListener('click', showInputForm);

const closeFromBtn = document.querySelector('.close');
closeFromBtn.addEventListener('click', hideInputForm);

const submitBtn = document.querySelector('.submit');
submitBtn.addEventListener('click', submitForm);
// Button on book display to remove a book
// Need to assiociate actual book with dom with data atribute
// Button on book display to change book read status
// function to change that book object read status


const bookInputForm = document.querySelector('.user-input-form');