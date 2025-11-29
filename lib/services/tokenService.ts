// SUPER SIMPLE token storage - just for testing
let tokens: any = {};

export const generatePasswordResetToken = (email: string): string => {
  console.log('🔄 Generating token for:', email);
  
  // Clean up old tokens
  const now = Date.now();
  for (const token in tokens) {
    if (tokens[token].expires < now) {
      delete tokens[token];
    }
  }

  const token = 'test123'; // Simple fixed token for testing
  tokens[token] = {
    email,
    expires: Date.now() + 3600000, // 1 hour
    used: false
  };
  
  console.log('🔑 Token generated:', token);
  console.log('💾 Current tokens:', Object.keys(tokens));
  
  return token;
};

export const validatePasswordResetToken = (token: string): { valid: boolean; email?: string; error?: string } => {
  console.log('🔍 Validating token:', token);
  console.log('📋 Available tokens:', Object.keys(tokens));
  
  const tokenData = tokens[token];
  
  if (!tokenData) {
    console.log('❌ Token not found');
    return { valid: false, error: 'Invalid or expired reset token' };
  }
  
  console.log('✅ Token is valid for:', tokenData.email);
  return { valid: true, email: tokenData.email };
};

export const markTokenAsUsed = (token: string): boolean => {
  if (tokens[token]) {
    tokens[token].used = true;
    console.log('✅ Token marked as used');
    return true;
  }
  return false;
};
