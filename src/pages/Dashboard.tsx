import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  BarChart3, 
  TrendingDown, 
  Leaf, 
  Factory, 
  Droplets,
  Zap,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Active Assessments',
      value: '12',
      change: '+2 this week',
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: 'Carbon Reduction',
      value: '24%',
      change: 'vs last quarter',
      icon: TrendingDown,
      color: 'text-emerald-600'
    },
    {
      title: 'Processes Analyzed',
      value: '48',
      change: '+8 this month',
      icon: Factory,
      color: 'text-purple-600'
    },
    {
      title: 'Water Saved',
      value: '1.2M L',
      change: 'this year',
      icon: Droplets,
      color: 'text-cyan-600'
    }
  ];

  const recentAssessments = [
    { name: 'Copper Recycling - Plant A', date: '2024-01-15', status: 'Completed', impact: '18% reduction' },
    { name: 'Aluminium Cans Processing', date: '2024-01-14', status: 'In Progress', impact: 'Analyzing...' },
    { name: 'Steel Production - Unit 3', date: '2024-01-12', status: 'Completed', impact: '22% reduction' },
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Ecometrica
          </h1>
          <p className="text-gray-600 mb-6">
            Monitor your environmental impact and drive sustainable operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/app/new-assessment">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="mr-2 h-4 w-4" />
                New Assessment
              </Button>
            </Link>
            <Link to="/app/results">
              <Button variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Results
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Assessments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Assessments
                <Link to="/app/results">
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAssessments.map((assessment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{assessment.name}</h4>
                      <p className="text-sm text-gray-500">{assessment.date}</p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        assessment.status === 'Completed' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {assessment.status}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{assessment.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
            <CardContent className="p-6">
              <Leaf className="h-8 w-8 text-emerald-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Environmental Impact</h3>
              <p className="text-sm text-gray-600 mb-4">
                Track your carbon footprint and sustainability metrics
              </p>
              <Link to="/app/results">
                <Button size="sm" variant="outline">
                  View Impact
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <Zap className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Energy Efficiency</h3>
              <p className="text-sm text-gray-600 mb-4">
                Optimize energy consumption across your operations
              </p>
              <Link to="/app/new-assessment">
                <Button size="sm" variant="outline">
                  Start Analysis
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <Factory className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Process Optimization</h3>
              <p className="text-sm text-gray-600 mb-4">
                Identify improvement opportunities in your workflow
              </p>
              <Link to="/app/reports">
                <Button size="sm" variant="outline">
                  Generate Report
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;