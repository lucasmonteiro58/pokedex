/* @ts-ignore */
import ColorThief from "colorthief";

export function getPredominantColor(url: string | undefined): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url as string;

    img.onload = function () {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(img);
      const modifiedColor = lightenColor(color, -50);
      const rgbColor = `rgb(${modifiedColor[0]}, ${modifiedColor[1]}, ${modifiedColor[2]})`;
      resolve(rgbColor);
    };
  });
}

function lightenColor(color: number[], amount: number) {
  const modifiedColor = color.map((component) => {
    const newValue = component + amount;
    return newValue > 255 ? 255 : newValue;
  });
  return modifiedColor;
}
