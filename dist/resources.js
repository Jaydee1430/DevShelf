const resources = [
    {
        title: "The Modern Web Developer",
        category: "Books",
        lang: "JavaScript",
        description: "Comprehensive guide to full-stack development.",
        type: "E-Book",
        color: "yellow",
        tag: "Free",
        image: "../img/Javascript/javacript1.jpg",
    },
    {
        title: "Javascript from Beginner to Professional",
        category: "Books",
        lang: "JavaScript",
        description: "Learn JavaScript from scratch to advanced topics.",
        type: "E-Book",
        color: "yellow",
        tag: "Free",
        image: "../img/Javascript/javascript2.jpg",
    },
    {
        title: "The Rust Programming Language",
        category: "Books",
        lang: "Rust",
        description: "The Rust programming language helps you write faster, more reliable software.",
        type: "E-Book",
        color: "orange",
        tag: "Free",
        image: "../img/Rust/rust1.jpg",
    },
    {
        title: "Mastering TypeScript",
        category: "Books",
        lang: "TypeScript",
        description: "Deep dive into advanced types and patterns.",
        type: "E-Book",
        color: "blue",
        tag: "Best Seller",
        image: "../img/TypeScript/type1.png",
    },
    {
        title: "Python for Data Science",
        category: "Books",
        lang: "Python",
        description: "Essential libraries for data analysis.",
        type: "E-Book",
        color: "green",
        tag: "Free",
        image: "../img/Python/python1.jpg",
    },
    {
        title: "Go Concurrency Patterns",
        category: "Articles",
        lang: "Go",
        description: "Master channels and goroutines.",
        type: "Article",
        color: "cyan",
        tag: "Premium",
        image: "../img/Go/go1.jpg",
    },
    {
        title: "Modern Programming in Java",
        category: "Books",
        lang: "Java",
        description: "Comprehensive guide to mastering the principles, tools, and techniques of contemporary software development.",
        type: "E-Book",
        color: "red",
        tag: "Updated",
        image: "../img/Java/java.jpg",
    },
    {
        title: "C++ High Performance",
        category: "Books",
        lang: "C++",
        description: "Optimization techniques for modern C++.",
        type: "E-Book",
        color: "pink",
        tag: "Advanced",
        image: "../img/C++/c++1.png",
    },
];
let currentCategory = "All";
let currentSearch = "";
let currentLang = "All";
const grid = document.getElementById("resources-grid");
const searchInput = document.getElementById("search-input");
const langFilter = document.getElementById("language-filter");
const tabBtns = document.querySelectorAll(".tab-btn");
/**
 * NEW LOGIC: Check URL for ?lang=Name
 */
function checkURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");
    if (!langParam)
        return;
    const options = Array.from(langFilter.options).map((opt) => opt.value);
    if (options.indexOf(langParam) !== -1) {
        currentLang = langParam;
        langFilter.value = langParam;
    }
}
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
        <div class="bg-[#1a1530] rounded-xl overflow-hidden hover:ring-2 hover:ring-indigo-500/50 transition-all duration-300 group cursor-pointer">

            <!-- IMAGE SECTION (BOOK SVG REMOVED) -->
            <div class="relative h-48 overflow-hidden">
                <img
                  src="${res.image}"
                  alt="${res.title}"
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

                <span class="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  ${res.tag}
                </span>
            </div>

            <div class="p-6">
                <div class="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
                  ${res.type}
                </div>

                <h3 class="text-white font-bold text-xl mb-2 group-hover:text-indigo-400 transition">
                  ${res.title}
                </h3>



                <p class="text-gray-400 text-sm mb-4">
                  ${res.description}
                </p>

                <div class="flex items-center justify-between">
                    <span class="text-indigo-300 text-sm font-bold px-3 py-1 bg-indigo-500/20 rounded-md border border-indigo-500/30">
                      ${res.lang}
                    </span>

                    <span class="text-indigo-400 hover:text-indigo-300 text-sm font-semibold flex items-center gap-1">
                        View
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path d="M9 5l7 7-7 7"/>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    `)
        .join("");
    if (filtered.length === 0) {
        grid.innerHTML = `<p class="col-span-full text-center text-gray-500 py-20">No matching resources found for "${currentLang}".</p>`;
    }
}
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
        tabBtns.forEach((b) => {
            b.classList.remove("text-indigo-500", "border-b-2", "border-indigo-500");
            b.classList.add("text-gray-400");
        });
        btn.classList.add("text-indigo-500", "border-b-2", "border-indigo-500");
        btn.classList.remove("text-gray-400");
        currentCategory = btn.getAttribute("data-category") || "All";
        renderResources();
    });
});
// INITIALIZATION
checkURLParameters();
renderResources();
export {};
//# sourceMappingURL=resources.js.map