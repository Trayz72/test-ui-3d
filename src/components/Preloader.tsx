import { useEffect, useState, type ReactNode } from "react";

interface PreloaderProps {
  children: ReactNode;
}

const MIN_DISPLAY_MS = 550;
const EXIT_TRANSITION_MS = 500;

/**
 * A branded entrance screen shown once per cold load. Masks web-font swap
 * (FOUT) and the initial JS/asset fetch behind an intentional brand beat
 * instead of a flash of unstyled or empty content.
 */
export function Preloader({ children }: PreloaderProps) {
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, MIN_DISPLAY_MS));
    const fontsReady =
      "fonts" in document ? document.fonts.ready : Promise.resolve(undefined as unknown as FontFaceSet);

    Promise.all([minDelay, fontsReady]).then(() => {
      if (cancelled) return;
      setExiting(true);
      setTimeout(() => {
        if (!cancelled) setMounted(false);
      }, EXIT_TRANSITION_MS);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {children}
      {mounted && (
        <div className={`ue-preloader${exiting ? " ue-preloader--exit" : ""}`} aria-hidden={exiting}>
          <div className="ue-preloader__mark">UE</div>
          <div className="ue-preloader__word">URBANESSENTIALS</div>
          <div className="ue-preloader__bar">
            <span />
          </div>
        </div>
      )}
    </>
  );
}
