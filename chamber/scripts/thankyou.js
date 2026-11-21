const params = new URLSearchParams(window.location.search);

const fields = ["first", "last", "email", "phone", "organization"];

fields.forEach((field) => {
    document.querySelector(`#${field}`).textContent = params.get(field) || "Not provided";
});

// Show the timestamp as a readable local date and time
const stamp = params.get("timestamp");
document.querySelector("#timestamp").textContent = stamp
    ? new Date(stamp).toLocaleString()
    : "Not provided";
