import { rgbToHex, getSimilarity } from '../utils/colorUtils';

function getContrastColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)';
}

const ColorResult = ({ extractedRgb, matchedColor }) => {
    const extractedHex = rgbToHex(...extractedRgb);
    const matchedHex = matchedColor.hex;
    const similarity = getSimilarity(matchedColor.distance);

    return (
        <div className="color-card">
            <div className="color-swatches">
                <div
                    className="swatch"
                    style={{
                        backgroundColor: extractedHex,
                        color: getContrastColor(extractedHex),
                    }}
                    title={`추출된 색: ${extractedHex}`}
                >
                    <span>추출된 색</span>
                </div>
                <div
                    className="swatch"
                    style={{
                        backgroundColor: matchedHex,
                        color: getContrastColor(matchedHex),
                    }}
                    title={`${matchedColor.name}: ${matchedHex}`}
                >
                    <span>{matchedColor.name}</span>
                </div>
            </div>

            <div className="card-info">
                <h3 className="korean-name">{matchedColor.name}</h3>
                <p className="hex-code">{matchedHex}</p>

                <div className={`match-score ${parseFloat(similarity) > 90 ? 'high' : ''}`}>
                    일치도: {similarity}%
                </div>
            </div>
        </div>
    );
};

export default ColorResult;
