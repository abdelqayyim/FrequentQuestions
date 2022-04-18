window.onload = function () {
    populateLanguages();
}
let body = document.querySelector("body");
let xhttp;
let languagePicked; //this is a global variable that keeps track of the language the user is working on
let titlePicked; //the selected note's title 
let desriptionPicked; //the selected note's description
let noteId;
let notePressed;
// ----------------------------------- PART 1 -----------------------------
let menu = document.querySelector(".languages");
let webSiteTitle = document.querySelector(".title");
let options = document.querySelector(".options");
let languages = document.querySelectorAll(".lang"); //the languages buttons
let dropArrow = document.querySelector(".btn-dropdown"); //the options button (add and delete language)
let dropDown = document.querySelector(".dropInfo"); //the two options (add and delete)
let addLanguageOption = document.querySelector(".add-languageOption");
let deleteLanguageOption = document.querySelector(".delete-languagegOption");
let arrowDown = document.querySelector("i");
let addNoteButton = document.querySelector(".addNoteBtn"); //this is the button that allows the use to add a note
let newNoteBtn = document.querySelector(".createNoteBtn");
let newNoteTitle = document.querySelector(".titleInput");
let newNoteDescription = document.querySelector(".descriptionInput");

//           ---------- FUNCTION CALLS -----------------------
addLanguageOption.addEventListener("click", showAddLanguage);
deleteLanguageOption.addEventListener("click", showDeleteLanguage);
languages.forEach((lang) => { lang.addEventListener("click", (e) => { showNotes(e, lang) }) });
dropArrow.addEventListener("click", dropOptions);
addNoteButton.addEventListener("click", openNotePopUp);
newNoteBtn.addEventListener("click", (e) => { createNewNote(e, languagePicked) });
webSiteTitle.addEventListener("click", ()=>{location.reload()})
newNoteTitle.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        newNoteBtn.click();
      }
})
// ----------------------------------- PART 2 -----------------------------
let notesSection = document.querySelector(".notes-section"); //this is the section where the notes are
let notes = document.querySelectorAll(".note"); //the notes in the note section

//           ---------- FUNCTION CALLS -----------------------
notes.forEach((note) => note.addEventListener("click", function (e) { showNoteDetail(e, languagePicked, note.classList[1]) }));
// ----------------------------------- PART 3 -----------------------------
let noteDetail = document.querySelector(".note-detail"); //this is the pop up after you press on a note
let noteTitle = document.querySelector(".note-title");
let addNoteBtn = document.querySelector(".addNote");
let addCodeBtn = document.querySelector(".addCode");
let saveBtn = document.querySelector(".save");
let currentTitle = document.querySelector(".popUp-title");
let deleteButton = document.querySelector(".delete-btn");

//           ---------- FUNCTION CALLS -----------------------
addNoteBtn.addEventListener("click", addNote);
addCodeBtn.addEventListener("click", function (e) { addCode(e, languagePicked)});
deleteButton.addEventListener("click", (e) => { deleteNote(e, languagePicked, titlePicked) });
saveBtn.addEventListener("click", (e) => { saveNote(e, languagePicked) });
noteDetail.addEventListener("click", deleteEmptyNoteInputs);
// ----------------------------------- PART 4 -----------------------------
let addLanguagePopUp = document.querySelector(".add-language"); //this is the div
let addLanguageInput = document.querySelector(".add-languageInput"); //the input
let addLanguageBtn = document.querySelector(".add-languageBtn"); //the button

let deleteLanguagePopUp = document.querySelector(".delete-language"); //this is the div
let deleteLanguageInput = document.querySelector(".delete-languageInput"); //the input
let deleteLanguageBtn = document.querySelector(".delete-languageBtn"); //the button

let createNotePop = document.querySelector(".create-note");
let createNoteBtn = document.querySelector(".createNoteBtn");//TASK: create the note when the button is clicked, check that title is not empty

//           ---------- FUNCTION CALLS -----------------------
addLanguageBtn.addEventListener("click", (e) => { addLanguageFunction(e) });
deleteLanguageBtn.addEventListener("click", (e) => { deleteLanguageFunction(e) });
addLanguageInput.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        addLanguageBtn.click();
      }
})
deleteLanguageInput.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        deleteLanguageBtn.click();
      }
})
// ----------------------------------- PART 5 -----------------------------
let overlay = document.querySelector(".overlay");
let lightOverlay = document.querySelector(".light-overlay");

