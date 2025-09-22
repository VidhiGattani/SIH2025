// src/components/UploadForm.tsx
import React, { useState } from 'react';
import Papa from 'papaparse';
import { Button } from '@/components/ui/button';

export type LcaResult = {
  runId: string;
  filename: string;
  date: string;
  rowsProcessed: number;
  totalCO2_kg: number;
  totalEnergy_kWh: number;
  totalWater_L: number;
  recycling_efficiency_pct: number;
  confidenceScore_pct: number;
  breakdown: { upstream: number; processing: number; transport: number; };
  timeSeries?: { month: string; emissions: number; target?: number }[];
  comparison?: { category: string; traditional: number; recycling: number }[];
};

export default function UploadForm({ onResult }: { onResult: (r: LcaResult) => void }) {
  const [processing, setProcessing] = useState(false);

  const handleFile = (file: File | null) => {
    if (!file) return alert('Please choose a CSV file for this prototype.');
    setProcessing(true);

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows: any[] = results.data as any[];

        // Normalize/convert fields - adjust heuristics as needed
        const normalized = rows.map(r => ({
          energy_kWh: Number(r.energy_kWh ?? r.energy ?? r.energy_kwh ?? r.Energy ?? 0) || 0,
          water_L: Number(r.water_L ?? r.water ?? r.water_l ?? r.Water ?? 0) || 0,
          emissions_kgCO2: Number(r.emissions_kgCO2 ?? r.co2 ?? r.CO2 ?? r.emissions ?? 0) || 0,
        }));

        const rowsProcessed = normalized.length || 1;
        const totalCO2 = normalized.reduce((s, x) => s + (x.emissions_kgCO2 || 0), 0);
        const totalEnergy = normalized.reduce((s, x) => s + (x.energy_kWh || 0), 0);
        const totalWater = normalized.reduce((s, x) => s + (x.water_L || 0), 0);

        // Simple breakdown heuristic
        const breakdown = {
          upstream: Number((totalCO2 * 0.5).toFixed(2)),
          processing: Number((totalCO2 * 0.35).toFixed(2)),
          transport: Number((totalCO2 * 0.15).toFixed(2)),
        };

        // Confidence based on how many non-zero fields exist (simple)
        const completeness = normalized.reduce((acc, r) => {
          const present = (r.energy_kWh > 0 ? 1 : 0) + (r.water_L > 0 ? 1 : 0) + (r.emissions_kgCO2 > 0 ? 1 : 0);
          return acc + present / 3;
        }, 0);
        const confidenceScore = Math.round((completeness / Math.max(1, rowsProcessed)) * 100);

        // Simple recycling efficiency heuristic (placeholder)
        const recycling_efficiency_pct = Math.max(0, Math.min(100, Math.round(100 - (totalCO2 / (totalEnergy || 1)))));

        // Optional small time series (if rows have date-like field) - otherwise mock small series
        const timeSeries = [
          { month: 'Jan', emissions: Math.round((totalCO2 / rowsProcessed) * 1.2) },
          { month: 'Feb', emissions: Math.round((totalCO2 / rowsProcessed) * 1.1) },
          { month: 'Mar', emissions: Math.round((totalCO2 / rowsProcessed) * 1.0) },
        ];

        const result: LcaResult = {
          runId: 'run_' + Date.now(),
          filename: file.name,
          date: new Date().toLocaleDateString(),
          rowsProcessed,
          totalCO2_kg: Number(totalCO2.toFixed(2)),
          totalEnergy_kWh: Number(totalEnergy.toFixed(2)),
          totalWater_L: Number(totalWater.toFixed(2)),
          recycling_efficiency_pct,
          confidenceScore_pct: Math.min(100, Math.max(5, confidenceScore)),
          breakdown,
          timeSeries,
          comparison: [
            { category: 'Mining', traditional: Math.round((totalCO2 || 0) * 1.1), recycling: Math.round((totalCO2 || 0) * 0.6) },
            { category: 'Processing', traditional: Math.round((totalCO2 || 0) * 0.9), recycling: Math.round((totalCO2 || 0) * 0.5) },
          ]
        };

        setProcessing(false);
        onResult(result);
      },
      error: (err) => {
        setProcessing(false);
        alert('CSV parse error: ' + err.message);
      }
    });
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <p className="mb-2">Upload a CSV file with numeric columns (energy_kWh, water_L, emissions_kgCO2 recommended).</p>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
      {processing && <p className="mt-2 text-sm text-gray-600">Processing...</p>}
      <div className="mt-4">
        <small className="text-xs text-gray-500">If your CSV uses different column names, rename them or edit the normalization lines in this component.</small>
      </div>
    </div>
  );
}
