import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { postId, userId, content, userName, userAvatar } = body;

    console.log('Comment API called:', { postId, userId, content, userName });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Generate a mock comment response
    const mockComment = {
      id: Date.now(),
      user: userName,
      text: content,
      time: 'Just now',
      avatar: userAvatar || userName?.charAt(0) || 'U',
      userId: userId
    };

    return NextResponse.json({
      success: true,
      message: 'Comment added successfully',
      postId,
      comment: mockComment,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in comment endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    );
  }
}
