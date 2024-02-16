const title = $("#title"),
    author = $("#author"),
    releaseYear = $("#year"),
    addBtn = $("#add-button"),
    clearBtn = $("#clear-button"),
    bookBox = $("#book-box"),
    infoSection = $(".info-section");

let books,
    bookName,
    authorName,
    bookReleaseYear,
    bookItems,
    bookListJSON,
    bookList = [];

const onLoad = () => {
    bookListJSON = JSON.parse(localStorage.getItem("book-items"));
    if (bookListJSON) {
        bookList = bookListJSON;
        infoSection.removeClass("hidden");
        bookListGenerator(bookList);
    }
}


const addToList = () => {
    if (title.val().length > 0 && author.val().length > 0 && releaseYear.val().length > 0 && !isNaN(releaseYear.val())) {
        infoSection.removeClass("hidden");
        bookItems = {
            id: bookList.length + 1,
            title: title.val(),
            author: author.val(),
            year: releaseYear.val()
        }
        bookList.push(bookItems);
        setItemsInLocalStorage(bookList);
    }
    else {
        Swal.fire ({
            icon: "error",
            title: "Oops ...",
            text: "Please fill out the form correctly !"
        });
    }
}

const setItemsInLocalStorage = (booksArray) => {
    localStorage.setItem("book-items", JSON.stringify(booksArray));
    bookListGenerator(booksArray);
    title.val("");
    author.val("");
    releaseYear.val("");
}

const bookListGenerator = (booksArray) => {
    bookBox.html("");
    booksArray.forEach((book) => {
       books = $("<div>");
       books.addClass("books");
       bookName = $("<span>");
       authorName = $("<span>");
       bookReleaseYear = $("<span>");
       bookName.html(book.title);
       authorName.html(book.author);
       bookReleaseYear.html(book.year);
       books.append(bookName, authorName, bookReleaseYear);
       bookBox.append(books);
    });
}

const clearList = () => {
    infoSection.addClass("hidden");
    bookBox.html("");
    bookList = [];
    localStorage.clear();
}

addBtn.click(addToList);
clearBtn.click(clearList);
$(window).on("load", onLoad);