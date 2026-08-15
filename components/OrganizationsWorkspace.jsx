"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SalesNavigation from "./SalesNavigation";

const initialOrganizations = [
    { id: "organization-1", name: "[Sample] Fenwick Consumer Goods", address: "", people: 1, closedDeals: 0, openDeals: 0, nextActivity: "02 Aug 2026" },
    { id: "organization-2", name: "[Sample] Delray Group", address: "", people: 1, closedDeals: 0, openDeals: 1, nextActivity: "03 Aug 2026" },
    { id: "organization-3", name: "Hotel Jindal", address: "", people: 1, closedDeals: 0, openDeals: 1, nextActivity: "01 Aug 2026" },
    { id: "organization-4", name: "Fenwick Consumer Goods", address: "", people: 0, closedDeals: 0, openDeals: 1, nextActivity: "" },
];

const columns = [
    { id: "name", label: "Name", width: 250 },
    { id: "address", label: "Address", width: 260 },
    { id: "people", label: "People", width: 130 },
    { id: "closedDeals", label: "Closed Deals", width: 150 },
    { id: "openDeals", label: "Open Deals", width: 140 },
    { id: "nextActivity", label: "Next Activity Date", width: 190 },
];

const defaultColumnWidths = Object.fromEntries(columns.map((column) => [column.id, column.width]));

function Icon({ name, className = "h-4 w-4" }) {
    const common = { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.9 };
    if (name === "filter")
        return <svg {...common}><path strokeLinecap="round" d="M4 6h16M7 12h10M10 18h4"/></svg>;
    if (name === "more")
        return <svg {...common}><circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.2" fill="currentColor" stroke="none"/></svg>;
    if (name === "settings")
        return <svg {...common}><circle cx="12" cy="12" r="3"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.7 1.7 0 00.34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 00-1.88-.34 1.7 1.7 0 00-1.04 1.56v.08h-3v-.08a1.7 1.7 0 00-1.04-1.56 1.7 1.7 0 00-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 007 15.2a1.7 1.7 0 00-1.56-1.04H5.3v-3h.14A1.7 1.7 0 007 10.12a1.7 1.7 0 00-.34-1.88l-.06-.06 2.12-2.12.06.06a1.7 1.7 0 001.88.34A1.7 1.7 0 0011.7 4.9v-.2h3v.2a1.7 1.7 0 001.04 1.56 1.7 1.7 0 001.88-.34l.06-.06 2.12 2.12-.06.06a1.7 1.7 0 00-.34 1.88 1.7 1.7 0 001.56 1.04h.14v3h-.14A1.7 1.7 0 0019.4 15z"/></svg>;
    if (name === "check")
        return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4 4L19 7"/></svg>;
    if (name === "export")
        return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15V3m0 0L8 7m4-4 4 4M5 13v6h14v-6"/></svg>;
    if (name === "map")
        return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21s6-5.2 6-11a6 6 0 10-12 0c0 5.8 6 11 6 11z"/><circle cx="12" cy="10" r="2"/></svg>;
    if (name === "import")
        return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4M5 17v3h14v-3"/></svg>;
    if (name === "merge")
        return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M6 4v3a5 5 0 005 5h7M15 9l3 3-3 3M6 20v-3a5 5 0 015-5"/></svg>;
    if (name === "cleanup")
        return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M4 18c3-4 5-8 6-13l4 1c-1 5 0 9 3 13M7 15h9M5 19h13"/></svg>;
    if (name === "restore")
        return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M5.5 15a7 7 0 101.6-8"/></svg>;
    if (name === "edit")
        return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M14.5 5.5l4 4M4 20l3.8-.8L19 8a2.1 2.1 0 00-3-3L4.8 16.2 4 20z"/></svg>;
    if (name === "trash")
        return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V4h6v3m-9 0 1 13h10l1-13M10 11v5m4-5v5"/></svg>;
    if (name === "organizations")
        return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M4 21V5a2 2 0 012-2h7a2 2 0 012 2v16M15 9h3a2 2 0 012 2v10M2 21h20M8 7h3M8 11h3M8 15h3"/></svg>;
    return null;
}

