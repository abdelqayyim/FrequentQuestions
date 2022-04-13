// import Prism from prismjs;
// const Prism = require("prismjs");

// const Prism = require("./prism-dark");

//TODO: When the languages are added, add them in the data right away
//TASK: Create an add/delete button for the languages (Don't forget to delete from database too)
//TASK: create a foreach look to write the notes when the language is pressed
let options = document.querySelector(".options");

let dropDown = document.querySelector(".dropInfo");
let dropArrow = document.querySelector(".btn-dropdown");

let addLanguageOption = document.querySelector(".add-languageOption");
let addLanguagePopUp = document.querySelector(".add-language"); //this is the div
let addLanguageInput = document.querySelector(".add-languageInput"); //the input
let addLanguageBtn = document.querySelector(".add-languageBtn"); //the button

let deleteLanguageOption = document.querySelector(".delete-languagegOption");
let deleteLanguagePopUp = document.querySelector(".delete-language"); //this is the div
let deleteLanguageInput = document.querySelector(".delete-languageInput"); //the input
let deleteLanguageBtn = document.querySelector(".delete-languageBtn"); //the button

let arrowDown = document.querySelector("i");
let languages = document.querySelectorAll(".lang");
let menu = document.querySelector(".languages");
let body = document.querySelector("body");

let notesSection = document.querySelector(".notes-section");
let notes = document.querySelectorAll(".note");
let noteDetail = document.querySelector(".note-detail");
let closeBtn = document.querySelector(".close-btn");
let editNoteBtn = document.querySelectorAll(".fa-edit");

let overlay = document.querySelector(".overlay");
let lightOverlay = document.querySelector(".light-overlay");
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
addLanguageBtn.addEventListener("click", (e) => {
    console.log(this);
    e.preventDefault();
    if (addLanguageInput.value.trim().length !== 0) {
        let languageName = addLanguageInput.value.trim();
        let newLanguage = document.createElement("button");
        newLanguage.classList.add("btn");
        newLanguage.classList.add("lang");
        newLanguage.classList.add(`${languageName.toLowerCase()}`);
        newLanguage.innerText = languageName;
        options.insertAdjacentElement("afterbegin", newLanguage);

        //TASK: make input null and close the popUp
        addLanguageInput.value = "";
        overlay.classList.remove("active");
        addLanguagePopUp.classList.add("hidden");
    }
    else { //if it is empty ***no words in the input field***
        
    }
})
deleteLanguageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (deleteLanguageInput.value.trim().length !== 0) {
        let languageToDelete = deleteLanguageInput.value.trim().toLowerCase();
        options.removeChild(document.querySelector(`.${languageToDelete}`));
        //TASK: remove the language button from page and database
        // let languageName = addLanguageInput.value.trim();
        // let newLanguage = document.createElement("button");
        // newLanguage.classList.add("btn");
        // newLanguage.classList.add(`${languageName.toLowerCase()}`);
        // newLanguage.innerText = languageName;
        // options.insertAdjacentElement("afterbegin", newLanguage);

        //TASK: make input null and close the popUp
        addLanguageInput.value = "";
        overlay.classList.remove("active");
        deleteLanguagePopUp.classList.add("hidden");
    }
    else { //if it is empty ***no words in the input field***
        
    }
})

dropArrow.addEventListener("click", function (e) {
    dropDown.classList.add("drop");
    
    if (arrowDown.classList[1] === "fa-angle-down") {
        arrowDown.classList.remove("fa-angle-down");
        arrowDown.classList.add("fa-angle-up");
        lightOverlay.classList.add("active");
    }
    else {
        arrowDown.classList.add("fa-angle-down");
        arrowDown.classList.remove("fa-angle-up");
        dropDown.classList.remove("drop");
    }
})
lightOverlay.addEventListener("click", () => {
    dropDown.classList.toggle("drop");
    arrowDown.classList.add("fa-angle-down");
    arrowDown.classList.remove("fa-angle-up");
    lightOverlay.classList.remove("active");
})
function closePopUps(e) {
    if (e.target == overlay) {
        overlay.classList.remove("active");
        addLanguagePopUp.classList.add("hidden");
        deleteLanguagePopUp.classList.add("hidden");
        document.removeEventListener("click", closePopUps);
    }
}
addLanguageOption.addEventListener("click", showAddLanguage);
deleteLanguageOption.addEventListener("click", showDeleteLanguage);

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
    note.innerHTML = `<p class="bullet-point"<span role="textbox" contenteditable><i class="fa fa-edit"></i> Add Note</span></p>`;
    noteSection.appendChild(note);
    editNoteBtn = document.querySelectorAll(".fa-edit");
    editNoteBtn.forEach((btn) => btn.addEventListener("click", editNote));
}
function addCode(){
    let noteSection = document.querySelector(".note-ul");
//     let note = document.createElement("div");
//     // note.classList.add("code-toolbar");
//     note.innerHTML = `<pre class=" language-py">
//     <code class="language-py">def main():
//         print("hello World")
//     </code>
// </pre>`;
    let newNote = noteSection.childNodes[1];
    let newD = document.createElement("div");
    newD.innerHTML = `<pre class="line-numbers">
    <code class="language-python" contenteditable>def main():
        print("hello man"</code>
</pre>`;
    console.log(newD.innerHTML);
    // Prism.highlight(note.innerHTML, Prism.languages.python, "python");
    noteSection.appendChild(newD);
    Prism.highlightAll();
    // document.querySelectorAll("code")[1].classList.add("language-py");
    // document.querySelectorAll("pre")[1].classList.add("line-numbers");
    // console.log(document.querySelectorAll("pre")[1]);
}
function showAddLanguage() {
    overlay.classList.add("active");
    lightOverlay.classList.remove("active");
    addLanguagePopUp.classList.remove("hidden");
    setTimeout(() => {document.addEventListener("click",closePopUps)},500)
}
function showDeleteLanguage() {
    overlay.classList.add("active");
    lightOverlay.classList.remove("active");
    deleteLanguagePopUp.classList.remove("hidden");
    setTimeout(() => {document.addEventListener("click",closePopUps)},500)
}


function editNote(event) {
    // let parent = event.target.closest(".prettyprint").innerText;

    console.log(event.target);
}
