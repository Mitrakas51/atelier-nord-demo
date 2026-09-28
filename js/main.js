/**
 * Orchestration Atelier Nord.
 * Charge les inits composants (Hero → Contact). Chaque init renvoie un cleanup.
 * Deps globales page : GSAP + ScrollTrigger (CDN dans index.html) avant ce module.
 */
import { initHero } from "./components/hero.js";
import { initApproach } from "./components/approach.js";
import { initPrecision } from "./components/precision.js";
import { initProcess } from "./components/process.js";
import { initContact } from "./components/contact.js";

const cleanups = [
  initHero(document),
  initApproach(document),
  initPrecision(document),
  initProcess(document),
  initContact(document),
];

/** Revert toutes les animations / triggers (tests, HMR, debug). */
window.__atelierNordCleanup = () => {
  cleanups.forEach((fn) => typeof fn === "function" && fn());
};
