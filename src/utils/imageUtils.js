
/**
 * Resizes an image to a maximum width or height, maintaining aspect ratio.
 * @param {File} file - The image file to resize.
 * @param {number} maxWidth - Maximum width of the resized image.
 * @param {number} maxHeight - Maximum height of the resized image.
 * @returns {Promise<string>} - A promise that resolves with the resized image as a Data URL.
 */
export const resizeImage = (file, maxWidth = 800, maxHeight = 800) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL(file.type));
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
};
