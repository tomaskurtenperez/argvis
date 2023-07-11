const smallsElements = document.getElementsByTagName("small");
const bodyElement = document.body;
var msjeToSave = "";
const boolsVerification = [false,false,false,false];

bodyElement.classList.add("fondoApi");

function freePlaceHolder(event)
{
    $input = event.target;
    msjeToSave = $input.placeholder;
    $input.placeholder = "";
}

/* 
*Event param(objeto html que lanza al evento)
*Se encarga de verificar el input para el userName, el user debe estar entre los rangos marcados.
*/
function validateUserName(event)
{
    let min = 10;
    let max = 15;

    $inputUser = event.target;
    let stringText = ($inputUser.value).trim();
    boolsVerification[0] = false;

    if(stringText.length > 0)
    {
        if(!(stringText.length > min-1 && stringText.length < max+1))
        {
            $inputUser.classList.add("errorInput");
            smallsElements[0].innerHTML = "El usuaario debe estar compuesto de 10 a 15 caracteres..";            
        }
        else
        {
            $inputUser.classList.remove("errorInput");
            $inputUser.classList.add("successInput");
            smallsElements[0].innerHTML = "";
            boolsVerification[0] = true;
        }
    }
}

/* 
*Event param(objeto html que lanza al evento)
*Se encarga de verificar el input para el mail, el mail,debe estar en un formato correcto (@.com)..
*/
function validateEmail(event)
{
    $mailInput = event.target;
    let mailDirection = ($mailInput.value).trim();
    boolsVerification[1] = false;

    if(mailDirection.length > 0)
    {
        if(!isEmail(mailDirection))
        {
            $mailInput.classList.add("errorInput");
            smallsElements[1].innerHTML = "Asegurese que el formato de mail sea correcto!";
        }
        else 
        {
            $mailInput.classList.remove("errorInput");
            $mailInput.classList.add("successInput");
            smallsElements[1].innerHTML = "";
            boolsVerification[1] = true;
        }
    }
}

/* 
*email param(string a verificar)
*Se encarga de verificar el formato del mail, a travez de una expresion regular..
*/
function isEmail(email) 
{
    let regExpres = /\S+@\S+\.\S+/;
    return regExpres.test(email);
}

/* 
*Event param(objeto html que lanza al evento)
*Se encarga de verificar el input para la contraseña, esta debe estar compuesta por 8 a 10 caracteres, incluyendo
*un caracter especial y 2 numeros..
*/
function validatePassword(event)
{
    $passwordInput = event.target;
    let passW = ($passwordInput.value).trim();
    boolsVerification[2] = false;

    if(passW.length > 0)
    {
        switch(isPassword(passW))
        {
            case 0:
                $passwordInput.className = "";
                $passwordInput.classList.add("successInput");
                smallsElements[2].innerHTML = "";
                boolsVerification[2] = true;
            break;
            case -1:
                $passwordInput.className = "";
                $passwordInput.classList.add("errorInput");
                smallsElements[2].innerHTML = "La contraseña debe contener al menos 8 caracteres,2 numeros y 1 caracter especial..";
            break;
            case -2:
                $passwordInput.className = "";
                $passwordInput.classList.add("warningInput");
                smallsElements[2].innerHTML = "La contraseña es debil, recomendamos agregar mas caracteres..";
                boolsVerification[2] = true;
            break;
        }
    }
}

function isPassword(password)
{
    //let contOcurrences = 0;
    let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let flagNumber = false;
    let numbersCounter = 0;
    let ret = -1;
    let flagSpecChar = false;
    
    $rePasswordInput = document.getElementsByName("rePassword")[0];
    if($rePasswordInput.value != "")
    {
        $rePasswordInput.value = "";
        $rePasswordInput.className = "";
    }    

    if(password.length > 0)
    {
        for(let index in password)
        {
            if(!flagNumber && !isNaN(password[index]))
            {
                numbersCounter++;
                if(numbersCounter == 2)
                {
                    flagNumber = true;
                }
            }

            if(!flagSpecChar && specialChars.test(password[index]))
            {
                flagSpecChar = true;
            }
        }
        if(flagSpecChar && flagNumber)
        {
            if(password.length > 7)
            {
                ret = 0; 
            }
            else
            {
                if((password.length > 4 && password.length < 8))
                {
                    ret = -2; 
                }   
            }         
        }
    }
    return ret;
}

/* 
*Event param(objeto html que lanza al evento)
*Se encarga de verificar el input para la confirmacion de la contraseña,
*sea exactamente igual a la contraseña
*/
function validateRePassword(event)
{
    $passwordInput = document.getElementsByName("password")[0];
    $password = $passwordInput.value;
    $rePinput = event.target;
    $rePassword = ($rePinput.value).trim(); 
    boolsVerification[3] = false;

    if($rePassword == $password)
    {
        $rePinput.classList.remove("errorInput");
        $rePinput.classList.add("successInput");
        boolsVerification[3] = true;
        smallsElements[3].innerHTML = "";
    }
    else
    {
        $rePinput.classList.add("errorInput");
        smallsElements[3].innerHTML = "Las contraseñas no coinciden!";
    }
}

/* 
*Event param(objeto html que lanza el evento)
*Se encarga, de liberar los input y quitar estilos css, siempre que estos esten vacios al igual que las
*etiquetas guia en los elementos small..
*/
function leaveInput(event)
{
    $inputUser = event.target;
    $stringText = $inputUser.value;
    let boolVaciar = $stringText.length > 0 ? false : true;

    if(boolVaciar)
    {
        $inputUser.className = "";
        $inputUser.placeholder = msjeToSave;
        for(let i in smallsElements)
        {
            smallsElements[i].innerHTML = "";
        }
    }
}

/*
*Manejador de evento para el boton submit, siempre que el array de flags guia, no sea falso, simula el logeo
*sino, alert de error..
*/
function submitEventHandler()
{
    if(!boolsVerification.includes(false))
    {
        alert("Logeado con exito!!");
    }
    else
    {
        alert("Asegurese de completar y verificar que todos los campos esten correctos!");
    }
}