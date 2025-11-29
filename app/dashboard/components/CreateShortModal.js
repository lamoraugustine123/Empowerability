'use client';
import { useState } from 'react';

export default function CreateShortModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('15');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);

  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real app, this would start camera recording
    console.log('Starting recording...');
    
0   // Simulate recording completion after 4 seconds
    setTimeout(() => {
      setIsRecording(false);
      setRecordedVideo('recorded-video-blob');
      console.log('Recording completed');
    }, 3000);
  };

  const handleCreateShort = () => {
    const shortData = {
      id: Date.now(),
      title: title || 'My Short Video',
      description,
      duration: `${duration}s`,
      views: 0,
      likes: 0,
      createdAt: new Date(),
      videoUrl: recordedVideo || 'sample-video-url'
    };
    
    onCreate(shortData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Create Short</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-lg"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Video Preview/Recording Area */}
          <div className="bg-gray-100 rounded-lg aspect-[9/16] flex items-center justify-center relative overflow-hidden">
            {isRecording ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full animate-pulse mx-auto mb-4"></div>
                <p className="text-red-600 font-medium">Recording...</p>
                <p className="text-sm text-gray-600 mt-1">00:03</p>
              </div>
            ) : recordedVideo ? (
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mx-auto mb-4">
                  ✅
                </div>
                <p className="text-green-600 font-medium">Video Recorded</p>
                <button 
                  onClick={() => setRecordedVideo(null)}
                  className="text-sm text-blue-500 hover:text-blue-600 mt-2"
                >
                  Record Again
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4 cursor-pointer hover:bg-red-600 transition-colors"
                  onClick={handleStartRecording}
                >
                  🎬
                </div>
                <p className="text-gray-700 font-medium">Start Recording</p>
                <p className="text-sm text-gray-500 mt-1">Tap to record your short</p>
              </div>
            )}
          </div>

          {/* Duration Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration: {duration} seconds
            </label>
            <div className="flex space-x-2">
              {['15', '30', '45', '60'].map(sec => (
                <button
                  key={sec}
                  onClick={() => setDuration(sec)}
                  className={`flex-1 py-2 text-sm rounded-lg border transition-colors ${
                    duration === sec 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Give your short a title..."
              maxLength={100}
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {title.length}/100
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Describe your short video..."
              maxLength={200}
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {description.length}/200
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateShort}
              disabled={!recordedVideo}
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 rounded-lg font-medium transition-all shadow-sm"
            >
              Create Short
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
