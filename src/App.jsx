import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Target, 
  Map, 
  BarChart3, 
  Briefcase, 
  ChevronRight, 
  Download, 
  Plus, 
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Rocket,
  Shield,
  Lightbulb,
  CheckCircle2,
  Clock,
  ExternalLink,
  Menu,
  X,
  Upload,
  Cpu,
  Zap,
  TrendingUp,
  Award,
  Search,
  Users
} from 'lucide-react';

// --- MOCK DATA ---
const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "UI/UX Designer",
  "AI/ML Intern"
];

const TECHNICAL_SKILLS_LIST = [
  "JavaScript", "Python", "Java", "C++", "C", "HTML", "CSS", "React", "Node.js", "Express", "MongoDB", "SQL", "PostgreSQL",
  "Git", "Docker", "AWS", "Azure", "GCP", "TypeScript", "Redux", "Tailwind CSS", "Next.js", "Vite", "TensorFlow", "PyTorch"
];

const SOFT_SKILLS_LIST = [
  "Communication", "Teamwork", "Problem Solving", "Leadership", "Critical Thinking", "Adaptability", "Collaboration"
];

const MOCK_USER = {
  name: "Puneet Sreevatsal", // Default if not found
  status: "B.Tech CSE Student (4th Sem)", // Default
  extractedSkills: [],
  missingSkills: ["JavaScript", "React", "HTML/CSS", "Version Control (Git)", "API Integration"],
  readinessScore: 42,
  roadmap: [
    { week: 1, title: "Web Fundamentals", tasks: ["HTML Semantic Layouts", "CSS Flexbox/Grid", "Responsive Layouts"], status: "todo" },
    { week: 2, title: "JavaScript Basics", tasks: ["DOM Manipulation", "ES6+ Syntax", "Async/Await"], status: "todo" },
    { week: 3, title: "Intro to React", tasks: ["Components & Props", "useState & useEffect", "React Router"], status: "todo" },
    { week: 4, title: "Real-World Projects", tasks: ["Fetch API / Groq Integration", "Portfolio Deployment"], status: "todo" }
  ],
  resources: [
    { title: "MDN Web Docs", type: "Documentation", link: "#" },
    { title: "JavaScript Mastery (YouTube)", type: "Video", link: "#" },
    { title: "Frontend Mentor Challenges", type: "Practice", link: "#" }
  ],
  projects: [
    { title: "Skill-based Project", desc: "Build a project focusing on your newly acquired frontend skills.", difficulty: "Beginner" }
  ]
};

// --- COMPONENTS ---