function Checkbox({ checked, indeterminate = false, onChange, label }) {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current)
            ref.current.indeterminate = indeterminate;
    }, [indeterminate]);
    return <input ref={ref} type="checkbox" checked={checked} onChange={onChange} aria-label={label} className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-blue-600"/>;
}

function getStoredOrganizations() {
    if (typeof window === "undefined")
        return [];
    try {
        const stored = window.localStorage.getItem("volymoly-organizations-v1");
        const parsed = stored ? JSON.parse(stored) : null;
        return Array.isArray(parsed) ? parsed : initialOrganizations;
    }
    catch {
        return initialOrganizations;
    }
}

function getStoredColumnWidths() {
    if (typeof window === "undefined")
        return defaultColumnWidths;
    try {
        const stored = window.localStorage.getItem("volymoly-organizations-column-widths-v1");
        const parsed = stored ? JSON.parse(stored) : null;
        return Object.fromEntries(columns.map((column) => [column.id, typeof parsed?.[column.id] === "number" ? parsed[column.id] : column.width]));
    }
    catch {
        return defaultColumnWidths;
    }
}

function OrganizationModal({ organization, onClose, onSave }) {
    const [form, setForm] = useState(() => ({
        name: organization?.name ?? "",
        address: organization?.address ?? "",
        people: organization?.people ?? 0,
        closedDeals: organization?.closedDeals ?? 0,
        openDeals: organization?.openDeals ?? 0,
        nextActivity: organization?.nextActivity ?? "",
    }));
    const [error, setError] = useState("");
    useEffect(() => {
        const closeOnEscape = (event) => event.key === "Escape" && onClose();
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, [onClose]);
    const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
    const submit = (event) => {
        event.preventDefault();
        if (!form.name.trim()) {
            setError("Name is required");
            return;
        }
        onSave({
            ...organization,
            ...form,
            name: form.name.trim(),
            address: form.address.trim(),
            people: Number(form.people) || 0,
            closedDeals: Number(form.closedDeals) || 0,
            openDeals: Number(form.openDeals) || 0,
            nextActivity: form.nextActivity.trim(),
        });
    };
    const fieldClass = "mt-1.5 h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100";
    return (<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[1px]" onMouseDown={onClose} role="dialog" aria-modal="true" aria-label={organization ? "Edit organization" : "Add organization"}>
      <form onSubmit={submit} onMouseDown={(event) => event.stopPropagation()} className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/70 bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div><h2 className="text-base font-bold text-gray-900">{organization ? "Edit Organization" : "Add Organization"}</h2><p className="mt-1 text-xs text-gray-500">Keep company details connected to your sales pipeline.</p></div>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-md text-xl leading-none text-gray-400 hover:bg-gray-100 hover:text-gray-700" aria-label="Close organization form">×</button>
        </header>
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <label className="text-xs font-semibold text-gray-600">Name <span className="text-red-500">*</span><input autoFocus value={form.name} onChange={(event) => { update("name", event.target.value); setError(""); }} placeholder="Organization name" className={fieldClass}/>{error && <span className="mt-1 block text-xs text-red-600">{error}</span>}</label>
          <label className="text-xs font-semibold text-gray-600">Address<input value={form.address} onChange={(event) => update("address", event.target.value)} placeholder="Address" className={fieldClass}/></label>
          <label className="text-xs font-semibold text-gray-600">People<input type="number" min="0" value={form.people} onChange={(event) => update("people", event.target.value)} className={fieldClass}/></label>
          <label className="text-xs font-semibold text-gray-600">Next Activity Date<input value={form.nextActivity} onChange={(event) => update("nextActivity", event.target.value)} placeholder="DD MMM YYYY" className={fieldClass}/></label>
          <label className="text-xs font-semibold text-gray-600">Closed Deals<input type="number" min="0" value={form.closedDeals} onChange={(event) => update("closedDeals", event.target.value)} className={fieldClass}/></label>
          <label className="text-xs font-semibold text-gray-600">Open Deals<input type="number" min="0" value={form.openDeals} onChange={(event) => update("openDeals", event.target.value)} className={fieldClass}/></label>
        </div>
        <footer className="flex justify-end gap-2 border-t border-gray-200 bg-gray-50/70 px-5 py-4">
          <button type="button" onClick={onClose} className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
          <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">{organization ? "Save Changes" : "Add Organization"}</button>
        </footer>
      </form>
    </div>);
}

function exportOrganizationsCsv(organizations) {
    const headings = columns.map((column) => column.label);
    const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
    const csv = [headings, ...organizations.map((organization) => columns.map((column) => organization[column.id]))].map((row) => row.map(escape).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "organizations.csv";
    link.click();
    URL.revokeObjectURL(url);
}

export default function OrganizationsWorkspace({ onNavigateSales = () => {} }) {
    const [organizations, setOrganizations] = useState([]);
    const [hydrated, setHydrated] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);
    const [mailbox, setMailbox] = useState("inbox");
    const [filterOpen, setFilterOpen] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [rowMenu, setRowMenu] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingOrganization, setEditingOrganization] = useState(null);
    const [toast, setToast] = useState("");
    const [visibleColumns, setVisibleColumns] = useState(() => columns.map((column) => column.id));
    const [columnWidths, setColumnWidths] = useState(defaultColumnWidths);
    const [filters, setFilters] = useState({ address: "", dealState: "all" });
    const toolbarRef = useRef(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOrganizations(getStoredOrganizations());
        setColumnWidths(getStoredColumnWidths());
        setHydrated(true);
    }, []);
    useEffect(() => {
        if (hydrated)
            window.localStorage.setItem("volymoly-organizations-v1", JSON.stringify(organizations));
    }, [organizations, hydrated]);
    useEffect(() => {
        if (hydrated)
            window.localStorage.setItem("volymoly-organizations-column-widths-v1", JSON.stringify(columnWidths));
    }, [columnWidths, hydrated]);
    useEffect(() => {
        const closeMenus = (event) => {
            if (toolbarRef.current?.contains(event.target))
                return;
            setFilterOpen(false);
            setMoreOpen(false);
            setSettingsOpen(false);
            setRowMenu(null);
        };
        window.addEventListener("pointerdown", closeMenus);
        return () => window.removeEventListener("pointerdown", closeMenus);
    }, []);
    useEffect(() => {
        if (!toast)
            return undefined;
        const timeout = window.setTimeout(() => setToast(""), 2600);
        return () => window.clearTimeout(timeout);
    }, [toast]);

    const addresses = useMemo(() => [...new Set(organizations.map((organization) => organization.address).filter(Boolean))].sort(), [organizations]);
    const filteredOrganizations = useMemo(() => {
        const query = search.trim().toLowerCase();
        return organizations.filter((organization) => {
            const matchesMailbox = mailbox === "archive" ? Boolean(organization.archived) : !organization.archived;
            const matchesSearch = !query || [organization.name, organization.address, organization.nextActivity].some((value) => String(value ?? "").toLowerCase().includes(query));
            const matchesAddress = !filters.address || organization.address === filters.address;
            const matchesDeals = filters.dealState === "all" || (filters.dealState === "open" ? organization.openDeals > 0 : organization.openDeals === 0);
            return matchesMailbox && matchesSearch && matchesAddress && matchesDeals;
        });
    }, [organizations, search, filters, mailbox]);
    const visibleIds = filteredOrganizations.map((organization) => organization.id);
    const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));
    const someSelected = visibleIds.some((id) => selectedIds.includes(id)) && !allSelected;
    const activeFilterCount = [filters.address, filters.dealState !== "all" ? filters.dealState : ""].filter(Boolean).length;
    const activeColumns = columns.filter((column) => visibleColumns.includes(column.id));
    const tableWidth = activeColumns.reduce((total, column) => total + columnWidths[column.id], 100);

    const toggleAll = () => setSelectedIds((current) => allSelected ? current.filter((id) => !visibleIds.includes(id)) : [...new Set([...current, ...visibleIds])]);
    const toggleSelected = (id) => setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    const changeMailbox = (nextMailbox) => {
        setMailbox(nextMailbox);
        setSelectedIds([]);
        setRowMenu(null);
    };
    const archiveSelected = () => {
        if (!selectedIds.length)
            return;
        const selected = new Set(selectedIds);
        setOrganizations((current) => current.map((organization) => selected.has(organization.id) ? { ...organization, archived: mailbox !== "archive" } : organization));
        setSelectedIds([]);
        setToast(mailbox === "archive" ? "Organizations restored" : "Organizations archived");
    };
    const startColumnResize = (event, columnId) => {
        event.preventDefault();
        event.stopPropagation();
        const startX = event.clientX;
        const startWidth = columnWidths[columnId];
        const handlePointerMove = (moveEvent) => {
            const nextWidth = Math.min(600, Math.max(110, startWidth + moveEvent.clientX - startX));
            setColumnWidths((current) => ({ ...current, [columnId]: nextWidth }));
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
    const openNewOrganization = () => { setEditingOrganization(null); setModalOpen(true); };
    const saveOrganization = (organization) => {
        if (organization.id)
            setOrganizations((current) => current.map((item) => item.id === organization.id ? organization : item));
        else
            setOrganizations((current) => [{ ...organization, id: `organization-${Date.now()}` }, ...current]);
        setModalOpen(false);
        setEditingOrganization(null);
        setToast(organization.id ? "Organization updated" : "Organization added");
    };
    const deleteOrganization = (id) => {
        setOrganizations((current) => current.filter((organization) => organization.id !== id));
        setSelectedIds((current) => current.filter((item) => item !== id));
        setRowMenu(null);
        setToast("Organization removed");
    };
    const runMoreAction = (label) => {
        setMoreOpen(false);
        if (label === "Export filter results") {
            exportOrganizationsCsv(filteredOrganizations);
            setToast("Organizations exported");
            return;
        }
        if (label === "Merge duplicates") {
            onNavigateSales("merge");
            return;
        }
        setToast(`${label} selected`);
    };
    const renderCell = (organization, column) => {
        const value = organization[column.id];
        if (column.id === "name")
            return <span className="font-semibold text-gray-900">{value}</span>;
        if (["people", "closedDeals", "openDeals"].includes(column.id))
            return <span className="block text-right tabular-nums">{value}</span>;
        return value || <span className="text-gray-400">—</span>;
    };
    const moreItems = [
        ["Export filter results", "export"], ["Show on map", "map"], ["Import data", "import"],
        ["Merge duplicates", "merge"], ["Open data cleanup", "cleanup"], ["Restore data", "restore"],
    ];

    return (<SalesNavigation activeItem="organizations" onNavigate={onNavigateSales} searchPlaceholder="Search organizations or addresses" searchValue={search} onSearchChange={setSearch} avatar="PS">
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white">
        <div ref={toolbarRef} className="relative flex min-h-12 shrink-0 flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-3 py-2 sm:px-4">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => changeMailbox("inbox")} title="Inbox" aria-label="Inbox" className={`flex h-9 w-9 items-center justify-center rounded-md border transition-colors ${mailbox === "inbox" ? "border-blue-200 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"}`}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}><path strokeLinecap="round" strokeLinejoin="round" d="M4 13.5h4l2 3h4l2-3h4M5.5 5h13L21 13.5V19a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19v-5.5L5.5 5z"/></svg>
            </button>
            <button type="button" onClick={() => changeMailbox("archive")} title="Archive" aria-label="Archive" className={`flex h-9 w-9 items-center justify-center rounded-md border transition-colors ${mailbox === "archive" ? "border-blue-200 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"}`}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M5 7l1 13h12l1-13M3.5 3.5h17v3.5h-17zM9 11h6"/></svg>
            </button>
            {selectedIds.length > 0 && (<>
              <span className="mx-1 h-5 w-px bg-gray-200" aria-hidden="true"/>
              <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">{selectedIds.length} selected</span>
              <button type="button" onClick={archiveSelected} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 text-xs font-semibold text-gray-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700" title={mailbox === "archive" ? "Restore selected organizations" : "Archive selected organizations"}>
                {mailbox === "archive" ? <Icon name="restore"/> : <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M5 7l1 13h12l1-13M3.5 3.5h17v3.5h-17zM9 11h6"/></svg>}
                <span className="hidden sm:inline">{mailbox === "archive" ? "Restore" : "Archive"}</span>
              </button>
              <button type="button" disabled aria-disabled="true" className="inline-flex h-8 cursor-not-allowed items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-2.5 text-xs font-semibold text-gray-400" title="Delete is locked">
                <Icon name="trash"/><span className="hidden sm:inline">Delete</span>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 10V8a5 5 0 0110 0v2m-11 0h12a1 1 0 011 1v9H5v-9a1 1 0 011-1z"/></svg>
              </button>
            </>)}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button type="button" onClick={() => { setFilterOpen((open) => !open); setMoreOpen(false); setSettingsOpen(false); }} className={`inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm font-semibold transition-colors ${activeFilterCount ? "border-blue-200 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"}`}><Icon name="filter"/>{activeFilterCount ? `Filter (${activeFilterCount})` : "Filter"}</button>
              {filterOpen && <div className="absolute right-0 top-11 z-50 w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-xl" onPointerDown={(event) => event.stopPropagation()}>
                <div className="mb-3 flex items-center justify-between"><p className="text-sm font-bold text-gray-900">Filter organizations</p><button type="button" onClick={() => setFilters({ address: "", dealState: "all" })} className="text-xs font-semibold text-blue-600">Clear</button></div>
                <label className="mb-3 block text-xs font-semibold text-gray-600">Address<select value={filters.address} onChange={(event) => setFilters((current) => ({ ...current, address: event.target.value }))} className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-400"><option value="">All addresses</option>{addresses.map((address) => <option key={address}>{address}</option>)}</select></label>
                <label className="block text-xs font-semibold text-gray-600">Deals<select value={filters.dealState} onChange={(event) => setFilters((current) => ({ ...current, dealState: event.target.value }))} className="mt-1.5 h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-400"><option value="all">All organizations</option><option value="open">Has open deals</option><option value="none">No open deals</option></select></label>
              </div>}
            </div>
            <div className="relative">
              <button type="button" onClick={() => { setMoreOpen((open) => !open); setFilterOpen(false); setSettingsOpen(false); }} className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700" aria-label="More organization actions" title="More"><Icon name="more"/></button>
              {moreOpen && <div className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl" onPointerDown={(event) => event.stopPropagation()}>{moreItems.map(([label, icon], index) => <div key={label}>{index === 3 && <div className="my-1 border-t border-gray-100"/>}<button type="button" onClick={() => runMoreAction(label)} className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"><Icon name={icon} className="h-4 w-4 shrink-0"/>{label}</button></div>)}</div>}
            </div>
            <button type="button" onClick={openNewOrganization} className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14"/></svg>
              Organization
            </button>
          </div>
        </div>

        <div data-sales-menu-keep-open className="min-h-0 flex-1 overflow-auto bg-white">
          <table className="min-w-full table-fixed border-collapse text-left" style={{ width: tableWidth }}>
            <colgroup><col style={{ width: 44 }}/>{activeColumns.map((column) => <col key={column.id} style={{ width: columnWidths[column.id] }}/>)}<col style={{ width: 56 }}/></colgroup>
            <thead className="sticky top-0 z-20 bg-[#f8faff] shadow-[0_1px_0_#e5e7eb]"><tr>
              <th className="h-10 border-r border-gray-200 px-3 text-center"><Checkbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} label="Select all visible organizations"/></th>
              {activeColumns.map((column) => <th key={column.id} className={`relative h-10 select-none border-r border-gray-200 px-3 text-xs font-semibold text-gray-600 ${["people", "closedDeals", "openDeals"].includes(column.id) ? "text-right" : ""}`}><span className="inline-flex items-center gap-1.5">{column.label}<svg className="h-3 w-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><circle cx="6" cy="6" r="1.2"/><circle cx="14" cy="6" r="1.2"/><circle cx="6" cy="14" r="1.2"/><circle cx="14" cy="14" r="1.2"/></svg></span><span role="separator" aria-orientation="vertical" aria-label={`Resize ${column.label} column`} onPointerDown={(event) => startColumnResize(event, column.id)} className="absolute -right-1 top-0 z-30 h-full w-2 cursor-col-resize touch-none hover:bg-blue-400/60" title="Drag to resize column"/></th>)}
              <th className="relative h-10 border-l border-gray-200 px-1 text-center">
                <button type="button" onClick={() => { setSettingsOpen((open) => !open); setFilterOpen(false); setMoreOpen(false); }} className="mx-auto flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-700" title="Table settings" aria-label="Table settings"><Icon name="settings"/></button>
                {settingsOpen && <div className="absolute right-2 top-10 z-50 w-56 rounded-xl border border-gray-200 bg-white p-2 text-left shadow-xl" onPointerDown={(event) => event.stopPropagation()}><p className="px-2 pb-2 pt-1 text-xs font-bold text-gray-900">Visible columns</p>{columns.map((column) => { const visible = visibleColumns.includes(column.id); return <button key={column.id} type="button" onClick={() => setVisibleColumns((current) => visible ? (current.length > 1 ? current.filter((id) => id !== column.id) : current) : [...current, column.id])} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-gray-700 hover:bg-blue-50"><span className={`flex h-4 w-4 items-center justify-center rounded border ${visible ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 bg-white"}`}>{visible && <Icon name="check" className="h-3 w-3"/>}</span>{column.label}</button>; })}</div>}
              </th>
            </tr></thead>
            <tbody>{filteredOrganizations.map((organization) => {
                const selected = selectedIds.includes(organization.id);
                return <tr key={organization.id} className={`h-11 border-b border-gray-200 transition-colors ${selected ? "bg-blue-50/70" : "bg-white hover:bg-blue-50/30"}`}>
                  <td className="border-r border-gray-200 px-3 text-center" onClick={(event) => event.stopPropagation()}><Checkbox checked={selected} onChange={() => toggleSelected(organization.id)} label={`Select ${organization.name}`}/></td>
                  {activeColumns.map((column) => <td key={column.id} className="truncate border-r border-gray-200 px-3 py-2 text-sm text-gray-700">{renderCell(organization, column)}</td>)}
                  <td className="relative border-l border-gray-200 px-2 text-center">
                    <button type="button" onClick={() => setRowMenu((current) => current === organization.id ? null : organization.id)} className="mx-auto flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-700" aria-label={`Actions for ${organization.name}`}><Icon name="more"/></button>
                    {rowMenu === organization.id && <div className="absolute right-2 top-9 z-40 w-44 rounded-lg border border-gray-200 bg-white p-1.5 text-left shadow-lg" onPointerDown={(event) => event.stopPropagation()}><button type="button" onClick={() => { setEditingOrganization(organization); setModalOpen(true); setRowMenu(null); }} className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"><Icon name="edit"/>Edit organization</button><button type="button" onClick={() => deleteOrganization(organization.id)} className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50"><Icon name="trash"/>Delete</button></div>}
                  </td>
                </tr>;
            })}</tbody>
          </table>
          {filteredOrganizations.length === 0 && <div className="flex h-72 flex-col items-center justify-center text-center"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600"><Icon name="organizations" className="h-6 w-6"/></div><h2 className="mt-3 text-base font-bold text-gray-900">No organizations found</h2><p className="mt-1 text-sm text-gray-500">Try changing your search or filters.</p></div>}
        </div>
        {toast && <div className="fixed bottom-5 right-5 z-[120] rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-xl">{toast}</div>}
      </main>
      {modalOpen && <OrganizationModal organization={editingOrganization} onClose={() => { setModalOpen(false); setEditingOrganization(null); }} onSave={saveOrganization}/>} 
    </SalesNavigation>);
}
