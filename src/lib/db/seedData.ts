export const OFFICES = [
  {
    name: "Head Office",
    nameAr: "المكتب الرئيسي",
    nameFr: "Bureau principal",
    address: "6 El Sad El Aali St., Dokki – Giza",
    addressAr: "6 شارع السد العالي، الدقي – الجيزة",
    addressFr: "6, rue El Sad El Aali, Dokki – Gizeh",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=6+El+Sad+El+Aali+St+Dokki+Giza+Egypt",
    order: 1
  },
  {
    name: "Cairo Office",
    nameAr: "مكتب القاهرة",
    nameFr: "Bureau du Caire",
    address: "1 Sherif Basha St., Bab El Louk – Cairo",
    addressAr: "1 شارع شريف باشا، باب اللوق – القاهرة",
    addressFr: "1, rue Sherif Basha, Bab El Louk – Le Caire",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=1+Sherif+Basha+St+Bab+El+Louk+Cairo+Egypt",
    order: 2
  },
  {
    name: "Giza Office",
    nameAr: "مكتب الجيزة",
    nameFr: "Bureau de Gizeh",
    address: "13 Nabil El Wakkad St., Dokki – Giza",
    addressAr: "13 شارع نبيل الوقاد، الدقي – الجيزة",
    addressFr: "13, rue Nabil El Wakkad, Dokki – Gizeh",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=13+Nabil+El+Wakkad+St+Dokki+Giza+Egypt",
    order: 3
  }
] as const;

export const GALLERY_IMAGES = [
  { image: "/images/gallery-1.jpg", en: "Visual placeholder — actual office photography to be added", ar: "صورة توضيحية مؤقتة — تُضاف صور المكاتب الحقيقية لاحقاً", fr: "Visuel provisoire — les photos réelles du cabinet seront ajoutées" },
  { image: "/images/gallery-2.jpg", en: "Visual placeholder — actual office photography to be added", ar: "صورة توضيحية مؤقتة — تُضاف صور المكاتب الحقيقية لاحقاً", fr: "Visuel provisoire — les photos réelles du cabinet seront ajoutées" },
  { image: "/images/gallery-3.jpg", en: "Visual placeholder — actual office photography to be added", ar: "صورة توضيحية مؤقتة — تُضاف صور المكاتب الحقيقية لاحقاً", fr: "Visuel provisoire — les photos réelles du cabinet seront ajoutées" },
  { image: "/images/gallery-4.jpg", en: "Visual placeholder — actual office photography to be added", ar: "صورة توضيحية مؤقتة — تُضاف صور المكاتب الحقيقية لاحقاً", fr: "Visuel provisoire — les photos réelles du cabinet seront ajoutées" },
  { image: "/images/architecture-2.jpg", en: "Architectural study — editorial placeholder", ar: "دراسة معمارية — عنصر توضيحي مؤقت", fr: "Étude architecturale — visuel provisoire" },
  { image: "/images/architecture.jpg", en: "Architectural study — editorial placeholder", ar: "دراسة معمارية — عنصر توضيحي مؤقت", fr: "Étude architecturale — visuel provisoire" }
] as const;

