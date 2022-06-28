class Library {
	constructor() {
		this.libraryStorage = [];
	}

	addBookToLibrary(book) {
		this.libraryStorage.push(book);
	}

	getLibraryStorage() {
		return this.libraryStorage;
	}
}

class Book {
	constructor(title, author, pages, status) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.status = status;
	}
}

class Dom {
	#values = [];
	#bookIconImg = "Assets/Icon/book-svgrepo-com.svg";
	#bookIconAlt = "Book Icon";
	#deleteIconImg = "Assets/Icon/delete-svgrepo-com.svg";
	#deleteIconAlt = "Delete Icon";
	constructor() {
		this.self = this;
		this.addBtn = document.querySelector(".add-btn");
		this.closeBtn = document.querySelector(".close");
		this.submitBtn = document.querySelector(".submit");
		this.deleteBtn = document.querySelectorAll(".remove");
		this.form = document.querySelector(".user-input-form");
		this.bookShelfBody = document.querySelector(".shelf-body");

		this.addBtn.addEventListener("click", () => {
			this.#showForm(this.form);
		});

		this.submitBtn.addEventListener("click", (event) => {
			this.#submitForm(event);
		});

		this.closeBtn.addEventListener("click", () => this.#closeForm());
	}

	#showForm(form) {
		form.style.display = "block";
	}

	#closeForm() {
		this.#resetValues("read", "not-read", "title", "author", "pages");
		this.form.style.display = "none";
	}

	#submitForm(event) {
		event.preventDefault();
		this.#getValues("read", "not-read", "title", "author", "pages");
		if (!this.#isFormEmpty()) {
			// Creating a new book object
			const [title, author, pages, status] = [
				this.#values[0],
				this.#values[1],
				this.#values[2],
				this.#values[3],
			];
			const book = new Book(title, author, pages, status);
			myLibrary.addBookToLibrary(book);
			// Closing form and reset values
			this.#closeForm();

			const storage = myLibrary.getLibraryStorage();
			this.displayBook(storage[storage.length - 1]);
		} else {
			alert("Please fill all the fields");
			this.#values = [];
		}
	}

	#getValues(read, notRead, ...inputTags) {
		inputTags.forEach((tag, index) => {
			const value = document.querySelector(`#${tag}`).value;
			this.#values.push(value);
		});

		const isRead = document.querySelector(`#${read}`).checked;
		const isNotReadYet = document.querySelector(`#${notRead}`).checked;
		if (isRead === true) {
			this.#values.push("Read");
		} else if (isNotReadYet === true) {
			this.#values.push("Not read yet");
		} else {
			this.#values.push("");
		}
	}

	#resetValues(read, notRead, ...inputTags) {
		inputTags.forEach((tag, index) => {
			document.querySelector(`#${tag}`).value = "";
		});

		const isRead = (document.querySelector(`#${read}`).checked = false);
		const isNotReadYet = (document.querySelector(
			`#${notRead}`
		).checked = false);
		this.#values = [];
	}

	#isFormEmpty() {
		return this.#values.includes("");
	}

	displayBook(book) {
		const bookRow = document.createElement("div");
		bookRow.classList.add("book");
		const storage = myLibrary.getLibraryStorage();
		const endBookIndex = storage.indexOf(storage[storage.length - 1]);
		bookRow.setAttribute(
			"data-index",
			endBookIndex
			// `${myLibrary.indexOf(myLibrary[myLibrary.length - 1])}`
		);

		const bookIcon = document.createElement("IMG");
		bookIcon.src = this.#bookIconImg;
		bookIcon.alt = this.#bookIconAlt;
		bookIcon.classList.add("book-icon");

		const deleteIcon = document.createElement("IMG");
		deleteIcon.src = this.#deleteIconImg;
		deleteIcon.alt = this.#deleteIconAlt;
		deleteIcon.classList.add("icon");
		deleteIcon.classList.add("remove");
		deleteIcon.addEventListener("click", (event) => {
			this.#delteBook(event);
		});

		const spans = [];
		for (let i = 0; i < 4; i++) {
			spans.push(document.createElement("span"));
		}
		const spanClasess = ["title", "author", "pages", "status"];
		let j = 0;
		for (let key in book) {
			spans[j].classList.add(spanClasess[j]);
			spans[j].textContent = book[key];
			// If statement for adding click event on
			// status span elmement. To change status
			if (spans[j].className === "status") {
				const statusSpan = spans[j];
				statusSpan.addEventListener("click", (event) => {
					this.#toogleReadStatus(event);
				});
				if (book["status"] === "Read") {
					statusSpan.classList.add("read");
				} else {
					statusSpan.classList.add("not-read");
				}
			}
			j++;
		}
		let bookRowChilds = [bookIcon];
		spans.forEach((span) => {
			bookRowChilds.push(span);
		});
		bookRowChilds.push(deleteIcon);

		for (let i = 0; i < bookRowChilds.length; i++) {
			bookRow.appendChild(bookRowChilds[i]);
		}

		this.bookShelfBody.appendChild(bookRow);
	}

	#delteBook(event) {
		const bookDataAttributeIndex = event
			.composedPath()[1]
			.getAttribute("data-index");
		const bookRow = event.composedPath()[1];
		bookRow.remove();

		myLibrary
			.getLibraryStorage()
			.splice(parseInt(bookDataAttributeIndex), 1);

		// The for loop is for matching data-index value of remaining book divs
		// with the book objects index on myLibrary.
		// As if a book removes from the middle of an array, book's object index
		// on myLibrary changed but thier corrosponding book div's data-index value
		// doesn't changes
		const bookDivNodes = document.querySelectorAll(".book");
		for (let i = 0; i < bookDivNodes.length; i++) {
			bookDivNodes[i].setAttribute("data-index", `${i}`);
		}
	}

	#toogleReadStatus(event) {
		const bookDataAttributeIndex = event
			.composedPath()[1]
			.getAttribute("data-index");
		const bookObject =
			myLibrary.getLibraryStorage()[bookDataAttributeIndex];
		const statusSpan = event.composedPath()[0];

		if (bookObject.status.toLowerCase() === "read") {
			bookObject.status = "Not read yet";
			statusSpan.classList.remove("read");
			statusSpan.classList.add("not-read");
		} else {
			bookObject.status = "Read";
			statusSpan.classList.remove("not-read");
			statusSpan.classList.add("read");
		}

		statusSpan.innerText = bookObject.status;
	}
}

let myLibrary = new Library();
let dom = new Dom();

// Default book
const book = new Book("The Hobbit", "J.R.R. Tolkein", "295", "Not read yet");
myLibrary.addBookToLibrary(book);
dom.displayBook(
	myLibrary.getLibraryStorage()[myLibrary.getLibraryStorage().length - 1]
);
