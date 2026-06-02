import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Send, 
  RefreshCw, 
  Inbox, 
  Layers, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  X, 
  Lock, 
  Key, 
  Sparkles, 
  LogOut, 
  ChevronRight, 
  User, 
  AlertTriangle,
  Info 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Email message type
interface EmailMessage {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  date: string;
  snippet: string;
  body: string;
  labels: string[];
}

// Client pre-defined templates for Aksharam Solutions
const AGENCY_TEMPLATES = [
  {
    name: 'Client Discovery Blueprint',
    subject: 'Aksharam Solutions // Digital Strategy Boarding Assessment',
    body: `Dear Client,

Thank you for initiating a business enquiry with Aksharam Solutions. 

We have conducted an initial architectural assessment of your digital objectives. In order to construct your customized technical blueprint, we would love to schedule a direct 15-minute sync with our Lead Technical Consultant.

Please pick a convenient slot from our Booking Portal on our website, or replied to this email.

Best regards,
Architectural Lead | Aksharam Solutions
Jaipur, Rajasthan`
  },
  {
    name: 'NDA & Discovery Proposal',
    subject: 'Mutual NDA Proposal // Aksharam Solutions - Joint Exploration',
    body: `Dear Partner,

Thank you for your enquiry regarding our custom software and cybersecurity architecture capabilities.

We prioritize confidentiality. Attached is our standard Digital MVP Mutual NDA. Please sign and return this copy so our senior engineers can conduct deep structural diagnostics of your legacy workflows.

Looking forward to our collaborative engagement.

Sincerely,
Compliance Division | Aksharam Solutions`
  },
  {
    name: 'Tactical Technology Review',
    subject: 'Strategy Assessment // High-Performance Platform Insights',
    body: `Hi there,

We reviewed your online customer funnels and noticed key performance areas that could elevate your conversions by 25-40%:

1. Core Web Vitals optimization on page loads.
2. Hardened security vectors to prevent threat vulnerabilities.
3. Structured headless SEO schemas.

We have compiled a detailed, zero-obligation brief explaining how we would address these. Let us know if you want to preview it!

Best regards,
Aksharam Solutions Team`
  }
];

// Simulated Emails for Sandbox Demo mode
const SIMULATED_EMAIL_POOL: EmailMessage[] = [
  {
    id: 'sim-1',
    sender: 'Sriya Sinha',
    senderEmail: 'sinhasriya230@gmail.com',
    subject: 'Custom E-Commerce Platform Query',
    date: 'Today, 1:12 PM',
    snippet: 'Interested in building a headless MVP with Shopify integration. What is your estimated timeline for delivery?',
    body: `Hi Aksharam Solutions Team,\n\nI saw your web development capabilities on your landing page and was very impressed with the high-converting aesthetic.\n\nWe are looking to scale our organic brand by rebuilding our storefront into a custom Headless React MVP connected to a Shopify backend. What is your typical timeline and estimate for such an architecture?\n\nLooking forward to your reply!\n\nBest,\nSriya Sinha\nsinhasriya230@gmail.com`,
    labels: ['INBOX', 'STARRED']
  },
  {
    id: 'sim-2',
    sender: 'Arjun Meena (Stripe Integrations)',
    senderEmail: 'arjun@paymentssolution.io',
    subject: 'Partnership Inquiry: Resilient API Gateways',
    date: 'Yesterday',
    snippet: 'We need to harden our payment gateway from malicious injection. Do you provide detailed threat assessments?',
    body: `Dear Team,\n\nOur fintech operations require a hardened cybersecurity audit of our Stripe endpoints and webhook handlers to ensure absolute compliance and prevent threat vulnerabilities.\n\nDo you provide detailed cybersecurity audit documents, and what are the compliance standards applied? \n\nRegards,\nArjun Meena`,
    labels: ['INBOX']
  },
  {
    id: 'sim-3',
    sender: 'Dr. Vivek Sharma',
    senderEmail: 'sharma.vivek@healthtech.org',
    subject: 'Healthcare Intake System MVP',
    date: 'May 30, 2026',
    snippet: 'Need a HIPAA-compliant booking portal integrated with Google Calendar and Workspace APIs.',
    body: `Hello,\n\nWe need to build a secure medical intake platform that lets clients request video consultations and automatically schedules them using Google Calendar and Workspace integration.\n\nIs this something your engineering team can construct within our strict NDA?\n\nSincerely,\nDr. Vivek Sharma`,
    labels: ['INBOX']
  }
];

