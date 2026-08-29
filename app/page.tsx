import Link from "next/link";

const sampleBlocks = ["", "", "", ""];

export default function Home() {
  return (
    <main className="booth-shell grid min-h-screen grid-rows-[auto_1fr_auto]">
      <header className="flex items-center justify-between">
        <p className="font-stamp text-sm font-bold tracking-normal">PHOTOBOX</p>
        <p className="font-stamp text-xs text-[#706b61]">your photos stay on this device.</p>
      </header>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 py-10 lg:grid-cols-[1fr_320px_280px]">
        <div className="max-w-3xl">
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] text-[#171717] md:text-7xl">
            take some pictures.
            <br />
            keep some memories.
          </h1>
          <Link
            href="/booth"
            className="tactile mt-10 inline-flex border border-[#171717] bg-[#171717] px-7 py-4 text-base lowercase text-[#f4f1ea]"
          >
            enter booth
          </Link>
        </div>
        <div className="mx-auto rotate-[-2deg]">
          <div className="paper-texture w-40 bg-[#fdfcf7] p-3 shadow-[0_22px_45px_rgba(23,23,23,.18)] md:w-44">
            <div className="grid gap-2">
              {sampleBlocks.map((_, index) => (
                <div key={index} className="aspect-[4/5] bg-[#d8d0c2]">
                  <div className="h-full w-full bg-[linear-gradient(135deg,#2a2925,#777064_45%,#f4f1ea)] opacity-80" />
                </div>
              ))}
            </div>
            <div className="grid gap-1 pt-3 text-center">
              <strong className="text-sm">PHOTOBOX</strong>
              <span className="font-stamp text-[10px]">27 · 08 · 26</span>
            </div>
          </div>
        </div>
        <a
          href="https://saweria.co/nandacoba"
          target="_blank"
          rel="noreferrer"
          className="paper-texture mx-auto grid w-full max-w-[280px] gap-3 border border-[#c9c2b4] bg-[#fdfcf7] p-3 text-center shadow-[0_18px_38px_rgba(23,23,23,.14)]"
          aria-label="Support PHOTOBOX on Saweria"
        >
          <span className="font-stamp text-xs font-bold uppercase text-[#823a2b]">support this project</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/saweria-support.png"
            alt="QR code to support NandaCoba on Saweria"
            className="aspect-square w-full border border-[#e2ded3] bg-white object-cover [object-position:77%_48%]"
          />
          <span className="font-stamp text-xs text-[#706b61]">saweria.co/nandacoba</span>
        </a>
      </section>
      <footer className="font-stamp text-xs text-[#706b61]">photobox - made for little moments.</footer>
    </main>
  );
}
