class Book {
    constructor(title, author, pageno, read) {
        this.title = title;
        this.author = author;
        this.pageno = pageno;
        this.read = read;
    }
}

class Library {
    constructor() {
        this.books = [];
        this.libraryElement = document.querySelector(".library");
        this.newBookForm = document.querySelector(".new-book-popup");
        this.modifyBookForm = document.querySelector(".modify-book-popup");
        this.currentBookIndex = null;

        document.querySelector(".new-book-btn").addEventListener("click", () => this.newBookForm.showModal());
        this.newBookForm.querySelector(".submit-form-btn").addEventListener("click", (event) => this.addBook(event));
        this.modifyBookForm.querySelector(".submit-form-btn").addEventListener("click", (event) => this.modifyBook(event));
    }

    addBook(event) {
        if (this.newBookForm.querySelector("#title").value === '') return;
        event.preventDefault();
        
        const newBook = new Book(
            this.newBookForm.querySelector("#title").value,
            this.newBookForm.querySelector("#author").value,
            this.newBookForm.querySelector("#pageno").value,
            this.newBookForm.querySelector("#read").checked
        );
        
        this.books.push(newBook);
        this.renderBookCard(newBook);
        this.clearForm(this.newBookForm);
        this.newBookForm.close();
    }

    showModifyForm(book) {
        this.currentBookIndex = this.books.indexOf(book);
        this.fillForm(this.modifyBookForm, book);
        this.modifyBookForm.showModal();
    }

    modifyBook(event) {
        event.preventDefault();
        
        const book = this.books[this.currentBookIndex];
        book.title = this.modifyBookForm.querySelector("#title").value;
        book.author = this.modifyBookForm.querySelector("#author").value;
        book.pageno = this.modifyBookForm.querySelector("#pageno").value;
        book.read = this.modifyBookForm.querySelector("#read").checked;
        
        this.updateBookCard(this.currentBookIndex);
        this.modifyBookForm.close();
    }

    updateBookCard(index) {
        const bookCard = this.libraryElement.children[index];
        const book = this.books[index];
        const readElement = bookCard.querySelector(".read");

        bookCard.querySelector(".title").innerText = book.title;
        bookCard.querySelector(".author").innerText = `Author: ${book.author}`;
        bookCard.querySelector(".pageno").innerText = `Number of Pages: ${book.pageno}`;
        readElement.innerText = this.getReadText(book);
        readElement.setAttribute("data-read", book.read);
    }

    removeBook(bookCard) {
        const index = Array.prototype.indexOf.call(this.libraryElement.children, bookCard);
        this.books.splice(index, 1);
        bookCard.remove();
    }

    renderBookCard(book) {
        const div = document.createElement("div");
        div.classList.add("book");

        const h3 = document.createElement("h3");
        h3.innerText = book.title;
        h3.classList.add("title");

        const ul = document.createElement("ul");
        
        const author = document.createElement("li");
        author.innerText = `Author: ${book.author}`;
        author.classList.add("author");
        
        const pageno = document.createElement("li");
        pageno.innerText = `Number of Pages: ${book.pageno}`;
        pageno.classList.add("pageno");
        
        const read = document.createElement("li");
        read.innerText = this.getReadText(book);
        read.classList.add("read");
        read.setAttribute("data-read", book.read);
        
        const deleteButton = document.createElement("button");
        deleteButton.innerText = 'Remove Book';
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => this.removeBook(div));

        const editButton = document.createElement("button");
        editButton.innerText = 'Edit Book Info';
        editButton.classList.add("edit-button");
        editButton.addEventListener("click", () => this.showModifyForm(book));

        ul.append(author, pageno, read);
        div.append(h3, ul, editButton, deleteButton);
        this.libraryElement.appendChild(div);
    }

    fillForm(form, book) {
        form.querySelector("#title").value = book.title;
        form.querySelector("#author").value = book.author;
        form.querySelector("#pageno").value = book.pageno;
        form.querySelector("#read").checked = book.read;
    }

    clearForm(form) {
        form.querySelector("#title").value = '';
        form.querySelector("#author").value = '';
        form.querySelector("#pageno").value = '';
        form.querySelector("#read").checked = false;
    }

    getReadText(book) {
        return book.read ? `Read Yet?: Yes` : `Read Yet?: No`;
    }
}

const myLibrary = new Library();
