function mainFunc() {
//variables
const container = document.createElement("div");
container.id = "container";
const input = document.createElement("input");
input.id = "input";
const search = document.createElement("button");
search.id = "search";
const clear = document.createElement("button");
clear.id = "clear";
const showParent = document.createElement("button");
showParent.id = "showParent";
const showChild = document.createElement("button");
showChild.id = "showChild";
const nextNeighbour = document.createElement("button");
nextNeighbour.id = "nextNeighbour";
const prevNeighbour = document.createElement("button");
prevNeighbour.id = "prevNeighbour";
const closeBtn = document.createElement("img");
closeBtn.id = "closeBtn";
let currentNode = null;
let btnArr = [
    {elem: input, classes: ["input"], text: "", navname: ""},
    {elem: search, classes: ["btn", "search"], text: "search"},
    {elem: clear, classes: ["btn", "clear"], text: "clear"},
    {elem: showParent, classes: ["btn", "showParent"], text: "show parent"},
    {elem: showChild, classes: ["btn", "showChild"], text: "show child"},
    {elem: nextNeighbour, classes: ["btn", "nextNeighbour"], text: "next neighbour"},
    {elem: prevNeighbour, classes: ["btn", "prevNeighbour"], text: "prev neighbour"}
];

function buttonChecker() {
    (!currentNode.children.length) ? showChild.disabled = true : showChild.disabled = false;
    (!currentNode.parentElement) ? showParent.disabled = true : showParent.disabled = false;
    (!currentNode.nextElementSibling) ? nextNeighbour.disabled = true : nextNeighbour.disabled = false;
    (!currentNode.previousElementSibling) ? prevNeighbour.disabled = true : prevNeighbour.disabled = false;
};

//search btn click-handler
function onSearchClick() {
    if (input.value === "") {
        alert("please, enter the name of element")
    } else {
        currentNode = document.querySelector(input.value) || document.getElementById(input.value) || document.getElementsByTagName(input.value)[0] || document.getElementsByClassName(input.value)[0];
        if (!currentNode) {
            input.value = "";
            return alert("no such node")
        } else {
            currentNode.style.cssText = `
            border:red 5px solid;
            border-radius:10px;
            `
            buttonChecker();
        }
    }
};

//common handler
function common(navName) {
    currentNode.style.cssText = `
    border:none
    `;
    currentNode = navName;
    currentNode.style.cssText = `
    border:red 2px solid;
    border-radius:10px;
    `;
    buttonChecker();
};


//showParent handler
function onShowParentClick() {
    const navName = (currentNode.parentElement);
    common(navName)
};

//showChild handler
function onShowChildClick() {
    const navName = (currentNode.firstElementChild);
    common(navName)
};

//nextNeighbour handler
function onnextNeighbourClick() {
    const navName = (currentNode.nextElementSibling);
    common(navName)
};

//prevNeighbour handler
function onprevNeighbourClick() {
    const navName = (currentNode.previousElementSibling);
    common(navName)
};

//clear function
function clearInput() {
    input.value = "";
    showParent.disabled = true;
    showChild.disabled = true;
    nextNeighbour.disabled = true;
    prevNeighbour.disabled = true;
    currentNode.style.cssText = `
    border:none
    `
    currentNode = null;
};

//close function
function closeHandler() {
    container.style.display = "none";
};

//append to DOM
function appendElement(elem, classes) {
    container.appendChild(elem)
    elem.classList.add(classes)
};

function innerHtmlFunc(elem, text) {
    elem.innerHTML = text
};

document.body.prepend(container);
container.prepend(closeBtn);

btnArr.map((btn) => {
    appendElement(btn.elem, ...btn.classes);
    innerHtmlFunc(btn.elem, btn.text);
});

input.setAttribute("value", "");
input.setAttribute("placeholder", "enter node");
closeBtn.src = chrome.runtime.getURL("close.svg");

//drag&drop
container.onmousedown = (e) => {
    let shiftX = e.clientX - container.getBoundingClientRect().left;
    let shiftY = e.clientY - container.getBoundingClientRect().top;

    function setXY(pageX, pageY) {
        container.style.left = pageX - shiftX + 'px';
        container.style.top = pageY - shiftY + 'px';
    };

    function mouseMoveHandler(event) {
        setXY(event.pageX, event.pageY)
    };

    function mouseUpHandler() {
        document.removeEventListener("mousemove", mouseMoveHandler);
        container.onmouseup = null;
    };

    setXY(e.pageX, e.pageY);
    document.addEventListener("mousemove", mouseMoveHandler);
    container.addEventListener("mouseup", mouseUpHandler);
    container.ondragstart = () => { return false };
};

//btn handlers
search.addEventListener("click", onSearchClick);
clear.addEventListener("click", clearInput);
showParent.addEventListener("click", onShowParentClick);
showChild.addEventListener("click", onShowChildClick);
nextNeighbour.addEventListener("click", onnextNeighbourClick);
prevNeighbour.addEventListener("click", onprevNeighbourClick);
closeBtn.addEventListener("click", closeHandler);
};



