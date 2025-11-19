// #AAAAaaaagggggg!!
let allQuestions=[{question:"Q1. What is the rarest eye colour?", name:"Q1",options:{"1":"Yellow","2":"Red","3":"Green","4":"Blue"}},{question:"Q2.Which is the only animal in the world that cannot jump?",name:"Q2",options:{"1":"Rhinoceros","2":"Elephant","3":"Hippopotamus","4":"Giraffe"}},{question:"Q3. Which animal cannot stick its tongue out?",name:"Q3",options:{"1": "Crocodile", "2":"Alligator","3":"Komodo Dragon", "4":"Snake"}}];

let correctAnswers={"Q1":"1", "Q2":" 2", "Q3":" 3"};

let maxMarks=3;
let userMarks=0;

let currentQuestionIndex=0;
let userAnswers={};

const questionTextElement=document.getElementById("question-text"); //paragraph
const optionsContainerElement=document.getElementById("options-container"); //form
const nextButton=document.getElementById("next");  //next button

function saveAnswer(event)
{
    const questionName=event.target.name;  
    const selectedValue=event.target.value;

    userAnswers[questionName]=selectedValue;  //creating our answer sheet :D
}
function loadQuestion()
{
    const q=allQuestions[currentQuestionIndex];  //A particular question set out of all (in list)
    questionTextElement.innerText=q.question;  //Showing question on page through paragraph tag

    optionsContainerElement.innerHTML='';  //keeping form tag empty for now (reason aage pata chalega)
    
    for(const optionValue in q.options){   //went inside the options object of that particular question (key ko store kar raha)
        const optionText=q.options[optionValue]; //label utha liya option ka

        const radio=document.createElement('input');  //Input naam ka tag banaya aur uski responsibility radio var ko de di
        //creating attributes over next 5 lines
        radio.type='radio';
        radio.name=q.name; //Ex- will be "q1" for 1
        radio.value=optionValue; //Ex- will be "1" for 1
        radio.id=q.name+optionValue; //from above 2 examples, it will be q11 (concatenation of strings)

        radio.className="button"; //used in style sheets

        radio.addEventListener('click',saveAnswer); //Making javascript know, that: run saveAnswer() function, only when user clicks an option

        const label=document.createElement('label');  //label tag bana rahe aur uski responsibility label var ko de rahe
        label.htmlFor=q.name+optionValue; //Creating attribute
        label.innerText=optionText;  //Inserting content inside tag
        label.className='option'; //Creating attribute
        /*Ab actual form tag me:
            1.option "button" (input)
            2.option "text" (label)
            3.aur ek br tag (just for cleanliness)
        daale rahe :D*/
        optionsContainerElement.appendChild(radio);
        optionsContainerElement.appendChild(label);
        optionsContainerElement.appendChild(document.createElement('br'));
    }

}

nextButton.addEventListener('click',function (){
    const currentQuestionName=allQuestions[currentQuestionIndex].name; //Ex- will be "q1" for 1
    if(!userAnswers[currentQuestionName]) //Agar user wale answer wale object me yeh key-value pair exist nahi karta, toh iske ander chale jana
    {
        alert("Please select an option before moving on!"); //a built-in function
        return;
    }
    //Ab agar exist karta hai Toh:
    currentQuestionIndex++;

    if(currentQuestionIndex<allQuestions.length)
    {
        loadQuestion(); //load question function, jo humne upar abhi itna lamba khecha tha. Tabhi humne form ko pehle khaali kiya tha! taaki pichli baat vahi khatam ho jaaye
    }
    else
    {
        alert("Quiz completed! Check the console for your answers.");
        for(let a in userAnswers){
            if(userAnswers[a]===correctAnswers[a])
    userMarks++;
else
    continue;
}

        questionTextElement.innerText="Quiz Finished!"; //P tag ko humne update kiya
        optionsContainerElement.innerHTML=''; //form ko at the end khaali kar diya

const result=document.createElement("p");
result.innerText("Score= ",userMarks,"/",maxMarks);
        nextButton.style.display='none'; //button ko gaayab kar diya
    }
}
);

/* Ab agar tu dekhe, to yeh sab abhi different functions me hai
    (aur ek event listener bhi hai...), aur kuch bhi nhi chalega jab tak call nahi hoga (ya click)*/
loadQuestion(); //  #chingari
