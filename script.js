const hamburger = document.getElementById("hamburger");
const navUl = document.querySelector("nav ul");

hamburger.addEventListener("click", () => {
    const isOpen = navUl.classList.toggle("open");
    hamburger.classList.toggle("open");

    if (!isOpen) {
        document.querySelectorAll("nav li.expanded").forEach(li => {
            li.classList.remove("expanded");
            li.querySelector(".dropdown-toggle").textContent = '▾';
        });
    }
});

document.querySelectorAll(".dropdown-toggle").forEach(button => {
    button.addEventListener("click", () => {
        const li = button.parentElement;
        li.classList.toggle("expanded");
        button.textContent = li.classList.contains("expanded") ? '▴' : '▾';
    });
});