//           ---------- FUNCTION CALLS -----------------------
lightOverlay.addEventListener("click", lightOverlayFunction);
overlay.addEventListener("click", (e) => { closePopUps(e) })
// -------------------------------------------------------------------------------------------------------

function populateLanguages(){
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.status === 200 && xhttp.readyState === XMLHttpRequest.DONE) { 
            let languages = JSON.parse(xhttp.responseText);
            for (lang of languages) {
                let newLanguage = document.createElement("button");
                newLanguage.classList.add("btn");
                newLanguage.classList.add("lang");
                newLanguage.classList.add(`${lang.name.toLowerCase().replace(/\s/g, "")}`);
                newLanguage.innerText = lang.name.charAt(0).toUpperCase() + lang.name.slice(1);
                options.insertAdjacentElement("afterbegin", newLanguage);   
            }
            languages = document.querySelectorAll(".lang"); //the languages buttons
            languages.forEach((lang) => { lang.addEventListener("click", (e) => { showNotes(e, lang) }) });
        }
       };
    xhttp.open("GET", `https://frequentquestions.herokuapp.com/languages/`, "true");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}
function addLanguageFunction(event) {
    event.preventDefault();
    console.log("I have been pressed");
    xhttp = new XMLHttpRequest();
    if (addLanguageInput.value.trim().length !== 0) {
        let languageName = addLanguageInput.value.trim().toLowerCase();
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.status === 200 && xhttp.readyState === XMLHttpRequest.DONE) { 
                let newLanguage = document.createElement("button");
                newLanguage.classList.add("btn");
                newLanguage.classList.add("lang");
                newLanguage.classList.add(`${languageName.toLowerCase().replace(/\s/g, "")}`);
                newLanguage.innerText = languageName.charAt(0).toUpperCase() + languageName.slice(1);
                options.insertAdjacentElement("afterbegin", newLanguage);

                //TASK: make input null and close the popUp
                addLanguageInput.value = "";
                overlay.classList.remove("active");
                addLanguagePopUp.classList.add("hidden");
                // location.reload();
                languages = document.querySelectorAll(".lang"); //the languages buttons
                languages.forEach((lang) => { lang.addEventListener("click", (e) => { showNotes(e, lang) }) });
                for (let l of languages) {
                    if (l.classList[2] == languageName)
                        l.click();//simulate a click to show the add notes section right away
                }
            }
            else {
                // showError(xhttp.responseText);
            }
        };
        xhttp.open("POST", ` https://frequentquestions.herokuapp.com/languages/${languageName}`, "true");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
    }
    else { //if it is empty ***no words in the input field***
        
    }
}
let okay = {};
function createNewNote(event, language) {
    if (newNoteTitle.value.trim() != "") {//if the title is  not empty
        console.log(`${newNoteTitle.value}-${newNoteDescription.value}`);
        let note = {"title": newNoteTitle.value.trim(), "description":newNoteDescription.value.trim(), "noteDetail":"", "_id":0}

        //TASK: send post request to server as well
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.status === 200 && xhttp.readyState === XMLHttpRequest.DONE) { 
                let div = document.createElement("div");
                div.classList.add("note");
                div.classList.add(`note-${notesSection.childNodes.length}`);//make sure each title is unique
                div.innerHTML = `<div class="note-title">
                ${newNoteTitle.value.trim()}
            </div>
            <div class="note-description">
                ${newNoteDescription.value.trim()}
            </div>`;
                notesSection.insertAdjacentElement("beforeend", div);
                lightOverlayFunction();//close the popUp
                okay[language] = {};
                okay[language]["Title"] = newNoteTitle.value;
                okay[language]["Description"] = newNoteDescription.value;
                notes = document.querySelectorAll(".note");
                notes.forEach((note) => note.addEventListener("click", function (e) {
                titlePicked = note.childNodes[0].innerText;
                desriptionPicked = note.childNodes[1].innerText;
                showNoteDetail(e, languagePicked, note.classList[1]);
            }));
            }
            else {
                // console.log(xhttp.responseText);
                // showError(xhttp.responseText);
            }
        };
        xhttp.open("POST", ` https://frequentquestions.herokuapp.com/languages/${language.toLowerCase()}/newNote`, "true");
        xhttp.setRequestHeader('Content-Type', 'application/json');
        console.log(note);
        xhttp.send(JSON.stringify(note));
    }
}
function addNote(){
    let noteSection = document.querySelector(".note-ul");
    let note = document.createElement("li");
    note.classList.add("bulletPoint-list");
    note.innerHTML = `<p class="bullet-point"<span role="textbox" contenteditable> Add Note</span></p>`;
    noteSection.appendChild(note);
    editNoteBtn = document.querySelectorAll(".fa-edit");
    editNoteBtn.forEach((btn) => btn.addEventListener("click", editNote));
}
function addCode(event, language){
    let noteSection = document.querySelector(".note-ul");
    console.log(languagePicked);
    let newNote = noteSection.childNodes[1];
    let newD = document.createElement("div");
    newD.innerHTML = `<pre class="line-numbers">
    <code class="language-${language}" contenteditable>Add ${languagePicked} Code</code>
</pre>`;
    noteSection.appendChild(newD);
    Prism.highlightAll();
}
function saveNote(event, language) {
    let detail = document.querySelector(".note-ul");
    let parent = document.querySelector(".note-ul");
    for (let note of parent.childNodes) {
        if (note.childNodes[0].classList[0] == "code-toolbar") {
            if (note.firstChild.firstChild.childNodes[1].innerText.length == 0) {//check if the code in put is empty
                parent.removeChild(note);
            } 
        }
        else if (note.classList == "bulletPoint-list" && note.innerText.length == 0) {
            parent.removeChild(note);
        }
    }
    let note = {
        "title": noteTitle.innerText,
        "description": desriptionPicked,
        "noteDetail": detail.innerHTML,
        "_id": noteId
    }

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.status === 200 && xhttp.readyState === XMLHttpRequest.DONE) { 
            Prism.highlightAll();
            closePopUps(undefined);
        }
        else {
            // showError(xhttp.responseText);
        }
    };
    xhttp.open("PUT", ` https://frequentquestions.herokuapp.com/languages/${language.toLowerCase()}/updateNote`, "true");
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(note));
}
function closePopUps(e) {
    //FIXME: might to want to clear all the input
    let classes = Object.values(noteDetail.classList);
    if ( e != undefined && e.target == overlay) {
        overlay.classList.remove("active");
        addLanguagePopUp.classList.add("hidden");
        deleteLanguagePopUp.classList.add("hidden");
        document.removeEventListener("click", closePopUps);
    }
    if (classes.includes("active")) {
        noteDetail.classList.remove("active");
        overlay.classList.remove("active");
        for (let note of notesSection.childNodes) {
            if (note.classList[1] == `id-${noteId}`) {
                note.firstChild.innerText = noteTitle.innerText;
            }
        }
    }
}
function dropOptions() {
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
}

