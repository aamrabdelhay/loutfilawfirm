export type ApplicationType = "TRAINING" | "JOB";
export type ApplicationStatus = "NEW" | "CONTACTED" | "ACCEPTED" | "REJECTED";

export type AchievementType =
  | "AWARD"
  | "CONFERENCE"
  | "PUBLICATION"
  | "ARTICLE"
  | "MEDIA"
  | "INTERVIEW"
  | "LECTURE"
  | "MILESTONE";

export interface Application {
  id: string;
  type: ApplicationType;
  fullName: string;
  university: string;
  academicYear: string | null;
  phone: string;
  email: string;
  linkedin: string | null;
  motivation: string | null;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  experiences: Experience[];
}

export interface Experience {
  id: string;
  applicationId: string;
  organization: string;
  duration: string;
  description: string;
  order: number;
}

export interface News {
  id: string;
  slugEn: string;
  slugAr: string;
  slugFr: string;
  titleEn: string;
  titleAr: string;
  titleFr: string;
  excerptEn: string;
  excerptAr: string;
  excerptFr: string;
  contentEn: string;
  contentAr: string;
  contentFr: string;
  image: string | null;
  author: string | null;
  publishedAt: string | null;
  published: boolean;
  featured: boolean;
  seoTitleEn: string | null;
  seoTitleAr: string | null;
  seoTitleFr: string | null;
  seoDescEn: string | null;
  seoDescAr: string | null;
  seoDescFr: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  titleEn: string;
  titleAr: string;
  titleFr: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionFr: string;
  type: AchievementType;
  image: string | null;
  url: string | null;
  date: string | null;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PracticeArea {
  id: string;
  nameEn: string;
  nameAr: string;
  nameFr: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionFr: string;
  icon: string | null;
  image: string | null;
  order: number;
  published: boolean;
  confirmed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MediaItem {
  id: string;
  titleEn: string;
  titleAr: string;
  titleFr: string;
  url: string;
  mediaType: string;
  youtubeId: string | null;
  thumbnail: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryImage {
  id: string;
  altEn: string;
  altAr: string;
  altFr: string;
  image: string;
  order: number;
  published: boolean;
  isPlaceholder: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OfficeLocation {
  id: string;
  nameEn: string;
  nameAr: string;
  nameFr: string;
  addressEn: string;
  addressAr: string;
  addressFr: string;
  mapUrl: string | null;
  phones: string | null;
  email: string | null;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  id: string;
  firmNameEn: string;
  firmNameAr: string;
  firmNameFr: string;
  taglineEn: string;
  taglineAr: string;
  taglineFr: string;
  contactEmail: string;
  mainPhones: string;
  faxPhones: string;
  mobilePhone: string;
  socialLinks: string;
  footerEn: string;
  footerAr: string;
  footerFr: string;
  defaultSeoTitleEn: string;
  defaultSeoTitleAr: string;
  defaultSeoTitleFr: string;
  defaultSeoDescEn: string;
  defaultSeoDescAr: string;
  defaultSeoDescFr: string;
  heroIntroEn: string;
  heroIntroAr: string;
  heroIntroFr: string;
  homeLeadTitleEn: string;
  homeLeadTitleAr: string;
  homeLeadTitleFr: string;
  homeLeadBodyEn: string;
  homeLeadBodyAr: string;
  homeLeadBodyFr: string;
  homeSectionTitleEn: string;
  homeSectionTitleAr: string;
  homeSectionTitleFr: string;
  homeSectionBodyEn: string;
  homeSectionBodyAr: string;
  homeSectionBodyFr: string;
  aboutIntroEn: string;
  aboutIntroAr: string;
  aboutIntroFr: string;
  aboutPhilosophyEn: string;
  aboutPhilosophyAr: string;
  aboutPhilosophyFr: string;
  aboutApproachEn: string;
  aboutApproachAr: string;
  aboutApproachFr: string;
  aboutPresenceTitleEn: string;
  aboutPresenceTitleAr: string;
  aboutPresenceTitleFr: string;
  aboutAreasTitleEn: string;
  aboutAreasTitleAr: string;
  aboutAreasTitleFr: string;
  aboutProfileEn: string;
  aboutProfileAr: string;
  aboutProfileFr: string;
  heroImage: string;
  aboutImage: string;
  sectionImage: string;
  updatedAt: string;
}

export interface ContentEntry {
  id: string;
  key: string;
  group: string;
  label: string;
  valueEn: string;
  valueAr: string;
  valueFr: string;
  order: number;
  updatedAt: string;
}

export interface Session {
  id: string;
  token: string;
  userId: string;
  expiresAt: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
