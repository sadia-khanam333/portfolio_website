import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Braces, CheckCircle2, Circle, Clock3, Copy, Database, LoaderCircle, Play, Send, Server, TerminalSquare } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { TechLogo, techLogoList } from '@/components/TechLogos';

type Endpoint = 'skills' | 'projects' | 'profile';

type ApiResponse = {
  status: number;
  route: string;
  latency: string;
  payload: Record<string, unknown>;
};

const responses: Record<Endpoint, ApiResponse> = {
  skills: {
    status: 200,
    route: 'GET /api/skills',
    latency: '42ms',
    payload: { stack: ['.NET Core', 'React', 'Angular'], focus: 'Enterprise APIs', available: true },
  },
  projects: {
    status: 200,
    route: 'GET /api/projects',
    latency: '58ms',
    payload: { count: 3, featured: ['SupplyChain ERP', 'NexusRetailERP', 'MERN Commerce'], shipped: true },
  },
  profile: {
    status: 200,
    route: 'GET /api/profile',
    latency: '31ms',
    payload: { name: 'Tahmina Khanam', role: 'Full Stack .NET Developer', openToWork: true },
  },
};

const endpoints: { id: Endpoint; label: string; description: string }[] = [
  { id: 'skills', label: '/api/skills', description: 'technology stack' },
  { id: 'projects', label: '/api/projects', description: 'featured work' },
  { id: 'profile', label: '/api/profile', description: 'developer profile' },
];

function prettyJson(response: ApiResponse): string {
  return JSON.stringify(response.payload, null, 2);
}

