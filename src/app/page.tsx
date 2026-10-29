import Link from 'next/link';
import { Navbar } from '@/features/common/components/Navbar';
import { Footer } from '@/features/common/components/Footer';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d1117] text-[#c9d1d9]">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden py-16 sm:py-24" aria-labelledby="hero-title">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="inline-block rounded-full border border-[#8957e5]/40 bg-[#8957e5]/10 px-3 py-1 text-xs font-semibold text-[#a371f7]">
                  Plataforma Abierta de CTF
                </span>
                <h1
                  id="hero-title"
                  className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl text-white leading-tight"
                >
                  Domina el{' '}
                  <span className="text-[#8957e5]">Hacking Ético</span>{' '}
                  a través de Retos Reales
                </h1>
                <p className="mt-4 text-base text-[#8b949e] sm:text-lg">
                  Participa en competencias o laboratorios locales Capture The Flag (CTF), analiza
                  writeups de la comunidad y pon a prueba tus habilidades defensivas y ofensivas en
                  entornos controlados.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/competencias"
                    className="rounded-md bg-[#8957e5] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#7a48d6] hover:shadow-lg"
                  >
                    Explorar Retos
                  </Link>
                  <Link
                    href="/registro"
                    className="rounded-md border border-[#30363d] bg-transparent px-6 py-3 text-sm font-semibold text-[#c9d1d9] transition-all hover:border-[#8b949e] hover:text-white"
                  >
                    Regístrate
                  </Link>
                </div>
              </div>

              <div className="rounded-lg border border-[#30363d] bg-[#000000] font-mono shadow-2xl overflow-hidden" aria-hidden="true">
                <div className="flex items-center gap-2 border-b border-[#30363d] bg-[#161b22] px-4 py-2.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                  <span className="ml-2 text-xs text-[#8b949e]">bash - are-u-pwnd-yet</span>
                </div>
                <div className="p-6 text-sm space-y-2 text-white">
                  <p>
                    <span className="font-bold text-[#8957e5]">root@pwnd:~$</span> ./check_skills.sh
                  </p>
                  <p className="text-[#27c93f]">[+] Analizando binario vulnerable...</p>
                  <p className="text-[#58a6ff]">[*] Buffer overflow detectado en 0x7fffffffe420</p>
                  <p className="text-[#ffbd2e]">[!] Flag capturada: FLAG&#123;h4ck_th3_pl4n3t_2026&#125;</p>
                  <p>
                    <span className="font-bold text-[#8957e5]">root@pwnd:~$</span>{' '}
                    <span className="animate-pulse text-[#8957e5]">_</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
