// Hidden timestamp: date and time the form was loaded
const timestamp = document.querySelector("#timestamp");
timestamp.value = new Date().toISOString();

// Open a modal when its card link is clicked
document.querySelectorAll("[data-modal]").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector(`#${link.dataset.modal}`).showModal();
    });
});

// Close buttons
document.querySelectorAll(".close-modal").forEach((button) => {
    button.addEventListener("click", () => button.closest("dialog").close());
});

// Clicking the backdrop also closes the modal
document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
    });
});
