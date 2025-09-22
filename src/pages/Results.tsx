// src/pages/Results.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingDown, 
  Zap, 
  Droplets, 
  Recycle, 
  Award,
  Download,
  Share
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

type Breakdown = { upstream: number; processing: number; transport: number };

export type LcaResult = {
  runId?: string;
  filename?: string;
  date?: string;
  rowsProcessed?: number;
  totalCO2_kg?: number;
  totalEnergy_kWh?: number;
  totalWater_L?: number;
  recycling_efficiency_pct?: number;
  confidenceScore_pct?: number;
  breakdown?: Breakdown;
  timeSeries?: { month: string; emissions: number; target?: number }[];
  comparison?: { category: string; traditional: number; recycling: number }[];
};

const Results = ({ lcaResult }: { lcaResult?: LcaResult }) => {
  const [effectiveResult, setEffectiveResult] = useState<LcaResult | null>(null);

  // Load from props first, then fallback to sessionStorage
  useEffect(() => {
    if (lcaResult) {
      setEffectiveResult(lcaResult);
    } else {
      try {
        const raw = sessionStorage.getItem("ecometrica_lca_result");
        if (raw) {
          setEffectiveResult(JSON.parse(raw));
        }
      } catch (err) {
        console.error("Error reading sessionStorage:", err);
      }
    }
  }, [lcaResult]);

  if (!effectiveResult) {
    return (
      <div className="p-6 text-center text-gray-500">
        No results available. Please upload a dataset first.
      </div>
    );
  }

  // Build key metrics dynamically
  const keyMetrics = [
    {
      title: 'Carbon Footprint',
      value: `${effectiveResult.totalCO2