"use client";

import { useState } from "react";

export const salesItems = [
    { id: "leads", label: "Leads", icon: "leads" },
    { id: "deals", label: "Deals", icon: "deals" },
    { id: "activities", label: "Activities", icon: "calendar" },
    { id: "people", label: "People", icon: "people" },
    { id: "organizations", label: "Organizations", icon: "organizations" },
    { id: "merge", label: "Merge Duplicates", icon: "merge" },
    { id: "insights", label: "Insights", icon: "insights" },
];

export function getSalesLabel(itemId) {
    return salesItems.find((item) => item.id === itemId)?.label ?? "Leads";
}

function NavigationIcon({ name, className = "h-5 w-5" }) {
    const common = { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.8 };

    if (name === "sales" || name === "deals") {
        return (<svg {...common}>
          <circle cx="12" cy="12" r="9"/>
          <path strokeLinecap="round" d="M14.8 8.7c-.5-.7-1.4-1.1-2.6-1.1-1.5 0-2.6.8-2.6 2s.9 1.7 2.8 2.1c1.9.4 2.8 1 2.8 2.3 0 1.4-1.2 2.4-3 2.4-1.3 0-2.4-.5-3-1.3M12 5.8v12.4"/>
        </svg>);
    }
    if (name === "leads") {
        return (<svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7.5A3.5 3.5 0 1115 7.5a3.5 3.5 0 01-7 0zM4.5 20a6.5 6.5 0 0113 0M18 8v6m-3-3h6"/>
        </svg>);
    }
    if (name === "calendar") {
        return (<svg {...common}>
          <rect x="3.5" y="5.5" width="17" height="15" rx="2"/>
          <path strokeLinecap="round" d="M8 3.5v4M16 3.5v4M3.5 10h17M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01"/>
        </svg>);
    }
    if (name === "people") {
        return (<svg {...common}>
          <circle cx="9" cy="8" r="3"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 20a5.5 5.5 0 0111 0M16 8.5a2.5 2.5 0 110 5M16.5 15.5a4.5 4.5 0 014 4.5"/>
        </svg>);
    }
    if (name === "organizations") {
        return (<svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 21V5a2 2 0 012-2h7a2 2 0 012 2v16M15 9h3a2 2 0 012 2v10M2 21h20M8 7h3M8 11h3M8 15h3M8 19h3"/>
        </svg>);
    }
    if (name === "merge") {
        return (<svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 4v3a5 5 0 005 5h7M15 9l3 3-3 3M6 20v-3a5 5 0 015-5"/>
        </svg>);
    }
    return (<svg {...common}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>
    </svg>);
}

export default function SalesNavigation({
    activeItem = "leads",
    onNavigate = () => {},
    children,
    searchPlaceholder = "Search leads, contacts or files",
    searchValue,
    onSearchChange,
    avatar = "PS",
}) {
    const [menuOpen, setMenuOpen] = useState(true);
    const [localSearch, setLocalSearch] = useState("");
    const activeLabel = getSalesLabel(activeItem);
    const resolvedSearchValue = searchValue ?? localSearch;
    const handleSearchChange = (event) => {
        const value = event.target.value;
        if (onSearchChange)
            onSearchChange(value);
        else
            setLocalSearch(value);
    };

    return (<div className="sales-navigation flex h-screen overflow-hidden bg-white text-slate-900">
      <aside className="flex h-screen w-[64px] shrink-0 flex-col items-center border-r border-[#22345d] bg-[#152754] text-white">
        <div className="flex h-14 w-full items-center justify-center border-b border-white/10">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-black text-[#10214b] shadow-sm">V</div>
        </div>

        <nav className="flex w-full flex-1 flex-col items-center pt-5" aria-label="Primary navigation">
          <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} className="flex w-[52px] flex-col items-center gap-1 rounded-xl bg-blue-600 px-1 py-2.5 text-[10px] font-semibold text-white shadow-lg shadow-blue-950/20 transition-colors hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
            <NavigationIcon name="sales" className="h-5 w-5"/>
            Sales
          </button>
        </nav>

        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[10px] font-semibold">VM</div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-3 sm:px-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Collapse Sales menu" : "Open Sales menu"} aria-expanded={menuOpen} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
                <path strokeLinecap="round" d="M4 7h12M4 12h12M4 17h12"/>
                <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M20 7l-4 5 4 5" : "M17 7l4 5-4 5"}/>
              </svg>
            </button>
            <div className="flex min-w-0 items-center gap-2 text-sm sm:text-[15px]">
              <span className="font-semibold text-slate-500">Sales</span>
              <span className="text-slate-300">/</span>
              <span className="truncate font-semibold text-slate-900">{activeLabel}</span>
            </div>
          </div>

          <label className="hidden w-[320px] items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-400 shadow-sm md:flex">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input value={resolvedSearchValue} onChange={handleSearchChange} placeholder={searchPlaceholder} aria-label={searchPlaceholder} className="min-w-0 flex-1 bg-transparent text-slate-800 outline-none placeholder:text-slate-400"/>
          </label>

          <div className="flex items-center gap-2">
            <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50" aria-label="Settings">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}><circle cx="12" cy="12" r="3"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.7 1.7 0 00.34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 00-1.88-.34 1.7 1.7 0 00-1.04 1.56V20.5h-3v-.08a1.7 1.7 0 00-1.04-1.56 1.7 1.7 0 00-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 007 15.2a1.7 1.7 0 00-1.56-1.04H5.3v-3h.14A1.7 1.7 0 007 10.12a1.7 1.7 0 00-.34-1.88l-.06-.06 2.12-2.12.06.06a1.7 1.7 0 001.88.34A1.7 1.7 0 0011.7 4.9V4.7h3v.2a1.7 1.7 0 001.04 1.56 1.7 1.7 0 001.88-.34l.06-.06 2.12 2.12-.06.06a1.7 1.7 0 00-.34 1.88 1.7 1.7 0 001.56 1.04h.14v3h-.14A1.7 1.7 0 0019.4 15z"/></svg>
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">{avatar}</div>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          {menuOpen && (<aside className="w-[272px] shrink-0 border-r border-slate-200 bg-[#fbfbfc] text-slate-800 shadow-[2px_0_8px_rgba(15,23,42,0.025)]">
            <nav className="space-y-1 p-3" aria-label="Sales navigation">
              {salesItems.map((item) => {
                const active = item.id === activeItem;
                return (<button key={item.id} type="button" onClick={() => onNavigate(item.id)} aria-current={active ? "page" : undefined} className={`flex h-12 w-full items-center gap-3 rounded-xl px-3 text-left text-[15px] font-medium transition-colors ${active ? "bg-blue-100 text-blue-700" : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"}`}>
                  <NavigationIcon name={item.icon} className={`h-[22px] w-[22px] shrink-0 ${active ? "text-blue-600" : "text-slate-500"}`}/>
                  <span className="truncate">{item.label}</span>
                </button>);
              })}
            </nav>
          </aside>)}

          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">{children}</div>
        </div>
      </div>
    </div>);
}
