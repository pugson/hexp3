"use client";

import { toHEX, toP3 } from "@/utils/color";
import { tw } from "@/utils/tailwind";
import { useState } from "react";
import { CopyButton } from "./copy-button";

export function Converter() {
  const [hex, setHex] = useState("");
  const [p3, setP3] = useState("");

  const onChangeHex = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexInput = e.target.value.includes("#") ? e.target.value : `#${e.target.value}`;

    // check if hex is valid. can be 3 or 6 characters long and can include alpha
    const isValidHex = /^#?([0-9A-F]{3}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(hexInput);

    if (isValidHex) {
      const converted = toP3(hexInput) ?? "";
      setHex(hexInput);
      setP3(converted);
      fetch("/api/metrics?name=converted.fromHex");
    }
  };

  const onChangeP3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isP3Input = e.target.value.includes("p3");

    if (isP3Input) {
      const converted = toHEX(e.target.value) ?? "";
      setHex(converted);
      setP3(e.target.value);
      fetch("/api/metrics?name=converted.fromP3");
    }
  };

  return (
    <>
      <input
        placeholder="#1e26e6"
        onChange={onChangeHex}
        defaultValue={hex}
        className={tw(
          "color-input font-medium placeholder:text-slate-500 mx-auto w-full max-w-2xl bg-slate-800 text-white p-8 py-6 rounded-3xl shadow-sm text-3xl font-mono"
        )}
      />
      <div className="mx-auto w-full max-w-2xl flex gap-6">
        <div
          className="aspect-square w-full h-full rounded-3xl rounded-br-md rounded-tr-lg shadow-sm flex items-center justify-center bg-slate-800 relative swatch-hex"
          style={{
            backgroundColor: hex !== "" ? hex : "#1e26e6",
          }}
        >
          <CopyButton snippet={hex} key={hex} />
        </div>
        <div
          className="aspect-square w-full h-full rounded-3xl rounded-tl-md rounded-bl-lg shadow-sm flex items-center justify-center bg-slate-800 relative swatch-p3"
          style={{
            backgroundColor: p3 !== "" ? p3 : "color(display-p3 1.000000 0.349020 0.141176 / 1.000000)",
          }}
        >
          <CopyButton snippet={p3} key={p3} />
        </div>
      </div>
      <input
        placeholder="color(display-p3 1.000000 0.349020 0.141176 / 1.000000)"
        onChange={onChangeP3}
        defaultValue={p3}
        className={tw(
          "color-input font-medium placeholder:text-slate-500 mx-auto w-full max-w-2xl bg-slate-800 text-white p-8 rounded-3xl shadow-sm text-sm md:text-base font-mono"
        )}
      />
    </>
  );
}
