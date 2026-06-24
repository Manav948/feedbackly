'use client';

import React, { useEffect, useRef, useState } from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  ArrowRight, 
  ListFilter, 
  TrendingUp, 
  Map, 
  CheckCircle2 
} from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  targetNodeIndex: number;
  progress: number;
  speed: number;
}

export default function FeedbackFlowMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Customer Feedback',
      description: 'Incoming raw suggestions gathered anonymously via your public board link.',
      icon: MessageSquare,
    },
    {
      title: 'AI Categorization',
      description: 'Automatically tagged, grouped, and sanitized using NLP classifications.',
      icon: Sparkles,
    },
    {
      title: 'Priority Scoring',
      description: 'Scored by community upvotes and customer value parameters.',
      icon: TrendingUp,
    },
    {
      title: 'Roadmap Planning',
      description: 'Mapped to public roadmaps or internal feature backlogs.',
      icon: Map,
    },
    {
      title: 'Done & Shipped',
      description: 'Marked complete, notifying stakeholders and closing the feedback loop.',
      icon: CheckCircle2,
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Node locations
    const nodes: { x: number; y: number }[] = [];
    const particles: Particle[] = [];
    const maxParticles = 25;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Initialize particle pool
    const createParticle = (): Particle => {
      const sourceIndex = Math.floor(Math.random() * (steps.length - 1));
      return {
        x: 0,
        y: 0,
        targetNodeIndex: sourceIndex + 1,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
      };
    };

    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    let time = 0;
    const animate = () => {
      time += 0.015;
      ctx.fillStyle = '#090909';
      ctx.fillRect(0, 0, width, height);

      // Re-calculate node positions based on current viewport size
      nodes.length = 0;
      const verticalPadding = height * 0.5;
      const horizontalSpacing = width / (steps.length + 1);

      for (let i = 0; i < steps.length; i++) {
        nodes.push({
          x: horizontalSpacing * (i + 1),
          y: verticalPadding,
        });
      }

      // Draw background connection paths (dashed lines)
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = '#232323';
      ctx.beginPath();
      for (let i = 0; i < nodes.length - 1; i++) {
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[i + 1].x, nodes[i + 1].y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw flow particles
      particles.forEach((p) => {
        const sourceNode = nodes[p.targetNodeIndex - 1];
        const targetNode = nodes[p.targetNodeIndex];

        if (sourceNode && targetNode) {
          p.progress += p.speed;
          if (p.progress >= 1.0) {
          
            p.progress = 0;
            if (p.targetNodeIndex < nodes.length - 1) {
              p.targetNodeIndex += 1;
            } else {
              p.targetNodeIndex = 1;
            }
          }

          // Linear interpolation with a slight sine wave vertical offset
          const dx = targetNode.x - sourceNode.x;
          const dy = targetNode.y - sourceNode.y;
          p.x = sourceNode.x + dx * p.progress;
          p.y = sourceNode.y + dy * p.progress + Math.sin(p.progress * Math.PI) * -12;

          // Render glowing particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#FAFAFA';
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#FAFAFA';
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      // Draw interactive nodes (pulsing indicator circles on the path)
      nodes.forEach((node, i) => {
        const isActive = activeStep === i;
        const radius = isActive ? 8 : 4;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? '#FFFFFF' : '#232323';
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = isActive ? '#FAFAFA' : '#111111';
        ctx.fill();
        ctx.stroke();

        // Pulsing glow for active node
        if (isActive) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + Math.sin(time * 3) * 3 + 3, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(250, 250, 250, 0.2)';
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Auto-advance active node step every 4.5 seconds
    const intervalId = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
    };
  }, [steps.length, activeStep]);

  return (
    <section className="py-20 relative border-t border-b border-[#232323] bg-[#090909] overflow-hidden">
   
      <div className="absolute inset-0 bg-grid opacity-[0.08] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-lg border border-[#232323] bg-[#111111] px-3.5 py-1 text-xs font-medium uppercase tracking-[0.15em] text-gray-400 mb-3">
            Lifecycle Engine
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            The Feedback Flow
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            From raw anonymous submission to active feature completion, watch the loop in action.
          </p>
        </div>

        <div className="relative h-[160px] md:h-[200px] w-full rounded-2xl border border-[#232323] bg-[#111111]/30 overflow-hidden mb-12">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeStep === i;

            return (
              <button
                key={step.title}
                onClick={() => setActiveStep(i)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col h-full ${
                  isActive
                    ? 'bg-[#111111] border-[#FAFAFA] shadow-[0_8px_24px_rgba(255,255,255,0.02)]'
                    : 'bg-[#111111]/45 border-[#232323] hover:border-white/15'
                }`}
              >
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center border mb-4 transition-colors ${
                  isActive ? 'bg-[#FAFAFA] border-[#FAFAFA] text-black' : 'bg-[#1a1a1a] border-[#232323] text-gray-400'
                }`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <h3 className={`text-sm font-semibold mb-2 transition-colors ${
                  isActive ? 'text-white' : 'text-gray-300'
                }`}>
                  {step.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-auto">
                  {step.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
