/* COLUMN 2: MIDDLE FEED - INDEPENDENT SCROLL CONTAINER */
<div className="lg:col-span-2">
  {/* PERMANENT INDEPENDENT SCROLL CONTAINER - FIXED HEIGHT */}
  <div className="h-[calc(100vh-120px)] overflow-y-auto">
    {/* Fixed top part - NO FLEX, NO FLEX-SHRINK */}
    <div className="space-y-4 mb-4">
      <FacebookStoriesBar />
      <FacebookCreatePost />
    </div>
    
    {/* Scrollable content - SIMPLE DIV, NO FLEX */}
    <div className="space-y-6 pb-8">
      {posts.map((post) => (
        <FacebookPost key={post.id} post={post} />
      ))}
      
      {/* Loading indicator at bottom */}
      <div className="text-center py-4">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-sm text-gray-500">Loading more posts...</p>
      </div>
    </div>
  </div>
</div>
