import type { MetadataRoute } from "next";

const SITE_URL = "https://komorebi.constella-hd.co.jp";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/learn`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/concierge`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/benefits`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/prepare`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/timeline`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/qa`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/accessibility`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const learnArticles = [
    "rsv-vaccine",
    "preconception-vaccines",
    "vaccination-schedule",
    "newborn-sleep",
    "pregnancy-nutrition",
    "baby-food",
    "postnatal-procedures",
    "hokatsu",
    "pregnancy-health",
    "fever-guide",
    "child-illness",
    "breast-milk-bank",
    "baby-clothing",
    "bathing-guide",
    "baby-events",
    "hospital-bag",
    "maternity-yoga",
    "mental-care",
    "baby-pillow",
    "early-education",
    "body-harmony",
    "health-checkup",
  ];

  const bodyHarmonyStages = [
    "stage-1", "stage-2", "stage-3", "stage-4", "stage-5", "stage-6",
  ];

  const healthCheckupPages = [
    "3-4months", "6-7months", "18months", "3years",
  ];

  const prepareItems = [
    "baby-bed", "baby-carrier", "baby-food-goods", "baby-monitor",
    "bottle", "bouncer", "childseat", "diapers", "educational-toys",
    "nasal-aspirator", "nursing-pillow", "stroller", "wipes",
  ];

  const learnPages: MetadataRoute.Sitemap = learnArticles.map((slug) => ({
    url: `${SITE_URL}/learn/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const bhsPages: MetadataRoute.Sitemap = bodyHarmonyStages.map((stage) => ({
    url: `${SITE_URL}/learn/body-harmony/${stage}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const checkupPages: MetadataRoute.Sitemap = healthCheckupPages.map((page) => ({
    url: `${SITE_URL}/learn/health-checkup/${page}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const prepPages: MetadataRoute.Sitemap = prepareItems.map((item) => ({
    url: `${SITE_URL}/prepare/${item}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...learnPages, ...bhsPages, ...checkupPages, ...prepPages];
}
