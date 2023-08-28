import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-img-btn")
const gifsOnlyOption = document.getElementById("gifs-only-option")
const memeModal = document.getElementById("meme-modal")
const memeModalInner = document.getElementById("meme-modal-inner")
const closeBtn = document.getElementById("meme-modal-close-btn")

emotionRadios.addEventListener("change", highlightClickedEmotion)

closeBtn.addEventListener("click", closeModal)

getImageBtn.addEventListener("click", renderCat)

function highlightClickedEmotion(e){
    // create the collection - pseudo-array from the class
    const radios = document.getElementsByClassName('radio')
    // loop over the pseudo-array and remove 'highlight' class
    for (let radio of radios){
        radio.classList.remove('highlight')
    }

    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

function closeModal(){
    memeModal.style.display = "none"
}

// render a cat image

function renderCat(){
    const catObject = getSingleCatObject()
    
    memeModalInner.innerHTML = `
        <img 
            class="cat-img" 
            src="./images/${catObject.image}"
            alt="${catObject.alt}"
        >
    `

    memeModal.style.display = "flex"
}


function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    if(catsArray.length === 1){
        return catsArray[0]
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function getMatchingCatsArray(){
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked

        const matchingCatsArray = catsData.filter((cat) => {
            if (isGif){
                return cat.isGif && cat.emotionTags.includes(selectedEmotion)
            } else {
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingCatsArray
    }
}

// iteration over catsData

function getEmotionArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            // check emotions to void duplicates
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }            
        }
    }
    return emotionsArray
}

getEmotionArray(catsData)

// render emotions

function renderEmotionsRadios(cats){

    const emotions = getEmotionArray(cats)

    let radioItems = ""

    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
        <label for="${emotion}">${emotion}</label>
            <input
                type="radio"
                id="${emotion}"
                name="emotions"
                value="${emotion}">
        </div>
        `
    }
    emotionRadios.innerHTML = radioItems

}

renderEmotionsRadios(catsData)