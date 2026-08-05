/*
  JOURNEY DATA — LINEAR CHAPTER STRUCTURE
  ----------------------------------------
  Edit this file to update your story. Each object in `journeyChapters` is
  one full-page chapter, shown in array order. To add a photo, drop the
  image file into /images using the exact filename listed below — see
  images/README.md for the full list.
*/

const journeyChapters = [
  {
    id: "caracas-roots",
    number: 1,
    accent: "#E8622C",
    accentSoft: "#FDECD8",
    emoji: "🌴",
    kicker: "Chapter One",
    destination: "Caracas, Venezuela",
    title: "Where It All Began",
    lat: 10.4806,
    lng: -66.9036,
    template: "spread",
    label: "CHAPTER ONE · CARACAS, VENEZUELA",
    bgLeft: "images/chapters/venezuela-left-page.webp",
    bgRight: "images/chapters/venezuela-right-page.webp",
    leftIntro: `<p>Who was I? I grew up in Caracas, equally drawn to numbers and art — never guessing the two would meet in marketing. Beyond the classroom, I dreamed of the world beyond Venezuela, and that pull pushed me to fight for a place in Boston.</p>`,
    leftReflection: "What was I meant to create?",
    leftPhotosClass: "photos-lower-left",
    leftPhotos: [
      { file: "caracas-roots-1.jpg", ratio: "4/5", tilt: -2, deco: "pin", size: "primary",
        annotation: { text: "Alessia", left: "37%", top: "38%", arrow: "↓" } },
      { file: "caracas-roots-2.jpg", ratio: "4/3", tilt: 2, deco: "tape", size: "secondary" }
    ],
    rightCaption: "El Ávila, siempre presente.",
    rightPhotosClass: "photos-upper-mid",
    rightPhotos: [
      { file: "caracas-roots-3.jpg", ratio: "1/1", tilt: -2, deco: "paperclip", size: "primary" },
      { file: "caracas-roots-4.jpg", ratio: "3/4", tilt: 2, deco: "stamp-edge", size: "secondary" }
    ],
    stamp: "CARACAS · VENEZUELA",
    pageNumber: "01",
    ctaNext: "Boston"
  },
  {
    id: "boston-bentley",
    number: 2,
    accent: "#E63950",
    accentSoft: "#FDEEF0",
    emoji: "🎓",
    kicker: "Chapter Two",
    destination: "Boston, Massachusetts",
    title: "Where Ambition Took Shape",
    lat: 42.3765,
    lng: -71.2356,
    template: "spread",
    label: "CHAPTER TWO · BOSTON, MASSACHUSETTS",
    bgLeft: "images/chapters/boston-left-page.webp",
    bgRight: "images/chapters/boston-right-page.webp",
    leftIntro: `<p>Moving to Boston meant navigating a new city, a new independence, and a new sense of who I was becoming outside the classroom.</p>`,
    leftPhotos: [
      { file: "waltham-volunteer-1.jpg", ratio: "1/1", tilt: -2, deco: "pin" }
    ],
    leftSubNote: {
      label: "Jan – Apr 2023 · Whittemore ESE, Volunteer",
      text: "Taught English to a diverse group of Hispanic speakers, provided compassionate support, and collaborated on initiatives creating professional, academic, and social opportunities for the community."
    },
    rightCaption: "Boston taught me to dream bigger.",
    rightPhotos: [
      { file: "waltham-bentley-1.jpg", ratio: "4/5", tilt: 2, deco: "paperclip" },
      { file: "waltham-bentley-2.jpg", ratio: "4/3", tilt: -3, deco: "tape" }
    ],
    rightIntro: `<p><strong>B.S. Marketing, Minor in Economics</strong> — Bentley University, Honors Program</p>
<p>This is where I discovered marketing academically — the strategy, the psychology, the numbers behind it. GPA 3.55. President's List (Fall 2024, Spring 2025); Dean's List (Spring 2022, Fall 2022, Spring 2023). Completed the Women's Leadership Program.</p>`,
    stamp: "BOSTON · MASSACHUSETTS",
    tornNote: "A city classroom, a campus home.",
    pageNumber: "02",
    ctaNext: "Caracas"
  },
  {
    id: "the-label",
    number: 3,
    accent: "#12A594",
    accentSoft: "#E3F7F3",
    emoji: "📸",
    kicker: "Chapter Three",
    destination: "Caracas, Venezuela",
    title: "My First Real Experience",
    lat: 10.4806,
    lng: -66.9036,
    entries: [
      {
        dateLabel: "Jun – Aug 2022",
        role: "Social Media & Content Intern",
        org: "The Label",
        text: "Back in Caracas, this time putting the classroom to work. Created social content and tracked analytics to improve audience engagement. Assisted with photoshoots, content production, and brand presentation, plus in-store merchandising and customer service.",
        photos: ["caracas-thelabel-1.jpg", "caracas-thelabel-2.jpg"]
      }
    ]
  },
  {
    id: "milan",
    number: 4,
    accent: "#B15FC7",
    accentSoft: "#F6ECFA",
    emoji: "🍦",
    kicker: "Chapter Four",
    destination: "Milan, Italy",
    title: "A Global Perspective",
    lat: 45.4642,
    lng: 9.1900,
    template: "spread",
    label: "CHAPTER FOUR · MILAN, ITALY",
    bgLeft: "images/chapters/milan-left-page.webp",
    bgRight: "images/chapters/milan-right-page.webp",
    leftIntro: `<p>Milan — where cafés, trams, and centuries of design shaped how I see culture and craft.</p>`,
    leftPhotos: [
      { file: "milan-bocconi-1.jpg", ratio: "4/5", tilt: -2, deco: "tape" }
    ],
    rightCaption: "Milan taught me to see farther.",
    rightPhotos: [
      { file: "milan-bocconi-2.jpg", ratio: "4/3", tilt: 3, deco: "paperclip" }
    ],
    rightIntro: `<p><strong>Semester at Bocconi University</strong> — Study Abroad</p>
<p>A semester abroad that expanded my perspective on culture, fashion, and brand — sharpening how I think about marketing and strategy on a global scale.</p>`,
    stamp: "MILANO · ITALIA",
    tornNote: "Where heritage meets innovation.",
    pageNumber: "04",
    ctaNext: "Aventura"
  },
  {
    id: "prime-group",
    number: 5,
    accent: "#E8A73B",
    accentSoft: "#FDF4E0",
    emoji: "☀️",
    kicker: "Chapter Five",
    destination: "Aventura, Florida",
    title: "Where It All Comes Together",
    lat: 25.9565,
    lng: -80.1392,
    entries: [
      {
        dateLabel: "Oct 2025 – Jan 2026",
        role: "Marketing Intern",
        org: "Prime Group",
        text: "Developed content calendars, graphics, and videos across multiple platforms. Analyzed campaign performance using Hootsuite, Meta Insights, and platform analytics. Coordinated email marketing, Eventbrite promotions, QR campaigns, influencer partnerships, and digital assets.",
        photos: ["aventura-intern-1.jpg", "aventura-intern-2.jpg"]
      },
      {
        dateLabel: "Jan 2026 – Present",
        role: "Social Media Coordinator",
        org: "Prime Group",
        text: "Manage social media for 20+ hospitality, restaurant, and residential brands, including Marriott and Hilton. Conduct market research and audience analysis to develop data-driven campaigns, manage Meta advertising end-to-end, and collaborate with executives and property leaders on multi-brand initiatives. Developed a recurring event series that increased attendance by 62%.",
        photos: ["aventura-primegroup-1.jpg", "aventura-primegroup-2.jpg"]
      }
    ],
    aside: {
      label: "Also during this chapter — no fixed address",
      title: "Freelance Marketing & Editorial Contributor",
      org: "Maison Pearl · Remote · Jan 2025 – Jan 2026",
      text: "Wrote editorial and promotional content for product launches, including features in Elty Magazine, and localized marketing materials into Spanish for Hispanic audiences while keeping brand consistency."
    }
  },
  {
    id: "final",
    number: 6,
    kicker: "Final Page",
    destination: "",
    title: "The Journey Continues",
    isFinal: true,
    closingText: "Every stamp in this passport is a place I grew — as a marketer, a storyteller, and a person. This chapter is still being written, and I'd love for it to continue somewhere new.",
    linkedin: "https://www.linkedin.com/in/alessia-maria-di-giulio-76499a238",
    email: "alessiadigiulio408@gmail.com"
  }
];

const coverTagline = "An interactive digital travel journal — every chapter a passport stamp, each one revealing the next destination only when you're ready to continue.";
