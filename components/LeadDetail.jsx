"use client";
import { useMemo, useRef, useState } from "react";
const tabs = ["Overview", "Project Information", "Activity", "Notes", "Files", "More", "AI Summary"];
const statusOptions = ["New", "Contacted", "Qualified", "Proposal Sent", "Negotiation", "Won", "Lost"];
const contactPriorityOptions = ["Primary", "Secondary", "Additional"];
const coordinationRoleOptions = ["Decision maker", "Project coordinator", "Marketing / Brand", "Finance / Billing", "Technical contact", "Operations", "Other"];
const preferredChannelOptions = ["Call", "WhatsApp", "Email", "Meeting"];
function normalizeContacts(contacts) {
    if (!contacts.length)
        return contacts;
    const firstPrimary = contacts.findIndex((contact) => contact.contactPriority === "Primary");
    return contacts.map((contact, index) => ({
        ...contact,
        contactPriority: firstPrimary === -1
            ? (index === 0 ? "Primary" : contact.contactPriority)
            : (contact.contactPriority === "Primary" && index !== firstPrimary ? "Secondary" : contact.contactPriority),
    }));
}
function syncPrimaryContact(lead) {
    const contacts = normalizeContacts(lead.contacts);
    const primary = contacts.find((contact) => contact.contactPriority === "Primary") || contacts[0];
    return {
        ...lead,
        contacts,
        contactName: primary?.name || "",
        email: primary?.email || "",
        phone: primary?.phone || "",
    };
}
const initialLead = {
    companyName: "Hotel Jindal",
    contactName: "Rohit Jindal",
    contacts: [
        {
            id: 1,
            name: "Rohit Jindal",
            designation: "Director",
            contactPriority: "Primary",
            coordinationRole: "Decision maker",
            email: "rohit@hoteljindal.com",
            phone: "+91 98765 43210",
            preferredChannel: "Call",
        },
        {
            id: 2,
            name: "Neha Jindal",
            designation: "Marketing Manager",
            contactPriority: "Secondary",
            coordinationRole: "Project coordinator",
            email: "marketing@hoteljindal.com",
            phone: "+91 98260 11882",
            preferredChannel: "WhatsApp",
        },
        {
            id: 3,
            name: "Amit Shah",
            designation: "Finance Manager",
            contactPriority: "Additional",
            coordinationRole: "Finance / Billing",
            email: "accounts@hoteljindal.com",
            phone: "+91 73140 22110",
            preferredChannel: "Email",
        },
    ],
    universalCode: "VL-2026-0001",
    status: "Qualified",
    assignedTo: "Priya Sharma",
    email: "rohit@hoteljindal.com",
    phone: "+91 98765 43210",
    website: "www.hoteljindal.com",
    location: "Indore, Madhya Pradesh",
    source: "Referral",
    category: "A+",
    label: "Hot",
    priority: "High",
    visibility: "Lead owner & management",
    createdAt: "02 Aug 2026, 1:04 PM",
    budget: "₹4,50,000 – ₹6,00,000",
    budgetType: "Range",
    currency: "Indian Rupee (INR)",
    timeline: "6–8 weeks",
    timelineStart: "10 Aug 2026",
    timelineEnd: "30 Sep 2026",
    industry: "Hospitality",
    employees: "51–100",
    annualRevenue: "₹5–10 Cr",
    country: "India",
    address: "Vijay Nagar, Indore, Madhya Pradesh 452010",
    preferredContact: ["Call", "WhatsApp", "Email"],
    alternateEmails: ["marketing@hoteljindal.com"],
    alternatePhones: ["+91 73140 22110"],
    socialLinks: ["https://www.instagram.com/hoteljindal", "https://www.linkedin.com/company/hotel-jindal"],
    sourceChannels: ["Referral", "WhatsApp"],
    referralSource: "Ankit Mehra",
    referralChannelId: "REF-ANKIT-0826",
    projectNeeds: ["Branding", "Website", "UX/UI", "Design & Technical Support"],
    brandName: "Hotel Jindal",
    brandingRequirements: ["Brand audit", "Logo refinement", "Brand identity", "Social media kit"],
    brandType: ["Hospitality", "Premium service brand"],
    brandingDeliverables: ["Brand guidelines PDF", "Stationery", "Social templates", "Email signature"],
    brandingStyle: ["Luxury / Premium", "Warm", "Contemporary"],
    referenceBrands: "The Postcard Hotel, Neemrana Hotels, Taj Safaris",
    colorPreference: "Warm ivory, deep green and muted gold",
    targetAudience: "Business travellers, families and premium domestic tourists",
    brandingDetails: "Refresh the identity without losing the hotel’s established local recognition. The system should work across signage, room collateral, digital channels and event communication.",
    brandingAiSummary: "The client needs a premium hospitality identity refresh that preserves Hotel Jindal’s local recognition while creating a consistent system for signage, guest collateral, social media and digital communication.",
    techPreference: "Open to recommendation; easy internal content management is essential",
    frontends: ["Next.js", "Tailwind CSS"],
    backends: ["Laravel"],
    databases: ["MySQL"],
    cms: ["Laravel Custom Admin"],
    paymentMethods: ["Razorpay"],
    hosting: ["Cloud hosting", "CDN"],
    mobileApps: ["Not required in phase 1"],
    techNotes: "Existing website is dated and has no structured CMS. Domain access is available.",
    websiteDetails: "Responsive 12–15 page hospitality website with room pages, amenities, gallery, events, enquiry forms, WhatsApp integration, analytics and a scalable booking integration path.",
    websiteAiSummary: "A responsive hospitality website is required with clear room discovery, enquiry conversion, WhatsApp support, analytics and an architecture that can support booking integration in a later phase.",
    uxProductType: "Hospitality website",
    uxScope: ["User flows", "Information architecture", "Wireframes", "UI design", "Interactive prototype"],
    uxPlatforms: ["Desktop web", "Tablet", "Mobile web"],
    screenCount: "12–15 pages with key mobile states",
    existingAssets: ["Existing website", "Photography", "Property content"],
    uxStyle: ["Premium", "Editorial", "Simple navigation"],
    uxReferences: "The Postcard Hotel, Aman, Airbnb hospitality pages",
    uxTargetUsers: "Guests researching rooms, events and direct enquiries",
    accessibility: "WCAG AA preferred",
    uxNotes: "Prioritise fast room discovery, clear trust signals, mobile enquiry and simple comparison of room categories.",
    uxAiSummary: "The UX/UI scope should simplify room comparison and enquiry, prioritise mobile users, build trust quickly and provide a premium editorial experience across 12–15 responsive pages.",
    supportType: ["Website maintenance", "Content updates", "Performance optimisation", "Analytics"],
    engagementType: "Monthly retainer",
    existingPlatform: "Legacy PHP website on shared hosting",
    supportPriority: "Normal — regular support",
    supportHours: "20 hours / month",
    accessAvailable: ["Domain / DNS", "Hosting / cPanel", "Analytics", "Existing design files"],
    currentIssues: "Slow load time, outdated visual design, difficult content updates and inconsistent mobile layout.",
    supportOutcome: "Stable launch, team training, monthly updates, analytics reporting and priority issue resolution.",
    supportAiSummary: "The client needs a monthly support arrangement covering launch stability, content updates, performance, analytics and priority issue resolution, with the internal team trained to handle routine content changes.",
    overallAiSummary: "Hotel Jindal is a qualified, high-priority A+ hospitality lead in Indore, referred by Ankit Mehra and managed by Priya Sharma. The client is planning a coordinated brand and digital transformation covering branding, a responsive website, UX/UI and ongoing design and technical support. The expected investment is ₹4,50,000–₹6,00,000 with a 6–8 week delivery window. The main objective is to modernise the hotel’s identity and digital experience without losing its established local recognition, improve room discovery and enquiries, and create a scalable foundation for future booking integration. The recommended next step is to confirm the final scope, validate access to existing assets and platforms, and align the client on phased delivery before converting the lead to a deal.",
};
const initialActivities = [
    {
        id: 4,
        type: "Meeting",
        title: "Review requirements and confirm scope",
        detail: "Confirm the final service scope, available assets and phased delivery plan.",
        time: "04 Aug 2026, 11:30 AM",
        owner: "Priya Sharma",
        scheduledDate: "2026-08-04",
        startTime: "11:30",
        endTime: "12:15",
        priority: "High",
    },
    {
        id: 5,
        type: "Deadline",
        title: "Share initial commercial proposal",
        detail: "Prepare the proposed scope, timeline, commercials and next-step recommendations.",
        time: "06 Aug 2026, 5:00 PM",
        owner: "Priya Sharma",
        scheduledDate: "2026-08-06",
        startTime: "17:00",
        endTime: "17:30",
        priority: "Normal",
    },
    {
        id: 1,
        type: "Call",
        title: "Discovery call completed",
        detail: "Discussed branding, website redesign, booking flow and launch timeline.",
        time: "Today, 12:40 PM",
        owner: "Priya Sharma",
        done: true,
        scheduledDate: "2026-08-03",
        startTime: "12:40",
        endTime: "13:10",
    },
    {
        id: 2,
        type: "Note",
        title: "Lead qualification updated",
        detail: "Marked as Qualified and priority changed to High.",
        time: "Today, 11:18 AM",
        owner: "Priya Sharma",
        done: true,
    },
    {
        id: 3,
        type: "Email",
        title: "Introduction email sent",
        detail: "Shared company portfolio and requested the existing brand assets.",
        time: "Yesterday, 5:20 PM",
        owner: "Priya Sharma",
        done: true,
    },
];
const initialNotes = [
    {
        id: 1,
        body: "Client wants the visual identity to feel premium, warm and rooted in hospitality. Existing logo can be redesigned if the audit supports it.",
        author: "Priya Sharma",
        time: "Today, 12:55 PM",
    },
];
const initialFiles = [
    {
        id: 1,
        name: "Hotel-Jindal-Existing-Brand-Deck.pdf",
        type: "PDF",
        size: "4.8 MB",
        uploadedBy: "Priya Sharma",
        time: "Today, 12:48 PM",
    },
    {
        id: 2,
        name: "Current-Website-Screens.zip",
        type: "ZIP",
        size: "18.2 MB",
        uploadedBy: "Rohit Jindal",
        time: "Today, 12:46 PM",
    },
];
const activityTypeOptions = [
    { name: "Call", icon: "phone" },
    { name: "Meeting", icon: "users" },
    { name: "Email", icon: "mail" },
    { name: "Task", icon: "check" },
    { name: "Deadline", icon: "calendar" },
    { name: "Lunch", icon: "briefcase" },
    { name: "Note", icon: "note" },
];
const calendarWeekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function toLocalDate(isoDate) {
    const [year, month, day] = isoDate.split("-").map(Number);
    return new Date(year, month - 1, day);
}
function toIsoDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
function shiftIsoDate(isoDate, amount) {
    const date = toLocalDate(isoDate);
    date.setDate(date.getDate() + amount);
    return toIsoDate(date);
}
function formatLongDate(isoDate) {
    return toLocalDate(isoDate).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}
