/* Portfolio content shared by every section */

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */
export type Project = {
  id: number;
  title: string;
  description: string;
  image?: string;
  video?: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
};

/* --------------------------------------------------
   DATA
-------------------------------------------------- */
export const projects: Project[] = [
  {
    id: 1,
    title: "learnest",
    description:
      "An AI-powered platform designed to help students prepare for exams and assist teachers in creating exams automatically. The system focuses on smart question generation, analytics, and seamless assessment workflows.",
    image: "/projects/learnest.png",
    video: "",
    tags: [
      "TypeScript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Shadcn UI",
      "MongoDB",
      "OpenAI",
      "Razorpay",
    ],
    demoUrl: "https://trylearnest.com/",
    githubUrl: "#",
  },

  {
    id: 2,
    title: "Esho Natok Shikhi",
    description:
      "A full-stack drama school platform with dynamic content and admissions workflow.",
    image: "/projects/project2.png",
    video: "/projects/esho-natok-shiki.mp4",
    tags: ["React", "TypeScript", "MongoDB", "Node"],
    demoUrl: "https://esonatakshikhi.com",
    githubUrl: "#",
  },

  {
    id: 3,
    title: "TrailCast",
    description:
      "Moto vlogs, Himalayan treks and summit climbs with a live map beside the YouTube video. The route and key points come from a GPS file or AI, a marker follows the video as it plays, and viewers save the stops to Google Maps, a GPX file or a trip sheet.",
    image: "/projects/Trailcast-home.png",
    video: "",
    tags: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Leaflet",
      "Node",
      "Express",
      "MongoDB",
      "Gemini",
    ],
    demoUrl: "https://riderai-client.vercel.app",
    githubUrl: "https://github.com/swarnadeep31/RiderAI",
  },
];

export const skills = [
  { name: "HTML / CSS", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "MongoDB", category: "backend" },
  { name: "SQL", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Git & GitHub", category: "tools" },
  { name: "Figma", category: "tools" },
  { name: "VS Code", category: "tools" },
  { name: "Next.js", category: "frontend" },
  { name: "NextAuth", category: "frontend" },
  { name: "Recharts", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Mongoose", category: "backend" },
];

export const categories = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "tools", label: "Tools" },
] as const;

export const marquee = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "MongoDB",
  "Framer Motion",
  "PostgreSQL",
];

export const highlights = [
  {
    title: "Frontend Engineering",
    desc: "Modern, scalable UI development using React, TypeScript, and Tailwind.",
  },
  {
    title: "Computer Science",
    desc: "Strong foundation in software engineering and problem-solving.",
  },
  {
    title: "Real Projects",
    desc: "Hands-on experience building and shipping production-ready applications.",
  },
];

export const contact = {
  email: "swarnadeep040@gmail.com",
  phone: "+91 74397 32996",
  phoneHref: "tel:+917439732996",
  location: "Kolkata, India",
  resume:
    "https://drive.google.com/file/d/1iZ9ETEipOLoIenft9WvnpmHmUbxjhURj/view?usp=sharing",
};
