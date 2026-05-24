import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import LinkButton from "./LinkButton";
import { editorConfig } from "@/config/codeEditorMockup";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";

/**
 * SECTION: Hero - Last updated Nov 2025
 * 
 * Main hero section for homepage featuring headline, subtext, dual CTAs,
 * and animated code editor mockup with typing effect.
 * Animations: Fade-in entrance, typing animation loop, scroll indicator bounce
 */
export default function Hero() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  
  const [completedLines, setCompletedLines] = useState<number[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentTypingText, setCurrentTypingText] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Update code lines when language changes - force complete reset
  useEffect(() => {
    // Reset animation when language changes
    setCompletedLines([]);
    setCurrentLineIndex(0);
    setCurrentTypingText("");
    setIsFadingOut(false);
  }, [language]);

  useEffect(() => {
    const lines = t.hero.typingLines;
    
    // If we're fading out, wait then reset everything
    if (isFadingOut) {
      const resetTimeout = setTimeout(() => {
        setCompletedLines([]);
        setCurrentLineIndex(0);
        setCurrentTypingText("");
        setIsFadingOut(false);
      }, 800); // Match fade animation duration
      return () => clearTimeout(resetTimeout);
    }

    // If all lines are complete, trigger fade out
    if (currentLineIndex >= lines.length) {
      const fadeTimeout = setTimeout(() => {
        setIsFadingOut(true);
      }, 2000); // Pause before fading
      return () => clearTimeout(fadeTimeout);
    }

    const currentLine = lines[currentLineIndex].text;
    const typingSpeed = 80;

    const timeout = setTimeout(() => {
      if (currentTypingText.length < currentLine.length) {
        // Continue typing current line
        setCurrentTypingText(currentLine.substring(0, currentTypingText.length + 1));
      } else {
        // Current line complete - add to completed lines and move to next
        setTimeout(() => {
          setCompletedLines(prev => [...prev, currentLineIndex]);
          setCurrentLineIndex(prev => prev + 1);
          setCurrentTypingText("");
        }, 500); // Brief pause before next line
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentTypingText, currentLineIndex, isFadingOut, t.hero.typingLines]);

  const renderTextWithHighlights = (text: string, lineIndex: number) => {
    if (!text) return text;
    
    const lineData = t.hero.typingLines[lineIndex];
    if (!lineData || !lineData.keywords) return text;
    
    const keywords = lineData.keywords;
    let lastIndex = 0;
    const parts = [];

    keywords.forEach((keyword, idx) => {
      const keywordIndex = text.indexOf(keyword, lastIndex);
      if (keywordIndex !== -1 && keywordIndex + keyword.length <= text.length) {
        if (keywordIndex > lastIndex) {
          parts.push(
            <span key={`text-${idx}`}>
              {text.substring(lastIndex, keywordIndex)}
            </span>
          );
        }
        parts.push(
          <span key={`keyword-${idx}`} className="text-[#F4B400]">
            {keyword}
          </span>
        );
        lastIndex = keywordIndex + keyword.length;
      }
    });

    if (lastIndex < text.length) {
      parts.push(
        <span key="text-end">
          {text.substring(lastIndex)}
        </span>
      );
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <section className="relative pt-[140px] pb-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-100 to-background dark:from-slate-950 dark:via-blue-900 dark:to-background -z-10" />
      
      {/* Hero brand image background - new landing page hero image */}
      <div
        className="absolute inset-0 -z-10"
        style={{ 
          backgroundImage: "url('/assets/branding-hero-assets/hero-website-landing-page-new.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15
        }}
      />
      
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
          <div className="space-y-8">
            <h1 className="font-heading font-bold text-6xl md:text-7xl leading-tight text-foreground">
              {t.hero.headline.map((word, index) => (
                <span 
                  key={index} 
                  className="inline-block fade-in-word"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  {word}
                  {index < t.hero.headline.length - 1 && (
                    <span className="text-[#F4B400] mx-2">→</span>
                  )}
                </span>
              ))}
            </h1>
            <p className="text-2xl text-muted-foreground max-w-md fade-in-up animation-delay-1200">
              {t.hero.subheadline}
            </p>
            <div className="flex flex-wrap gap-6 fade-in-up animation-delay-800">
              <LinkButton href="/contact#contact-form" variant="primary" size="2xl" data-testid="button-free-audit">
                {t.hero.ctaPrimary}
              </LinkButton>
              <LinkButton href="/services" variant="outline" size="2xl" data-testid="button-see-services">
                {t.hero.ctaSecondary}
              </LinkButton>
            </div>
          </div>

          <div className="flex justify-center items-center fade-in-up animation-delay-600" data-testid="container-code-editor-wrapper">
            <div className="relative w-full max-w-[650px] floating-editor" data-testid="container-code-editor">
              <div 
                className="bg-[#0A0A0A] border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden" 
                data-testid="container-code-editor-inner"
              >
                <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${editorConfig.windowControls.close}`} />
                  <div className={`w-3 h-3 rounded-full ${editorConfig.windowControls.minimize}`} />
                  <div className={`w-3 h-3 rounded-full ${editorConfig.windowControls.maximize}`} />
                  <span className="ml-2 text-slate-400 text-sm font-mono">{editorConfig.fileName}</span>
                </div>
                <div className="p-6 font-mono text-base h-[360px] flex items-start justify-start" data-testid="container-code-content">
                  <div className={`text-gray-300 w-full space-y-2 transition-opacity duration-700 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`} data-testid="text-typing-code">
                    {/* Render all completed lines */}
                    {completedLines.map((lineIdx) => (
                      <div key={`line-${lineIdx}`} className="leading-relaxed">
                        {renderTextWithHighlights(t.hero.typingLines[lineIdx].text, lineIdx)}
                      </div>
                    ))}
                    
                    {/* Render current typing line with cursor */}
                    {currentLineIndex < t.hero.typingLines.length && (
                      <div className="leading-relaxed">
                        {renderTextWithHighlights(currentTypingText, currentLineIndex)}
                        <span className="blinking-cursor" data-testid="icon-cursor">|</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
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

        .animation-delay-800 {
          animation-delay: 0.8s;
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
