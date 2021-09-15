function setStylesPopUp() {

const closeBtn = document.getElementById("closeBtn");
const btnGroup = document.getElementsByClassName("btn");
const container = document.getElementById("container");
const input = document.getElementById("input");

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

for (let i = 0; i < btnGroup.length; i++) {
    document.getElementsByClassName("btn")[i].style.cssText = `
    width:150px; 
    height:30px;
    border-radius:5px;
    border:gray 1px solid;
    font-size:18px;
    cursor:pointer;   
    padding:2px 5px;
    `
};
};