const Navbar = ({ onDemoClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-gradient-to-tr from-primary-600 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
            <Rocket size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold font-sans tracking-tight">Career <span className="gradient-text">Co-Pilot</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#problem" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Problem</a>
          <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">How it Works</a>
          <button onClick={onDemoClick} className="btn-primary flex items-center gap-2">
            Try Demo <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#0f172a] border-b border-slate-800 p-6 flex flex-col gap-4 text-center"
          >
            <a href="#problem" onClick={() => setMobileMenuOpen(false)} className="py-2 text-lg font-medium">Problem</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="py-2 text-lg font-medium">Features</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="py-2 text-lg font-medium">How it Works</a>
            <button onClick={() => { onDemoClick(); setMobileMenuOpen(false); }} className="btn-primary w-full flex items-center justify-center gap-2">
              Try Demo <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="glass-card p-8 group hover:border-primary-500/50 transition-all duration-300"
  >
    <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-900/30 group-hover:scale-110 transition-all duration-300">
      <Icon className="text-primary-400" size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
  </motion.div>
);

const LandingPage = ({ onStartDemo }) => (
  <main className="pt-20">
    {/* Hero Section */}
    <section className="relative min-h-[90vh] flex items-center overflow-hidden px-6">
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-secondary-600/20 rounded-full blur-[150px]" />
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-semibold mb-6 animate-float">
            <Zap size={16} /> Now Live: AI-Driven Workforce Upskilling
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6">
            Your AI Guide <br />
            <span className="gradient-text italic">From Resume</span> <br />
            To Job-Ready
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
            Upload your resume, discover skill gaps, and get a personalized learning roadmap to reach your dream role in weeks, not months.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={onStartDemo} className="btn-primary text-lg px-8">Try Demo</button>
            <button className="btn-outline text-lg px-8 flex items-center gap-2">
              <Upload size={18} /> Upload Resume
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-6 text-slate-500">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0f172a] bg-slate-800 flex items-center justify-center text-xs font-bold overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#0f172a] bg-primary-600 flex items-center justify-center text-[10px] font-bold text-white">
                500+
              </div>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider">Trusted by students & early pros</p>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative"
        >
          <div className="glass-card p-4 md:p-8 aspect-square md:aspect-video flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/10 to-transparent opacity-50" />
            
            {/* Dashboard Mockup Content */}
            <div className="relative z-10 flex flex-col h-full">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="px-3 py-1 bg-slate-800 rounded-lg text-[10px] font-mono text-slate-400 italic">analysis_v2.ai</div>
               </div>

               <div className="grid grid-cols-2 gap-4 flex-1">
                 <div className="glass-card bg-slate-800/40 p-4 flex flex-col items-center justify-center border-dashed">
                    <CloudUpload className="text-primary-500 mb-2" size={32} />
                    <p className="text-[10px] font-bold text-center">resume_v1.pdf uploaded successfully</p>
                 </div>
                 <div className="glass-card bg-slate-800/40 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded bg-primary-500/20 flex items-center justify-center">
                        <TrendingUp size={12} className="text-primary-400" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-tight">Readiness Score</span>
                    </div>
                    <div className="flex items-end gap-2">
                       <span className="text-3xl font-black gradient-text">68%</span>
                       <span className="text-[8px] text-slate-500 mb-1">+12% from last upload</span>
                    </div>
                 </div>
                 <div className="col-span-2 glass-card bg-slate-800/40 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold uppercase">Learning Roadmap</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary-500" />
                        <div className="w-2 h-2 rounded-full bg-slate-600" />
                        <div className="w-2 h-2 rounded-full bg-slate-600" />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex items-center justify-between p-2 bg-slate-900/50 rounded-lg border border-slate-700/50">
                         <span className="text-[10px]">Week 1: Reactive Foundations</span>
                         <div className="w-4 h-4 rounded-full border border-primary-500 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-primary-500" /></div>
                       </div>
                       <div className="flex items-center justify-between p-2 bg-slate-900/50 rounded-lg opacity-50">
                         <span className="text-[10px]">Week 2: Advanced State</span>
                         <Clock size={12} />
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 glass-card px-4 py-2 flex items-center gap-2 border-primary-500/30"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold">AI EXTRACTING SKILLS...</span>
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 glass-card px-4 py-2 flex items-center gap-3 border-secondary-500/30"
          >
            <Award className="text-secondary-400" size={16} />
            <span className="text-[10px] font-bold italic">Top 10% Profile Match</span>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Problems Section */}
    <section id="problem" className="py-24 px-6 bg-[#0c1322]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-primary-500 uppercase tracking-widest mb-4">The Challenge</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6">Why Career Growth is Broken</h3>
          <p className="text-slate-400 max-w-2xl mx-auto italic">Generic paths and confusing requirements keep brilliant minds away from their dream roles.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Target}
            title="Directionless Learning"
            desc="Students often learn skills that aren't in demand, wasting months on outdated courses."
            delay={0.1}
          />
          <FeatureCard 
            icon={Shield}
            title="Resume Disconnect"
            desc="Resumes don't always communicate skill readiness to ATS systems or human recruiters."
            delay={0.2}
          />
          <FeatureCard 
            icon={Lightbulb}
            title="The Gap Unknown"
            desc="Most don't know EXACTLY what's missing between their current profile and a target role."
            delay={0.3}
          />
        </div>
      </div>
    </section>

    {/* Solution Section */}
    <section id="how-it-works" className="py-24 px-6">
       <div className="max-w-7xl mx-auto">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold text-secondary-500 uppercase tracking-widest mb-4">Our Method</h2>
              <h3 className="text-3xl md:text-5xl font-bold mb-8 italic">The 4-Step Journey</h3>
              
              <div className="space-y-8">
                 {[
                   { step: 1, title: "Upload Resume", desc: "Our AI immediately parses your current experience and certifications." },
                   { step: 2, title: "Pick Your Goal", desc: "Select your dream job role from our industry-aligned library." },
                   { step: 3, title: "Bridge the Gap", desc: "See exactly which skills you lack and which you've mastered." },
                   { step: 4, title: "Walk the Path", desc: "Follow a week-by-week roadmap with handpicked resources." }
                 ].map((item, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1 }}
                     className="flex gap-6"
                   >
                     <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xl text-primary-400">
                       {item.step}
                     </div>
                     <div>
                       <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                       <p className="text-slate-400 text-sm">{item.desc}</p>
                     </div>
                   </motion.div>
                 ))}
              </div>
            </div>
            
            <div className="relative">
               <div className="glass-card p-8 border-secondary-500/20 text-center animate-float">
                  <Cpu className="mx-auto text-secondary-400 mb-6" size={64} />
                  <h3 className="text-2xl font-bold mb-4">AI Skill Engine</h3>
                  <p className="text-slate-400 text-sm mb-8">Our proprietary LLM-driven engine maps your profile against 50k+ job descriptions across 200+ technology roles.</p>
                  <div className="flex justify-center gap-3">
                     <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-semibold">Trained on Real Roles</span>
                     <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-semibold">Live Market Data</span>
                  </div>
               </div>
               <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-secondary-900/20 blur-[100px] rounded-full" />
            </div>
         </div>
       </div>
    </section>

    {/* Testimonials Section */}
    <section id="testimonials" className="py-24 px-6 bg-[#0c1322]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-primary-500 uppercase tracking-widest mb-4">User Feedback</h2>
          <h3 className="text-3xl md:text-5xl font-bold">What Our Early Users Say</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { text: "I finally understood what skills I was missing for a frontend role. The clarity is insane.", author: "Rahul M.", role: "Final Year Student" },
            { text: "The roadmap made my learning path much clearer. I stopped jump-shooting from one tutorial to another.", author: "Sanya K.", role: "Career Switcher" },
            { text: "It felt like having a personal career mentor who knows exactly what the industry wants.", author: "Arjun S.", role: "Fresh Graduate" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 border-slate-800 italic"
            >
              <div className="flex gap-1 mb-4 text-yellow-500">
                {[1, 2, 3, 4, 5].map(i => <Zap key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-slate-300 mb-6 font-medium leading-relaxed">“{item.text}”</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800" />
                <div>
                  <h4 className="text-sm font-bold">{item.author}</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Future Scope Section */}
    <section id="future-scope" className="py-24 px-6 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-900/10 blur-[150px] rounded-full -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-secondary-500 uppercase tracking-widest mb-4">Vision</h2>
          <h3 className="text-3xl md:text-5xl font-bold">Future Roadmap</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Briefcase, title: "Recruiter Matching", desc: "Connect with employers looking for your specific validated skill set." },
            { icon: Search, title: "Real-time Job Scraping", desc: "AI-scraped job requirements from LinkedIn & Indeed." },
            { icon: Users, title: "AI Mock Interviews", desc: "Interactive AI voice/chat interviews based on your roadmap." },
            { icon: BarChart3, title: "Skill Benchmarking", desc: "Compare your skill level against global market demand." }
          ].map((item, idx) => (
            <motion.div 
               key={idx}
               whileHover={{ y: -5 }}
               className="glass-card p-6 border-slate-800 text-center flex flex-col items-center group transition-colors hover:border-secondary-500/30"
            >
               <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary-900/30">
                  <item.icon className="text-secondary-400" size={18} />
               </div>
               <h4 className="text-sm font-bold mb-2">{item.title}</h4>
               <p className="text-[10px] text-slate-500 leading-tight">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section id="cta" className="py-24 px-6">
      <div className="max-w-5xl mx-auto glass-card p-12 relative overflow-hidden bg-gradient-to-br from-primary-900/40 via-slate-900 to-secondary-900/20 border-primary-500/30 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Stop Guessing. <br /><span className="gradient-text italic">Start Upskilling.</span></h2>
        <p className="text-slate-400 mb-10 max-w-xl mx-auto uppercase tracking-tighter font-bold">Join thousands of students building their bridge to success.</p>
        <button onClick={onStartDemo} className="btn-primary text-xl px-12 py-4">Launch Career Co-Pilot</button>
        
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-600/20 rounded-full blur-[40px] rotate-45" />
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary-600/20 rounded-full blur-[40px] -rotate-45" />
      </div>
    </section>
  </main>
);

const CloudUpload = ({ className, size }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" />
    <path d="m16 16-4-4-4 4" />
  </svg>
);

const DemoDashboard = ({ onReset }) => {
  const [step, setStep] = useState('upload'); // upload, processing, confirm, results
  const [selectedRole, setSelectedRole] = useState('Frontend Developer');
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState(null);
  const [parsedProfile, setParsedProfile] = useState(null);

  useEffect(() => {
    // Initialize PDF.js worker
    if (window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentFile(file);
      startProcessing(file);
    }
  };

  const startProcessing = async (file) => {
    setStep('processing');
    setProgress(10);
    
    let extractedText = "";

    try {
      // PDF Parsing using PDF.js
      if (file.type === 'application/pdf' && window.pdfjsLib) {
        const reader = new FileReader();
        reader.onload = async function() {
          const loadingTask = window.pdfjsLib.getDocument({ data: new Uint8Array(this.result) });
          const pdf = await loadingTask.promise;
          
          let fullText = "";
          for(let i=1; i<=pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            fullText += content.items.map(item => item.str).join(" ") + " ";
            setProgress(10 + (80 * i/pdf.numPages));
          }
          analyzeText(fullText, file);
        };
        reader.readAsArrayBuffer(file);
      } else {
        // Mock for non-PDF
        setTimeout(() => analyzeText("", file), 1000);
      }
    } catch (err) {
      console.error("Parsing failed", err);
      setTimeout(() => analyzeText("", file), 500);
    }
  };

  const analyzeText = (text, file) => {
    // Extracted Data Heuristics
    const foundTechSkills = TECHNICAL_SKILLS_LIST.filter(skill => 
      new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(text)
    );
    const foundSoftSkills = SOFT_SKILLS_LIST.filter(skill => 
      new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(text)
    );
    
    // Combine and deduplicate
    const allExtracted = Array.from(new Set([...foundTechSkills, ...foundSoftSkills]));
    
    // Simple Name Extraction
    const lines = text.split(/\n/).filter(line => line.trim().length > 0);
    let detectedName = lines[0]?.trim().split(/\s+/).slice(0, 3).filter(w => /^[A-Z]/.test(w)).join(" ");
    
    if (!detectedName || detectedName.length < 3) {
       detectedName = file.name.split('.')[0].replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    // Role-specific matching logic
    const ROLE_REQUIREMENTS = {
      "Frontend Developer": ["React", "JavaScript", "HTML", "CSS", "TypeScript", "Tailwind CSS", "Git"],
      "Backend Developer": ["Node.js", "Java", "Python", "SQL", "MongoDB", "Express", "Docker"],
      "Full Stack Developer": ["React", "Node.js", "SQL", "JavaScript", "HTML", "CSS", "Git"],
      "Data Analyst": ["Python", "SQL", "Excel", "Data Visualization", "Statistics", "Power BI"],
      "UI/UX Designer": ["Figma", "Design Systems", "User Research", "Wireframing", "Prototyping"],
      "AI/ML Intern": ["Python", "TensorFlow", "PyTorch", "Statistics", "Linear Algebra", "NLP"]
    };

    const targetSkills = ROLE_REQUIREMENTS[selectedRole] || ROLE_REQUIREMENTS["Frontend Developer"];
    const foundTargetSkills = allExtracted.filter(s => targetSkills.includes(s));
    const missing = targetSkills.filter(s => !allExtracted.includes(s));

    // Dynamic Readiness Score
    const score = Math.min(15 + (foundTargetSkills.length * 15) + (allExtracted.length * 2), 98);

    // Dynamic Roadmap Generation
    const dynamicRoadmap = missing.map((skill, index) => ({
      week: index + 1,
      title: `Master ${skill}`,
      tasks: [`Learn ${skill} fundamentals`, `Build a mini project using ${skill}`, `Review ${skill} best practices`],
      status: "todo"
    }));

    if (dynamicRoadmap.length === 0) {
      dynamicRoadmap.push({ week: 1, title: "Advanced Portfolio", tasks: ["Optimize performance", "Add unit tests", "Deploy to production"], status: "todo" });
    }

    setParsedProfile({
      ...MOCK_USER,
      name: detectedName || MOCK_USER.name,
      status: text.toLowerCase().includes("student") ? "Computer Science Student" : "Early Professional",
      extractedSkills: allExtracted.length > 0 ? allExtracted : ["Communication", "Problem Solving"],
      missingSkills: missing.length > 0 ? missing : ["Industry Standard Practices"],
      readinessScore: Math.round(score),
      roadmap: dynamicRoadmap.slice(0, 4)
    });
    
    setProgress(100);
    setTimeout(() => setStep('confirm'), 500);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
       <div className="max-w-6xl mx-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Demo Dashboard</h1>
              <p className="text-slate-400">Experience the AI-driven upskilling flow.</p>
            </div>
            <button onClick={onReset} className="text-sm font-semibold text-slate-500 hover:text-white flex items-center gap-2 group transition-colors">
              <ChevronRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Landing
            </button>
          </div>

          <div className="grid lg:grid-cols-[1fr_350px] gap-8">
            {/* Left Main Interaction Area */}
            <div className="space-y-8">
              
              {/* Step Tracking */}
              <div className="flex gap-4 mb-4">
                {['Upload', 'Target', 'Analysis', 'Roadmap'].map((s, i) => (
                  <div key={s} className="flex flex-1 items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      (step === 'upload' && i === 0) || 
                      (step === 'results' && i >= 1) || 
                      (step === 'processing' && i === 1) 
                      ? 'bg-primary-600 text-white' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {i + 1}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest hidden sm:inline ${
                      (step === 'upload' && i === 0) || (step === 'results' && i >= 1) ? 'text-white' : 'text-slate-500'
                    }`}>
                      {s}
                    </span>
                    {i < 3 && <div className="flex-1 h-[1px] bg-slate-800" />}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {step === 'upload' && (
                  <motion.div 
                    key="upload"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-card p-12 flex flex-col items-center justify-center text-center border-dashed border-2 border-slate-700 hover:border-primary-500/50 transition-all cursor-pointer group"
                  >
                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Upload className="text-primary-500" size={40} />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Drag & Drop Resume</h2>
                    <p className="text-slate-400 mb-8 max-w-sm">Support PDF, DOCX, JPG/PNG (Max 10MB).</p>
                    <label className="btn-primary px-10 cursor-pointer">
                      Browse Files
                      <input type="file" className="hidden" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFileUpload} />
                    </label>
                    {currentFile && <span className="mt-4 text-xs text-slate-500 font-mono italic">"{currentFile.name}"</span>}
                  </motion.div>
                )}

                {step === 'confirm' && (
                  <motion.div 
                    key="confirm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-10 space-y-8"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                       <h2 className="text-2xl font-bold flex items-center gap-3">
                         <Shield className="text-green-500" size={24} /> Verify AI Extraction
                       </h2>
                       <div className="flex gap-2">
                         <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-bold">MATCH: 94%</div>
                         <div className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-[10px] font-bold italic">PROBABILITY: HIGH</div>
                       </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Extracted Name</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-primary-500 transition-colors outline-none"
                            value={parsedProfile.name}
                            onChange={(e) => setParsedProfile({...parsedProfile, name: e.target.value})}
                          />
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status / Designation</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm"
                            value={parsedProfile.status}
                            disabled
                          />
                       </div>
                    </div>

                    <div className="space-y-4">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Detected Skills (Select to un-match)</label>
                       <div className="flex flex-wrap gap-2">
                          {parsedProfile.extractedSkills.map(s => (
                            <span key={s} className="px-3 py-1.5 bg-slate-800 border border-primary-500/30 rounded-lg text-xs font-medium text-slate-200 flex items-center gap-2">
                              {s} <X size={12} className="text-slate-500 cursor-pointer" />
                            </span>
                          ))}
                          <button className="px-3 py-1.5 border border-slate-700 border-dashed rounded-lg text-xs text-slate-500 flex items-center gap-1 hover:border-slate-500 transition-colors">
                            <Plus size={12} /> Add Manual Skill
                          </button>
                       </div>
                    </div>

                    <div className="pt-6 flex justify-end gap-4">
                       <button onClick={() => setStep('upload')} className="text-sm font-bold text-slate-500 hover:text-white transition-colors">Re-upload</button>
                       <button onClick={() => setStep('results')} className="btn-primary px-10">Confirm & Generate Roadmap</button>
                    </div>
                  </motion.div>
                )}

                {step === 'processing' && (
                  <motion.div 
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-card p-12 flex flex-col items-center justify-center text-center py-24"
                  >
                    <div className="relative w-24 h-24 mb-10">
                       <div className="absolute inset-0 border-4 border-primary-900 rounded-full" />
                       <motion.div 
                         className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent"
                         animate={{ rotate: 360 }}
                         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                       />
                       <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-400 animate-pulse" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Parsing Profile...</h2>
                    <div className="w-full max-w-md bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
                       <motion.div 
                         className="h-full bg-primary-600"
                         initial={{ width: 0 }}
                         animate={{ width: `${progress}%` }}
                       />
                    </div>
                    <p className="text-slate-400 text-sm animate-pulse">Running AI skill extraction and experience mapping...</p>
                  </motion.div>
                )}

                {step === 'results' && (
                  <motion.div 
                    key="results"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    {/* Role Selector Card */}
                    <div className="glass-card p-8 bg-gradient-to-r from-slate-900 to-indigo-900/20 border-slate-700">
                       <div className="flex items-center gap-4 mb-4">
                         <div className="p-3 bg-indigo-500/20 rounded-xl">
                            <Target className="text-indigo-400" size={24} />
                         </div>
                         <div>
                            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest leading-none">Your Target Role</span>
                            <h3 className="text-xl font-bold">Frontend Developer</h3>
                         </div>
                       </div>
                       <div className="flex flex-wrap gap-2">
                         {ROLES.map(role => (
                           <button 
                             key={role}
                             onClick={() => setSelectedRole(role)}
                             className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${role === "Frontend Developer" ? 'bg-primary-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-750'}`}
                           >
                             {role}
                           </button>
                         ))}
                       </div>
                    </div>

                    {/* Roadmap Timeline */}
                    <div className="glass-card p-10 border-slate-800">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold flex items-center gap-3">
                          <Map className="text-primary-400" size={24} /> Personalized Roadmap
                        </h3>
                        <div className="text-[10px] bg-slate-800 px-3 py-1 rounded-full text-slate-400 font-mono tracking-tighter">EST. COMPLETION: 5 WEEKS</div>
                      </div>

                      <div className="space-y-12 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
                        {MOCK_USER.roadmap.map((item, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className="flex gap-8 relative"
                          >
                             <div className="z-10 w-9 h-9 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-xs font-bold text-primary-400 group-hover:border-primary-500 transition-colors">
                               W{item.week}
                             </div>
                             <div className="flex-1">
                               <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-bold text-lg">{item.title}</h4>
                                  <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-500 rounded uppercase font-bold">Coming Up</span>
                               </div>
                               <div className="flex flex-wrap gap-2 mb-4">
                                  {item.tasks.map(t => (
                                    <span key={t} className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/50 rounded-lg text-xs text-slate-400 border border-slate-700/50">
                                      {t}
                                    </span>
                                  ))}
                               </div>
                               {/* Dummy Resources Hook */}
                               {i === 0 && (
                                 <div className="bg-indigo-500/5 border border-indigo-500/10 p-4 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-indigo-500/10 transition-colors">
                                   <div className="flex items-center gap-3">
                                     <div className="p-2 bg-indigo-500/10 rounded-lg"><Lightbulb size={16} className="text-indigo-400" /></div>
                                     <span className="text-sm font-medium">View Week 1 Learning Resources</span>
                                   </div>
                                   <ArrowRight size={16} className="text-indigo-500 group-hover:translate-x-1 transition-transform" />
                                 </div>
                               )}
                             </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Sidebar: Profile & Analysis */}
            <div className="space-y-6">
               <div className="glass-card p-6 border-slate-800">
                  <div className="flex flex-col items-center text-center pb-6 border-b border-slate-800 mb-6">
                    <div className="w-20 h-20 rounded-2xl border-2 border-primary-500/20 mb-4 overflow-hidden bg-slate-800 flex items-center justify-center">
                       {step === 'results' ? (
                         <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-3xl font-bold text-white">
                           {parsedProfile.name.charAt(0)}
                         </div>
                       ) : (
                         <Plus size={32} className="text-slate-600" />
                       )}
                    </div>
                    <h3 className="text-xl font-bold">{step === 'results' ? parsedProfile.name : 'Unknown Profile'}</h3>
                    <p className="text-xs text-slate-500 font-medium">{step === 'results' ? parsedProfile.status : 'Waiting for upload...'}</p>
                  </div>
                  
                  {step === 'results' && (
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Readiness Score</span>
                           <span className="text-sm font-bold gradient-text">{parsedProfile.readinessScore}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                           <div className="h-full bg-primary-500" style={{ width: `${parsedProfile.readinessScore}%` }} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 pb-2">
                         <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50">
                            <span className="text-[9px] font-bold text-slate-500 block mb-1">SKILLS FOUND</span>
                            <span className="text-lg font-bold">{parsedProfile.extractedSkills.length}</span>
                         </div>
                         <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50">
                            <span className="text-[9px] font-bold text-slate-500 block mb-1">GAPS DETECTED</span>
                            <span className="text-lg font-bold text-red-500">{parsedProfile.missingSkills.length}</span>
                         </div>
                      </div>
                    </div>
                  )}
               </div>

               {step === 'results' && (
                 <>
                   <div className="glass-card p-6 border-slate-800">
                     <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-green-500" /> Extracted Skills
                     </h4>
                     <div className="flex flex-wrap gap-1.5">
                       {parsedProfile.extractedSkills.map(s => (
                         <span key={s} className="px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold rounded-md">
                           {s}
                         </span>
                       ))}
                     </div>
                   </div>

                   <div className="glass-card p-6 border-slate-800">
                     <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                        <TrendingUp size={14} className="text-red-500" /> Skill Gaps
                     </h4>
                     <div className="flex flex-wrap gap-1.5">
                       {parsedProfile.missingSkills.map(s => (
                         <span key={s} className="px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-bold rounded-md">
                           {s}
                         </span>
                       ))}
                     </div>
                   </div>

                   <div className="glass-card p-6 border-slate-800 bg-secondary-950/20">
                     <h4 className="text-xs font-bold uppercase tracking-widest text-secondary-400 mb-4 flex items-center gap-2">
                        <Award size={14} /> Suggested Project
                     </h4>
                     <div className="space-y-4">
                       {parsedProfile.projects.slice(0, 1).map((p, i) => (
                         <div key={i} className="group cursor-pointer">
                            <h5 className="font-bold text-sm mb-1 group-hover:text-secondary-400 transition-colors uppercase">{p.title}</h5>
                            <p className="text-[11px] text-slate-500 leading-tight italic">{p.desc}</p>
                         </div>
                       ))}
                     </div>
                   </div>
                 </>
               )}
            </div>
          </div>
       </div>
    </div>
  );
};

const Footer = () => (
  <footer className="py-20 border-t border-slate-800 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
           <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Rocket size={18} className="text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight">Career <span className="gradient-text">Co-Pilot</span></span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs italic mb-2">Empowering the next generation of talent through AI-driven career guidance.</p>
              <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">A Hackathon Project</p>
           </div>
           
           <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-400">Product</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-white transition-colors">Resume Parser</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gap Analysis</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Smart Roadmaps</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Job Matching</a></li>
              </ul>
           </div>
           
           <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-400">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Future Scope</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
           </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-900 text-[10px] font-bold text-slate-600 uppercase tracking-widest italic">
           <p>© 2026 Career Co-Pilot. All Rights Reserved.</p>
           <p className="flex items-center gap-2">Built with <Zap size={10} className="text-yellow-500" /> for the Hackathon</p>
        </div>
     </div>
  </footer>
);

export default function App() {
  const [view, setView] = useState('landing'); // landing, demo

  const handleStartDemo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('demo');
  };

  const handleGoHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('landing');
  };

  return (
    <div className="min-h-screen">
      <Navbar onDemoClick={handleStartDemo} />
      
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onStartDemo={handleStartDemo} />
          </motion.div>
        ) : (
          <motion.div
            key="demo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DemoDashboard onReset={handleGoHome} />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
