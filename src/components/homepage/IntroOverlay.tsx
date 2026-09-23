import { useExperienceStore } from "../../state/experienceStore";
import { scrollPastIntro } from "../../hooks/scrollNav";

export function IntroOverlay() {
  const enter = useExperienceStore((s) => s.enter);

  const handleEnter = () => {
    enter();
    scrollPastIntro();
  };

  return (
    <div className="intro-copy">
      <span className="ue-eyebrow">Urban Essentials · The Showroom</span>
      <h1>
        Built for
        <br />
        the Everyday
      </h1>
      <p>
        Four tumblers. One immersive walkthrough. Scroll to step inside the
        showroom and inspect the collection in 3D.
      </p>
      <button className="ue-btn ue-btn--solid" onClick={handleEnter}>
        Enter the Showroom
      </button>
      <div className="intro-scroll-cue">
        <span />
        SCROLL
      </div>
    </div>
  );
}