function deleteEmptyNoteInputs() {
    console.log("I have been pressed");
    let parent = document.querySelector(".note-ul");
    for (let note of parent.childNodes) {
        if (note.childNodes[0].classList[0] == "code-toolbar") {
            if (note.firstChild.firstChild.childNodes[1].innerText.length == 0) {//check if the code in put is empty
                parent.removeChild(note);
                Prism.highlightAll();
            } 
        }
        else if (note.classList == "bulletPoint-list" && note.innerText.length == 0) {
            parent.removeChild(note);
            Prism.highlightAll();
        }
    }
}

function showNotes(event, language) {
    while (notesSection.childNodes.length != 0) {
        notesSection.removeChild(notesSection.lastChild);
    }
    languagePicked = language.innerText.toLowerCase();
    body.style.justifyContent = "start";
    addNoteButton.classList.remove("hidden");
    notesSection.classList.remove("hidden");
    menu.classList.add("clicked");
    noteTitle.innerText = `The Language is ${languagePicked}`;

    xhttp = new XMLHttpRequest();
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.status === 200 && xhttp.readyState === XMLHttpRequest.DONE) {
            let notes = JSON.parse(xhttp.responseText);
            for (let note of notes) {
                let div = document.createElement("div");
                div.classList.add("note");
                div.classList.add(`id-${note._id}`);
                div.innerHTML = `<div class="note-title">
                ${note.title}
            </div>
            <div class="note-description">
                ${note.description}
            </div>`;
                notesSection.insertAdjacentElement("afterbegin", div);
            }
            notes = document.querySelectorAll(".note"); //the notes in the note section 
            notes.forEach((note) => note.addEventListener("click", function (e) {
                titlePicked = note.firstChild.innerText;
                desriptionPicked = note.lastChild.innerText;
                showNoteDetail(e, languagePicked, note.firstChild.innerText)
            }));
        }
        else {
            // showError(xhttp.responseText);
        }
    }
    xhttp.open("GET", ` https://frequentquestions.herokuapp.com/languages/${languagePicked.toLowerCase()}/getNotes`, "true");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}
