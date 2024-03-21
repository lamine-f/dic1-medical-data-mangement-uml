let connect = document.getElementById('connect');
let nom = document.getElementById('name');
let genre = document.getElementById('genre');
let matricule = document.getElementById('matricule');
let linkRef = document.getElementById('href');

connect.onclick = () =>{
    if (nom.value === "" || matricule.value === "" || genre.value === "Civilité") {
        document.getElementById('popup').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }
    else {
        linkRef.href = "infoPatient.html";
    }
}
    
function fermerPopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