export const CONTENT_ENTRIES = [
  { group: "Navigation", key: "nav.home", label: "Navigation — Home", en: "Home", ar: "الرئيسية", fr: "Accueil" },
  { group: "Navigation", key: "nav.about", label: "Navigation — About", en: "About", ar: "عن المكتب", fr: "Le cabinet" },
  { group: "Navigation", key: "nav.practice", label: "Navigation — Practice Areas", en: "Practice Areas", ar: "مجالات الممارسة", fr: "Domaines d'intervention" },
  { group: "Navigation", key: "nav.news", label: "Navigation — News", en: "News", ar: "الأخبار", fr: "Actualités" },
  { group: "Navigation", key: "nav.achievements", label: "Navigation — Achievements", en: "Achievements", ar: "الإنجازات", fr: "Réalisations" },
  { group: "Navigation", key: "nav.media", label: "Navigation — Media", en: "Media", ar: "المرئيات والمنشورات", fr: "Médias" },
  { group: "Navigation", key: "nav.careers", label: "Navigation — Careers", en: "Careers", ar: "الوظائف", fr: "Carrières" },
  { group: "Navigation", key: "nav.contact", label: "Navigation — Contact", en: "Contact", ar: "الاتصال", fr: "Contact" },
  { group: "Navigation", key: "nav.menu", label: "Navigation — Menu", en: "Menu", ar: "القائمة", fr: "Menu" },
  { group: "Navigation", key: "nav.close", label: "Navigation — Close", en: "Close", ar: "إغلاق", fr: "Fermer" },
  { group: "Navigation", key: "nav.openMenu", label: "Navigation — Open menu", en: "Open menu", ar: "فتح القائمة", fr: "Ouvrir le menu" },

  { group: "Homepage", key: "hero.eyebrow", label: "Hero — eyebrow", en: "Legal Counsel in Egypt", ar: "الاستشارات القانونية في مصر", fr: "Conseil juridique en Égypte" },
  { group: "Homepage", key: "hero.intro", label: "Hero — statement", en: "A discreet, rigorous and considered legal practice. The firm advises individuals, families and businesses on the matters that matter most, with precision and discretion.", ar: "ممارسة قانونية رصينة ودقيقة تتسم بالتحفظ والاعتبار. يقدّم المكتب المشورة للأفراد والعائلات والشركات في المسائل التي تشغل بالهم، بمنهجية وموثوقية.", fr: "Une pratique juridique discrète, rigoureuse et réfléchie. Le cabinet conseille les particuliers, les familles et les entreprises sur les affaires qui leur importent le plus, avec précision et discrétion." },
  { group: "Homepage", key: "hero.primaryCta", label: "Hero — primary CTA", en: "Contact the Firm", ar: "تواصل مع المكتب", fr: "Contacter le cabinet" },
  { group: "Homepage", key: "hero.secondaryCta", label: "Hero — secondary CTA", en: "Learn More", ar: "اعرف المزيد", fr: "En savoir plus" },
  { group: "Homepage", key: "home.leadTitle", label: "Home — editorial title", en: "A considered approach to the practice of law", ar: "نهج مدروس في ممارسة القانون", fr: "Une approche mesurée du droit" },
  { group: "Homepage", key: "home.leadBody", label: "Home — editorial body", en: "The firm is built on clarity, preparation and integrity. Work is conducted in a measured manner, in the language and context of each client.", ar: "يقوم المكتب على الوضوح والإعداد والنزاهة، وتُدار الأعمال على مهل وبلغة كل عميل وسياقه.", fr: "Le cabinet repose sur la clarté, la préparation et l'intégrité. Le travail est mené avec méthode, dans la langue et le contexte de chaque client." },
  { group: "Homepage", key: "home.sectionTitle", label: "Home — firm section title", en: "A senior legal practice in Cairo and Giza", ar: "ممارسة قانونية عليا في القاهرة والجيزة", fr: "Un cabinet de droit au Caire et à Gizeh" },
  { group: "Homepage", key: "home.sectionBody", label: "Home — firm section body", en: "The firm is based in Egypt with offices in Dokki, Bab El Louk and Giza. It serves a national and international clientele across a broad range of legal matters.", ar: "يتموقع المكتب في مصر بمكاتب في الدقي وباب اللوق والجيزة، ويلبي احتياجات عملاء محليين ودوليين في مجموعة واسعة من المسائل القانونية.", fr: "Le cabinet est implanté en Égypte, avec des bureaux à Dokki, à Bab El Louk et à Gizeh. Il accompagne une clientèle nationale et internationale dans un large éventail de matières juridiques." },
  { group: "Homepage", key: "home.practiceTitle", label: "Home — practice section title", en: "Areas of practice", ar: "مجالات الممارسة", fr: "Domaines d'intervention" },
  { group: "Homepage", key: "home.newsTitle", label: "Home — news section title", en: "News & Commentary", ar: "الأخبار والتحليلات", fr: "Actualités & commentaires" },
  { group: "Homepage", key: "home.achievementsTitle", label: "Home — achievements section title", en: "Achievements", ar: "الإنجازات", fr: "Réalisations" },
  { group: "Homepage", key: "home.visitTitle", label: "Home — visit title", en: "Visit the firm", ar: "زيارة المكتب", fr: "Visiter le cabinet" },
  { group: "Homepage", key: "home.visitCta", label: "Home — visit CTA", en: "Contact page", ar: "صفحة الاتصال", fr: "Page contact" },

  { group: "About", key: "about.eyebrow", label: "About — eyebrow", en: "The Firm", ar: "المكتب", fr: "Le cabinet" },
  { group: "About", key: "about.title", label: "About — title", en: "About the Firm", ar: "عن المكتب", fr: "À propos" },
  { group: "About", key: "about.introTitle", label: "About — introduction heading", en: "Introduction", ar: "مقدمة", fr: "Introduction" },
  { group: "About", key: "about.philosophyTitle", label: "About — philosophy heading", en: "Firm Philosophy", ar: "فلسفة المكتب", fr: "Philosophie du cabinet" },
  { group: "About", key: "about.approachTitle", label: "About — approach heading", en: "Professional Approach", ar: "المنهج المهني", fr: "Approche professionnelle" },
  { group: "About", key: "about.presenceTitle", label: "About — presence heading", en: "Office Presence", ar: "الحضور المكتبي", fr: "Implantation" },
  { group: "About", key: "about.areasTitle", label: "About — areas heading", en: "Areas of Work", ar: "مجالات العمل", fr: "Domaines d'intervention" },
  { group: "About", key: "about.profileTitle", label: "About — profile heading", en: "Dr. Hossam Loutfi", ar: "د. حسام لطفي", fr: "Dr. Hossam Loutfi" },
  { group: "About", key: "about.profileIntro", label: "About — profile placeholder", en: "The practice is led by Dr. Hossam Loutfi. Detailed biography content is managed through the firm's administration and will appear here once published.", ar: "يُدار المكتب برئاسة د. حسام لطفي. وتُدار التفاصيل الخاصة بالسيرة الذاتية من نظام إدارة المحتوى الخاص بالمكتب، وتظهر هنا عند نشرها.", fr: "Le cabinet est dirigé par Dr. Hossam Loutfi. Le contenu biographique détaillé est administré par le cabinet et apparaîtra ici dès sa publication." },
  { group: "About", key: "about.contactCta", label: "About — contact CTA", en: "Contact the firm", ar: "تواصل مع المكتب", fr: "Contacter le cabinet" },

  { group: "Practice page", key: "practice.eyebrow", label: "Practice — eyebrow", en: "What we do", ar: "ما نقوم به", fr: "Ce que nous faisons" },
  { group: "Practice page", key: "practice.title", label: "Practice — title", en: "Practice Areas", ar: "مجالات الممارسة", fr: "Domaines d'intervention" },
  { group: "Practice page", key: "practice.intro", label: "Practice — intro", en: "The firm advises across a spectrum of legal matters. The areas below are managed through the firm's content administration — some may still be awaiting confirmation.", ar: "يقدّم المكتب المشورة في طيف واسع من المسائل القانونية. تُدار المجالات أدناه من نظام إدارة المحتوى — وبعضها لا يزال بانتظار التأكيد.", fr: "Le cabinet conseille sur un large éventail de questions juridiques. Les domaines ci-dessous sont gérés via l'administration du contenu — certains restent en attente de confirmation." },
  { group: "Practice page", key: "practice.contactCta", label: "Practice — contact CTA", en: "Discuss a matter", ar: "ناقش مسألة", fr: "Évoquer un dossier" },

  { group: "News page", key: "news.eyebrow", label: "News — eyebrow", en: "News & Commentary", ar: "الأخبار والتحليلات", fr: "Actualités & commentaires" },
  { group: "News page", key: "news.title", label: "News — title", en: "News", ar: "الأخبار", fr: "Actualités" },
  { group: "News page", key: "news.intro", label: "News — intro", en: "Updates and commentary from the firm. Content is managed through the firm's administration.", ar: "مستجدات وتحليلات من المكتب. يُدار المحتوى من نظام إدارة المحتوى.", fr: "Actualités et commentaires du cabinet. Le contenu est administré par le cabinet." },

  { group: "Achievements page", key: "achievements.eyebrow", label: "Achievements — eyebrow", en: "Recognition & Activity", ar: "اعتراف ونشاط", fr: "Reconnaissance & activité" },
  { group: "Achievements page", key: "achievements.title", label: "Achievements — title", en: "Achievements", ar: "الإنجازات", fr: "Réalisations" },
  { group: "Achievements page", key: "achievements.intro", label: "Achievements — intro", en: "A record of professional activity and recognition. Every item here is entered and approved by the firm.", ar: "سجل من النشاط والاعتراف المهني. كل بند هنا يُدخل ويُعتمد من المكتب.", fr: "Un relevé d'activité et de reconnaissance professionnelle. Chaque élément est saisi et validé par le cabinet." },

  { group: "Media page", key: "media.eyebrow", label: "Media — eyebrow", en: "In the Press & Online", ar: "في الصحافة وعلى الإنترنت", fr: "Presse & en ligne" },
  { group: "Media page", key: "media.title", label: "Media — title", en: "Media", ar: "المرئيات والمنشورات", fr: "Médias" },
  { group: "Media page", key: "media.intro", label: "Media — intro", en: "Interviews, appearances and publications curated by the firm.", ar: "مقابلات وظهور ومنشورات يعرضها المكتب.", fr: "Entretiens, apparitions et publications sélectionnés par le cabinet." },

  { group: "Careers page", key: "careers.eyebrow", label: "Careers — eyebrow", en: "Join the practice", ar: "انضم إلى المكتب", fr: "Rejoindre le cabinet" },
  { group: "Careers page", key: "careers.title", label: "Careers — title", en: "Careers", ar: "الوظائف", fr: "Carrières" },
  { group: "Careers page", key: "careers.intro", label: "Careers — intro", en: "The firm welcomes motivated students and qualified professionals.", ar: "يُرحّب المكتب بالطلاب المتحمسين والمهنيين المؤهلين.", fr: "Le cabinet accueille les étudiants motivés et les professionnels qualifiés." },
  { group: "Careers page", key: "careers.training.heading", label: "Careers — training heading", en: "Training Application", ar: "طلب تدريب", fr: "Candidature stage" },
  { group: "Careers page", key: "careers.training.subtext", label: "Careers — training subtext", en: "Apply as an intern. Complete the essential information and the firm will contact you.", ar: "قدّم طلبك للتدريب. أكمل المعلومات الأساسية وسيتواصل معك المكتب.", fr: "Candidaturez-vous au stage. Renseignez les informations essentielles, le cabinet vous contactera." },
  { group: "Careers page", key: "careers.job.heading", label: "Careers — job heading", en: "Apply for a Job", ar: "التقديم على وظيفة", fr: "Candidature emploi" },
  { group: "Careers page", key: "careers.job.subtext", label: "Careers — job subtext", en: "Apply for a position with the firm. Complete the essential information and the firm will contact you.", ar: "قدّم طلبك للعمل مع المكتب. أكمل المعلومات الأساسية وسيتواصل معك المكتب.", fr: "Candidaturez-vous à un poste au sein du cabinet. Renseignez les informations essentielles, le cabinet vous contactera." },
  { group: "Careers page", key: "careers.privacy.title", label: "Careers — privacy title", en: "Your information", ar: "بياناتك", fr: "Vos informations" },
  { group: "Careers page", key: "careers.privacy.body", label: "Careers — privacy notice", en: "The information you submit is used for recruitment and training purposes only. The firm may contact you regarding your application. It is stored securely, and you agree that the details you provide are accurate.", ar: "تُستخدم المعلومات التي تُرسلها لأغراض التوظيف والتدريب فقط. قد يتواصل معك المكتب بشأن طلبك. تُخزَّن بياناتك بشكل آمن، وتوافق على أن تكون المعلومات المقدمة دقيقة.", fr: "Les informations transmises sont utilisées à des fins de recrutement et de stage uniquement. Le cabinet pourra vous contacter au sujet de votre candidature. Elles sont conservées de manière sécurisée et vous confirmez qu'elles sont exactes." },
  { group: "Careers page", key: "careers.consent", label: "Careers — consent", en: "I agree that the firm may process my information for recruitment and training purposes.", ar: "أوافق على معالجة المكتب لبياناتي لأغراض التوظيف والتدريب.", fr: "J'accepte que le cabinet traite mes informations à des fins de recrutement et de stage." },
  { group: "Careers page", key: "careers.submit", label: "Careers — submit", en: "Submit Application", ar: "إرسال الطلب", fr: "Envoyer la candidature" },
  { group: "Careers page", key: "careers.success", label: "Careers — success message", en: "Your application has been received. The firm will be in touch soon.", ar: "تم استلام طلبك. سيتواصل معك المكتب قريباً.", fr: "Votre candidature a bien été reçue. Le cabinet vous contactera bientôt." },

  { group: "Contact page", key: "contact.eyebrow", label: "Contact — eyebrow", en: "Get in touch", ar: "تواصل معنا", fr: "Nous contacter" },
  { group: "Contact page", key: "contact.title", label: "Contact — title", en: "Contact", ar: "الاتصال", fr: "Contact" },
  { group: "Contact page", key: "contact.intro", label: "Contact — intro", en: "The firm may be reached through any of its offices. Please call, email or use the map links below.", ar: "يمكن الوصول إلى المكتب عبر أي من مكاتبه. يمكنكم الاتصال أو الإرسال أو استخدام روابط الخرائط أدناه.", fr: "Le cabinet est joignable par chacun de ses bureaux. Contactez-nous par téléphone, par courriel ou via les liens cartographiques ci-dessous." },
  { group: "Contact page", key: "contact.officesTitle", label: "Contact — offices title", en: "Office Locations", ar: "مكاتب المكتب", fr: "Bureaux du cabinet" },
  { group: "Contact page", key: "contact.mainLines", label: "Contact — main lines", en: "Main Telephone Lines", ar: "خطوط الهاتف الرئيسية", fr: "Lignes principales" },
  { group: "Contact page", key: "contact.fax", label: "Contact — fax", en: "Fax", ar: "الفاكس", fr: "Fax" },
  { group: "Contact page", key: "contact.mobile", label: "Contact — mobile", en: "Office Mobile", ar: "موبايل المكتب", fr: "Téléphone mobile" },
  { group: "Contact page", key: "contact.email", label: "Contact — email", en: "Email", ar: "البريد الإلكتروني", fr: "E-mail" },
  { group: "Contact page", key: "contact.mapLink", label: "Contact — map link", en: "Open map", ar: "فتح الخريطة", fr: "Voir la carte" },

  { group: "Footer", key: "footer.brand", label: "Footer — brand", en: "DR. HOSSAM LOUTFI", ar: "د. حسام لطفي", fr: "DR. HOSSAM LOUTFI" },
  { group: "Footer", key: "footer.offices", label: "Footer — offices", en: "Offices", ar: "المكاتب", fr: "Bureaux" },
  { group: "Footer", key: "footer.contact", label: "Footer — contact", en: "Contact", ar: "الاتصال", fr: "Contact" },
  { group: "Footer", key: "footer.navigation", label: "Footer — navigation", en: "Navigation", ar: "التنقل", fr: "Navigation" },
  { group: "Footer", key: "footer.languages", label: "Footer — languages", en: "Languages", ar: "اللغات", fr: "Langues" },
  { group: "Footer", key: "footer.rights", label: "Footer — rights", en: "All rights reserved.", ar: "جميع الحقوق محفوظة.", fr: "Tous droits réservés." }
] as const;

