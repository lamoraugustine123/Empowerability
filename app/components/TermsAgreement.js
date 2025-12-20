'use client';
import { useState, useEffect } from 'react';

export default function TermsAgreement() {
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.termsAgreed) {
      setAgreed(true);
    }
  }, []);

  const handleAgree = () => {
    setAgreed(true);
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    userData.termsAgreed = true;
    userData.termsAgreedAt = new Date().toISOString();
    localStorage.setItem('user', JSON.stringify(userData));
  };

  if (agreed) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Terms & Privacy Agreement</h2>
            <p className="text-sm text-gray-600 mt-1">Please review and accept our terms</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Terms of Service</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>By using our platform, you agree to:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Use the platform responsibly and respectfully</li>
                    <li>Not engage in harassment or hate speech</li>
                    <li>Respect other users' privacy and boundaries</li>
                    <li>Not share illegal or harmful content</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Privacy Policy</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>We value your privacy:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>We collect only necessary information to provide our services</li>
                    <li>Your data is stored securely and encrypted</li>
                    <li>We never sell your personal information to third parties</li>
                    <li>You can download or delete your data at any time</li>
                    <li>We use cookies to improve your experience</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Community Guidelines</h3>
                <div className="text-sm text-gray-600">
                  <p>Our community is built on respect, inclusion, and support. We expect all users to contribute positively and help create a safe environment for everyone.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t bg-gray-50">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mr-3"
              />
              <label htmlFor="agree-terms" className="text-sm">
                I have read and agree to the Terms of Service, Privacy Policy, and Community Guidelines
              </label>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowTerms(true)}
                className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                View Full Terms
              </button>
              <button
                onClick={handleAgree}
                disabled={!agreed}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Agree & Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-[101] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Full Terms & Conditions</h2>
              <button
                onClick={() => setShowTerms(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose max-w-none">
                <h3>1. Acceptance of Terms</h3>
                <p>Welcome to AbilityConnect. By accessing or using our platform, you agree to be bound by these Terms of Service...</p>
                
                <h3>2. User Responsibilities</h3>
                <p>You are responsible for maintaining the confidentiality of your account and password...</p>
                
                <h3>3. Content Guidelines</h3>
                <p>Users may not post content that is illegal, harmful, threatening, abusive, harassing...</p>
                
                <h3>4. Privacy</h3>
                <p>Your privacy is important to us. Please read our Privacy Policy to understand how we collect and use information...</p>
                
                <h3>5. Intellectual Property</h3>
                <p>The platform and its original content, features, and functionality are owned by AbilityConnect...</p>
                
                <h3>6. Termination</h3>
                <p>We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms...</p>
                
                <h3>7. Limitation of Liability</h3>
                <p>In no event shall AbilityConnect be liable for any indirect, incidental, special, consequential or punitive damages...</p>
                
                <h3>8. Changes to Terms</h3>
                <p>We reserve the right to modify these terms at any time. We will notify users of any changes...</p>
                
                <h3>9. Contact Information</h3>
                <p>If you have any questions about these Terms, please contact us at support@abilityconnect.com</p>
              </div>
            </div>
            
            <div className="p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowTerms(false)}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
