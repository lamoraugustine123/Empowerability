import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { postId, userId } = body;

    console.log('Share API called:', { postId, userId });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Generate a share URL
    const shareId = `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const shareUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/share/${shareId}`;

    return NextResponse.json({
      success: true,
      message: 'Post shared successfully',
      postId,
      shareId,
      shareUrl,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in share endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to share post' },
      { status: 500 }
    );
  }
}
