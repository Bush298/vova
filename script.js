let infoBtns = document.querySelectorAll('.option__select')


function openInfoTab(infoBtn){
    let infoText = infoBtn.parentElement.querySelector('.option__text')
    infoText.classList.toggle('option__text_open')
    
    let plus = infoBtn.querySelector('.vert')
    plus.classList.toggle('vert_off')

    infoBtn.scrollIntoView({behavior: 'smooth', block: 'start'})
    
    
}

for (let infoBtn of infoBtns) {
    infoBtn.addEventListener('click', ()=> openInfoTab(infoBtn))
}



const API_URL = 'https://script.google.com/macros/s/AKfycbx1cPKac4KOVO_x86jQp8Me91wukv6E-3ITpA1AXBLtQrMa8iy21Q4Vb0iL5W6rm1LQow/exec'
let instaContainer = document.querySelector('.instagram')




let mask = document.querySelector('.shadow-mask')
mask.addEventListener('click',()=>{
    mask.style.display = 'none'
})

let photoBig = document.querySelector('.instagram__photo__big')

function drawPhotos(photos){
    console.table(photos)
    photos.forEach((photo, i)=>{
        instaContainer.innerHTML += `<div class="instagram__photo"></div>`
        
    })
    
    let instaPhotos = document.querySelectorAll('.instagram__photo')
    instaPhotos.forEach((div, i)=>{
        div.style.backgroundImage = `url(${photos[i].url})`
        
        div.addEventListener('click', ()=>{
            mask.style.display = 'block'
            photoBig.style.backgroundImage = `url(${photos[i].url})`
        })
    })
}

async function loadPhotos() {
    let response = await fetch(API_URL);
    let photos = await response.json();
    drawPhotos(photos)
}
loadPhotos()