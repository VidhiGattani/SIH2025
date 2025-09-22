import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Award, 
  Code, 
  Brain, 
  Palette, 
  Database,
  Github,
  Linkedin,
  Mail,
  Trophy,
  Target,
  Lightbulb
} from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Full Stack Developer',
      icon: Code,
      skills: ['React', 'Node.js', 'Python', 'AI Integration'],
      description: 'Specializes in building scalable web applications and AI model integration'
    },
    {
      name: 'Priya Sharma',
      role: 'Data Scientist',
      icon: Brain,
      skills: ['Machine Learning', 'Environmental Modeling', 'Data Analysis'],
      description: 'Expert in environmental data analysis and predictive modeling'
    },
    {
      name: 'Marcus Johnson',
      role: 'UI/UX Designer',
      icon: Palette,
      skills: ['Design Systems', 'User Research', 'Prototyping'],
      description: 'Creates intuitive interfaces focused on user experience'
    },
    {
      name: 'Sarah Kim',
      role: 'Backend Engineer',
      icon: Database,
      skills: ['System Architecture', 'Database Design', 'API Development'],
      description: 'Builds robust backend systems and database architectures'
    }
  ];

  const hackathonInfo = {
    name: 'Smart India Hackathon 2025',
    theme: 'Sustainable Technology Solutions',
    duration: '36 hours',
    participants: '10,000+ teams nationwide'
  };

  const projectHighlights = [
    {
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms for accurate LCA calculations',
      icon: Brain
    },
    {
      title: 'Industry Focus',
      description: 'Specialized for metallurgy and mining operations',
      icon: Target
    },
    {
      title: 'User-Centric Design',
      description: 'Intuitive interface designed for industry professionals',
      icon: Users
    },
    {
      title: 'Innovation',
      description: 'Cutting-edge approach to environmental impact assessment',
      icon: Lightbulb
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
          className="text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full">
              <Users className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Team <span className="text-emerald-600">Ctrl Crew</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Passionate innovators building sustainable technology solutions
          </p>
          <div className="flex items-center justify-center space-x-6">
            <Badge className="bg-emerald-100 text-emerald-800 px-3 py-1">
              <Trophy className="mr-1 h-4 w-4" />
              SIH 2025 Participants
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
              <Award className="mr-1 h-4 w-4" />
              Sustainable Tech Track
            </Badge>
          </div>
        </motion.div>

        {/* Hackathon Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Trophy className="mr-2 h-6 w-6" />
                Smart India Hackathon 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{hackathonInfo.duration}</div>
                  <div className="text-sm text-gray-600">Development Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{hackathonInfo.participants}</div>
                  <div className="text-sm text-gray-600">Competing Teams</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">Top 10%</div>
                  <div className="text-sm text-gray-600">Target Placement</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">₹1L+</div>
                  <div className="text-sm text-gray-600">Prize Pool</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white/50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Challenge Theme:</h4>
                <p className="text-gray-700">{hackathonInfo.theme}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team Members */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full">
                        <member.icon className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-700">{member.description}</p>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="ghost" className="p-2">
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="p-2">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="p-2">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Project Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Project Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {projectHighlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50"
                  >
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <highlight.icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{highlight.title}</h4>
                      <p className="text-sm text-gray-600">{highlight.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                To revolutionize environmental impact assessment in the metallurgy industry through 
                innovative AI technology, making sustainable operations accessible, accurate, and actionable 
                for businesses worldwide.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Github className="mr-2 h-4 w-4" />
                  View Source Code
                </Button>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;