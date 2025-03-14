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



const API_URL = 'https://script.google.com/macros/s/AKfycbziNvR2Gohw9rV0Huczjh3VGNhfN0a_JCkhwC56Ce1wY_-mcmIe8vABnYvsEqyLDBvfWA/exec'

let instaContainer = document.querySelector('.instagram')




let mask = document.querySelector('.shadow-mask')
mask.addEventListener('click',()=>{
    mask.style.display = 'none'
})

let photoBig = document.querySelector('.instagram__photo__big')

function drawPhotos(photos){
    instaContainer.innerHTML = ''

    photos.sort((a,b) => a.name.localeCompare(b.name, undefined, {numeric: true}))
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

let contactForm = document.querySelector('.contact')


function openContactForm(){
    contactForm.classList.add('contact_open')
}
function closeContactForm(){
    contactForm.classList.remove('contact_open')
}

let oversize = false

function onFileUpload(event){
    let files = event.target.files
    console.log(files)
    let totalSize = 0
    for (i=0; i<files.length; i++) {
        totalSize+= files[i].size
    }
    console.log('total size is ', totalSize)

    if (totalSize > 3000000) {
        console.log('dohuya bratan')
        oversize = true
    } else {
        console.log('zaebis')
        oversize = false
    }
    

}

document.getElementById('file').addEventListener('change', onFileUpload)

document.getElementById('contact-form').addEventListener('submit', (event)=>{
    event.preventDefault()

  
    if(oversize){return}

    let formData = new FormData(document.getElementById('contact-form'))
    let fileInput = document.getElementById('file')
    for (i=0; i<fileInput.files.length; i++){
        formData.append('file[]', fileInput.files[i])
    }

    document.getElementById('submit').innerHTML = 'WAIT...'

    fetch('https://jokertattooinc.com/upload.php', {
        method:'POST',
        body: formData
    })


    

    .then(response => response.text())
    .then(result => {

        document.getElementById('submit').innerHTML = 'THANKS!'
        setTimeout(function(){
            closeContactForm()
            document.getElementById('submit').innerHTML = 'SUBMIT'
        }, 2000)

    })

    .catch(error => {
        console.error(error)

        document.getElementById('submit').innerHTML = 'TRY AGAIN'
        setTimeout(function(){
            closeContactForm()
            document.getElementById('submit').innerHTML = 'SUBMIT'
        }, 2000)

    })
})


