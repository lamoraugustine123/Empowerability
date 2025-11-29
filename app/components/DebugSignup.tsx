'use client';

import { disabilityTypes } from '@/lib/data/disabilityTypes';

export default function DebugSignup() {
  console.log('Disability types:', disabilityTypes);
  
  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400">
      <h3 className="font-bold">Debug Info:</h3>
      <p>Number of disability types: {disabilityTypes.length}</p>
      <div className="mt-2">
        {disabilityTypes.map(type => (
          <div key={type.id} className="text-sm">
            {type.name} - {type.id}
          </div>
        ))}
      </div>
    </div>
  );
}
