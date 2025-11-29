'use client';
import { useState } from 'react';

export default function VideoUploadModal({ onClose, onUpload }) {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleVideoUpload = async () => {
    if (!videoFile) return;
    
    setIsUploading(true);
    try {
      console.log('Uploading video:', { title, description, videoFile });
      
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const uploadedVideo = {
        id: Date.now(),
        title: title || 'Untitled Video',
        description,
        url: URL.createObjectURL(videoFile),
        duration: '2:30',
        views: 0,
        uploadedAt: new Date()
      };
      
      onUpload(uploadedVideo);
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, "")); // Remove extension
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Upload Video</h3>
        
        <div className="space-y-4">
          {/* Video Upload Area */}
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => document.getElementById('video-upload').click()}
          >
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {videoFile ? (
              <div>
                <p className="text-green-600">✅ {videoFile.name}</p>
                <p className="text-sm text-gray-500 mt-2">Click to change video</p>
              </div>
            ) : (
              <div>
                <p className="text-gray-500">Click to select video file</p>
                <p className="text-sm text-gray-400 mt-1">MP4, MOV, AVI up to 100MB</p>
              </div>
            )}
          </div>

          {/* Video Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter video title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your video..."
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={handleVideoUpload}
              disabled={!videoFile || isUploading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 rounded-lg transition-colors"
            >
              {isUploading ? 'Uploading...' : 'Upload Video'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
