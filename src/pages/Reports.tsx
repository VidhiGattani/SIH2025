import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  Award,
  BarChart3,
  Shield,
  Lightbulb
} from 'lucide-react';
import { toast } from 'sonner';

const Reports = () => {
  const [generatingReport, setGeneratingReport] = useState(false);

  const handleGenerateReport = async () => {
    setGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      setGeneratingReport(false);
      toast.success('Report generated successfully!');
    }, 2000);
  };

  const handleDownloadReport = () => {
    toast.success('Report download started');
    // In a real app, this would trigger an actual download
  };

  const reportSections = [
    {
      title: 'Executive Summary',
      description: 'Key findings and recommendations overview',
      icon: Award,
      status: 'Ready'
    },
    {
      title: 'Environmental Impact Analysis',
      description: 'Detailed carbon footprint and resource usage metrics',
      icon: BarChart3,
      status: 'Ready'
    },
    {
      title: 'Compliance Assessment',
      description: 'Regulatory standards and certification compliance',
      icon: Shield,
      status: 'Ready'
    },
    {
      title: 'Optimization Recommendations',
      description: 'AI-driven suggestions for process improvements',
      icon: Lightbulb,
      status: 'Ready'
    }
  ];

  const previousReports = [
    {
      title: 'Copper Recycling LCA Report',
      date: '2024-01-15',
      type: 'Detailed Assessment',
      status: 'Completed'
    },
    {
      title: 'Aluminium Processing Report',
      date: '2024-01-12',
      type: 'Quick Assessment',
      status: 'Completed'
    },
    {
      title: 'Steel Production Analysis',
      date: '2024-01-10',
      type: 'Detailed Assessment',
      status: 'Completed'
    }
  ];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            LCA Reports
          </h1>
          <p className="text-gray-600">
            Generate comprehensive reports and export your assessment findings
          </p>
        </motion.div>

        {/* Report Generation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-700">
                <FileText className="mr-2 h-6 w-6" />
                Generate New Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Copper Recycling Assessment Report
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Comprehensive LCA report including environmental impact analysis, 
                    compliance assessment, and optimization recommendations.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">ISO 14040/14044 Compliant</Badge>
                    <Badge variant="outline">GHG Protocol</Badge>
                    <Badge variant="outline">EU Taxonomy</Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleGenerateReport}
                    disabled={generatingReport}
                    className="bg-emerald-600 hover:bg-emerald-700 min-w-[140px]"
                  >
                    {generatingReport ? 'Generating...' : 'Generate Report'}
                  </Button>
                  <Button
                    onClick={handleDownloadReport}
                    variant="outline"
                    className="min-w-[140px]"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Report Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Report Sections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {reportSections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <section.icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900">{section.title}</h4>
                        <Badge 
                          variant="outline" 
                          className="bg-green-100 text-green-800 border-green-200"
                        >
                          {section.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{section.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Sources & AI Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Data Sources & AI Methodology</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Data Sources</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      International Energy Agency (IEA) Database
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      IPCC Emission Factor Database
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      ecoinvent v3.9 LCI Database
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                      USGS Mineral Commodity Summaries
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      World Steel Association Data
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                      Plant-specific operational data
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">AI Methodology</h4>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-600 mb-3">
                    Our AI-powered LCA engine utilizes machine learning algorithms trained on 
                    extensive metallurgical process data to provide accurate environmental impact assessments.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-800 mb-2">Key Algorithms:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Neural network models for emission factor estimation</li>
                      <li>• Monte Carlo simulation for uncertainty quantification</li>
                      <li>• Multi-criteria decision analysis for optimization</li>
                      <li>• Time-series analysis for trend prediction</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Previous Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Previous Reports
                <Badge variant="secondary">{previousReports.length} reports</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {previousReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{report.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {report.date}
                          </span>
                          <span>{report.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline"
                        className="bg-green-100 text-green-800 border-green-200"
                      >
                        {report.status}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;