
import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

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
            className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer
        ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{ minHeight: '300px' }}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                onClick={(e) => (e.target.value = null)}
                accept="image/*"
                className="hidden"
            />

            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <Upload className="w-8 h-8 text-primary" />
            </div>

            <h3 className="text-xl font-medium text-gray-800 mb-2">
                이미지를 여기에 놓거나 클릭하세요
            </h3>
            <p className="text-gray-500 text-sm">
                JPG, PNG 파일을 지원합니다
            </p>
        </div>
    );
};

export default ImageUploader;
