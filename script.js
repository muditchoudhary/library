let myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
//   Take user input for the book
// Store the book object into the array

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
    bookInputForm.style.display = 'none';
}

// Button to add new books
const addBookBtn = document.querySelector('.add-btn');
addBookBtn.addEventListener('click', showInputForm);

const closeFromBtn = document.querySelector('.close');
closeFromBtn.addEventListener('click', hideInputForm);
// Button on book display to remove a book
// Need to assiociate actual book with dom with data atribute
// Button on book display to change book read status
// function to change that book object read status


const bookInputForm = document.querySelector('.user-input-form');