function openNotePopUp() {
    createNotePop.classList.remove("hidden");
    dropArrow.style.zIndex = 0;
    lightOverlay.classList.add("active");
    lightOverlay.style.backgroundColor = "grey";
    lightOverlay.style.opacity = 0.8;
}
function showAddLanguage() {
    overlay.classList.add("active");
    lightOverlay.classList.remove("active");
    addLanguagePopUp.classList.remove("hidden");
    addLanguageInput.focus();
    setTimeout(() => {document.addEventListener("click",closePopUps)},500)
}
function showDeleteLanguage() {
    overlay.classList.add("active");
    lightOverlay.classList.remove("active");
    deleteLanguagePopUp.classList.remove("hidden");
    deleteLanguageInput.focus();
    setTimeout(() => {document.addEventListener("click",closePopUps)},500)
}
function showNoteDetail(event, language, title) { //This is the note detail pop up, to edit
    let noteSection = document.querySelector(".note-ul");
    let note = {
        "title": titlePicked
    }

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.status === 200 && xhttp.readyState === XMLHttpRequest.DONE) { 
            let chosenNote = JSON.parse(xhttp.responseText);
            noteSection.innerHTML = chosenNote.noteDetail;
            currentTitle.innerText = chosenNote.title;
            noteId = chosenNote._id;
            noteDetail.classList.add("active");
            overlay.classList.add("active");
            Prism.highlightAll();
        }
        else {
            console.log(xhttp.responseText);
            // showError(xhttp.responseText);
        }
    };
    xhttp.open("POST", ` https://frequentquestions.herokuapp.com/languages/${language.toLowerCase()}/getNote`, "true");
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(note));

}

function deleteLanguageFunction(event){
    event.preventDefault();
    if (deleteLanguageInput.value.trim().length !== 0) {
        event.preventDefault();
        console.log("I have been pressed");
        xhttp = new XMLHttpRequest();
        if (deleteLanguageInput.value.trim().length !== 0) {
            let languageName = deleteLanguageInput.value.trim().toLowerCase();
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.status === 200 && xhttp.readyState === XMLHttpRequest.DONE) { 
                    console.log("GOT A RESPONSE");
                    location.reload();
                }
                else {
                    // showError(xhttp.responseText);
                }
            };
            xhttp.open("DELETE", ` https://frequentquestions.herokuapp.com/languages/${languageName.toLowerCase()}`, "true");
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send();
        }
    }
}
function lightOverlayFunction() {
    dropDown.classList.remove("drop");
    arrowDown.classList.add("fa-angle-down");
    arrowDown.classList.remove("fa-angle-up");
    lightOverlay.classList.remove("active");
    createNotePop.classList.add("hidden");
    dropArrow.style.zIndex = 10;
    lightOverlay.style.backgroundColor = "white";
    lightOverlay.style.opacity = 0;
}
function deleteNote(event, language, title) {
    //TASK: send delete request to server as well
    // notesSection = document.querySelector(".notes-section");
    let noteToDelete;
    let note = { "title": titlePicked };

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.status === 200 && xhttp.readyState === XMLHttpRequest.DONE) { 
            for (let n of notesSection.childNodes) {
                if (n.firstChild.innerText == titlePicked)
                    noteToDelete = n;
            }
            notesSection.removeChild(noteToDelete);
            closePopUps(undefined);
        }
        else {
            // showError(xhttp.responseText);
        }
    };
    xhttp.open("DELETE", ` https://frequentquestions.herokuapp.com/languages/${language.toLowerCase()}/deleteNote`, "true");
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(note));
}
function showError(message) {
    console.log("Error has be made");
    let errorPopUp = document.querySelector(".error-poUp");
    let erroText = document.querySelector(".error-text");

    erroText.innerText = message;
    errorPopUp.classList.remove("hidden");
    
    setTimeout(() => { errorPopUp.classList.add("hidden"); }, 2000);


}

