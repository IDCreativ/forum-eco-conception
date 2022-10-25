
function initializeMyJS() {
    console.log('mainJS loaded');
}

initializeMyJS();

var asideToggle = document.getElementById('aside-toggle');
var mainContainer = document.getElementById('main-container');
var sideBar = document.getElementById('sidebar');

asideToggle.addEventListener('click',  function() {
    asideToggle.classList.toggle('aside-opened');
    mainContainer.classList.toggle('aside-opened');
    sideBar.classList.toggle('aside-opened');
    console.log('on ouvre/ferme aside')
})