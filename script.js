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


// const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, "yes");
// console.log(book1.info());