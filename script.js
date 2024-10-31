const myLibrary = [];
const newBookForm = document.querySelector(".new-book-popup");
const modifyBookForm = document.querySelector(".modify-book-popup");
const library = document.querySelector(".library");
let currentBookIndex;

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBookToLibrary() {
    // create new book objects
    const newBook = new Book(
        newBookForm.querySelector("#title").value, 
        newBookForm.querySelector("#author").value, 
        newBookForm.querySelector("#pageno").value, 
        newBookForm.querySelector("#read").checked
    );
    // save object to array
    myLibrary.push(newBook);
    // create book card on display
    renderBookCard(newBook);
    // clear form once submitted
    clearForm(newBookForm);
    // close form
    newBookForm.close();
}

// const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, "yes");
// console.log(book1.info());
// myLibrary.push(book1);

// const book2 = new Book('1984', 'George Orwell', 328, "no");
// console.log(book2.info());
// myLibrary.push(book2);

// // console.log(myLibrary);

// addBookToLibrary();

function showModifyForm (book) {
    // retrieve index for current book
    currentBookIndex = myLibrary.indexOf(book);
    // pre-fill forms
    fillForm(modifyBookForm, book);
    // show form
    modifyBookForm.showModal();
}

function modifyBook () {
    // update existing book in 'myLibrary' array
    myLibrary[currentBookIndex].title = modifyBookForm.querySelector("#title").value;
    myLibrary[currentBookIndex].author = modifyBookForm.querySelector("#author").value;
    myLibrary[currentBookIndex].pages = modifyBookForm.querySelector("#pageno").value;
    myLibrary[currentBookIndex].readStatus = modifyBookForm.querySelector("#read").value;
    updateBookCard(currentBookIndex);
    modifyBookForm.close();
}

function updateBookCard (index) {
    // get index of current book as a child of library
    const bookCard = library.children[index];
    const book = myLibrary[index];

    bookCard.querySelector(".title").innerText = book.title;
    bookCard.querySelector(".author").innerText = `Author: ${book.author}`;
    bookCard.querySelector(".pageno").innerText = `Number of pages: ${book.pageno}`;
    bookCard.querySelector(".read").innerText = getReadStatus(book);
}

function fillForm (form, book) {
    form.querySelector("#title").value = book.title;
    form.querySelector("#author").value = book.author;
    form.querySelector("#pageno").value = book.pageno;
    form.querySelector("#read").checked = book.read;
}

function clearForm (form) {
    form.querySelector("#title").value = '';
    form.querySelector("#author").value = '';
    form.querySelector("#pageno").value = '';
    form.querySelector("#read").checked = false;
}

function getReadStatus (book) {
    return book.readStatus ? `Read status: read` : `Read status: not read`;
}

function removeBook (bookCard) {
    // get index of current book as a child of library
    const index = Array.prototype.indexOf.call(library.children, bookCard);
    // remove book from 'myLibrary' array
    myLibrary.splice(index, 1);
    // remove book from html
    bookCard.remove();
}


function renderBookCard (book) {
    const div = document.createElement("div");
    const h4 = document.createElement("h4");
    const ul = document.createElement("ul");
    const author = document.createElement("li");
    const pageno = document.createElement("li");
    const read = document.createElement("li");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    // define content of card
    h4.innerText = book.title;
    author.innerText = `Author: ${book.author}`;
    pageno.innerText = `Number of pages: ${book.pageno}`;
    read.innerText = getReadStatus(book);
    deleteButton.innerText = 'Remove from library';
    editButton.innerText = 'Edit book';
    
    // append card to library and add class "book"
    library.appendChild(div);
    div.classList.add("book");
    deleteButton.classList.add("delete-button");
    editButton.classList.add("edit-button");
    h4.classList.add("title");
    author.classList.add("author");
    pageno.classList.add("pageno");
    read.classList.add("read");

    // append content to card
    ul.append(author, pageno, read);
    div.append(h4, ul, editButton, deleteButton);

    // Click editButton to bring up modifyBookForm
    editButton.addEventListener("click", ()=> showModifyForm(book));

    // Click deleteButton to remove book from library
    deleteButton.addEventListener("click", ()=> removeBook(div));
}

//Click button to bring up newBookForm
document.querySelector(".new-book-btn").addEventListener("click", ()=> newBookForm.showModal());

//Click button to add book to library
newBookForm.querySelector(".submit-form-btn").addEventListener("click", (event)=> {
    if(newBookForm.querySelector("#title").value !== ''){
        event.preventDefault();
        addBookToLibrary();
    }    
});

//Click button to save modified book to library
modifyBookForm.querySelector(".submit-form-btn").addEventListener("click", (event)=> {
    event.preventDefault();
    modifyBook();
});