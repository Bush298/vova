let infoBtns = document.querySelectorAll('.option__select')


function openInfoTab(infoBtn){
    let infoText = infoBtn.parentElement.querySelector('.option__text')
    infoText.classList.toggle('option__text_open')
    
    let plus = infoBtn.querySelector('.vert')
    plus.classList.toggle('vert_off')
    
}

for (let infoBtn of infoBtns) {
    infoBtn.addEventListener('click', ()=> openInfoTab(infoBtn))
}

