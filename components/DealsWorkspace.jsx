"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SalesNavigation from "./SalesNavigation";
import DealDetailReference from "./DealDetailReference";
const stageDefinitions = [
    { id: "new", name: "New Inquiry", probability: 10, accent: "bg-sky-500" },
    { id: "discovery", name: "Initial Consultation", probability: 30, accent: "bg-indigo-500" },
    { id: "proposal", name: "Proposal Sent", probability: 55, accent: "bg-violet-500" },
    { id: "negotiation", name: "Follow-up Call", probability: 75, accent: "bg-amber-500" },
    { id: "won", name: "Negotiation", probability: 90, accent: "bg-emerald-500" },
];
const initialDeals = [
    {
        id: "deal-1",
        title: "Hotel Jindal Brand & Website Revamp",
        organization: "Hotel Jindal",
        contact: "Chinmay Jindal",
        value: 280000,
        stage: "new",
        probability: 10,
        expectedClose: "2026-08-24",
        nextActivity: "Initial consultation · Today, 3:00 PM",
        activityState: "today",
        owner: "Priya Sharma",
        projectNeeds: ["Branding", "Website"],
        priority: "High",
        createdAt: "2026-08-02T13:04:00.000Z",
    },
    {
        id: "deal-2",
        title: "Lumeramist Ecommerce Experience",
        organization: "Lumeramist",
        contact: "Rhea Kapoor",
        value: 420000,
        stage: "discovery",
        probability: 30,
        expectedClose: "2026-09-05",
        nextActivity: "Requirements workshop · 05 Aug",
        activityState: "upcoming",
        owner: "Arjun Mehta",
        projectNeeds: ["UX/UI", "Website"],
        priority: "High",
        createdAt: "2026-07-29T09:20:00.000Z",
    },
    {
        id: "deal-3",
        title: "The Kahwa Company Digital Launch",
        organization: "The Kahwa Company",
        contact: "Sameer Khan",
        value: 185000,
        stage: "proposal",
        probability: 55,
        expectedClose: "2026-08-18",
        nextActivity: "Proposal follow-up · Tomorrow",
        activityState: "upcoming",
        owner: "Priya Sharma",
        projectNeeds: ["Branding", "UX/UI"],
        priority: "Medium",
        createdAt: "2026-07-25T12:15:00.000Z",
    },
    {
        id: "deal-4",
        title: "Nutriva Distributor Portal",
        organization: "Nutriva Feeds",
        contact: "Amit Rao",
        value: 650000,
        stage: "negotiation",
        probability: 75,
        expectedClose: "2026-08-12",
        nextActivity: "Commercial negotiation · Overdue",
        activityState: "overdue",
        owner: "Neha Verma",
        projectNeeds: ["Website", "Technical Support"],
        priority: "High",
        createdAt: "2026-07-18T10:05:00.000Z",
    },
    {
        id: "deal-5",
        title: "House of Karve Product Catalogue",
        organization: "House of Karve",
        contact: "Ayushi Karve",
        value: 320000,
        stage: "won",
        probability: 90,
        expectedClose: "2026-08-01",
        nextActivity: "Final negotiation · 06 Aug",
        activityState: "none",
        owner: "Priya Sharma",
        projectNeeds: ["UX/UI", "Website"],
        priority: "Medium",
        createdAt: "2026-07-11T15:45:00.000Z",
    },
];
function Icon({ name, className = "h-4 w-4" }) {
    const common = { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.9 };
    switch (name) {
        case "deals":
            return <svg {...common}><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" d="M14.8 8.7c-.5-.7-1.4-1.1-2.6-1.1-1.5 0-2.6.8-2.6 2s.9 1.7 2.8 2.1c1.9.4 2.8 1 2.8 2.3 0 1.4-1.2 2.4-3 2.4-1.3 0-2.4-.5-3-1.3M12 5.8v12.4"/></svg>;
        case "leads":
            return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7.5A3.5 3.5 0 1115 7.5a3.5 3.5 0 01-7 0zM4.5 20a6.5 6.5 0 0113 0M18 8v6m-3-3h6"/></svg>;
        case "pipeline":
            return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M5 4v16M12 4v16M19 4v16M3 7h4M10 12h4M17 9h4"/></svg>;
        case "list":
            return <svg {...common}><path strokeLinecap="round" d="M8 6h11M8 12h11M8 18h11"/><circle cx="4" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="4" cy="18" r="1" fill="currentColor" stroke="none"/></svg>;
        case "forecast":
            return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M4 19V9m5 10V5m5 14v-7m5 7V3"/></svg>;
        case "archive":
            return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M5 7l1 13h12l1-13M3.5 3.5h17V7h-17zM9 11h6"/></svg>;
        case "plus":
            return <svg {...common}><path strokeLinecap="round" d="M12 5v14M5 12h14"/></svg>;
        case "search":
            return <svg {...common}><circle cx="11" cy="11" r="7"/><path strokeLinecap="round" d="m20 20-4-4"/></svg>;
        case "filter":
            return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M10 18h4"/></svg>;
        case "sort":
            return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M8 6h11M8 12h8M8 18h5M4 5v14m0 0-2.5-2.5M4 19l2.5-2.5"/></svg>;
        case "chevron":
            return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6"/></svg>;
        case "down":
            return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"/></svg>;
        case "more":
            return <svg {...common}><circle cx="5" cy="12" r="1.25" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.25" fill="currentColor" stroke="none"/></svg>;
        case "calendar":
            return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path strokeLinecap="round" d="M7 3v4M17 3v4M3 10h18"/></svg>;
        case "user":
            return <svg {...common}><circle cx="12" cy="8" r="3.2"/><path strokeLinecap="round" d="M5.5 20a6.5 6.5 0 0113 0"/></svg>;
        case "activity":
            return <svg {...common}><circle cx="12" cy="12" r="9"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2"/></svg>;
        case "edit":
            return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M14.5 5.5l4 4M4 20l3.8-.8L19 8a2.1 2.1 0 00-3-3L4.8 16.2 4 20z"/></svg>;
        case "restore":
            return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M5.5 15a7 7 0 101.6-8"/></svg>;
        case "trash":
            return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V4h6v3m-9 0 1 13h10l1-13M10 11v5m4-5v5"/></svg>;
        case "lock":
            return <svg {...common}><rect x="5" y="10" width="14" height="10" rx="2"/><path strokeLinecap="round" d="M8 10V7a4 4 0 018 0v3"/></svg>;
        case "close":
            return <svg {...common}><path strokeLinecap="round" d="M6 6l12 12M18 6 6 18"/></svg>;
        case "settings":
            return <svg {...common}><circle cx="12" cy="12" r="3"/><path strokeLinecap="round" strokeLinejoin="round" d="M19 13.5v-3l-2-.7a6 6 0 00-.7-1.6l.9-1.9-2.1-2.1-1.9.9a6 6 0 00-1.7-.7L10.8 2h-3l-.7 2.4a6 6 0 00-1.7.7l-1.9-.9-2.1 2.1.9 1.9a6 6 0 00-.7 1.6l-2 .7v3l2 .7a6 6 0 00.7 1.6l-.9 1.9 2.1 2.1 1.9-.9a6 6 0 001.7.7l.7 2.4h3l.7-2.4a6 6 0 001.7-.7l1.9.9 2.1-2.1-.9-1.9a6 6 0 00.7-1.6l2-.7z"/></svg>;
        default:
            return null;
    }
}
const formatCurrency = (value) => new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
}).format(value);
const formatDate = (value) => new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
}).format(new Date(`${value}T00:00:00`));
function stageName(stage) {
    return stageDefinitions.find((item) => item.id === stage)?.name ?? stage;
}
function badgeClass(priority) {
    if (priority === "High")
        return "border-red-100 bg-red-50 text-red-700";
    if (priority === "Medium")
        return "border-amber-100 bg-amber-50 text-amber-700";
    return "border-slate-200 bg-slate-50 text-slate-600";
}
function activityClass(state) {
    if (state === "overdue")
        return "text-red-600";
    if (state === "today")
        return "text-amber-700";
    if (state === "upcoming")
        return "text-blue-700";
    return "text-slate-500";
}
function ViewButton({ active, icon, label, onClick }) {
    return (<button type="button" onClick={onClick} aria-label={`${label} view`} title={label} className={`inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors ${active ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"}`}>
      <Icon name={icon} className="h-4 w-4 shrink-0"/>
    </button>);
}
const sortOptions = [
    { value: "activity", label: "Next activity" },
    { value: "value-desc", label: "Highest value" },
    { value: "close-date", label: "Close date" },
    { value: "recent", label: "Recently created" },
];
function SortDropdown({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const selected = sortOptions.find((option) => option.value === value) ?? sortOptions[0];
    useEffect(() => {
        const close = (event) => {
            if (ref.current && !ref.current.contains(event.target))
                setOpen(false);
        };
        window.addEventListener("mousedown", close);
        return () => window.removeEventListener("mousedown", close);
    }, []);
    return (<div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((current) => !current)} className="inline-flex h-9 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-[13px] font-medium leading-none text-slate-600 outline-none hover:border-blue-200 hover:text-blue-700 focus:border-blue-400" aria-haspopup="listbox" aria-expanded={open}>
        <span>Sort: {selected.label}</span>
        <Icon name="down" className="h-3.5 w-3.5 shrink-0"/>
      </button>
      {open && (<div className="absolute right-0 top-11 z-50 min-w-[190px] rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl" role="listbox">
          {sortOptions.map((option) => (<button key={option.value} type="button" onClick={() => { onChange(option.value); setOpen(false); }} className={`flex w-full items-center rounded-md px-2.5 py-2 text-left text-xs font-semibold ${option.value === value ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"}`} role="option" aria-selected={option.value === value}>
              {option.label}
            </button>))}
        </div>)}
    </div>);
}
function Toolbar({ view, setView, onAddDeal, filterOpen, setFilterOpen, sortMode, setSortMode, stageFilter, setStageFilter, ownerFilter, setOwnerFilter, selectedCount = 0, onArchiveSelected, }) {
    const filterRef = useRef(null);
    useEffect(() => {
        const close = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target))
                setFilterOpen(false);
        };
        window.addEventListener("mousedown", close);
        return () => window.removeEventListener("mousedown", close);
    }, [setFilterOpen]);
    return (<div className="relative flex min-h-12 shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2">
      <div className="flex flex-wrap items-center gap-2">
        <ViewButton active={view === "pipeline"} icon="pipeline" label="Pipeline" onClick={() => setView("pipeline")}/>
        <ViewButton active={view === "list"} icon="list" label="List" onClick={() => setView("list")}/>
        <ViewButton active={view === "forecast"} icon="forecast" label="Forecast" onClick={() => setView("forecast")}/>
        <ViewButton active={view === "archive"} icon="archive" label="Archive" onClick={() => setView("archive")}/>
        {view === "list" && selectedCount > 0 && (<>
          <span className="mx-1 h-5 w-px bg-slate-200" aria-hidden="true"/>
          <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
            {selectedCount} selected
          </span>
          <button type="button" onClick={onArchiveSelected} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 text-xs! font-semibold! text-gray-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700" title="Archive selected deals">
            <Icon name="archive" className="h-4 w-4"/>
            <span className="hidden sm:inline">Archive</span>
          </button>
          <button type="button" disabled aria-disabled="true" className="inline-flex h-8 cursor-not-allowed items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-2.5 text-xs! font-semibold! text-gray-400" title="Delete is locked">
            <Icon name="trash" className="h-4 w-4"/>
            <span className="hidden sm:inline">Delete</span>
            <Icon name="lock" className="h-3.5 w-3.5"/>
          </button>
        </>)}
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <SortDropdown value={sortMode} onChange={setSortMode}/>
        <div ref={filterRef} className="relative">
          <button type="button" onClick={() => setFilterOpen(!filterOpen)} className={`inline-flex h-9 items-center gap-2 rounded-md border px-3 text-[13px] font-semibold leading-none ${stageFilter ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"}`}>
            <Icon name="filter"/> Filter
          </button>
          {filterOpen && (<div className="absolute right-0 top-11 z-50 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">Filter deals</p>
                <button type="button" onClick={() => { setStageFilter(""); setOwnerFilter(""); }} className="text-xs font-semibold text-blue-600 hover:text-blue-800">Clear</button>
              </div>
              <label className="mb-3 block text-xs font-semibold text-slate-500">Stage
                <select value={stageFilter} onChange={(event) => setStageFilter(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-blue-400">
                  <option value="">All stages</option>
                  {stageDefinitions.map((stage) => <option key={stage.id} value={stage.id}>{stage.name}</option>)}
                </select>
              </label>
              <label className="block text-xs font-semibold text-slate-400">
                <span className="flex items-center justify-between">
                  <span>Assigned to</span>
                  <Icon name="lock" className="h-3.5 w-3.5"/>
                </span>
                <select value="" disabled title="Assigned to filter is locked" className="mt-1.5 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-400 outline-none">
                  <option value="">All assignees</option>
                </select>
              </label>
            </div>)}
        </div>
        <button type="button" onClick={onAddDeal} className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-blue-600 px-3.5 py-2 text-sm! font-semibold! leading-5! text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800">
          <Icon name="plus"/> Deal
        </button>
      </div>
    </div>);
}
function DealMenu({ onArchive, onEdit }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const close = (event) => {
            if (ref.current && !ref.current.contains(event.target))
                setOpen(false);
        };
        window.addEventListener("mousedown", close);
        return () => window.removeEventListener("mousedown", close);
    }, []);
    return (<div ref={ref} className="relative">
      <button type="button" onClick={(event) => { event.stopPropagation(); setOpen(!open); }} className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Deal actions"><Icon name="more"/></button>
      {open && (<div className="absolute right-0 top-8 z-40 w-40 rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl">
          <button type="button" onClick={() => { onEdit(); setOpen(false); }} className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"><Icon name="edit"/> Edit deal</button>
          <button type="button" onClick={() => { onArchive(); setOpen(false); }} className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"><Icon name="archive"/> Archive</button>
        </div>)}
    </div>);
}
function DealCard({ deal, onOpen }) {
    const [dragging, setDragging] = useState(false);
    const dragInProgress = useRef(false);
    const openDeal = () => {
        if (!dragInProgress.current)
            onOpen(deal);
    };
    return (<article draggable role="button" tabIndex={0} aria-label={`Open ${deal.title}`} onClick={openDeal} onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openDeal();
            }
        }} onDragStart={(event) => {
            event.dataTransfer.setData("text/deal-id", deal.id);
            dragInProgress.current = true;
            setDragging(true);
        }} onDragEnd={() => {
            setDragging(false);
            window.setTimeout(() => { dragInProgress.current = false; }, 0);
        }} className={`deal-card cursor-pointer rounded-xl border bg-white p-3 shadow-sm outline-none transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md focus-visible:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-100 active:cursor-grabbing ${dragging ? "border-blue-300 opacity-60" : "border-slate-200"}`}>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold leading-5 text-slate-900">{deal.title}</h3>
        <p className="mt-0.5 truncate text-xs text-slate-500">{deal.organization} · {deal.contact}</p>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-slate-900">{formatCurrency(deal.value)}</span>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${badgeClass(deal.priority)}`}>{deal.priority}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {deal.projectNeeds.slice(0, 2).map((need) => <span key={need} className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">{need}</span>)}
      </div>
      <div className={`mt-3 flex items-start gap-1.5 border-t border-slate-100 pt-2.5 text-[11px] font-medium ${activityClass(deal.activityState)}`}>
        <Icon name="activity" className="mt-px h-3.5 w-3.5 shrink-0"/>
        <span className="line-clamp-2">{deal.nextActivity || "No activity scheduled"}</span>
      </div>
      <div className="mt-2 border-t border-slate-100 pt-2.5">
        <span className="text-xs font-semibold text-slate-600">{deal.owner}</span>
      </div>
    </article>);
}
function PipelineView({ deals, onMove, onOpen }) {
    return (<div className="pipeline-scroll scroll-soft min-h-0 flex-1 bg-slate-100/70 p-3">
      <div className="pipeline-board">
        {stageDefinitions.map((stage) => {
            const stageDeals = deals.filter((deal) => deal.stage === stage.id);
            const total = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
            return (<section key={stage.id} onDragOver={(event) => event.preventDefault()} onDrop={(event) => {
                    event.preventDefault();
                    const id = event.dataTransfer.getData("text/deal-id");
                    if (id)
                        onMove(id, stage.id);
                }} className="pipeline-stage flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-[#f7f8fb]">
              <header className="shrink-0 border-b border-slate-200 bg-white px-3 py-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${stage.accent}`}/>
                    <h2 className="min-w-0 truncate text-sm font-bold text-slate-900" title={stage.name}>{stage.name}</h2>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{stageDeals.length}</span>
                </div>
                <p className="mt-1 text-xs font-medium text-slate-500">{formatCurrency(total)} · {stageDeals.length === 1 ? "1 deal" : `${stageDeals.length} deals`}</p>
              </header>
              <div className="scroll-soft flex-1 space-y-2 overflow-y-auto p-2.5">
                {stageDeals.length ? stageDeals.map((deal) => <DealCard key={deal.id} deal={deal} onOpen={onOpen}/>) : (<div className="flex min-h-28 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white/60 px-4 text-center text-xs text-slate-400">Drag a deal here</div>)}
              </div>
            </section>);
        })}
      </div>
    </div>);
}
function Checkbox({ checked, indeterminate = false, onChange, label }) {
    const checkboxRef = useRef(null);
    useEffect(() => {
        if (checkboxRef.current)
            checkboxRef.current.indeterminate = indeterminate;
    }, [indeterminate]);
    return <input ref={checkboxRef} type="checkbox" checked={checked} onClick={(event) => event.stopPropagation()} onChange={onChange} aria-label={label} className="h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 accent-blue-600"/>;
}
const defaultDealColumnOrder = [
    "deal",
    "organization",
    "stage",
    "value",
    "probability",
    "expectedClose",
    "nextActivity",
    "assignedTo",
];
const dealColumnLabels = {
    deal: "Deal",
    organization: "Organization",
    stage: "Stage",
    value: "Value",
    probability: "Probability",
    expectedClose: "Expected close",
    nextActivity: "Next activity",
    assignedTo: "Assigned to",
};
const defaultDealColumnWidths = {
    deal: 280,
    organization: 210,
    stage: 195,
    value: 145,
    probability: 158,
    expectedClose: 196,
    nextActivity: 260,
    assignedTo: 180,
};
function ListView({ deals, onOpen, selected, setSelected }) {
    const [columnOrder, setColumnOrder] = useState(() => {
        try {
            const saved = window.localStorage.getItem("volymoly-deal-list-column-order-v1");
            const parsed = saved ? JSON.parse(saved) : null;
            return parsed && parsed.length === defaultDealColumnOrder.length ? parsed : defaultDealColumnOrder;
        }
        catch {
            return defaultDealColumnOrder;
        }
    });
    const [visibleColumns, setVisibleColumns] = useState(() => {
        try {
            const saved = window.localStorage.getItem("volymoly-deal-list-visible-columns-v1");
            const parsed = saved ? JSON.parse(saved) : null;
            return parsed && parsed.length ? parsed : defaultDealColumnOrder;
        }
        catch {
            return defaultDealColumnOrder;
        }
    });
    const [columnWidths, setColumnWidths] = useState(() => {
        try {
            const saved = window.localStorage.getItem("volymoly-deal-list-column-widths-v1");
            const parsed = saved ? JSON.parse(saved) : null;
            return parsed && defaultDealColumnOrder.every((column) => Number.isFinite(parsed[column]))
                ? { ...defaultDealColumnWidths, ...parsed }
                : defaultDealColumnWidths;
        }
        catch {
            return defaultDealColumnWidths;
        }
    });
    const [draggedColumn, setDraggedColumn] = useState(null);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const settingsRef = useRef(null);
    useEffect(() => {
        // Keep the selection valid when the filtered deal set changes.
        setSelected((current) => current.filter((id) => deals.some((deal) => deal.id === id)));
    }, [deals, setSelected]);
    useEffect(() => {
        window.localStorage.setItem("volymoly-deal-list-column-order-v1", JSON.stringify(columnOrder));
    }, [columnOrder]);
    useEffect(() => {
        window.localStorage.setItem("volymoly-deal-list-visible-columns-v1", JSON.stringify(visibleColumns));
    }, [visibleColumns]);
    useEffect(() => {
        window.localStorage.setItem("volymoly-deal-list-column-widths-v1", JSON.stringify(columnWidths));
    }, [columnWidths]);
    useEffect(() => {
        const close = (event) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target))
                setSettingsOpen(false);
        };
        window.addEventListener("mousedown", close);
        return () => window.removeEventListener("mousedown", close);
    }, []);
    const allSelected = deals.length > 0 && selected.length === deals.length;
    const someSelected = selected.length > 0 && !allSelected;
    const moveColumn = (from, to) => {
        if (from === to)
            return;
        setColumnOrder((current) => {
            const next = [...current];
            const fromIndex = next.indexOf(from);
            const toIndex = next.indexOf(to);
            if (fromIndex < 0 || toIndex < 0)
                return current;
            next.splice(fromIndex, 1);
            next.splice(toIndex, 0, from);
            return next;
        });
    };
    const toggleDeal = (id) => {
        setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    };
    const startColumnResize = (event, column) => {
        event.preventDefault();
        event.stopPropagation();
        setDraggedColumn(null);
        const startX = event.clientX;
        const startWidth = columnWidths[column];
        const handlePointerMove = (moveEvent) => {
            const nextWidth = Math.min(600, Math.max(110, startWidth + moveEvent.clientX - startX));
            setColumnWidths((current) => ({ ...current, [column]: nextWidth }));
        };
        const stopColumnResize = () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", stopColumnResize);
            window.removeEventListener("pointercancel", stopColumnResize);
        };
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", stopColumnResize);
        window.addEventListener("pointercancel", stopColumnResize);
    };
    const renderCell = (deal, column) => {
        switch (column) {
            case "deal":
                return <span className="font-semibold text-slate-900">{deal.title}</span>;
            case "organization":
                return <span className="text-slate-700">{deal.organization}</span>;
            case "stage":
                return <span className="inline-flex rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">{stageName(deal.stage)}</span>;
            case "value":
                return <span className="font-semibold text-slate-900">{formatCurrency(deal.value)}</span>;
            case "probability":
                return <span className="text-slate-700">{deal.probability}%</span>;
            case "expectedClose":
                return <span className="whitespace-nowrap text-slate-700">{formatDate(deal.expectedClose)}</span>;
            case "nextActivity":
                return <span className={`font-medium ${activityClass(deal.activityState)}`}>{deal.nextActivity || "No activity scheduled"}</span>;
            case "assignedTo":
                return <span className="font-medium text-slate-700">{deal.owner || "Unassigned"}</span>;
            default:
                return null;
        }
    };
    return (<div className="flex min-h-0 flex-1 flex-col bg-white">
      <div data-sales-menu-keep-open className="relative min-h-0 flex-1 overflow-auto bg-white">
        <table className="min-w-full table-fixed border-collapse text-left" style={{ width: columnOrder.filter((column) => visibleColumns.includes(column)).reduce((total, column) => total + columnWidths[column], 96) }}>
          <colgroup>
            <col style={{ width: 48 }}/>
            {columnOrder.filter((column) => visibleColumns.includes(column)).map((column) => <col key={column} style={{ width: columnWidths[column] }}/>) }
            <col style={{ width: 48 }}/>
          </colgroup>
          <thead className="sticky top-0 z-20 bg-[#f8faff] shadow-[0_1px_0_#e2e8f0]">
            <tr>
              <th className="h-10 w-12 border-r border-slate-200 p-0 align-middle">
                <div className="flex h-full w-full items-center justify-center">
                  <Checkbox checked={allSelected} indeterminate={someSelected} onChange={() => setSelected(allSelected ? [] : deals.map((deal) => deal.id))} label={allSelected ? "Unselect all deals" : "Select all deals"}/>
                </div>
              </th>
              {columnOrder.filter((column) => visibleColumns.includes(column)).map((column) => (<th key={column} draggable onDragStart={() => setDraggedColumn(column)} onDragEnd={() => setDraggedColumn(null)} onDragOver={(event) => event.preventDefault()} onDrop={() => {
                if (draggedColumn)
                    moveColumn(draggedColumn, column);
                setDraggedColumn(null);
            }} className={`relative h-10 cursor-grab select-none border-r border-slate-200 px-3 text-xs font-semibold text-slate-600 transition-colors active:cursor-grabbing ${draggedColumn === column ? "bg-blue-50 text-blue-700" : "hover:bg-blue-50/70"}`} title="Drag to reorder this column">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    {dealColumnLabels[column]}
                    <svg className="h-3 w-3 text-slate-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <circle cx="6" cy="6" r="1.2"/>
                      <circle cx="14" cy="6" r="1.2"/>
                      <circle cx="6" cy="14" r="1.2"/>
                      <circle cx="14" cy="14" r="1.2"/>
                    </svg>
                  </span>
                  <span role="separator" aria-orientation="vertical" aria-label={`Resize ${dealColumnLabels[column]} column`} onPointerDown={(event) => startColumnResize(event, column)} onDragStart={(event) => { event.preventDefault(); event.stopPropagation(); }} className="absolute -right-1 top-0 z-30 h-full w-2 cursor-col-resize touch-none hover:bg-blue-400/60" title="Drag to resize column"/>
                </th>))}
              <th ref={settingsRef} className="relative h-10 w-12 border-l border-slate-200 px-1 text-center align-middle">
                <button type="button" onClick={(event) => { event.stopPropagation(); setSettingsOpen((current) => !current); }} className="mx-auto flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-blue-50 hover:text-blue-700" title="Table settings" aria-label="Table settings">
                  <Icon name="settings"/>
                </button>
                {settingsOpen && (<div onClick={(event) => event.stopPropagation()} className="absolute right-2 top-9 z-40 w-48 rounded-lg border border-slate-200 bg-white p-1.5 text-left shadow-xl">
                    <p className="px-2.5 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Visible columns</p>
                    <div className="space-y-0.5">
                      {columnOrder.map((column) => {
                const checked = visibleColumns.includes(column);
                return (<button key={column} type="button" onClick={() => {
                        setVisibleColumns((current) => checked
                            ? current.length > 1 ? current.filter((item) => item !== column) : current
                            : [...current, column]);
                    }} className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-normal leading-4 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700">
                            <span className={`flex h-3.5 w-3.5 items-center justify-center rounded border ${checked ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"}`}>
                              {checked && <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2.4"><path strokeLinecap="round" strokeLinejoin="round" d="M2 6l2.5 2.5L10 3"/></svg>}
                            </span>
                            {dealColumnLabels[column]}
                          </button>);
            })}
                    </div>
                    <div className="my-1.5 border-t border-slate-100"/>
                    <button type="button" onClick={() => {
                setColumnOrder(defaultDealColumnOrder);
                setVisibleColumns(defaultDealColumnOrder);
                setColumnWidths(defaultDealColumnWidths);
                setSettingsOpen(false);
            }} className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-normal leading-4 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700">
                      <Icon name="restore" className="h-3.5 w-3.5"/>
                      Reset columns
                    </button>
                  </div>)}
              </th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => {
            const isSelected = selected.includes(deal.id);
            return (<tr key={deal.id} onClick={() => onOpen(deal)} onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onOpen(deal);
                    }
                }} tabIndex={0} className={`h-11 cursor-pointer border-b border-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-300 ${isSelected ? "bg-blue-50/70" : "bg-white hover:bg-blue-50/30"}`} aria-label={`Open ${deal.title} deal detail`}>
                  <td className="w-12 border-r border-slate-200 p-0 align-middle" onClick={(event) => event.stopPropagation()}>
                    <div className="flex h-11 w-full items-center justify-center">
                      <Checkbox checked={isSelected} onChange={() => toggleDeal(deal.id)} label={`Select ${deal.title}`}/>
                    </div>
                  </td>
                  {columnOrder.filter((column) => visibleColumns.includes(column)).map((column) => (<td key={column} className="overflow-hidden whitespace-nowrap text-ellipsis border-r border-slate-200 px-3 py-2 text-sm align-middle">
                      <div className="overflow-hidden text-ellipsis whitespace-nowrap">{renderCell(deal, column)}</div>
                    </td>))}
                  <td className="w-12 border-l border-slate-200 px-1 py-1 text-center align-middle">
                    <button type="button" onClick={(event) => { event.stopPropagation(); onOpen(deal); }} className="mx-auto flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-700" title="Open deal detail" aria-label={`Open ${deal.title} deal detail`}>
                      <Icon name="more"/>
                    </button>
                  </td>
                </tr>);
        })}
          </tbody>
        </table>

        {!deals.length && (<section className="absolute inset-x-0 bottom-0 top-10 flex items-center justify-center bg-white px-6 text-center">
            <div className="max-w-md -translate-y-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon name="deals" className="h-6 w-6"/></div>
              <h2 className="mt-4 text-xl font-semibold text-slate-900">No deals found</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Adjust your filters or create a new deal.</p>
            </div>
          </section>)}
      </div>
    </div>);
}
function ForecastView({ deals, onEdit }) {
    const monthGroups = useMemo(() => {
        const grouped = new Map();
        deals.forEach((deal) => {
            const date = new Date(`${deal.expectedClose}T00:00:00`);
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
            grouped.set(key, [...(grouped.get(key) ?? []), deal]);
        });
        return [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b));
    }, [deals]);
    const weightedOpenValue = deals.reduce((sum, deal) => sum + deal.value * deal.probability / 100, 0);
    const negotiationValue = deals
        .filter((deal) => deal.stage === "won")
        .reduce((sum, deal) => sum + deal.value, 0);
    const averageProbability = Math.round(deals.reduce((sum, deal) => sum + deal.probability, 0) / Math.max(deals.length, 1));
    return (<div className="scroll-soft min-h-0 flex-1 overflow-auto bg-slate-50 p-3 sm:p-4 lg:p-5">
      <div className="w-full space-y-4">
        <section className="w-full rounded-xl border border-blue-100 bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white shadow-sm sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">Revenue forecast</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <div className="min-w-0 rounded-lg border border-white/15 bg-white/10 p-3 sm:bg-transparent sm:p-0">
              <p className="truncate text-xl font-bold sm:text-2xl">{formatCurrency(weightedOpenValue)}</p>
              <p className="mt-1 text-xs text-blue-100">Weighted open value</p>
            </div>
            <div className="min-w-0 rounded-lg border border-white/15 bg-white/10 p-3 sm:bg-transparent sm:p-0">
              <p className="truncate text-xl font-bold sm:text-2xl">{formatCurrency(negotiationValue)}</p>
              <p className="mt-1 text-xs text-blue-100">Negotiation value</p>
            </div>
            <div className="min-w-0 rounded-lg border border-white/15 bg-white/10 p-3 sm:bg-transparent sm:p-0">
              <p className="text-xl font-bold sm:text-2xl">{averageProbability}%</p>
              <p className="mt-1 text-xs text-blue-100">Average probability</p>
            </div>
          </div>
        </section>

        <div className="space-y-4">
          {monthGroups.map(([key, items]) => {
            const monthDate = new Date(`${key}-01T00:00:00`);
            const label = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(monthDate);
            const total = items.reduce((sum, deal) => sum + deal.value, 0);
            const weighted = items.reduce((sum, deal) => sum + deal.value * deal.probability / 100, 0);
            return (<section key={key} className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <header className="flex flex-col gap-3 border-b border-slate-200 bg-[#f8faff] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-bold text-slate-900">{label}</h2>
                    <p className="mt-0.5 text-xs text-slate-500">{items.length} expected {items.length === 1 ? "deal" : "deals"}</p>
                  </div>
                  <div className="grid w-full grid-cols-2 gap-4 sm:w-auto sm:min-w-[250px] sm:gap-6">
                    <div className="min-w-0 sm:text-right">
                      <p className="text-[10px] font-semibold uppercase text-slate-400">Total</p>
                      <p className="truncate text-sm font-bold text-slate-900">{formatCurrency(total)}</p>
                    </div>
                    <div className="min-w-0 sm:text-right">
                      <p className="text-[10px] font-semibold uppercase text-slate-400">Weighted</p>
                      <p className="truncate text-sm font-bold text-blue-700">{formatCurrency(weighted)}</p>
                    </div>
                  </div>
                </header>

                <div className="divide-y divide-slate-100">
                  {items.map((deal) => (<button key={deal.id} type="button" onClick={() => onEdit(deal)} className="grid w-full min-w-0 gap-3 px-4 py-3 text-left transition-colors hover:bg-blue-50/40 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center lg:grid-cols-[minmax(240px,2fr)_minmax(130px,0.8fr)_minmax(120px,0.7fr)_minmax(140px,0.8fr)]">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">{deal.title}</p>
                        <p className="mt-0.5 truncate text-xs text-slate-500">{deal.organization} · {deal.owner}</p>
                      </div>
                      <span className="w-fit max-w-full truncate rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                        {stageName(deal.stage)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-slate-900">{formatCurrency(deal.value)}</p>
                        <p className="text-[10px] text-slate-400">Deal value</p>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-blue-700">{formatCurrency(deal.value * deal.probability / 100)}</p>
                        <p className="text-[10px] text-slate-400">{deal.probability}% weighted</p>
                      </div>
                    </button>))}
                </div>
              </section>);
        })}
        </div>

        {!monthGroups.length && (<section className="flex min-h-[320px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Icon name="forecast" className="h-6 w-6"/>
            </div>
            <h2 className="mt-3 text-sm font-semibold text-slate-900">No forecast available</h2>
            <p className="mt-1 text-xs text-slate-500">Deals with an expected close date will appear here.</p>
          </section>)}
      </div>
    </div>);
}
function ArchiveView({ deals, onRestore }) {
    const [selected, setSelected] = useState([]);
    const all = deals.length > 0 && selected.length === deals.length;
    return (<div className="flex min-h-0 flex-1 flex-col bg-white">
      <div className="flex min-h-12 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-[#f8faff] px-4 py-2">
        <div><p className="text-sm font-semibold text-slate-900">Archived deals</p><p className="text-xs text-slate-500">Restore deals to return them to the active pipeline.</p></div>
        {selected.length > 0 && <div className="flex items-center gap-2"><button type="button" onClick={() => { onRestore(selected); setSelected([]); }} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-blue-200 bg-white px-2.5 text-xs font-semibold text-blue-700 hover:bg-blue-50"><Icon name="restore"/> Restore</button><button type="button" disabled className="inline-flex h-8 cursor-not-allowed items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-xs font-semibold text-slate-400"><Icon name="trash"/> Delete <Icon name="lock" className="h-3 w-3"/></button></div>}
      </div>
      <div className="scroll-soft min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="sticky top-0 bg-white shadow-[0_1px_0_#e2e8f0]"><tr className="text-xs font-semibold text-slate-500"><th className="w-12 px-4 py-3"><Checkbox checked={all} onChange={() => setSelected(all ? [] : deals.map((deal) => deal.id))} label="Select all archived deals"/></th><th className="px-3 py-3">Deal</th><th className="px-3 py-3">Organization</th><th className="px-3 py-3">Previous stage</th><th className="px-3 py-3">Value</th><th className="px-3 py-3">Assigned to</th><th className="w-24 px-3 py-3"/></tr></thead>
          <tbody>{deals.map((deal) => <tr key={deal.id} className="border-b border-slate-100 text-sm text-slate-700 hover:bg-blue-50/30"><td className="px-4 py-3"><Checkbox checked={selected.includes(deal.id)} onChange={() => setSelected((current) => current.includes(deal.id) ? current.filter((id) => id !== deal.id) : [...current, deal.id])} label={`Select ${deal.title}`}/></td><td className="px-3 py-3 font-semibold text-slate-900">{deal.title}</td><td className="px-3 py-3">{deal.organization}</td><td className="px-3 py-3">{stageName(deal.stage)}</td><td className="px-3 py-3 font-semibold">{formatCurrency(deal.value)}</td><td className="px-3 py-3">{deal.owner}</td><td className="px-3 py-3"><button type="button" onClick={() => onRestore([deal.id])} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 px-2.5 text-xs font-semibold text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"><Icon name="restore"/> Restore</button></td></tr>)}</tbody>
        </table>
        {!deals.length && <div className="flex h-72 flex-col items-center justify-center text-center"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400"><Icon name="archive" className="h-6 w-6"/></div><p className="mt-3 text-sm font-semibold text-slate-800">No archived deals</p><p className="mt-1 text-xs text-slate-400">Archived deals will appear here.</p></div>}
      </div>
    </div>);
}
function BlankDealPage({ deal, onBack, onNavigateSales }) {
    return (<SalesNavigation activeItem="deals" onNavigate={onNavigateSales} searchPlaceholder="Search deals, organizations or assignees" avatar="PS">
      <DealDetailReference key={deal.id} selectedDeal={deal} onBack={onBack}/>
    </SalesNavigation>);
}
function Field({ label, children }) {
    return <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span>{children}</label>;
}
const inputClass = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100";
function DealModal({ deal, onClose, onSave }) {
    const [title, setTitle] = useState(deal?.title ?? "");
    const [organization, setOrganization] = useState(deal?.organization ?? "");
    const [contact, setContact] = useState(deal?.contact ?? "");
    const [value, setValue] = useState(String(deal?.value ?? ""));
    const [stage, setStage] = useState(deal?.stage ?? "new");
    const [probability, setProbability] = useState(String(deal?.probability ?? 10));
    const [expectedClose, setExpectedClose] = useState(deal?.expectedClose ?? "2026-08-31");
    const [nextActivity, setNextActivity] = useState(deal?.nextActivity ?? "");
    const [owner, setOwner] = useState(deal?.owner ?? "Priya Sharma");
    const [priority, setPriority] = useState(deal?.priority ?? "Medium");
    const [projectNeeds, setProjectNeeds] = useState(deal?.projectNeeds.join(", ") ?? "");
    const submit = (event) => {
        event.preventDefault();
        if (!title.trim() || !organization.trim())
            return;
        onSave({
            title: title.trim(),
            organization: organization.trim(),
            contact: contact.trim(),
            value: Number(value || 0),
            stage,
            probability: Math.max(0, Math.min(100, Number(probability || 0))),
            expectedClose,
            nextActivity: nextActivity.trim() || "No activity scheduled",
            activityState: nextActivity.trim() ? "upcoming" : "none",
            owner,
            projectNeeds: projectNeeds.split(",").map((item) => item.trim()).filter(Boolean),
            priority,
        }, deal?.id);
    };
    return (<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[1px]" onMouseDown={(event) => { if (event.currentTarget === event.target)
        onClose(); }}>
      <form onSubmit={submit} className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <header className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4">
          <div><h2 className="text-lg font-bold text-slate-900">{deal ? "Edit Deal" : "New Deal"}</h2><p className="mt-0.5 text-xs text-slate-500">Capture the commercial opportunity and place it in the pipeline.</p></div>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Icon name="close"/></button>
        </header>
        <div className="scroll-soft grid gap-4 overflow-y-auto p-5 sm:grid-cols-2">
          <div className="sm:col-span-2"><Field label="Deal title"><input className={inputClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Hotel Jindal Brand & Website Revamp" autoFocus/></Field></div>
          <Field label="Organization"><input className={inputClass} value={organization} onChange={(event) => setOrganization(event.target.value)} placeholder="Company name"/></Field>
          <Field label="Contact person"><input className={inputClass} value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Primary contact"/></Field>
          <Field label="Deal value (INR)"><input className={inputClass} type="number" min="0" value={value} onChange={(event) => setValue(event.target.value)} placeholder="0"/></Field>
          <Field label="Pipeline stage"><select className={inputClass} value={stage} onChange={(event) => { const next = event.target.value; setStage(next); setProbability(String(stageDefinitions.find((item) => item.id === next)?.probability ?? 0)); }}>{stageDefinitions.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></Field>
          <Field label="Probability"><div className="relative"><input className={`${inputClass} pr-8`} type="number" min="0" max="100" value={probability} onChange={(event) => setProbability(event.target.value)}/><span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">%</span></div></Field>
          <Field label="Expected close"><input className={inputClass} type="date" value={expectedClose} onChange={(event) => setExpectedClose(event.target.value)}/></Field>
          <Field label="Assigned to"><select className={inputClass} value={owner} onChange={(event) => setOwner(event.target.value)}><option>Priya Sharma</option><option>Arjun Mehta</option><option>Neha Verma</option></select></Field>
          <Field label="Priority"><select className={inputClass} value={priority} onChange={(event) => setPriority(event.target.value)}><option>High</option><option>Medium</option><option>Low</option></select></Field>
          <div className="sm:col-span-2"><Field label="Project needs"><input className={inputClass} value={projectNeeds} onChange={(event) => setProjectNeeds(event.target.value)} placeholder="Branding, Website, UX/UI"/></Field></div>
          <div className="sm:col-span-2"><Field label="Next activity"><input className={inputClass} value={nextActivity} onChange={(event) => setNextActivity(event.target.value)} placeholder="e.g. Proposal follow-up · 06 Aug, 3:00 PM"/></Field></div>
        </div>
        <footer className="flex shrink-0 items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-5 py-3.5">
          <button type="button" onClick={onClose} className="h-9 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
          <button type="submit" className="h-9 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700">{deal ? "Save changes" : "Create Deal"}</button>
        </footer>
      </form>
    </div>);
}
export default function DealsWorkspace({ onNavigateSales = () => {} }) {
    const [view, setView] = useState("list");
    const [deals, setDeals] = useState(initialDeals);
    const [storageHydrated, setStorageHydrated] = useState(false);
    useEffect(() => {
        try {
            const saved = localStorage.getItem("volymoly-deals-v1");
            if (saved)
                // Restore browser-only state after Next.js hydration.
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setDeals(JSON.parse(saved));
        }
        catch {
            // Keep the reference data if stored data cannot be read.
        }
        setStorageHydrated(true);
    }, []);
    const [search, setSearch] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [stageFilter, setStageFilter] = useState("");
    const [ownerFilter, setOwnerFilter] = useState("");
    const [sortMode, setSortMode] = useState("activity");
    const [selectedDealIds, setSelectedDealIds] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingDeal, setEditingDeal] = useState(null);
    const [openedDeal, setOpenedDeal] = useState(null);
    useEffect(() => {
        if (!storageHydrated)
            return;
        localStorage.setItem("volymoly-deals-v1", JSON.stringify(deals));
    }, [deals, storageHydrated]);
    const activeDeals = useMemo(() => {
        const query = search.trim().toLowerCase();
        const items = deals.filter((deal) => !deal.archived)
            .filter((deal) => !query || [deal.title, deal.organization, deal.contact, deal.owner, ...deal.projectNeeds].join(" ").toLowerCase().includes(query))
            .filter((deal) => !stageFilter || deal.stage === stageFilter)
            .filter((deal) => !ownerFilter || deal.owner === ownerFilter);
        return [...items].sort((a, b) => {
            if (sortMode === "value-desc")
                return b.value - a.value;
            if (sortMode === "close-date")
                return a.expectedClose.localeCompare(b.expectedClose);
            if (sortMode === "recent")
                return b.createdAt.localeCompare(a.createdAt);
            const order = { overdue: 0, today: 1, upcoming: 2, none: 3 };
            return order[a.activityState] - order[b.activityState];
        });
    }, [deals, ownerFilter, search, sortMode, stageFilter]);
    const archivedDeals = useMemo(() => deals.filter((deal) => deal.archived), [deals]);
    const moveDeal = (id, stage) => {
        const probability = stageDefinitions.find((item) => item.id === stage)?.probability ?? 0;
        setDeals((current) => current.map((deal) => deal.id === id ? { ...deal, stage, probability } : deal));
    };
    const archiveDeals = (ids) => setDeals((current) => current.map((deal) => ids.includes(deal.id) ? { ...deal, archived: true } : deal));
    const archiveSelectedDeals = () => {
        if (!selectedDealIds.length)
            return;
        archiveDeals(selectedDealIds);
        setSelectedDealIds([]);
    };
    const restoreDeals = (ids) => setDeals((current) => current.map((deal) => ids.includes(deal.id) ? { ...deal, archived: false } : deal));
    const saveDeal = (newDeal, id) => {
        if (id) {
            setDeals((current) => current.map((deal) => deal.id === id ? { ...deal, ...newDeal } : deal));
        }
        else {
            setDeals((current) => [{ ...newDeal, id: `deal-${Date.now()}`, createdAt: new Date().toISOString(), archived: false }, ...current]);
        }
        setModalOpen(false);
        setEditingDeal(null);
    };
    const openEdit = (deal) => { setEditingDeal(deal); setModalOpen(true); };
    if (openedDeal) {
        return <BlankDealPage deal={openedDeal} onBack={() => setOpenedDeal(null)} onNavigateSales={onNavigateSales}/>;
    }
    return (<SalesNavigation activeItem="deals" onNavigate={onNavigateSales} searchPlaceholder="Search deals, organizations or assignees" searchValue={search} onSearchChange={setSearch} avatar="PS">
      <main className="deals-page flex min-w-0 flex-1 flex-col overflow-hidden">
        <Toolbar view={view} setView={(nextView) => { setView(nextView); setSelectedDealIds([]); }} onAddDeal={() => { setEditingDeal(null); setModalOpen(true); }} filterOpen={filterOpen} setFilterOpen={setFilterOpen} sortMode={sortMode} setSortMode={setSortMode} stageFilter={stageFilter} setStageFilter={setStageFilter} ownerFilter={ownerFilter} setOwnerFilter={setOwnerFilter} selectedCount={selectedDealIds.length} onArchiveSelected={archiveSelectedDeals}/>
        {view === "pipeline" && <PipelineView deals={activeDeals} onMove={moveDeal} onOpen={setOpenedDeal}/>}
        {view === "list" && <ListView deals={activeDeals} onOpen={setOpenedDeal} selected={selectedDealIds} setSelected={setSelectedDealIds}/>}
        {view === "forecast" && <ForecastView deals={activeDeals} onEdit={openEdit}/>}
        {view === "archive" && <ArchiveView deals={archivedDeals} onRestore={restoreDeals}/>}
      </main>
      {modalOpen && <DealModal deal={editingDeal} onClose={() => { setModalOpen(false); setEditingDeal(null); }} onSave={saveDeal}/>}
    </SalesNavigation>);
}
