// document.onload{

// }
//TODO: When the languages are added, add them in the data right away
//TASK: Create an add/delete button for the languages (Don't forget to delete from database too)
//TASK: create a foreach look to write the notes when the language is pressed
let dropDown = document.querySelector(".dropInfo");
let dropArrow = document.querySelector(".btn-dropdown");
let arrowDown = document.querySelector("i");
let languages = document.querySelectorAll(".lang");
let menu = document.querySelector(".languages");
let body = document.querySelector("body");
let notesSection = document.querySelector(".notes-section");
let notes = document.querySelectorAll(".note");
let noteDetail = document.querySelector(".note-detail");
let closeBtn = document.querySelector(".close-btn");
let overlay = document.querySelector(".overlay");
let postBtn = document.querySelector(".save");
let inputText = document.querySelector("#text");
let noteTitle = document.querySelector(".note-title");

let languagePicked; 
/*********************  EDITOR *****************************/
// var editor = ace.edit("editor");
// editor.setTheme("ace/theme/monokai");
// editor.getSession().setMode("ace/mode/javascript");
/*********************************************************/

closeBtn.addEventListener("click", function (e) {
    noteDetail.classList.remove("active");
    overlay.classList.remove("active");
})

dropArrow.addEventListener("click", function (e) {
    e.preventDefault();
    dropDown.classList.toggle("drop");
    if (arrowDown.classList[1] === "fa-angle-down") {
        arrowDown.classList.remove("fa-angle-down");
        arrowDown.classList.add("fa-angle-up");
    }
    else {
        arrowDown.classList.add("fa-angle-down");
        arrowDown.classList.remove("fa-angle-up");
    }
})

languages.forEach((lang) => { 
    lang.addEventListener("click", (e) => {
        body.style.justifyContent = "start";
        notesSection.classList.remove("hidden");
        menu.classList.add("clicked");
        languagePicked = lang.classList[2];
        //TODO: Do not forget to change the content when the language is picked
    })
});

notes.forEach((note) => note.addEventListener("click", function (e) {
    noteDetail.classList.add("active");
    overlay.classList.add("active");
}))

postBtn.addEventListener("click", (e) => {
    console.log(languagePicked);
    let title = noteTitle.innerText;
    LANGUAGES.Languages[languagePicked][title] = inputText.value;
    console.log(LANGUAGES);
})

// function displayNote(language, noteTitle) {
//     //TASK: change the view from "insert" to view mode. So as if it was a note
//     //TASK: change button from "POST", to "EDIT" now and add functionalities
// }
let addNoteBtn = document.querySelector(".addNote");
let addCodeBtn = document.querySelector(".addCode");
addNoteBtn.addEventListener("click", addNote);
addCodeBtn.addEventListener("click", addCode);
function addNote(){
    let noteSection = document.querySelector(".note-ul");
    let note = document.createElement("li");
    note.classList.add("bulletPoint-list");
    note.innerHTML = `<p class="bullet-point"<span role="textbox" contenteditable> Add Note</span></p>`;
    noteSection.appendChild(note);
}
function addCode(){
    let noteSection = document.querySelector(".note-ul");
    let note = document.createElement("div");
    note.classList.add("bulletPoint-list");
    note.innerHTML = `<pre class="prettyprint linenums code-exerpt" contenteditable >
    Insert Code
                    </pre>`;
    noteSection.appendChild(note);
}
