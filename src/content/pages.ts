/**
 * Illustrative page copy. None of this should be treated as verified school information.
 * Replace with school-approved copy before launch.
 */

export const homeCopy = {
  heroEyebrow: "PLACEHOLDER SCHOOL WEBSITE",
  heroTitle: "An education that shapes character and possibility.",
  heroDescription:
    "A premium school website demonstration for parents and students: academic life, achievements, campus stories and admissions in one considered place.",
  introEyebrow: "Who we are",
  introTitle: "A community built around every student.",
  introBody: [
    "This introduction is illustrative. Once the school supplies its history, values and ethos, this space will tell its story in an editorial, welcoming voice.",
    "The design deliberately leaves room for genuine institutional identity rather than filling the page with invented claims.",
  ],
  highlightsTitle: "The school at a glance",
  highlightsIntro:
    "Qualitative highlights are shown here because no verified statistics have been supplied. Replace these with approved figures and badges when available.",
  highlights: [
    {
      title: "Student-centred learning",
      description: "An illustrative pillar describing the intended teaching emphasis.",
    },
    {
      title: "Wide-ranging enrichment",
      description: "An illustrative pillar for sports, arts and student activities.",
    },
    {
      title: "Pastoral care",
      description: "An illustrative pillar for student wellbeing and belonging.",
    },
    {
      title: "Community partnership",
      description: "An illustrative pillar for family and community involvement.",
    },
  ],
  academicsTitle: "An academic experience with room to grow.",
  academicsBody:
    "Use this section to explain the curriculum, teaching approach and learning environment with the school's own language and verified programme details.",
  campusTitle: "Life beyond the classroom",
  campusBody:
    "Facilities, activities and events will live here once the school confirms what should be shown publicly.",
  admissionTitle: "Ready to learn more about admissions?",
  admissionBody:
    "Enquiries are handled through the dedicated admissions form. Dates, entry criteria and fees must be supplied by the school before publication.",
} as const;

export const aboutCopy = {
  title: "About the school",
  intro:
    "This page is a structured placeholder for the school's introduction, history, vision and mission, leadership and faculty.",
  sections: [
    {
      title: "Our story",
      body: "Add the school's verified history here: founding year, milestones and the people who shaped the institution. No dates or accomplishments are asserted in this demonstration.",
    },
    {
      title: "Vision",
      body: "Insert the school's approved vision statement here. Keep it concise and in the institution's own voice.",
    },
    {
      title: "Mission",
      body: "Insert the school's approved mission statement here, followed by the practical commitments that bring it to life.",
    },
  ],
  leadership: [
    { role: "Head of School", name: "Name to be supplied" },
    { role: "Deputy Head", name: "Name to be supplied" },
    { role: "Head of Academics", name: "Name to be supplied" },
    { role: "Head of Pastoral Care", name: "Name to be supplied" },
  ],
} as const;

export const academicsCopy = {
  title: "Academics",
  intro:
    "An illustrative framework for programme information. Curriculum details, subject lists and assessment approaches require school approval before publication.",
  programmes: [
    {
      name: "Early Years",
      description: "Placeholder programme description. Add age range, curriculum and learning approach.",
    },
    {
      name: "Primary",
      description: "Placeholder programme description. Add year groups, subjects and enrichment.",
    },
    {
      name: "Secondary",
      description: "Placeholder programme description. Add subjects, pathways and qualifications.",
    },
  ],
  approach: [
    {
      title: "Foundational literacy and numeracy",
      description: "Illustrative teaching priority — replace with the school's verified approach.",
    },
    {
      title: "Inquiry and discussion",
      description: "Illustrative teaching priority — replace with the school's verified approach.",
    },
    {
      title: "Assessment for learning",
      description: "Illustrative teaching priority — replace with the school's verified approach.",
    },
  ],
} as const;

export const achievementsCopy = {
  title: "Achievements",
  intro:
    "Published achievements are managed in Sanity. When no published achievements exist, the page shows an honest empty state rather than invented awards.",
  categories: ["Academic", "Sports", "Arts & Culture", "Community"] as const,
} as const;

export const campusCopy = {
  title: "Campus life",
  intro:
    "A placeholder structure for facilities, student activities and events. Confirm which spaces and student photographs may be published.",
  facilities: [
    {
      title: "Library and learning spaces",
      description: "Illustrative facility description — confirm name, capacity and access.",
    },
    {
      title: "Sports facilities",
      description: "Illustrative facility description — confirm venues and programmes.",
    },
    {
      title: "Arts and performance spaces",
      description: "Illustrative facility description — confirm studios, stages and equipment.",
    },
    {
      title: "Science and technology rooms",
      description: "Illustrative facility description — confirm labs and equipment.",
    },
  ],
  activities: [
    "Student clubs (names to be supplied)",
    "Arts and performance (details to be supplied)",
    "Sports and competitions (details to be supplied)",
    "Community service (details to be supplied)",
  ],
} as const;

export const admissionsCopy = {
  title: "Admissions",
  intro:
    "This page explains the enquiry process. Entry requirements, term dates, fees and application deadlines are intentionally omitted until the school supplies them.",
  steps: [
    {
      title: "Send an enquiry",
      description: "Use the form below so we can understand the student's needs and intended year of entry.",
    },
    {
      title: "Receive a response",
      description: "A school representative will follow up using the contact details supplied. Response times must be confirmed by the school.",
    },
    {
      title: "Visit and discuss",
      description: "Add verified arrangements for campus visits and conversations with staff.",
    },
    {
      title: "Complete the application",
      description: "Add the school's official application process and required documents.",
    },
  ],
  faqs: [
    {
      question: "How do I enquire about admission?",
      answer:
        "Complete the admission enquiry form on this page. Once Formspree endpoints are configured, submissions will be delivered to the school's configured inbox.",
    },
    {
      question: "When does the admissions period open?",
      answer:
        "Dates have not been supplied. Publish verified dates here before directing families to apply.",
    },
    {
      question: "What are the entry requirements?",
      answer:
        "Entry criteria have not been supplied. Add the school's approved requirements and documentation list here.",
    },
    {
      question: "Are fees published online?",
      answer:
        "No fee information is presented in this demonstration. Add verified fee details only if the school approves public publication.",
    },
  ],
  gradeOptions: ["Grade to be confirmed", "Early Years (placeholder)", "Primary (placeholder)", "Secondary (placeholder)"],
  yearOptions: ["Year to be confirmed", "Next academic year (placeholder)", "Following academic year (placeholder)"],
} as const;

export const contactCopy = {
  title: "Contact us",
  intro:
    "Use the form for general questions. Phone, address and map details will appear here only after verified information is supplied.",
  topics: ["General enquiry", "Admissions", "Academic programme", "Campus visit", "Other"],
} as const;
