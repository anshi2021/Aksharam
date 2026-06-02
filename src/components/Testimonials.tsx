import { useState, useEffect, useRef, MouseEvent } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, MessageSquare, Check, Sparkles, UserCheck, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TestimonialVideo {
  id: string;
  clientName: string;
  role: string;
  company: string;
  durationString: string;
  durationSeconds: number;
  thumbnailUrl: string;
  accentQuote: string;
  transcript: { time: number; text: string }[];
  isAudio?: boolean;
}

const TESTIMONIALS: TestimonialVideo[] = [
  {
    id: 'digital-life-sciences',
    clientName: 'Dr. Sarah Jenkins',
    role: 'Chief Digital Officer',
    company: 'Digital Life Sciences (California, USA)',
    durationString: '01:10',
    durationSeconds: 70,
    thumbnailUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop',
    accentQuote: 'Aksharam completely transformed our complex bio-tech product suites into high-performing digital layouts that instantly command absolute researcher authority.',
    isAudio: true,
    transcript: [
      { time: 0, text: "Hi, I'm Dr. Sarah Jenkins, CDO at Digital Life Sciences in California." },
      { time: 5, text: "For our new clinical research launch, we required a medical-grade website with flawless responsive UX." },
      { time: 15, text: "Aksharam Solutions engineered an incredible web setup with strict compliance and elegant speed." },
      { time: 26, text: "Our digital assets now offer flawless visualization and high-performance layouts." },
      { time: 38, text: "The response from our global researcher base has been absolutely phenomenal." },
      { time: 49, text: "Their deep strategic vision and technical execution exceeded all of our clinical-level expectations." },
      { time: 61, text: "They are the ultimate elite engineering team for custom high-end enterprise web design." }
    ]
  },
  {
    id: 'elena-rostova',
    clientName: 'Elena Rostova',
    role: 'Director of Marketing',
    company: 'Securica Digital',
    durationString: '01:02',
    durationSeconds: 62,
    thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    accentQuote: 'Professional, speed-focused, and completely analytical. Our leads surged by 160%.',
    transcript: [
      { time: 0, text: "Hi, Elena here from Securica Digital." },
      { time: 4, text: "We were looking for an agency that understands technical performance and marketing integration." },
      { time: 12, text: "Aksharam Solutions delivered exactly what we needed with our security portals." },
      { time: 22, text: "They designed a high-converting digital strategy that drove high-intent leads to our pipeline." },
      { time: 34, text: "The results speak for themselves: our digital traffic increased by 160%." },
      { time: 45, text: "Their execution speed, focus on results, and support have been flawless." },
      { time: 54, text: "I can't imagine scaling without their technical expertise in our corner." }
    ]
  },
  {
    id: 'marcus-sterling',
    clientName: 'Marcus Sterling',
    role: 'CMO',
    company: 'Zenith Retail Brands',
    durationString: '01:28',
    durationSeconds: 88,
    thumbnailUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    accentQuote: 'The continuous moving grid of services they established led directly to our 5x ad spend return.',
    transcript: [
      { time: 0, text: "What's up everyone, Marcus Sterling here from Zenith." },
      { time: 5, text: "If you're hesitating about booking a call with Aksharam Solutions, don't." },
      { time: 14, text: "Their consulting and analytics are completely next level." },
      { time: 22, text: "They helped us formulate custom retail strategy dashboards that gave our teams absolute clarity." },
      { time: 33, text: "We got a five-times return on our advertising spend in the very first quarter." },
      { time: 44, text: "It's rare to find partners who are as dedicated to custom engineering as they are marketing." },
      { time: 56, text: "Aksharam is agile, precision-guided, and insanely good at execution." },
      { time: 68, text: "Book that consultation. It will be the single best decision you make for your business scaling this year." }
    ]
  }
];

