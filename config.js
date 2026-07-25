/**
 * ============================================================
 *  BRAND CONFIG — عيادات چميلة — Jamela Clinics
 *  Edit ONLY this file to rebrand
 * ============================================================
 */

const BRAND = {

  name:        "عيادات چميلة",
  tagline:     "چميلة.. عيشي الفرق",
  description: "عيادات چميلة في سوهاج — جلدية، تجميل، ليزر، أسنان وأكثر. احجزي جلستك الآن",

  primaryColor: "#C9A55C",   // gold

  logoLetter:  "ج",
  logoFile:    "assets/logo.png",
  faviconColor: "%23C9A55C",

  phone:      "01149881909",
  whatsapp:   "201149881909",
  email:      "info@jamelaclinics.com",
  city:       "سوهاج — شارع الجمهورية — برج صلاح ضيف الله الذهبي — أعلى ماكدونالدز",

  apiBase:    "https://pioneersx-backend.onrender.com/api",
  domain:     "https://pioneersxai.github.io/Jamile-clinic-sohag",

  social: {
    twitter:   "",
    linkedin:  "",
    instagram: "https://www.instagram.com/jamelaclinics/",
    youtube:   "",
    tiktok:    "",
  },

  lang: "ar",
  dir:  "rtl",

  // ── Clinic Services (shown as products/sessions to book) ──
  products: [
    {
      id:          "laser",
      name:        "إزالة الشعر بالليزر",
      tagline:     "نتائج دائمة بأحدث التقنيات",
      description: "إزالة الشعر الزائد نهائياً بأجهزة ليزر متطورة وآمنة لجميع أنواع البشرة",
      icon:        "fas fa-star-of-life",
      link:        "dashboard/index.html",
    },
    {
      id:          "botox",
      name:        "بوتوكس وفيلر",
      tagline:     "شبابك في أيدي خبراء",
      description: "حقن البوتوكس والفيلر لشد الوجه، ملء التجاعيد، ورسم الملامح بدقة عالية",
      icon:        "fas fa-syringe",
      link:        "dashboard/index.html",
    },
    {
      id:          "skin",
      name:        "العناية بالبشرة",
      tagline:     "بشرتك تستحق الأفضل",
      description: "تنظيف البشرة العميق، علاج حب الشباب، تفتيح البشرة وجلسات التقشير الكيميائي",
      icon:        "fas fa-spa",
      link:        "dashboard/index.html",
    },
    {
      id:          "dental",
      name:        "تبييض الأسنان",
      tagline:     "ابتسامة تضيء المكان",
      description: "تبييض الأسنان بالليزر والتقنيات الحديثة للحصول على ابتسامة مشرقة وجذابة",
      icon:        "fas fa-tooth",
      link:        "dashboard/index.html",
    },
    {
      id:          "facelift",
      name:        "شد الوجه",
      tagline:     "احتفظي بجمالك الخالد",
      description: "جلسات شد الوجه بالخيوط والتقنيات غير الجراحية للحصول على إطلالة أصغر سناً",
      icon:        "fas fa-magic",
      link:        "dashboard/index.html",
    },
    {
      id:          "nutrition",
      name:        "التغذية العلاجية",
      tagline:     "صحتك من الداخل للخارج",
      description: "برامج تغذية علاجية مخصصة لإنقاص الوزن والحصول على جسم صحي ومتوازن",
      icon:        "fas fa-heartbeat",
      link:        "dashboard/index.html",
    },
  ],

  // ── Session Packages (pricing tiers) ──────────────────────
  pricing: [
    {
      name:     "جلسة واحدة",
      price:    "تواصلي معنا",
      currency: "",
      period:   "",
      features: ["استشارة مجانية", "جلسة واحدة مخصصة", "متابعة ما بعد الجلسة"],
      cta:      "احجزي الآن",
      featured: false,
    },
    {
      name:     "باقة 5 جلسات",
      price:    "وفري 20%",
      currency: "",
      period:   "",
      features: ["5 جلسات متتالية", "خصم 20% على السعر", "أولوية في الحجز", "متابعة مستمرة"],
      cta:      "الأكثر طلباً",
      featured: true,
    },
    {
      name:     "باقة VIP",
      price:    "مخصصة",
      currency: "",
      period:   "",
      features: ["جلسات غير محدودة", "طبيبة خاصة", "أولوية قصوى", "متابعة شاملة", "هدايا حصرية"],
      cta:      "تواصلي معنا",
      featured: false,
    },
  ],

};

// ── Auto-apply brand to page ───────────────────────────────
document.addEventListener("DOMContentLoaded", () => {

  document.title = `${BRAND.name} - ${BRAND.tagline}`;
  document.documentElement.lang = BRAND.lang;
  document.documentElement.dir  = BRAND.dir;

  const replacements = {
    "brand-name":        BRAND.name,
    "brand-tagline":     BRAND.tagline,
    "brand-description": BRAND.description,
    "brand-phone":       BRAND.phone,
    "brand-email":       BRAND.email,
    "brand-city":        BRAND.city,
    "brand-whatsapp":    BRAND.whatsapp,
  };

  Object.entries(replacements).forEach(([key, value]) => {
    document.querySelectorAll(`[data-brand="${key}"]`).forEach(el => {
      el.textContent = value;
    });
  });

  document.querySelectorAll("[data-whatsapp-link]").forEach(el => {
    el.href = `https://wa.me/${BRAND.whatsapp}`;
  });

  document.querySelectorAll("[data-phone-link]").forEach(el => {
    el.href = `tel:${BRAND.phone}`;
  });

  document.querySelectorAll("[data-email-link]").forEach(el => {
    el.href = `mailto:${BRAND.email}`;
  });

  const socialMap = {
    "social-twitter":   BRAND.social.twitter,
    "social-linkedin":  BRAND.social.linkedin,
    "social-instagram": BRAND.social.instagram,
    "social-youtube":   BRAND.social.youtube,
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
      el.innerHTML = `<img src="${BRAND.logoFile}" alt="${BRAND.name}" style="height:40px;object-fit:contain;">`;
    } else {
      el.textContent = BRAND.logoLetter;
    }
  });

});
