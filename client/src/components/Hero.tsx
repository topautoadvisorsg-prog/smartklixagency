import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import LinkButton from "./LinkButton";
import { editorConfig } from "@/config/codeEditorMockup";

/**
 * Hero - Main hero section for the homepage
 * 
 * Features a headline, subtext, CTA buttons, code editor mockup,
 * gradient background, fade-in animations, and scroll indicator.
 */
export default function Hero() {
  const codeLines = useRef([
    "<launch-smart-site />",
    "<automate.crm() />",
    "<grow.brand() />",
    "<fix.webflow() />"
  ]);

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentLine = codeLines.current[currentLineIndex];

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(pauseTimeout);
    }

    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentLine.length) {
          setCurrentText(currentLine.substring(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentLineIndex((prevIndex) => (prevIndex + 1) % codeLines.current.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentLineIndex, isPaused]);

  const headlineWords = ["Fix.", "Launch.", "Grow.", "Automate."];

  return (
    <section className="relative pt-[140px] pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-background dark:from-slate-950 dark:via-blue-950 dark:to-background -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
          <div className="space-y-6">
            <h1 className="font-heading font-bold text-5xl md:text-6xl leading-tight text-foreground">
              {headlineWords.map((word, index) => (
                <span 
                  key={index} 
                  className="inline-block mr-3 fade-in-word"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  {word}
                </span>
              ))}
            </h1>
            <p className="text-xl text-muted-foreground max-w-md fade-in-up animation-delay-1200">
              AI-powered websites and automation for growing small businesses.
            </p>
            <div className="flex flex-wrap gap-4 fade-in-up animation-delay-1800">
              <LinkButton href="/contact" variant="primary" size="lg" data-testid="button-free-audit">
                Get a Free Audit
              </LinkButton>
              <LinkButton href="/services" variant="outline" size="lg" data-testid="button-see-services">
                See Services
              </LinkButton>
            </div>
          </div>

          <div className="flex justify-center items-center fade-in-up animation-delay-600" data-testid="container-code-editor-wrapper">
            <div className="relative w-full max-w-[650px] floating-editor" data-testid="container-code-editor">
              <div style={{ backgroundColor: editorConfig.backgroundColor }} className="rounded-xl shadow-2xl overflow-hidden border border-slate-700/50" data-testid="container-code-editor-inner">
                <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${editorConfig.windowControls.close}`} />
                  <div className={`w-3 h-3 rounded-full ${editorConfig.windowControls.minimize}`} />
                  <div className={`w-3 h-3 rounded-full ${editorConfig.windowControls.maximize}`} />
                  <span className="ml-2 text-slate-400 text-sm font-mono">{editorConfig.fileName}</span>
                </div>
                <div className="p-6 font-mono text-sm h-[120px] flex items-center" data-testid="container-code-content">
                  <div className="text-green-400" data-testid="text-typing-code">
                    {currentText}
                    <span className="blinking-cursor" data-testid="icon-cursor">|</span>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-sidebar-primary/20 to-blue-500/20 rounded-xl blur-xl -z-10 opacity-75" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ChevronDown 
          className="w-8 h-8 text-sidebar-primary pulse-arrow" 
          data-testid="icon-scroll-indicator"
        />
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInWord {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseArrow {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(8px);
            opacity: 0.6;
          }
        }

        @keyframes floatEditor {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes blink {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .fade-in-word {
          animation: fadeInWord 0.6s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-1200 {
          animation-delay: 1.2s;
        }

        .animation-delay-1800 {
          animation-delay: 1.8s;
        }

        .pulse-arrow {
          animation: pulseArrow 2s ease-in-out infinite;
        }

        .floating-editor {
          animation: floatEditor 6s ease-in-out infinite;
        }

        .blinking-cursor {
          animation: blink 1s step-start infinite;
        }
      `}</style>
    </section>
  );
}