export default function Testimonials() {
  const [activeVideo, setActiveVideo] = useState<TestimonialVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(75);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  
  const timerRef = useRef<number | null>(null);

  // Clear timers and speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Text-To-Speech for audio reviews
  useEffect(() => {
    if (isPlaying && activeVideo?.isAudio && currentSubtitle && !isMuted) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(currentSubtitle);
        // Human speech is slightly more comfortable & measured (0.93 rate) rather than fast AI tempos (1.05+).
        // Standard conversational tone is optimal around 0.92 - 0.95 with slightly elevated warm pitch (1.02)
        utter.rate = 0.92;
        utter.pitch = 1.02;
        
        const voices = window.speechSynthesis.getVoices();
        // Priority list of premium natural voice engines:
        // 1. Google Web Neural Female
        // 2. Apple's hand-tuned 'Samantha'
        // 3. Microsoft Aura/Aria Natural
        // 4. Default native OS high quality EN females
        const preferredVoice = 
          voices.find(v => v.name.includes('Google US English')) ||
          voices.find(v => v.name.includes('Samantha')) ||
          voices.find(v => v.name.includes('Aria')) ||
          voices.find(v => v.name.includes('Zira')) ||
          voices.find(v => v.name.toLowerCase().includes('natural') && v.lang.startsWith('en')) ||
          voices.find(v => v.name.toLowerCase().includes('female') && v.lang.startsWith('en')) ||
          voices.find(v => v.name.toLowerCase().includes('premium') && v.lang.startsWith('en')) ||
          voices.find(v => v.lang === 'en-US') ||
          voices.find(v => v.lang.startsWith('en'));

        if (preferredVoice) {
          utter.voice = preferredVoice;
        }
        window.speechSynthesis.speak(utter);
      }
    } else {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [currentSubtitle, isPlaying, isMuted, activeVideo]);

  // Control simulation timer ticks
  useEffect(() => {
    if (isPlaying && activeVideo) {
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= activeVideo.durationSeconds) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0; // reset
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeVideo]);

  // Update subtitles based on current simulated time
  useEffect(() => {
    if (!activeVideo) {
      setCurrentSubtitle('');
      return;
    }
    // Find current caption
    const textSegment = [...activeVideo.transcript]
      .reverse()
      .find((t) => currentTime >= t.time);
    
    setCurrentSubtitle(textSegment ? textSegment.text : '');
  }, [currentTime, activeVideo]);

  const handleOpenVideo = (video: TestimonialVideo) => {
    setActiveVideo(video);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
    setActiveVideo(null);
    setCurrentTime(0);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressBarClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!activeVideo) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const widthPercentage = clickX / rect.width;
    const newSeconds = Math.round(widthPercentage * activeVideo.durationSeconds);
    setCurrentTime(newSeconds);
  };

  return (
    <section id="testimonial-section" className="py-20 md:py-28 relative border-b border-brand-border bg-brand-bg text-slate-900">
      {/* Dynamic corner highlights */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[300px] bg-brand-primary/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl mb-16">
          <div className="inline-flex items-center gap-1.5 border border-brand-border bg-white py-1.5 px-3.5 text-[9px] tracking-[0.25em] font-mono text-slate-800 uppercase font-semibold shadow-sm">
            <UserCheck size={11} className="text-brand-primary" />
            <span>CLIENT BRIEFS // EXPERT TESTIMONY</span>
          </div>
          <h2 className="font-display text-4xl font-normal italic text-slate-900 sm:text-5xl tracking-tight leading-tight">
            Client success in <span className="not-italic font-bold text-slate-950">video & audio.</span>
          </h2>
          <p className="text-sm font-light text-slate-600 max-w-lg leading-relaxed">
            Real clinical directors, technical officers, and high-growth founders speaking objective facts about their web engineering partnerships with Aksharam.
          </p>
        </div>

        {/* Video Testimonials List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="relative group border border-brand-border bg-white p-5 shadow-sm hover:shadow-md hover:bg-brand-card-hover/20 hover:border-brand-primary flex flex-col justify-between"
            >
              {/* Corner brackets */}
              <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t border-l border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b border-r border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="space-y-4">
                {/* Virtual Video Poster Wrapper */}
                <div 
                  onClick={() => handleOpenVideo(video)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpenVideo(video); } }}
                  aria-label={`Play testimonial ${video.isAudio ? 'audio' : 'video'} from ${video.clientName}, CEO of ${video.company}`}
                  className="relative aspect-[16/10] bg-slate-950 overflow-hidden border border-brand-border cursor-pointer group-hover:border-brand-primary transition-colors focus:ring-2 focus:ring-brand-primary focus:outline-none"
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={`Testimonial placeholder and thumbnail for ${video.clientName}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 opacity-60 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/45 group-hover:bg-black/15 transition-colors" />

                  {/* Special Audio Overlay visual ridges if audio */}
                  {video.isAudio && (
                    <div className="absolute inset-0 bg-indigo-950/20 pointer-events-none flex flex-col justify-between p-3">
                      <div className="self-start bg-[#070D1E]/95 border border-brand-primary/40 px-2 py-1 flex items-center gap-1.5 rounded-none">
                        <Headphones size={11} className="text-brand-primary animate-pulse" />
                        <span className="font-mono text-[8px] tracking-widest text-[#4ade80]">HIFI AUDIO REVIEW</span>
                      </div>
                    </div>
                  )}

                  {/* High Tech Animated Play Button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <div className="h-14 w-14 rounded-full bg-[#070D1E]/90 border border-brand-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-slate-950 transition-all duration-305">
                      <Play size={18} className="translate-x-[1px] text-brand-primary group-hover:text-slate-950 transition-colors fill-current" />
                    </div>
                  </div>

                  {/* Floating Timer Badge */}
                  <div className="absolute bottom-3 right-3 bg-[#111827]/90 px-2 py-1 font-mono text-[9px] tracking-wider text-brand-accent border border-brand-primary/20">
                    {video.isAudio ? 'AUDIO' : `${video.durationString} MIN`}
                  </div>

                  {/* Simulated Audio Bars overlays when hover */}
                  <div className="absolute bottom-3 left-3 flex gap-0.5 items-end h-3">
                    <span className="w-[1px] bg-brand-primary/55 group-hover:animate-pulse h-2"></span>
                    <span className="w-[1px] bg-brand-primary/75 group-hover:animate-pulse h-3"></span>
                    <span className="w-[1px] bg-brand-primary/55 group-hover:animate-pulse h-1"></span>
                  </div>
                </div>

                {/* Accent mini quote box */}
                <div className="space-y-2 pt-2">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-brand-primary font-bold block">
                    {video.company}
                  </span>
                  <p className="text-sm italic font-light text-slate-600 leading-relaxed font-sans">
                    &ldquo;{video.accentQuote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Author details foot line */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-display text-base font-normal italic text-slate-800 group-hover:text-brand-primary transition-colors">
                    {video.clientName}
                  </div>
                  <div className="text-[10px] font-mono tracking-wider text-slate-500 mt-0.5">
                    {video.role}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenVideo(video)}
                  className="font-mono text-[9px] uppercase tracking-widest text-brand-primary font-bold hover:text-slate-900 transition-colors flex items-center gap-1.5"
                >
                  <span>{video.isAudio ? 'LISTEN' : 'WATCH'}</span>
                  {video.isAudio ? <Headphones size={10} /> : <Play size={10} className="fill-current" />}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Simulated Premium Video Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Backing backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseVideo}
              className="absolute inset-0 bg-[#111827]/70 backdrop-blur-md"
            />

            {/* Video Player Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-4xl bg-brand-card border border-brand-primary/30 shadow-2xl z-20 flex flex-col"
            >
              {/* Dynamic corner markings for player */}
              <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-brand-primary"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-brand-primary"></div>

              {/* Player Top Line info */}
              <div className="p-4 md:px-6 border-b border-white/10 flex items-center justify-between bg-brand-bg text-white">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-brand-primary animate-ping" />
                  <div>
                    <h3 className="font-display text-lg italic font-normal text-white flex items-center gap-2">
                       {activeVideo.clientName} {activeVideo.isAudio ? 'Voice Testimony' : 'Testimony'}
                      <span className="text-xs font-mono tracking-widest not-italic text-brand-primary/50">
                        // {activeVideo.company}
                      </span>
                    </h3>
                  </div>
                </div>

                <button
                  onClick={handleCloseVideo}
                  className="font-mono text-[9px] uppercase tracking-[0.2em] font-medium text-white/50 hover:text-brand-primary transition-colors cursor-pointer border border-white/10 hover:border-brand-primary px-3 py-1 bg-black/40"
                >
                  CLOSE PLAYER
                </button>
              </div>

              {/* Main Simulated Screen Area */}
              <div className="relative aspect-[16/9] md:aspect-[21/9] bg-[#020202] flex flex-col justify-between p-6 overflow-hidden">
                
                {activeVideo.isAudio ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none bg-radial from-slate-900 via-brand-bg to-[#020202]">
                    {/* Grid of beautifully oscillating audio lines mimicking real Web Audio input */}
                    <div className="flex gap-1.5 items-end h-20 mb-6">
                      {[...Array(24)].map((_, i) => (
                        <motion.span
                          key={i}
                          animate={isPlaying ? {
                            height: [15, 60, 20, 75, 15][(currentTime * 2 + i) % 5],
                          } : { height: 15 }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.04
                          }}
                          className="w-1.5 bg-brand-primary/60 rounded-none shrink-0"
                        />
                      ))}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.25em] font-mono text-brand-primary/80 flex items-center gap-2 select-none">
                      <Volume2 size={12} className={isPlaying ? "animate-bounce" : ""} />
                      <span>DYNAMIC AUDIO INTEGRATION ACTIVE</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Background animated portrait watermark layout during play */}
                    <div className="absolute inset-0 flex items-center justify-center z-0 opacity-20 select-none">
                      <img
                        src={activeVideo.thumbnailUrl}
                        alt={activeVideo.clientName}
                        className="w-full h-full object-cover grayscale blur-[2px]"
                      />
                    </div>
                  </>
                )}

                {/* Simulated scanlines texture effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-black/30 pointer-events-none z-10" />

                {/* Left corner state badge */}
                <div className="z-10 flex items-center justify-between">
                  <div className="bg-black/80 px-2.5 py-1 text-[8px] font-mono tracking-widest text-[#7f8fa4] border border-white/10 uppercase flex items-center gap-1.5 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary inline-block animate-pulse"></span>
                    <span>{activeVideo.isAudio ? 'TELEPHONY SOURCE // HIFI AUDIO LINKED' : '1080p SOURCE // SECURE FEED'}</span>
                  </div>
                </div>

                {/* Subtitles Overlay Panel (Real-Time Synchronized to timeline ticks!) */}
                <div className="z-10 flex flex-col items-center text-center justify-center max-w-2xl mx-auto w-full mb-4">
                  {currentSubtitle ? (
                    <motion.div
                      key={currentSubtitle}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-black/85 backdrop-blur-md px-6 py-3 border-l-2 border-brand-primary text-white text-sm md:text-base font-light shadow-2xl tracking-wide max-w-full leading-relaxed"
                    >
                      {currentSubtitle}
                    </motion.div>
                  ) : (
                    <div className="bg-brand-bg text-white/30 text-xs font-mono tracking-widest uppercase py-3 px-6 border border-white/5 bg-brand-card">
                      [ STREAM RE-BUFFERING / LOADING AUDIO ]
                    </div>
                  )}
                </div>

                {/* High tech play visualizer equalizer lines */}
                <div className="z-10 flex items-end justify-between select-none">
                  {/* Testimonial Author profile tag */}
                  <div className="bg-black/90 p-3 max-w-xs border border-white/10 shadow-lg">
                    <div className="text-[10px] uppercase tracking-widest font-mono text-brand-primary mb-0.5">{activeVideo.company}</div>
                    <div className="font-display italic text-sm text-white">{activeVideo.clientName}</div>
                    <div className="text-[9px] font-mono text-[#64748B] mt-0.5">{activeVideo.role}</div>
                  </div>

                  {/* Oscilloscope Animation when playing */}
                  <div className="flex gap-1 items-end h-[35px] max-w-[120px] bg-black/80 border border-white/10 p-2">
                    <span className={`w-1.5 bg-brand-primary/80 h-1 ${isPlaying ? 'animate-bounce' : 'h-3'}`} style={{ animationDuration: '0.6s' }}></span>
                    <span className={`w-1.5 bg-brand-primary h-[15px] ${isPlaying ? 'animate-bounce' : 'h-2'}`} style={{ animationDuration: '0.9s' }}></span>
                    <span className={`w-1.5 bg-brand-primary/60 h-2 ${isPlaying ? 'animate-bounce' : 'h-4'}`} style={{ animationDuration: '0.5s' }}></span>
                    <span className={`w-1.5 bg-brand-primary h-4 ${isPlaying ? 'animate-bounce' : 'h-1'}`} style={{ animationDuration: '1.2s' }}></span>
                    <span className={`w-1.5 bg-brand-primary/70 h-[3px] ${isPlaying ? 'animate-bounce' : 'h-3'}`} style={{ animationDuration: '0.7s' }}></span>
                  </div>
                </div>

              </div>

              {/* Controls Dashboard Docking Bar */}
              <div className="p-4 md:px-6 bg-brand-bg border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Play, seek, timeline track */}
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 border border-white/15 bg-black hover:border-brand-primary hover:text-brand-primary transition-colors text-white cursor-pointer rounded-none shrink-0"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </button>

                  <button
                    onClick={() => setCurrentTime(0)}
                    className="p-2 border border-white/15 bg-black hover:border-brand-primary hover:text-brand-primary transition-colors text-white cursor-pointer rounded-none shrink-0"
                    title='Reset Video'
                  >
                    <RotateCcw size={14} />
                  </button>

                  {/* Seeking timeline */}
                  <div className="flex items-center gap-2 flex-grow text-xs font-mono text-[#64748B]">
                    <span>{formatTime(currentTime)}</span>
                    <div 
                      onClick={handleProgressBarClick}
                      className="flex-grow h-1.5 bg-white/10 hover:bg-white/20 relative cursor-pointer group"
                    >
                      {/* Active video played tracker */}
                      <div 
                        className="h-full bg-brand-primary absolute top-0 left-0 transition-all duration-300 pointer-events-none"
                        style={{ width: `${(currentTime / activeVideo.durationSeconds) * 100}%` }}
                      />
                      {/* Handler pin floating on seek */}
                      <div 
                        className="absolute h-3 w-3 bg-white border border-brand-primary -top-[3px] -translate-x-1/2 rounded-full hidden group-hover:block transition-all pointer-events-none"
                        style={{ left: `${(currentTime / activeVideo.durationSeconds) * 100}%` }}
                      />
                    </div>
                    <span>{formatTime(activeVideo.durationSeconds)}</span>
                  </div>
                </div>

                {/* Right utility elements: Volume/Mute & Indicators */}
                <div className="flex items-center gap-6 justify-between md:justify-end shrink-0">
                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:text-brand-primary cursor-pointer"
                    >
                      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(Number(e.target.value));
                        setIsMuted(false);
                      }}
                      className="w-16 accent-brand-primary cursor-pointer h-1"
                    />
                  </div>

                  <div className="h-4 w-[1px] bg-white/10 hidden md:block" />

                  {/* State Tag indicators */}
                  <div className="flex items-center gap-2 text-[9px] font-mono tracking-widest text-brand-primary/80 select-none">
                    <Sparkles size={10} />
                    <span>AUDIO FEED LINKED</span>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
