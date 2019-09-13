//GLOBAL VARIABLER
let udregn = document.querySelector('#udregn');
udregn.addEventListener("click", validering);

let forNavn = document.querySelector('#forNavn');
let efterNavn = document.querySelector('#efterNavn');

//Variabler for at udskrive personlig tilbagemelding
let fejl = document.querySelector('#fejl');
let resultat = document.querySelector('#resultat');
let lonOutput = document.querySelector('#lonOutput');
let skat = document.querySelector('#skat');
let skatOutput = document.querySelector('#skatOutput');
let placering = document.querySelector('#placering');


//Variabler for gennemsnit udregning
let indkomstArray = [];
let indkomstArraySkat = [];
let forskatText = document.querySelector('#forskat');
let efterskatText = document.querySelector('#efterskat');

//Funktion for validering
function validering() {
    let lon = document.querySelector('#lon');

    if (forNavn.value == null || forNavn.value == "" || forNavn.value.length < 3){
        fejl.innerHTML = "Du mangler fornavn";
        document.querySelector('#stj1').innerHTML = "*";
        return false;
    } else{
        if (efterNavn.value == null || efterNavn.value == "" || efterNavn.value.length < 3){
            fejl.innerHTML = "Du mangler efternavn";
            document.querySelector('#stj1').innerHTML = "";
            document.querySelector('#stj2').innerHTML = "*";
            return false;
        }else if(lon.value.length < 3){
            //Validerer at lønnen er mere end 2 tal i længden
            fejl.innerHTML = "Du skal skrive et valideret løn";
            document.querySelector('#stj3').innerHTML = "*";
            document.querySelector('#stj2').innerHTML = "";
            return false;
        }else {
            if(isNaN(lon.value)){
                //Validerer om lønnen er et tal og ikke bogstaver
                fejl.innerHTML = "Du skal skrive et tal i løn";
                document.querySelector('#stj3').innerHTML = "*";
                document.querySelector('#stj2').innerHTML = "";
                return false;
            } else {
                udregner();
                document.querySelector('#stj3').innerHTML = "";
            }
        }
    }
}
//Funktion for at slette indhold i input felterne
function clearInput(){
        //Function som sletter værdierne i input felterne
        forNavn.value = null;
        efterNavn.value = null;
        let sletlon = document.querySelector('#lon').value;
        sletlon = null; //Virker ikke
    }
//Funktion for at udregne skatten
function udregner(){
    let heleNavn = forNavn.value.charAt(0).toUpperCase() + forNavn.value.slice(1) + " " + efterNavn.value.charAt(0).toUpperCase() + efterNavn.value.slice(1);
    let lon = parseInt(document.querySelector('#lon').value);
    let region = document.querySelector('#region').value;
    switch(region){
        case "nordsjaelland":
        totalToPay = lon * 0.25;
        break;
        case "hovedstaden":
        totalToPay = lon * 0.30;
        break;
        case "syddanmark":
        totalToPay = lon * 0.21;
        break;
        case "midtjylland":
        totalToPay = lon * 0.20;
        break;
        case "nordjylland":
        totalToPay = lon * 0.23;
        break;
        }
    resultat.innerHTML = "Hej " + heleNavn + ", din løn er: ";
    lonOutput.innerHTML = lon;
    skat.innerHTML = "Hvilket betyder at du skal betale:";
    skatOutput.innerHTML =  totalToPay + "kr i skat";
    placering.innerHTML = "da du bor i " + region + ".";
    fejl.innerHTML = "";
    clearInput(); //Kalder slet værdier funktionen
    gennemsnitUdregner(totalToPay);
}

// let resultat = document.querySelector('#resultat');
// let lonOutput = document.querySelector('#lonOutput');
// let skat = document.querySelector('#skat');
// let skatOutput = document.querySelector('#skatOutput');
// let placering = document.querySelector('#placering');


//Funktion der udregner gennemsnit før og efter skat, ved at gemme input værdierne i et array
//Opgave: Indsæt løn før og efter skat ind i et array
function gennemsnitUdregner(totalToPay) {
    //Før skat gennemsnit variabler og push
    let lon = parseInt(document.querySelector('#lon').value);
    indkomstArray.push(lon);
    let samletBelob = 0;
    
    for(let sal of indkomstArray){
        samletBelob += sal;
    }

    //Efter skat gennemsnit variabler og push
    indkomstArraySkat.push(lon - totalToPay);
    let samletBelobSkat = 0;

    for(let salSkat of indkomstArraySkat){
        samletBelobSkat += salSkat;
    }


    let forskat = samletBelob/indkomstArray.length;
    let efterskat = samletBelobSkat/indkomstArraySkat.length;

    forskatText.innerHTML = "Før skat: " + forskat;
    efterskatText.innerHTML = "Efter skat: " + efterskat;

    console.log(indkomstArraySkat);
    console.log("Samtel beløb: " + samletBelobSkat);
}


