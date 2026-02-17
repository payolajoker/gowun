import { useRef, useState } from 'react';

const ImageUploader = ({ onImageUpload }) => {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file) => {
        if (!file.type.startsWith('image/')) return;
        onImageUpload(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            processFile(file);
        }
    };

    return (
        <div
            className={`uploader-container ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                onClick={(e) => (e.target.value = null)}
                accept="image/*"
                style={{ display: 'none' }}
            />

            <div className="icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
            </div>

            <h3>이미지를 여기에 놓거나 클릭하세요</h3>
            <p>JPG, PNG 파일을 지원합니다</p>
        </div>
    );
};

export default ImageUploader;
