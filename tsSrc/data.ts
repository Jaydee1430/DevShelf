export interface Resource {
  title: string;
  category: "Books" | "Challenges" | "Articles" | "All";
  lang: string;
  description: string;
  type: string;
  tag: string;
  image: string;
}

export const resources: Resource[] = [
  {
    title: "The Modern Web Developer",
    category: "Books",
    lang: "JavaScript",
    description: "Comprehensive guide to full-stack development.",
    type: "E-Book",
    tag: "Free",
    image: "../img/Javascript/javacript1.jpg",
  },
  {
    title: "Javascript from Beginner to Professional",
    category: "Books",
    lang: "JavaScript",
    description: "Learn JavaScript from scratch to advanced topics.",
    type: "E-Book",
    tag: "Free",
    image: "../img/Javascript/javascript2.jpg",
  },
  {
    title: "Mastering TypeScript",
    category: "Books",
    lang: "TypeScript",
    description: "Deep dive into advanced types and patterns.",
    type: "E-Book",
    tag: "Best Seller",
    image: "../img/TypeScript/type1.png",
  },
  {
    title: "Modern React Patterns",
    category: "Articles",
    lang: "JavaScript",
    description:
      "A deep dive into hooks, context, and state management for scalable applications.",
    type: "Article",
    tag: "Updated",
    image:
      "https://ui-avatars.com/api/?name=React+Patterns&background=6366f1&color=fff",
  },
];
