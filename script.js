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

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = contactForm.querySelector("[name='name']").value;
        const email = contactForm.querySelector("[name='email']").value;
        const message = contactForm.querySelector("[name='message']").value;
        await fetch("https://vargr-viking-api.onrender.com/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });
        contactForm.reset();
        contactForm.innerHTML = "<p>Message sent. We'll be in touch.</p>";
    });
}

const eventsList = document.querySelector(".events-list");
if (eventsList) {
    fetch("https://vargr-viking-api.onrender.com/events")
        .then(res => res.json())
        .then(events => {
            eventsList.innerHTML = "";
            events.forEach(e => {
                const div = document.createElement("div");
                div.className = "event";
                div.innerHTML = `
                      <h3>${e.title}</h3>
                      <p>${e.event_date.split("T")[0]} &bull; ${e.location}</p>
                      <p>${e.description}</p>`;
                eventsList.appendChild(div);
            });
        });
}