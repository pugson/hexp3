import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export const tw = (initial: any, ...args: any[]) => twMerge(clsx(initial, ...args));
