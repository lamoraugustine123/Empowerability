import { NextResponse } from 'next/server';
import fs from 'fs';

const TOKENS_FILE = './tokens.json';

export async function GET() {
  try {
    if (fs.existsSync(TOKENS_FILE)) {
      const data = fs.readFileSync(TOKENS_FILE, 'utf8');
      const tokens = JSON.parse(data);
      return NextResponse.json({
        success: true,
        tokens: tokens,
        count: Object.keys(tokens).length
      });
    } else {
      return NextResponse.json({
        success: true,
        tokens: {},
        count: 0,
        message: 'No tokens file found'
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to read tokens'
    }, { status: 500 });
  }
}
