
import React, { useState } from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader';
import ColorResult from './components/ColorResult';
import { extractColors, findClosestColor } from './utils/colorUtils';

function App() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (imageDataUrl) => {
    setImage(imageDataUrl);
    processImage(imageDataUrl);
  };

  const processImage = async (url) => {
    setIsLoading(true);
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;

    try {
      // Extract 6 dominant colors
      const extractedRgbs = await extractColors(img, 6);

      const matchedResults = extractedRgbs.map(rgb => {
        const match = findClosestColor(rgb);
        return {
          extractedRgb: rgb,
          matchedColor: match
        };
      });

      setResults(matchedResults);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResults([]);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>고운 <span style={{ fontSize: '1rem', fontWeight: 300, verticalAlign: 'middle' }}>GOWUN</span></h1>
        <p>당신의 사진 속 색의 이름을 찾아드립니다.</p>
      </header>

      {!image ? (
        <ImageUploader onImageUpload={handleImageUpload} />
      ) : (
        <div className="result-container">
          <div className="preview-container">
            <img src={image} alt="Uploaded" className="preview-image" />
          </div>

          {isLoading ? (
            <p>색상을 분석하고 있습니다...</p>
          ) : (
            <>
              <div className="results-grid">
                {results.map((result, index) => (
                  <ColorResult
                    key={index}
                    extractedRgb={result.extractedRgb}
                    matchedColor={result.matchedColor}
                  />
                ))}
              </div>

              <button className="reset-button" onClick={handleReset}>
                다른 사진 올리기
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
