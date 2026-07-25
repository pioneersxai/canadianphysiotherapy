/**
 * ============================================================
 *  BRAND CONFIG — Canadian Physio Center (Dr. Rana Shehata)
 *  Edit ONLY this file to rebrand
 * ============================================================
 */

const BRAND = {

  name:        "Canadian Physio Center",
  tagline:     "Give Your Neck to an Expert",
  positioning: "First Shoulder Specialized Center in Egypt & the Middle East",
  description: "A mix of Canadian physiotherapy protocols, Asian alternative therapy, rehab programs, and bone osteopathy — every patient gets a physical assessment first, then a customized treatment protocol.",

  colors: {
    gold:       "#B19B68",
    goldLight:  "#F5CF77",
    goldDeep:   "#856F3B",
    teal:       "#0E3E40",
    tealLight:  "#1C4142",
    rose:       "#CC3366",
    cream:      "#FAF9F6",
    white:      "#FFFFFF",
    text:       "#333333",
  },
  primaryColor: "#B19B68",

  logoLetter:   "C",
  logoFile:     "https://canadianphysiocenter.com/wp-content/uploads/2023/11/Logo-1-e1750602821698-1024x481.png",
  logoIcon:     "https://canadianphysiocenter.com/wp-content/uploads/2025/06/cropped-Logo-resized-2-270x270.png",
  faviconColor: "%23B19B68",

  whatsapp:   "201113372169",
  email:      "info@canadianphysiocenter.com",

  apiBase:    "https://pioneersx-backend.onrender.com/api",
  domain:     "https://pioneersxai.github.io/canadianphysiotherapy",

  social: {
    twitter:   "",
    linkedin:  "",
    instagram: "https://www.instagram.com/dr.ranashehata",
    youtube:   "https://www.youtube.com/channel/UCiYDU5k72U7NekRI5jyh0yA",
    facebook:  "https://www.facebook.com/physiotherapy.Newcairo",
    tiktok:    "",
  },

  lang: "en",
  dir:  "ltr",

  hours: "Saturday – Thursday, 2PM – 10PM. Closed Fridays. Pre-booking required.",

  // ── Branches ────────────────────────────────────────────
  locations: [
    {
      id:      "new-cairo",
      name:    "New Cairo (5th Settlement) Branch",
      address: "New Cairo City, New Cairo 1, Cairo Governorate",
      phone:   "+20 111 337 2169",
      whatsapp:"201113372169",
    },
    {
      id:      "sheikh-zayed",
      name:    "Sheikh Zayed Branch",
      address: "Zayed 4, just behind the gate plaza, Sheikh Zayed City, Giza Governorate",
      phone:   "+20 115 090 4759",
      whatsapp:"201150904759",
    },
  ],

  // ── Trust stats (animated counters on homepage) ───────────
  stats: [
    { number: "13+",   label: "Years of Experience" },
    { number: "102K+", label: "Instagram Community" },
    { number: "4",     label: "Accreditations" },
    { number: "24/7",  label: "Patient Support" },
  ],

  // ── Services (8 categories, each links to its own detail page) ──
  services: [
    {
      id:          "assessment",
      name:        "Assessment",
      tagline:     "Every treatment starts with a real diagnosis",
      description: "A full physical assessment to reach an accurate diagnosis before any treatment protocol is designed.",
      icon:        "fas fa-stethoscope",
      image:       "https://canadianphysiocenter.com/wp-content/uploads/2023/02/WhatsApp-Image-2023-02-22-at-18.04.37.jpg",
      joint:       "spine",
      link:        "services/assessment.html",
    },
    {
      id:          "osteopathy",
      name:        "Osteopathy (Bone Alignment)",
      tagline:     "Structural balance, restored",
      description: "Manual bone alignment techniques to correct structural imbalances and relieve chronic pain at the source.",
      icon:        "fas fa-bone",
      image:       "https://canadianphysiocenter.com/wp-content/uploads/2024/06/P5.png",
      joint:       "spine",
      link:        "services/osteopathy.html",
    },
    {
      id:          "shoulder",
      name:        "Shoulder Treatments",
      tagline:     "Our signature specialty",
      description: "The first shoulder-specialized treatment protocols in Egypt, built on Canadian and international rehab standards.",
      icon:        "fas fa-hand-holding-medical",
      image:       "https://canadianphysiocenter.com/wp-content/uploads/2024/06/p2.png",
      joint:       "shoulder",
      link:        "services/shoulder-treatments.html",
    },
    {
      id:          "sports",
      name:        "Sports & Athletic Services",
      tagline:     "Get back in the game",
      description: "Injury recovery and performance rehab protocols built for competitive and recreational athletes.",
      icon:        "fas fa-running",
      image:       "https://canadianphysiocenter.com/wp-content/uploads/2023/02/image8.png",
      joint:       "knee",
      link:        "services/sports-athletic.html",
    },
    {
      id:          "spine",
      name:        "Spine Injuries",
      tagline:     "Precision spine rehabilitation",
      description: "Specialized assessment and rehab protocols for spinal injuries, disc issues, and chronic back pain.",
      icon:        "fas fa-x-ray",
      image:       "https://canadianphysiocenter.com/wp-content/uploads/2024/06/P3.png",
      joint:       "spine",
      link:        "services/spine-injuries.html",
    },
    {
      id:          "canadian-protocols",
      name:        "Canadian Physio Protocols",
      tagline:     "Internationally certified methods",
      description: "Evidence-based physiotherapy protocols certified by the Canadian Academy of Pain Management.",
      icon:        "fas fa-maple-leaf",
      image:       "https://canadianphysiocenter.com/wp-content/uploads/2023/02/canada_640-e1676982876881.png",
      joint:       "elbow",
      link:        "services/canadian-protocols.html",
    },
    {
      id:          "asian-therapy",
      name:        "Asian Alternative Therapy",
      tagline:     "Acupuncture & energy manipulation",
      description: "Traditional alternative therapy practices from Malaysia, Vietnam, and Indonesia, integrated with modern rehab.",
      icon:        "fas fa-yin-yang",
      image:       "https://canadianphysiocenter.com/wp-content/uploads/2024/06/p4.png",
      joint:       "ankle",
      link:        "services/asian-alternative-therapy.html",
    },
    {
      id:          "posture",
      name:        "Posture Correction",
      tagline:     "Stand taller, live better",
      description: "Targeted correction programs for postural imbalances that cause chronic neck, shoulder, and back pain.",
      icon:        "fas fa-user-check",
      image:       "https://canadianphysiocenter.com/wp-content/uploads/2024/06/p8.png",
      joint:       "spine",
      link:        "services/posture-correction.html",
    },
  ],

  // ── Team ────────────────────────────────────────────────
  team: [
    {
      id: "dr-rana-shehata", name: "Dr. Rana Shehata", role: "Founder — Shoulder Injuries & Spine Specialist",
      photo: "https://canadianphysiocenter.com/wp-content/uploads/2024/02/IMG_4117-scaled-e1707393885994-735x1024.jpg",
      bio: "Diploma in Pain Management in Shoulder Injuries (Canadian Academy of Pain Management, CA), Member of EUSSER, Delegate ICSES & ICSET 2023 (Italy), alternative therapy practice from Malaysia, Vietnam & Indonesia, Manual Therapy Certificate (Prime Physio), Member of Shoulder Academy (New Zealand), Chinese acupuncture & energy manipulation practice.",
    },
    {
      id: "dr-merna-shahen", name: "Dr. Merna Shahen", role: "Sheikh Zayed Branch — Shoulder Rehab & Spine Specialist",
      photo: "https://canadianphysiocenter.com/wp-content/uploads/2025/06/IMG_0482-576x1024.jpg",
      bio: "Shoulder rehabilitation and spine specialist at the Sheikh Zayed branch.",
    },
    {
      id: "dr-mahmoud-hanafy", name: "Dr. Mahmoud Hanafy", role: "Shoulder Injuries Specialist — New Cairo Senior Physiotherapist",
      photo: "https://canadianphysiocenter.com/wp-content/uploads/2025/06/IMG_0480-576x1024.jpg",
      bio: "Chronic shoulder injuries & rehab specialist, scapular & GH alignments, Acupuncture diploma for musculoskeletal conditions (Horus University).",
    },
    {
      id: "dr-madonna-amir", name: "Dr. Madonna Amir", role: "Spine Specialist",
      photo: "https://canadianphysiocenter.com/wp-content/uploads/2025/06/IMG_0481-576x1024.jpg",
      bio: "Mulligan Concept course levels A/B/C, Dry Needling (Prime Physio Academy), Differential Diagnosis, Orthopedic Manual Therapy (McKenzie Approach), Shoulder Rehabilitation (Prime Physio Academy).",
    },
    {
      id: "dr-sara-gorge", name: "Dr. Sara Gorge", role: "Sports Injuries Specialist",
      photo: "https://canadianphysiocenter.com/wp-content/uploads/2025/06/IMG_0716.png",
      bio: "Sports injuries specialist.",
    },
    {
      id: "dr-mahmoud-salah", name: "Dr. Mahmoud Salah", role: "Shoulder Specialist",
      photo: "https://canadianphysiocenter.com/wp-content/uploads/2025/06/IMG_0479-576x1024.jpg",
      bio: "Shoulder specialist.",
    },
    {
      id: "dr-yollyana-magid", name: "Dr. Yollyana Magid Wadea", role: "Spine Specialist",
      photo: "https://canadianphysiocenter.com/wp-content/uploads/2025/06/IMG_0477-576x1024.png",
      bio: "Spine specialist.",
    },
    {
      id: "huda-tarek", name: "Huda Tarek", role: "New Cairo Clinic Admin & Secretary",
      photo: "https://canadianphysiocenter.com/wp-content/uploads/2025/06/IMG_1864.jpg",
      bio: "Clinic administration and reception, New Cairo branch.",
    },
    {
      id: "seham-hamed", name: "Seham Hamed", role: "Customer Care",
      photo: "https://canadianphysiocenter.com/wp-content/uploads/2025/06/IMG_0713-576x1024.png",
      bio: "Customer care and patient support.",
    },
  ],

  // ── Accreditations ──────────────────────────────────────
  accreditations: [
    { name: "Canadian Physiotherapy Association", logo: "https://canadianphysiocenter.com/wp-content/uploads/2024/11/canadian-physiotherapy-association-logo.png" },
    { name: "EUSSER — European Union for Shoulder & Elbow Rehabilitation", logo: "https://canadianphysiocenter.com/wp-content/uploads/2024/12/eusser-transparent-logo.png" },
    { name: "Physio Academy New Zealand", logo: "https://canadianphysiocenter.com/wp-content/uploads/2024/12/physio-academy-NZ.png" },
    { name: "General Physical Therapy Syndicate of Egypt", logo: "https://canadianphysiocenter.com/wp-content/uploads/2025/01/eg-synd.-logo-150x150.jpg" },
  ],

  // ── Testimonials ────────────────────────────────────────
  testimonials: [
    {
      text: "I recommend Dr. Rana Shehata clinic strongly for treating shoulder injuries, my experience in 5th settlement branch was very pleasant, the clinic is very comfortable, the team is very professional and skillful under the leadership of Dr. Rana who is very clever in shoulders injuries. Special thanks to Ms. Hoda and Ms. Shrouk for their hospitality and followup, and I'd like to thank Dr. Hanafi for his efforts with me.",
      author: "Tamer Amin", role: "Patient — New Cairo",
    },
    {
      text: "My back and neck went into a spasm due to an injury from performing a deadlift after a long time. I was treated by Dr. Sarah George. I was skeptical if this would work or not. But I can tell you I'm a changed man. I went from a crooked humped walk to standing tall again with one session.",
      author: "QK Saif", role: "Patient",
    },
    {
      text: "Dr. Rana Shehata clinic is one of the best therapy I have been to in Egypt, the customer service team leading by Shrouk is amazing. Dr. Mahmoud helped me so much regarding my pain, I have been dealing with neck and shoulder pain over 3 years and I have tried several different therapies and had no luck till I found Rana Shehata clinic. I recommend 110%.",
      author: "King Ali", role: "Patient",
    },
  ],

};

