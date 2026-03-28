'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Mail, Link as LinkIcon, Image, Video, ArrowRight, Zap, Globe, Brain } from 'lucide-react';

const features = [
  {
    href: '/email',
    icon: Mail,
    title: 'Email Scam Detector',
    description: 'Analyze emails for phishing attempts and fraudulent content',
    gradient: 'from-blue-500 to-blue-600',
    stats: 'Real-time AI analysis'
  },
  {
    href: '/link',
    icon: LinkIcon,
    title: 'Link Safety Analyzer',
    description: 'Verify URL authenticity and detect malicious links',
    gradient: 'from-purple-500 to-purple-600',
    stats: 'Phishing detection'
  },
  {
    href: '/image',
    icon: Image,
    title: 'Image Authenticity',
    description: 'Detect manipulated images and potential deepfakes',
    gradient: 'from-green-500 to-green-600',
    stats: 'Manipulation detection'
  },
  {
    href: '/video',
    icon: Video,
    title: 'Video Deepfake Analyzer',
    description: 'Identify synthetic or manipulated video content',
    gradient: 'from-red-500 to-red-600',
    stats: 'Deepfake detection'
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100/50 dark:from-dark-200 dark:via-dark-200 dark:to-dark-100" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">
              <Zap size={16} />
              Powered by MiniMax-2.7 API
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
              <span className="text-gradient">Proofly AI</span>
              <br />
              <span className="text-gray-900 dark:text-white">Trust Intelligence Engine</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Advanced AI-powered content verification platform that analyzes emails, links, images, and videos to protect you from misinformation, scams, and digital manipulation.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href="/email"
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 btn-press flex items-center gap-2"
              >
                Start Analyzing
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 rounded-xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-semibold hover:shadow-lg transition-all hover:-translate-y-1 btn-press"
              >
                Explore Features
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-20 grid md:grid-cols-3 gap-8"
          >
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-gradient mb-2">99.2%</div>
              <p className="text-gray-600 dark:text-gray-400">Detection Accuracy</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-gradient mb-2">&lt;2s</div>
              <p className="text-gray-600 dark:text-gray-400">Average Response Time</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-gradient mb-2">24/7</div>
              <p className="text-gray-600 dark:text-gray-400">Real-time Protection</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white dark:bg-dark-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Advanced AI Analysis Tools</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive suite of verification tools powered by cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={feature.href}
                  className="group block p-8 rounded-2xl bg-gray-50 dark:bg-dark-200 border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 card-hover"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                    <feature.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400">
                    <Shield size={16} />
                    {feature.stats}
                    <ArrowRight size={16} className="ml-auto group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-dark-200 dark:to-dark-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                How It Works
              </h2>
              <div className="space-y-6">
                {[
                  { icon: Brain, title: 'AI-Powered Analysis', desc: 'Advanced MiniMax-2.7 AI processes content for authenticity signals' },
                  { icon: Globe, title: 'Internet Research', desc: 'Simulated web research identifies similar cases and credibility indicators' },
                  { icon: Shield, title: 'Trust Score Generation', desc: 'Comprehensive scoring system delivers clear, actionable results' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                      <step.icon className="text-primary-600 dark:text-primary-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200/20 to-primary-300/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white dark:bg-dark-100 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-800">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-200 rounded-xl">
                    <span className="text-sm font-medium">Trust Score</span>
                    <span className="text-2xl font-bold text-safe">85/100</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>AI Analysis</span>
                      <span className="text-safe">Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-safe h-2 rounded-full w-[85%]" />
                    </div>
                  </div>
                  <div className="p-4 bg-safe/10 rounded-xl border border-safe/20">
                    <p className="text-sm font-medium text-safe">Low Risk - Content appears authentic</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
