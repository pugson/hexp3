import { Converter } from "./components/converter";
import { Stats } from "./components/stats";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-6 w-full">
        <div className="mx-auto w-full max-w-2xl bg-slate-900 text-white p-8 rounded-3xl shadow-sm">
          <h1 className="font-bold text-2xl">HEX·P3</h1>
          <p className="font-medium text-slate-300 mb-2">Quickly convert your HEX colors to Display P3 color space.</p>
          <p className="font-medium text-xs text-slate-500 md:hidden">
            Tap a swatch to copy the color to your clipboard.
          </p>
          <p className="font-medium text-xs text-slate-500 hidden md:block">
            Click a swatch to copy the color to your clipboard.
          </p>
        </div>
        <Converter />
        <div className="text-xs leading-relaxed text-center py-2 flex flex-col justify-center items-center">
          <p className="text-slate-400 text-balance max-w-xl">
            𝙽𝙾𝚃𝙴: Converted P3 colors on this site are only a more vibrant approximation of the original HEX color and
            not a 1:1 match. They are supposed to ✨ 𝙿 𝙾 𝙿 💅
          </p>
          <p className="text-slate-600 -mt-2">
            <br />
            If one of the colors is black, then it couldn't be converted.
          </p>
          <div className="mt-2 text-slate-800">✦</div>
          <div className="text-slate-700 pb-8">
            <Stats />
            <p>
              Made by{" "}
              <a href="https://wojtek.im/?ref=hexp3" className="text-slate-400 hover:text-slate-200 transition">
                @pugson
              </a>{" "}
              • Source code on{" "}
              <a href="https://github.com/pugson/hexp3" className="text-slate-400 hover:text-slate-200 transition">
                GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
