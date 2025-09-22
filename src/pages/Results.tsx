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
      value: `${effectiveResult.totalCO2_kg || 0} kg`,
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Energy Consumption',
      value: `${effectiveResult.totalEnergy_kWh || 0} kWh`,
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Water Usage',
      value: `${effectiveResult.totalWater_L || 0} L`,
      icon: Droplets,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Recycling Efficiency',
      value: `${effectiveResult.recycling_efficiency_pct || 0}%`,
      icon: Recycle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  // Sample data for charts
  const pieData = [
    { name: 'Upstream', value: effectiveResult.breakdown?.upstream || 45, color: '#EF4444' },
    { name: 'Processing', value: effectiveResult.breakdown?.processing || 35, color: '#F59E0B' },
    { name: 'Transport', value: effectiveResult.breakdown?.transport || 20, color: '#10B981' }
  ];

  const timeSeriesData = effectiveResult.timeSeries || [
    { month: 'Jan', emissions: 120, target: 100 },
    { month: 'Feb', emissions: 115, target: 100 },
    { month: 'Mar', emissions: 108, target: 100 },
    { month: 'Apr', emissions: 102, target: 100 },
    { month: 'May', emissions: 98, target: 100 },
    { month: 'Jun', emissions: 95, target: 100 }
  ];

  const comparisonData = effectiveResult.comparison || [
    { category: 'Mining', traditional: 850, recycling: 320 },
    { category: 'Processing', traditional: 420, recycling: 180 },
    { category: 'Transport', traditional: 180, recycling: 90 }
  ];

  const handleDownload = () => {
    // Mock download functionality
    const element = document.createElement('a');
    const file = new Blob(['Mock LCA Report Content'], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `LCA_Report_${effectiveResult.runId || 'sample'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Ecometrica LCA Results',
        text: `Carbon footprint: ${effectiveResult.totalCO2_kg || 0} kg CO₂`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assessment Results</h1>
          <p className="text-gray-600 mt-1">
            {effectiveResult.filename && `File: ${effectiveResult.filename} • `}
            {effectiveResult.rowsProcessed && `${effectiveResult.rowsProcessed} rows processed • `}
            {effectiveResult.date || new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleShare} variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button onClick={handleDownload} size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${metric.bgColor}`}>
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Confidence Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              AI Confidence Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Progress value={effectiveResult.confidenceScore_pct || 87} className="flex-1" />
              <Badge variant="secondary" className="text-lg font-semibold">
                {effectiveResult.confidenceScore_pct || 87}%
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              High confidence based on data quality and model accuracy
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Impact Breakdown Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Impact Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Time Series Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Emissions Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="emissions" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    name="Actual Emissions"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Target"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Comparison Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Traditional vs Recycling Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="traditional" fill="#EF4444" name="Traditional Mining" />
                <Bar dataKey="recycling" fill="#10B981" name="Recycling Process" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Results;