export const NEWS_ENTRIES = [
  {
    slugEn: "sample-news-1",
    slugAr: "عينة-اخبار-1",
    slugFr: "actualite-exemple-1",
    titleEn: "Draft placeholder — The firm will publish its first update here",
    titleAr: "مسودة مؤقتة — سينشر المكتب أول مستجداته هنا",
    titleFr: "Brouillon provisoire — le cabinet publiera ici sa première actualité",
    excerptEn: "Draft placeholder content awaiting confirmation by the firm. Edit or replace from the admin panel.",
    excerptAr: "نص مبدئي بانتظار تأكيد المكتب. عدّله أو استبدله من لوحة الإدارة.",
    excerptFr: "Contenu provisoire en attente de confirmation par le cabinet. Modifiez-le depuis le panneau d'administration.",
    contentEn:
      "This is a clearly marked draft placeholder.\n\nThe firm manages all published news through its administration. Replace this content with a real update when one is available.",
    contentAr:
      "هذا نص مبدئي مُعلَّم بوضوح.\n\nيدير المكتب جميع الأخبار المنشورة من نظام إدارته. استبدل هذا المحتوى بتحديث حقيقي عند توفره.",
    contentFr:
      "Il s'agit d'un brouillon clairement signalé.\n\nLe cabinet gère toutes ses actualités via son administration. Remplacez ce contenu par une vraie actualité dès qu'elle sera disponible.",
    image: "/images/gallery-1.jpg",
    featured: true,
    published: true
  },
  {
    slugEn: "sample-news-2",
    slugAr: "عينة-اخبار-2",
    slugFr: "actualite-exemple-2",
    titleEn: "Draft placeholder — Firm news and commentary",
    titleAr: "مسودة مؤقتة — أخبار المكتب وتحليلاته",
    titleFr: "Brouillon provisoire — Actualités et commentaires du cabinet",
    excerptEn: "Draft placeholder content awaiting confirmation by the firm.",
    excerptAr: "نص مبدئي بانتظار تأكيد المكتب.",
    excerptFr: "Contenu provisoire en attente de confirmation par le cabinet.",
    contentEn:
      "Draft placeholder. The firm will publish real updates and commentary through the admin panel.",
    contentAr:
      "نص مبدئي. سينشر المكتب مستجداته وتحليلاته الحقيقية من لوحة الإدارة.",
    contentFr:
      "Brouillon provisoire. Le cabinet publiera ses vrais commentaires depuis le panneau d'administration.",
    image: "/images/gallery-2.jpg",
    featured: false,
    published: true
  },
  {
    slugEn: "sample-news-3",
    slugAr: "عينة-اخبار-3",
    slugFr: "actualite-exemple-3",
    titleEn: "Draft placeholder — Upcoming publication",
    titleAr: "مسودة مؤقتة — منشور قادم",
    titleFr: "Brouillon provisoire — Publication à venir",
    excerptEn: "Draft placeholder content awaiting confirmation by the firm.",
    excerptAr: "نص مبدئي بانتظار تأكيد المكتب.",
    excerptFr: "Contenu provisoire en attente de confirmation par le cabinet.",
    contentEn:
      "Draft placeholder. Add a real publication when it is available.",
    contentAr:
      "نص مبدئي. أضف منشوراً حقيقياً عند توفره.",
    contentFr:
      "Brouillon provisoire. Ajoutez une vraie publication dès qu'elle sera disponible.",
    image: "/images/gallery-3.jpg",
    featured: false,
    published: true
  }
] as const;