// Tokenises a (possibly partially typed) JSON string so keys, strings and literals get their own colour.
const jsonToken = /("(?:\\.|[^"\\])*(?:"|$)(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?)/g;

function highlightJson(text: string) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  jsonToken.lastIndex = 0;
  while ((match = jsonToken.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    const tone = match[2] ? 'text-accent-200' : token.startsWith('"') ? 'text-emerald-300' : /^(true|false|null)$/.test(token) ? 'text-amber-300' : 'text-violet-300';
    nodes.push(<span key={match.index} className={tone}>{token}</span>);
    last = match.index + token.length;
    if (token.length === 0) jsonToken.lastIndex++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function ApiTerminal() {
  const [selected, setSelected] = useState<Endpoint>('skills');
  const [loading, setLoading] = useState(false);
  const [typedLength, setTypedLength] = useState(0);
  const [copied, setCopied] = useState(false);
  const response = responses[selected];
  const json = useMemo(() => prettyJson(response), [response]);
  const isComplete = !loading && typedLength >= json.length;

  useEffect(() => {
    if (loading) {
      setTypedLength(0);
      const timer = window.setTimeout(() => setLoading(false), 1000);
      return () => window.clearTimeout(timer);
    }
    if (typedLength < json.length) {
      const timer = window.setTimeout(() => setTypedLength((length) => Math.min(length + 2, json.length)), 12);
      return () => window.clearTimeout(timer);
    }
  }, [json, loading, typedLength]);

  const runEndpoint = (endpoint: Endpoint) => {
    if (endpoint === selected && (loading || isComplete)) {
      setLoading(true);
      return;
    }
    setSelected(endpoint);
    setLoading(true);
  };

  const handleCopy = async () => {
    await navigator.clipboard?.writeText(json);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <section id="skills" className="relative overflow-hidden py-28 lg:py-36">
      <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[140px] -z-10" />
      <div className="section-pad mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="mb-12 max-w-2xl">
          <motion.span variants={fadeUp} className="eyebrow">02 — API Lab</motion.span>
          <motion.h2 variants={fadeUp} className="mt-4 font-display text-3xl font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-4xl lg:text-5xl">
            Explore the <span className="text-gradient">developer behind the API.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-slate-400">Tap an endpoint. Watch the response arrive. Then see the data come alive.</motion.p>
        </motion.div>

        <LayoutGroup>
          <motion.div layout className="overflow-hidden rounded-2xl border border-white/10 bg-[#080b10] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8),0_0_80px_-40px_rgba(34,211,238,0.35),inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="flex flex-wrap items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3 sm:px-5">
              <div className="flex gap-1.5"><Circle className="h-3 w-3 fill-rose-400 text-rose-400" /><Circle className="h-3 w-3 fill-amber-300 text-amber-300" /><Circle className="h-3 w-3 fill-emerald-400 text-emerald-400" /></div>
              <div className="hidden h-4 w-px bg-white/10 sm:block" />
              <div className="flex items-center gap-2 text-xs text-slate-400"><TerminalSquare className="h-3.5 w-3.5 text-accent" /> tahmina-api / explorer</div>
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-emerald/20 bg-emerald/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald" /> LIVE</span>
            </div>

            <div className="grid min-h-[520px] lg:grid-cols-[260px_1fr]">
              <aside className="border-b border-white/10 bg-white/[0.015] p-4 lg:border-b-0 lg:border-r">
                <div className="mb-4 flex items-center gap-2 px-2 text-[10px] font-semibold tracking-widest text-slate-600 uppercase"><Server className="h-3 w-3" /> Endpoints</div>
                <div className="space-y-2">
                  {endpoints.map((endpoint) => {
                    const active = endpoint.id === selected;
                    return <button key={endpoint.id} onClick={() => runEndpoint(endpoint.id)} className={`group w-full rounded-xl border p-3 text-left transition-all ${active ? 'border-accent/30 bg-accent/10' : 'border-transparent hover:border-white/10 hover:bg-white/5'}`}>
                      <div className="flex items-center gap-2"><span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-accent shadow-[0_0_8px_#22d3ee]' : 'bg-slate-700 group-hover:bg-slate-500'}`} /><span className={`font-mono text-sm ${active ? 'text-accent-200' : 'text-slate-400'}`}>{endpoint.label}</span></div>
                      <p className="mt-1 pl-3.5 text-[11px] text-slate-600">{endpoint.description}</p>
                    </button>;
                  })}
                </div>
                <div className="mt-8 rounded-xl border border-white/5 bg-black/20 p-3"><div className="flex items-center gap-2 text-xs text-slate-500"><Database className="h-3.5 w-3.5 text-emerald" /> database connected</div><div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5"><motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="h-full w-1/2 bg-gradient-to-r from-transparent via-emerald to-transparent" /></div></div>
              </aside>

              <div className="flex flex-col p-4 sm:p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><div className="flex items-center gap-3"><span className="rounded-md bg-emerald/10 px-2 py-1 font-mono text-xs font-semibold text-emerald-300">GET</span><span className="font-mono text-sm text-white">{response.route.replace('GET ', '')}</span></div><p className="mt-2 text-xs text-slate-600">Accept: application/json</p></div><button onClick={() => runEndpoint(selected)} className="inline-flex items-center gap-2 rounded-lg border border-accent/20 bg-accent/10 px-3 py-2 text-xs font-medium text-accent-200 transition-colors hover:bg-accent/20"><Play className="h-3 w-3 fill-current" /> Run request</button></div>
                <div className="relative flex-1 rounded-xl border border-white/5 bg-[#05070a] p-4 font-mono text-xs leading-6 sm:p-5 sm:text-sm"><div className="mb-3 flex items-center justify-between border-b border-white/5 pb-3 text-[10px] text-slate-600"><span className="flex items-center gap-1.5"><Braces className="h-3 w-3" /> response.json</span><button onClick={handleCopy} className="flex items-center gap-1.5 transition-colors hover:text-white"><Copy className="h-3 w-3" /> {copied ? 'copied' : 'copy'}</button></div><AnimatePresence mode="wait"><motion.div key={`${selected}-${loading}`} layout className="min-h-[180px]">{loading ? <div className="flex items-center gap-3 py-8 text-slate-500"><LoaderCircle className="h-4 w-4 animate-spin text-accent" /> <span>Calling {response.route}...</span><span className="animate-pulse">_</span></div> : <pre className="whitespace-pre-wrap text-slate-500">{highlightJson(json.slice(0, typedLength))}{!isComplete && <span className="animate-pulse text-accent">▋</span>}</pre>}</motion.div></AnimatePresence>{isComplete && <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-3 text-[11px] text-slate-600"><CheckCircle2 className="h-3.5 w-3.5 text-emerald" /> <span className="text-emerald-300">{response.status} OK</span><span>•</span><Clock3 className="h-3.5 w-3.5" /> {response.latency}<span className="ml-auto flex items-center gap-1"><Send className="h-3 w-3" /> response complete</span></div>}</div>

                <AnimatePresence mode="wait">
                  {isComplete && <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-5 rounded-xl border border-white/5 bg-white/[0.03] p-4"><div className="mb-3 flex items-center gap-2 text-[10px] font-semibold tracking-widest text-slate-500 uppercase"><motion.span layoutId="morph-icon"><Braces className="h-3.5 w-3.5 text-accent" /></motion.span> Rendered data</div><div className="flex flex-wrap gap-2">{selected === 'skills' && techLogoList.map((tech) => <motion.div layout key={tech.name} initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .04 * techLogoList.indexOf(tech) }} className="tech-logo-chip"><TechLogo tech={tech.tech} className="h-6 w-6" /><span>{tech.name}</span></motion.div>)}{selected === 'projects' && ['SupplyChain ERP', 'NexusRetailERP', 'MERN Commerce'].map((project, index) => <motion.div layout key={project} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .1 }} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300"><span className="mr-2 text-accent">0{index + 1}</span>{project}</motion.div>)}{selected === 'profile' && <><div className="rounded-lg border border-emerald/20 bg-emerald/10 px-3 py-2 text-xs text-emerald-200">Available for collaborations</div><div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">.NET specialist</div></>}</div></motion.div>}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