export default function GmailHub() {
  const [accessToken, setAccessToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [profileEmail, setProfileEmail] = useState<string>('');
  
  // App UI State
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [emails, setEmails] = useState<EmailMessage[]>(SIMULATED_EMAIL_POOL);
  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(SIMULATED_EMAIL_POOL[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  
  // Compose Panel state
  const [isComposeOpen, setIsComposeOpen] = useState<boolean>(false);
  const [composeTo, setComposeTo] = useState<string>('');
  const [composeSubject, setComposeSubject] = useState<string>('');
  const [composeBody, setComposeBody] = useState<string>('');
  const [sendSuccess, setSendSuccess] = useState<boolean>(false);

  // Manual token input field toggle
  const [showTokenInput, setShowTokenInput] = useState<boolean>(false);
  const [manualToken, setManualToken] = useState<string>('');

  // Fetch live Gmail messages
  const fetchLiveGmailData = async (tokenToUse: string) => {
    setIsLoading(true);
    setStatusMessage('Connecting to Google Workspace...');
    try {
      // 1. Fetch Profile
      const profileRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
        headers: { Authorization: `Bearer ${tokenToUse}` }
      });
      
      if (!profileRes.ok) {
        throw new Error(`Auth failed (${profileRes.status}). The token may be expired.`);
      }
      
      const profileData = await profileRes.json();
      setProfileEmail(profileData.emailAddress);
      
      // 2. Fetch recent message list
      setStatusMessage('Fetching latest business communications...');
      const listRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=8', {
        headers: { Authorization: `Bearer ${tokenToUse}` }
      });
      
      const listData = await listRes.json();
      
      if (!listData.messages || listData.messages.length === 0) {
        setEmails([]);
        setSelectedEmail(null);
        setIsDemoMode(false);
        setIsAuthenticated(true);
        setStatusMessage('No messages found in your inbox.');
        setIsLoading(false);
        return;
      }
      
      // 3. Fetch details for each message
      const detailedMessages: EmailMessage[] = [];
      
      for (const msg of listData.messages) {
        const detailRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`, {
          headers: { Authorization: `Bearer ${tokenToUse}` }
        });
        const detailData = await detailRes.json();
        
        // Parse headers
        const headers = detailData.payload?.headers || [];
        const subject = headers.find((h: any) => h.name.toLowerCase() === 'subject')?.value || '(No Subject)';
        const fromHeader = headers.find((h: any) => h.name.toLowerCase() === 'from')?.value || 'Unknown Sender';
        const dateHeader = headers.find((h: any) => h.name.toLowerCase() === 'date')?.value || '';
        
        // Clean sender
        const senderMatch = fromHeader.match(/^(.*?)\s*<(.*?)>$/);
        const sender = senderMatch ? senderMatch[1].replace(/['"]/g, '') : fromHeader;
        const senderEmail = senderMatch ? senderMatch[2] : fromHeader;
        
        // Parse email body
        let body = '';
        const parts = detailData.payload?.parts;
        if (parts) {
          // Check for recursive parts or base64 data
          const findBodyAndText = (partsArray: any[]): string => {
            for (const part of partsArray) {
              if (part.mimeType === 'text/plain' && part.body?.data) {
                return part.body.data;
              }
              if (part.parts) {
                const nested = findBodyAndText(part.parts);
                if (nested) return nested;
              }
            }
            return '';
          };
          
          const rawBody = findBodyAndText(parts) || detailData.payload?.body?.data || '';
          if (rawBody) {
            body = decodeBase64Url(rawBody);
          }
        } else if (detailData.payload?.body?.data) {
          body = decodeBase64Url(detailData.payload.body.data);
        }
        
        detailedMessages.push({
          id: detailData.id,
          sender,
          senderEmail,
          subject,
          date: formatDateString(dateHeader),
          snippet: detailData.snippet || '',
          body: body || detailData.snippet || '',
          labels: detailData.labelIds || []
        });
      }
      
      setEmails(detailedMessages);
      if (detailedMessages.length > 0) {
        setSelectedEmail(detailedMessages[0]);
      }
      setIsDemoMode(false);
      setIsAuthenticated(true);
      setStatusMessage('Live Gmail synchronised successfully.');
    } catch (err: any) {
      console.error(err);
      setStatusMessage(`Sync unsuccessful: ${err.message || 'Verification failed.'}`);
      setIsDemoMode(true);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Base64Url helper functions 
  const decodeBase64Url = (base64UrlStr: string) => {
    let base64 = base64UrlStr.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    try {
      return decodeURIComponent(escape(atob(base64)));
    } catch {
      return atob(base64); // Fallback
    }
  };

  const formatDateString = (rawDate: string) => {
    if (!rawDate) return '';
    try {
      const parsed = new Date(rawDate);
      return parsed.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return rawDate;
    }
  };

  // Connect Google client-side OAuth implicit flow helper
  const handleGoogleSignIn = () => {
    const scope = encodeURIComponent('https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send');
    const redirectUri = encodeURIComponent(window.location.origin + window.location.pathname);
    const clientId = '780043722618-m08n7ubf66co7ndob0mcl9p6q93l8v1j.apps.googleusercontent.com'; // Standard default development Client ID
    
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}&include_granted_scopes=true`;
    
    // Redirect user to sign-in page, which then returns back with access token in fragment
    setStatusMessage('Opening secure workspace verification channel...');
    window.location.href = oauthUrl;
  };

  // Inspect hash token on load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const urlParams = new URLSearchParams(hash.substring(1));
      const token = urlParams.get('access_token');
      if (token) {
        setAccessToken(token);
        // Clear hash from URL cleanly
        window.history.replaceState(null, '', window.location.pathname);
        fetchLiveGmailData(token);
      }
    }
  }, []);

  const handleManualTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualToken.trim()) return;
    setAccessToken(manualToken.trim());
    fetchLiveGmailData(manualToken.trim());
  };

  const handleDisconnect = () => {
    setAccessToken('');
    setIsAuthenticated(false);
    setProfileEmail('');
    setEmails(SIMULATED_EMAIL_POOL);
    setSelectedEmail(SIMULATED_EMAIL_POOL[0]);
    setIsDemoMode(true);
    setStatusMessage('Disconnected Workspace account.');
  };

  // Apply predefined template email to compose boxes
  const applyTemplate = (tpl: { subject: string; body: string }) => {
    setComposeSubject(tpl.subject);
    setComposeBody(tpl.body);
  };

  // Send Email via REST API (encodes Raw RFC 2822 in base64url)
  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo.trim()) return;
    
    setIsSending(true);
    
    // Fallback confirmation dialog check
    const isConfirmed = window.confirm(`Send this email to "${composeTo}" via Gmail?`);
    if (!isConfirmed) {
      setIsSending(false);
      return;
    }

    try {
      if (isDemoMode) {
        // Mock sending
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // Add sent email mock indicator
        const mockNewEmail: EmailMessage = {
          id: `sim-sent-${Date.now()}`,
          sender: 'Me (Aksharam Solutions)',
          senderEmail: profileEmail || 'you@domain.com',
          subject: composeSubject,
          date: 'Just now',
          snippet: composeBody.substring(0, 100) + '...',
          body: composeBody,
          labels: ['SENT']
        };
        setEmails([mockNewEmail, ...emails]);
        setSelectedEmail(mockNewEmail);
        setSendSuccess(true);
        setTimeout(() => {
          setSendSuccess(false);
          setIsComposeOpen(false);
          // clear fields
          setComposeTo('');
          setComposeSubject('');
          setComposeBody('');
        }, 2000);
      } else {
        // Send real email via Gmail API!
        // Format RFC 2822 email
        const utf8Subject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(composeSubject)))}?=`;
        const emailContent = [
          `To: ${composeTo}`,
          'Content-Type: text/plain; charset=utf-8',
          'MIME-Version: 1.0',
          `Subject: ${utf8Subject}`,
          '',
          composeBody
        ].join('\r\n');
        
        // safe base64url encoding
        const base64Raw = btoa(unescape(encodeURIComponent(emailContent)))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
          
        const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            raw: base64Raw
          })
        });
        
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error?.message || 'Gmail transmission failed.');
        }
        
        setSendSuccess(true);
        
        // Refresh live inbox to reflect state
        setTimeout(() => {
          setSendSuccess(false);
          setIsComposeOpen(false);
          setComposeTo('');
          setComposeSubject('');
          setComposeBody('');
          fetchLiveGmailData(accessToken);
        }, 2000);
      }
    } catch (err: any) {
      console.error(err);
      alert(`Could not send message: ${err.message || 'General network error'}`);
    } finally {
      setIsSending(false);
    }
  };

  const handleComposeReply = () => {
    if (!selectedEmail) return;
    setComposeTo(selectedEmail.senderEmail);
    setComposeSubject(selectedEmail.subject.startsWith('Re:') ? selectedEmail.subject : `Re: ${selectedEmail.subject}`);
    setComposeBody(`\n\nOn ${selectedEmail.date}, ${selectedEmail.sender} wrote:\n> ` + selectedEmail.body.split('\n').join('\n> '));
    setIsComposeOpen(true);
  };

  return (
    <section id="communications-hub" className="py-20 md:py-28 relative border-b border-brand-border bg-slate-950 text-white overflow-hidden">
      {/* Structural matrix style design elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Core Header Section of the Hub */}
        <div className="mb-14 text-left flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 border border-brand-primary/30 bg-brand-primary/10 py-1 px-3.5 text-[9px] tracking-[0.25em] font-mono text-brand-primary uppercase font-bold text-xs">
              <Mail size={12} />
              <span>GMAIL & COMMUNICATIONS PLUG</span>
            </div>
            
            <h2 className="font-display text-4xl font-normal italic text-white sm:text-5xl tracking-tight leading-tight">
              Live Gmail <span className="not-italic font-bold text-slate-100">Workflow Node.</span>
            </h2>
            <p className="max-w-2xl text-xs text-slate-400 font-sans tracking-wide leading-relaxed">
              Synchronise client responses directly. Authorize read/send access to coordinate on digital strategy, custom cost estimations, and security assessments straight from your workspace dashboard.
            </p>
          </div>

          {/* Sync Controls / Account Status */}
          <div className="flex flex-wrap items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 py-2.5 px-4 rounded-none font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-slate-300 font-semibold">{profileEmail || 'Authenticated Client'}</span>
                </div>
                <button 
                  onClick={handleDisconnect}
                  title="Disconnect account"
                  className="p-1 hover:text-brand-primary transition-colors text-slate-400"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <span className="flex items-center gap-2 bg-[#ea4335]/10 border border-[#ea4335]/25 text-[#ea4335] font-mono text-[9px] uppercase tracking-wider py-2 px-3 font-bold">
                <Lock size={10} />
                <span>Sandbox Mode (Offline)</span>
              </span>
            )}

            <button
              onClick={() => isAuthenticated ? fetchLiveGmailData(accessToken) : setIsComposeOpen(true)}
              className="border border-brand-primary/40 bg-brand-primary/10 hover:bg-brand-primary/20 hover:border-brand-primary text-brand-primary px-4 py-2.5 text-[9px] font-mono uppercase tracking-[0.2em] font-bold transition-all flex items-center gap-2"
            >
              {isAuthenticated ? (
                <>
                  <RefreshCw size={11} className={isLoading ? 'animate-spin' : ''} />
                  <span>Sync Inbox</span>
                </>
              ) : (
                <>
                  <Mail size={11} />
                  <span>Interactive Compose</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Layout Grid: Dashboard Sidebar + Active communication panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/10 bg-slate-900 overflow-hidden shadow-2xl relative min-h-[580px]">
          
          {/* Column 1: Connection & Workspace Manager (lg:col-span-4) */}
          <div className="lg:col-span-4 border-r border-white/10 flex flex-col justify-between p-6 bg-slate-900/60">
            
            {/* Connection Node Panel */}
            <div className="space-y-6">
              <span className="text-[9px] font-mono tracking-[0.25em] text-brand-primary uppercase block font-bold">Authentication Host</span>
              
              {!isAuthenticated ? (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Enable standard workspace automation. Authorize the digital agency dashboard node using your custom email parameters.
                  </p>

                  {/* Gmail Integration Credentials buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleGoogleSignIn}
                      className="w-full flex items-center justify-center gap-3.5 bg-white text-slate-900 font-bold border border-transparent hover:bg-slate-100 transition-colors py-3.5 px-4 text-xs tracking-wider"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                      </svg>
                      <span className="font-sans font-bold text-xs uppercase tracking-wider">Sync via Google Workspace</span>
                    </button>

                    <button
                      onClick={() => setShowTokenInput(!showTokenInput)}
                      className="w-full text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 font-mono text-[9px] uppercase tracking-widest py-2.5 transition-all"
                    >
                      {showTokenInput ? 'Hide Developer Input' : 'Sync Using Custom API Token'}
                    </button>
                  </div>

                  <AnimatePresence>
                    {showTokenInput && (
                      <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handleManualTokenSubmit}
                        className="space-y-3 bg-white/5 border border-white/10 p-4 relative"
                      >
                        <div className="absolute top-0 right-0 p-1 text-[8px] font-mono text-brand-primary uppercase bg-brand-primary/10 select-none">DEBUG</div>
                        <label htmlFor="manualToken" className="block text-[8px] uppercase tracking-widest font-mono text-slate-400 font-bold">Paste Access Token</label>
                        <div className="flex gap-2">
                          <input
                            type="password"
                            id="manualToken"
                            required
                            placeholder="ya29.a0AfH6S..."
                            value={manualToken}
                            onChange={(e) => setManualToken(e.target.value)}
                            className="bg-slate-950 border border-white/20 hover:border-brand-primary py-2 px-3 text-[10px] font-mono tracking-wider placeholder-slate-600 outline-none flex-1 focus:ring-1 focus:ring-brand-primary"
                          />
                          <button
                            type="submit"
                            className="bg-brand-primary text-white border border-brand-primary hover:bg-transparent hover:text-brand-primary px-3 text-[10px] font-mono font-bold uppercase transition-all"
                          >
                            Sync
                          </button>
                        </div>
                        <div className="pt-2 text-[8px] text-slate-400 leading-normal font-sans flex items-start gap-1.5">
                          <Info size={10} className="text-slate-300 shrink-0 mt-0.5" />
                          <span>Get active workspace tokens directly via the official <a href="https://developers.google.com/oauthplayground" target="_blank" rel="noreferrer" className="text-brand-primary hover:underline font-bold">Google Auth Playground</a> for testing emails securely.</span>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="rounded-none bg-[#34a853]/10 border border-[#34a853]/20 p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#34a853] shrink-0 stroke-[1.5]" size={18} />
                    <div className="space-y-1">
                      <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#34a853] font-bold">Securely Synchronized</h4>
                      <p className="text-[11px] text-slate-300 font-sans leading-normal">
                        Your workspace profile at <strong className="text-white font-mono">{profileEmail}</strong> is currently authenticated. Direct API routes are active.
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[9px] font-mono text-slate-400">
                    <span>STATUS: READY</span>
                    <button onClick={handleDisconnect} className="text-[#ea4335] hover:underline uppercase font-bold">Disconnect</button>
                  </div>
                </div>
              )}

              {/* Quick Template Composer Actions */}
              <div className="space-y-3 pt-4 border-t border-white/15">
                <span className="text-[9px] font-mono tracking-[0.25em] text-brand-primary uppercase block font-bold">Client Templates Launcher</span>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans pb-2">
                  Dispatch elite digital agency correspondence instantly using engineered layout templates.
                </p>
                <div className="space-y-2">
                  {AGENCY_TEMPLATES.map((tpl, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        applyTemplate(tpl);
                        setIsComposeOpen(true);
                      }}
                      className="w-full flex items-center justify-between p-3 border border-white/5 bg-slate-950/40 hover:bg-brand-primary/5 hover:border-brand-primary/50 text-left transition-all duration-200 group text-xs text-slate-200 font-sans"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText size={12} className="text-brand-primary" />
                        <span>{tpl.name}</span>
                      </div>
                      <ChevronRight size={11} className="text-slate-500 group-hover:text-brand-primary transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Matrix Status bottom widget */}
            <div className="pt-6 border-t border-white/10 font-mono text-[8px] text-slate-500 flex justify-between items-center select-none uppercase">
              <span>Node IP: Sandbox_Run</span>
              <span>Port: 3000 // UTC</span>
            </div>
          </div>

          {/* Column 2: Inbox Email Catalog Sidebar (lg:col-span-4) */}
          <div className="lg:col-span-4 border-r border-white/10 flex flex-col bg-slate-950/20">
            <div className="p-4 border-b border-white/10 bg-slate-900/40 flex justify-between items-center">
              <span className="text-[9px] font-mono tracking-[0.25em] text-slate-450 uppercase font-bold flex items-center gap-1.5">
                <Inbox size={11} className="text-brand-primary" />
                <span>COMMUNICATIONS FEED ({emails.length})</span>
              </span>
              <span className="text-[8px] px-2 py-0.5 bg-white/5 border border-white/10 font-mono text-slate-400 font-semibold select-none uppercase">
                {isDemoMode ? 'SIMULATOR ON' : 'LIVE API'}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[500px] divide-y divide-white/5">
              {emails.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500 h-64">
                  <Mail size={24} className="mb-3 text-slate-600 stroke-[1.2]" />
                  <p className="font-mono text-[10px] uppercase tracking-widest">Inbox Empty</p>
                  <p className="text-[11px] text-slate-500 mt-1 font-sans">No business contacts received.</p>
                </div>
              ) : (
                emails.map((msg) => {
                  const isSelected = selectedEmail?.id === msg.id;
                  const isSent = msg.labels.includes('SENT');
                  
                  return (
                    <button
                      key={msg.id}
                      onClick={() => setSelectedEmail(msg)}
                      className={`w-full p-4.5 text-left transition-all relative border-l-2 outline-none cursor-pointer block ${
                        isSelected 
                          ? 'bg-brand-primary/10 border-l-brand-primary' 
                          : 'hover:bg-white/5 border-l-transparent'
                      }`}
                    >
                      {/* Flag labels */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className={`text-[10px] font-mono truncate max-w-[150px] font-bold ${isSelected ? 'text-brand-primary' : 'text-slate-300'}`}>
                          {msg.sender}
                        </span>
                        <span className="text-[8px] font-mono text-slate-500 shrink-0">
                          {msg.date}
                        </span>
                      </div>
                      
                      <h4 className={`text-xs font-sans font-medium mb-1.5 truncate max-w-[230px] ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {msg.subject}
                      </h4>
                      
                      <p className="text-[11px] text-slate-450 font-sans line-clamp-1 truncate max-w-[230px]">
                        {msg.snippet}
                      </p>

                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {isSent && (
                          <span className="text-[8px] font-mono bg-blue-500/15 border border-blue-500/20 text-blue-400 px-1 py-0.2 select-none">SENT</span>
                        )}
                        {msg.labels.includes('STARRED') && (
                          <span className="text-[8px] font-mono bg-amber-500/15 border border-amber-500/20 text-amber-400 px-1 py-0.2 select-none">STARRED</span>
                        )}
                        {msg.labels.includes('UNREAD') && (
                          <span className="text-[8px] font-mono bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 px-1 py-0.2 select-none font-bold">UNREAD</span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Compose trigger */}
            <div className="p-4 border-t border-white/10 bg-slate-900/50">
              <button
                onClick={() => {
                  setComposeTo('');
                  setComposeSubject('');
                  setComposeBody('');
                  setIsComposeOpen(true);
                }}
                className="w-full border border-brand-primary bg-brand-primary text-slate-900 font-extrabold hover:bg-transparent hover:text-white hover:border-brand-primary py-3 px-4 text-[9px] font-mono uppercase tracking-[0.25em] transition-all cursor-pointer text-center"
              >
                Compose Communication
              </button>
            </div>
          </div>

          {/* Column 3: Active email reader & response workflow (lg:col-span-8) */}
          <div className="lg:col-span-4 flex flex-col bg-slate-950/40 relative">
            <div className="p-4 border-b border-white/10 bg-slate-900/40">
              <span className="text-[9px] font-mono tracking-[0.25em] text-slate-450 uppercase block font-bold">Communications Workspace</span>
            </div>

            {selectedEmail ? (
              <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto max-h-[500px]">
                
                {/* Meta details */}
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-4.5 text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-none border border-brand-primary/30 bg-brand-primary/10 text-brand-primary flex items-center justify-center font-mono font-bold text-xs select-none uppercase">
                          {selectedEmail.sender.substring(0, 1)}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white font-sans">{selectedEmail.sender}</p>
                          <p className="text-[10px] text-slate-450 font-mono font-medium">{selectedEmail.senderEmail}</p>
                        </div>
                      </div>
                      
                      <div className="text-[9px] font-mono text-slate-500 text-left sm:text-right">
                        <p>{selectedEmail.date}</p>
                        <p className="text-slate-650 pt-0.5">ID: {selectedEmail.id}</p>
                      </div>
                    </div>

                    <h3 className="font-display text-base font-bold italic text-white leading-snug tracking-tight">
                      {selectedEmail.subject}
                    </h3>
                  </div>

                  {/* Body Content */}
                  <div className="text-xs text-slate-300 font-sans tracking-wide leading-relaxed whitespace-pre-wrap text-left py-2 font-light">
                    {selectedEmail.body}
                  </div>
                </div>

                {/* Reply Controls */}
                <div className="mt-8 pt-6 border-t border-white/15 text-left">
                  <span className="text-[8px] font-mono tracking-[0.25em] text-slate-500 uppercase block font-bold mb-4">Tactical Reply Pipeline</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleComposeReply}
                      className="border border-white/20 hover:border-brand-primary hover:bg-brand-primary/10 text-white px-5 py-2.5 text-[9px] font-mono uppercase tracking-[0.25em] font-bold transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Send size={10} className="text-brand-primary" />
                      <span>Reply to client</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        applyTemplate(AGENCY_TEMPLATES[0]);
                        setComposeTo(selectedEmail.senderEmail);
                        setIsComposeOpen(true);
                      }}
                      className="border border-brand-primary/20 bg-brand-primary/5 hover:border-brand-primary hover:text-brand-primary text-slate-300 px-5 py-2.5 text-[9px] font-mono uppercase tracking-[0.25em] font-medium transition-all cursor-pointer"
                    >
                      Send Blueprint
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-550">
                <BookOpen size={24} className="mb-3 text-slate-700 stroke-[1.2]" />
                <p className="font-mono text-[10px] uppercase tracking-widest">Active Workspace Empty</p>
                <p className="text-[11px] text-slate-500 mt-1 font-sans">Select a communication thread to begin drafting responses.</p>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Compose/Reply Email Modal Overlay */}
      <AnimatePresence>
        {isComposeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-slate-900 border border-white/15 shadow-2xl relative overflow-hidden"
            >
              {/* Gold borders */}
              <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-brand-primary"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-brand-primary"></div>

              {/* Modal header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10 bg-slate-950/60">
                <div className="flex items-center gap-2.5">
                  <Mail className="text-brand-primary animate-pulse" size={15} />
                  <span className="font-display text-md italic font-semibold text-white tracking-tight">Compose Client Response</span>
                </div>
                <button
                  onClick={() => setIsComposeOpen(false)}
                  className="p-1 hover:text-brand-primary transition-colors text-slate-400 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Compose message container */}
              <AnimatePresence mode="wait">
                {!sendSuccess ? (
                  <form onSubmit={sendEmail} className="p-6 space-y-4 text-left">
                    
                    {/* Recipient Input */}
                    <div>
                      <label htmlFor="composeTo" className="block text-[8px] uppercase tracking-widest font-mono text-slate-450 font-bold mb-1.5">Recipient Work Email</label>
                      <input
                        type="email"
                        id="composeTo"
                        required
                        placeholder="client@entity.com"
                        value={composeTo}
                        onChange={(e) => setComposeTo(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 hover:border-brand-primary py-2.5 px-3.5 text-xs font-mono tracking-wide placeholder-slate-650 text-white outline-none transition-all focus:ring-1 focus:ring-brand-primary"
                      />
                    </div>

                    {/* Subject Input */}
                    <div>
                      <label htmlFor="composeSubject" className="block text-[8px] uppercase tracking-widest font-mono text-slate-450 font-bold mb-1.5">Communication Subject</label>
                      <input
                        type="text"
                        id="composeSubject"
                        required
                        placeholder="Proposal Briefing Overview"
                        value={composeSubject}
                        onChange={(e) => setComposeSubject(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 hover:border-brand-primary py-2.5 px-3.5 text-xs font-mono tracking-wide placeholder-slate-650 text-white outline-none transition-all focus:ring-1 focus:ring-brand-primary"
                      />
                    </div>

                    {/* Quick helper Templates inside the compose panel */}
                    <div className="pb-1">
                      <span className="block text-[8px] uppercase tracking-widest font-mono text-slate-450 font-bold mb-1.5">Insert Template Quick Snippet</span>
                      <div className="flex gap-2 flex-wrap">
                        {AGENCY_TEMPLATES.map((tpl, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => applyTemplate(tpl)}
                            className="text-[9px] font-mono border border-white/10 bg-white/5 hover:border-brand-primary hover:text-white px-2.5 py-1 transition-all"
                          >
                            + {tpl.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Email Message Content Textarea */}
                    <div>
                      <label htmlFor="composeBody" className="block text-[8px] uppercase tracking-widest font-mono text-slate-450 font-bold mb-1.5">Email Message Payload (Text)</label>
                      <textarea
                        id="composeBody"
                        required
                        placeholder="Draft content..."
                        rows={8}
                        value={composeBody}
                        onChange={(e) => setComposeBody(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 hover:border-brand-primary py-3 px-3.5 text-xs font-sans tracking-wide placeholder-slate-650 text-slate-200 outline-none transition-all focus:ring-1 focus:ring-brand-primary h-48 focus:ring-brand-primary/20"
                      />
                    </div>

                    {/* Send client communication */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <span className="text-[8px] font-mono text-slate-500">
                        {isDemoMode ? 'SIMULATOR TRANSMISSION' : 'WORKPLACE SECURE SEND'}
                      </span>
                      
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setIsComposeOpen(false)}
                          className="border border-white/15 hover:bg-white/5 text-slate-400 hover:text-white px-5 py-2.5 text-[9px] font-mono uppercase tracking-[0.2em] transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                        
                        <button
                          type="submit"
                          disabled={isSending}
                          className="border border-brand-primary bg-brand-primary text-slate-900 font-extrabold px-6 py-2.5 text-[9px] font-mono uppercase tracking-[0.25em] hover:bg-transparent hover:text-brand-primary transition-all duration-300 cursor-pointer flex items-center gap-2"
                        >
                          {isSending ? (
                            <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                          ) : (
                            <>
                              <span>Transmit Email</span>
                              <Send size={10} />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </form>
                ) : (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-12 flex flex-col items-center justify-center text-center bg-slate-950/40"
                  >
                    <div className="flex h-12 w-12 items-center justify-center border border-[#34a853]/40 bg-[#34a853]/10 text-[#34a853] mb-6">
                      <CheckCircle2 size={24} className="stroke-[1.5]" />
                    </div>
                    <h3 className="font-display text-xl italic font-semibold text-white mb-2">Message Dispatched</h3>
                    <p className="text-slate-400 max-w-sm text-xs leading-relaxed font-sans mb-4">
                      Your business email has been successfully queue and sent to <span className="text-white font-mono font-bold">{composeTo}</span> via Google Auth SMTP layer.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