export const ACHIEVEMENT_ENTRIES = [
  {
    titleEn: "Draft placeholder — Professional milestone will appear here",
    titleAr: "مسودة مؤقتة — سيظهر الإنجاز المهني هنا",
    titleFr: "Brouillon provisoire — Un jalon professionnel apparaîtra ici",
    descriptionEn: "Draft placeholder awaiting confirmation by the firm. Replace with a real achievement from the admin panel.",
    descriptionAr: "نص مبدئي بانتظار تأكيد المكتب. استبدله بإنجاز حقيقي من لوحة الإدارة.",
    descriptionFr: "Contenu provisoire en attente de confirmation par le cabinet. Remplacez-le par une vraie réalisation depuis le panneau.",
    type: "MILESTONE",
    image: "/images/gallery-4.jpg",
    featured: true,
    published: true
  },
  {
    titleEn: "Draft placeholder — Publication placeholder",
    titleAr: "مسودة مؤقتة — منشور مؤقت",
    titleFr: "Brouillon provisoire — Publication provisoire",
    descriptionEn: "Draft placeholder awaiting confirmation by the firm.",
    descriptionAr: "نص مبدئي بانتظار تأكيد المكتب.",
    descriptionFr: "Contenu provisoire en attente de confirmation par le cabinet.",
    type: "PUBLICATION",
    image: null,
    featured: false,
    published: true
  },
  {
    titleEn: "Draft placeholder — Media appearance placeholder",
    titleAr: "مسودة مؤقتة — ظهور إعلامي مؤقت",
    titleFr: "Brouillon provisoire — Apparition média provisoire",
    descriptionEn: "Draft placeholder awaiting confirmation by the firm.",
    descriptionAr: "نص مبدئي بانتظار تأكيد المكتب.",
    descriptionFr: "Contenu provisoire en attente de confirmation par le cabinet.",
    type: "MEDIA",
    image: "/images/architecture-2.jpg",
    featured: false,
    published: true
  }
] as const;