// ── Auto-apply brand to page ───────────────────────────────
document.addEventListener("DOMContentLoaded", () => {

  document.title = `${BRAND.name} — ${BRAND.tagline}`;
  document.documentElement.lang = BRAND.lang;
  document.documentElement.dir  = BRAND.dir;

  const replacements = {
    "brand-name":        BRAND.name,
    "brand-tagline":     BRAND.tagline,
    "brand-positioning": BRAND.positioning,
    "brand-description": BRAND.description,
    "brand-email":       BRAND.email,
    "brand-hours":       BRAND.hours,
  };

  Object.entries(replacements).forEach(([key, value]) => {
    document.querySelectorAll(`[data-brand="${key}"]`).forEach(el => {
      el.textContent = value;
    });
  });

  document.querySelectorAll("[data-whatsapp-link]").forEach(el => {
    el.href = `https://wa.me/${BRAND.whatsapp}`;
  });

  document.querySelectorAll("[data-email-link]").forEach(el => {
    el.href = `mailto:${BRAND.email}`;
  });

  const socialMap = {
    "social-twitter":   BRAND.social.twitter,
    "social-linkedin":  BRAND.social.linkedin,
    "social-instagram": BRAND.social.instagram,
    "social-youtube":   BRAND.social.youtube,
    "social-facebook":  BRAND.social.facebook,
    "social-tiktok":    BRAND.social.tiktok,
  };
  Object.entries(socialMap).forEach(([key, url]) => {
    document.querySelectorAll(`[data-brand="${key}"]`).forEach(el => {
      if (!url) { el.style.display = "none"; return; }
      el.href = url;
    });
  });

  // Logo — image if available, else letter
  document.querySelectorAll("[data-brand='logo-letter']").forEach(el => {
    if (BRAND.logoFile) {
      el.innerHTML = `<img src="${BRAND.logoFile}" alt="${BRAND.name}" class="brand-logo-img">`;
    } else {
      el.textContent = BRAND.logoLetter;
    }
  });

});
