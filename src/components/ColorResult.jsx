
import React from 'react';
import { rgbToHex, getSimilarity } from '../utils/colorUtils';

const ColorResult = ({ extractedRgb, matchedColor }) => {
    const extractedHex = rgbToHex(...extractedRgb);
    const matchedHex = matchedColor.hex;
    const similarity = getSimilarity(matchedColor.distance);

    return (
        <div className="color-card">
            <div className="color-swatches">
                <div
                    className="swatch"
                    style={{ backgroundColor: extractedHex }}
                    title={`추출된 색: ${extractedHex}`}
                >
                    <span>추출된 색</span>
                </div>
                <div
                    className="swatch"
                    style={{ backgroundColor: matchedHex }}
                    title={`Matched: ${matchedHex}`}
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
