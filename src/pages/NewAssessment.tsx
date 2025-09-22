import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Zap, Droplets, Factory, Recycle, Play } from 'lucide-react';
import { toast } from 'sonner';

const NewAssessment = () => {
  const [selectedProcess, setSelectedProcess] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const [parameters, setParameters] = useState({
    energyConsumption: '',
    waterUsage: '',
    emissions: '',
    recyclingRate: ''
  });

  const processes = [
    { value: 'copper-recycling', label: 'Copper Recycling', icon: Recycle },
    { value: 'aluminium-cans', label: 'Aluminium Cans Processing', icon: Factory },
    { value: 'steel-production', label: 'Steel Production', icon: Zap },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };

  const handleParameterChange = (field: string, value: string) => {
    setParameters(prev => ({ ...prev, [field]: value }));
  };

  const runAssessment = async () => {
    if (!selectedProcess) {
      toast.error('Please select a process type');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    // Simulate AI processing with progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            toast.success('Assessment completed successfully!');
            navigate('/app/results');
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  if (isProcessing) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Card className="p-8">
              <div className="mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4"
                >
                  <Zap className="h-8 w-8 text-emerald-600" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Running AI Assessment
                </h2>
                <p className="text-gray-600">
                  Analyzing your {selectedProcess.replace('-', ' ')} process...
                </p>
              </div>
              <div className="space-y-4">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-gray-500">
                  {progress < 30 && 'Initializing analysis...'}
                  {progress >= 30 && progress < 60 && 'Processing data inputs...'}
                  {progress >= 60 && progress < 90 && 'Calculating environmental impact...'}
                  {progress >= 90 && 'Finalizing results...'}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            New LCA Assessment
          </h1>
          <p className="text-gray-600">
            Create a comprehensive Life Cycle Assessment for your metallurgy process
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Process Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Factory className="mr-2 h-5 w-5 text-emerald-600" />
                  Process Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="process">Select Process Type</Label>
                  <Select value={selectedProcess} onValueChange={setSelectedProcess}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a metallurgy process" />
                    </SelectTrigger>
                    <SelectContent>
                      {processes.map((process) => (
                        <SelectItem key={process.value} value={process.value}>
                          <div className="flex items-center">
                            <process.icon className="mr-2 h-4 w-4" />
                            {process.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* File Upload */}
                <div>
                  <Label htmlFor="file-upload">Upload Process Data</Label>
                  <div className="mt-2">
                    <label 
                      htmlFor="file-upload" 
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          {uploadedFile ? uploadedFile.name : 'Click to upload PDF or CSV'}
                        </p>
                      </div>
                      <input 
                        id="file-upload" 
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.csv,.xlsx"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Parameters Input */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-blue-600" />
                  Process Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="energy">Energy Consumption (MJ/ton)</Label>
                  <div className="relative">
                    <Zap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="energy"
                      type="number"
                      placeholder="e.g., 15000"
                      className="pl-10"
                      value={parameters.energyConsumption}
                      onChange={(e) => handleParameterChange('energyConsumption', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="water">Water Usage (L/ton)</Label>
                  <div className="relative">
                    <Droplets className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="water"
                      type="number"
                      placeholder="e.g., 5000"
                      className="pl-10"
                      value={parameters.waterUsage}
                      onChange={(e) => handleParameterChange('waterUsage', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="emissions">CO₂ Emissions (kg/ton)</Label>
                  <div className="relative">
                    <Factory className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="emissions"
                      type="number"
                      placeholder="e.g., 2000"
                      className="pl-10"
                      value={parameters.emissions}
                      onChange={(e) => handleParameterChange('emissions', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="recycling">Recycling Rate (%)</Label>
                  <div className="relative">
                    <Recycle className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="recycling"
                      type="number"
                      placeholder="e.g., 85"
                      className="pl-10"
                      value={parameters.recyclingRate}
                      onChange={(e) => handleParameterChange('recyclingRate', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Button
            onClick={runAssessment}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 px-8 py-4 text-lg"
            disabled={!selectedProcess}
          >
            <Play className="mr-2 h-5 w-5" />
            Run AI Assessment
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NewAssessment;