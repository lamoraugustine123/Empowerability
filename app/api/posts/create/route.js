import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { content, userId } = body;

    console.log('Create post API called:', { userId, contentLength: content?.length });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate mock post ID
    const postId = `post_${Date.now()}`;

    return NextResponse.json({
      success: true,
      message: 'Post created successfully',
      postId,
      content: content,
      userId,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in create post endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
