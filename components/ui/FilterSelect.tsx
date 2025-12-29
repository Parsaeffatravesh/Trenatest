"use client";

import * as React from "react";

export default function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="flex flex-col gap-2 text-xs text-neutral-400">
      <span className="font-bold uppercase tracking-widest">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-neutral-900 text-neutral-100">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
