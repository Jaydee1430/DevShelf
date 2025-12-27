interface Resource {
  title: string;
  category: "Books" | "Challenges" | "Articles" | "All";
  lang: string;
  description: string;
  type: string;
  color: string;
  tag: string;
}

const resources: Resource[] = [
  {
    title: "The Modern Web Developer",
    category: "Books",
    lang: "JavaScript",
    description: "Comprehensive guide to full-stack development.",
    type: "E-Book",
    color: "yellow",
    tag: "Free",
  },
  {
    title: "Rust for JS Developers",
    category: "Challenges",
    lang: "Rust",
    description: "Learn memory management and safety.",
    type: "Workshop",
    color: "orange",
    tag: "Interactive",
  },
  {
    title: "Mastering TypeScript",
    category: "Books",
    lang: "TypeScript",
    description: "Deep dive into advanced types and patterns.",
    type: "E-Book",
    color: "blue",
    tag: "Best Seller",
  },
  {
    title: "Python for Data Science",
    category: "Articles",
    lang: "Python",
    description: "Essential libraries for data analysis.",
    type: "Article Series",
    color: "green",
    tag: "Free",
  },
  {
    title: "Go Concurrency Patterns",
    category: "Challenges",
    lang: "Go",
    description: "Master channels and goroutines.",
    type: "Course",
    color: "cyan",
    tag: "Premium",
  },
  {
    title: "Modern Java Internals",
    category: "Books",
    lang: "Java",
    description: "Deep dive into the JVM and memory.",
    type: "E-Book",
    color: "red",
    tag: "Updated",
  },
  {
    title: "C++ High Performance",
    category: "Articles",
    lang: "C++",
    description: "Optimization techniques for modern C++.",
    type: "Article",
    color: "pink",
    tag: "Advanced",
  },
];

let currentCategory: string = "All";
let currentSearch: string = "";
let currentLang: string = "All";

const grid = document.getElementById("resources-grid") as HTMLDivElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const langFilter = document.getElementById(
  "language-filter"
) as HTMLSelectElement;
const tabBtns = document.querySelectorAll<HTMLButtonElement>(".tab-btn");

/**
 * NEW LOGIC: Check URL for ?lang=Name
 */
function checkURLParameters(): void {
  const urlParams = new URLSearchParams(window.location.search);
  const langParam: string | null = urlParams.get("lang");

  if (!langParam) return;

  // Get all language options from the dropdown
  const options: string[] = Array.from(langFilter.options).map(
    (opt: HTMLOptionElement) => opt.value
  );

  // .indexOf(item) !== -1 is the older way to write .includes(item)
  if (options.indexOf(langParam) !== -1) {
    currentLang = langParam;
    langFilter.value = langParam; // Sync the dropdown UI
  }
}

function renderResources(): void {
  const filtered = resources.filter((res) => {
    const matchCat =
      currentCategory === "All" || res.category === currentCategory;
    const matchSearch = res.title
      .toLowerCase()
      .includes(currentSearch.toLowerCase());
    const matchLang = currentLang === "All" || res.lang === currentLang;
    return matchCat && matchSearch && matchLang;
  });

  grid.innerHTML = filtered
    .map(
      (res) => `
        <div class="bg-[#1a1530] rounded-xl overflow-hidden hover:ring-2 hover:ring-indigo-500/50 transition-all duration-300 group cursor-pointer">
            <div class="relative bg-gradient-to-br from-${res.color}-900/40 to-black h-48 flex items-center justify-center">
                <span class="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">${res.tag}</span>
                <svg class="w-20 h-20 text-${res.color}-400 opacity-80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
            </div>
            <div class="p-6">
                <div class="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">${res.type}</div>
                <h3 class="text-white font-bold text-xl mb-2 group-hover:text-indigo-400 transition">${res.title}</h3>
                <h3 class="text-white font-bold text-xl mb-2 group-hover:text-indigo-400 transition">${res.title}</h3>
                <p class="text-gray-400 text-sm mb-4">${res.description}</p>
                <div class="flex items-center justify-between">
                    <span class="text-indigo-300 text-sm font-bold px-3 py-1 bg-indigo-500/20 rounded-md border border-indigo-500/30">${res.lang}</span>
                    <span class="text-indigo-400 hover:text-indigo-300 text-sm font-semibold flex items-center gap-1">
                        View <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                    </span>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="col-span-full text-center text-gray-500 py-20">No matching resources found for "${currentLang}".</p>`;
  }
}

// Event Listeners
searchInput?.addEventListener("input", (e: Event) => {
  currentSearch = (e.target as HTMLInputElement).value;
  renderResources();
});

langFilter?.addEventListener("change", (e: Event) => {
  currentLang = (e.target as HTMLSelectElement).value;
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
checkURLParameters(); // 1. Check if we came from language.html
renderResources(); // 2. Render initial view
