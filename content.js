//variables
const container = document.createElement("div");
const input = document.createElement("input");
const search = document.createElement("button");
const clear = document.createElement("button");
const showParent = document.createElement("button");
const showChild = document.createElement("button");
const nextNeighbour = document.createElement("button");
const prevNeighbour = document.createElement("button");
const btnGroup = document.getElementsByClassName("btn");
const closeBtn = document.createElement("img");
let currentNode = null;
//search btn click-handler
function onSearchClick() {
    if (input.value === "") {
    alert("please, enter the name of element")
    } else { 
currentNode = document.querySelector(input.value)||document.getElementById(input.value)||document.getElementsByTagName(input.value)[0]||document.getElementsByClassName(input.value)[0];
if (!currentNode) {
    input.value = "";
    return alert("no such node")
}else{
    currentNode.style.cssText = `
border:red 5px solid;
border-radius:10px;
`
if (currentNode.children.length) {
    showChild.disabled = false;
}
if (currentNode.parentElement) {
    showParent.disabled = false;
}
if (currentNode.nextElementSibling) {
    nextNeighbour.disabled = false;
}
if (currentNode.previousElementSibling) {
    prevNeighbour.disabled = false;
}
return console.log(currentNode)
}
}};
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
    if (!currentNode.children.length) {
        showChild.disabled = true;
    }else showChild.disabled = false;
    if (!currentNode.parentElement) {
        showParent.disabled = true;
    }else showParent.disabled = false;
    if (!currentNode.nextElementSibling) {
        nextNeighbour.disabled = true;
    }else nextNeighbour.disabled = false;
    if (!currentNode.previousElementSibling) {
        prevNeighbour.disabled = true;
    }else prevNeighbour.disabled = false;
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
document.body.prepend(container);
container.appendChild(input);
container.appendChild(search).classList.add("btn", "search");
container.appendChild(clear).classList.add("btn", "clear");
container.appendChild(showParent).classList.add("btn", "showParent");
container.appendChild(showChild).classList.add("btn", "showChild");
container.appendChild(nextNeighbour).classList.add("btn", "nextNeighbour");
container.appendChild(prevNeighbour).classList.add("btn", "prevNeighbour");
container.prepend(closeBtn);

search.innerHTML = "search";
clear.innerHTML = "clear";
showParent.innerHTML = "show parent";
showChild.innerHTML = "show child";
nextNeighbour.innerHTML = "next neighbour";
prevNeighbour.innerHTML = "prev neighbour";
input.setAttribute("value", "");
input.setAttribute("placeholder", "enter node");

closeBtn.src = chrome.runtime.getURL("close.svg");
showParent.disabled = true;
showChild.disabled = true;
nextNeighbour.disabled = true;
prevNeighbour.disabled = true;

//styles
closeBtn.style.cssText = `
width:20px;
position:absolute;
top:15px;
right:15px;
cursor:pointer;
`
container.style.cssText = `
width:400px;
height:300px;
padding:50px 15px 50px;
position:absolute;
top:50vh;
left:50vw;
z-index:100;
border:none;
display:flex;
flex-wrap:wrap;
background-color:#FFFFFF;
border-radius:20px; 
justify-content:space-between;
box-shadow: 0px 0px 22px 17px rgba(34, 60, 80, 0.4);
`
input.style.cssText = `
width:100%;
height:20px;
border-radius:5px;
font-size:16px;
padding:10px 5px;!important
`
for (let i = 0; i<btnGroup.length; i++) {
    document.getElementsByClassName("btn")[i].style.cssText = `
padding:2px 5px;
width:150px; 
height:30px;
border-radius:5px;
font-size:18px;
cursor:pointer;   
    `
}

//drag&drop
container.onmousedown = (e) => {
    let shiftX = e.clientX - container.getBoundingClientRect().left;
    let shiftY = e.clientY - container.getBoundingClientRect().top;
function setXY(pageX, pageY) {
    container.style.left = pageX -shiftX + 'px';
    container.style.top = pageY -shiftY + 'px';
};
function mouseMoveHandler(event) {
    setXY(event.pageX, event.pageY)
};

setXY(e.pageX, e.pageY);
document.addEventListener("mousemove", mouseMoveHandler);
container.onmouseup = () => {
document.removeEventListener("mousemove", mouseMoveHandler);
container.onmouseup = null;
};
container.ondragstart = () => {return false};
};

//btn handlers
search.addEventListener("click", onSearchClick);
clear.addEventListener("click", clearInput);
showParent.addEventListener("click", onShowParentClick);
showChild.addEventListener("click", onShowChildClick);
nextNeighbour.addEventListener("click", onnextNeighbourClick);
prevNeighbour.addEventListener("click", onprevNeighbourClick);
closeBtn.addEventListener("click", closeHandler);



