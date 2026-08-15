"use client";
import { useState, useRef, useEffect } from "react";
import LeadDetail from "./LeadDetail";
import DealsWorkspace from "./DealsWorkspace";
import PeopleWorkspace from "./PeopleWorkspace";
import OrganizationsWorkspace from "./OrganizationsWorkspace";
import SalesNavigation from "./SalesNavigation";
function MultiSelect({ options, selected, onChange, placeholder = "Select options…" }) {
    const [open, setOpen] = useState(false);
    const [otherDetail, setOtherDetail] = useState("");
    const ref = useRef(null);
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target))
                setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);
    useEffect(() => {
        // Keep the auxiliary field in sync with the selected option.
        if (!selected.includes("Other") && otherDetail)
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOtherDetail("");
    }, [selected, otherDetail]);
    const toggle = (opt) => {
        onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
    };
    return (<div ref={ref} className="relative w-full">
      <button type="button" onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-left hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all">
        <span className={selected.length === 0 ? "text-gray-400" : "text-gray-800 font-medium"}>
          {selected.length === 0
            ? placeholder
            : selected.length === 1
                ? selected[0]
                : `${selected.length} selected`}
        </span>
        <svg className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {open && (<div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto scroll-thin">
          {options.map((opt) => {
                const checked = selected.includes(opt);
                return (<button key={opt} type="button" onClick={() => toggle(opt)} className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left hover:bg-blue-50 transition-colors ${checked ? "bg-blue-50/60" : ""}`}>
                <span className={`w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center transition-colors ${checked ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}>
                  {checked && (<svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5"/>
                    </svg>)}
                </span>
                <span className={checked ? "text-gray-800 font-medium" : "text-gray-600"}>{opt}</span>
              </button>);
            })}
        </div>)}

      {selected.length > 0 && (<div className="flex flex-wrap gap-1.5 mt-2">
          {selected.map((s) => (<span key={s} className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {s}
              <button type="button" onClick={() => toggle(s)} className="hover:text-blue-900 transition-colors">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 2l8 8M10 2l-8 8"/>
                </svg>
              </button>
            </span>))}
        </div>)}

      {options.includes("Other") && selected.includes("Other") && (<div className="mt-2">
          <input type="text" value={otherDetail} onChange={(e) => setOtherDetail(e.target.value)} placeholder="Please mention what other" aria-label="Please mention what other" className="w-full px-3 py-2 bg-blue-50/40 border border-blue-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"/>
        </div>)}
    </div>);
}
// ─── Single Select ────────────────────────────────────────────────────────────
function Select({ options, value, onChange, placeholder = "Select…", }) {
    const [otherDetail, setOtherDetail] = useState("");
    useEffect(() => {
        // Keep the auxiliary field in sync with the selected option.
        if (value !== "Other" && otherDetail)
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOtherDetail("");
    }, [value, otherDetail]);
    return (<div className="w-full">
      <div className="relative w-full">
        <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 pr-9 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer">
          <option value="">{placeholder}</option>
          {options.map((o) => (<option key={o} value={o}>{o}</option>))}
        </select>
        <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>

      {options.includes("Other") && value === "Other" && (<input type="text" value={otherDetail} onChange={(e) => setOtherDetail(e.target.value)} placeholder="Please mention what other" aria-label="Please mention what other" className="mt-2 w-full px-3 py-2 bg-blue-50/40 border border-blue-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"/>)}
    </div>);
}
// ─── Radio Group ─────────────────────────────────────────────────────────────
function RadioGroup({ options, value, onChange, name, }) {
    return (<div className="flex flex-wrap gap-2">
      {options.map((opt) => (<label key={opt.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer text-sm transition-all ${value === opt.label
                ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                : "border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-gray-50"}`}>
          <input type="radio" name={name} value={opt.label} checked={value === opt.label} onChange={() => onChange(opt.label)} className="hidden"/>
          <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${value === opt.label ? "border-blue-500" : "border-gray-300"}`}>
            {value === opt.label && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"/>}
          </span>
          {opt.label}
        </label>))}
    </div>);
}
// ─── Form Field ───────────────────────────────────────────────────────────────
function Field({ label, required, children, hint, }) {
    return (<div className="grid grid-cols-[180px_1fr] gap-x-4 gap-y-1 items-start">
      <label className="text-xs font-medium text-gray-500 pt-2.5 select-none">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <div>
        {children}
        {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
      </div>
    </div>);
}
function TextInput({ value, onChange, placeholder, type = "text", }) {
    return (<input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"/>);
}
function TextArea({ value, onChange, placeholder, rows = 4, }) {
    return (<textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"/>);
}
function AttachmentUpload({ files, onChange, storedFiles = [], onStoredChange, }) {
    const inputRef = useRef(null);
    const addFiles = (incoming) => {
        if (!incoming)
            return;
        const next = [...files, ...Array.from(incoming)];
        const unique = next.filter((file, index, list) => list.findIndex((item) => item.name === file.name && item.size === file.size) === index);
        onChange(unique);
    };
    return (<div className="space-y-2">
      <input ref={inputRef} type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.svg,.zip" className="hidden" onChange={(e) => {
            addFiles(e.target.files);
            e.currentTarget.value = "";
        }}/>
      <button type="button" onClick={() => inputRef.current?.click()} className="w-full rounded-lg border-2 border-dashed border-blue-200 bg-blue-50/30 px-4 py-4 text-center transition-colors hover:border-blue-400 hover:bg-blue-50">
        <svg className="mx-auto mb-1.5 h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L8 8m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"/>
        </svg>
        <span className="block text-sm font-medium text-blue-700">Add attachments</span>
        <span className="mt-0.5 block text-xs text-gray-400">PDF, DOCX, images, SVG or ZIP</span>
      </button>

      {(storedFiles.length > 0 || files.length > 0) && (<div className="space-y-1.5">
          {storedFiles.map((file, index) => (<div key={`stored-${file.name}-${file.size}-${index}`} className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2">
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-gray-700">{file.name}</p>
                <p className="text-[11px] text-gray-400">{Math.max(1, Math.round(file.size / 1024))} KB · Previously attached</p>
              </div>
              <button type="button" onClick={() => onStoredChange?.(storedFiles.filter((_, fileIndex) => fileIndex !== index))} className="shrink-0 rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500" aria-label={`Remove ${file.name}`}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>))}
          {files.map((file, index) => (<div key={`${file.name}-${file.size}-${index}`} className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2">
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-gray-700">{file.name}</p>
                <p className="text-[11px] text-gray-400">{Math.max(1, Math.round(file.size / 1024))} KB</p>
              </div>
              <button type="button" onClick={() => onChange(files.filter((_, fileIndex) => fileIndex !== index))} className="shrink-0 rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500" aria-label={`Remove ${file.name}`}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>))}
        </div>)}
    </div>);
}
// ─── Section Card ─────────────────────────────────────────────────────────────
function Section({ title, children, accent, }) {
    return (<div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className={`px-6 py-4 border-b border-gray-100 ${accent || "bg-gray-50/60"}`}>
        <h2 className="text-sm font-semibold text-gray-800 tracking-wide uppercase">{title}</h2>
      </div>
      <div className="px-6 py-5 space-y-4">{children}</div>
    </div>);
}
// ─── Checkbox Toggle ─────────────────────────────────────────────────────────
// ─── CRM Workspace Shell ─────────────────────────────────────────────────────
function LeadsIcon({ className = "h-5 w-5" }) {
    return (<svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7.5A3.5 3.5 0 1115 7.5a3.5 3.5 0 01-7 0zM4.5 20a6.5 6.5 0 0113 0M18 8v6m-3-3h6"/>
    </svg>);
}
function CrmShell({ activeItem = "leads", onNavigate, children, }) {
    return (<SalesNavigation activeItem={activeItem} onNavigate={onNavigate} searchPlaceholder="Search leads, contacts or files">
      {children}
    </SalesNavigation>);
}
// ─── Main Form ────────────────────────────────────────────────────────────────
function AddLeadForm({ leadId, initialLead, onCancel, onSave, onConvert }) {
    const saved = initialLead?.details;
    // Personal
    const [leadCreated] = useState(() => initialLead?.createdAt || new Date().toISOString());
    const contactPerson = saved?.contactPerson ?? "";
    const email = saved?.email ?? "";
    const phone = saved?.phone ?? "";
    const [extraPhones, setExtraPhones] = useState(saved?.extraPhones ?? []);
    const [extraEmails, setExtraEmails] = useState(saved?.extraEmails ?? []);
    const [contactPersons, setContactPersons] = useState(() => {
        if (saved?.contactPersons?.length) {
            return [...saved.contactPersons].sort((a, b) => {
                const rank = { Primary: 0, Secondary: 1, Additional: 2 };
                return rank[a.priority] - rank[b.priority];
            });
        }
        return [{
                id: "contact-1",
                name: saved?.contactPerson ?? "",
                designation: "",
                priority: "Primary",
                coordinationRole: "Primary coordinator",
                email: saved?.email ?? "",
                phone: saved?.phone ?? "",
                preferredContact: saved?.contactWhatsapp ? "WhatsApp" : saved?.contactEmail ? "Email" : saved?.contactCall ? "Call" : "",
            }];
    });
    // Organization
    const [orgName, setOrgName] = useState(initialLead?.companyName ?? "");
    const [website, setWebsite] = useState(saved?.website ?? "");
    const [country, setCountry] = useState(saved?.country ?? "");
    const [address, setAddress] = useState(saved?.address ?? "");
    const [employees, setEmployees] = useState(saved?.employees ?? "");
    const [revenue, setRevenue] = useState(saved?.revenue ?? "");
    const [industry, setIndustry] = useState(saved?.industry ?? "");
    // Contact method
    const contactPriorityRank = {
        Primary: 0,
        Secondary: 1,
        Additional: 2,
    };
    const sortContacts = (contacts) => [...contacts].sort((a, b) => contactPriorityRank[a.priority] - contactPriorityRank[b.priority]);
    const updateContactPerson = (id, field, value) => {
        setContactPersons((current) => sortContacts(current.map((contact) => contact.id === id ? { ...contact, [field]: value } : contact)));
    };
    const updateContactPriority = (id, priority) => {
        setContactPersons((current) => {
            let next = current.map((contact) => ({ ...contact }));
            if (priority === "Primary") {
                next = next.map((contact) => {
                    if (contact.id === id)
                        return { ...contact, priority: "Primary" };
                    if (contact.priority === "Primary")
                        return { ...contact, priority: "Secondary" };
                    return contact;
                });
            }
            else {
                next = next.map((contact) => contact.id === id ? { ...contact, priority } : contact);
                if (!next.some((contact) => contact.priority === "Primary") && next.length > 0) {
                    next[0] = { ...next[0], priority: "Primary" };
                }
            }
            return sortContacts(next);
        });
    };
    const addContactPerson = () => {
        setContactPersons((current) => sortContacts([
            ...current,
            {
                id: `contact-${Date.now()}`,
                name: "",
                designation: "",
                priority: current.length === 0 ? "Primary" : "Additional",
                coordinationRole: "",
                email: "",
                phone: "",
                preferredContact: "",
            },
        ]));
    };
    const removeContactPerson = (id) => {
        setContactPersons((current) => {
            if (current.length <= 1)
                return current;
            let next = current.filter((contact) => contact.id !== id);
            if (!next.some((contact) => contact.priority === "Primary") && next.length > 0) {
                next = next.map((contact, index) => index === 0 ? { ...contact, priority: "Primary" } : contact);
            }
            return sortContacts(next);
        });
    };
    // Social
    const [socialLinks, setSocialLinks] = useState(saved?.socialLinks ?? []);
    // Project Info
    const [sourceChannels, setSourceChannels] = useState(saved?.sourceChannels ?? []);
    const [referralSource, setReferralSource] = useState(saved?.referralSource ?? "");
    const [referralChannelId, setReferralChannelId] = useState(saved?.referralChannelId ?? "");
    const [projectNeeds, setProjectNeeds] = useState(initialLead?.projectNeeds ?? []);
    const [currency, setCurrency] = useState(saved?.currency ?? "Indian Rupee (INR)");
    const [budgetType, setBudgetType] = useState(saved?.budgetType ?? "FIXED");
    const [budgetFixed, setBudgetFixed] = useState(saved?.budgetFixed ?? "");
    const [budgetMin, setBudgetMin] = useState(saved?.budgetMin ?? "");
    const [budgetMax, setBudgetMax] = useState(saved?.budgetMax ?? "");
    const [timelineStart, setTimelineStart] = useState(saved?.timelineStart ?? "");
    const [timelineEnd, setTimelineEnd] = useState(saved?.timelineEnd ?? "");
    // Branding
    const [brandName, setBrandName] = useState(saved?.brandName ?? "");
    const [brandingReq, setBrandingReq] = useState(saved?.brandingReq ?? []);
    const [brandType, setBrandType] = useState(saved?.brandType ?? []);
    const [deliverables, setDeliverables] = useState(saved?.deliverables ?? []);
    const [stylePreference, setStylePreference] = useState(saved?.stylePreference ?? []);
    const [refBrands, setRefBrands] = useState(saved?.refBrands ?? "");
    const [colorPreference, setColorPreference] = useState(saved?.colorPreference ?? "");
    const [targetAudience, setTargetAudience] = useState(saved?.targetAudience ?? "");
    const [brandingDetailedReq, setBrandingDetailedReq] = useState(saved?.brandingDetailedReq ?? "");
    const [brandingAttachments, setBrandingAttachments] = useState([]);
    const [brandingStoredAttachments, setBrandingStoredAttachments] = useState(saved?.brandingAttachments ?? []);
    // Service requirement tabs
    const [activeServiceTab, setActiveServiceTab] = useState("Branding");
    // Website
    const [techPreference, setTechPreference] = useState(saved?.techPreference ?? "");
    const [frontends, setFrontends] = useState(saved?.frontends ?? []);
    const [backends, setBackends] = useState(saved?.backends ?? []);
    const [databases, setDatabases] = useState(saved?.databases ?? []);
    const [cms, setCms] = useState(saved?.cms ?? []);
    const [payments, setPayments] = useState(saved?.payments ?? []);
    const [hosting, setHosting] = useState(saved?.hosting ?? []);
    const [mobileApps, setMobileApps] = useState(saved?.mobileApps ?? []);
    const [techNotes, setTechNotes] = useState(saved?.techNotes ?? "");
    const [detailedReq, setDetailedReq] = useState(saved?.detailedReq ?? "");
    const [websiteAttachments, setWebsiteAttachments] = useState([]);
    const [websiteStoredAttachments, setWebsiteStoredAttachments] = useState(saved?.websiteAttachments ?? []);
    // UX/UI Info
    const [uxProductType, setUxProductType] = useState(saved?.uxProductType ?? "");
    const [uxScope, setUxScope] = useState(saved?.uxScope ?? []);
    const [uxPlatforms, setUxPlatforms] = useState(saved?.uxPlatforms ?? []);
    const [screenCount, setScreenCount] = useState(saved?.screenCount ?? "");
    const [existingAssets, setExistingAssets] = useState(saved?.existingAssets ?? []);
    const [uxStyle, setUxStyle] = useState(saved?.uxStyle ?? []);
    const [uxReferences, setUxReferences] = useState(saved?.uxReferences ?? "");
    const [uxTargetUsers, setUxTargetUsers] = useState(saved?.uxTargetUsers ?? "");
    const [accessibility, setAccessibility] = useState(saved?.accessibility ?? "");
    const [uxNotes, setUxNotes] = useState(saved?.uxNotes ?? "");
    const [uxAttachments, setUxAttachments] = useState([]);
    const [uxStoredAttachments, setUxStoredAttachments] = useState(saved?.uxAttachments ?? []);
    // Design & Technical Support Info
    const [supportType, setSupportType] = useState(saved?.supportType ?? []);
    const [engagementType, setEngagementType] = useState(saved?.engagementType ?? "");
    const [existingPlatform, setExistingPlatform] = useState(saved?.existingPlatform ?? "");
    const [supportPriority, setSupportPriority] = useState(saved?.supportPriority ?? "");
    const [supportHours, setSupportHours] = useState(saved?.supportHours ?? "");
    const [accessAvailable, setAccessAvailable] = useState(saved?.accessAvailable ?? []);
    const [currentIssues, setCurrentIssues] = useState(saved?.currentIssues ?? "");
    const [supportOutcome, setSupportOutcome] = useState(saved?.supportOutcome ?? "");
    const [supportAttachments, setSupportAttachments] = useState([]);
    const [supportStoredAttachments, setSupportStoredAttachments] = useState(saved?.supportAttachments ?? []);
    // Lead ownership
    const [assignedTo, setAssignedTo] = useState(initialLead?.assignedTo ?? "");
    const [priority, setPriority] = useState(initialLead?.label ?? "");
    const [leadStatus, setLeadStatus] = useState(saved?.leadStatus ?? "");
    const [clientCategory, setClientCategory] = useState(initialLead?.category ?? "");
    // Notes tab
    const [activeTab, setActiveTab] = useState("Notes");
    const [notesText, setNotesText] = useState(saved?.notesText ?? "");
    const tabs = ["Notes", "Activity", "Files", "Email"];
    const sourceChannelOptions = ["Web Forms", "Referral", "Instagram", "WhatsApp", "LinkedIn", "Paid Ads", "Manual Entry", "Other"];
    const projectNeedsOptions = ["Branding", "Website", "Strategy", "UX/UI", "Design & Technical Support", "Mobile App", "Digital Marketing", "Other"];
    const frontendOptions = ["HTML/CSS", "React", "Next.js", "Vue.js", "Angular", "Tailwind CSS", "Bootstrap", "Other"];
    const backendOptions = ["Laravel", "Node.js", "Express.js", "Django", "PHP", "WordPress", "Shopify", "Other"];
    const dbOptions = ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Supabase", "Other"];
    const cmsOptions = ["WordPress", "Shopify", "WooCommerce", "Laravel Custom Admin", "Webflow", "Wix", "Other"];
    const paymentOptions = ["Razorpay", "Stripe", "PayPal", "Cashfree", "Other"];
    const hostingOptions = ["Hostinger", "GoDaddy", "AWS", "DigitalOcean", "Vercel", "Netlify", "cPanel", "Other"];
    const mobileOptions = ["Flutter", "React Native", "Native Android", "Native iOS", "Other"];
    const countryOptions = ["India", "USA", "UK", "UAE", "Canada", "Australia", "Germany", "Singapore", "Other"];
    const industryOptions = ["Hospitality", "Technology", "Healthcare", "Finance", "Education", "Retail", "Real Estate", "Manufacturing", "Other"];
    const currencyOptions = ["Indian Rupee (INR)", "US Dollar (USD)", "Euro (EUR)", "British Pound (GBP)", "UAE Dirham (AED)"];
    const employeeOptions = ["1-5", "5-10", "10-50", "50-200", "200-500", "500+"];
    const leadStatusOptions = ["New Lead", "Attempted to Contact", "Contacted", "Not Contacted", "Pre Qualified", "Not Qualified", "Contract in Future", "Junk Lead", "Lost Lead", "Converted"];
    const priorityOptions = ["Hot", "Warm", "Cold"];
    const clientCategoryOptions = ["A+", "B", "C", "D"];
    const priorityDescriptions = {
        Hot: "High budget, serious client, urgent",
        Warm: "Good client, normal budget",
        Cold: "Low budget or unclear requirement",
    };
    const clientCategoryDescriptions = {
        "A+": "High budget, serious, urgent",
        B: "Good client, normal budget",
        C: "Low budget or unclear requirement",
        D: "Low priority / weak lead",
    };
    const brandingReqOptions = ["Logo Design", "Brand Guidelines", "Brand Identity", "Stationery", "Social Media Kit", "Packaging", "Other"];
    const deliverablesOptions = ["Logo Files (AI, SVG, PNG)", "Brand Guidelines PDF", "Social Media Templates", "Business Card", "Letterhead", "Email Signature", "Other"];
    const styleOptions = ["Minimalist", "Bold & Modern", "Classic / Traditional", "Playful / Fun", "Luxury / Premium", "Tech / Futuristic", "Other"];
    const serviceTabs = ["Branding", "Website", "UX/UI", "Design & Technical Support"];
    const uxScopeOptions = ["UX Research", "User Flows", "Information Architecture", "Wireframes", "UI Design", "Design System", "Interactive Prototype", "Usability Testing", "Developer Handoff", "Other"];
    const platformOptions = ["Desktop Web", "Tablet", "Mobile Web", "iOS App", "Android App", "Responsive All Devices"];
    const existingAssetOptions = ["Brand Guidelines", "Existing Wireframes", "User Research", "Final Content", "Existing Product", "Analytics Data", "None"];
    const supportTypeOptions = ["Graphic Design", "UI Design Updates", "Website Maintenance", "Bug Fixes", "Content Updates", "Performance Optimisation", "Hosting / Deployment", "Third-party Integrations", "Security Updates", "Technical Consultation", "Other"];
    const accessOptions = ["Admin Panel", "Hosting / cPanel", "Domain / DNS", "Code Repository", "Analytics", "Design Files", "Not Available Yet"];
    const coordinationRoleOptions = ["Primary coordinator", "Decision maker", "Project coordinator", "Finance / Billing", "Technical contact", "Approver", "Procurement", "Other"];
    const preferredContactOptions = ["Call", "WhatsApp", "Email", "Meeting"];
    const buildLead = () => {
        const now = new Date();
        const sortedContacts = sortContacts(contactPersons);
        const primaryContact = sortedContacts.find((contact) => contact.priority === "Primary") ?? sortedContacts[0];
        const primaryName = primaryContact?.name ?? contactPerson;
        const primaryEmail = primaryContact?.email ?? email;
        const primaryPhone = primaryContact?.phone ?? phone;
        const primaryChannel = primaryContact?.preferredContact ?? "";
        const activityTime = new Intl.DateTimeFormat("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }).format(now);
        return {
            universalId: initialLead?.universalId || leadId,
            companyName: orgName.trim() || primaryName.trim() || "Untitled lead",
            nextActivity: initialLead?.nextActivity || `Today ${activityTime}`,
            projectNeeds,
            label: priority,
            category: clientCategory,
            assignedTo,
            createdAt: initialLead?.createdAt || now.toISOString(),
            archived: initialLead?.archived ?? false,
            details: {
                contactPerson: primaryName,
                contactPersons: sortedContacts,
                email: primaryEmail,
                phone: primaryPhone,
                extraPhones,
                extraEmails,
                website,
                country,
                address,
                employees,
                revenue,
                industry,
                contactCall: primaryChannel === "Call",
                contactWhatsapp: primaryChannel === "WhatsApp",
                contactEmail: primaryChannel === "Email",
                socialLinks,
                sourceChannels,
                referralSource,
                referralChannelId,
                currency,
                budgetType,
                budgetFixed,
                budgetMin,
                budgetMax,
                timelineStart,
                timelineEnd,
                brandName,
                brandingReq,
                brandType,
                deliverables,
                stylePreference,
                refBrands,
                colorPreference,
                targetAudience,
                brandingDetailedReq,
                brandingAttachments: [
                    ...brandingStoredAttachments,
                    ...brandingAttachments.map((file) => ({ name: file.name, size: file.size, type: file.type })),
                ],
                techPreference,
                frontends,
                backends,
                databases,
                cms,
                payments,
                hosting,
                mobileApps,
                techNotes,
                detailedReq,
                websiteAttachments: [
                    ...websiteStoredAttachments,
                    ...websiteAttachments.map((file) => ({ name: file.name, size: file.size, type: file.type })),
                ],
                uxProductType,
                uxScope,
                uxPlatforms,
                screenCount,
                existingAssets,
                uxStyle,
                uxReferences,
                uxTargetUsers,
                accessibility,
                uxNotes,
                uxAttachments: [
                    ...uxStoredAttachments,
                    ...uxAttachments.map((file) => ({ name: file.name, size: file.size, type: file.type })),
                ],
                supportType,
                engagementType,
                existingPlatform,
                supportPriority,
                supportHours,
                accessAvailable,
                currentIssues,
                supportOutcome,
                supportAttachments: [
                    ...supportStoredAttachments,
                    ...supportAttachments.map((file) => ({ name: file.name, size: file.size, type: file.type })),
                ],
                leadStatus,
                notesText,
            },
        };
    };
    const handleSave = () => {
        onSave(buildLead());
    };
    return (<div className="min-h-0 flex-1 overflow-y-auto bg-[#f4f6f9]">
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-3 shadow-sm sm:px-7">
        <h1 className="text-base font-semibold text-gray-900">{initialLead ? "Edit Lead" : "New Lead"}</h1>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onCancel} className="ml-1 flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700" aria-label="Close lead form" title="Close">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-5 px-4 py-6 sm:px-6">

        {/* ── Personal ─────────────────────────────────────────────────── */}
        <Section title="Personal Info">
          <Field label="Universal ID">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-green-600">{leadId}</span>
            </div>
          </Field>
          <Field label="Date Created">
            <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {`${new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(leadCreated))}, ${new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(leadCreated))}`}
                </span>
              </div>
              <svg className="h-4 w-4 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9} aria-label="Date created is locked" role="img">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 10V8a5 5 0 0110 0v2m-11 0h12a1 1 0 011 1v9H5v-9a1 1 0 011-1z"/>
              </svg>
            </div>
          </Field>
          <Field label="Contact Persons" required hint="Add everyone from this organization who may be involved in coordination. Keep one person as Primary.">
            <div className="space-y-3">
              {sortContacts(contactPersons).map((contact, index) => (
                <div key={contact.id} className="rounded-xl border border-gray-200 bg-gray-50/40 p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{contact.name.trim() || `Contact person ${index + 1}`}</p>
                        <p className="text-[11px] text-gray-400">{contact.priority === "Primary" ? "Main coordination contact" : "Supporting coordination contact"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                        contact.priority === "Primary"
                          ? "bg-blue-100 text-blue-700"
                          : contact.priority === "Secondary"
                          ? "bg-violet-100 text-violet-700"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {contact.priority}
                      </span>
                      {contactPersons.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeContactPerson(contact.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                          aria-label={`Remove ${contact.name || `contact ${index + 1}`}`}
                          title="Remove contact"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-gray-500">Full name {contact.priority === "Primary" && <span className="text-red-400">*</span>}</label>
                      <TextInput value={contact.name} onChange={(value) => updateContactPerson(contact.id, "name", value)} placeholder="Full name" />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-gray-500">Designation</label>
                      <TextInput value={contact.designation} onChange={(value) => updateContactPerson(contact.id, "designation", value)} placeholder="e.g. Founder, Marketing Manager" />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-gray-500">Contact priority</label>
                      <Select options={["Primary", "Secondary", "Additional"]} value={contact.priority} onChange={(value) => updateContactPriority(contact.id, value)} placeholder="Select priority" />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-gray-500">Coordination role</label>
                      <Select options={coordinationRoleOptions} value={contact.coordinationRole} onChange={(value) => updateContactPerson(contact.id, "coordinationRole", value)} placeholder="Select role" />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-gray-500">Email</label>
                      <TextInput value={contact.email} onChange={(value) => updateContactPerson(contact.id, "email", value)} placeholder="email@example.com" type="email" />
                    </div>
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-gray-500">Phone</label>
                      <TextInput value={contact.phone} onChange={(value) => updateContactPerson(contact.id, "phone", value)} placeholder="+91 00000 00000" type="tel" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-1 block text-[11px] font-medium text-gray-500">Preferred contact channel</label>
                      <Select options={preferredContactOptions} value={contact.preferredContact} onChange={(value) => updateContactPerson(contact.id, "preferredContact", value)} placeholder="Select preferred channel" />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addContactPerson}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-blue-300 bg-blue-50/40 px-3 py-2.5 text-sm font-medium text-blue-700 transition-colors hover:border-blue-400 hover:bg-blue-50"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                </svg>
                Add contact person
              </button>
            </div>
          </Field>
          <Field label="Social Links">
            <div className="space-y-2">
              {socialLinks.map((sl, i) => (<div key={i} className="flex gap-2">
                  <Select options={["LinkedIn", "Instagram", "Twitter", "Facebook", "YouTube", "Website"]} value={sl.platform} onChange={(v) => { const arr = [...socialLinks]; arr[i].platform = v; setSocialLinks(arr); }} placeholder="Platform"/>
                  <TextInput value={sl.url} onChange={(v) => { const arr = [...socialLinks]; arr[i].url = v; setSocialLinks(arr); }} placeholder="https://..."/>
                  <button onClick={() => setSocialLinks(socialLinks.filter((_, j) => j !== i))} className="text-gray-400 hover:text-red-500 transition-colors text-xs shrink-0">✕</button>
                </div>))}
              <button onClick={() => setSocialLinks([...socialLinks, { platform: "", url: "" }])} className="text-xs text-blue-600 hover:text-blue-700 font-medium">+ Add Social Link</button>
            </div>
          </Field>
        </Section>

        {/* ── Organization ─────────────────────────────────────────────── */}
        <Section title="Organization">
          <Field label="Company Name" required>
            <TextInput value={orgName} onChange={setOrgName} placeholder="Company name"/>
          </Field>
          <Field label="Website">
            <TextInput value={website} onChange={setWebsite} placeholder="www.example.com"/>
          </Field>
          <Field label="Country">
            <Select options={countryOptions} value={country} onChange={setCountry} placeholder="Select country"/>
          </Field>
          <Field label="Address">
            <TextInput value={address} onChange={setAddress} placeholder="Street, City, State"/>
          </Field>
          <Field label="Employees">
            <Select options={employeeOptions} value={employees} onChange={setEmployees} placeholder="Select range"/>
          </Field>
          <Field label="Annual Revenue">
            <TextInput value={revenue} onChange={setRevenue} placeholder="e.g. ₹50,00,000"/>
          </Field>
          <Field label="Industry">
            <Select options={industryOptions} value={industry} onChange={setIndustry} placeholder="Select industry"/>
          </Field>
        </Section>

        {/* ── Project Info ─────────────────────────────────────────────── */}
        <Section title="Project Info">
          <Field label="Source Channel">
            <MultiSelect options={sourceChannelOptions} selected={sourceChannels} onChange={setSourceChannels} placeholder="Select source channels…"/>
          </Field>
          <Field label="Referral Source">
            <TextInput value={referralSource} onChange={setReferralSource} placeholder="e.g. Arjun Mehta"/>
          </Field>
          <Field label="Referral Channel ID">
            <TextInput value={referralChannelId} onChange={setReferralChannelId} placeholder="Channel ID"/>
          </Field>
          <Field label="Project Needs">
            <MultiSelect options={projectNeedsOptions} selected={projectNeeds} onChange={setProjectNeeds} placeholder="Select project needs…"/>
          </Field>
          <Field label="Project Budget">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[minmax(190px,1.15fr)_auto_minmax(230px,1fr)] md:items-center">
              <Select options={currencyOptions} value={currency} onChange={setCurrency} placeholder="Currency"/>

              <div className="inline-flex w-full rounded-lg bg-gray-100 p-1 md:w-auto" aria-label="Budget type">
                {["FIXED", "RANGE"].map((type) => (<button key={type} type="button" onClick={() => setBudgetType(type)} className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-all md:flex-none ${budgetType === type
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-500 hover:bg-white hover:text-blue-700"}`}>
                    {type === "FIXED" ? "Fixed" : "Range"}
                  </button>))}
              </div>

              {budgetType === "FIXED" ? (<TextInput value={budgetFixed} onChange={setBudgetFixed} placeholder="Enter amount" type="number"/>) : (<div className="flex items-center gap-2">
                  <TextInput value={budgetMin} onChange={setBudgetMin} placeholder="Min" type="number"/>
                  <span className="text-gray-400 text-sm">—</span>
                  <TextInput value={budgetMax} onChange={setBudgetMax} placeholder="Max" type="number"/>
                </div>)}
            </div>
          </Field>
          <Field label="Expected Timeline">
            <div className="flex items-center gap-2">
              <input type="date" value={timelineStart} onChange={(e) => setTimelineStart(e.target.value)} className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"/>
              <span className="text-gray-400 text-sm">to</span>
              <input type="date" value={timelineEnd} onChange={(e) => setTimelineEnd(e.target.value)} className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"/>
            </div>
          </Field>
        </Section>

        {/* ── Service-specific requirements ───────────────────────────── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-3 sm:px-6" role="tablist" aria-label="Service requirement sections">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {serviceTabs.map((tab) => (<button key={tab} type="button" role="tab" aria-selected={activeServiceTab === tab} onClick={() => setActiveServiceTab(tab)} className={`relative px-4 py-4 text-sm font-semibold text-center transition-colors ${activeServiceTab === tab
                ? "text-blue-700"
                : "text-gray-400 hover:text-blue-600"}`}>
                  {tab}
                  <span className={`absolute inset-x-0 bottom-[-1px] h-0.5 transition-opacity ${activeServiceTab === tab ? "bg-blue-600 opacity-100" : "opacity-0"}`}/>
                </button>))}
            </div>
          </div>

          <div className="px-6 py-5 space-y-4">
            {activeServiceTab === "Branding" && (<>
                <Field label="Brand Name">
                  <TextInput value={brandName} onChange={setBrandName} placeholder="Brand or product name"/>
                </Field>
                <Field label="Branding Requirement">
                  <MultiSelect options={brandingReqOptions} selected={brandingReq} onChange={setBrandingReq} placeholder="Select requirements…"/>
                </Field>
                <Field label="Type Required">
                  <MultiSelect options={["Logo Only", "Full Brand Identity", "Rebranding", "Brand Refresh", "Logo + Stationery"]} selected={brandType} onChange={setBrandType} placeholder="Select types…"/>
                </Field>
                <Field label="Deliverables">
                  <MultiSelect options={deliverablesOptions} selected={deliverables} onChange={setDeliverables} placeholder="Select deliverables…"/>
                </Field>
                <Field label="Style Preference">
                  <MultiSelect options={styleOptions} selected={stylePreference} onChange={setStylePreference} placeholder="Select styles…"/>
                </Field>
                <Field label="Reference Brands">
                  <TextInput value={refBrands} onChange={setRefBrands} placeholder="e.g. Apple, Airbnb, Notion"/>
                </Field>
                <Field label="Color Preference">
                  <TextInput value={colorPreference} onChange={setColorPreference} placeholder="e.g. Blue & White, Monochrome"/>
                </Field>
                <Field label="Target Audience">
                  <TextInput value={targetAudience} onChange={setTargetAudience} placeholder="Describe the target audience"/>
                </Field>
                <Field label="Detailed Requirements">
                  <TextArea value={brandingDetailedReq} onChange={setBrandingDetailedReq} placeholder="Describe the branding goals, required applications, references, and expectations in detail…" rows={4}/>
                </Field>
                <Field label="Attachments">
                  <AttachmentUpload files={brandingAttachments} onChange={setBrandingAttachments} storedFiles={brandingStoredAttachments} onStoredChange={setBrandingStoredAttachments}/>
                </Field>
              </>)}

            {activeServiceTab === "Website" && (<>
                <Field label="Tech Stack Preference">
                  <RadioGroup name="techPref" options={[
                { label: "No preference" },
                { label: "Need recommendation" },
                { label: "Client has preferred stack" },
                { label: "Existing website / app" },
            ]} value={techPreference} onChange={setTechPreference}/>
                </Field>
                <Field label="Frontend">
                  <MultiSelect options={frontendOptions} selected={frontends} onChange={setFrontends} placeholder="Select frontend technologies…"/>
                </Field>
                <Field label="Backend">
                  <MultiSelect options={backendOptions} selected={backends} onChange={setBackends} placeholder="Select backend technologies…"/>
                </Field>
                <Field label="Database">
                  <MultiSelect options={dbOptions} selected={databases} onChange={setDatabases} placeholder="Select databases…"/>
                </Field>
                <Field label="CMS">
                  <MultiSelect options={cmsOptions} selected={cms} onChange={setCms} placeholder="Select CMS…"/>
                </Field>
                <Field label="Payment Method">
                  <MultiSelect options={paymentOptions} selected={payments} onChange={setPayments} placeholder="Select payment gateways…"/>
                </Field>
                <Field label="Hosting / Deployment">
                  <MultiSelect options={hostingOptions} selected={hosting} onChange={setHosting} placeholder="Select hosting options…"/>
                </Field>
                <Field label="Mobile App">
                  <MultiSelect options={mobileOptions} selected={mobileApps} onChange={setMobileApps} placeholder="Select mobile frameworks…"/>
                </Field>
                <Field label="Tech Notes" hint="e.g. Existing website is on WordPress, wants redesign in Shopify.">
                  <TextArea value={techNotes} onChange={setTechNotes} placeholder="Describe the existing stack or any technical notes…" rows={3}/>
                </Field>
                <Field label="Detailed Requirements">
                  <TextArea value={detailedReq} onChange={setDetailedReq} placeholder="Describe the project requirements in detail…" rows={4}/>
                </Field>
                <Field label="Attachments">
                  <AttachmentUpload files={websiteAttachments} onChange={setWebsiteAttachments} storedFiles={websiteStoredAttachments} onStoredChange={setWebsiteStoredAttachments}/>
                </Field>
              </>)}

            {activeServiceTab === "UX/UI" && (<>
                <Field label="Product Type">
                  <Select options={["Website", "Mobile App", "SaaS / Dashboard", "E-commerce", "Landing Page", "Internal Tool", "Other"]} value={uxProductType} onChange={setUxProductType} placeholder="Select product type"/>
                </Field>
                <Field label="UX/UI Scope">
                  <MultiSelect options={uxScopeOptions} selected={uxScope} onChange={setUxScope} placeholder="Select required UX/UI services…"/>
                </Field>
                <Field label="Platforms">
                  <MultiSelect options={platformOptions} selected={uxPlatforms} onChange={setUxPlatforms} placeholder="Select target platforms…"/>
                </Field>
                <Field label="Screens / Pages">
                  <TextInput value={screenCount} onChange={setScreenCount} placeholder="e.g. 15–20 screens or 8 pages"/>
                </Field>
                <Field label="Existing Assets">
                  <MultiSelect options={existingAssetOptions} selected={existingAssets} onChange={setExistingAssets} placeholder="Select available inputs…"/>
                </Field>
                <Field label="Design Style">
                  <MultiSelect options={styleOptions} selected={uxStyle} onChange={setUxStyle} placeholder="Select preferred styles…"/>
                </Field>
                <Field label="Reference Products">
                  <TextInput value={uxReferences} onChange={setUxReferences} placeholder="e.g. Notion, Linear, Airbnb"/>
                </Field>
                <Field label="Target Users">
                  <TextInput value={uxTargetUsers} onChange={setUxTargetUsers} placeholder="Who will use this product?"/>
                </Field>
                <Field label="Accessibility">
                  <Select options={["Standard usability", "WCAG AA preferred", "WCAG AAA preferred", "Need recommendation"]} value={accessibility} onChange={setAccessibility} placeholder="Select accessibility level"/>
                </Field>
                <Field label="UX/UI Notes">
                  <TextArea value={uxNotes} onChange={setUxNotes} placeholder="Add user problems, key flows, competitors, or design expectations…" rows={4}/>
                </Field>
                <Field label="Attachments">
                  <AttachmentUpload files={uxAttachments} onChange={setUxAttachments} storedFiles={uxStoredAttachments} onStoredChange={setUxStoredAttachments}/>
                </Field>
              </>)}

            {activeServiceTab === "Design & Technical Support" && (<>
                <Field label="Support Required">
                  <MultiSelect options={supportTypeOptions} selected={supportType} onChange={setSupportType} placeholder="Select support services…"/>
                </Field>
                <Field label="Engagement Type">
                  <RadioGroup name="engagementType" options={[{ label: "One-time" }, { label: "Monthly retainer" }, { label: "On-demand" }]} value={engagementType} onChange={setEngagementType}/>
                </Field>
                <Field label="Existing Platform">
                  <TextInput value={existingPlatform} onChange={setExistingPlatform} placeholder="e.g. Laravel website, Shopify store, mobile app"/>
                </Field>
                <Field label="Support Priority">
                  <Select options={["Low — planned improvement", "Normal — regular support", "High — blocking work", "Critical — service unavailable"]} value={supportPriority} onChange={setSupportPriority} placeholder="Select priority"/>
                </Field>
                <Field label="Estimated Hours">
                  <TextInput value={supportHours} onChange={setSupportHours} placeholder="e.g. 20 hours / month"/>
                </Field>
                <Field label="Access Available">
                  <MultiSelect options={accessOptions} selected={accessAvailable} onChange={setAccessAvailable} placeholder="Select available access…"/>
                </Field>
                <Field label="Current Issues">
                  <TextArea value={currentIssues} onChange={setCurrentIssues} placeholder="Describe design requests, bugs, maintenance needs, or technical blockers…" rows={4}/>
                </Field>
                <Field label="Expected Outcome">
                  <TextArea value={supportOutcome} onChange={setSupportOutcome} placeholder="What should be completed or improved?" rows={3}/>
                </Field>
                <Field label="Attachments">
                  <AttachmentUpload files={supportAttachments} onChange={setSupportAttachments} storedFiles={supportStoredAttachments} onStoredChange={setSupportStoredAttachments}/>
                </Field>
              </>)}
          </div>
        </div>

        {/* ── Lead ownership and qualification ───────────────────────────── */}
        <Section title="Lead Ownership & Qualification">
          <Field label="Assigned To" required>
            <Select options={["Jacob James", "Arjun Mehta", "Priya Sharma", "Rahul Gupta", "Sara Thomas"]} value={assignedTo} onChange={setAssignedTo} placeholder="Select team member"/>
          </Field>
          <Field label="Priority">
            <Select options={priorityOptions} value={priority} onChange={setPriority} placeholder="Select priority"/>
            {priority && <p className="mt-1 text-xs text-gray-400">{priorityDescriptions[priority]}</p>}
          </Field>
          <Field label="Lead Status">
            <Select options={leadStatusOptions} value={leadStatus} onChange={setLeadStatus} placeholder="Select lead status"/>
          </Field>
          <Field label="Client Category">
            <Select options={clientCategoryOptions} value={clientCategory} onChange={setClientCategory} placeholder="Select client category"/>
            {clientCategory && <p className="mt-1 text-xs text-gray-400">{clientCategoryDescriptions[clientCategory]}</p>}
          </Field>
        </Section>

        {/* ── Notes / Activity / Files / Email ─────────────────────────── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="border-b border-gray-100">
            <div className="flex">
              {tabs.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                  {tab}
                </button>))}
            </div>
          </div>
          <div className="px-6 py-5">
            {activeTab === "Notes" && (<div className="space-y-3">
                <p className="text-xs text-gray-500">Add meeting notes, internal notes, client expectations, objections, or any additional comments.</p>
                <TextArea value={notesText} onChange={setNotesText} placeholder="Start typing your notes…" rows={6}/>
                <div className="flex flex-wrap gap-2">
                  {["Meeting Discussion Summary", "Internal Notes", "Client Expectations", "Objections / Concerns", "Reason if Not Qualified", "Future Contact Date", "Additional Comments"].map((tag) => (<button key={tag} type="button" onClick={() => setNotesText((prev) => prev + (prev ? "\n\n" : "") + `${tag}:\n`)} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors">
                      {tag}
                    </button>))}
                </div>
              </div>)}
            {activeTab === "Activity" && (<div className="text-sm text-gray-400 py-8 text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m5-8A9 9 0 113 12a9 9 0 0118 0z"/>
                </svg>
                No activities yet. Activities will appear here after saving.
              </div>)}
            {activeTab === "Files" && (<div>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-blue-300 transition-colors cursor-pointer">
                  <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                  </svg>
                  <p className="text-sm text-gray-500 font-medium">Drop files here or click to upload</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG, DOCX up to 20MB</p>
                </div>
              </div>)}
            {activeTab === "Email" && (<div className="text-sm text-gray-400 py-8 text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                No emails yet. Emails will appear here after connecting your inbox.
              </div>)}
          </div>
        </div>

        {/* ── Visibility ────────────────────────────────────────────────── */}
        <Section title="Visibility">
          <Field label="Access">
            <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50/50 px-4 py-3" aria-disabled="true">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 10V7a5 5 0 0110 0v3m-11 0h12a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2z"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-800">Lead Owner &amp; Management</p>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-700">Locked</span>
                </div>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  This lead is visible to the assigned owner, administrators, and sales managers. Access is controlled automatically by role permissions.
                </p>
              </div>
            </div>
          </Field>
        </Section>

        {/* ── Action Buttons ────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-4">
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-500 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
              Cancel
            </button>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => onConvert(buildLead())} className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors shadow-sm">
                Convert to Deal
              </button>
              <button type="button" onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm">
                Save
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>);
}
const defaultColumnOrder = [
    "companyName",
    "nextActivity",
    "projectNeeds",
    "label",
    "category",
    "assignedTo",
];
const columnLabels = {
    companyName: "Company Name",
    nextActivity: "Next Activity",
    projectNeeds: "Project Needs",
    label: "Lead Status",
    category: "Category",
    assignedTo: "Assigned to",
};
const defaultColumnWidths = {
    companyName: 340,
    nextActivity: 320,
    projectNeeds: 314,
    label: 186,
    category: 244,
    assignedTo: 280,
};
function getInitialLeads() {
    if (typeof window === "undefined")
        return [];
    try {
        const stored = window.localStorage.getItem("volymoly-leads-fullview-v2");
        const parsed = stored ? JSON.parse(stored) : [];
        if (!Array.isArray(parsed))
            return [];
        return parsed.map((lead, index) => ({
            id: lead.id || `${Date.now()}-${index}`,
            universalId: lead.universalId || `VL-${new Date().getFullYear()}-${String(index + 1).padStart(4, "0")}`,
            companyName: lead.companyName || "Untitled lead",
            nextActivity: lead.nextActivity || "—",
            projectNeeds: Array.isArray(lead.projectNeeds) ? lead.projectNeeds : [],
            label: lead.label || "",
            category: lead.category || "",
            assignedTo: lead.assignedTo || "",
            createdAt: lead.createdAt || new Date().toISOString(),
            archived: Boolean(lead.archived),
            details: lead.details && typeof lead.details === "object" ? lead.details : {},
        }));
    }
    catch {
        return [];
    }
}
function getInitialColumnOrder() {
    if (typeof window === "undefined")
        return defaultColumnOrder;
    try {
        const stored = window.localStorage.getItem("volymoly-lead-columns-fullview-v2");
        const parsed = stored ? JSON.parse(stored) : null;
        if (Array.isArray(parsed) &&
            parsed.length === defaultColumnOrder.length &&
            defaultColumnOrder.every((column) => parsed.includes(column))) {
            return parsed;
        }
    }
    catch {
        // Use the default order when stored preferences cannot be read.
    }
    return defaultColumnOrder;
}
function getInitialColumnWidths() {
    if (typeof window === "undefined")
        return defaultColumnWidths;
    try {
        const stored = window.localStorage.getItem("volymoly-lead-column-widths-fullview-v1");
        const parsed = stored ? JSON.parse(stored) : null;
        if (parsed && defaultColumnOrder.every((column) => Number.isFinite(parsed[column])))
            return { ...defaultColumnWidths, ...parsed };
    }
    catch {
        // Use the default widths when stored preferences cannot be read.
    }
    return defaultColumnWidths;
}
function LeadFormModal({ children, onClose }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape")
                onClose();
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);
    return (<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-3 backdrop-blur-[1px] sm:p-5" onMouseDown={onClose} role="dialog" aria-modal="true" aria-label="Lead form">
      <div className="flex h-[calc(100vh-24px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/60 bg-white shadow-2xl sm:h-[calc(100vh-40px)]" onMouseDown={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>);
}
function SelectionCheckbox({ checked, indeterminate = false, onChange, label, }) {
    const checkboxRef = useRef(null);
    useEffect(() => {
        if (checkboxRef.current)
            checkboxRef.current.indeterminate = indeterminate;
    }, [indeterminate]);
    return (<input ref={checkboxRef} type="checkbox" checked={checked} onChange={onChange} aria-label={label} className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-blue-600"/>);
}
function LeadsPage({ leads, onAddLead, onOpenLead, onBulkArchive, onBulkRestore, }) {
    const [columnOrder, setColumnOrder] = useState(defaultColumnOrder);
    const [columnsHydrated, setColumnsHydrated] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState(defaultColumnOrder);
    const [columnWidths, setColumnWidths] = useState(defaultColumnWidths);
    const [draggedColumn, setDraggedColumn] = useState(null);
    const [mailbox, setMailbox] = useState("inbox");
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    useEffect(() => {
        // Load browser-only preferences after the server and client have hydrated the same markup.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setColumnOrder(getInitialColumnOrder());
        setColumnWidths(getInitialColumnWidths());
        setColumnsHydrated(true);
    }, []);
    useEffect(() => {
        if (!columnsHydrated)
            return;
        window.localStorage.setItem("volymoly-lead-columns-fullview-v2", JSON.stringify(columnOrder));
    }, [columnOrder, columnsHydrated]);
    useEffect(() => {
        if (!columnsHydrated)
            return;
        window.localStorage.setItem("volymoly-lead-column-widths-fullview-v1", JSON.stringify(columnWidths));
    }, [columnWidths, columnsHydrated]);
    useEffect(() => {
        const closeMenus = () => setSettingsOpen(false);
        window.addEventListener("click", closeMenus);
        return () => window.removeEventListener("click", closeMenus);
    }, []);
    const visibleLeads = leads.filter((lead) => mailbox === "archive" ? Boolean(lead.archived) : !lead.archived);
    const visibleLeadIds = visibleLeads.map((lead) => lead.id);
    const allVisibleSelected = visibleLeads.length > 0 && visibleLeadIds.every((id) => selectedIds.includes(id));
    const someVisibleSelected = visibleLeadIds.some((id) => selectedIds.includes(id)) && !allVisibleSelected;
    useEffect(() => {
        // Selection is scoped to the currently visible mailbox rows.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedIds((current) => current.filter((id) => visibleLeadIds.includes(id)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mailbox, leads]);
    const changeMailbox = (nextMailbox) => {
        setMailbox(nextMailbox);
        setSelectedIds([]);
        setSettingsOpen(false);
    };
    const toggleLeadSelection = (leadId) => {
        setSelectedIds((current) => current.includes(leadId) ? current.filter((id) => id !== leadId) : [...current, leadId]);
    };
    const toggleAllVisible = () => {
        setSelectedIds(allVisibleSelected ? [] : visibleLeadIds);
    };
    const archiveSelected = () => {
        if (selectedIds.length === 0)
            return;
        if (mailbox === "archive")
            onBulkRestore(selectedIds);
        else
            onBulkArchive(selectedIds);
        setSelectedIds([]);
    };
    const moveColumn = (source, target) => {
        if (source === target)
            return;
        setColumnOrder((current) => {
            const next = [...current];
            const sourceIndex = next.indexOf(source);
            const targetIndex = next.indexOf(target);
            next.splice(sourceIndex, 1);
            next.splice(targetIndex, 0, source);
            return next;
        });
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
    const renderCell = (lead, column) => {
        if (column === "companyName") {
            return <span className="font-medium text-gray-900">{lead.companyName}</span>;
        }
        if (column === "projectNeeds") {
            if (lead.projectNeeds.length === 0)
                return <span className="text-gray-400">—</span>;
            return (<div className="flex flex-wrap gap-1.5">
          {lead.projectNeeds.slice(0, 2).map((need) => (<span key={need} className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
              {need}
            </span>))}
          {lead.projectNeeds.length > 2 && (<span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
              +{lead.projectNeeds.length - 2}
            </span>)}
        </div>);
        }
        if (column === "label") {
            if (!lead.label)
                return <span className="text-gray-400">—</span>;
            const className = lead.label === "Hot"
                ? "bg-red-50 text-red-700 border-red-100"
                : lead.label === "Warm"
                    ? "bg-amber-50 text-amber-700 border-amber-100"
                    : "bg-blue-50 text-blue-700 border-blue-100";
            return <span className={`inline-flex rounded border px-2 py-0.5 text-xs font-semibold ${className}`}>{lead.label}</span>;
        }
        if (column === "category") {
            return lead.category ? (<span className="inline-flex min-w-8 justify-center rounded bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
          {lead.category}
        </span>) : (<span className="text-gray-400">—</span>);
        }
        if (column === "assignedTo") {
            if (!lead.assignedTo)
                return <span className="text-gray-400">Unassigned</span>;
            const initials = lead.assignedTo
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
            return (<div className="flex items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[9px] font-bold text-blue-700">
            {initials}
          </span>
          <span className="font-medium text-gray-700">{lead.assignedTo}</span>
        </div>);
        }
        return <span className="text-gray-600">{lead.nextActivity || "—"}</span>;
    };
    return (<div className="flex min-h-0 flex-1 flex-col bg-white">
      <div className="flex min-h-12 shrink-0 items-center justify-between gap-3 border-b border-gray-200 bg-white px-3 py-2 sm:px-4">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          <button type="button" onClick={() => changeMailbox("inbox")} title="Inbox" aria-label="Inbox" className={`flex h-9 w-9 items-center justify-center rounded-md border transition-colors ${mailbox === "inbox"
            ? "border-blue-200 bg-blue-50 text-blue-700"
            : "border-gray-200 bg-white text-gray-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"}`}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 13.5h4l2 3h4l2-3h4M5.5 5h13L21 13.5V19a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19v-5.5L5.5 5z"/>
            </svg>
          </button>
          <button type="button" onClick={() => changeMailbox("archive")} title="Archive" aria-label="Archive" className={`flex h-9 w-9 items-center justify-center rounded-md border transition-colors ${mailbox === "archive"
            ? "border-blue-200 bg-blue-50 text-blue-700"
            : "border-gray-200 bg-white text-gray-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"}`}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M5 7l1 13h12l1-13M3.5 3.5h17v3.5h-17zM9 11h6"/>
            </svg>
          </button>

          {selectedIds.length > 0 && (<>
              <span className="mx-1 h-5 w-px bg-gray-200" aria-hidden="true"/>
              <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                {selectedIds.length} selected
              </span>
              <button type="button" onClick={archiveSelected} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 text-xs font-semibold text-gray-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700" title={mailbox === "archive" ? "Restore selected leads" : "Archive selected leads"}>
                {mailbox === "archive" ? (<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M5.5 15a7 7 0 101.6-8"/>
                  </svg>) : (<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M5 7l1 13h12l1-13M3.5 3.5h17v3.5h-17zM9 11h6"/>
                  </svg>)}
                <span className="hidden sm:inline">{mailbox === "archive" ? "Restore" : "Archive"}</span>
              </button>
              <button type="button" disabled aria-disabled="true" className="inline-flex h-8 cursor-not-allowed items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-2.5 text-xs font-semibold text-gray-400" title="Delete is locked">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V4h6v3m-9 0 1 13h10l1-13M10 11v5m4-5v5"/>
                </svg>
                <span className="hidden sm:inline">Delete</span>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 10V8a5 5 0 0110 0v2m-11 0h12a1 1 0 011 1v9H5v-9a1 1 0 011-1z"/>
                </svg>
              </button>
            </>)}
        </div>

        <button type="button" onClick={onAddLead} className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14"/>
          </svg>
          Lead
        </button>
      </div>

      <div data-sales-menu-keep-open className="relative min-h-0 flex-1 overflow-auto bg-white">
        <table className="min-w-full table-fixed border-collapse text-left" style={{ width: columnOrder.filter((column) => visibleColumns.includes(column)).reduce((total, column) => total + columnWidths[column], 92) }}>
          <colgroup>
            <col style={{ width: 44 }}/>
            {columnOrder.filter((column) => visibleColumns.includes(column)).map((column) => (<col key={column} style={{ width: columnWidths[column] }}/>))}
            <col style={{ width: 48 }}/>
          </colgroup>
          <thead className="sticky top-0 z-20 bg-[#f8faff] shadow-[0_1px_0_#e5e7eb]">
            <tr>
              <th className="h-10 w-11 border-r border-gray-200 px-3 text-center">
                <SelectionCheckbox checked={allVisibleSelected} indeterminate={someVisibleSelected} onChange={toggleAllVisible} label="Select all visible leads"/>
              </th>
              {columnOrder.filter((column) => visibleColumns.includes(column)).map((column) => (<th key={column} draggable onDragStart={() => setDraggedColumn(column)} onDragEnd={() => setDraggedColumn(null)} onDragOver={(event) => event.preventDefault()} onDrop={() => {
                if (draggedColumn)
                    moveColumn(draggedColumn, column);
                setDraggedColumn(null);
            }} className={`relative h-10 cursor-grab select-none border-r border-gray-200 px-3 text-xs font-semibold text-gray-600 transition-colors active:cursor-grabbing ${draggedColumn === column ? "bg-blue-50 text-blue-700" : "hover:bg-blue-50/70"}`} title="Drag to reorder this column">
                  <span className="inline-flex items-center gap-1.5">
                    {columnLabels[column]}
                    <svg className="h-3 w-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <circle cx="6" cy="6" r="1.2"/>
                      <circle cx="14" cy="6" r="1.2"/>
                      <circle cx="6" cy="14" r="1.2"/>
                      <circle cx="14" cy="14" r="1.2"/>
                    </svg>
                  </span>
                  <span role="separator" aria-orientation="vertical" aria-label={`Resize ${columnLabels[column]} column`} onPointerDown={(event) => startColumnResize(event, column)} onDragStart={(event) => { event.preventDefault(); event.stopPropagation(); }} className="absolute -right-1 top-0 z-30 h-full w-2 cursor-col-resize touch-none hover:bg-blue-400/60" title="Drag to resize column"/>
                </th>))}
              <th className="relative h-10 w-12 border-l border-gray-200 px-1 text-center">
                <button type="button" onClick={(event) => {
            event.stopPropagation();
            setSettingsOpen((current) => !current);
        }} className="mx-auto flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-700" title="Table settings" aria-label="Table settings">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.9}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.7 1.7 0 00.34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 00-1.88-.34 1.7 1.7 0 00-1.03 1.56V20.3h-3v-.08a1.7 1.7 0 00-1.03-1.56 1.7 1.7 0 00-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 007.02 15a1.7 1.7 0 00-1.56-1.03H5.4v-3h.06A1.7 1.7 0 007.02 9.94a1.7 1.7 0 00-.34-1.88L6.62 8l2.12-2.12.06.06a1.7 1.7 0 001.88.34 1.7 1.7 0 001.03-1.56V4.7h3v.02a1.7 1.7 0 001.03 1.56 1.7 1.7 0 001.88-.34l.06-.06L19.8 8l-.06.06a1.7 1.7 0 00-.34 1.88 1.7 1.7 0 001.56 1.03h.04v3h-.04A1.7 1.7 0 0019.4 15z"/>
                  </svg>
                </button>
                {settingsOpen && (<div onClick={(event) => event.stopPropagation()} className="absolute right-2 top-9 z-40 w-48 rounded-lg border border-gray-200 bg-white p-1.5 text-left shadow-xl">
                    <p className="px-2.5 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">Visible columns</p>
                    <div className="space-y-0.5">
                      {columnOrder.map((column) => {
                const checked = visibleColumns.includes(column);
                return (<button key={column} type="button" onClick={() => {
                        setVisibleColumns((current) => checked
                            ? current.length > 1
                                ? current.filter((item) => item !== column)
                                : current
                            : [...current, column]);
                    }} className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700">
                            <span className={`flex h-3.5 w-3.5 items-center justify-center rounded border ${checked ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 bg-white"}`}>
                              {checked && (<svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.4}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l2.5 2.5L10 3"/>
                                </svg>)}
                            </span>
                            {columnLabels[column]}
                          </button>);
            })}
                    </div>
                    <div className="my-1.5 border-t border-gray-100"/>
                    <button type="button" onClick={() => {
                setColumnOrder(defaultColumnOrder);
                setVisibleColumns(defaultColumnOrder);
                setColumnWidths(defaultColumnWidths);
                setSettingsOpen(false);
            }} className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M5.5 15a7 7 0 0011.4 2M18.5 9A7 7 0 007.1 7"/>
                      </svg>
                      Reset columns
                    </button>
                  </div>)}
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleLeads.map((lead) => {
            const selected = selectedIds.includes(lead.id);
            return (<tr key={lead.id} onClick={() => onOpenLead(lead)} onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ")
                        onOpenLead(lead);
                }} tabIndex={0} className={`h-11 cursor-pointer border-b border-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-300 ${selected ? "bg-blue-50/70" : "bg-white hover:bg-blue-50/30"}`} aria-label={`Open ${lead.companyName} lead details`}>
                  <td className="w-11 border-r border-gray-200 px-3 text-center align-middle" onClick={(event) => event.stopPropagation()}>
                    <SelectionCheckbox checked={selected} onChange={() => toggleLeadSelection(lead.id)} label={`Select ${lead.companyName}`}/>
                  </td>
                  {columnOrder.filter((column) => visibleColumns.includes(column)).map((column) => (<td key={column} className="border-r border-gray-200 px-3 py-2 text-sm align-middle">
                      {renderCell(lead, column)}
                    </td>))}
                  <td className="w-12 border-l border-gray-200 px-1 py-1 text-center align-middle">
                    <button type="button" onClick={(event) => {
                    event.stopPropagation();
                    onOpenLead(lead);
                }} className="mx-auto flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-700" title="Open lead detail" aria-label={`Open ${lead.companyName} lead detail`}>
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <circle cx="4" cy="10" r="1.5"/>
                        <circle cx="10" cy="10" r="1.5"/>
                        <circle cx="16" cy="10" r="1.5"/>
                      </svg>
                    </button>
                  </td>
                </tr>);
        })}
          </tbody>
        </table>

        {visibleLeads.length === 0 && (<section className="absolute inset-x-0 bottom-0 top-10 flex items-center justify-center bg-white px-6 text-center">
            <div className="max-w-md -translate-y-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {mailbox === "inbox" ? (<LeadsIcon className="h-6 w-6"/>) : (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M5 7l1 13h12l1-13M3.5 3.5h17v3.5h-17zM9 11h6"/>
                  </svg>)}
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                {mailbox === "inbox" ? "Add your first lead" : "No archived leads"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {mailbox === "inbox"
                ? "Organize and qualify incoming opportunities here – then convert the right ones into deals."
                : "Leads you archive will be stored here and can be restored at any time."}
              </p>
              {mailbox === "inbox" && (<button type="button" onClick={onAddLead} className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14"/>
                  </svg>
                  Add lead
                </button>)}
            </div>
          </section>)}
      </div>
    </div>);
}
const placeholderContent = {
    activities: { title: "Activities", description: "Plan calls, meetings, follow-ups and tasks across your sales pipeline.", accent: "bg-violet-50 text-violet-600" },
    people: { title: "People", description: "Keep every customer contact and conversation in one organized workspace.", accent: "bg-sky-50 text-sky-600" },
    organizations: { title: "Organizations", description: "Manage companies, accounts and the people connected to each one.", accent: "bg-emerald-50 text-emerald-600" },
    merge: { title: "Merge Duplicates", description: "Review matching records and keep your sales data accurate and clean.", accent: "bg-amber-50 text-amber-600" },
    insights: { title: "Insights", description: "Track pipeline performance, conversion and the activity driving revenue.", accent: "bg-blue-50 text-blue-600" },
};
function SalesPlaceholder({ moduleId }) {
    const content = placeholderContent[moduleId] ?? placeholderContent.people;
    return (<main className="min-h-0 flex-1 overflow-auto bg-[#f5f7fb] p-5 lg:p-7">
      <section className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-14 text-center">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${content.accent}`}>
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 19V9m5 10V5m5 14v-7m5 7V3"/></svg>
          </div>
          <h1 className="mt-5 text-xl font-bold text-slate-900">{content.title}</h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{content.description}</p>
          <span className="mt-5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Sales workspace</span>
        </div>
      </section>
    </main>);
}
function LeadDetailPage({ lead, onBack, onArchive, onNavigateSales, }) {
    return <LeadDetail sourceLead={lead} onBack={onBack} onArchive={onArchive} onNavigateSales={onNavigateSales}/>;
}
export default function App() {
    const [view, setView] = useState("list");
    const [leads, setLeads] = useState([]);
    const [storageHydrated, setStorageHydrated] = useState(false);
    const [editingLead, setEditingLead] = useState(null);
    const [detailLead, setDetailLead] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    useEffect(() => {
        // localStorage does not exist during the server render, so restore it after hydration.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLeads(getInitialLeads());
        setStorageHydrated(true);
    }, []);
    useEffect(() => {
        if (!storageHydrated)
            return;
        window.localStorage.setItem("volymoly-leads-fullview-v2", JSON.stringify(leads));
    }, [leads, storageHydrated]);
    const nextSequence = leads.length + 1;
    const newLeadId = `VL-${new Date().getFullYear()}-${String(nextSequence).padStart(4, "0")}`;
    const currentLeadId = editingLead?.universalId || newLeadId;
    const closeForm = () => {
        setEditingLead(null);
        setFormOpen(false);
    };
    const addLead = (lead) => {
        const id = typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        setLeads((current) => [{ ...lead, id }, ...current]);
        closeForm();
        setView("list");
    };
    const updateLead = (lead) => {
        if (!editingLead) {
            addLead(lead);
            return;
        }
        setLeads((current) => current.map((item) => item.id === editingLead.id ? { ...lead, id: item.id } : item));
        closeForm();
        setView("list");
    };
    const saveLead = (lead) => {
        if (editingLead)
            updateLead(lead);
        else
            addLead(lead);
    };
    const openNewLead = () => {
        setEditingLead(null);
        setFormOpen(true);
    };
    const openLeadDetail = (lead) => {
        setDetailLead(lead);
        setView("detail");
    };
    const setArchivedForLeads = (leadIds, archived) => {
        const selected = new Set(leadIds);
        setLeads((current) => current.map((lead) => selected.has(lead.id) ? { ...lead, archived } : lead));
    };
    const navigateSales = (destination) => {
        setDetailLead(null);
        setEditingLead(null);
        setFormOpen(false);
        setView(destination === "leads" ? "list" : destination);
    };
    const returnToList = () => navigateSales("leads");
    if (view === "deals") {
        return <DealsWorkspace onNavigateSales={navigateSales}/>;
    }
    if (view === "people") {
        return <PeopleWorkspace onNavigateSales={navigateSales}/>;
    }
    if (view === "organizations") {
        return <OrganizationsWorkspace onNavigateSales={navigateSales}/>;
    }
    if (view === "detail" && detailLead) {
        return (<LeadDetailPage lead={detailLead} onBack={returnToList} onArchive={(leadId) => setArchivedForLeads([leadId], true)} onNavigateSales={navigateSales}/>);
    }
    if (placeholderContent[view]) {
        return (<CrmShell activeItem={view} onNavigate={navigateSales}>
          <SalesPlaceholder moduleId={view}/>
        </CrmShell>);
    }
    return (<CrmShell activeItem="leads" onNavigate={navigateSales}>
      <LeadsPage leads={leads} onAddLead={openNewLead} onOpenLead={openLeadDetail} onBulkArchive={(leadIds) => setArchivedForLeads(leadIds, true)} onBulkRestore={(leadIds) => setArchivedForLeads(leadIds, false)}/>

      {formOpen && (<LeadFormModal onClose={closeForm}>
          <AddLeadForm key={editingLead?.id || currentLeadId} leadId={currentLeadId} initialLead={editingLead ?? undefined} onCancel={closeForm} onSave={saveLead} onConvert={(lead) => {
                saveLead(lead);
                window.setTimeout(() => window.alert("Lead converted to a deal."), 0);
            }}/>
        </LeadFormModal>)}
    </CrmShell>);
}
