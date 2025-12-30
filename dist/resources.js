import { resources } from "./data.js";
const grid = document.getElementById("resources-grid");
const searchInput = document.getElementById("search-input");
const langFilter = document.getElementById("language-filter");
const tabBtns = document.querySelectorAll(".tab-btn");
let currentCategory = "All";
let currentSearch = "";
let currentLang = "All";
function renderResources() {
    const filtered = resources.filter((res) => {
        const matchCat = currentCategory === "All" || res.category === currentCategory;
        const matchSearch = res.title
            .toLowerCase()
            .includes(currentSearch.toLowerCase());
        const matchLang = currentLang === "All" || res.lang === currentLang;
        return matchCat && matchSearch && matchLang;
    });
    grid.innerHTML = filtered
        .map((res) => `
    <div 
      onclick="navigateToDetails('${encodeURIComponent(res.title)}')"
      class="bg-[#1a1530] rounded-xl overflow-hidden hover:ring-2 hover:ring-indigo-500/50 transition-all duration-300 group cursor-pointer"
    >
      <div class="relative h-48 overflow-hidden">
        <img src="${res.image}" alt="${res.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
        <span class="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">${res.tag}</span>
      </div>
      <div class="p-6">
        <div class="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">${res.type}</div>
        <h3 class="text-white font-bold text-xl mb-2 group-hover:text-indigo-400 transition">${res.title}</h3>
        <p class="text-gray-400 text-sm mb-4">${res.description}</p>
        <div class="flex items-center justify-between">
          <span class="text-indigo-300 text-sm font-bold px-3 py-1 bg-indigo-500/20 rounded-md border border-indigo-500/30">${res.lang}</span>
          <span class="text-indigo-400 hover:text-indigo-300 text-sm font-semibold flex items-center gap-1">
            View <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    </div>
  `)
        .join("");
}
// Global function to handle redirect
window.navigateToDetails = (encodedTitle) => {
    window.location.href = `details.html?title=${encodedTitle}`;
};
// Event Listeners
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderResources();
});
langFilter === null || langFilter === void 0 ? void 0 : langFilter.addEventListener("change", (e) => {
    currentLang = e.target.value;
    renderResources();
});
tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        tabBtns.forEach((b) => b.classList.remove("text-indigo-500", "border-b-2", "border-indigo-500"));
        btn.classList.add("text-indigo-500", "border-b-2", "border-indigo-500");
        currentCategory = btn.getAttribute("data-category") || "All";
        renderResources();
    });
});
renderResources();
//# sourceMappingURL=resources.js.map