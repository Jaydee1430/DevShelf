import { resources } from "./data.js";
function initDetails() {
    const params = new URLSearchParams(window.location.search);
    const titleParam = params.get("title");
    if (!titleParam) {
        window.location.href = "resources.html";
        return;
    }
    const decodedTitle = decodeURIComponent(titleParam);
    const res = resources.find((item) => item.title === decodedTitle);
    if (res) {
        // Injecting data into HTML
        document.getElementById("res-title").textContent = res.title;
        document.getElementById("res-description").textContent = res.description;
        document.getElementById("res-breadcrumb").textContent = res.title;
        document.getElementById("res-category").textContent = res.category;
        document.getElementById("res-lang-tag").textContent = res.lang;
        document.getElementById("res-type").textContent = res.type;
        const imageBox = document.getElementById("res-image-box");
        if (imageBox) {
            imageBox.innerHTML = `<img src="${res.image}" class="w-full h-full object-cover" alt="${res.title}">`;
        }
        document.title = `${res.title} - DevShelf`;
    }
}
document.addEventListener("DOMContentLoaded", initDetails);
//# sourceMappingURL=details.js.map