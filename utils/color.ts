/**
 * Takes a HEX, RGB, RGBA color and returns a P3 color with alpha.
 * @param color Must be a valid HEX, RGB, RGBA color. HSL or HSLA are not supported.
 * @returns color(display-p3 ${red} ${green} ${blue} / ${alpha})
 */
export const toP3 = (color: string | null | undefined): string | undefined => {
  if (!color) return undefined;

  // return unmodified if already in P3 color space
  if (color?.includes("color(display-p3")) return color;

  // regex for matching HEX, RGB, RGBA colors
  const hexColorRegExp = /^#([0-9a-fA-F]{8}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
  const rgbColorRegExp = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
  const rgbaColorRegExp = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([01]?(\.\d+)?)\)$/;

  let red = 0;
  let green = 0;
  let blue = 0;
  let alpha = 1;

  if (hexColorRegExp.test(color)) {
    // parse HEX with optional alpha
    const match = color.match(hexColorRegExp);
    if (match) {
      const hex = match[1];
      if (hex.length === 8 || hex.length === 4) {
        // HEX with alpha
        const step = hex.length / 4;
        red = parseInt(hex.slice(0, step), 16);
        green = parseInt(hex.slice(step, 2 * step), 16);
        blue = parseInt(hex.slice(2 * step, 3 * step), 16);
        alpha = hex.length === 4 ? parseInt(hex.slice(3 * step), 16) / 15 : parseInt(hex.slice(3 * step), 16) / 255;
      } else {
        // HEX without alpha
        const step = hex.length / 3;
        red = parseInt(hex.slice(0, step), 16);
        green = parseInt(hex.slice(step, 2 * step), 16);
        blue = parseInt(hex.slice(2 * step, 3 * step), 16);
      }
    }
  } else if (rgbColorRegExp.test(color)) {
    // parse RGB
    const match = color.match(rgbColorRegExp);
    if (match) {
      red = parseInt(match[1], 10);
      green = parseInt(match[2], 10);
      blue = parseInt(match[3], 10);
    }
  } else if (rgbaColorRegExp.test(color)) {
    // parse RGBA
    const match = color.match(rgbaColorRegExp);
    if (match) {
      red = parseInt(match[1], 10);
      green = parseInt(match[2], 10);
      blue = parseInt(match[3], 10);
      alpha = parseFloat(match[4]);
    }
  } else {
    // return transparent without converting if something doesn't match
    return "rgba(0, 0, 0, 0)";
  }

  // convert to P3 color space
  const r = (red / 255).toFixed(6);
  const g = (green / 255).toFixed(6);
  const b = (blue / 255).toFixed(6);
  const a = alpha.toFixed(6);

  return `color(display-p3 ${r} ${g} ${b} / ${a})`;
};

/**
 * Converts a P3 color to a HEX color code with alpha channel.
 * @param p3Color P3 color string.
 * @returns #RRGGBBAA
 */
export const toHEX = (p3Color: string): string => {
  // Regular expression to match the P3 color format
  const p3ColorRegExp = /color\(display-p3\s+([0-1]?\.\d+)\s+([0-1]?\.\d+)\s+([0-1]?\.\d+)\s*\/\s*([01]?(\.\d+)?)\)/;

  // Check if the input is a valid P3 color
  if (!p3ColorRegExp.test(p3Color)) {
    return "#000000ff"; // Return black with full opacity if the input is invalid
  }

  const match = p3Color.match(p3ColorRegExp);
  if (!match) {
    return "#000000ff";
  }

  // Convert each color component from float to integer (0-255 range)
  const red = Math.round(parseFloat(match[1]) * 255);
  const green = Math.round(parseFloat(match[2]) * 255);
  const blue = Math.round(parseFloat(match[3]) * 255);
  const alpha = Math.round(parseFloat(match[4]) * 255);

  // Convert the color components to a two-digit hexadecimal code
  const toHexComponent = (component: number) => component.toString(16).padStart(2, "0");

  // Construct the HEX color code with alpha
  return `#${toHexComponent(red)}${toHexComponent(green)}${toHexComponent(blue)}${toHexComponent(alpha)}`;
};
