/*
  JOURNEY DATA
  ------------
  This is the only file you should need to edit to update your story.

  To add a photo: drop the image file into the /images folder using the
  exact filename listed in a chapter's "photos" array, e.g. images/caracas-1.jpg.
  If a photo file isn't found, a placeholder frame shows automatically —
  nothing breaks.

  Cities are visited on the map in the order they appear in this array.
*/

const journeyStops = [
  {
    id: "caracas",
    city: "Caracas",
    country: "Venezuela",
    lat: 10.4806,
    lng: -66.9036,
    chapters: [
      {
        dateLabel: "Roots",
        title: "Childhood & Early Education",
        org: "",
        text: "Where the story starts — early schooling and the years that shaped my love of language, culture, and connecting with people.",
        photos: ["caracas-roots-1.jpg", "caracas-roots-2.jpg"]
      },
      {
        dateLabel: "Jun – Aug 2022",
        title: "Social Media & Content Intern",
        org: "The Label",
        text: "Created social content and tracked analytics to improve audience engagement. Assisted with photoshoots, content production, and brand presentation, plus in-store merchandising and customer service.",
        photos: ["caracas-thelabel-1.jpg", "caracas-thelabel-2.jpg"]
      }
    ]
  },
  {
    id: "waltham",
    city: "Waltham",
    country: "Massachusetts, USA",
    lat: 42.3765,
    lng: -71.2356,
    chapters: [
      {
        dateLabel: "Aug 2021 – May 2025",
        title: "B.S. Marketing, Minor in Economics",
        org: "Bentley University · Honors Program",
        text: "GPA 3.55. President's List (Fall 2024, Spring 2025); Dean's List (Spring 2022, Fall 2022, Spring 2023). Completed the Women's Leadership Program.",
        photos: ["waltham-bentley-1.jpg", "waltham-bentley-2.jpg"]
      },
      {
        dateLabel: "Jan – Apr 2023",
        title: "General Body Member",
        org: "Whittemore ESE — Volunteer",
        text: "Taught English to a diverse group of Hispanic speakers, provided compassionate support, and collaborated on initiatives creating professional, academic, and social opportunities for the community.",
        photos: ["waltham-volunteer-1.jpg"]
      }
    ]
  },
  {
    id: "milan",
    city: "Milan",
    country: "Italy",
    lat: 45.4642,
    lng: 9.1900,
    chapters: [
      {
        dateLabel: "Study Abroad",
        title: "Semester at Bocconi University",
        org: "",
        text: "Spent a semester abroad immersed in Italian culture and business education — a chapter that sharpened my global perspective on marketing and brand strategy.",
        photos: ["milan-bocconi-1.jpg", "milan-bocconi-2.jpg"]
      }
    ]
  },
  {
    id: "aventura",
    city: "Aventura",
    country: "Florida, USA",
    lat: 25.9565,
    lng: -80.1392,
    chapters: [
      {
        dateLabel: "Oct 2025 – Jan 2026",
        title: "Marketing Intern",
        org: "Prime Group",
        text: "Developed content calendars, graphics, and videos across multiple platforms. Analyzed campaign performance using Hootsuite, Meta Insights, and platform analytics. Coordinated email marketing, Eventbrite promotions, QR campaigns, influencer partnerships, and digital assets.",
        photos: ["aventura-intern-1.jpg", "aventura-intern-2.jpg"]
      },
      {
        dateLabel: "Jan 2026 – Present",
        title: "Social Media Coordinator",
        org: "Prime Group",
        text: "Manage social media for 20+ hospitality, restaurant, and residential brands, including Marriott and Hilton. Conduct market research and audience analysis to develop data-driven campaigns, manage Meta advertising end-to-end, and collaborate with executives and property leaders on multi-brand initiatives. Developed a recurring event series that increased attendance by 62%.",
        photos: ["aventura-primegroup-1.jpg", "aventura-primegroup-2.jpg"]
      }
    ]
  }
];
