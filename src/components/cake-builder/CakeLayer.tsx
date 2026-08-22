type CakeLayerName = "base" | "filling" | "coverage";

type CakeLayerProps = {
  layer: CakeLayerName;
  color: string;
  visible?: boolean;
};

const LAYER_STYLES: Record<CakeLayerName, string> = {
  base: "absolute inset-[18%] rounded-[50%] shadow-[0_18px_30px_rgba(60,36,21,0.18)]",
  filling:
    "absolute inset-[28%_18%_46%] rounded-[50%] opacity-90 shadow-[0_8px_16px_rgba(60,36,21,0.12)]",
  coverage:
    "absolute inset-[12%_16%_52%] rounded-[46%] opacity-95 shadow-[0_10px_20px_rgba(60,36,21,0.1)]",
};

export function CakeLayer({ layer, color, visible = true }: CakeLayerProps) {
  if (!visible) {
    return null;
  }

  return (
    <div
      className={LAYER_STYLES[layer]}
      style={{ backgroundColor: color }}
      data-cake-layer={layer}
    />
  );
}
