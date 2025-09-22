// src/components/UploadForm.tsx
import React, { useState } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

/**
 * Simple upload component that:
 * - parses CSV client-side,
 * - computes a simple LCA result,
 * - stores it in sessionStorage,
 * - navigates to /app/results
 *
 * Note: If your project uses absolute imports (@"..."), adapt the imports.
 */

export default function UploadForm() {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handleFile = (file: File | null) => {
    if (!file) {
      alert("Please choose a CSV file (prototype).");
      return;
    }
    setProcessing(true);

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const rows: any[] = results.data as any[];

          // Normalize fields - tweak if your CSV uses different names
          const normalized = rows.map((r) => ({
            energy_kWh: Number(r.energy_kWh ?? r.energy ?? r.energy_kwh ?? 0) || 0,
            water_L: Number(r.water_L ?? r.water ?? r.water_l ?? 0) || 0,
            emissions_kgCO2: Number(r.emissions_kgCO2 ?? r.co2 ?? r.CO2 ?? r.emissions ?? 0) || 0,
          }));

          const rowsProcessed = normalized.length || 1;
          const totalCO2 = normalized.reduce((s, x) => s + (x.emissions_kgCO2 || 0), 0);
          const totalEnergy = normalized.reduce((s, x) => s + (x.energy_kWh || 0), 0);
          const totalWater = normalized.reduce((s, x) => s + (x.water_L || 0), 0);

          const breakdown = {
            upstream: Number((totalCO2 * 0.5).toFixed(2)),
            processing: Number((totalCO2 * 0.35).toFixed(2)),
            transport: Number((totalCO2 * 0.15).toFixed(2)),
          };

          const completeness = normalized.reduce((acc, r) => {
            const present = (r.energy_kWh > 0 ? 1 : 0) + (r.water_L > 0 ? 1 : 0) + (r.emissions_kgCO2 > 0 ? 1 : 0);
            return acc + present / 3;
          }, 0);
          const confidenceScore = Math.round((completeness / Math.max(1, rowsProcessed)) * 100);
          const recycling_efficiency_pct = Math.max(0, Math.min(100, Math.round(100 - (totalCO2 / (totalEnergy || 1)))));

          const result = {
            runId: "run_" + Date.now(),
            filename: file.name,
            date: new Date().toLocaleString(),
            rowsProcessed,
            totalCO2_kg: Number(totalCO2.toFixed(2)),
            totalEnergy_kWh: Number(totalEnergy.toFixed(2)),
            totalWater_L: Number(totalWater.toFixed(2)),
            recycling_efficiency_pct,
            confidenceScore_pct: Math.min(100, Math.max(5, confidenceScore)),
            breakdown,
            // small sample series for charts
            timeSeries: [
              { month: "Jan", emissions: Math.round((totalCO2 / rowsProcessed) * 1.2) },
              { month: "Feb", emissions: Math.round((totalCO2 / rowsProcessed) * 1.1) },
              { month: "Mar", emissions: Math.round((totalCO2 / rowsProcessed) * 1.0) },
            ],
            comparison: [
              { category: "Mining", traditional: Math.round((totalCO2 || 0) * 1.1), recycling: Math.round((totalCO2 || 0) * 0.6) },
              { category: "Processing", traditional: Math.round((totalCO2 || 0) * 0.9), recycling: Math.round((totalCO2 || 0) * 0.5) },
            ],
          };

          // Save to sessionStorage so Results page can read it after navigation
          try {
            sessionStorage.setItem("ecometrica_lca_result", JSON.stringify(result));
          } catch (e) {
            console.warn("Could not write to sessionStorage", e);
          }

          setProcessing(false);
          // navigate to Results route
          navigate("/app/results");
        } catch (err: any) {
          setProcessing(false);
          console.error(err);
          alert("Error processing CSV: " + (err?.message ?? err));
        }
      },
      error: (err) => {
        setProcessing(false);
        console.error("CSV parse error", err);
        alert("CSV parse error: " + err?.message ?? err);
      },
    });
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <p className="mb-2">Upload CSV (columns: energy_kWh, water_L, emissions_kgCO2 recommended).</p>
      <input type="file" accept=".csv" onChange={(e) => handleFile(e.target.files?.[0] ?? null)} />
      {processing && <p className="mt-2 text-sm text-gray-600">Processing...</p>}
      <div className="mt-2 text-xs text-gray-500">
        If your CSV uses different column names, rename them or edit the normalization lines in this file.
      </div>
    </div>
  );
}
