const initialFunc = (() => {

function createElemWithId(el, id) {
    const elem = document.createElement(el);
    elem.setAttribute('id', id);
    return elem
    };
   
const container = createElemWithId("div", "container");
const input = createElemWithId("input", "input");
const search = createElemWithId("button", "search");
const clear = createElemWithId("button", "clear");
const showParent = createElemWithId("button", "showParent");
const showChild = createElemWithId("button", "showChild");
const nextNeighbour = createElemWithId("button", "nextNeighbour");
const prevNeighbour = createElemWithId("button", "prevNeighbour");
const closeBtn = createElemWithId("img", "closeBtn");
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
return {
    container,
    input,
    search,
    clear,
    showParent,
    showChild, 
    nextNeighbour,
    prevNeighbour,
    closeBtn,
    currentNode,
    btnArr,
    buttonChecker: function() {
        showChild.disabled = !this.currentNode.children.length;
        showParent.disabled = !this.currentNode.parentElement;
        nextNeighbour.disabled = !this.currentNode.nextElementSibling;
        prevNeighbour.disabled = !this.currentNode.previousElementSibling;
    },
    common: function(navName) {
        this.currentNode.style.cssText = `
        border:none
        `;
        this.currentNode = navName;
        this.currentNode.style.cssText = `
        border:red 2px solid;
        border-radius:10px;
        `;
        this.buttonChecker();
},
innerHtmlFunc: function(elem, text) {
    elem.innerHTML = text;
},
appendElement: function(elem, classes) {
    this.container.appendChild(elem);
    elem.classList.add(classes);
}
}
})(); 

//search btn click-handler
function onSearchClick() {
    if (initialFunc.input.value === "") {
        alert("please, enter the name of element");
    } else {
        initialFunc.currentNode = document.querySelector(initialFunc.input.value)
        || document.getElementById(initialFunc.input.value)
        || document.getElementsByTagName(initialFunc.input.value)[0]
        || document.getElementsByClassName(initialFunc.input.value)[0];
        if (!initialFunc.currentNode) {
            initialFunc.input.value = "";
            alert("no such node");
        } else {
            initialFunc.currentNode.style.cssText = `
            border:red 5px solid;
            border-radius:10px;
            `;
            initialFunc.buttonChecker();
        }
    }
};

//showParent handler
function onShowParentClick() {
    const navName = (initialFunc.currentNode.parentElement);
    initialFunc.common(navName);
};

//showChild handler
function onShowChildClick() {
    const navName = (initialFunc.currentNode.firstElementChild);
    initialFunc.common(navName);
};

//nextNeighbour handler
function onnextNeighbourClick() {
    const navName = (initialFunc.currentNode.nextElementSibling);
    initialFunc.common(navName);
};

//prevNeighbour handler
function onprevNeighbourClick() {
    const navName = (initialFunc.currentNode.previousElementSibling);
    initialFunc.common(navName);
};

//clear function
function clearInput() {
    initialFunc.input.value = "";
    initialFunc.showParent.disabled = true;
    initialFunc.showChild.disabled = true;
    initialFunc.nextNeighbour.disabled = true;
    initialFunc.prevNeighbour.disabled = true;
    initialFunc.currentNode.style.cssText = `
    border:none
    `;
    initialFunc.currentNode = null;
};

//close function
function closeHandler() {
    initialFunc.container.style.display = "none";
};

document.body.prepend(initialFunc.container);
initialFunc.container.prepend(initialFunc.closeBtn);

initialFunc.btnArr.map((btn) => {
    initialFunc.appendElement(btn.elem, ...btn.classes);
    initialFunc.innerHtmlFunc(btn.elem, btn.text);
});

initialFunc.input.setAttribute("value", "");
initialFunc.input.setAttribute("placeholder", "enter node");
initialFunc.closeBtn.src = chrome.runtime.getURL("close.svg");

//drag&drop
container.onmousedown = (e) => {
    let shiftX = e.clientX - initialFunc.container.getBoundingClientRect().left;
    let shiftY = e.clientY - initialFunc.container.getBoundingClientRect().top;

    function setXY(pageX, pageY) {
        initialFunc.container.style.left = pageX - shiftX + 'px';
        initialFunc.container.style.top = pageY - shiftY + 'px';
    };

    function mouseMoveHandler(event) {
        setXY(event.pageX, event.pageY);
    };

    function mouseUpHandler() {
        document.removeEventListener("mousemove", mouseMoveHandler);
        initialFunc.container.onmouseup = null;
    };

    setXY(e.pageX, e.pageY);
    document.addEventListener("mousemove", mouseMoveHandler);
    initialFunc.container.addEventListener("mouseup", mouseUpHandler);
    initialFunc.container.ondragstart = () => { return false };
};

//btn handlers
initialFunc.search.addEventListener("click", onSearchClick);
initialFunc.clear.addEventListener("click", clearInput);
initialFunc.showParent.addEventListener("click", onShowParentClick);
initialFunc.showChild.addEventListener("click", onShowChildClick);
initialFunc.nextNeighbour.addEventListener("click", onnextNeighbourClick);
initialFunc.prevNeighbour.addEventListener("click", onprevNeighbourClick);
initialFunc.closeBtn.addEventListener("click", closeHandler);




