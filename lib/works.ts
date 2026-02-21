export interface Work {
  slug: string;
  title: string;
  description: string;
  category: string;
  year: string;
  thumbnail: string;
  video?: string;
  images?: string[];
  tools?: string[];
}

const works: Work[] = [
  {
    slug: "desert-horse",
    title: "Desert Horse",
    description:
      "A surreal desert landscape with a lone horse running through endless dunes. Exploring the boundary between reality and digital abstraction.",
    category: "Motion",
    year: "2025",
    thumbnail: "/videos/horse-video.mp4",
    video: "/videos/horse-video.mp4",
    tools: ["After Effects", "Cinema 4D"],
  },
  {
    slug: "neural-drift",
    title: "Neural Drift",
    description:
      "Generative particle system that responds to audio input. Each frame is a unique composition born from sound waves.",
    category: "Generative",
    year: "2025",
    thumbnail: "",
    tools: ["p5.js", "Web Audio API"],
  },
  {
    slug: "void-typography",
    title: "Void Typography",
    description:
      "Experimental type design exploring the negative space between letterforms. Where does a letter end and the void begin?",
    category: "Typography",
    year: "2024",
    thumbnail: "",
    tools: ["Glyphs", "Processing"],
  },
];

export function getAllWorks(): Work[] {
  return works;
}

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}
