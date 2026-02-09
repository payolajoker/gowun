
import React, { useState } from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader';
import ColorResult from './components/ColorResult';
import { extractColors, findClosestColor } from './utils/colorUtils';
import { resizeImage } from './utils/imageUtils';

function App() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (file) => {
    try {
      setIsLoading(true);
      const resizedImage = await resizeImage(file);
      setImage(resizedImage);
      processImage(resizedImage);
    } catch (error) {
      console.error("Image processing error:", error);
      alert("이미지 처리 중 오류가 발생했습니다. 다른 이미지를 시도해주세요.");
      setIsLoading(false);
    }
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

      <footer className="attribution">
        <p className="attribution-title">색 이름 출처</p>
        <p className="attribution-text">
          이 서비스는 <a href="https://oimu-seoul.com/product/%EC%83%89%EC%9D%B4%EB%A6%84-352-%EA%B0%9C%EC%A0%95%ED%8C%90/158/" target="_blank" rel="noopener noreferrer">OIMU의 『색이름 352』</a>에서
          수집한 352가지 우리말 색이름을 사용합니다.
        </p>
        <p className="attribution-method">
          색상 매칭은 CIELAB 색공간에서 Delta E(CIE76) 알고리즘을 사용하여
          인간의 시각적 인지와 유사한 방식으로 가장 가까운 색을 찾습니다.
        </p>
      </footer>
    </div>
  );
}

export default App;
