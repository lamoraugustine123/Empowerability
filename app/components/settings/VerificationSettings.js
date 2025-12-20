'use client';
import { useState, useEffect } from 'react';

export default function VerificationSettings({ user }) {
  const [verificationStatus, setVerificationStatus] = useState({
    status: 'not_verified', // not_verified, pending, verified
    type: 'personal', // personal, organization, public_figure
    submittedAt: null,
    verifiedAt: null,
    verificationId: null,
    documents: [],
  });

  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    fullName: '',
    idType: 'government_id',
    idNumber: '',
    reason: '',
    organizationName: '',
    organizationWebsite: '',
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.verificationStatus) {
      setVerificationStatus(userData.verificationStatus);
    }
  }, []);

  const handleApplicationChange = (e) => {
    setApplicationForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDocumentUpload = async (file) => {
    setUploadingDoc(true);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newDoc = {
      id: Date.now(),
      name: file.name,
      type: file.type,
      uploadedAt: new Date().toISOString(),
      status: 'pending',
    };
    
    const updatedStatus = {
      ...verificationStatus,
      documents: [...verificationStatus.documents, newDoc],
    };
    
    setVerificationStatus(updatedStatus);
    setUploadingDoc(false);
    
    // Save to localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    userData.verificationStatus = updatedStatus;
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const submitVerificationRequest = () => {
    const newStatus = {
      ...verificationStatus,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    
    setVerificationStatus(newStatus);
    
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    userData.verificationStatus = newStatus;
    localStorage.setItem('user', JSON.stringify(userData));
    
    alert('Verification request submitted! You will be notified within 3-5 business days.');
  };

  const getStatusBadge = () => {
    switch(verificationStatus.status) {
      case 'verified':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <span className="mr-1">✓</span> Verified
        </span>;
      case 'pending':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          ⏳ Pending Review
        </span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
          Not Verified
        </span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">Verification Status</h3>
            <div className="mt-2">
              {getStatusBadge()}
            </div>
            {verificationStatus.verifiedAt && (
              <p className="text-sm text-gray-600 mt-2">
                Verified on {new Date(verificationStatus.verifiedAt).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="text-3xl">
            {verificationStatus.status === 'verified' ? '✅' : '🆔'}
          </div>
        </div>
      </div>

      {verificationStatus.status === 'not_verified' && (
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-3">Request Verification</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get a verified badge to build trust with the community. Verified accounts receive:
            </p>
            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              <li className="flex items-center">
                <span className="mr-2 text-green-600">✓</span>
                Increased credibility and trust
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-600">✓</span>
                Priority in search results
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-600">✓</span>
                Access to exclusive features
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-600">✓</span>
                Verification badge on your profile
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Verification Type</label>
              <select
                name="type"
                value={verificationStatus.type}
                onChange={(e) => setVerificationStatus(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="personal">Personal Account</option>
                <option value="organization">Organization/Business</option>
                <option value="public_figure">Public Figure</option>
              </select>
            </div>

            {verificationStatus.type === 'organization' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Organization Name</label>
                  <input
                    type="text"
                    name="organizationName"
                    value={applicationForm.organizationName}
                    onChange={handleApplicationChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Enter organization name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Organization Website</label>
                  <input
                    type="url"
                    name="organizationWebsite"
                    value={applicationForm.organizationWebsite}
                    onChange={handleApplicationChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="https://example.com"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">ID Type</label>
              <select
                name="idType"
                value={applicationForm.idType}
                onChange={handleApplicationChange}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="government_id">Government ID</option>
                <option value="passport">Passport</option>
                <option value="drivers_license">Driver's License</option>
                <option value="business_license">Business License</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ID Number</label>
              <input
                type="text"
                name="idNumber"
                value={applicationForm.idNumber}
                onChange={handleApplicationChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter ID number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Reason for Verification</label>
              <textarea
                name="reason"
                value={applicationForm.reason}
                onChange={handleApplicationChange}
                rows="3"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Explain why you need verification..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Upload Documents</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="text-4xl mb-2">📎</div>
                <p className="text-sm text-gray-600 mb-3">
                  Upload a clear photo of your ID document
                </p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => e.target.files[0] && handleDocumentUpload(e.target.files[0])}
                  className="hidden"
                  id="document-upload"
                />
                <label
                  htmlFor="document-upload"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
                >
                  {uploadingDoc ? 'Uploading...' : 'Choose File'}
                </label>
                <p className="text-xs text-gray-500 mt-3">
                  Supported: JPG, PNG, PDF (Max 5MB)
                </p>
              </div>
              
              {verificationStatus.documents.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Uploaded Documents</h4>
                  <div className="space-y-2">
                    {verificationStatus.documents.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <span>📄</span>
                          <span className="text-sm">{doc.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium mb-2">Verification Terms</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Your information is encrypted and secure</li>
                <li>• Verification typically takes 3-5 business days</li>
                <li>• Rejected applications can be resubmitted after 30 days</li>
                <li>• We only use your information for verification purposes</li>
              </ul>
            </div>

            <button
              onClick={submitVerificationRequest}
              disabled={verificationStatus.documents.length === 0}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              Submit Verification Request
            </button>
          </div>
        </div>
      )}

      {verificationStatus.status === 'pending' && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium mb-2">Application Under Review</h3>
          <p className="text-sm text-gray-600 mb-3">
            Your verification request was submitted on{' '}
            {new Date(verificationStatus.submittedAt).toLocaleDateString()}.
            Our team is reviewing your application.
          </p>
          <div className="flex items-center text-sm text-blue-600">
            <span className="mr-2">⏳</span>
            Estimated completion: 3-5 business days
          </div>
        </div>
      )}

      {verificationStatus.status === 'verified' && (
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-medium mb-2">Verified Account</h3>
          <p className="text-sm text-gray-600 mb-3">
            Your account has been verified. The verification badge appears next to your name.
          </p>
          <div className="flex items-center text-sm text-green-600">
            <span className="mr-2">✅</span>
            Verified on {new Date(verificationStatus.verifiedAt).toLocaleDateString()}
          </div>
        </div>
      )}
    </div>
  );
}
