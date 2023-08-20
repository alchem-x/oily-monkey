let mainBlock = document.querySelector('.Topstory-container')
if(!mainBlock) {
    mainBlock = document.querySelector('.Question-main')
}
if (mainBlock) {
    mainBlock.children[0].style.width = '100%'
    mainBlock.children[1].style.display = 'none'
}