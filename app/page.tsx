'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
}

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);

  // Particle network background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, animId = 0;
    let particles: Particle[] = [];

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }

    function initParticles(n: number) {
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(0,212,255,${0.15 * (1 - dist / 120)})`;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }
      particles.forEach(p => {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(0,212,255,0.5)';
        ctx!.fill();
      });
      animId = requestAnimationFrame(draw);
    }

    resize();
    initParticles(70);
    draw();

    const onResize = () => { resize(); initParticles(70); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  // Typewriter effect
  useEffect(() => {
    const titles = [
      'Full Stack Developer',
      'GenAI Engineer',
      'LangChain / LangGraph Architect',
      'RAG Pipeline Engineer',
      'AWS Cloud Practitioner',
    ];
    let ti = 0, ci = 0, deleting = false;
    let timerId: ReturnType<typeof setTimeout>;

    function type() {
      const el = typewriterRef.current;
      if (!el) return;
      const current = titles[ti];
      if (!deleting) {
        ci++;
        el.innerHTML = current.slice(0, ci) + '<span class="cursor"></span>';
        if (ci === current.length) {
          deleting = true;
          timerId = setTimeout(type, 1800);
          return;
        }
      } else {
        ci--;
        el.innerHTML = current.slice(0, ci) + '<span class="cursor"></span>';
        if (ci === 0) { deleting = false; ti = (ti + 1) % titles.length; }
      }
      timerId = setTimeout(type, deleting ? 40 : 75);
    }

    timerId = setTimeout(type, 500);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="bg-canvas" />

      {/* NAV */}
      <nav>
        <div className="nav-logo">SV<span>.</span>dev</div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-eyebrow">Available for opportunities</div>
        <h1 className="hero-name">Sukesh Varma<br /><span className="last">Sangaraju</span></h1>
        <div className="hero-title" ref={typewriterRef}><span className="cursor" /></div>
        <p className="hero-desc">
          Full Stack Developer &amp; GenAI Engineer with <strong style={{ color: 'var(--text)' }}>6+ years</strong> building
          scalable web platforms, intelligent AI agents, and enterprise eCommerce systems. Based in{' '}
          <strong style={{ color: 'var(--text)' }}>Kuala Lumpur, Malaysia</strong>.
        </p>
        <div className="hero-ctas">
          <a href="#projects" className="btn-primary">View Projects ⟩</a>
          <a href="#contact" className="btn-outline">Get in Touch</a>
        </div>
        <div className="hero-stats">
          <div><div className="stat-num">6+</div><div className="stat-label">Years Experience</div></div>
          <div><div className="stat-num">5</div><div className="stat-label">Companies</div></div>
          <div><div className="stat-num">80–90%</div><div className="stat-label">NLQ Accuracy</div></div>
          <div><div className="stat-num">♾</div><div className="stat-label">Curiosity</div></div>
        </div>
        <div className="scroll-hint">
          <span>scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      <div className="glow-line" />

      {/* ABOUT */}
      <section id="about">
        <div className="section-label">// 01 — about me</div>
        <h2 className="section-title">Building Intelligent<br /><em>Systems at Scale</em></h2>
        <div className="about-grid">
          <div className="about-photo-wrap">
            <div className="about-photo-frame">
              <div className="initials-avatar">SV</div>
            </div>
            <div className="about-corner" />
          </div>
          <div className="about-text">
            <p>I&apos;m a <strong>Full Stack Developer and GenAI Engineer</strong> specialising in the intersection of modern web engineering and applied AI. From multi-agent LLM systems to enterprise eCommerce platforms, I architect solutions that solve real business problems at scale.</p>
            <p>My work spans <strong>RAG pipelines, LangChain/LangGraph agents, AWS cloud infrastructure</strong>, and scalable React/Node.js applications — with production deployments serving banking, life sciences, and eCommerce clients across Asia and globally.</p>
            <p>Currently at <strong>Soft Reflexes Sdn Bhd, Kuala Lumpur</strong>, where I lead GenAI initiatives and digital banking platform development.</p>
            <div className="domain-chips">
              {['eCommerce', 'Digital Banking', 'Life Sciences', 'GenAI / LLMOps', 'Cloud Architecture'].map(d => (
                <div key={d} className="domain-chip">{d}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SKILLS */}
      <section id="skills">
        <div className="section-label">// 02 — technical skills</div>
        <h2 className="section-title">The <em>Stack</em></h2>
        <div className="skills-grid">

          <div className="skill-card">
            <div className="skill-icon">🤖</div>
            <div className="skill-cat">Generative AI &amp; Agents</div>
            <div className="skill-tags">
              {['LangChain', 'LangGraph', 'Multi-Agent Systems', 'MCP / FastMCP', 'RAG Pipelines', 'Semantic Caching'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="skill-card">
            <div className="skill-icon">🧠</div>
            <div className="skill-cat">Prompt &amp; Context Engineering</div>
            <div className="skill-tags">
              {['Chain of Thought', 'Tree of Thought', 'Self-Consistency', 'Schema-Aware Injection', 'Dynamic Schema Pruning'].map(t => (
                <span key={t} className="tag gold">{t}</span>
              ))}
            </div>
          </div>

          <div className="skill-card">
            <div className="skill-icon">📊</div>
            <div className="skill-cat">LLMOps &amp; Evaluation</div>
            <div className="skill-tags">
              {['RAG Triad', 'MLflow', 'LangSmith', 'Precision@K', 'nDCG', 'Guardrails'].map(t => (
                <span key={t} className="tag purple">{t}</span>
              ))}
            </div>
          </div>

          <div className="skill-card">
            <div className="skill-icon">⚙️</div>
            <div className="skill-cat">Backend Development</div>
            <div className="skill-tags">
              {['Node.js', 'Nest.js', 'FastAPI', 'Python Async', 'Microservices', 'RESTful APIs'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="skill-card">
            <div className="skill-icon">🎨</div>
            <div className="skill-cat">Frontend Development</div>
            <div className="skill-tags">
              {['React.js', 'Next.js', 'TypeScript', 'Angular.js', 'SCSS'].map(t => (
                <span key={t} className="tag green">{t}</span>
              ))}
            </div>
          </div>

          <div className="skill-card">
            <div className="skill-icon">🗄️</div>
            <div className="skill-cat">Databases</div>
            <div className="skill-tags">
              <span className="tag">PostgreSQL</span>
              <span className="tag">Pinecone</span>
              <span className="tag">Neo4j</span>
              <span className="tag gold">Cypher</span>
              <span className="tag">DynamoDB</span>
              <span className="tag">MSSQL</span>
            </div>
          </div>

          <div className="skill-card">
            <div className="skill-icon">☁️</div>
            <div className="skill-cat">Cloud &amp; DevOps</div>
            <div className="skill-tags">
              {['AWS Bedrock', 'AgentCore', 'ECS Fargate', 'Lambda', 'Docker', 'Terraform', 'GitHub Actions'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="skill-card">
            <div className="skill-icon">🛒</div>
            <div className="skill-cat">eCommerce Platforms</div>
            <div className="skill-tags">
              {['Oracle Commerce Cloud', 'OSF', 'CPQ Integration', 'Braintree'].map(t => (
                <span key={t} className="tag gold">{t}</span>
              ))}
            </div>
          </div>

        </div>
      </section>

      <div className="divider" />

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-label">// 03 — key projects</div>
        <h2 className="section-title">Selected <em>Work</em></h2>
        <div className="projects-grid">

          <div className="project-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="project-num">PROJ-01</div>
              <span className="project-badge badge-ai">GenAI</span>
            </div>
            <div className="project-title">Multi-Agent Natural Language Query System</div>
            <p className="project-desc">Designed a multi-agent system using LangChain Agents and LangGraph (Planner → SQL Writer → Validator → Explainer) enabling business users to query live e-commerce databases in plain English — no SQL required.</p>
            <div className="project-result">⊸ 80–90%+ accuracy on NLQ benchmarks with schema-aware guardrails</div>
            <div className="project-stack">
              <span className="tag">LangChain</span>
              <span className="tag">LangGraph</span>
              <span className="tag green">FastAPI</span>
              <span className="tag">RDS PostgreSQL</span>
              <span className="tag">AWS AgentCore</span>
            </div>
          </div>

          <div className="project-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="project-num">PROJ-02</div>
              <span className="project-badge badge-data">GraphRAG</span>
            </div>
            <div className="project-title">Clinical Trials Hybrid Knowledge Base</div>
            <p className="project-desc">Built a GraphRAG system combining Pinecone (semantic vector search) with Neo4j (entity relationship graph) to enable multi-hop medical reasoning across unstructured trial PDFs and structured metadata.</p>
            <div className="project-result">⊸ Evidence-backed answers via Cypher queries over clinical entity graphs</div>
            <div className="project-stack">
              <span className="tag purple">Neo4j</span>
              <span className="tag purple">Pinecone</span>
              <span className="tag">AWS Bedrock</span>
              <span className="tag">Lambda</span>
              <span className="tag">S3</span>
            </div>
          </div>

          <div className="project-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="project-num">PROJ-03</div>
              <span className="project-badge badge-ai">RAG</span>
            </div>
            <div className="project-title">Distributed Ingestion Pipeline for RAG</div>
            <p className="project-desc">Engineered an async end-to-end document pipeline converting unstructured PDFs to semantic chunks using Docling and PyMuPDF — with PII redaction, NER, and key-phrase extraction before Amazon Titan embedding generation.</p>
            <div className="project-result">⊸ Thousands of documents processed concurrently via ECS Fargate workers</div>
            <div className="project-stack">
              <span className="tag">Docling</span>
              <span className="tag">PyMuPDF</span>
              <span className="tag">ECS Fargate</span>
              <span className="tag">DynamoDB</span>
              <span className="tag gold">Amazon Titan</span>
            </div>
          </div>

          <div className="project-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="project-num">PROJ-04</div>
              <span className="project-badge badge-fullstack">FinTech</span>
            </div>
            <div className="project-title">Digital Banking &amp; Government eCommerce Platforms</div>
            <p className="project-desc">Developed scalable full-stack banking features including POS terminal integration, QR merchant payments, mortgage repricing journeys, and the Sama Sama Lokal (SSL) marketplace with RBAC admin panels.</p>
            <div className="project-result">⊸ Automated SFTP/cron settlement file workflows for financial reconciliation</div>
            <div className="project-stack">
              <span className="tag green">React.js</span>
              <span className="tag green">Next.js</span>
              <span className="tag">Node.js</span>
              <span className="tag">Nest.js</span>
              <span className="tag">TypeScript</span>
            </div>
          </div>

          <div className="project-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="project-num">PROJ-05</div>
              <span className="project-badge badge-ecomm">eCommerce</span>
            </div>
            <div className="project-title">B2B &amp; B2C Enterprise eCommerce Solutions</div>
            <p className="project-desc">Built responsive Oracle Commerce Cloud storefronts for global enterprise clients. Integrated CPQ functionalities, Braintree payment gateways, and custom Server Side Extensions to extend OCC platform capabilities.</p>
            <div className="project-result">⊸ Multi-site architecture across global enterprise deployments</div>
            <div className="project-stack">
              <span className="tag gold">OCC</span>
              <span className="tag gold">OSF</span>
              <span className="tag green">React.js</span>
              <span className="tag">Node.js SSE</span>
              <span className="tag gold">Braintree</span>
            </div>
          </div>

        </div>
      </section>

      <div className="divider" />

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="section-label">// 04 — experience</div>
        <h2 className="section-title">Career <em>Timeline</em></h2>
        <div className="timeline">

          <div className="timeline-item">
            <div className="timeline-meta">
              <span className="timeline-company">Soft Reflexes Sdn Bhd</span>
              <span className="timeline-location">📍 Kuala Lumpur, Malaysia</span>
              <span className="timeline-period">Sep 2022 — Present</span>
            </div>
            <div className="timeline-role">Full Stack Developer &amp; GenAI Engineer</div>
            <ul className="timeline-bullets">
              <li>Led design of multi-agent NLQ system achieving 80–90%+ benchmark accuracy on eCommerce data queries</li>
              <li>Built GraphRAG clinical trials knowledge base using Pinecone + Neo4j for life sciences client</li>
              <li>Engineered distributed async RAG ingestion pipeline processing thousands of docs concurrently on ECS Fargate</li>
              <li>Developed digital banking features: POS integration, QR merchant payments, mortgage repricing journeys</li>
              <li>Contributed to SSL government eCommerce marketplace: catalogue, storefronts, RBAC admin panels</li>
            </ul>
          </div>

          <div className="timeline-item">
            <div className="timeline-meta">
              <span className="timeline-company">Digisprint Solutions</span>
              <span className="timeline-location">📍 Hyderabad, India</span>
              <span className="timeline-period">Nov 2021 — Aug 2022</span>
            </div>
            <div className="timeline-role">eCommerce Developer</div>
            <ul className="timeline-bullets">
              <li>Developed B2B &amp; B2C eCommerce storefronts with CPQ, multi-site architecture, and payment integration on Oracle Commerce Cloud</li>
              <li>Integrated Braintree payment gateway and third-party services for enterprise retail clients</li>
            </ul>
          </div>

          <div className="timeline-item">
            <div className="timeline-meta">
              <span className="timeline-company">Mastek</span>
              <span className="timeline-location">📍 Chennai, India</span>
              <span className="timeline-period">May 2021 — Nov 2021</span>
            </div>
            <div className="timeline-role">Frontend Developer</div>
            <ul className="timeline-bullets">
              <li>Built enterprise eCommerce storefronts with CPQ capabilities and multi-site architecture using OCC &amp; OSF</li>
            </ul>
          </div>

          <div className="timeline-item">
            <div className="timeline-meta">
              <span className="timeline-company">SBrain Online Innovations</span>
              <span className="timeline-location">📍 Hyderabad, India</span>
              <span className="timeline-period">Aug 2019 — May 2021</span>
            </div>
            <div className="timeline-role">Web Developer</div>
            <ul className="timeline-bullets">
              <li>Developed equipment eCommerce pages, catalogs, and Server Side Extensions using OCC, KnockoutJS, Node.js</li>
              <li>Built dynamic product catalog pages and custom SSE business logic for B2B equipment marketplace</li>
            </ul>
          </div>

        </div>
      </section>

      <div className="divider" />

      {/* CONTACT */}
      <section id="contact">
        <div className="section-label">// 05 — contact</div>
        <h2 className="section-title">Let&apos;s <em>Connect</em></h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: '480px', marginBottom: '2rem' }}>
          Open to full-time roles, freelance projects, and interesting collaborations in GenAI engineering and full-stack development.
        </p>
        <div className="contact-grid">
          <div>
            <div className="contact-links">
              <a href="mailto:sukeshvarmacse@gmail.com" className="contact-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Email Me
              </a>
              <a href="https://www.linkedin.com/in/sukesh-varma-sangaraju-0ab94415a" target="_blank" rel="noopener noreferrer" className="contact-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn Profile
              </a>
              <a href="https://github.com/sukeshcse" target="_blank" rel="noopener noreferrer" className="contact-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
          <div className="contact-block">
            <div>
              <div className="contact-label">Location</div>
              <div className="contact-value">Kuala Lumpur, Malaysia</div>
            </div>
            <div>
              <div className="contact-label">Availability</div>
              <div className="contact-value" style={{ color: 'var(--green)' }}>✓ Open to Opportunities</div>
            </div>
            <div>
              <div className="contact-label">Focus Areas</div>
              <div className="contact-value" style={{ fontSize: '0.85rem' }}>GenAI Engineering · Full Stack Development · LLMOps · Cloud Architecture</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2025 Sukesh Varma Sangaraju · Built with ❤️ · KL, Malaysia</p>
        <p style={{ color: 'var(--cyan)', fontSize: '0.68rem' }}>Full Stack Developer · GenAI Engineer</p>
      </footer>
    </>
  );
}
