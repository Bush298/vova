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


let instaContainer = document.querySelector('.instagram')

let photos = [
    '/assets/images/tattoos/dp.jpg',
    '/assets/images/tattoos/dp.jpg',
    '/assets/images/tattoos/dp.jpg',
    '/assets/images/tattoos/WIN_20250228_10_21_43_Pro.jpg',
    
    
]
let mask = document.querySelector('.shadow-mask')
mask.addEventListener('click',()=>{
    mask.style.display = 'none'
})

let photoBig = document.querySelector('.instagram__photo__big')

function drawPhotos(){

    photos.forEach((photo, i)=>{
        instaContainer.innerHTML += `<div class="instagram__photo"></div>`
    })
    
    let instaPhotos = document.querySelectorAll('.instagram__photo')
    instaPhotos.forEach((div, i)=>{
        div.style.backgroundImage = `url(${photos[i]})`

        div.addEventListener('click', ()=>{
            mask.style.display = 'block'
            photoBig.style.backgroundImage = `url(${photos[i]})`
        })
    })
}

drawPhotos()