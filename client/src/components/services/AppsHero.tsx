import { motion } from "framer-motion";
import { Smartphone, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/locales";
import LinkButton from "@/components/LinkButton";

export default function AppsHero() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <section
      className="relative min-h-[70vh] md:min-h-[720px] pt-[140px] pb-24 overflow-hidden flex items-center bg-gradient-to-br from-[#07111f] via-[#0D1B2A] to-[#12334a]"
      data-testid="section-apps-hero"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,180,0,0.25),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(0,168,232,0.2),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-[0.95fr_0.75fr] gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white">
              <Sparkles className="w-4 h-4 text-[#F4B400]" />
              <span className="text-sm font-semibold tracking-wider uppercase">{t.appsPage.hero.badge}</span>
            </div>
            <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-tight text-white mb-8">
              {t.appsPage.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl mb-10">
              {t.appsPage.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <LinkButton href="/contact#contact-form" variant="primary" size="xl">
                {t.appsPage.hero.ctaPrimary}
              </LinkButton>
              <button
                onClick={() => document.getElementById("apps-process")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center min-h-14 px-10 text-lg font-semibold rounded-md bg-transparent text-white border border-white/50 hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                {t.appsPage.hero.ctaSecondary}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="relative hidden lg:flex justify-center"
            aria-hidden="true"
          >
            <div className="relative w-[340px] h-[520px] rounded-[42px] border border-white/20 bg-slate-950/80 shadow-2xl p-5">
              <div className="absolute -inset-8 bg-[#00A8E8]/10 blur-3xl rounded-full" />
              <div className="relative h-full rounded-[30px] bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 overflow-hidden p-5">
                <div className="h-2 w-24 rounded-full bg-white/20 mx-auto mb-8" />
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#F4B400] flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="h-3 w-24 bg-white/70 rounded-full mb-2" />
                    <div className="h-2 w-16 bg-white/25 rounded-full" />
                  </div>
                </div>
                <div className="space-y-4">
                  {t.appsPage.hero.mockupRows.map((row, i) => (
                    <div key={row} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-medium text-white">{row}</span>
                        {i === 0 ? <ShieldCheck className="w-5 h-5 text-[#F4B400]" /> : <div className="w-8 h-2 rounded-full bg-[#00A8E8]/60" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
