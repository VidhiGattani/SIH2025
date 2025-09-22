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

const Results = () => {
  const keyMetrics = [
    {
      title: 'Carbon Footprint',
      value: '1,850 kg CO₂',
      change: '-18% vs baseline',
      icon: TrendingDown,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      title: 'Energy Consumption',
      value: '12,500 MJ',
      change: '-12% optimized',
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Water Usage',
      value: '4,200 L',
      change: '-22% reduction',
      icon: Droplets,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Recycling Efficiency',
      value: '88%',
      change: '+5% improved',
      icon: Recycle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  // Mock data for charts
  const impactBreakdown = [
    { name: 'Energy Production', value: 35, color: '#EF4444' },
    { name: 'Raw Material', value: 25, color: '#F97316' },
    { name: 'Transportation', value: 20, color: '#EAB308' },
    { name: 'Processing', value: 15, color: '#22C55E' },
    { name: 'Waste Treatment', value: 5, color: '#3B82F6' }
  ];

  const timeSeriesData = [
    { month: 'Jan', emissions: 2200, target: 2000 },
    { month: 'Feb', emissions: 2100, target: 2000 },
    { month: 'Mar', emissions: 1950, target: 2000 },
    { month: 'Apr', emissions: 1900, target: 2000 },
    { month: 'May', emissions: 1850, target: 2000 },
    { month: 'Jun', emissions: 1800, target: 2000 }
  ];

  const comparisonData = [
    { category: 'Mining', traditional: 2400, recycling: 1200 },
    { category: 'Processing', traditional: 1800, recycling: 900 },
    { category: 'Transport', traditional: 600, recycling: 300 },
    { category: 'Disposal', traditional: 400, recycling: 100 }
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Assessment Results
            </h1>
            <p className="text-gray-600">
              Copper Recycling Process - Plant A Analysis
            </p>
            <Badge variant="outline" className="mt-2">
              Completed on Jan 15, 2024
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={p-3 rounded-full ${metric.bgColor}}>
                      <metric.icon className={h-6 w-6 ${metric.color}} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {metric.change}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">
                    {metric.title}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Confidence Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-emerald-600" />
                AI Confidence Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-emerald-600">94%</span>
                <Badge className="bg-emerald-100 text-emerald-800">High Confidence</Badge>
              </div>
              <Progress value={94} className="h-3 mb-2" />
              <p className="text-sm text-gray-600">
                Assessment based on comprehensive data analysis with industry-standard models
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Impact Breakdown Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={impactBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({name, value}) => ${name}: ${value}%}
                    >
                      {impactBreakdown.map((entry, index) => (
                        <Cell key={cell-${index}} fill={entry.color} />
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
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Emissions Trend (6 Months)</CardTitle>
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
                      stroke="#22C55E" 
                      strokeDasharray="5 5"
                      name="Target"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Mining vs Recycling Impact Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="traditional" fill="#EF4444" name="Traditional Mining" />
                  <Bar dataKey="recycling" fill="#22C55E" name="Recycling Process" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded">
                  <h4 className="font-semibold text-emerald-800 mb-1">
                    High Priority: Energy Optimization
                  </h4>
                  <p className="text-sm text-emerald-700">
                    Implement renewable energy sources to reduce carbon footprint by an additional 15-20%
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <h4 className="font-semibold text-blue-800 mb-1">
                    Medium Priority: Water Recycling
                  </h4>
                  <p className="text-sm text-blue-700">
                    Install closed-loop water systems to achieve 95% water recycling efficiency
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <h4 className="font-semibold text-yellow-800 mb-1">
                    Low Priority: Transport Optimization
                  </h4>
                  <p className="text-sm text-yellow-700">
                    Optimize logistics routes to reduce transportation emissions by 8-10%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;