// src/App.tsx (or replace the main page where you want upload + results)
import React, { useState } from 'react';
import UploadForm, { LcaResult as UploadLcaResult } from '@/components/UploadForm';
import Results from '@/pages/Results';

export default function App() {
  const [lcaResult, setLcaResult] = useState<UploadLcaResult | undefined>(undefined);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <UploadForm onResult={(r) => setLcaResult(r)} />
        <Results lcaResult={lcaResult} />
      </div>
    </div>
  );
}
