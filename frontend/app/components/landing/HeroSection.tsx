"use client";

import Link from "next/link";
import { Brain, Eye, Activity, Cpu, RefreshCw, ArrowRight } from "lucide-react";
import Badge from "@/app/components/ui/Badge";

const floatingCards = [
  { icon: Eye, label: "Observe User Behavior", delay: "0s" },
  { icon: Activity, label: "Detect Cognitive Load", delay: "0.15s" },
  { icon: Cpu, label: "Generate Better UI", delay: "0.3s" },
  { icon: RefreshCw, label: "Adapt in Real-Time", delay: "0.45s" },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-white via-primary-soft to-lavender"
    >
      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary-light/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div className="animate-fade-in">
            <Badge variant="indigo" className="mb-6">
              <Cpu className="h-3.5 w-3.5" />
              A Smarter UI for a Calmer You
            </Badge>

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight lg:text-6xl">
              <span className="text-gray-900">Aura</span>
              <span className="gradient-text">Gen</span>
            </h1>

            <p className="mt-3 text-xl font-semibold text-gray-500 lg:text-2xl">
              Self-Healing Generative UI via Cognitive Load
            </p>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-gray-600">
              AuraGen intelligently monitors your interaction patterns,
              detects when the interface becomes overwhelming, and
              dynamically simplifies the UI — powered by generative AI.
              Less friction, more flow.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl gradient-bg px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Try Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-primary/20 bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-all hover:border-primary/40 hover:bg-primary-soft"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative flex items-center justify-center">
            {/* Glow ring */}
            <div className="absolute h-72 w-72 rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 blur-2xl animate-pulse-glow lg:h-96 lg:w-96" />

            {/* Brain circle */}
            <div className="relative z-10 flex h-48 w-48 items-center justify-center rounded-full border-2 border-primary/20 bg-white shadow-2xl shadow-primary/10 lg:h-64 lg:w-64 animate-pulse-glow">
              <Brain className="h-20 w-20 text-primary lg:h-28 lg:w-28" strokeWidth={1.5} />
            </div>

            {/* Floating cards */}
            {floatingCards.map((card, i) => {
              const positions = [
                "top-0 left-0 lg:-left-4 lg:top-4",
                "top-0 right-0 lg:-right-4 lg:top-4",
                "bottom-0 left-0 lg:-left-4 lg:bottom-4",
                "bottom-0 right-0 lg:-right-4 lg:bottom-4",
              ];
              return (
                <div
                  key={card.label}
                  className={`absolute z-20 ${positions[i]}`}
                  style={{ animationDelay: card.delay }}
                >
                  <div
                    className="flex items-center gap-2.5 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-lg shadow-gray-200/50 animate-float"
                    style={{ animationDelay: card.delay }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg">
                      <card.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">
                      {card.label}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Step connector lines (decorative) */}
            <svg className="absolute inset-0 z-[5] h-full w-full opacity-20 hidden lg:block" viewBox="0 0 400 400">
              <path d="M 80 80 Q 200 40 320 80" stroke="#6366F1" strokeWidth="1.5" fill="none" strokeDasharray="6 4" />
              <path d="M 320 80 Q 360 200 320 320" stroke="#818CF8" strokeWidth="1.5" fill="none" strokeDasharray="6 4" />
              <path d="M 320 320 Q 200 360 80 320" stroke="#6366F1" strokeWidth="1.5" fill="none" strokeDasharray="6 4" />
              <path d="M 80 320 Q 40 200 80 80" stroke="#818CF8" strokeWidth="1.5" fill="none" strokeDasharray="6 4" />
            </svg>
          </div>
        </div>

        {/* Tagline */}
        <p className="mt-16 text-center text-lg italic text-gray-400 animate-fade-in lg:mt-20">
          &ldquo;A UI that understands you.&rdquo;
        </p>
      </div>

      {/* Sections for anchor scroll targets */}
      <section id="features" className="py-20 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            Features
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            AuraGen adapts in real time using cognitive load signals, generative AI,
            and a deeply personalized understanding of your workflow.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Cognitive Detection", desc: "Monitors clicks, scrolls, and navigation backtracks to detect overwhelm." },
              { title: "Generative Adaptation", desc: "Uses LLMs to re-generate simpler UI layouts on the fly." },
              { title: "AI Assistant", desc: "Aura, your built-in AI, helps you navigate and manage your workspace." },
              { title: "Real-Time Analysis", desc: "Interaction metrics are analyzed instantly — no manual triggers needed." },
              { title: "Seamless Restore", desc: "Switch back to the full dashboard whenever you're ready." },
              { title: "Privacy First", desc: "All analysis stays local. Your data never leaves your session." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm">
                <h3 className="text-base font-bold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-6 bg-white/60">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            How it Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Four seamless steps, powered by generative AI.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {floatingCards.map((card, i) => (
              <div key={card.label} className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-bg text-white text-lg font-bold">
                  {i + 1}
                </div>
                <card.icon className="h-6 w-6 text-primary" />
                <p className="text-sm font-semibold text-gray-700">{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            About AuraGen
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-gray-500">
            AuraGen is a research project exploring the intersection of cognitive science
            and generative AI for user interfaces. Built by Group-04 at Infotact,
            it aims to create workspaces that actively reduce mental burden — making
            technology feel calmer, smarter, and more human.
          </p>
        </div>
      </section>
    </section>
  );
}