export const MEDIA_ENTRIES = [
  {
    titleEn: "Draft placeholder — External media link",
    titleAr: "مسودة مؤقتة — رابط إعلامي خارجي",
    titleFr: "Brouillon provisoire — Lien média externe",
    url: "https://example.com/media-placeholder",
    mediaType: "ARTICLE",
    thumbnail: "/images/gallery-2.jpg",
    published: true
  },
  {
    titleEn: "Draft placeholder — YouTube video will appear here",
    titleAr: "مسودة مؤقتة — سيظهر فيديو يوتيوب هنا",
    titleFr: "Brouillon provisoire — Une vidéo YouTube apparaîtra ici",
    url: "https://example.com/media-placeholder",
    mediaType: "VIDEO",
    thumbnail: "/images/architecture.jpg",
    published: true
  }
] as const;

export const PLACEHOLDER_PRACTICE = [
  {
    en: "Civil & Commercial Matters",
    ar: "المسائل المدنية والتجارية",
    fr: "Affaires civiles et commerciales",
    descEn:
      "Draft placeholder — this area of practice is awaiting confirmation by the firm.",
    descAr:
      "نص مبدئي — هذا المجال بانتظار تأكيد المكتب.",
    descFr:
      "Lieu réservé — ce domaine d'intervention attend la confirmation du cabinet."
  },
  {
    en: "Family & Personal Matters",
    ar: "المسائل الأسرية والشخصية",
    fr: "Affaires familiales et personnelles",
    descEn:
      "Draft placeholder — this area of practice is awaiting confirmation by the firm.",
    descAr:
      "نص مبدئي — هذا المجال بانتظار تأكيد المكتب.",
    descFr:
      "Lieu réservé — ce domaine d'intervention attend la confirmation du cabinet."
  },
  {
    en: "Corporate & Business",
    ar: "الشؤون التجارية والشركات",
    fr: "Sociétés et affaires",
    descEn:
      "Draft placeholder — this area of practice is awaiting confirmation by the firm.",
    descAr:
      "نص مبدئي — هذا المجال بانتظار تأكيد المكتب.",
    descFr:
      "Lieu réservé — ce domaine d'intervention attend la confirmation du cabinet."
  }
] as const;

