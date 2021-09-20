console.log("Hello");

let mainWords = document.getElementById('mainWords');
mainWords.style.display='none';
let charInput = document.getElementById('specCharInput');
let currentChars = document.getElementById('currentChars');
let inChar = document.getElementById('charsIn');
let words = document.getElementById('words');
let typeWords = document.getElementById('typeWords');
let score = document.getElementById('score');
score.style.display='none';
words.style.display='none';
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
let incorrect=0;
let progress = document.getElementById('progress');
let percentage = document.getElementById('percentage');
let newStart =0;
let start,end;

function resetAll(){
    // alert('resetting')
    inputTaking = false;
    radioChecked= false;
    inputString ='';
    inChar.value='';
    currentChars.innerText = 'Current Characters : ';
    allCharRadio.checked = false;
    specCharRadio.checked = false;
    charInput.style.display = 'none';
    currentChars.style.display ='none';
    words.style.display= 'none';
    typeWords.style.display='none';
    score.style.display='none';
    mainWords.style.display='none';
    incorrect=0;
    generatedParagraph="";
    words.innerText="";
    score.style.background = 'rgb(240, 240, 240)';
    percentage.innerText='0%';
    progress.style.width=0+'%';
    newStart=0;
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
}

function forAllChars(){
    inputTaking = false;
    radioChecked = true;
    charInput.style.display = 'none';
}

function generateWords(){
    percentage.innerText='0%';
    incorrect=0;
    words.style.background='white';
    newStart=0;
    progress.style.width='0%';
    if(radioChecked){

        let inputField = document.getElementById('charsIn');
        inputString = inputField.value;
        if((inputString==undefined || inputString=='' )&&inputTaking==true ){
            alert("Enter characters")
        }else {
            if(inputTaking==false){
                // alert('generating words');
                currentChars.style.display ='unset';
                currentChars.innerText = 'Current words are from : '+'All alphabets';
                mainWords.style.display='flex';
                words.style.display='unset';
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
                words.style.display='unset';
                typeWords.style.display='unset';
                score.style.display='unset';
                words.innerText = ''+ createWords('non');
                generatedParagraph = words.innerText;
                typeWords.value="";
            }
        }
    }else {
        alert('Select any option');
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
    for(let i=0;i<1;i++){
        // if(i>0 && i%2==0){
        //     paragraph = paragraph+'\n';
        // }
        paragraph = paragraph + word(charArray,2)+" ";
        paragraph = paragraph + word(charArray,3)+" ";
        paragraph = paragraph + word(charArray,4)+" ";
        paragraph = paragraph + word(charArray,5)+" ";
        paragraph = paragraph + word(charArray,6)+" ";
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

let instructions = document.getElementById('content');
let instructionText = document.getElementById('instructionText');
instructions.style.display='none';

function showInstructions(){
    instructions.style.display='unset';
    instructionText.style.display='none';
}

function closeInstruction(){
    instructions.style.display='none';
    instructionText.style.display='unset';
}

function generateResults(){
    if(newStart==0){
        start=performance.now();
        newStart++;
    }
    // console.log('char entered');
    let input = typeWords.value;
    let uptoInput = generatedParagraph.substr(0,input.length);
    let remaining = generatedParagraph.substr(input.length,generatedParagraph.length);
    let end = false;
    // console.log("Input String : "+input);
    // console.log("remaining string : "+remaining);
    // console.log(input+":"+uptoInput+","+input.length+":"+uptoInput.length);
    
    if(input==uptoInput){
        // score.style.background = 'rgb(80, 226, 153)';
        let tn1 = document.createTextNode(uptoInput);
        let span = document.createElement('span');
        span.style.color="rgb(59, 197, 128)";
        span.appendChild(tn1);
        let tn3 = document.createTextNode(remaining);
        words.innerText="";
        words.append(span);
        words.append(tn3);
        correctIndex = input.length-1;
        generateScore(input.length);
        if(input==generatedParagraph) {
            end=true;
        }
        words.style.background='white';
    }else{
        words.style.background = '#fff3f1';
        incorrect++;
    }
    if(end){
        end=performance.now();
        // alert('Total time taken : '+((end-start)/1000).toFixed(1)+" seconds");
        percentage.innerText = percentage.innerText+', in '+((end-start)/1000).toFixed(1)+" seconds";
        newStart=0;
    }
}

function generateScore(correctLength){
    let calculatedPercentage = ((100*correctLength)/generatedParagraph.length).toFixed(1);
    progress.style.width = calculatedPercentage+'%'; 
    percentage.innerText= calculatedPercentage+'%';
}