import { BoxHTMLProps, BoxOptions } from "reakit/Box/Box";
import { unstable_mergeProps } from "reakit/utils/mergeProps";
import { usePalette } from "./utils/palette";
import { useContrast } from "./utils/contrast";

export type PaletteBoxOptions = BoxOptions & {
  unstable_system: {
    palette?: string;
    fill?: "opaque" | "outline";
  };
};

export function useBoxProps(
  { unstable_system: system = {} }: PaletteBoxOptions,
  htmlProps: BoxHTMLProps = {}
) {
  const color = usePalette(system.palette);
  const contrast = useContrast(color);
  const textColor = system.fill === "opaque" ? contrast : color;
  const backgroundColor = system.fill === "opaque" ? color : undefined;
  const borderColor = system.fill === "outline" ? color : undefined;
  const style = {
    ...(textColor ? { color: textColor } : {}),
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(borderColor ? { border: `1px solid ${borderColor}`, borderColor } : {})
  };

  return unstable_mergeProps({ style }, htmlProps);
}
