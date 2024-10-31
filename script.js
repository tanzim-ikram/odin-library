const myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.info = function () {
        if (readStatus === "yes") {
            return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.readStatus + " done reading.";
        }
        else {
            return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.readStatus + " read yet.";
        }
    }
}

function addBookToLibrary() {
    // display all values
    for (let i in myLibrary) {
        console.log(myLibrary[i].title);
    }
  }

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, "yes");
console.log(book1.info());
myLibrary.push(book1);

const book2 = new Book('1984', 'George Orwell', 328, "no");
console.log(book2.info());
myLibrary.push(book2);

// console.log(myLibrary);

addBookToLibrary();