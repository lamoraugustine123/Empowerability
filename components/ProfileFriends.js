import { useState, useEffect } from 'react';

export default function ProfileFriends() {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSuggestions = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const sampleSuggestions = [
          {
            id: 1,
            name: 'Tech News',
            username: '@technews',
            avatar: 'T',
            verified: true,
            bio: 'Latest technology news and updates'
          },
          {
            id: 2,
            name: 'Sarah Johnson',
            username: '@sarahj',
            avatar: 'S',
            verified: false,
            bio: 'Accessibility Advocate | Making tech inclusive for everyone'
          },
          {
            id: 3,
            name: 'Mike Chen',
            username: '@mikec',
            avatar: 'M',
            verified: true,
            bio: 'UX Designer | Inclusive Design Specialist'
          },
          {
            id: 4,
            name: 'Disability Rights',
            username: '@disabilityrights',
            avatar: 'D',
            verified: true,
            bio: 'Advocating for disability rights and accessibility worldwide'
          },
          {
            id: 5,
            name: 'AI Ethics',
            username: '@aiethics',
            avatar: 'A',
            verified: true,
            bio: 'Exploring ethical AI development and inclusive algorithms'
          }
        ];
        
        setSuggestions(sampleSuggestions);
      } catch (error) {
        console.error('Failed to load suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSuggestions();
  }, []);

  const handleFollow = (suggestionId) => {
    setSuggestions(prev => prev.filter(suggestion => suggestion.id !== suggestionId));
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center space-x-3 animate-pulse">
            <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-32 mb-1"></div>
              <div className="h-3 bg-gray-700 rounded w-16"></div>
            </div>
            <div className="w-20 h-8 bg-gray-700 rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
              {suggestion.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <span className="font-bold text-white text-sm truncate">{suggestion.name}</span>
                {suggestion.verified && (
                  <span className="text-blue-500 text-xs">✓</span>
                )}
              </div>
              <p className="text-gray-500 text-sm truncate">{suggestion.username}</p>
              <p className="text-gray-500 text-sm truncate mt-1">{suggestion.bio}</p>
            </div>
          </div>
          <button
            onClick={() => handleFollow(suggestion.id)}
            className="bg-white text-black hover:bg-gray-200 font-bold px-4 py-1 rounded-full text-sm transition-colors"
          >
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}
