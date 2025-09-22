import React, { useState } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

export default function UploadForm() {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handleFile = (file: File | null) => {
    console.log("File selected:", file);  // 👈 DEBUG LOG
    if (!file) {
      alert("Please choose a CSV file.");
      return;
    }
    setProcessing(true);

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("PapaParse results:", results.data);  // 👈 DEBUG LOG
        try {
          const rows: any[] = results.data as any[];

          const result = {
            totalCO2_kg: rows.reduce((s, r) => s + (r.emissions_kgCO2 || 0), 0),
            totalEnergy_kWh: rows.reduce((s, r) => s + (r.energy_kWh || 0), 0),
            totalWater_L: rows.reduce((s, r) => s + (r.water_L || 0), 0),
            rowsProcessed: rows.length,
            confidenceScore_pct: 85,
            filename: file.name,
            date: new Date().toLocaleString(),
            breakdown: { upstream: 40, processing: 35, transport: 25 },
          };

          console.log("Computed result:", result);  // 👈 DEBUG LOG

          sessionStorage.setItem("ecometrica_lca_result", JSON.stringify(result));
          console.log("Saved to sessionStorage");  // 👈 DEBUG LOG

          setProcessing(false);
          navigate("/app/results");
        } catch (err) {
          setProcessing(false);
          console.error("Error computing result:", err);
        }
      },
      error: (err) => {
        setProcessing(false);
        console.error("CSV parse error:", err);
      },
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={(e) => handleFile(e.target.files?.[0] ?? null)} />
      {processing && <p>Processing...</p>}
    </div>
  );
}