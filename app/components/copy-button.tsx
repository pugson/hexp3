"use client";

import { AnimatePresence, motion } from "framer-motion";
import useClipboard from "react-use-clipboard";

export function CopyButton({ snippet }: { snippet: string }) {
  const [isCopied, setCopied] = useClipboard(snippet, {
    successDuration: 2000,
  });

  return (
    <button
      className="flex items-center justify-center w-24 h-24 transition-all rounded-xl sm:rounded-full outline-none text-white ring-2 ring-white hover:ring-4 hover:ring-accent active:scale-95 hover:text-accent focus-visible:ring-4 focus-visible:ring-white mix-blend-difference"
      onClick={() => {
        setCopied();

        const colorType = snippet.includes("display-p3") ? "p3" : snippet.includes("#") ? "hex" : "empty";
        fetch(`/api/metrics?name=copied.${colorType}`);
      }}
    >
      <AnimatePresence initial={false}>{isCopied ? <CheckIcon /> : <ClipboardIcon />}</AnimatePresence>
    </button>
  );
}

const CheckIcon = () => (
  <motion.svg
    key="check"
    className="absolute"
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{
      opacity: 0,
      scale: 0.5,
      y: 2,
    }}
    animate={{
      opacity: 1,
      scale: 1,
    }}
    exit={{
      opacity: 0,
      scale: 0.5,
    }}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </motion.svg>
);

const ClipboardIcon = () => (
  <motion.svg
    key="normal"
    className="absolute"
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{
      opacity: 0,
      scale: 0.5,
    }}
    animate={{
      opacity: 1,
      scale: 1,
    }}
    exit={{
      opacity: 0,
      scale: 0.5,
    }}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </motion.svg>
);
