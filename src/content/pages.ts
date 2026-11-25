/**
 * Editorial copy shared across the website.
 */

export const homeCopy = {
  heroEyebrow: "AURELIA ACADEMY · INDEPENDENT SCHOOL",
  heroTitle: "A place to grow, question, and belong.",
  heroDescription:
    "An inspirational learning community where strong foundations, curious minds and a sense of purpose shape every school day.",
  introEyebrow: "Who we are",
  introTitle: "A community built around every student.",
  introBody: [
    "Aurelia Academy brings together thoughtful teaching, strong relationships and a genuine love of learning.",
    "Academic life, pastoral care and enrichment sit side by side, giving students the confidence to explore ideas and develop their own voice.",
  ],
  vision:
    "To nurture thoughtful, confident young people who are ready to learn, lead and contribute with kindness.",
  mission:
    "We create a rigorous, supportive and imaginative learning environment where every student is known, challenged and encouraged to thrive.",
  highlightsTitle: "The school at a glance",
  highlightsIntro:
    "Four themes shape the way our students learn, grow and contribute.",
  highlights: [
    {
      title: "Student-centred learning",
      description: "Teaching designed around curiosity, clear foundations and meaningful discussion.",
    },
    {
      title: "Wide-ranging enrichment",
      description: "Sport, arts, clubs and experiences that extend learning beyond the timetable.",
    },
    {
      title: "Pastoral care",
      description: "A house system and mentoring approach built around belonging and wellbeing.",
    },
    {
      title: "Community partnership",
      description: "Families, staff and local partners working together around student growth.",
    },
  ],
  academicsTitle: "An academic experience with room to grow.",
  academicsBody:
    "A coherent curriculum, thoughtful teaching and rich enrichment give students the confidence to explore ideas and develop their own voice.",
  academicPillars: [
    { label: "Programme framework", value: "Early Years to Grade 6" },
    { label: "Teaching approach", value: "Inquiry and practice" },
    { label: "Learning environment", value: "Labs, studios and library" },
  ],
  academicMotif: "Discover",
  campusTitle: "Life beyond the classroom",
  campusBody:
    "Libraries, labs, studios, playing fields and shared spaces give students room to discover interests and build friendships.",
  campusCaption:
    "Spaces designed for discovery, collaboration and friendship.",
  admissionTitle: "Ready to learn more about admissions?",
  admissionBody:
    "Explore our enquiry process, read stories from the school and discover how we can help your family find the right next step.",
} as const;

export const aboutCopy = {
  title: "About Aurelia Academy",
  intro:
    "A close look at our history, values, leadership and the community that makes Aurelia Academy feel like home.",
  sections: [
    {
      title: "Our story",
      body: "Founded in 2008, Aurelia Academy has grown into an independent learning community built around strong relationships, thoughtful teaching and a sense of belonging.",
    },
    {
      title: "Vision",
      body: homeCopy.vision,
    },
    {
      title: "Mission",
      body: homeCopy.mission,
    },
  ],
  leadership: [
    { role: "Head of School", name: "Dr. Elaine Hartwell" },
    { role: "Deputy Head", name: "Mr. Daniel Okafor" },
    { role: "Head of Academics", name: "Ms. Priya Raman" },
    { role: "Head of Pastoral Care", name: "Ms. Sofia Marin" },
  ],
} as const;

export const academicsCopy = {
  title: "Academics",
  intro:
    "Our curriculum combines clear foundations, thoughtful teaching and rich enrichment for every stage of learning.",
  programmes: [
    {
      name: "Early Years",
      description:
        "Play-rich foundations in literacy, numeracy and discovery, with a focus on confidence and social learning.",
    },
    {
      name: "Primary",
      description:
        "Broad, balanced learning across core subjects, humanities, science, arts and physical education.",
    },
    {
      name: "Secondary",
      description:
        "Subject specialism, guided pathways and enrichment designed to prepare students for future study and work.",
    },
  ],
  approach: [
    {
      title: "Foundational literacy and numeracy",
      description:
        "Explicit teaching, regular practice and timely feedback help students build secure core skills.",
    },
    {
      title: "Inquiry and discussion",
      description:
        "Open questions and structured debate encourage students to explain their thinking and listen well.",
    },
    {
      title: "Assessment for learning",
      description:
        "Low-stakes checks and thoughtful feedback show what is working and what needs more attention.",
    },
  ],
} as const;

export const achievementsCopy = {
  title: "Achievements",
  intro:
    "We celebrate the events, projects and student work that reflect our community’s curiosity and commitment.",
  categories: ["Academic", "Sports", "Arts & Culture", "Community"] as const,
} as const;

export const campusCopy = {
  title: "Campus life",
  intro:
    "Our facilities and activities give students room to explore interests, build confidence and form lasting friendships.",
  facilities: [
    {
      title: "Library and learning spaces",
      description:
        "Quiet reading areas, group tables and digital resources support independent and collaborative study.",
    },
    {
      title: "Sports facilities",
      description:
        "Playing fields, courts and a fitness studio host lessons, clubs and friendly competitions.",
    },
    {
      title: "Arts and performance spaces",
      description:
        "Studios and a flexible performance space give students room to paint, make music and present work.",
    },
    {
      title: "Science and technology rooms",
      description:
        "Laboratories and creative technology rooms support experiments, design and hands-on problem solving.",
    },
  ],
  activities: [
    "Debate and public speaking club",
    "Studio arts and annual exhibition",
    "Football, basketball and athletics",
    "Community garden and service projects",
  ],
} as const;

export const admissionsCopy = {
  title: "Admissions",
  intro:
    "From the first enquiry to a campus visit, we make each step clear and welcoming for families.",
  steps: [
    {
      title: "Send an enquiry",
      description:
        "Use the form to tell the school about the student, intended year of entry and any questions you have.",
    },
    {
      title: "Receive a response",
      description:
        "A member of the admissions team follows up with more information and an invitation to talk.",
    },
    {
      title: "Visit and discuss",
      description:
        "Families explore the campus, meet staff and ask about learning, enrichment and pastoral care.",
    },
    {
      title: "Complete the application",
      description:
        "The school shares the next steps and any documents required for a formal application.",
    },
  ],
  faqs: [
    {
      question: "How do I enquire about admission?",
      answer:
        "Complete the enquiry form on this page. A member of our admissions team will be in touch with the next steps.",
    },
    {
      question: "When does the admissions period open?",
      answer:
        "We welcome enquiries throughout the year and share current entry dates with families during the admissions conversation.",
    },
    {
      question: "What are the entry requirements?",
      answer:
        "Entry requirements vary by year group. Contact admissions for the current criteria and supporting documents.",
    },
    {
      question: "Are fees published online?",
      answer:
        "Please contact our admissions team for the latest fee information and payment schedule.",
    },
  ],
  gradeOptions: [
    "Early Years",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
  ],
  yearOptions: ["2026–2027", "2027–2028", "2028–2029"],
} as const;

export const contactCopy = {
  title: "Contact us",
  intro:
    "We would be glad to hear from you. Reach our admissions and general enquiries team using the details below.",
  topics: ["General enquiry", "Admissions", "Academic programme", "Campus visit", "Other"],
} as const;
