'use client';
import { useState, useRef } from 'react';

export default function PhotoUploadModal({ 
  isOpen, 
  onClose, 
  type, // 'cover' or 'profile'
  onUploadComplete 
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [cropSettings, setCropSettings] = useState({ x: 0, y: 0, zoom: 1 });
  const fileInputRef = useRef(null);
  
  if (!isOpen) return null;

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
      }
      
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;
    
    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would upload to a server here
    // For now, we'll save to localStorage and update UI
    
    const imageData = {
      url: previewUrl,
      type: type,
      uploadedAt: new Date().toISOString(),
      filename: selectedImage.name
    };
    
    // Save to localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (type === 'cover') {
      userData.coverPhoto = imageData;
    } else {
      userData.profilePhoto = imageData;
    }
    localStorage.setItem('user', JSON.stringify(userData));
    
    setIsUploading(false);
    onUploadComplete(imageData);
    onClose();
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    onClose();
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleCropChange = (setting, value) => {
    setCropSettings(prev => ({ ...prev, [setting]: value }));
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 z-[100] transition-opacity"
        onClick={handleCancel}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl w-full max-w-md shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {type === 'cover' ? 'Update Cover Photo' : 'Update Profile Picture'}
              </h2>
              <button 
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 mt-1">
              {type === 'cover' 
                ? 'Choose a photo that represents you best' 
                : 'Choose a clear photo of your face'}
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {!selectedImage ? (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={triggerFileSelect}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">📷</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Select a photo</h3>
                <p className="text-gray-600 mb-4">Choose a photo from your computer</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Select Photo
                </button>
                <p className="text-sm text-gray-500 mt-4">Max file size: 5MB</p>
              </div>
            ) : (
              <div>
                {/* Preview */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Preview</h3>
                  <div className={`relative overflow-hidden rounded-lg ${type === 'cover' ? 'h-40' : 'h-48'}`}>
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(${previewUrl})`,
                        transform: `scale(${cropSettings.zoom}) translate(${cropSettings.x}px, ${cropSettings.y}px)`
                      }}
                    />
                    {type === 'profile' && (
                      <div className="absolute inset-0 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  {/* Crop Controls (for profile only) */}
                  {type === 'profile' && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Zoom</label>
                        <input 
                          type="range" 
                          min="1" 
                          max="3" 
                          step="0.1"
                          value={cropSettings.zoom}
                          onChange={(e) => handleCropChange('zoom', parseFloat(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Position X</label>
                          <input 
                            type="range" 
                            min="-50" 
                            max="50" 
                            value={cropSettings.x}
                            onChange={(e) => handleCropChange('x', parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Position Y</label>
                          <input 
                            type="range" 
                            min="-50" 
                            max="50" 
                            value={cropSettings.y}
                            onChange={(e) => handleCropChange('y', parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={triggerFileSelect}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Choose Another
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isUploading ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                        Uploading...
                      </span>
                    ) : (
                      'Upload Photo'
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />

            {/* Quick Tips */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium mb-2">Tips for a great photo:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {type === 'cover' ? (
                  <>
                    <li>• Use high-resolution images (minimum 1200×400)</li>
                    <li>• Choose images with good lighting</li>
                    <li>• Avoid busy backgrounds</li>
                    <li>• Make sure important content isn't covered by profile picture</li>
                  </>
                ) : (
                  <>
                    <li>• Face the camera directly</li>
                    <li>• Use good, natural lighting</li>
                    <li>• Make sure your face is clearly visible</li>
                    <li>• Use a simple background</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
