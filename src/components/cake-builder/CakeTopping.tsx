import { getToppingOption } from "@/config/cake-options";
import type { CakeToppingId } from "@/types/cake";

type CakeToppingProps = {
  toppingId: CakeToppingId;
  index: number;
  total: number;
};

export function CakeTopping({ toppingId, index, total }: CakeToppingProps) {
  const topping = getToppingOption(toppingId);
  if (!topping) {
    return null;
  }

  const angle = total === 1 ? -90 : -180 + (180 / Math.max(total - 1, 1)) * index;
  const radians = (angle * Math.PI) / 180;
  const x = 50 + Math.cos(radians) * 18;
  const y = 28 + Math.sin(radians) * 8;

  return (
    <span
      className="absolute h-4 w-4 rounded-full shadow-[0_4px_8px_rgba(60,36,21,0.2)]"
      style={{
        backgroundColor: topping.visual.placeholderColor,
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
      data-cake-topping={toppingId}
    />
  );
}
