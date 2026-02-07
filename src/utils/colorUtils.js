
import oimuColors from '../data/oimuColors.json';
import ColorThief from 'colorthief';

const colorThief = new ColorThief();

// --- Extraction Logic ---

/**
 * Extracts dominant colors from an image element.
 * @param {HTMLImageElement} img - The image element to extract from.
 * @param {number} count - Number of colors to extract.
 * @returns {Promise<Array>} Array of RGB arrays.
 */
export function extractColors(img, count = 5) {
    return new Promise((resolve, reject) => {
        if (img.complete) {
            try {
                const palette = colorThief.getPalette(img, count);
                resolve(palette);
            } catch (e) {
                reject(e);
            }
        } else {
            img.onload = () => {
                try {
                    const palette = colorThief.getPalette(img, count);
                    resolve(palette);
                } catch (e) {
                    reject(e);
                }
            };
            img.onerror = reject;
        }
    });
}

// --- Color Conversion Utilities ---

/**
 * Converts RGB to LAB color space.
 * Adapted from: https://github.com/antimatter15/rgb-lab/blob/master/color.js
 */
function rgb2lab(rgb) {
    let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
    let x, y, z;

    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

    x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
    y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
    z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;

    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)];
}

/**
 * Calculates Delta E (CIE76) between two LAB colors.
 */
function deltaE(labA, labB) {
    const deltaL = labA[0] - labB[0];
    const deltaA = labA[1] - labB[1];
    const deltaB = labA[2] - labB[2];
    return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
}

/**
 * Converts RGB array to Hex string.
 */
export function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// --- Matching Logic ---

/**
 * Finds the closest OIMU color for a given RGB value.
 */
export function findClosestColor(rgb) {
    const targetLab = rgb2lab(rgb);
    let minDiff = Infinity;
    let closest = null;

    for (const color of oimuColors) {
        if (!color.rgb) continue;

        // Cache LAB calculation if possible, but for 350 items it's fast enough
        const currentLab = rgb2lab(color.rgb);
        const diff = deltaE(targetLab, currentLab);

        if (diff < minDiff) {
            minDiff = diff;
            closest = color;
        }
    }

    return {
        ...closest,
        distance: minDiff,
        originalRgb: rgb
    };
}

/**
 * Estimates similarity percentage based on Delta E.
 * 0 Delta E = 100% match.
 * 100 Delta E = 0% match (roughly).
 */
export function getSimilarity(distance) {
    const similarity = Math.max(0, 100 - distance);
    return similarity.toFixed(1);
}
