import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { postId, userId, action } = body;

    console.log('Like API called:', { postId, userId, action });

    // In a real app, you would:
    // 1. Validate the user
    // 2. Update the database
    // 3. Return the updated count

    // Simulate database update
    const newLikes = action === 'like' ? 1 : -1;
    
    // Simulate response delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      message: `Post ${action}d successfully`,
      postId,
      likes: Math.floor(Math.random() * 100) + 1, // Simulated updated count
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in like endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to process like' },
      { status: 500 }
    );
  }
}
