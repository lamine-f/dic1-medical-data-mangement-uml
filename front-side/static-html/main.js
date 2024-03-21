//Display nav
let option = document.getElementById('option');

const links = document.querySelectorAll("#option .option_left");
links.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        links.forEach(link => {
            link.classList.remove("active");
        });
        
        this.classList.add("active");
    });
});

/*Menu button*/
let menu = document.querySelector('.menu');
let nav = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
    menu_navbar = document.querySelector(".navbar");
    menu_navbar.classList.toggle(".active")
}
