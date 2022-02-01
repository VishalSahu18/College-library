
// Constructor 

class Book {
    constructor(user_id, name, author, type) {
        this.user_id = user_id;
        this.name = name;
        this.author = author;
        this.type = type;
        
    }
}

// Display Constructor

class Display {

    constructor() {
    }

    //Add method to display prototype
    add(book) {

      let data = localStorage.getItem('books');
      let arr;
      
      if(data!=null){
          arr = JSON.parse(data);
      }else{
          arr = [];
      }
      
      arr.push(book);
      localStorage.setItem('books',JSON.stringify(arr));
      
    }


    //Implementing validate function 
    validate(book) {

    if (book.user_id.length < 3 || book.name.length < 3 || book.author.length < 3) {
            return false;
        }

        return true;
    }


    //Implementing show function 
    show(type, txt) {
    
        let msg = document.getElementById('message');
       
        let boldTxt = '';

        if (type == 'success') {
            boldTxt = "Success";
        }else {
            boldTxt = "Error";
        }

        msg.innerHTML = `  <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>${boldTxt}</strong>  ${txt}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                           </div>         
                     `;


        setTimeout(() => {
            msg.innerHTML = ``;
        }, 5000);


    }

    //Implementing clear function 
    clear() {

        let libraryform = document.getElementById("libraryform");
        libraryform.reset();
    }

    display(){

        let tableBody = document.getElementById('tableBody');
        let data = localStorage.getItem('books');

      let arr;

        if (data != null) {
            arr = JSON.parse(data);
        }else{
            arr = [];
        }

       let uiString = "";

        arr.forEach(function(element,index){
                    
        
            uiString += ` <tr>
                            <td>${index+1}</td>
                            <td>${element.user_id}</td>
                            <td>${element.name}</td>
                            <td>${element.author}</td>
                            <td>${element.type}</td>
                            <td><button id= "${index}" onclick = "deleteBook(this.id)" type="submit" class="btn btn-primary">Delete</button></td>
                            <br>
                          </tr>
                        ` ;

             });
        
        tableBody.innerHTML = uiString;
        localStorage.setItem('books', JSON.stringify(arr));
    
    }

}

let d = new Display();
d.display();

//Add submit event Listener to form

let libraryform = document.getElementById("libraryform");
libraryform.addEventListener('submit', libraryFormSubmit);


function libraryFormSubmit(e) {

    // console.log("Library Form Submitted");

    let user_id = document.getElementById("user_id").value;
    let name = document.getElementById("bookname").value;
    let author = document.getElementById("author").value;

    let bookType = document.getElementById("bookType");

    let input = bookType.getElementsByTagName("input");
    let type = "";

    Array.from(input).forEach(function (e) {
        if (e.checked) {
            type += e.id;
        }
    });


    type = type.replace('_', ' ');


    //    console.log(type);

    let book = new Book(user_id, name, author, type);
//    let d = new Display();

    if (d.validate(book)) {
        d.add(book);
        d.show('success', 'Your book has been successfully added');
        d.clear();
        d.display();
    }else {
        d.show('danger', 'Sorry You cannot add this book');
    }

     e.preventDefault();

}


//Function to Delete a book from a given Listener

 function deleteBook(index){

        let data = localStorage.getItem('books');

        let arr  = [];

      if(data!=null){
          arr = JSON.parse(data);
      }else{
          arr = [];
      }

         arr.splice(index,1);
         localStorage.setItem('books',JSON.stringify(arr));
         d.display();
  }
    






