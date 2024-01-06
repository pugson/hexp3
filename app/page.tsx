import { Converter } from "./components/converter";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-4 w-full">
        <div className="mx-auto w-full max-w-2xl bg-slate-900 text-white p-8 rounded-3xl shadow-sm">
          <h1 className="font-bold text-2xl">HEX·P3</h1>
          <p className="font-medium text-slate-300">Quickly convert your HEX colors to P3 color space.</p>
          <p className="font-medium text-xs text-slate-500 mt-2">
            <span className="md:hidden">Tap</span>
            <span className="hidden md:inline">Click</span> a swatch to copy the color to your clipboard.
          </p>
        </div>
        <Converter />
        <div className="text-slate-700 text-xs text-center py-2">
          <p>If one of the colors is black, then it couldn't be converted.</p>
          <p className="mt-1">
            Made by{" "}
            <a href="https://wojtek.im/?ref=hexp3" className="text-slate-600 hover:text-slate-400 transition">
              @pugson
            </a>{" "}
            • Source code on{" "}
            <a href="https://github.com/pugson/hexp3" className="text-slate-600 hover:text-slate-400 transition">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
