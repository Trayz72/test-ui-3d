import { products } from "../data/products";
import { pedestalPlacements } from "./layout";
import { Pedestal } from "./Pedestal";
import { Tumbler } from "./Tumbler";
import { useExperienceStore } from "../state/experienceStore";

export function ProductCorridor() {
  const focusedIndex = useExperienceStore((s) => s.focusedIndex);
  const colorwayIndex = useExperienceStore((s) => s.colorwayIndex);
  const phase = useExperienceStore((s) => s.phase);
  const focusProduct = useExperienceStore((s) => s.focusProduct);

  const inFocusMode = phase === "focus" && focusedIndex !== null;

  return (
    <group>
      {products.map((product, index) => {
        const placement = pedestalPlacements[index];
        const isActive = focusedIndex === index;
        const isDimmed = inFocusMode && !isActive;

        return (
          <group key={product.id} position={placement.position}>
            <Pedestal active={isActive} dimmed={isDimmed} />
            <group position={[0, 0.72, 0]}>
              <Tumbler
                product={product}
                colorwayIndex={isActive ? colorwayIndex : 0}
                active={isActive}
                dimmed={isDimmed}
                spin={!inFocusMode || isActive}
                onSelect={() => {
                  if (phase !== "focus") focusProduct(index);
                }}
              />
            </group>
          </group>
        );
      })}
    </group>
  );
}