function formatShortDate(isoDate) {
    return toLocalDate(isoDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}
function formatTime(time) {
    if (!time)
        return "";
    const [hourValue, minute] = time.split(":").map(Number);
    const suffix = hourValue >= 12 ? "PM" : "AM";
    const hour = hourValue % 12 || 12;
    return `${hour}:${String(minute).padStart(2, "0")} ${suffix}`;
}
function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}
function getMonthDays(isoDate) {
    const selected = toLocalDate(isoDate);
    const year = selected.getFullYear();
    const month = selected.getMonth();
    const first = new Date(year, month, 1);
    const mondayIndex = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const slots = Array(mondayIndex).fill(null);
    for (let day = 1; day <= daysInMonth; day += 1)
        slots.push(toIsoDate(new Date(year, month, day)));
    while (slots.length % 7 !== 0)
        slots.push(null);
    return slots;
}
function getActivityIcon(type) {
    return activityTypeOptions.find((option) => option.name === type)?.icon || "calendar";
}
function getActivityTone(type) {
    if (type === "Deadline")
        return "bg-amber-50 text-amber-700 border-amber-200";
    if (type === "Meeting" || type === "Lunch")
        return "bg-violet-50 text-violet-700 border-violet-200";
    if (type === "Email")
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (type === "Task")
        return "bg-slate-100 text-slate-700 border-slate-200";
    return "bg-blue-50 text-blue-700 border-blue-200";
}
function Icon({ name, size = 18, className = "" }) {
    const common = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className,
        "aria-hidden": true,
    };
    const paths = {
        "arrow-left": <><path d="m15 18-6-6 6-6"/><path d="M9 12h11"/></>,
        archive: <><path d="M4 7h16v13H4z"/><path d="M3 4h18v3H3z"/><path d="M9 11h6"/></>,
        briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/></>,
        calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
        check: <path d="m5 12 4 4L19 6"/>,
        "chevron-down": <path d="m6 9 6 6 6-6"/>,
        clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
        close: <path d="M6 6l12 12M18 6 6 18"/>,
        document: <><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h5"/></>,
        download: <><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></>,
        edit: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"/></>,
        external: <><path d="M14 4h6v6"/><path d="m10 14 10-10"/><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"/></>,
        file: <><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5"/></>,
        folder: <path d="M3 6h6l2 2h10v11H3z"/>,
        history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></>,
        inbox: <><path d="M4 4h16v13H4z"/><path d="M4 13h4l2 3h4l2-3h4"/></>,
        info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>,
        link: <><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1.1"/></>,
        lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
        mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
        more: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/></>,
        note: <><path d="M5 3h14v18H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
        phone: <path d="M6.6 3.5 9 8l-2 1.8a15.2 15.2 0 0 0 7.2 7.2L16 15l4.5 2.4-.8 3.1c-.2.8-1 1.4-1.9 1.3C9.7 20.7 3.3 14.3 2.2 6.2c-.1-.9.5-1.7 1.3-1.9z"/>,
        plus: <path d="M12 5v14M5 12h14"/>,
        proposal: <><path d="M5 3h14v18H5z"/><path d="M8 8h8M8 12h8M8 16h4"/><path d="m15 16 1.5 1.5L19 14"/></>,
        search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
        send: <><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></>,
        settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21h-4v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V3h4v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></>,
        sparkles: <><path d="m12 3-1.3 3.7L7 8l3.7 1.3L12 13l1.3-3.7L17 8l-3.7-1.3z"/><path d="m18 14-.8 2.2L15 17l2.2.8L18 20l.8-2.2L21 17l-2.2-.8z"/></>,
        tag: <><path d="M20 13 13 20l-9-9V4h7z"/><circle cx="8.5" cy="8.5" r="1.2"/></>,
        trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6"/></>,
        upload: <><path d="M12 21V9"/><path d="m7 14 5-5 5 5"/><path d="M5 3h14"/></>,
        user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
        users: <><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15 14.5a5.5 5.5 0 0 1 6 5.5"/></>,
    };
    return <svg {...common}>{paths[name]}</svg>;
}
function Badge({ children, tone = "blue" }) {
    const tones = {
        blue: "bg-blue-50 text-blue-700 ring-blue-100",
        green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
        amber: "bg-amber-50 text-amber-700 ring-amber-100",
        red: "bg-red-50 text-red-700 ring-red-100",
        slate: "bg-slate-100 text-slate-700 ring-slate-200",
        purple: "bg-violet-50 text-violet-700 ring-violet-100",
    };
    return <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-inset ${tones[tone]}`}>{children}</span>;
}
function Button({ children, variant = "secondary", icon, onClick, type = "button", disabled = false, className = "", }) {
    const variants = {
        primary: "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-200",
        secondary: "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300",
        ghost: "bg-transparent text-slate-600 border-transparent hover:bg-slate-100",
        danger: "bg-red-50 text-red-700 border-red-100 hover:bg-red-100",
    };
    return (<button type={type} onClick={onClick} disabled={disabled} className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}>
      {icon && <Icon name={icon} size={16}/>}
      {children}
    </button>);
}
function Card({ children, className = "" }) {
    return <section className={`rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)] ${className}`}>{children}</section>;
}
function CardHeader({ title, subtitle, action, }) {
    return (<div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
      <div>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="mt-1 text-xs leading-5 text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>);
}
function InfoItem({ icon, label, value, children }) {
    return (<div className="min-w-0">
      <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-400">
        {icon && <Icon name={icon} size={13}/>}
        {label}
      </div>
      {children ?? <p className="truncate text-sm font-medium text-slate-800">{value || "—"}</p>}
    </div>);
}
function ValueChips({ values, tone = "slate" }) {
    if (!values.length)
        return <span className="text-sm text-slate-400">—</span>;
    return <div className="flex flex-wrap gap-2">{values.map((value) => <Badge key={value} tone={tone}>{value}</Badge>)}</div>;
}
function DetailRow({ label, value }) {
    return (<div className="grid gap-1 border-b border-slate-100 py-3 last:border-b-0 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-5">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <div className="text-sm leading-6 text-slate-700">{value || "—"}</div>
    </div>);
}
function AiSummaryDisplay({ summary }) {
    return (<div className="mx-5 mb-5 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.06em] text-blue-700">
        <Icon name="sparkles" size={15}/>
        AI Summary
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-700">{summary || "No AI summary available yet."}</p>
    </div>);
}
function AiSummaryEditor({ value, onChange }) {
    return (<div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
      <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.06em] text-blue-700">
        <Icon name="sparkles" size={15}/>
        AI Summary
      </div>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} placeholder="AI-generated summary of the collected requirements" className="w-full resize-y rounded-lg border border-blue-100 bg-white px-3 py-2.5 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/>
    </div>);
}
function ServiceInformationCard({ title, icon, rows, aiSummary, attachments, }) {
    return (<Card className="overflow-hidden">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon name={icon} size={19}/></div>
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      </div>
      <div className="px-5 py-1">{rows.map((row) => <DetailRow key={row.label} label={row.label} value={row.value}/>)}</div>
      <AiSummaryDisplay summary={aiSummary}/>
      <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.06em] text-slate-400">Attachments</span>
          <div className="flex flex-wrap gap-2">
            {attachments.length ? attachments.map((file) => <span key={file} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600"><Icon name="file" size={13}/>{file}</span>) : <span className="text-xs text-slate-400">No attachments</span>}
          </div>
        </div>
      </div>
    </Card>);
}
function ProjectEditCard({ title, icon, children, attachments }) {
    return (<Card className="overflow-hidden">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon name={icon} size={19}/></div>
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-2">{children}</div>
      <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.06em] text-slate-400">Attachments</span>
          <div className="flex flex-wrap items-center gap-2">
            {attachments.length ? attachments.map((file) => <span key={file} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600"><Icon name="file" size={13}/>{file}</span>) : <span className="text-xs text-slate-400">No attachments</span>}
          </div>
        </div>
      </div>
    </Card>);
}
function Field({ label, value, onChange, type = "text", placeholder = "" }) {
    return (<label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/>
    </label>);
}
function TextAreaField({ label, value, onChange, rows = 3, placeholder = "" }) {
    return (<label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={rows} placeholder={placeholder} className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/>
    </label>);
}
function ListField({ label, values, onChange, placeholder = "Separate items with commas" }) {
    const [text, setText] = useState(values.join(", "));
    return (<Field label={label} value={text} placeholder={placeholder} onChange={(value) => {
            setText(value);
            onChange(value.split(",").map((item) => item.trim()).filter(Boolean));
        }}/>);
}
function LineListField({ label, values, onChange, placeholder = "Add one item per line" }) {
    const [text, setText] = useState(values.join("\n"));
    return (<TextAreaField label={label} value={text} placeholder={placeholder} rows={3} onChange={(value) => {
            setText(value);
            onChange(value.split("\n").map((item) => item.trim()).filter(Boolean));
        }}/>);
}
function SelectField({ label, value, options, onChange }) {
    return (<label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span>
      <div className="relative">
        <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
        <Icon name="chevron-down" size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"/>
      </div>
    </label>);
}
function ContactPersonsEditor({ contacts, onChange }) {
    const ordered = [...contacts].sort((a, b) => {
        const rank = { Primary: 0, Secondary: 1, Additional: 2 };
        return rank[a.contactPriority] - rank[b.contactPriority];
    });
    function updateContact(id, patch) {
        let next = contacts.map((contact) => contact.id === id ? { ...contact, ...patch } : contact);
        if (patch.contactPriority === "Primary") {
            next = next.map((contact) => contact.id !== id && contact.contactPriority === "Primary" ? { ...contact, contactPriority: "Secondary" } : contact);
        }
        onChange(normalizeContacts(next));
    }
    function addContact() {
        const hasPrimary = contacts.some((contact) => contact.contactPriority === "Primary");
        onChange(normalizeContacts([
            ...contacts,
            {
                id: Date.now(),
                name: "",
                designation: "",
                contactPriority: hasPrimary ? "Additional" : "Primary",
                coordinationRole: "Project coordinator",
                email: "",
                phone: "",
                preferredChannel: "Call",
            },
        ]));
    }
    function removeContact(id) {
        onChange(normalizeContacts(contacts.filter((contact) => contact.id !== id)));
    }
    return (<div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Icon name="users" size={16}/></div>
            <h3 className="text-sm font-bold text-slate-900">Contact Persons</h3>
          </div>
          <p className="mt-1.5 text-xs leading-5 text-slate-500">Set one primary contact, then classify the other people by how your team should coordinate with them.</p>
        </div>
        <Button variant="secondary" icon="plus" onClick={addContact}>Add contact</Button>
      </div>

      <div className="space-y-3">
        {ordered.map((contact, index) => (<div key={contact.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">{index + 1}</div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-semibold text-slate-800">{contact.name || `Contact person ${index + 1}`}</p>
                    <Badge tone={contact.contactPriority === "Primary" ? "blue" : contact.contactPriority === "Secondary" ? "purple" : "slate"}>{contact.contactPriority}</Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400">{contact.coordinationRole || "Coordination role not set"}</p>
                </div>
              </div>
              <button type="button" onClick={() => removeContact(contact.id)} aria-label="Remove contact" title="Remove contact" className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"><Icon name="trash" size={16}/></button>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <Field label="Contact name" value={contact.name} onChange={(value) => updateContact(contact.id, { name: value })}/>
              <Field label="Designation" value={contact.designation} onChange={(value) => updateContact(contact.id, { designation: value })} placeholder="e.g. Marketing Manager"/>
              <SelectField label="Contact priority" value={contact.contactPriority} options={contactPriorityOptions} onChange={(value) => updateContact(contact.id, { contactPriority: value })}/>
              <SelectField label="Coordination role" value={contact.coordinationRole} options={coordinationRoleOptions} onChange={(value) => updateContact(contact.id, { coordinationRole: value })}/>
              <Field label="Email" type="email" value={contact.email} onChange={(value) => updateContact(contact.id, { email: value })}/>
              <Field label="Phone" type="tel" value={contact.phone} onChange={(value) => updateContact(contact.id, { phone: value })}/>
              <SelectField label="Preferred channel" value={contact.preferredChannel} options={preferredChannelOptions} onChange={(value) => updateContact(contact.id, { preferredChannel: value })}/>
            </div>
          </div>))}

        {!ordered.length && (<div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-7 text-center">
            <Icon name="users" size={22} className="mx-auto text-slate-300"/>
            <p className="mt-2 text-sm font-semibold text-slate-700">No contact persons added</p>
            <p className="mt-1 text-xs text-slate-400">Add the people your team will coordinate with for this organization.</p>
          </div>)}
      </div>
    </div>);
}
function ContactPersonsDisplay({ contacts }) {
    const ordered = [...contacts].sort((a, b) => {
        const rank = { Primary: 0, Secondary: 1, Additional: 2 };
        return rank[a.contactPriority] - rank[b.contactPriority];
    });
    if (!ordered.length)
        return <div className="p-5 text-sm text-slate-400">No contact persons added.</div>;
    return (<div className="grid gap-3 p-5 lg:grid-cols-2">
      {ordered.map((contact) => (<article key={contact.id} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="flex items-start gap-3">
            <Avatar name={contact.name || "Contact"} size="sm"/>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate text-sm font-bold text-slate-900">{contact.name || "Unnamed contact"}</p>
                <Badge tone={contact.contactPriority === "Primary" ? "blue" : contact.contactPriority === "Secondary" ? "purple" : "slate"}>{contact.contactPriority}</Badge>
              </div>
              <p className="mt-1 text-xs text-slate-500">{contact.designation || "Designation not added"} · {contact.coordinationRole || "Coordination role not set"}</p>
            </div>
          </div>
          <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <a href={`mailto:${contact.email}`} className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-blue-600 hover:border-blue-200 hover:bg-blue-50/50"><Icon name="mail" size={14}/><span className="truncate">{contact.email || "No email"}</span></a>
            <a href={`tel:${contact.phone}`} className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-blue-600 hover:border-blue-200 hover:bg-blue-50/50"><Icon name="phone" size={14}/><span className="truncate">{contact.phone || "No phone"}</span></a>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
            <span className="text-xs font-medium text-slate-400">Preferred channel</span>
            <Badge tone="slate">{contact.preferredChannel || "Not set"}</Badge>
          </div>
        </article>))}
    </div>);
}
function LockedField({ label, value }) {
    return (<div>
      <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600"><Icon name="lock" size={13} className="text-slate-400"/>{label}</div>
      <div className="flex min-h-[42px] items-center rounded-lg border border-slate-200 bg-slate-100 px-3 py-2.5 text-sm font-medium text-slate-500" aria-readonly="true">{value || "—"}</div>
    </div>);
}
function SocialLinksDisplay({ values }) {
    if (!values.length)
        return <span className="text-sm text-slate-400">—</span>;
    function getDetails(value) {
        const href = /^https?:\/\//i.test(value) ? value : `https://${value}`;
        try {
            const url = new URL(href);
            const host = url.hostname.replace(/^www\./, "");
            const cleanPath = decodeURIComponent(url.pathname).replace(/^\/|\/$/g, "");
            if (host.includes("instagram"))
                return { href, platform: "Instagram", detail: cleanPath ? `@${cleanPath.split("/").pop()}` : host };
            if (host.includes("linkedin"))
                return { href, platform: "LinkedIn", detail: cleanPath.split("/").filter(Boolean).pop()?.replace(/-/g, " ") || host };
            if (host.includes("facebook"))
                return { href, platform: "Facebook", detail: cleanPath || host };
            if (host.includes("x.com") || host.includes("twitter"))
                return { href, platform: "X / Twitter", detail: cleanPath ? `@${cleanPath}` : host };
            return { href, platform: host, detail: cleanPath || href };
        }
        catch {
            return { href, platform: "Social profile", detail: value };
        }
    }
    return (<div className="grid gap-2 sm:grid-cols-2">
      {values.map((value) => {
            const link = getDetails(value);
            return (<a key={value} href={link.href} target="_blank" rel="noreferrer" className="flex min-w-0 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 transition hover:border-blue-200 hover:bg-blue-50/40">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Icon name="link" size={15}/></span>
            <span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-slate-800">{link.platform}</span><span className="block truncate text-xs capitalize text-slate-500">{link.detail}</span></span>
            <Icon name="external" size={13} className="shrink-0 text-slate-400"/>
          </a>);
        })}
    </div>);
}
function Avatar({ name, size = "md" }) {
    const initials = name.split(" ").map((part) => part[0]).slice(0, 2).join("");
    const sizes = { sm: "h-7 w-7 text-[10px]", md: "h-9 w-9 text-xs", lg: "h-12 w-12 text-sm" };
    return <div className={`flex shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700 ${sizes[size]}`}>{initials}</div>;
}
function EmptyState({ icon, title, description, action }) {
    return (<div className="flex min-h-[300px] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon name={icon} size={22}/></div>
      <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>);
}
function ModalShell({ title, description, children, onClose }) {
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-[2px]" onMouseDown={onClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/60 bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-5 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">{title}</h2>
            {description && <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>}
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Close modal"><Icon name="close" size={18}/></button>
        </div>
        {children}
      </div>
    </div>);
}
function ActivitySchedulerModal({ form, onChange, activities, lead, onClose, onSave, }) {
    const monthDays = getMonthDays(form.date);
    const monthLabel = toLocalDate(form.date).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
    const dayActivities = activities.filter((activity) => activity.scheduledDate === form.date && activity.startTime);
    const hours = Array.from({ length: 13 }, (_, index) => index + 8);
    const timelineStart = 8 * 60;
    const hourHeight = 58;
    const selectedStart = timeToMinutes(form.startTime);
    const selectedEnd = Math.max(timeToMinutes(form.endTime), selectedStart + 30);
    const selectedTop = Math.max(0, ((selectedStart - timelineStart) / 60) * hourHeight);
    const selectedHeight = Math.max(34, ((selectedEnd - selectedStart) / 60) * hourHeight);
    function update(key, value) {
        onChange({ ...form, [key]: value });
    }
    function chooseTimelineTime(hour) {
        const start = `${String(hour).padStart(2, "0")}:00`;
        const end = `${String(Math.min(hour + 1, 23)).padStart(2, "0")}:00`;
        onChange({ ...form, startTime: start, endTime: end });
    }
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-3 backdrop-blur-[2px]" onMouseDown={onClose}>
      <div className="flex max-h-[94vh] w-full max-w-[1180px] flex-col overflow-hidden rounded-2xl border border-white/70 bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Schedule an activity</h2>
            <p className="mt-1 text-sm text-slate-500">Plan the next client action and check the team calendar before saving.</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Close activity scheduler"><Icon name="close" size={19}/></button>
        </div>

        <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)] lg:overflow-hidden">
          <div className="space-y-5 overflow-y-auto p-5 sm:p-6">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold text-slate-600">Activity title</span>
              <input autoFocus value={form.title} onChange={(event) => update("title", event.target.value)} placeholder={`${form.type} with ${lead.companyName}`} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-lg font-semibold text-slate-900 outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"/>
            </label>

            <div>
              <p className="mb-2 text-xs font-semibold text-slate-600">Activity type</p>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {activityTypeOptions.map((option) => (<button key={option.name} type="button" onClick={() => update("type", option.name)} className={`flex min-h-[68px] flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-2 text-[11px] font-semibold transition ${form.type === option.name ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm shadow-blue-100" : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-blue-50/40 hover:text-blue-700"}`}>
                    <Icon name={option.icon} size={18}/>
                    {option.name}
                  </button>))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1.1fr_0.75fr_0.75fr]">
              <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">Date</span><input type="date" value={form.date} onChange={(event) => update("date", event.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/></label>
              <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">Starts</span><input type="time" value={form.startTime} onChange={(event) => update("startTime", event.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/></label>
              <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-600">Ends</span><input type="time" value={form.endTime} onChange={(event) => update("endTime", event.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"/></label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField label="Priority" value={form.priority} options={["Low", "Normal", "High", "Urgent"]} onChange={(value) => update("priority", value)}/>
              <SelectField label="Reminder" value={form.reminder} options={["At activity time", "10 minutes before", "30 minutes before", "1 hour before", "1 day before"]} onChange={(value) => update("reminder", value)}/>
              <Field label="Location" value={form.location} onChange={(value) => update("location", value)} placeholder="Office, client site or address"/>
              <Field label="Video meeting link" value={form.videoLink} onChange={(value) => update("videoLink", value)} placeholder="Paste Google Meet or Zoom link"/>
              <SelectField label="Assigned to" value={form.owner} options={["Priya Sharma", "Aman Verma", "Rhea Kapoor"]} onChange={(value) => update("owner", value)}/>
              <Field label="Participants" value={form.participants} onChange={(value) => update("participants", value)} placeholder={`${lead.contactName}, team members`}/>
            </div>

            <TextAreaField label="Description or agenda" value={form.note} onChange={(value) => update("note", value)} rows={4} placeholder="Add the objective, agenda, preparation notes or expected outcome..."/>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <input type="checkbox" checked={form.markAsNext} onChange={(event) => update("markAsNext", event.target.checked)} className="mt-0.5 h-4 w-4 rounded border-blue-300 text-blue-600"/>
              <span><span className="block text-sm font-semibold text-slate-800">Set as next activity</span><span className="mt-1 block text-xs leading-5 text-slate-500">Show this activity as the primary next action on the lead overview.</span></span>
            </label>
          </div>

          <aside className="border-t border-slate-200 bg-slate-50/70 lg:min-h-0 lg:overflow-y-auto lg:border-l lg:border-t-0">
            <div className="border-b border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <button type="button" onClick={() => update("date", shiftIsoDate(form.date, -1))} className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50" aria-label="Previous day"><Icon name="arrow-left" size={16}/></button>
                <div className="text-center"><p className="text-sm font-bold text-slate-900">{monthLabel}</p><p className="mt-0.5 text-xs text-slate-500">{formatLongDate(form.date)}</p></div>
                <button type="button" onClick={() => update("date", shiftIsoDate(form.date, 1))} className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50" aria-label="Next day"><Icon name="arrow-left" size={16} className="rotate-180"/></button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {calendarWeekdays.map((weekday) => <span key={weekday} className="py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">{weekday}</span>)}
                {monthDays.map((day, index) => day ? (<button key={day} type="button" onClick={() => update("date", day)} className={`relative flex h-8 items-center justify-center rounded-lg text-xs font-semibold transition ${day === form.date ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}>
                    {toLocalDate(day).getDate()}
                    {activities.some((activity) => activity.scheduledDate === day && !activity.done) && <span className={`absolute bottom-1 h-1 w-1 rounded-full ${day === form.date ? "bg-white" : "bg-blue-500"}`}/>}
                  </button>) : <span key={`blank-${index}`}/>)}
              </div>
            </div>

            <div className="p-5">
              <div className="mb-4 flex items-center justify-between"><div><h3 className="text-sm font-bold text-slate-900">Day schedule</h3><p className="mt-1 text-xs text-slate-500">Click an hour to move the activity.</p></div><Badge tone={dayActivities.length ? "blue" : "slate"}>{dayActivities.length} scheduled</Badge></div>
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white" style={{ height: `${hours.length * hourHeight}px` }}>
                {hours.map((hour, index) => (<button key={hour} type="button" onClick={() => chooseTimelineTime(hour)} className="absolute inset-x-0 border-t border-slate-100 text-left transition hover:bg-blue-50/30" style={{ top: `${index * hourHeight}px`, height: `${hourHeight}px` }}>
                    <span className="absolute left-2 top-1.5 text-[10px] font-medium text-slate-400">{formatTime(`${String(hour).padStart(2, "0")}:00`)}</span>
                  </button>))}
                <div className="absolute bottom-0 top-0 left-16 w-px bg-slate-100"/>
                {dayActivities.map((activity) => {
            const start = timeToMinutes(activity.startTime || "08:00");
            const end = timeToMinutes(activity.endTime || activity.startTime || "08:30") + (activity.endTime ? 0 : 30);
            const top = Math.max(0, ((start - timelineStart) / 60) * hourHeight);
            const height = Math.max(28, ((end - start) / 60) * hourHeight);
            return <div key={activity.id} className={`absolute left-[72px] right-3 overflow-hidden rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold shadow-sm ${getActivityTone(activity.type)}`} style={{ top: `${top}px`, height: `${height}px` }}><div className="flex items-center gap-1.5"><Icon name={getActivityIcon(activity.type)} size={12}/><span className="truncate">{activity.title}</span></div></div>;
        })}
                <div className="absolute left-[72px] right-3 z-20 overflow-hidden rounded-lg border border-blue-500 bg-blue-600 px-3 py-2 text-white shadow-lg shadow-blue-200/70" style={{ top: `${selectedTop}px`, height: `${selectedHeight}px` }}>
                  <div className="flex items-center gap-2 text-xs font-bold"><Icon name={getActivityIcon(form.type)} size={13}/><span className="truncate">{form.title || form.type}</span></div>
                  <p className="mt-1 text-[10px] text-blue-100">{formatTime(form.startTime)} – {formatTime(form.endTime)}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-slate-500"><Icon name="calendar" size={15} className="text-blue-600"/><span>{formatShortDate(form.date)}, {formatTime(form.startTime)} – {formatTime(form.endTime)}</span></div>
          <div className="flex gap-2"><Button variant="ghost" onClick={onClose}>Cancel</Button><Button variant="primary" icon="calendar" disabled={!form.title.trim()} onClick={onSave}>Schedule activity</Button></div>
        </div>
      </div>
    </div>);
}
export default function LeadDetail({ sourceLead, onBack = () => {}, onArchive = () => {}, onNavigateSales = () => {} }) {
    const sourceDetails = sourceLead?.details || {};
    const sourceInitialLead = {
        ...initialLead,
        companyName: sourceLead?.companyName || initialLead.companyName,
        contactName: sourceDetails.contactPerson || initialLead.contactName,
        universalCode: sourceLead?.universalId || initialLead.universalCode,
        status: sourceDetails.leadStatus || "New",
        assignedTo: sourceLead?.assignedTo || "Unassigned",
        email: sourceDetails.email || "",
        phone: sourceDetails.phone || "",
        website: sourceDetails.website || "",
        location: sourceDetails.address || sourceDetails.country || "Not provided",
        category: sourceLead?.category || "Not set",
        label: sourceLead?.label || "Normal",
        priority: sourceLead?.label || "Normal",
        createdAt: sourceLead?.createdAt ? new Date(sourceLead.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : initialLead.createdAt,
        projectNeeds: sourceLead?.projectNeeds || [],
        industry: sourceDetails.industry || "Not provided",
        address: sourceDetails.address || "",
        country: sourceDetails.country || "",
    };
    const [activeTab, setActiveTab] = useState("Overview");
    const [lead, setLead] = useState(sourceInitialLead);
    const [draftLead, setDraftLead] = useState(sourceInitialLead);
    const [isEditing, setIsEditing] = useState(false);
    const [moreDraft, setMoreDraft] = useState(sourceInitialLead);
    const [isEditingMore, setIsEditingMore] = useState(false);
    const [projectDraft, setProjectDraft] = useState(sourceInitialLead);
    const [isEditingProject, setIsEditingProject] = useState(false);
    const [isLeadActionsOpen, setIsLeadActionsOpen] = useState(false);
    const [modal, setModal] = useState(null);
    const [toast, setToast] = useState("");
    const [activities, setActivities] = useState(() => sourceLead ? [] : initialActivities);
    const [notes, setNotes] = useState(() => sourceLead ? [] : initialNotes);
    const [files, setFiles] = useState(() => sourceLead ? [] : initialFiles);
    const [nextActivity, setNextActivity] = useState({ type: "Meeting", title: sourceLead?.nextActivity || "No activity scheduled", date: "Not scheduled", time: "", owner: sourceLead?.assignedTo || "Unassigned" });
    const [activityCalendarDate, setActivityCalendarDate] = useState("2026-08-03");
    const [activityForm, setActivityForm] = useState({
        type: "Call",
        title: "",
        date: "2026-08-03",
        startTime: "10:00",
        endTime: "10:30",
        note: "",
        owner: "Priya Sharma",
        priority: "Normal",
        location: "",
        videoLink: "",
        participants: "Rohit Jindal",
        reminder: "30 minutes before",
        markAsNext: true,
    });
    const [noteDraft, setNoteDraft] = useState("");
    const fileInputRef = useRef(null);
    const completion = useMemo(() => {
        const values = Object.values(lead);
        return Math.round((values.filter((value) => Array.isArray(value) ? value.length > 0 : Boolean(value)).length / values.length) * 100);
    }, [lead]);
    function notify(message) {
        setToast(message);
        window.setTimeout(() => setToast(""), 2500);
    }
    function beginEdit() {
        setDraftLead(lead);
        setIsEditing(true);
    }
    function saveEdit() {
        const synced = syncPrimaryContact(draftLead);
        setLead(synced);
        setDraftLead(synced);
        setIsEditing(false);
        notify("Lead information updated");
    }
    function cancelEdit() {
        setDraftLead(lead);
        setIsEditing(false);
    }
    function beginMoreEdit() {
        setMoreDraft(lead);
        setIsEditingMore(true);
    }
    function saveMoreEdit() {
        const synced = syncPrimaryContact(moreDraft);
        setLead(synced);
        setMoreDraft(synced);
        setIsEditingMore(false);
        notify("Additional information updated");
    }
    function cancelMoreEdit() {
        setMoreDraft(lead);
        setIsEditingMore(false);
    }
    function beginProjectEdit() {
        setProjectDraft(lead);
        setIsEditingProject(true);
    }
    function saveProjectEdit() {
        setLead(projectDraft);
        setIsEditingProject(false);
        notify("Project information updated");
    }
    function cancelProjectEdit() {
        setProjectDraft(lead);
        setIsEditingProject(false);
    }
    function addActivity() {
        if (!activityForm.title.trim())
            return;
        const item = {
            id: Date.now(),
            type: activityForm.type,
            title: activityForm.title,
            detail: activityForm.note || `${activityForm.type} scheduled with ${lead.companyName}.`,
            time: `${formatShortDate(activityForm.date)}, ${formatTime(activityForm.startTime)}`,
            owner: activityForm.owner,
            scheduledDate: activityForm.date,
            startTime: activityForm.startTime,
            endTime: activityForm.endTime,
            priority: activityForm.priority,
            location: activityForm.location,
        };
        setActivities((current) => [item, ...current]);
        setActivityCalendarDate(activityForm.date);
        if (activityForm.markAsNext) {
            setNextActivity({
                type: activityForm.type,
                title: activityForm.title,
                date: formatShortDate(activityForm.date),
                time: formatTime(activityForm.startTime),
                owner: activityForm.owner,
            });
        }
        setActivityForm((current) => ({ ...current, title: "", note: "", location: "", videoLink: "" }));
        setModal(null);
        notify("Activity scheduled");
    }
    function saveNextActivity() {
        setModal(null);
        notify("Next activity updated");
    }
    function addNote() {
        if (!noteDraft.trim())
            return;
        setNotes((current) => [{ id: Date.now(), body: noteDraft, author: "Priya Sharma", time: "Just now" }, ...current]);
        setNoteDraft("");
        setModal(null);
        notify("Note added");
    }
    function handleFileUpload(event) {
        const selected = Array.from(event.target.files || []);
        if (!selected.length)
            return;
        setFiles((current) => [
            ...selected.map((file, index) => ({
                id: Date.now() + index,
                name: file.name,
                type: file.name.split(".").pop()?.toUpperCase() || "FILE",
                size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
                uploadedBy: "Priya Sharma",
                time: "Just now",
            })),
            ...current,
        ]);
        event.target.value = "";
        notify(`${selected.length} file${selected.length > 1 ? "s" : ""} uploaded`);
    }
    function renderOverview() {
        return (<div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="space-y-5">
          <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.85fr)]">
          <Card className="h-full">
            <CardHeader title="Lead Information" action={isEditing ? (<div className="flex gap-2"><Button variant="ghost" onClick={cancelEdit}>Cancel</Button><Button variant="primary" onClick={saveEdit}>Save changes</Button></div>) : (<button type="button" onClick={beginEdit} aria-label="Edit lead information" title="Edit lead information" className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100">
                    <Icon name="edit" size={17}/>
                  </button>)}/>
            {isEditing ? (<div className="grid gap-4 p-5 sm:grid-cols-2">
                <Field label="Organization name" value={draftLead.companyName} onChange={(value) => setDraftLead({ ...draftLead, companyName: value })}/>
                <Field label="Website" value={draftLead.website} onChange={(value) => setDraftLead({ ...draftLead, website: value })}/>
                <div className="sm:col-span-2">
                  <ContactPersonsEditor contacts={draftLead.contacts} onChange={(contacts) => setDraftLead(syncPrimaryContact({ ...draftLead, contacts }))}/>
                </div>
                <Field label="Location" value={draftLead.location} onChange={(value) => setDraftLead({ ...draftLead, location: value })}/>
                <Field label="Industry" value={draftLead.industry} onChange={(value) => setDraftLead({ ...draftLead, industry: value })}/>
                <SelectField label="Source Channel" value={draftLead.source} options={["Referral", "Website", "Instagram", "LinkedIn", "Cold outreach", "Other"]} onChange={(value) => setDraftLead({ ...draftLead, source: value })}/>
                <SelectField label="Client Category" value={draftLead.category} options={["A+", "A", "B", "C"]} onChange={(value) => setDraftLead({ ...draftLead, category: value })}/>
                <SelectField label="Priority" value={draftLead.priority} options={["High", "Medium", "Low"]} onChange={(value) => setDraftLead({ ...draftLead, priority: value })}/>
                <SelectField label="Assigned to" value={draftLead.assignedTo} options={["Priya Sharma", "Aman Verma", "Rhea Kapoor"]} onChange={(value) => setDraftLead({ ...draftLead, assignedTo: value })}/>
              </div>) : (<div className="grid gap-x-8 gap-y-6 p-5 sm:grid-cols-2">
                <InfoItem icon="user" label="Primary Contact" value={lead.contactName}/>
                <InfoItem icon="users" label="Contact Persons">
                  <button type="button" onClick={() => setActiveTab("More")} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline">
                    {lead.contacts.length} contact{lead.contacts.length === 1 ? "" : "s"} linked <Icon name="external" size={12}/>
                  </button>
                </InfoItem>
                <InfoItem icon="mail" label="Primary Email"><a className="text-sm font-medium text-blue-600 hover:underline" href={`mailto:${lead.email}`}>{lead.email}</a></InfoItem>
                <InfoItem icon="phone" label="Primary Phone"><a className="text-sm font-medium text-blue-600 hover:underline" href={`tel:${lead.phone}`}>{lead.phone}</a></InfoItem>
                <InfoItem icon="link" label="Website"><a className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline" href="#">{lead.website}<Icon name="external" size={12}/></a></InfoItem>
                <InfoItem icon="briefcase" label="Industry" value={lead.industry}/>
                <InfoItem icon="document" label="Location" value={lead.location}/>
                <InfoItem icon="briefcase" label="Source Channel" value={lead.source}/>
                <InfoItem icon="tag" label="Client Category"><Badge tone="purple">{lead.category}</Badge></InfoItem>
                <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3 shadow-[0_1px_2px_rgba(245,158,11,0.08)]">
                  <InfoItem icon="sparkles" label="Priority"><Badge tone="amber">{lead.priority}</Badge></InfoItem>
                </div>
                <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-3 shadow-[0_1px_2px_rgba(37,99,235,0.08)]">
                  <InfoItem icon="user" label="Assigned to"><div className="flex items-center gap-2"><Avatar name={lead.assignedTo} size="sm"/><span className="text-sm font-semibold text-blue-800">{lead.assignedTo}</span></div></InfoItem>
                </div>
              </div>)}
          </Card>

          <Card className="h-full">
            <CardHeader title="Project Snapshot" action={<button type="button" onClick={() => setActiveTab("Project Information")} aria-label="Open Project Information" title="Open Project Information" className="rounded-md p-1.5 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100">
                  <Icon name="external" size={17}/>
                </button>}/>
            <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"><InfoItem label="Project needs"><ValueChips values={lead.projectNeeds} tone="blue"/></InfoItem></div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"><InfoItem label="Project Budget" value={lead.budget}/></div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"><InfoItem label="Expected Timeline" value={lead.timeline}/></div>
            </div>
          </Card>
          </div>

          <Card>
            <CardHeader title="Requirement Summary" action={<button type="button" onClick={() => setActiveTab("Project Information")} aria-label="Open Project Information" title="Open Project Information" className="rounded-md p-1.5 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100">
                  <Icon name="external" size={17}/>
                </button>}/>
            <div className="grid gap-4 p-5 md:grid-cols-2">
              <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900"><Icon name="briefcase" size={17} className="text-blue-600"/>Branding</div>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-blue-700"><Icon name="sparkles" size={14}/>AI Summary</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{lead.brandingAiSummary || "No AI summary available yet."}</p>
              </div>
              <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900"><Icon name="link" size={17} className="text-blue-600"/>Website</div>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-blue-700"><Icon name="sparkles" size={14}/>AI Summary</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{lead.websiteAiSummary || "No AI summary available yet."}</p>
              </div>
              <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900"><Icon name="document" size={17} className="text-blue-600"/>UX/UI</div>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-blue-700"><Icon name="sparkles" size={14}/>AI Summary</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{lead.uxAiSummary || "No AI summary available yet."}</p>
              </div>
              <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900"><Icon name="settings" size={17} className="text-blue-600"/>Design & Technical Support</div>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-blue-700"><Icon name="sparkles" size={14}/>AI Summary</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{lead.supportAiSummary || "No AI summary available yet."}</p>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="History" action={<button type="button" onClick={() => setActiveTab("Activity")} aria-label="Open Activity" title="Open Activity" className="rounded-md p-1.5 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100">
                  <Icon name="external" size={17}/>
                </button>}/>
            <div className="divide-y divide-slate-100 px-5">
              {activities.slice(0, 4).map((activity) => (<div key={activity.id} className="flex gap-3 py-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500"><Icon name={activity.type === "Call" ? "phone" : activity.type === "Email" ? "mail" : "note"} size={15}/></div>
                  <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-slate-800">{activity.title}</p><p className="mt-1 text-sm leading-5 text-slate-500">{activity.detail}</p><p className="mt-1.5 text-xs text-slate-400">{activity.time} · {activity.owner}</p></div>
                </div>))}
            </div>
          </Card>
        </div>

        <aside className="space-y-5 xl:sticky xl:top-[184px] xl:self-start">
          <Card className="overflow-hidden border-blue-200">
            <div className="bg-blue-600 px-5 py-4 text-white">
              <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-sm font-bold"><Icon name="calendar" size={17}/>Next Activity</div><button onClick={() => setModal("nextActivity")} className="rounded-lg p-1.5 text-blue-100 hover:bg-white/10 hover:text-white"><Icon name="edit" size={16}/></button></div>
            </div>
            <div className="p-5">
              <div className="flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Icon name="users" size={18}/></div><div><Badge tone="blue">{nextActivity.type}</Badge><h3 className="mt-2 text-sm font-bold leading-5 text-slate-900">{nextActivity.title}</h3></div></div>
              <div className="mt-4 space-y-2.5 text-sm text-slate-600"><p className="flex items-center gap-2"><Icon name="calendar" size={15} className="text-slate-400"/>{nextActivity.date}</p><p className="flex items-center gap-2"><Icon name="clock" size={15} className="text-slate-400"/>{nextActivity.time}</p><p className="flex items-center gap-2"><Icon name="user" size={15} className="text-slate-400"/>{nextActivity.owner}</p></div>
              <div className="mt-5 grid grid-cols-2 gap-2"><Button variant="secondary" onClick={() => setModal("nextActivity")}>Reschedule</Button><Button variant="primary" icon="check" onClick={() => notify("Activity marked complete")}>Mark done</Button></div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Lead Health"/>
            <div className="p-5">
              <div className="flex items-end justify-between"><span className="text-2xl font-bold text-slate-900">{completion}%</span><span className="text-xs font-semibold text-emerald-600">Ready to qualify</span></div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600" style={{ width: `${completion}%` }}/></div>
              <div className="mt-4 space-y-2 text-xs text-slate-500"><p className="flex items-center gap-2"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Icon name="check" size={11}/></span>Contact details captured</p><p className="flex items-center gap-2"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Icon name="check" size={11}/></span>Budget and timeline known</p><p className="flex items-center gap-2"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-100 text-amber-700"><Icon name="clock" size={11}/></span>Website scope needs confirmation</p></div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Quick Actions"/>
            <div className="grid grid-cols-2 gap-2 p-4">
              <button onClick={() => setModal("note")} className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 px-3 py-3 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"><Icon name="note" size={18}/>Add note</button>
              <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 px-3 py-3 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"><Icon name="upload" size={18}/>Upload file</button>
            </div>
          </Card>
        </aside>
      </div>);
    }
    function renderProjectInformation() {
        const current = isEditingProject ? projectDraft : lead;
        return (<div className="space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Project Information</h2>
            <p className="mt-1 text-sm text-slate-500">Complete commercial, branding, website, UX/UI and technical-support information collected from the client.</p>
          </div>
          {isEditingProject ? (<div className="flex items-center gap-2">
              <Button variant="ghost" onClick={cancelProjectEdit}>Cancel</Button>
              <Button variant="primary" onClick={saveProjectEdit}>Save changes</Button>
            </div>) : (<button type="button" onClick={beginProjectEdit} aria-label="Edit project information" title="Edit project information" className="rounded-md p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"><Icon name="edit" size={18}/></button>)}
        </div>

        <Card>
          <CardHeader title="Project Scope & Commercial Information"/>
          {isEditingProject ? (<div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="sm:col-span-2"><ListField label="Project needs" values={current.projectNeeds} onChange={(values) => setProjectDraft({ ...projectDraft, projectNeeds: values })}/></div>
              <Field label="Project budget" value={current.budget} onChange={(value) => setProjectDraft({ ...projectDraft, budget: value })}/>
              <SelectField label="Budget type" value={current.budgetType} options={["Fixed", "Range"]} onChange={(value) => setProjectDraft({ ...projectDraft, budgetType: value })}/>
              <Field label="Currency" value={current.currency} onChange={(value) => setProjectDraft({ ...projectDraft, currency: value })}/>
              <Field label="Expected timeline" value={current.timeline} onChange={(value) => setProjectDraft({ ...projectDraft, timeline: value })}/>
              <Field label="Expected start" value={current.timelineStart} onChange={(value) => setProjectDraft({ ...projectDraft, timelineStart: value })}/>
              <Field label="Expected completion" value={current.timelineEnd} onChange={(value) => setProjectDraft({ ...projectDraft, timelineEnd: value })}/>
              <SelectField label="Priority" value={current.priority} options={["High", "Medium", "Low"]} onChange={(value) => setProjectDraft({ ...projectDraft, priority: value })}/>
            </div>) : (<div className="grid gap-x-8 px-5 py-1 md:grid-cols-2">
              <div>
                <DetailRow label="Project needs" value={<ValueChips values={lead.projectNeeds} tone="blue"/>}/>
                <DetailRow label="Project budget" value={lead.budget}/>
                <DetailRow label="Budget type" value={lead.budgetType}/>
                <DetailRow label="Currency" value={lead.currency}/>
              </div>
              <div>
                <DetailRow label="Expected timeline" value={lead.timeline}/>
                <DetailRow label="Expected start" value={lead.timelineStart}/>
                <DetailRow label="Expected completion" value={lead.timelineEnd}/>
                <DetailRow label="Priority" value={<Badge tone="red">{lead.priority}</Badge>}/>
              </div>
            </div>)}
        </Card>

        {isEditingProject ? (<>
            <ProjectEditCard title="Branding" icon="sparkles" attachments={["Existing-Brand-Deck.pdf", "Property-Signage-Photos.zip", "Logo-Files.ai"]}>
              <Field label="Brand name" value={current.brandName} onChange={(value) => setProjectDraft({ ...projectDraft, brandName: value })}/>
              <ListField label="Requirements" values={current.brandingRequirements} onChange={(values) => setProjectDraft({ ...projectDraft, brandingRequirements: values })}/>
              <ListField label="Type required" values={current.brandType} onChange={(values) => setProjectDraft({ ...projectDraft, brandType: values })}/>
              <ListField label="Deliverables" values={current.brandingDeliverables} onChange={(values) => setProjectDraft({ ...projectDraft, brandingDeliverables: values })}/>
              <ListField label="Style preference" values={current.brandingStyle} onChange={(values) => setProjectDraft({ ...projectDraft, brandingStyle: values })}/>
              <Field label="Reference brands" value={current.referenceBrands} onChange={(value) => setProjectDraft({ ...projectDraft, referenceBrands: value })}/>
              <Field label="Colour preference" value={current.colorPreference} onChange={(value) => setProjectDraft({ ...projectDraft, colorPreference: value })}/>
              <Field label="Target audience" value={current.targetAudience} onChange={(value) => setProjectDraft({ ...projectDraft, targetAudience: value })}/>
              <div className="sm:col-span-2"><TextAreaField label="Detailed requirements" value={current.brandingDetails} onChange={(value) => setProjectDraft({ ...projectDraft, brandingDetails: value })} rows={4}/></div>
              <div className="sm:col-span-2"><AiSummaryEditor value={current.brandingAiSummary} onChange={(value) => setProjectDraft({ ...projectDraft, brandingAiSummary: value })}/></div>
            </ProjectEditCard>

            <ProjectEditCard title="Website" icon="link" attachments={["Current-Website-Screens.zip", "Website-Content.docx"]}>
              <div className="sm:col-span-2"><TextAreaField label="Tech preference" value={current.techPreference} onChange={(value) => setProjectDraft({ ...projectDraft, techPreference: value })}/></div>
              <ListField label="Frontend" values={current.frontends} onChange={(values) => setProjectDraft({ ...projectDraft, frontends: values })}/>
              <ListField label="Backend" values={current.backends} onChange={(values) => setProjectDraft({ ...projectDraft, backends: values })}/>
              <ListField label="Database" values={current.databases} onChange={(values) => setProjectDraft({ ...projectDraft, databases: values })}/>
              <ListField label="CMS" values={current.cms} onChange={(values) => setProjectDraft({ ...projectDraft, cms: values })}/>
              <ListField label="Payment method" values={current.paymentMethods} onChange={(values) => setProjectDraft({ ...projectDraft, paymentMethods: values })}/>
              <ListField label="Hosting / deployment" values={current.hosting} onChange={(values) => setProjectDraft({ ...projectDraft, hosting: values })}/>
              <ListField label="Mobile app" values={current.mobileApps} onChange={(values) => setProjectDraft({ ...projectDraft, mobileApps: values })}/>
              <div className="sm:col-span-2"><TextAreaField label="Tech notes" value={current.techNotes} onChange={(value) => setProjectDraft({ ...projectDraft, techNotes: value })}/></div>
              <div className="sm:col-span-2"><TextAreaField label="Detailed requirements" value={current.websiteDetails} onChange={(value) => setProjectDraft({ ...projectDraft, websiteDetails: value })} rows={4}/></div>
              <div className="sm:col-span-2"><AiSummaryEditor value={current.websiteAiSummary} onChange={(value) => setProjectDraft({ ...projectDraft, websiteAiSummary: value })}/></div>
            </ProjectEditCard>

            <ProjectEditCard title="UX/UI" icon="document" attachments={["Guest-Journey-Notes.pdf"]}>
              <Field label="Product type" value={current.uxProductType} onChange={(value) => setProjectDraft({ ...projectDraft, uxProductType: value })}/>
              <ListField label="UX/UI scope" values={current.uxScope} onChange={(values) => setProjectDraft({ ...projectDraft, uxScope: values })}/>
              <ListField label="Platforms" values={current.uxPlatforms} onChange={(values) => setProjectDraft({ ...projectDraft, uxPlatforms: values })}/>
              <Field label="Screens / pages" value={current.screenCount} onChange={(value) => setProjectDraft({ ...projectDraft, screenCount: value })}/>
              <ListField label="Existing assets" values={current.existingAssets} onChange={(values) => setProjectDraft({ ...projectDraft, existingAssets: values })}/>
              <ListField label="Design style" values={current.uxStyle} onChange={(values) => setProjectDraft({ ...projectDraft, uxStyle: values })}/>
              <Field label="Reference products" value={current.uxReferences} onChange={(value) => setProjectDraft({ ...projectDraft, uxReferences: value })}/>
              <Field label="Target users" value={current.uxTargetUsers} onChange={(value) => setProjectDraft({ ...projectDraft, uxTargetUsers: value })}/>
              <Field label="Accessibility" value={current.accessibility} onChange={(value) => setProjectDraft({ ...projectDraft, accessibility: value })}/>
              <div className="sm:col-span-2"><TextAreaField label="UX/UI notes" value={current.uxNotes} onChange={(value) => setProjectDraft({ ...projectDraft, uxNotes: value })} rows={4}/></div>
              <div className="sm:col-span-2"><AiSummaryEditor value={current.uxAiSummary} onChange={(value) => setProjectDraft({ ...projectDraft, uxAiSummary: value })}/></div>
            </ProjectEditCard>

            <ProjectEditCard title="Design & Technical Support" icon="settings" attachments={[]}>
              <ListField label="Support required" values={current.supportType} onChange={(values) => setProjectDraft({ ...projectDraft, supportType: values })}/>
              <Field label="Engagement type" value={current.engagementType} onChange={(value) => setProjectDraft({ ...projectDraft, engagementType: value })}/>
              <Field label="Existing platform" value={current.existingPlatform} onChange={(value) => setProjectDraft({ ...projectDraft, existingPlatform: value })}/>
              <SelectField label="Support priority" value={current.supportPriority} options={["Urgent — immediate support", "High — priority support", "Normal — regular support", "Low — planned support"]} onChange={(value) => setProjectDraft({ ...projectDraft, supportPriority: value })}/>
              <Field label="Estimated hours" value={current.supportHours} onChange={(value) => setProjectDraft({ ...projectDraft, supportHours: value })}/>
              <ListField label="Access available" values={current.accessAvailable} onChange={(values) => setProjectDraft({ ...projectDraft, accessAvailable: values })}/>
              <div className="sm:col-span-2"><TextAreaField label="Current issues" value={current.currentIssues} onChange={(value) => setProjectDraft({ ...projectDraft, currentIssues: value })} rows={4}/></div>
              <div className="sm:col-span-2"><TextAreaField label="Expected outcome" value={current.supportOutcome} onChange={(value) => setProjectDraft({ ...projectDraft, supportOutcome: value })} rows={4}/></div>
              <div className="sm:col-span-2"><AiSummaryEditor value={current.supportAiSummary} onChange={(value) => setProjectDraft({ ...projectDraft, supportAiSummary: value })}/></div>
            </ProjectEditCard>
          </>) : (<>
            <ServiceInformationCard title="Branding" icon="sparkles" rows={[
                    { label: "Brand name", value: lead.brandName },
                    { label: "Requirements", value: <ValueChips values={lead.brandingRequirements}/> },
                    { label: "Type required", value: <ValueChips values={lead.brandType}/> },
                    { label: "Deliverables", value: <ValueChips values={lead.brandingDeliverables}/> },
                    { label: "Style preference", value: <ValueChips values={lead.brandingStyle}/> },
                    { label: "Reference brands", value: lead.referenceBrands },
                    { label: "Colour preference", value: lead.colorPreference },
                    { label: "Target audience", value: lead.targetAudience },
                    { label: "Detailed requirements", value: lead.brandingDetails },
                ]} aiSummary={lead.brandingAiSummary} attachments={["Existing-Brand-Deck.pdf", "Property-Signage-Photos.zip", "Logo-Files.ai"]}/>

            <ServiceInformationCard title="Website" icon="link" rows={[
                    { label: "Tech preference", value: lead.techPreference },
                    { label: "Frontend", value: <ValueChips values={lead.frontends}/> },
                    { label: "Backend", value: <ValueChips values={lead.backends}/> },
                    { label: "Database", value: <ValueChips values={lead.databases}/> },
                    { label: "CMS", value: <ValueChips values={lead.cms}/> },
                    { label: "Payment method", value: <ValueChips values={lead.paymentMethods}/> },
                    { label: "Hosting / deployment", value: <ValueChips values={lead.hosting}/> },
                    { label: "Mobile app", value: <ValueChips values={lead.mobileApps}/> },
                    { label: "Tech notes", value: lead.techNotes },
                    { label: "Detailed requirements", value: lead.websiteDetails },
                ]} aiSummary={lead.websiteAiSummary} attachments={["Current-Website-Screens.zip", "Website-Content.docx"]}/>

            <ServiceInformationCard title="UX/UI" icon="document" rows={[
                    { label: "Product type", value: lead.uxProductType },
                    { label: "UX/UI scope", value: <ValueChips values={lead.uxScope}/> },
                    { label: "Platforms", value: <ValueChips values={lead.uxPlatforms}/> },
                    { label: "Screens / pages", value: lead.screenCount },
                    { label: "Existing assets", value: <ValueChips values={lead.existingAssets}/> },
                    { label: "Design style", value: <ValueChips values={lead.uxStyle}/> },
                    { label: "Reference products", value: lead.uxReferences },
                    { label: "Target users", value: lead.uxTargetUsers },
                    { label: "Accessibility", value: lead.accessibility },
                    { label: "UX/UI notes", value: lead.uxNotes },
                ]} aiSummary={lead.uxAiSummary} attachments={["Guest-Journey-Notes.pdf"]}/>

            <ServiceInformationCard title="Design & Technical Support" icon="settings" rows={[
                    { label: "Support required", value: <ValueChips values={lead.supportType}/> },
                    { label: "Engagement type", value: lead.engagementType },
                    { label: "Existing platform", value: lead.existingPlatform },
                    { label: "Support priority", value: lead.supportPriority },
                    { label: "Estimated hours", value: lead.supportHours },
                    { label: "Access available", value: <ValueChips values={lead.accessAvailable}/> },
                    { label: "Current issues", value: lead.currentIssues },
                    { label: "Expected outcome", value: lead.supportOutcome },
                ]} aiSummary={lead.supportAiSummary} attachments={[]}/>
          </>)}
      </div>);
    }
    function renderActivity() {
        const monthDays = getMonthDays(activityCalendarDate);
        const monthLabel = toLocalDate(activityCalendarDate).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
        const selectedActivities = activities
            .filter((activity) => activity.scheduledDate === activityCalendarDate)
            .sort((a, b) => (a.startTime || "99:99").localeCompare(b.startTime || "99:99"));
        const upcomingActivities = activities.filter((activity) => activity.scheduledDate && !activity.done).slice(0, 4);
        return (<div className="space-y-5">
        <Card>
          <CardHeader title="Activity" subtitle="View the schedule, plan the next action and keep the client timeline in one place." action={<Button variant="primary" icon="plus" onClick={() => setModal("activity")}>Add activity</Button>}/>
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="border-b border-slate-100 p-5 lg:border-b-0 lg:border-r">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div><h3 className="text-sm font-bold text-slate-900">Schedule for {formatLongDate(activityCalendarDate)}</h3><p className="mt-1 text-xs text-slate-500">Select another date from the calendar to review its activities.</p></div>
                <button type="button" onClick={() => { setActivityForm((current) => ({ ...current, date: activityCalendarDate })); setModal("activity"); }} className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"><Icon name="calendar" size={14}/>Schedule on this date</button>
              </div>
              {selectedActivities.length ? (<div className="space-y-3">
                  {selectedActivities.map((activity) => (<article key={activity.id} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${getActivityTone(activity.type)}`}><Icon name={getActivityIcon(activity.type)} size={17}/></div>
                      <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h4 className="text-sm font-bold text-slate-900">{activity.title}</h4><Badge tone={activity.done ? "green" : activity.priority === "High" ? "amber" : "blue"}>{activity.done ? "Completed" : activity.priority || activity.type}</Badge></div><p className="mt-1.5 text-sm leading-6 text-slate-500">{activity.detail}</p><div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400"><span className="inline-flex items-center gap-1.5"><Icon name="clock" size={13}/>{activity.startTime ? `${formatTime(activity.startTime)}${activity.endTime ? ` – ${formatTime(activity.endTime)}` : ""}` : activity.time}</span><span className="inline-flex items-center gap-1.5"><Icon name="user" size={13}/>{activity.owner}</span>{activity.location && <span className="inline-flex items-center gap-1.5"><Icon name="briefcase" size={13}/>{activity.location}</span>}</div></div>
                      <button className="h-8 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Icon name="more" size={18}/></button>
                    </article>))}
                </div>) : (<div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-6 text-center"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon name="calendar" size={20}/></div><h4 className="mt-3 text-sm font-bold text-slate-900">No activity scheduled</h4><p className="mt-1 max-w-xs text-sm leading-6 text-slate-500">Choose a time and add the next client action for this date.</p><Button className="mt-4" icon="plus" onClick={() => { setActivityForm((current) => ({ ...current, date: activityCalendarDate })); setModal("activity"); }}>Add activity</Button></div>)}
            </div>

            <aside className="bg-slate-50/50 p-5">
              <div className="mb-4 flex items-center justify-between"><button type="button" onClick={() => setActivityCalendarDate(shiftIsoDate(activityCalendarDate, -1))} className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50"><Icon name="arrow-left" size={15}/></button><div className="text-center"><h3 className="text-sm font-bold text-slate-900">{monthLabel}</h3><p className="mt-0.5 text-[11px] text-slate-400">Activity calendar</p></div><button type="button" onClick={() => setActivityCalendarDate(shiftIsoDate(activityCalendarDate, 1))} className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50"><Icon name="arrow-left" size={15} className="rotate-180"/></button></div>
              <div className="grid grid-cols-7 gap-1 text-center">{calendarWeekdays.map((weekday) => <span key={weekday} className="py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">{weekday}</span>)}{monthDays.map((day, index) => day ? <button key={day} type="button" onClick={() => setActivityCalendarDate(day)} className={`relative flex h-9 items-center justify-center rounded-lg text-xs font-semibold transition ${day === activityCalendarDate ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}>{toLocalDate(day).getDate()}{activities.some((activity) => activity.scheduledDate === day && !activity.done) && <span className={`absolute bottom-1 h-1 w-1 rounded-full ${day === activityCalendarDate ? "bg-white" : "bg-blue-500"}`}/>}</button> : <span key={`blank-${index}`}/>)}</div>
              <div className="mt-5 border-t border-slate-200 pt-4"><div className="mb-3 flex items-center justify-between"><h4 className="text-xs font-bold uppercase tracking-[0.06em] text-slate-500">Upcoming</h4><span className="text-xs text-slate-400">{upcomingActivities.length} activities</span></div><div className="space-y-3">{upcomingActivities.map((activity) => <button key={activity.id} type="button" onClick={() => activity.scheduledDate && setActivityCalendarDate(activity.scheduledDate)} className="flex w-full items-start gap-3 rounded-lg p-2 text-left transition hover:bg-white"><span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${getActivityTone(activity.type)}`}><Icon name={getActivityIcon(activity.type)} size={14}/></span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-slate-800">{activity.title}</span><span className="mt-1 block text-[11px] text-slate-400">{activity.scheduledDate ? formatShortDate(activity.scheduledDate) : ""}{activity.startTime ? ` • ${formatTime(activity.startTime)}` : ""}</span></span></button>)}</div></div>
            </aside>
          </div>
        </Card>

        <Card>
          <CardHeader title="Activity History" subtitle="Completed actions and important updates recorded against this lead."/>
          <div className="divide-y divide-slate-100 px-5">
            {activities.filter((activity) => activity.done || !activity.scheduledDate).map((activity) => (<div key={activity.id} className="flex gap-4 py-5">
                <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${activity.done ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}><Icon name={getActivityIcon(activity.type)} size={16}/></div>
                <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-bold text-slate-900">{activity.title}</p><Badge tone={activity.done ? "green" : "blue"}>{activity.done ? "Completed" : activity.type}</Badge></div><p className="mt-1.5 text-sm leading-6 text-slate-500">{activity.detail}</p><div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400"><span>{activity.time}</span><span>•</span><span>{activity.owner}</span></div></div>
                <button className="h-8 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Icon name="more" size={18}/></button>
              </div>))}
          </div>
        </Card>
      </div>);
    }
    function renderNotes() {
        return (<Card>
        <CardHeader title="Notes" subtitle="Internal context and client-specific observations." action={<Button variant="primary" icon="plus" onClick={() => setModal("note")}>Add note</Button>}/>
        <div className="space-y-4 p-5">
          {notes.map((note) => (<article key={note.id} className="rounded-xl border border-slate-200 bg-amber-50/30 p-4">
              <p className="text-sm leading-6 text-slate-700">{note.body}</p>
              <div className="mt-4 flex items-center justify-between gap-3"><div className="flex items-center gap-2"><Avatar name={note.author} size="sm"/><div><p className="text-xs font-semibold text-slate-700">{note.author}</p><p className="text-[11px] text-slate-400">{note.time}</p></div></div><button className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-slate-700"><Icon name="more" size={17}/></button></div>
            </article>))}
        </div>
      </Card>);
    }
    function renderFiles() {
        return (<Card>
        <CardHeader title="Files" subtitle="Documents, references and assets shared for this opportunity." action={<Button variant="primary" icon="upload" onClick={() => fileInputRef.current?.click()}>Upload files</Button>}/>
        {files.length ? (<div className="divide-y divide-slate-100">
            {files.map((file) => (<div key={file.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Icon name="file" size={18}/></div>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-800">{file.name}</p><p className="mt-1 text-xs text-slate-400">{file.type} · {file.size} · Uploaded by {file.uploadedBy} · {file.time}</p></div>
                <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Icon name="download" size={17}/></button><button onClick={() => setFiles((current) => current.filter((item) => item.id !== file.id))} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><Icon name="trash" size={17}/></button>
              </div>))}
          </div>) : <EmptyState icon="folder" title="No files yet" description="Upload client references, requirement documents or other project material." action={<Button variant="primary" icon="upload" onClick={() => fileInputRef.current?.click()}>Upload files</Button>}/>}
      </Card>);
    }
    function renderMore() {
        const current = isEditingMore ? moreDraft : lead;
        return (<div className="space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">More Information</h2>
            <p className="mt-1 text-sm text-slate-500">Additional organization, contact-person, attribution and record details collected for this lead.</p>
          </div>
          {isEditingMore ? (<div className="flex items-center gap-2">
              <Button variant="ghost" onClick={cancelMoreEdit}>Cancel</Button>
              <Button variant="primary" onClick={saveMoreEdit}>Save changes</Button>
            </div>) : (<button type="button" onClick={beginMoreEdit} aria-label="Edit more information" title="Edit more information" className="rounded-md p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100">
              <Icon name="edit" size={18}/>
            </button>)}
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <Card>
            <CardHeader title="Organization Details"/>
            {isEditingMore ? (<div className="grid gap-4 p-5 sm:grid-cols-2">
                <Field label="Organization name" value={current.companyName} onChange={(value) => setMoreDraft({ ...moreDraft, companyName: value })}/>
                <Field label="Industry" value={current.industry} onChange={(value) => setMoreDraft({ ...moreDraft, industry: value })}/>
                <Field label="Website" value={current.website} onChange={(value) => setMoreDraft({ ...moreDraft, website: value })}/>
                <Field label="Country" value={current.country} onChange={(value) => setMoreDraft({ ...moreDraft, country: value })}/>
                <div className="sm:col-span-2"><TextAreaField label="Address" value={current.address} onChange={(value) => setMoreDraft({ ...moreDraft, address: value })} rows={3}/></div>
                <Field label="Employees" value={current.employees} onChange={(value) => setMoreDraft({ ...moreDraft, employees: value })}/>
                <Field label="Annual revenue" value={current.annualRevenue} onChange={(value) => setMoreDraft({ ...moreDraft, annualRevenue: value })}/>
              </div>) : (<div className="px-5 py-1">
                <DetailRow label="Organization name" value={lead.companyName}/>
                <DetailRow label="Industry" value={lead.industry}/>
                <DetailRow label="Website" value={<a className="font-medium text-blue-600 hover:underline" href="#">{lead.website}</a>}/>
                <DetailRow label="Country" value={lead.country}/>
                <DetailRow label="Address" value={lead.address}/>
                <DetailRow label="Employees" value={lead.employees}/>
                <DetailRow label="Annual revenue" value={lead.annualRevenue}/>
              </div>)}
          </Card>

          <Card className="xl:col-span-2">
            <CardHeader title="Contact Persons"/>
            {isEditingMore ? (<div className="p-5">
                <ContactPersonsEditor contacts={current.contacts} onChange={(contacts) => setMoreDraft(syncPrimaryContact({ ...moreDraft, contacts }))}/>
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <LineListField label="Organization social links" values={current.socialLinks} onChange={(values) => setMoreDraft({ ...moreDraft, socialLinks: values })} placeholder="Add one complete profile URL per line, e.g. https://instagram.com/brand"/>
                </div>
              </div>) : (<>
                <ContactPersonsDisplay contacts={lead.contacts}/>
                <div className="border-t border-slate-100 px-5 py-1">
                  <DetailRow label="Organization social links" value={<SocialLinksDisplay values={lead.socialLinks}/>}/>
                </div>
              </>)}
          </Card>
          <Card>
            <CardHeader title="Source & Attribution"/>
            {isEditingMore ? (<div className="grid gap-4 p-5 sm:grid-cols-2">
                <SelectField label="Source channel" value={current.source} options={["Referral", "Website", "Instagram", "LinkedIn", "WhatsApp", "Cold outreach", "Other"]} onChange={(value) => setMoreDraft({ ...moreDraft, source: value })}/>
                <ListField label="Additional source channels" values={current.sourceChannels} onChange={(values) => setMoreDraft({ ...moreDraft, sourceChannels: values })}/>
                <Field label="Referral source" value={current.referralSource} onChange={(value) => setMoreDraft({ ...moreDraft, referralSource: value })}/>
                <Field label="Referral channel ID" value={current.referralChannelId} onChange={(value) => setMoreDraft({ ...moreDraft, referralChannelId: value })}/>
              </div>) : (<div className="px-5 py-1">
                <DetailRow label="Source channel" value={lead.source}/>
                <DetailRow label="Additional source channels" value={<ValueChips values={lead.sourceChannels} tone="blue"/>}/>
                <DetailRow label="Referral source" value={lead.referralSource}/>
                <DetailRow label="Referral channel ID" value={lead.referralChannelId}/>
              </div>)}
          </Card>

          <Card>
            <CardHeader title="Lead Management & Access"/>
            {isEditingMore ? (<div className="grid gap-4 p-5 sm:grid-cols-2">
                <LockedField label="Universal ID" value={current.universalCode}/>
                <LockedField label="Date Created" value={current.createdAt}/>
                <SelectField label="Lead status" value={current.status} options={statusOptions} onChange={(value) => setMoreDraft({ ...moreDraft, status: value })}/>
                <SelectField label="Assigned to" value={current.assignedTo} options={["Priya Sharma", "Aman Verma", "Rhea Kapoor"]} onChange={(value) => setMoreDraft({ ...moreDraft, assignedTo: value })}/>
                <SelectField label="Client category" value={current.category} options={["A+", "A", "B", "C"]} onChange={(value) => setMoreDraft({ ...moreDraft, category: value })}/>
                <SelectField label="Priority" value={current.priority} options={["High", "Medium", "Low"]} onChange={(value) => setMoreDraft({ ...moreDraft, priority: value })}/>
                <LockedField label="Visibility" value={current.visibility}/>
              </div>) : (<div className="px-5 py-1">
                <DetailRow label="Universal ID" value={<span className="inline-flex items-center gap-2 font-semibold text-slate-900"><Icon name="lock" size={14} className="text-slate-400"/>{lead.universalCode}</span>}/>
                <DetailRow label="Date Created" value={<span className="inline-flex items-center gap-2"><Icon name="lock" size={14} className="text-slate-400"/>{lead.createdAt}</span>}/>
                <DetailRow label="Lead status" value={<Badge tone="green">{lead.status}</Badge>}/>
                <DetailRow label="Assigned to" value={<div className="flex items-center gap-2"><Avatar name={lead.assignedTo} size="sm"/><span className="font-medium">{lead.assignedTo}</span></div>}/>
                <DetailRow label="Client category" value={<Badge tone="purple">{lead.category}</Badge>}/>
                <DetailRow label="Priority" value={<Badge tone="amber">{lead.priority}</Badge>}/>
                <DetailRow label="Visibility" value={<span className="inline-flex items-center gap-2"><Icon name="lock" size={14} className="text-slate-400"/>{lead.visibility}</span>}/>
              </div>)}
          </Card>
        </div>

      </div>);
    }
    function renderAiSummary() {
        const summary = lead.overallAiSummary.trim();
        if (!summary) {
            return (<Card>
          <EmptyState icon="sparkles" title="AI Summary" description="Not available at the moment."/>
        </Card>);
        }
        return (<div className="space-y-5">
        <Card>
          <CardHeader title="AI Summary" action={<Badge tone="purple">AI-generated</Badge>}/>
          <div className="p-5 lg:p-6">
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 lg:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-200">
                  <Icon name="sparkles" size={20}/>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600">Overall client summary</p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{summary}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold text-slate-500">Client Context</p>
                <p className="mt-2 text-sm font-bold text-slate-900">{lead.industry} · {lead.location}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{lead.category} category · {lead.priority} priority · {lead.status}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold text-slate-500">Commercial Summary</p>
                <p className="mt-2 text-sm font-bold text-slate-900">{lead.budget}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">Expected timeline: {lead.timeline}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold text-slate-500">Recommended Next Step</p>
                <p className="mt-2 text-sm font-bold text-slate-900">{nextActivity.title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{nextActivity.date} at {nextActivity.time}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>);
    }
    return (<div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-[72px] flex-col items-center border-r border-[#152857] bg-[#10214b] py-4 text-white">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-black text-[#10214b]">v</div>
        <div className="mt-8 w-full px-2">
          <button onClick={() => onNavigateSales("leads")} className="flex w-full flex-col items-center gap-1.5 rounded-xl bg-blue-600 px-2 py-3 text-[10px] font-semibold shadow-lg shadow-blue-950/20"><Icon name="inbox" size={19}/>Leads</button>
        </div>
        <button className="mt-auto rounded-lg p-2.5 text-blue-200 hover:bg-white/10 hover:text-white"><Icon name="settings" size={19}/></button>
      </aside>

      <main className="ml-[72px] min-h-screen">
        <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-14 items-center justify-between gap-4 px-5 lg:px-7">
            <div className="flex items-center gap-2 text-sm"><button onClick={onBack} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"><Icon name="arrow-left" size={18}/></button><span className="font-medium text-slate-400">Leads</span><span className="text-slate-300">/</span><span className="font-semibold text-slate-700">Lead detail</span></div>
            <div className="hidden w-full max-w-sm items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-400 md:flex"><Icon name="search" size={16}/><span className="text-xs">Search leads, contacts or files</span></div>
            <div className="flex items-center gap-2"><button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Icon name="settings" size={18}/></button><Avatar name="Priya Sharma"/></div>
          </div>
        </div>

        <header className="border-b border-slate-200 bg-white px-5 pb-0 pt-5 lg:px-7">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-3"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white">HJ</div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h1 className="truncate text-2xl font-bold tracking-tight text-slate-950">{lead.companyName}</h1><Badge tone="green">{lead.status}</Badge></div><div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-slate-600"><span className="inline-flex items-center gap-2" title="Universal ID is system generated and locked"><Icon name="lock" size={14} className="text-slate-400"/>{lead.universalCode}</span><span className="inline-flex items-center gap-2"><Icon name="user" size={15} className="text-slate-400"/>Assigned to {lead.assignedTo}</span><span className="inline-flex items-center gap-2" title="Date created is system generated and locked"><Icon name="lock" size={14} className="text-slate-400"/>Created {lead.createdAt}</span></div></div></div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative"><select value={lead.status} onChange={(event) => { setLead({ ...lead, status: event.target.value }); notify("Lead status updated"); }} className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">{statusOptions.map((status) => <option key={status}>{status}</option>)}</select><Icon name="chevron-down" size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"/></div>
              <Button icon="plus" onClick={() => setModal("activity")}>Add Activity</Button>
              <Button variant="primary" onClick={() => setModal("convert")}>Convert to Deal</Button>
              <div className="relative">
                <button type="button" onClick={() => setIsLeadActionsOpen((open) => !open)} aria-label="More lead actions" aria-expanded={isLeadActionsOpen} className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50"><Icon name="more" size={18}/></button>
                {isLeadActionsOpen && (<div className="absolute right-0 top-11 z-40 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl shadow-slate-200/70">
                    <button type="button" onClick={() => { setIsLeadActionsOpen(false); onArchive(sourceLead?.id); notify("Lead archived"); onBack(); }} className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"><Icon name="archive" size={16} className="text-slate-500"/>Archive</button>
                    <button type="button" disabled title="You do not have permission to permanently delete this lead" className="flex w-full cursor-not-allowed items-center gap-3 px-3.5 py-2.5 text-left text-sm font-medium text-slate-400"><Icon name="trash" size={16}/><span className="flex-1">Delete</span><Icon name="lock" size={14}/></button>
                    <button type="button" disabled title="Export is locked for your current role" className="flex w-full cursor-not-allowed items-center gap-3 px-3.5 py-2.5 text-left text-sm font-medium text-slate-400"><Icon name="download" size={16}/><span className="flex-1">Export</span><Icon name="lock" size={14}/></button>
                  </div>)}
              </div>
            </div>
          </div>

          <nav className="mt-6 flex gap-6 overflow-x-auto no-scrollbar" aria-label="Lead detail sections">
            {tabs.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={`relative shrink-0 pb-3 text-sm font-semibold transition ${activeTab === tab ? "text-blue-600" : "text-slate-500 hover:text-slate-800"}`}>{tab}{activeTab === tab && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-blue-600"/>}</button>))}
          </nav>
        </header>

        <div className="px-5 py-5 lg:px-7 lg:py-6">
          {activeTab === "Overview" && renderOverview()}
          {activeTab === "Project Information" && renderProjectInformation()}
          {activeTab === "Activity" && renderActivity()}
          {activeTab === "Notes" && renderNotes()}
          {activeTab === "Files" && renderFiles()}
          {activeTab === "More" && renderMore()}
          {activeTab === "AI Summary" && renderAiSummary()}
        </div>
      </main>

      <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileUpload}/>

      {modal === "activity" && (<ActivitySchedulerModal form={activityForm} onChange={setActivityForm} activities={activities} lead={lead} onClose={() => setModal(null)} onSave={addActivity}/>)}

      {modal === "nextActivity" && (<ModalShell title="Set Next Activity" description="Keep a clear next step scheduled for this opportunity." onClose={() => setModal(null)}>
          <div className="space-y-4 px-6 py-5">
            <SelectField label="Activity type" value={nextActivity.type} options={["Call", "Email", "Meeting", "Follow-up", "Task"]} onChange={(value) => setNextActivity({ ...nextActivity, type: value })}/>
            <Field label="Title" value={nextActivity.title} onChange={(value) => setNextActivity({ ...nextActivity, title: value })}/>
            <div className="grid grid-cols-2 gap-4"><Field label="Date" value={nextActivity.date} onChange={(value) => setNextActivity({ ...nextActivity, date: value })}/><Field label="Time" value={nextActivity.time} onChange={(value) => setNextActivity({ ...nextActivity, time: value })}/></div>
            <SelectField label="Assigned to" value={nextActivity.owner} options={["Priya Sharma", "Aman Verma", "Rhea Kapoor"]} onChange={(value) => setNextActivity({ ...nextActivity, owner: value })}/>
          </div>
          <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-6 py-4"><Button variant="ghost" onClick={() => setModal(null)}>Cancel</Button><Button variant="primary" icon="calendar" onClick={saveNextActivity}>Save activity</Button></div>
        </ModalShell>)}

      {modal === "note" && (<ModalShell title="Add Note" description="Notes are visible to internal team members with lead access." onClose={() => setModal(null)}>
          <div className="px-6 py-5"><textarea autoFocus value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} rows={7} className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm leading-6 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Write an important client note..."/></div>
          <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-6 py-4"><Button variant="ghost" onClick={() => setModal(null)}>Cancel</Button><Button variant="primary" icon="note" disabled={!noteDraft.trim()} onClick={addNote}>Add note</Button></div>
        </ModalShell>)}

      {modal === "convert" && (<ModalShell title="Convert Lead to Deal" description="Create a deal while retaining the complete lead history and requirements." onClose={() => setModal(null)}>
          <div className="px-6 py-5">
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4"><div className="flex gap-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600"><Icon name="sparkles" size={18}/></div><div><p className="text-sm font-bold text-slate-900">{lead.companyName}</p><p className="mt-1 text-sm leading-5 text-slate-600">A new deal will be created with the current owner, requirements, files, activities and notes.</p></div></div></div>
            <div className="mt-5 grid grid-cols-2 gap-4"><Field label="Deal value" value="₹5,40,000" onChange={() => undefined}/><Field label="Expected close date" value="15 Aug 2026" onChange={() => undefined}/></div>
          </div>
          <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-6 py-4"><Button variant="ghost" onClick={() => setModal(null)}>Cancel</Button><Button variant="primary" onClick={() => { setModal(null); notify("Lead converted to deal"); }}>Convert to deal</Button></div>
        </ModalShell>)}



      {toast && <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-xl"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500"><Icon name="check" size={13}/></span>{toast}</div>}
    </div>);
}
