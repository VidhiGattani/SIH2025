import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Leaf, 
  BarChart3, 
  Shield, 
  Zap, 
  ArrowRight,
  Factory,
  Recycle,
  TrendingDown
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'AI-Powered Analysis',
      description: 'Advanced algorithms analyze your metallurgy processes for accurate LCA results'
    },
    {
      icon: Factory,
      title: 'Industry-Specific',
      description: 'Tailored for metallurgy and mining operations with specialized metrics'
    },
    {
      icon: TrendingDown,
      title: 'Reduce Impact',
      description: 'Identify optimization opportunities to minimize environmental footprint'
    },
    {
      icon: Shield,
      title: 'Compliance Ready',
      description: 'Generate reports that meet industry standards and regulatory requirements'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-900">Ecometrica</span>
          </div>
          <Link to="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI-driven LCA for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
              sustainable metallurgy
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Transform your mining and metallurgy operations with intelligent Life Cycle Assessment. 
            Reduce environmental impact, ensure compliance, and drive sustainable innovation.
          </p>
          <Link to="/app">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg rounded-full">
              Start Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Intelligent Assessment for Sustainable Operations
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Leverage AI to optimize your environmental impact across the entire lifecycle
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
                <feature.icon className="h-12 w-12 text-emerald-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white/50 backdrop-blur-sm border-t border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl font-bold text-emerald-600 mb-2">85%</div>
              <div className="text-gray-600">Reduction in Assessment Time</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Metallurgy Processes Supported</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="text-4xl font-bold text-emerald-600 mb-2">99%</div>
              <div className="text-gray-600">Accuracy in Impact Calculations</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-6 w-6 text-emerald-500" />
            <span className="text-lg font-bold">Ecometrica</span>
          </div>
          <p className="text-gray-400 mb-2">
            Built by Team Ctrl Crew for Smart India Hackathon 2025
          </p>
          <p className="text-gray-500 text-sm">
            Sustainable technology for a better tomorrow
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;