// Alternative email service with timeout and better error handling
export async function sendWelcomeEmailRobust(email, name) {
  console.log('🛡️ Using robust email sender...')
  
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      console.log('⏰ Email timeout - skipping welcome email')
      resolve({ success: false, error: 'Timeout', skipped: true })
    }, 10000); // 10 second timeout

    // Import and use the main email service
    import('./email-service.js').then(async ({ sendWelcomeEmail }) => {
      try {
        const result = await sendWelcomeEmail(email, name)
        clearTimeout(timeout)
        resolve(result)
      } catch (error) {
        clearTimeout(timeout)
        resolve({ success: false, error: error.message })
      }
    }).catch(error => {
      clearTimeout(timeout)
      resolve({ success: false, error: error.message })
    })
  })
}
