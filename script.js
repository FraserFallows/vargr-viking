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
        const btn = contactForm.querySelector("button[type='submit']");
        btn.disabled = true;
        btn.textContent = "Sending...";
        try {
            const res = await fetch("https://vargr-viking-api.onrender.com/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message })
            });
            if (!res.ok) throw new Error();
            contactForm.innerHTML = "<p>Message sent. We'll be in touch.</p>";
        } catch {
            btn.disabled = false;
            btn.textContent = "Send";
            const existing = contactForm.querySelector(".form-error");
            if (!existing) {
                const err = document.createElement("p");
                err.className = "form-error";
                err.textContent = "Something went wrong — please try again in a moment.";
                contactForm.appendChild(err);
            }
        }
    });
}

const eventsList = document.querySelector(".events-list");
if (eventsList) {
    eventsList.innerHTML = "<p>Loading events...</p>";
    fetch("https://vargr-viking-api.onrender.com/events")
        .then(res => res.json())
        .then(events => {
            eventsList.innerHTML = "";
            if (events.length === 0) {
                eventsList.innerHTML = "<p>No upcoming events scheduled.</p>";
                return;
            }
            events.forEach(e => {
                const div = document.createElement("div");
                div.className = "event";
                div.innerHTML = `
                      <h3>${e.title}</h3>
                      <p>${e.event_date.split("T")[0]} &bull; ${e.location}</p>
                      <p>${e.description}</p>`;
                eventsList.appendChild(div);
            });
        })
        .catch(() => {
            eventsList.innerHTML = "<p>Events unavailable — check back shortly.</p>";
        });
}