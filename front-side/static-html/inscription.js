let newPatient = document.getElementById('inscrire');
let nom = document.getElementById('name');
let fermer = document.getElementById('close');
let genre = document.getElementById('genre');
let inscriptionPage = document.getElementById('inscription_page');
let inscriptionValidated = document.getElementById('inscription_valid');
let matriculeID = document.getElementById('matriculeID');
    

inscriptionValidated.style.display = 'none';

newPatient.onclick = () =>{
    matrimoniale = document.getElementById('matrimoniale');
    age = document.getElementById('age');
    numero = document.getElementById('tel');
    adresse = document.getElementById('address');
    profession = document.getElementById('profession');
    socioLevel = document.getElementById('socioLevel');
    if (nom.value === '' ||
        genre.value === "Civilité" ||
        matrimoniale.value === "Situation Matrimoniale" ||
        numero.value === "" ||
        age.value === "" ||
        adresse.value === "" ||
        profession.value === "" ||
        socioLevel.value === "Niveau Socioéconomique") 
    {
        document.getElementById('popup').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }
    else{
        const randomCode = generateRandomCode();
        inscriptionPage.style.display = 'none';
        inscriptionValidated.style.display = 'block';
        matriculeID.textContent = randomCode;
    }
}
    
function fermerPopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function generateRandomCode() {
    const generateRandomDigits = (count) => {
        let digits = '';
        for (let i = 0; i < count; i++) {
            digits += Math.floor(Math.random() * 10);
        }
        return digits;
    };

    const generateRandomLetters = (count) => {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let letters = '';
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            letters += characters.charAt(randomIndex);
        }
        return letters;
    };

    const shuffleString = (str) => {
        return str.split('').sort(() => Math.random() - 0.5).join('');
    };

    const digits = generateRandomDigits(3);
    const letters = generateRandomLetters(3);
    const code = shuffleString(digits + letters);

    return code;
}