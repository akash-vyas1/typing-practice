console.log("Typing practice site by Akash Vyas");

let mainWords = document.getElementById('mainWords');
let charInput = document.getElementById('specCharInput');
let currentChars = document.getElementById('currentChars');
let inChar = document.getElementById('charsIn');
let words = document.getElementById('words');
let firstText = document.getElementById('firstText');
let firstTextHtml = firstText.innerHTML;
let typeWords = document.getElementById('typeWords');
let score = document.getElementById('score');
score.style.display='none';
typeWords.style.display='none';
currentChars.style.display ='none';
charInput.style.display = 'none';
let inputTaking = false;
let inputString ='';
let radioChecked= false;
let allCharRadio = document.getElementById('allChars');
let specCharRadio = document.getElementById('specChars');
let allAlphabets = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let generatedParagraph = '';
let progress = document.getElementById('progress');
let percentage = document.getElementById('percentage');
let newStart =true;
let start,end;
let specCharTick = document.getElementById('specCharTick');
let allCharTick = document.getElementById('allCharTick');
let totalWords = document.getElementById('totalWords');

let tempOption ,allOptions;
function selectValue(total,valueId){
    totalWords.value = total;
    tempOption = document.getElementById(valueId);
    allOptions = document.querySelectorAll('.wordOption');
    console.log(allOptions);
    for(i=0;i<allOptions.length;i++) {
        allOptions[i].style.textDecoration='none';
    }
    tempOption.style.textDecoration = 'underline';
}

function resetAll(){
    // alert('resetting')
    inputTaking = false;
    radioChecked= false;
    inputString ='';
    inChar.value='';
    currentChars.innerText = 'Current words are from : ';
    allCharRadio.checked = false;
    specCharRadio.checked = false;
    charInput.style.display = 'none';
    currentChars.style.display ='none';
    typeWords.style.display='none';
    score.style.display='none';
    generatedParagraph="";
    words.innerText="";
    words.classList.add('first');
    words.innerHTML = firstTextHtml;
    score.style.background = '#f8f8f8';
    percentage.innerText='0%';
    progress.style.width=0+'%';
    newStart=true;
    specCharTick.style.display='none';
    allCharTick.style.display='none';
    totalWords.value='20';
}

function checkRadio(str){
    if(str=='all'){
        allCharRadio.checked = true;
        forAllChars();
    }
    if(str=='not'){
        specCharRadio.checked=true;
        takeInput();
    }
}

function takeInput(){
    // console.log("Taking characters : ");
    inputTaking = true;
    radioChecked = true;
    charInput.style.display = 'flex';
    specCharTick.style.display='unset';
    allCharTick.style.display='none';
}

function forAllChars(){
    inputTaking = false;
    radioChecked = true;
    charInput.style.display = 'none';
    allCharTick.style.display = 'unset';
    specCharTick.style.display='none';
}

function generateWords(){
    percentage.innerText='0%';
    words.style.background='white';
    newStart=true;
    progress.style.width='0%';
    typeWords.removeAttribute('disabled');

    if(radioChecked){

        firstText.style.display= 'none';
        words.classList.remove('first');

        let inputField = document.getElementById('charsIn');
        inputString = inputField.value;
        if((inputString==undefined || inputString=='' )&&inputTaking==true ){
            alert("Enter characters");
            words.classList.add('first');
            words.innerHTML = firstTextHtml;
        }else {
            if(inputTaking==false){
                // alert('generating words');
                currentChars.style.display ='unset';
                currentChars.innerText = 'Current words are from : '+'All alphabets';
                mainWords.style.display='flex';
                typeWords.style.display='unset';
                score.style.display='unset';
                words.innerText = ''+ createWords('all');
                generatedParagraph = words.innerText;
                typeWords.value="";
            }else {
                // alert('generating words from : '+inputString);
                charInput.style.display = 'none';
                currentChars.style.display ='unset';
                currentChars.innerText = 'Current words are from : '+inputString;
                mainWords.style.display='flex';
                typeWords.style.display='unset';
                score.style.display='unset';
                words.innerText = ''+ createWords('non');
                generatedParagraph = words.innerText;
                typeWords.value="";
            }
        }
    }else {
        alert('Select any option');
        words.classList.add('first');
        words.innerHTML = firstTextHtml;
    }
}

function createWords(str){
    // console.log('in create');
    if(str==='all'){
        return getWords(allAlphabets);
    }
    if(str==='non'){
        let charArray = inputString.split(" ");
        return getWords(charArray);
    }
}

function getWords(charArray){
    let paragraph = '';
    let wordCount = (totalWords.value)/10;
    // console.log("Word count : "+wordCount);
    for(let i=0;i<wordCount;i++){
        paragraph = paragraph + word(charArray,2)+" ";
        paragraph = paragraph + word(charArray,3)+" ";
        paragraph = paragraph + word(charArray,4)+" ";
        paragraph = paragraph + word(charArray,5)+" ";
        paragraph = paragraph + word(charArray,2)+" ";
        paragraph = paragraph + word(charArray,3)+" ";
        paragraph = paragraph + word(charArray,5)+" ";
        paragraph = paragraph + word(charArray,6)+" ";
        paragraph = paragraph + word(charArray,4)+" ";
        paragraph = paragraph + word(charArray,2)+" ";
    }
    // console.log(paragraph);
    return paragraph;
}

function word(array,len){
    let word2='';
    let size = array.length;
    for(i=0;i<len;i++){
        word2 = word2+ array[Math.floor(Math.random()*size)];
    }
    return word2;
}

let input;
let uptoInput;
let remaining;
let complete;

let rightText;
let span;
let remainingText;

function generateResults(){
    if(newStart){
        // console.log('new start');
        start=performance.now();
        newStart=false;
    }
    // console.log('char entered');
    input = typeWords.value;
    uptoInput = generatedParagraph.substr(0,input.length);
    remaining = generatedParagraph.substr(input.length,generatedParagraph.length);
    complete = false;
    // console.log("Input String : "+input);
    // console.log("remaining string : "+remaining);
    // console.log(input+":"+uptoInput+","+input.length+":"+uptoInput.length);
    
    if(input==uptoInput){
        // score.style.background = 'rgb(80, 226, 153)';
        rightText = document.createTextNode(uptoInput);
        span = document.createElement('span');
        span.style.color="rgb(59, 197, 128)";
        span.appendChild(rightText);
        remainingText = document.createTextNode(remaining);
        words.innerText="";
        words.append(span);
        words.append(remainingText);
        correctIndex = input.length-1;
        generateScore(input.length);
        if(input==generatedParagraph) {
            complete=true;
        }
        words.style.background='white';
    }else{
        words.style.background = '#ffecec';
    }
    if(complete){
        // console.log('complete');
        end=performance.now();
        percentage.innerText = percentage.innerText+', in '+((end-start)/1000).toFixed(1)+" seconds";
        typeWords.setAttribute('disabled','true');
        start = 0;
        end=0;
        newStart=true;
    }
}

let calculatedPercentage;
function generateScore(correctLength){
    calculatedPercentage = ((100*correctLength)/generatedParagraph.length).toFixed(1);
    progress.style.width = calculatedPercentage+'%'; 
    percentage.innerText= calculatedPercentage+'%';
}
