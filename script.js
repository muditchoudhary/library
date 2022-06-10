// Global Variables
let myLibrary = [];
let values = [];
inputFieldIds = ['title', 'author', 'pages'];
radioIds = ['read', 'not-read'];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary() {
    const title = values[0];
    const author = values[1];
    const pages = values[2];
    const status = values[3];
    values = [];

    const book = new Book(title, author, pages, status);
    myLibrary.push(book);

    displaybook(myLibrary[myLibrary.length - 1]);
}

function submitForm() {
    getInputTextValues(inputFieldIds);
    checkReadStatus();
    // Clear all the values from input tags
    // It's temporarly because submitting from reloades
    //  the page, myLibrary array gets reset.
    clearInputTextValues(inputFieldIds);
    clearRadioValues(radioIds);

    addBookToLibrary();
}

function getInputTextValues(arrOfInputIds) {
    for (i in arrOfInputIds) {
        const value = document.querySelector(`#${arrOfInputIds[i]}`).value;
        values.push(value);
    }
}

function checkReadStatus() {
    const isRead = document.querySelector('#read').checked;
    if (isRead === true) {
        values.push('Read');
        return;
    }
    values.push('Not read yet');
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

function displaybook(book) {
    const bookRow = document.createElement('div');
    const bookIcon = document.createElement('IMG');
    const deleteIcon = document.createElement('IMG');
    const spans = [];
    for(let i = 0; i < 4; i++) {
        spans.push(document.createElement('span'));
    }

    bookRow.classList.add('book');
    bookRow.setAttribute('data-index', `${myLibrary.indexOf(myLibrary[myLibrary.length -1])}`)

    bookIcon.src = "Assets/Icon/book-svgrepo-com.svg";
    bookIcon.alt = 'Book Icon';
    bookIcon.classList.add('book-icon');
    
    deleteIcon.src = "Assets/Icon/delete-svgrepo-com.svg";
    deleteIcon.alt = 'Delete Icon';
    deleteIcon.classList.add('icon');
    deleteIcon.classList.add('remove');
    deleteIcon.addEventListener('click', removeBook);

    spanClasess = ['title', 'author', 'pages', 'status'];
    j = 0;
    for (let key in book) {
        spans[j].classList.add(spanClasess[j]);
        spans[j].textContent = book[key];
        // If statement for adding click event on
        // status span elmement. To change status
        if (spans[j].className === 'status') {
            spans[j].addEventListener('click', toggleReadStaus);
        }
        j++;
    }

    bookRowChilds = [bookIcon];
    spans.forEach(span => {
        bookRowChilds.push(span);
    });
    bookRowChilds.push(deleteIcon);

    for(let i = 0; i < bookRowChilds.length; i++) {
        bookRow.appendChild(bookRowChilds[i]);
    }

    bookShelfBody.appendChild(bookRow);
}

function showInputForm() {
    bookInputForm.style.display = 'block';
}

function hideInputForm() {
    clearInputTextValues(inputFieldIds);
    clearRadioValues(radioIds);
    bookInputForm.style.display = 'none';
}

function removeBook(e) {
    const bookDataAttributeIndex = e.composedPath()[1].getAttribute('data-index');
    const bookRow = e.composedPath()[1];
    bookRow.remove();

    myLibrary.splice(parseInt(bookDataAttributeIndex), 1);


    // The for loop is for matching data-index value of remaining book divs
    // with the book objects index on myLibrary. 
    // As if a book removes from the middle of an array, book's object index
    // on myLibrary changed but thier corrosponding book div's data-index value
    // doesn't changes
    const bookDivNodes = document.querySelectorAll('.book');
    for (let i = 0; i < bookDivNodes.length; i++) {
        bookDivNodes[i].setAttribute('data-index', `${i}`);
    }
}

function toggleReadStaus(e) {
    bookDataAttributeIndex = e.composedPath()[1].getAttribute('data-index');
    bookObject = myLibrary[bookDataAttributeIndex];
    
    if (bookObject.status.toLowerCase() === 'read') {
        bookObject.status = 'Not read yet';
    } else {
        bookObject.status = 'Read';
    }

    console.log(e.composedPath());
    const statusSpan = e.composedPath()[0];
    statusSpan.innerText = bookObject.status;
}


const addBookBtn = document.querySelector('.add-btn');
addBookBtn.addEventListener('click', showInputForm);

const closeFromBtn = document.querySelector('.close');
closeFromBtn.addEventListener('click', hideInputForm);

const submitBtn = document.querySelector('.submit');
submitBtn.addEventListener('click', submitForm);

const removeBookBtns = document.querySelectorAll('.remove');
removeBookBtns.forEach(btn => btn.addEventListener('click', removeBook));

const bookInputForm = document.querySelector('.user-input-form');
const bookShelfBody = document.querySelector('.shelf-body');

const defaultBook = new Book('The Hobbit', 'J.R.R. Tolkein', 295, 'Not read yet');
myLibrary.push(defaultBook);
displaybook(myLibrary[myLibrary.length - 1]);