/**
 * Orchestration Atelier Nord (landing polish).
 * Enchaîne les inits composants ; chaque init renvoie un cleanup.
 * Deps globales : GSAP + ScrollTrigger (CDN dans index.html) avant ce module.
 */
import { initHero } from "./components/hero.js";
import { initApproach } from "./components/approach.js";
import { initShowcase } from "./components/showcase.js";
import { initWork } from "./components/work.js";
import { initPrecision } from "./components/precision.js";
import { initProcess } from "./components/process.js";
import { initContact } from "./components/contact.js";

const cleanups = [
  initHero(document),
  initApproach(document),
  initShowcase(document),
  initWork(document),
  initPrecision(document),
  initProcess(document),
  initContact(document),
];

/** Revert toutes les animations / triggers (debug / tests). */
window.__atelierNordCleanup = () => {
  cleanups.forEach((fn) => typeof fn === "function" && fn());
};
