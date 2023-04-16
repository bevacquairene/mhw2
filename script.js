/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function imgCliccata(event)
{
    const container = event.currentTarget; /* Elemento HTML che gestisce l'evento */
    for(let i=0; i<div.length;i++)
    {
        if(div[i].dataset.questionId===container.dataset.questionId)
        {
            div[i].classList.add('overlay');
            div[i].classList.remove('corretta');
            div[i].childNodes[3].src='images/unchecked.png';
        }
    }

    container.classList.add('corretta');
    container.classList.remove('overlay');

    container.childNodes[3].src='images/checked.png';
    verifica (event);
}

function verifica(event){
    let cnt=0;
    for(let i=0; i<array.length; i++){
        if(array[i].dataset.questionId==event.currentTarget.dataset.questionId){
            cnt=1;
            array.splice(i, 1, event.currentTarget);
            break; // ho già risposto alla domanda
        }
    }
    if(cnt==0){
        array.unshift(event.currentTarget);
    }
    
    if(array.length==3){
        for(let i=0; i<div.length; i++){
            div[i].removeEventListener('click', funzionamento);
        }
        risultato();
    }
}

function risultato(){
    let testo='';
    for(let i=0; i<array.length; i++){
        for(let k=0; k<array.length; k++){
            if(array[i].dataset.choiceId===array[k].dataset.choiceId && i!=k){
                testo=array[i].dataset.choiceId;
                break;
            }
        }
    }
    if(testo==''){
        for(let i=0; i<array.length; i++){
            if(array[i].dataset.questionId=='one'){
                testo=array[i].dataset.choiceId;
                break;
            }
        }
    }
    const container= document.querySelector('article');
    const section= document.createElement('section');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    const button = document.createElement('button');
    section.classList.add('risultato');
    button.classList.add('button');
    button.textContent='Ricomincia il quiz';
    container.appendChild(section);
    section.appendChild(h1);
    section.appendChild(p);
    section.appendChild(button);
    h1.textContent= RESULTS_MAP[testo].title;
    p.textContent= RESULTS_MAP[testo].contents;
    button.addEventListener('click', ripristina);

    
    /*const container= document.querySelector('#risultato');
        const h1 = document.createElement('h1');
        const p = document.createElement('p');
        const button = document.createElement('button');
        p.classList.add('p');
        button.classList.add('button');
        button.textContent='Ricomincia il quiz';
        container.appendChild(h1);
        container.appendChild(p);
        container.appendChild(button);
        
    h1.textContent= RESULTS_MAP[testo].title;
    p.textContent= RESULTS_MAP[testo].contents;
    container.classList.remove('hidden');
    button.addEventListener('click', ripristina);*/
}

function ripristina(){
    for(let i=0; i<div.length; i++){
        div[i].classList.remove('overlay');
        div[i].classList.remove('corretta');
        div[i].childNodes[3].src='images/unchecked.png';
    }
    const container=document.querySelector('article .risultato');
    container.remove();
    //container.classList.add('hidden');

    array=[];

    for(let i=0; i<div.length; i++)
    {
        div[i].addEventListener('click',funzionamento);
    }
}


function funzionamento(event)
{
    imgCliccata(event);

}


const div = document.querySelectorAll('section div');
let array=[];

for(let i=0; i<div.length; i++)
{
    div[i].addEventListener('click',funzionamento);
}