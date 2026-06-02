import React, { useState } from 'react';
import { Search, Calendar, User, Clock, ArrowRight, Heart, Bookmark, Share2, X, BookOpen, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BlogPost {
  id: string;
  title: string;
  category: 'Strategy' | 'Technology' | 'Marketing' | 'Design';
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  likes: number;
  contentMarkdown: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'ecommerce-conversion',
    title: 'The Anatomy of 5x E-Commerce Conversion Uplifts',
    category: 'Strategy',
    excerpt: 'How analyzing micro-interactions and reducing checkout friction turns window shoppers into high-value repeat buyers with a scalable system.',
    date: 'May 28, 2026',
    readTime: '5 min read',
    author: 'Elena Rostova',
    likes: 84,
    contentMarkdown: `### 1. The Real Cost of Checkout Friction
Many modern storefronts suffer from silent drop-off at checkout. Although marketing teams drive massive campaign traffic to landing pages, the cart survival rate remains sub-par globally. Our studies show that removing just one redundant input field and pre-loading local address suggestions boosts final validation actions by up to 34%.

### 2. Micro-Interactions and Visual Feedback
Users crave sensory confirmation on mobile screens. Pacing micro-animations to confirm interactions:
- Success checkmarks on card authorization.
- Gentle haptic loops (where supported) or vibrant, instant button state changes to Electric Blue or Cyan upon tap commands.
- Transparent progress indicators representing multi-stage shipments.

### 3. Case Analysis & Empirical Success
By replacing traditional form layouts with structural, inline single-column fields at RetailX, we recorded a remarkable 200% conversion boost. These numbers represent objective business gains, achieved by putting human psychology and interaction speed at the absolute center of digital product architecture.`
  },
  {
    id: 'zero-vulnerability-portals',
    title: 'Architecting Zero-Vulnerability Security Portals in 2026',
    category: 'Technology',
    excerpt: 'Learn how modern encryption layers and edge protection frameworks safeguard corporate assets from emerging automated threats.',
    date: 'May 20, 2026',
    readTime: '7 min read',
    author: 'Aksharam Security Lab',
    likes: 56,
    contentMarkdown: `### 1. Redefining Corporate Firewalls
Traditional endpoint boundaries are obsolete. The modern secure portal operates on strict, dynamic zero-trust verification rules. This model mandates that every access request, whether inside or outside the immediate ecosystem, is independently encrypted, validated, and logged.

### 2. Edge Security Protocols & Live Monitoring
Implementing low-latency authorization proxies at edge servers keeps backend database schemas decoupled from public browser paths. By routing transaction streams through encrypted micro-gateways:
- Real-time intrusion detection models can analyze patterns instantly.
- DDoS vectors are neutralized in millisecond intervals before exhausting server resources.
- Critical endpoints remain masked, showing only hardended public layers.

### 3. Continuous Auditing Over Periodic Scans
Security is not a baseline standard—it is a continuous technical process. Security assessments must be automated into standard continuous integration pipelines to enforce compliance and prevent legacy packages from exposing secure databases.`
  },
  {
    id: 'targeted-marketing-roi',
    title: 'Maximizing ROI with Laser-Targeted Ad Campaigns',
    category: 'Marketing',
    excerpt: 'Discover how we built automated reporting engines and real-time dashboard feedback to cut customer acquisition costs by 45% in one quarter.',
    date: 'May 12, 2026',
    readTime: '4 min read',
    author: 'Marcus Sterling',
    likes: 112,
    contentMarkdown: `### 1. Eliminating Segment Clutter
Modern digital channels are highly noisy. Many brands throw generic ad-spend dollars at broad, unrefined audiences, which leads directly to low click-through rates and high acquisition costs. Laser targeting means analyzing behavior streams to pinpoint user segments that show immediate transaction intent.

### 2. Automated Reporting and Optimization
By setting up real-time ETL databases linking current Google Analytics APIs to executive marketing boards, our teams react instantly to campaign pacing:
- Dynamic conversion tracking triggers quick ad-spend reallocations.
- Inactive creatives are automatically disabled to conserve budget.
- Clear, visual dashboard panels highlight which segments are producing top returns.

### 3. The 45% Acquisition Cost Reduction
This data-driven, systematic optimization was deployed across Zenith Group operations. In the first fiscal quarter, Zenith saved 45% on acquisition spend while maintaining identical lead volumes, generating maximum net margins and clear operational return on ad investment.`
  },
  {
    id: 'mobile-native-retention',
    title: 'The Power of Mobile Native Experiences on Direct Sales',
    category: 'Design',
    excerpt: 'Why standard mobile responsive displays fall short of native application efficiency, and how to harness speed to double user retention.',
    date: 'April 30, 2026',
    readTime: '6 min read',
    author: 'Amit Patel',
    likes: 95,
    contentMarkdown: `### 1. Eliminating the Multi-Tab Headache
Although responsive web templates are essential, they suffer from browser overhead, navigation chrome clutter, and slow third-party resource queues. A highly-streamlined native app offers zero-overhead view rendering, keeping customers immersed in the storefront without loading latency.

### 2. Speed is the Ultimate Metric
Conversion indexes indicate a clear, direct correlation between load times and purchase confidence:
- A 1.2-second load speed correlates with a 40% higher purchase sequence completion compared to a 3-second delay.
- Off-line capability modes allow users to review local lists, edit shipping preferences, and queue checkouts without carrier signal delays.

### 3. Strategic Design Integration
Integrating push notifications grounded in user behavior triggers active, organic engagement. By combining native design guidelines with elegant branding details, we deliver unmatched mobile retention that turns standard traffic metrics into a predictable growth curve.`
  }
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Strategy' | 'Technology' | 'Marketing' | 'Design'>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // Interactive mini states
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  const categories = ['All', 'Strategy', 'Technology', 'Marketing', 'Design'] as const;

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter((pid) => pid !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };

  const handleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedPosts.includes(id)) {
      setBookmarkedPosts(bookmarkedPosts.filter((pid) => pid !== id));
    } else {
      setBookmarkedPosts([...bookmarkedPosts, id]);
    }
  };

  const handleShare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCopiedPostId(id);
    setTimeout(() => {
      setCopiedPostId(null);
    }, 2000);
  };  return (
    <section id="blog-section" className="py-20 md:py-28 relative border-b border-brand-border bg-brand-bg text-slate-900">
      {/* Soft electric blue top-left visual accent */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[300px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 border border-brand-border bg-white py-1.5 px-3.5 text-[9px] tracking-[0.25em] font-mono text-slate-800 uppercase font-semibold shadow-sm">
              <Sparkles size={11} className="text-brand-primary animate-pulse" />
              <span>LEARNING HUB // INSIGHTS</span>
            </div>
            <h2 className="font-display text-4xl font-normal italic text-slate-900 sm:text-5xl tracking-tight leading-tight">
              Tactical advice for <br />
              <span className="not-italic font-bold text-slate-950 bg-clip-text">
                conversion and scaling.
              </span>
            </h2>
            <p className="text-sm font-light text-slate-600 leading-relaxed max-w-lg">
              We compile battle-tested strategies, deep analyses, and framework solutions designed to give your business an extreme advantage.
            </p>
          </div>

          {/* Search bar & Filter container */}
          <div className="w-full lg:max-w-md space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-primary/50" />
              <input
                type="text"
                placeholder="Search strategies & analysis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-brand-border hover:border-brand-primary focus:border-brand-primary py-3 pl-10 pr-4 text-xs font-mono tracking-wide placeholder-slate-400 text-slate-800 outline-none transition-all focus:ring-1 focus:ring-brand-primary/20"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-primary hover:text-slate-900 font-mono text-[9px] font-bold"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-1 scrollbar-none border-b border-brand-border">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 text-[9px] font-mono uppercase tracking-[0.2em] transition-all duration-300 border-b-2 cursor-pointer pb-2 ${
                selectedCategory === cat
                  ? 'border-brand-primary text-brand-primary font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 pb-2 font-medium'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid Layout */}
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredPosts.map((post) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedPost(post)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedPost(post); } }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Read article: ${post.title}. Category: ${post.category}. Estimated duration: ${post.readTime}`}
                  key={post.id}
                  className="group relative flex flex-col justify-between overflow-hidden border border-brand-border bg-white p-8 hover:border-brand-primary hover:shadow-md transition-all duration-300 cursor-pointer focus:ring-2 focus:ring-brand-primary focus:outline-none"
                >
                  {/* Decorative highlights */}
                  <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t border-l border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b border-r border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="space-y-4">
                    {/* Upper Meta line */}
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      <span className="text-brand-primary font-bold">{post.category}</span>
                      <div className="flex items-center gap-2">
                        <Calendar size={11} />
                        <span>{post.date}</span>
                      </div>
                    </div>

                    <h3 className="font-display text-2xl font-semibold text-slate-850 group-hover:text-brand-primary transition-colors tracking-tight leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-sm font-light text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer Line with interaction details */}
                  <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between self-stretch">
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-500 font-medium">
                      <div className="flex items-center gap-1">
                        <User size={12} className="text-slate-400" />
                        <span className="text-[10px] text-slate-600">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={11} className="text-slate-400" />
                        <span className="text-[10px] text-slate-600">{post.readTime}</span>
                      </div>
                    </div>

                    {/* Action Panel icons */}
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={(e) => handleLike(post.id, e)}
                        className={`p-1.5 border border-brand-border bg-[#f0f6fc] rounded-none hover:border-brand-primary hover:text-slate-800 transition-colors ${
                          likedPosts.includes(post.id) ? 'text-rose-500 border-rose-500/30' : 'text-slate-400'
                        }`}
                        title="Like Strategy"
                      >
                        <Heart size={12} className={likedPosts.includes(post.id) ? 'fill-current' : ''} />
                      </button>

                      <button 
                        onClick={(e) => handleBookmark(post.id, e)}
                        className={`p-1.5 border border-brand-border bg-[#f0f6fc] rounded-none hover:border-brand-primary hover:text-slate-800 transition-colors ${
                          bookmarkedPosts.includes(post.id) ? 'text-amber-500 border-amber-500/30' : 'text-slate-400'
                        }`}
                        title="Bookmark Post"
                      >
                        <Bookmark size={12} className={bookmarkedPosts.includes(post.id) ? 'fill-current' : ''} />
                      </button>

                      <button 
                        onClick={(e) => handleShare(post.id, e)}
                        className="p-1.5 border border-brand-border bg-[#f0f6fc] text-slate-450 rounded-none hover:border-brand-primary hover:text-slate-800 transition-colors relative"
                        title="Copy Share Link"
                      >
                        <Share2 size={12} />
                        <AnimatePresence>
                          {copiedPostId === post.id && (
                            <motion.span 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono text-[8px] px-2 py-0.5 whitespace-nowrap"
                            >
                              LINK COPIED!
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>

                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#4ADE80] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 ml-1">
                        READ <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-brand-border bg-brand-card p-12 text-center flex flex-col items-center justify-center space-y-4"
            >
              <AlertCircle size={24} className="text-brand-primary/50" />
              <p className="font-mono text-xs text-brand-primary/60 uppercase tracking-widest">No strategies found matching search terms.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-slate-950 px-5 py-2 font-mono text-[10px] uppercase tracking-widest transition-all cursor-pointer font-bold duration-200"
              >
                Reset Search Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slide-over/Dialog Article Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-brand-card border border-brand-primary/30 shadow-2xl z-20 flex flex-col max-h-[85vh] text-white"
            >
              <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-brand-primary"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-brand-primary"></div>

              {/* Reader Header */}
              <div className="p-5 md:p-6 border-b border-white/10 flex items-center justify-between bg-brand-bg text-white select-none">
                <div className="flex items-center gap-2">
                  <div className="bg-brand-primary/10 h-6 w-6 rounded-none flex items-center justify-center border border-brand-primary/20">
                    <BookOpen size={12} className="text-brand-primary" />
                  </div>
                  <span className="font-mono text-[10px] tracking-wider text-brand-primary font-bold uppercase">{selectedPost.category} Analysis</span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="font-mono text-[9px] uppercase tracking-widest hover:text-brand-primary border border-white/10 hover:border-brand-primary bg-black/40 text-white px-3 py-1 cursor-pointer transition-colors"
                >
                  CLOSE
                </button>
              </div>

              {/* Reader Body content scrollable */}
              <div className="p-6 md:p-8 overflow-y-auto text-white leading-relaxed tracking-wide space-y-6 bg-brand-card">
                <div>
                  <h1 className="font-display text-3xl font-bold italic tracking-tight mb-4 text-white">
                    {selectedPost.title}
                  </h1>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-6 text-[11px] font-mono text-slate-450 pb-5 border-b border-white/5">
                    <div className="flex items-center gap-1 text-slate-300">
                      <User size={12} />
                      <span>{selectedPost.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{selectedPost.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{selectedPost.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-rose-500 font-bold">
                      <Heart size={11} className="fill-current" />
                      <span>{selectedPost.likes + (likedPosts.includes(selectedPost.id) ? 1 : 0)} Likes</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Markdown Render */}
                <div className="text-sm md:text-base font-light text-slate-300 space-y-6">
                  {selectedPost.contentMarkdown.split('\n\n').map((para, i) => {
                    if (para.startsWith('###')) {
                      return (
                        <h3 key={i} className="font-display text-lg italic font-semibold text-white pt-4 first:pt-0">
                          {para.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (para.startsWith('-')) {
                      return (
                        <ul key={i} className="space-y-2 pl-4 border-l-2 border-brand-primary/20">
                          {para.split('\n').map((li, index) => (
                            <li key={index} className="flex items-start gap-1.5 text-slate-300">
                              <span className="text-brand-primary select-none mt-1">✦</span>
                              <span>{li.replace('- ', '')}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={i} className="leading-relaxed text-slate-300">{para}</p>;
                  })}
                </div>
              </div>

              {/* Reader Action Foot line */}
              <div className="p-5 border-t border-white/10 flex items-center justify-between bg-brand-bg select-none">
                <button
                  onClick={(e) => handleLike(selectedPost.id, e)}
                  className={`flex items-center gap-2 border px-4 py-2 text-[10px] font-mono uppercase tracking-widest bg-white/5 hover:border-brand-primary hover:text-white cursor-pointer transition-colors ${
                    likedPosts.includes(selectedPost.id) ? 'text-rose-500 border-rose-500/35 bg-rose-500/5' : 'text-slate-400 border-white/10'
                  }`}
                >
                  <Heart size={12} className={likedPosts.includes(selectedPost.id) ? 'fill-rose-500' : ''} />
                  <span>{likedPosts.includes(selectedPost.id) ? 'LIKED POST' : 'LIKE STRATEGY'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleBookmark(selectedPost.id, e)}
                    className={`p-2 border bg-white/5 hover:border-brand-primary hover:text-white cursor-pointer transition-colors ${
                      bookmarkedPosts.includes(selectedPost.id) ? 'text-amber-500 border-amber-500/35 bg-amber-550/5' : 'text-slate-400 border-white/10'
                    }`}
                    title="Bookmark Analysis"
                  >
                    <Bookmark size={14} className={bookmarkedPosts.includes(selectedPost.id) ? 'fill-current' : ''} />
                  </button>
                  
                  <button
                    onClick={(e) => handleShare(selectedPost.id, e)}
                    className="p-2 border bg-white/5 hover:border-brand-primary text-slate-400 border-white/10 cursor-pointer transition-colors relative"
                    title="Copy Article Link"
                  >
                    <Share2 size={14} />
                    <AnimatePresence>
                      {copiedPostId === selectedPost.id && (
                        <motion.span 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: -5 }}
                          exit={{ opacity: 0 }}
                          className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-950 text-white font-mono text-[8px] px-2 py-0.5 whitespace-nowrap"
                        >
                          COPIED!
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
