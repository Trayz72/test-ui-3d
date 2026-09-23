import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Scrolls past the pinned intro reveal into the corridor. Reads the live
 * "intro" ScrollTrigger's computed end (absolute scroll px) rather than a
 * selector offset, since the intro section's effective scroll range only
 * exists once the pin + spacer are set up.
 */
export function scrollPastIntro() {
  const introTrigger = ScrollTrigger.getById("intro");
  const y = introTrigger ? introTrigger.end + 2 : window.innerHeight;
  gsap.to(window, { duration: 1.2, scrollTo: { y }, ease: "power2.inOut" });
}
