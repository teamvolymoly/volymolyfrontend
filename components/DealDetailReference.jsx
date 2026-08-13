"use client";

import { useMemo, useRef, useState } from 'react';
import './DealDetailReference.css';
import ActivitySchedulerModal from './ActivitySchedulerModal';

/* The imported reference keeps formatter helpers local to their workspaces. */
/* eslint-disable react-hooks/exhaustive-deps */

const stages = [
  'New Inquiry',
  'Initial Consultation',
  'Proposal Sent',
  'Follow-up Call',
  'Negotiation',
];

const stageDays = {
  'New Inquiry': 0,
  'Initial Consultation': 2,
  'Proposal Sent': 0,
  'Follow-up Call': 0,
  Negotiation: 0,
};

const projectServiceOptions = [
  'Branding',
  'Website',
  'UX/UI',
  'Design & Technical Support',
  'Digital Marketing',
];

const serviceTone = {
  Branding: 'purple',
  Website: 'blue',
  'UX/UI': 'teal',
  'Design & Technical Support': 'amber',
  'Digital Marketing': 'green',
};


const suggestedProductsByService = {
  Branding: [
    { name: 'Brand Strategy & Positioning', unitPrice: 45000, billingType: 'Milestone' },
    { name: 'Visual Identity System', unitPrice: 65000, billingType: 'Milestone' },
    { name: 'Brand Guidelines', unitPrice: 35000, billingType: 'One-time' },
  ],
  Website: [
    { name: 'Website UX Planning & Sitemap', unitPrice: 30000, billingType: 'Milestone' },
    { name: 'Website UI Design', unitPrice: 55000, billingType: 'Milestone' },
    { name: 'Website Development', unitPrice: 85000, billingType: 'Milestone' },
    { name: 'CMS, Analytics & Integration Setup', unitPrice: 40000, billingType: 'One-time' },
  ],
  'UX/UI': [
    { name: 'User Research & Journey Mapping', unitPrice: 30000, billingType: 'Milestone' },
    { name: 'UX/UI Design Sprint', unitPrice: 50000, billingType: 'Milestone' },
    { name: 'Prototype & Usability Testing', unitPrice: 25000, billingType: 'One-time' },
  ],
  'Design & Technical Support': [
    { name: 'Design QA & Developer Handover', unitPrice: 20000, billingType: 'One-time' },
    { name: 'Technical Support Retainer', unitPrice: 30000, billingType: 'Recurring' },
  ],
  'Digital Marketing': [
    { name: 'Campaign Setup & Tracking', unitPrice: 25000, billingType: 'One-time' },
    { name: 'Monthly Marketing Retainer', unitPrice: 45000, billingType: 'Recurring' },
  ],
};

const formatINR = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(Number(value) || 0);

const formatRecordDateTime = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  }).formatToParts(date);
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${map.day} ${map.month} ${map.year}, ${map.hour}:${map.minute} ${(map.dayPeriod || '').toUpperCase()}`.trim();
};

const initialDeal = {
  title: 'Hotel Jindal Brand & Website Revamp',
  organization: 'Hotel Jindal',
  code: 'VL-2026-0001',
  stage: 'Initial Consultation',
  assignedTo: 'Priya Sharma',
  created: '02 Aug 2026, 1:04 PM',
  updated: '09 Aug 2026, 6:43 PM',
  value: '₹2,80,000',
  probability: '35%',
  expectedClose: '24 Aug 2026',
  expectedTimeline: '8–10 weeks',
  paymentStructure: '40 / 40 / 20',
  priority: 'High',
  clientCategory: 'A+',
  visibility: 'Deal owner & management',
  contact: 'Chinmay Jindal',
  email: 'chinmay@hoteljindal.com',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  preferredContact: 'WhatsApp',
  score: 82,
  labels: ['High priority'],
  products: [
    { id: 'product-branding', name: 'Brand Strategy & Visual Identity', service: 'Branding', billingType: 'Milestone', quantity: 1, unitPrice: 90000, discount: 0, tax: 18, active: true },
    { id: 'product-website', name: 'Hospitality Website Design & Development', service: 'Website', billingType: 'Milestone', quantity: 1, unitPrice: 150000, discount: 0, tax: 18, active: true },
    { id: 'product-integration', name: 'CMS, Analytics & Booking Integration Setup', service: 'Website', billingType: 'One-time', quantity: 1, unitPrice: 40000, discount: 0, tax: 18, active: true },
  ],
  participants: ['Chinmay Jindal'],
  sequence: '',
  sourceChannel: 'Referral',
  additionalSourceChannels: 'Website enquiry, WhatsApp',
  referralSource: 'Rahul Mehta',
  referralChannelId: 'REF-IND-024',
  website: 'www.hoteljindal.com',
  industry: 'Hospitality',
  city: 'Indore, Madhya Pradesh',
  teamSize: '51–100',
  projectNeeds: ['Branding', 'Website'],
  projectRequirements: {
    Branding: 'Refresh the identity while retaining the hotel’s established local recognition. Include signage, room collateral, digital brand applications and event communication.',
    Website: 'Create a responsive hospitality website with room pages, amenities, gallery, events, enquiry forms, WhatsApp integration, analytics and a future-ready booking integration path.',
  },
};

const stageNameById = {
  new: 'New Inquiry',
  discovery: 'Initial Consultation',
  proposal: 'Proposal Sent',
  negotiation: 'Follow-up Call',
  won: 'Negotiation',
};

function mapSelectedDeal(selectedDeal) {
  if (!selectedDeal) return initialDeal;
  const normalizedNeeds = (selectedDeal.projectNeeds || initialDeal.projectNeeds).map((service) => service === 'Technical Support' ? 'Design & Technical Support' : service);
  const generatedProducts = normalizedNeeds.flatMap((service, serviceIndex) => (suggestedProductsByService[service] || []).slice(0, serviceIndex ? 1 : 2).map((product, productIndex) => ({
    id: `${selectedDeal.id || 'deal'}-${serviceIndex}-${productIndex}`,
    name: product.name,
    service,
    billingType: product.billingType,
    quantity: 1,
    unitPrice: product.unitPrice,
    discount: 0,
    tax: 18,
    active: true,
  })));
  const value = Number(selectedDeal.value || 0);
  const probability = Number(selectedDeal.probability ?? 35);

  return {
    ...initialDeal,
    title: selectedDeal.title || initialDeal.title,
    organization: selectedDeal.organization || initialDeal.organization,
    code: selectedDeal.id ? `VD-${String(selectedDeal.id).replace(/[^a-z0-9]/gi, '').slice(-8).toUpperCase()}` : initialDeal.code,
    stage: stageNameById[selectedDeal.stage] || selectedDeal.stage || initialDeal.stage,
    assignedTo: selectedDeal.owner || initialDeal.assignedTo,
    value: value ? formatINR(value) : initialDeal.value,
    probability: `${probability}%`,
    expectedClose: selectedDeal.expectedClose || initialDeal.expectedClose,
    priority: selectedDeal.priority || initialDeal.priority,
    contact: selectedDeal.contact || initialDeal.contact,
    participants: selectedDeal.contact ? [selectedDeal.contact] : initialDeal.participants,
    projectNeeds: normalizedNeeds,
    products: generatedProducts.length ? generatedProducts : initialDeal.products,
  };
}

const initialRelatedDeals = [
  {
    id: 'deal-2',
    title: 'Hotel Jindal Digital Marketing Retainer',
    stage: 'New Inquiry',
    value: '₹1,20,000',
    projectNeeds: ['Digital Marketing'],
    projectRequirements: {
      'Digital Marketing': 'Monthly performance campaigns, social content, reporting and enquiry optimisation for the hotel.',
    },
  },
  {
    id: 'deal-3',
    title: 'Hotel Jindal Booking Experience Upgrade',
    stage: 'Proposal Sent',
    value: '₹1,85,000',
    projectNeeds: ['UX/UI', 'Design & Technical Support'],
    projectRequirements: {
      'UX/UI': 'Improve room comparison, booking discovery and mobile enquiry journeys.',
      'Design & Technical Support': 'Support implementation, QA, analytics events and the launch handover.',
    },
  },
];

const initialActivities = [
  {
    id: 1,
    type: 'Meeting',
    title: 'Initial consultation with Chinmay',
    date: 'Today, 3:00 PM',
    detail: 'Review business goals, website scope and decision process.',
    owner: 'Priya Sharma',
    status: 'upcoming',
  },
  {
    id: 2,
    type: 'Task',
    title: 'Prepare discovery questions and scope checklist',
    date: 'Tomorrow, 11:30 AM',
    detail: 'Include brand identity, room inventory and booking integration questions.',
    owner: 'Priya Sharma',
    status: 'upcoming',
  },
];

const initialHistory = [
  {
    id: 1,
    category: 'Activities',
    icon: 'activity',
    title: 'Initial consultation scheduled',
    meta: 'Today at 1:04 PM · Priya Sharma',
    detail: 'Meeting scheduled for today at 3:00 PM with Chinmay Jindal.',
  },
  {
    id: 2,
    category: 'Changelog',
    icon: 'pipeline',
    title: 'Stage: New Inquiry → Initial Consultation',
    meta: 'Today at 12:46 PM · Priya Sharma (Web App)',
    detail: '',
  },
  {
    id: 3,
    category: 'Changelog',
    icon: 'calendar',
    title: 'Expected close date: 18 Aug 2026 → 24 Aug 2026',
    meta: 'Yesterday at 7:28 PM · Priya Sharma (Web App)',
    detail: '',
  },
  {
    id: 4,
    category: 'Notes',
    icon: 'note',
    title: 'Client wants a premium but locally familiar identity',
    meta: 'Yesterday at 6:20 PM · Priya Sharma',
    detail: 'The current hotel recognition should be retained while modernising signage, digital collateral and the website.',
  },
  {
    id: 5,
    category: 'Emails',
    icon: 'mail',
    title: 'Scope confirmation email sent to Chinmay Jindal',
    meta: 'Yesterday at 6:02 PM · Priya Sharma',
    detail: 'Shared the discovery agenda and requested current brand files, room inventory and booking-flow details.',
  },
  {
    id: 6,
    category: 'Files',
    icon: 'file',
    title: 'Hotel_Jindal_Existing_Brand_Assets.zip uploaded',
    meta: 'Yesterday at 5:42 PM · Priya Sharma',
    detail: '18 files · 24.6 MB',
  },
  {
    id: 7,
    category: 'Changelog',
    icon: 'deal',
    title: 'Deal created',
    meta: '03 Aug 2026 at 8:08 PM · System',
    detail: 'The organization, contact person and selected project requirements were linked to this deal.',
  },
];

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const icons = {
    deal: <><circle cx="12" cy="12" r="9" /><path d="M14.8 8.7c-.6-.8-1.5-1.2-2.7-1.2-1.6 0-2.7.8-2.7 2.1 0 1.2.9 1.7 2.9 2.1 2 .4 2.9 1.1 2.9 2.4 0 1.5-1.3 2.5-3.1 2.5-1.4 0-2.5-.5-3.2-1.4M12 5.5v13" /></>,
    arrowLeft: <><path d="m15 18-6-6 6-6" /><path d="M9 12h10" /></>,
    arrowRight: <><path d="m9 18 6-6-6-6" /><path d="M15 12H5" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    user: <><circle cx="12" cy="8" r="3.2" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><path d="M16 5.5a3 3 0 0 1 0 5.7M16 14a5 5 0 0 1 4.5 5" /></>,
    building: <><path d="M4 21V5l8-3v19M12 8h8v13M7 7h2M7 11h2M7 15h2M15 11h2M15 15h2M2 21h20" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18" /></>,
    activity: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    note: <><path d="M5 3h14v14l-4 4H5z" /><path d="M15 21v-4h4M8 8h8M8 12h6" /></>,
    file: <><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v6h6" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    phone: <><path d="M8.5 3H5.7A2.7 2.7 0 0 0 3 5.7 15.3 15.3 0 0 0 18.3 21a2.7 2.7 0 0 0 2.7-2.7v-2.8l-4-1-1 2.4a11 11 0 0 1-5-5l2.4-1-1-4Z" /></>,
    money: <><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /></>,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v2M22 12h-2" /></>,
    pipeline: <><path d="M4 5h16M7 5v6M17 5v6M7 11h10M12 11v8" /></>,
    more: <><circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.2" fill="currentColor" stroke="none" /></>,
    edit: <><path d="M14.5 5.5l4 4M4 20l3.8-.8L19 8a2.1 2.1 0 0 0-3-3L4.8 16.2 4 20z" /></>,
    chevronDown: <path d="m7 10 5 5 5-5" />,
    chevronUp: <path d="m7 14 5-5 5 5" />,
    plus: <path d="M12 5v14M5 12h14" />,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    archive: <><path d="M4 7h16v13H4z" /><path d="M3 3h18v4H3zM9 11h6" /></>,
    export: <><path d="M12 3v12M8 7l4-4 4 4" /><path d="M5 13v7h14v-7" /></>,
    trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14" /></>,
    spark: <><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" /><path d="m18 14 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z" /></>,
    link: <><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1.1" /><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1.1" /></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    proposal: <><path d="M6 3h9l3 3v15H6z" /><path d="M15 3v4h4M9 11h6M9 15h4" /></>,
    invoice: <><path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21z" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
    milestone: <><circle cx="12" cy="12" r="8" /><path d="M12 4v8l5 3" /></>,
    comment: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9h8M8 12h5" /></>,
    pin: <><path d="M9 4h6l-1 5 3 3H7l3-3z" /><path d="M12 12v8" /></>,
    sort: <><path d="M8 7h8M6 12h12M9 17h6" /></>,
    listBullets: <><circle cx="5" cy="7" r="1" fill="currentColor" stroke="none" /><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="5" cy="17" r="1" fill="currentColor" stroke="none" /><path d="M9 7h11M9 12h11M9 17h11" /></>,
    listOrdered: <><path d="M4 5h1v4M3.5 13.5c.4-.4.9-.6 1.4-.6.9 0 1.5.5 1.5 1.2 0 .9-.9 1.5-2.8 3.4h3M9 7h11M9 17h11" /></>,
  };
  return <svg {...common}>{icons[name] ?? null}</svg>;
}

function DealHeader({ deal, setDeal, status, setStatus, onBack, onNewDeal, notify }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="deal-header">
      <div className="deal-header-main">
        <div className="deal-title-block">
          <div className="deal-title-line">
            <button type="button" className="deal-back-button" aria-label="Back to deals" onClick={onBack}><Icon name="arrowLeft" size={18} /></button>
            <h1>{deal.title}</h1>
          </div>
          <div className="deal-meta">
            <span className="meta-item meta-locked" title="Universal ID is system generated and locked"><Icon name="lock" size={14} />{deal.code}</span>
            <span className="meta-item meta-locked" title="Date created is system generated and locked"><Icon name="lock" size={14} />Created {deal.created}</span>
          </div>
        </div>

        <div className="deal-header-actions">
          <div className="owner-control locked-control" aria-label={`Assigned to ${deal.assignedTo}, locked`}><span className="owner-avatar">PS</span><span><small>Assigned to</small>{deal.assignedTo}</span><Icon name="lock" size={15} /></div>
          <button type="button" className="btn new-deal" onClick={onNewDeal}><Icon name="plus" size={19} />New Deal</button>
          <button type="button" className={`btn won ${status === 'won' ? 'selected' : ''}`} onClick={() => { setStatus('won'); notify('Deal marked as won'); }}>Won</button>
          <button type="button" className={`btn lost ${status === 'lost' ? 'selected' : ''}`} onClick={() => { setStatus('lost'); notify('Deal marked as lost'); }}>Lost</button>
          <div className="relative">
            <button type="button" className="icon-btn" aria-label="More deal actions" onClick={() => setMenuOpen((open) => !open)}><Icon name="more" /></button>
            {menuOpen && (
              <div className="deal-menu">
                <button type="button" onClick={() => { notify('Deal archived'); setMenuOpen(false); }}><Icon name="archive" size={16} />Archive</button>
                <button type="button" className="disabled" disabled><Icon name="trash" size={16} />Delete<span><Icon name="lock" size={13} /></span></button>
                <button type="button" className="disabled" disabled><Icon name="export" size={16} />Export<span><Icon name="lock" size={13} /></span></button>
              </div>
            )}
          </div>
        </div>
      </div>

      <StageBar deal={deal} setDeal={setDeal} status={status} />
    </section>
  );
}

function StageBar({ deal, setDeal, status }) {
  const activeIndex = stages.indexOf(deal.stage);
  return (
    <div className={`stage-shell ${status !== 'open' ? `is-${status}` : ''}`}>
      <div className="stage-bar" role="list" aria-label="Deal stages">
        {stages.map((stage, index) => {
          const isDone = index < activeIndex;
          const isActive = index === activeIndex;
          const days = stageDays[stage] ?? 0;
          return (
            <button
              type="button"
              role="listitem"
              key={stage}
              className={`${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}
              onClick={() => setDeal((current) => ({ ...current, stage }))}
              aria-current={isActive ? 'step' : undefined}
            >
              <small>{days} {days === 1 ? 'day' : 'days'}</small>
              <strong>{stage}</strong>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Section({ title, icon, children, open, onToggle, action }) {
  return (
    <section className="detail-section">
      <div className="section-heading">
        <button type="button" className="section-toggle" onClick={onToggle} aria-expanded={open}>
          <Icon name={open ? 'chevronUp' : 'chevronDown'} size={15} />
          {icon && <span className="section-icon"><Icon name={icon} size={16} /></span>}
          <strong>{title}</strong>
        </button>
        {action}
      </div>
      {open && <div className="section-body">{children}</div>}
    </section>
  );
}

function ReadRow({ label, value, locked = false, link = false }) {
  return (
    <div className="read-row">
      <span>{label}</span>
      <strong className={link ? 'link-value' : ''}>{value || '—'} {locked && <Icon name="lock" size={13} />}</strong>
    </div>
  );
}

function EditField({ label, value, onChange, type = 'text', options, locked = false }) {
  return (
    <label className={`compact-field ${locked ? 'locked' : ''}`}>
      <span>{label}{locked && <Icon name="lock" size={12} />}</span>
      {options ? (
        <select value={value} disabled={locked} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
      ) : (
        <input type={type} value={value} disabled={locked} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

function DealSnapshot({ deal, onManageProducts }) {
  const probability = Number.parseInt(deal.probability, 10) || 0;
  return (
    <section className="deal-snapshot-card">
      <div className="snapshot-topline">
        <div>
          <h2>Deal Snapshot</h2>
        </div>
        <div className="snapshot-score"><Icon name="spark" size={16} /><span>Score</span><strong>{deal.score}</strong></div>
      </div>

      <div className="snapshot-value-row">
        <div>
          <span>Deal value</span>
          <strong>{deal.value}</strong>
        </div>
        <button type="button" className="snapshot-products" onClick={onManageProducts}>
          <Icon name="plus" size={16} />Products {deal.products?.length ? `(${deal.products.length})` : ''}
        </button>
      </div>

      <div className="snapshot-probability">
        <div><span>Win probability</span><strong>{deal.probability}</strong></div>
        <div className="probability-track"><i style={{ width: `${probability}%` }} /></div>
      </div>

      <div className="snapshot-grid">
        <article><span>Expected close</span><strong>{deal.expectedClose}</strong></article>
        <article><span>Priority</span><strong>{deal.priority}</strong></article>
        <article><span>Organization</span><strong>{deal.organization}</strong></article>
        <article><span>Contact person</span><strong>{deal.contact}</strong></article>
      </div>
    </section>
  );
}

function RelatedDealsSection({ deal, relatedDeals, onNewDeal }) {
  return (
    <div className="lead-deals-panel">
      <div className="parent-lead-card">
        <span className="parent-lead-icon"><Icon name="building" size={17} /></span>
        <div>
          <small>Organization</small>
          <strong>{deal.organization}</strong>
          <span>{deal.industry} · {deal.city}</span>
        </div>
        <span className="deal-count">{relatedDeals.length} related</span>
      </div>

      <div className="linked-deals-heading">
        <strong>Other deals for this organization</strong>
        <span>Separate opportunities connected to {deal.organization}</span>
      </div>

      <div className="linked-deals-list">
        {relatedDeals.length ? relatedDeals.map((item) => (
          <button type="button" className="linked-deal-card" key={item.id}>
            <span className="linked-deal-main">
              <strong>{item.title}</strong>
              <small>{(item.projectNeeds || []).join(' · ')} · {item.stage}</small>
            </span>
            <span className="linked-deal-side">
              <strong>{item.value}</strong>
              <small>Open deal</small>
            </span>
          </button>
        )) : <div className="empty-history">No other deals are linked to this organization.</div>}
      </div>

      <button type="button" className="add-linked-deal" onClick={onNewDeal}><Icon name="plus" size={16} />New deal for {deal.organization}</button>
    </div>
  );
}

function RequirementsModal({ deal, onClose, onSave }) {
  const [draft, setDraft] = useState({
    projectNeeds: [...(deal.projectNeeds || [])],
    projectRequirements: { ...(deal.projectRequirements || {}) },
  });

  const toggleService = (service) => {
    setDraft((current) => {
      const exists = current.projectNeeds.includes(service);
      const projectNeeds = exists
        ? current.projectNeeds.filter((item) => item !== service)
        : [...current.projectNeeds, service];
      const projectRequirements = { ...current.projectRequirements };
      if (exists) delete projectRequirements[service];
      else if (!projectRequirements[service]) projectRequirements[service] = '';
      return { projectNeeds, projectRequirements };
    });
  };

  const updateRequirement = (service, value) => {
    setDraft((current) => ({
      ...current,
      projectRequirements: { ...current.projectRequirements, [service]: value },
    }));
  };

  return (
    <div className="modal-backdrop requirements-backdrop" onMouseDown={onClose} role="presentation">
      <section className="requirements-modal" role="dialog" aria-modal="true" aria-labelledby="requirements-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="requirements-modal-header">
          <div>
            <span>Deal scope</span>
            <h2 id="requirements-title">Project Requirements</h2>
            <p>Choose the services included in this deal and keep each requirement specific to this opportunity.</p>
          </div>
          <button type="button" className="icon-btn borderless" onClick={onClose} aria-label="Close project requirements"><Icon name="close" size={21} /></button>
        </header>

        <div className="requirements-modal-body">
          <aside className="requirements-service-nav">
            <div className="requirements-nav-heading">
              <strong>Services</strong>
              <span>{draft.projectNeeds.length} selected</span>
            </div>
            {projectServiceOptions.map((service) => {
              const selected = draft.projectNeeds.includes(service);
              return (
                <button type="button" key={service} className={selected ? 'selected' : ''} onClick={() => toggleService(service)}>
                  <span className={`service-mark ${serviceTone[service] || 'blue'}`}>{service.charAt(0)}</span>
                  <span>{service}</span>
                  <span className="requirement-check">{selected ? '✓' : '+'}</span>
                </button>
              );
            })}
          </aside>

          <div className="requirements-modal-fields">
            {draft.projectNeeds.length ? draft.projectNeeds.map((service) => (
              <label className="requirements-modal-field" key={service}>
                <div>
                  <span className={`service-mark ${serviceTone[service] || 'blue'}`}>{service.charAt(0)}</span>
                  <strong>{service}</strong>
                </div>
                <textarea
                  rows="6"
                  value={draft.projectRequirements[service] || ''}
                  onChange={(event) => updateRequirement(service, event.target.value)}
                  placeholder={`Add detailed ${service} requirements for this deal`}
                />
              </label>
            )) : (
              <div className="requirements-modal-empty">
                <span><Icon name="target" size={24} /></span>
                <h3>Select a service</h3>
                <p>The detailed requirement fields will appear here.</p>
              </div>
            )}
          </div>
        </div>

        <footer className="requirements-modal-footer">
          <span>Requirements are saved only for this deal.</span>
          <div>
            <button type="button" className="btn neutral" onClick={onClose}>Cancel</button>
            <button type="button" className="btn primary" onClick={() => onSave(draft)} disabled={!draft.projectNeeds.length}>Save Requirements</button>
          </div>
        </footer>
      </section>
    </div>
  );
}


function DealOverview({ deal, activities, history }) {
  const [open, setOpen] = useState(true);
  const meetingCount = history.filter((item) => item.category === 'Activities' || /meeting/i.test(item.title || '')).length || 1;
  const emailCount = history.filter((item) => item.category === 'Emails').length || 1;
  const totalTop = Math.max(1, meetingCount + emailCount);
  const ownerCount = Math.max(1, activities.filter((item) => item.owner === deal.assignedTo).length);

  return (
    <section className={`deal-overview-card ${open ? 'is-open' : ''}`}>
      <header className="deal-overview-header section-heading">
        <button type="button" className="deal-overview-toggle section-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
          <Icon name={open ? 'chevronUp' : 'chevronDown'} size={15} />
          <span className="section-icon"><Icon name="activity" size={16} /></span>
          <strong>Overview</strong>
        </button>
        <button type="button" className="icon-btn borderless overview-refresh" aria-label="Refresh overview"><span aria-hidden="true">↻</span></button>
      </header>
      {open && (
        <div className="deal-overview-body">
          <div className="overview-record-stats">
            <div><span>Deal age</span><strong>7 days</strong></div>
            <div><span>Inactive (days)</span><strong>0</strong></div>
            <div><span>Created</span><strong>{deal.created.split(',')[0]}</strong></div>
          </div>

          <div className="overview-chart-block">
            <h3>Top activities</h3>
            <div className="overview-stacked-bar" aria-label="Top activities distribution">
              <span style={{ width: `${(meetingCount / totalTop) * 100}%` }} />
              <span style={{ width: `${(emailCount / totalTop) * 100}%` }} />
            </div>
            <div className="overview-stat-row"><span>Meeting</span><strong>{meetingCount}</strong><em>{Math.round(meetingCount / totalTop * 100)}%</em></div>
            <div className="overview-stat-row"><span>Email</span><strong>{emailCount}</strong><em>{Math.round(emailCount / totalTop * 100)}%</em></div>
          </div>

          <div className="overview-chart-block">
            <h3>Most active users</h3>
            <div className="overview-user-bar"><span /></div>
            <div className="overview-stat-row"><span>{deal.assignedTo}</span><strong>{ownerCount}</strong><em>100%</em></div>
          </div>
        </div>
      )}
    </section>
  );
}

function DetailPanel({ deal, setDeal, relatedDeals, onNewDeal, onManageProducts, activities, history }) {
  const defaultOpen = {
    'Deal Information': false,
    Commercials: false,
    'Contact Person': false,
    Organization: false,
    'Related Deals': false,
    'Source & Access': false,
    'AI Summary': false,
  };
  const [openSections, setOpenSections] = useState(defaultOpen);
  const [editing, setEditing] = useState('');
  const [draft, setDraft] = useState(deal);
  const [requirementsOpen, setRequirementsOpen] = useState(false);

  const toggle = (title) => setOpenSections((state) => ({ ...state, [title]: !state[title] }));
  const startEditing = (section) => { setDraft(deal); setEditing(section); };
  const save = () => { setDeal({ ...draft, updated: formatRecordDateTime() }); setEditing(''); };
  const saveRequirements = (requirements) => {
    setDeal((current) => ({ ...current, ...requirements, updated: formatRecordDateTime() }));
    setRequirementsOpen(false);
  };
  const editAction = (section) => editing === section ? (
    <div className="inline-actions"><button type="button" className="text-btn" onClick={() => setEditing('')}>Cancel</button><button type="button" className="text-btn primary-text" onClick={save}>Save</button></div>
  ) : <button type="button" className="icon-btn borderless" aria-label={`Edit ${section}`} onClick={() => startEditing(section)}><Icon name="edit" size={17} /></button>;

  return (
    <aside className="detail-panel energy-detail-panel">
      <div className="detail-panel-content">
        <DealSnapshot deal={deal} onManageProducts={onManageProducts} />

        <section className="project-scope-card compact-project-scope-card">
          <div className="project-scope-heading">
            <div>
              <h2>Project Requirements</h2>
              <p>{deal.projectNeeds?.length || 0} services selected for this deal</p>
            </div>
            <button type="button" className="manage-requirements-btn" onClick={() => setRequirementsOpen(true)}>
              View & Edit <Icon name="arrowRight" size={16} />
            </button>
          </div>

          <div className="project-scope-summary">
            {(deal.projectNeeds || []).length ? deal.projectNeeds.map((service) => (
              <span className="project-service-chip" key={service}>
                <span className={`service-mark ${serviceTone[service] || 'blue'}`}>{service.charAt(0)}</span>
                {service}
              </span>
            )) : <span className="requirements-empty-inline">No services selected.</span>}
          </div>
          <div className="project-requirement-preview">
            <Icon name="spark" size={17} />
            <p>{deal.projectNeeds?.length
              ? `${deal.projectNeeds[0]}: ${deal.projectRequirements?.[deal.projectNeeds[0]] || 'Detailed requirements have not been added yet.'}`
              : 'Open the requirements workspace to define this deal’s project scope.'}</p>
          </div>
        </section>

        <div className="deal-details-title-row">
          <h2>Deal Details</h2>
        </div>

        <DealOverview deal={deal} activities={activities || []} history={history || []} />

        <div className="details-accordion-stack deal-details-grid">
          <Section title="Deal Information" icon="deal" open={openSections['Deal Information']} onToggle={() => toggle('Deal Information')} action={editAction('Deal Information')}>
            {editing === 'Deal Information' ? (
              <div className="compact-form">
                <EditField label="Deal name" value={draft.title} onChange={(title) => setDraft({ ...draft, title })} />
                <EditField label="Universal ID" value={draft.code} onChange={() => {}} locked />
                <EditField label="Stage" value={draft.stage} options={stages} onChange={(stage) => setDraft({ ...draft, stage })} />
                <EditField label="Priority" value={draft.priority} options={['Low', 'Medium', 'High', 'Urgent']} onChange={(priority) => setDraft({ ...draft, priority })} />
                <EditField label="Client Category" value={draft.clientCategory} options={['A+', 'A', 'B', 'C']} onChange={(clientCategory) => setDraft({ ...draft, clientCategory })} />
                <EditField label="Assigned to" value={draft.assignedTo} onChange={() => {}} locked />
              </div>
            ) : (
              <div className="read-list">
                <ReadRow label="Universal ID" value={deal.code} locked />
                <ReadRow label="Stage" value={deal.stage} />
                <ReadRow label="Priority" value={deal.priority} />
                <ReadRow label="Client Category" value={deal.clientCategory} />
                <ReadRow label="Assigned to" value={deal.assignedTo} locked />
              </div>
            )}
          </Section>

          <Section title="Commercials" icon="money" open={openSections.Commercials} onToggle={() => toggle('Commercials')} action={editAction('Commercials')}>
            {editing === 'Commercials' ? (
              <div className="compact-form">
                <EditField label="Deal value" value={draft.value} onChange={(value) => setDraft({ ...draft, value })} />
                <EditField label="Probability" value={draft.probability} onChange={(probability) => setDraft({ ...draft, probability })} />
                <EditField label="Expected close" value={draft.expectedClose} onChange={(expectedClose) => setDraft({ ...draft, expectedClose })} />
                <EditField label="Expected timeline" value={draft.expectedTimeline} onChange={(expectedTimeline) => setDraft({ ...draft, expectedTimeline })} />
                <EditField label="Payment structure" value={draft.paymentStructure} onChange={(paymentStructure) => setDraft({ ...draft, paymentStructure })} />
              </div>
            ) : (
              <div className="read-list">
                <ReadRow label="Deal value" value={deal.value} />
                <ReadRow label="Probability" value={deal.probability} />
                <ReadRow label="Expected close" value={deal.expectedClose} />
                <ReadRow label="Expected timeline" value={deal.expectedTimeline} />
                <ReadRow label="Payment structure" value={deal.paymentStructure} />
              </div>
            )}
          </Section>

          <Section title="Contact Person" icon="user" open={openSections['Contact Person']} onToggle={() => toggle('Contact Person')} action={editAction('Contact Person')}>
            {editing === 'Contact Person' ? (
              <div className="compact-form">
                <EditField label="Contact Person" value={draft.contact} onChange={(contact) => setDraft({ ...draft, contact })} />
                <EditField label="Email" value={draft.email} onChange={(email) => setDraft({ ...draft, email })} />
                <EditField label="Phone" value={draft.phone} onChange={(phone) => setDraft({ ...draft, phone })} />
                <EditField label="Preferred Contact" value={draft.preferredContact || 'WhatsApp'} options={['Email', 'Phone', 'WhatsApp']} onChange={(preferredContact) => setDraft({ ...draft, preferredContact })} />
              </div>
            ) : (
              <div className="read-list">
                <ReadRow label="Contact Person" value={deal.contact} />
                <ReadRow label="Email" value={deal.email} link />
                <ReadRow label="Phone" value={deal.phone} />
                <ReadRow label="Preferred Contact" value={deal.preferredContact || 'WhatsApp'} />
              </div>
            )}
          </Section>

          <Section title="Organization" icon="building" open={openSections.Organization} onToggle={() => toggle('Organization')} action={editAction('Organization')}>
            {editing === 'Organization' ? (
              <div className="compact-form">
                <EditField label="Organization" value={draft.organization} onChange={(organization) => setDraft({ ...draft, organization })} />
                <EditField label="Website" value={draft.website} onChange={(website) => setDraft({ ...draft, website })} />
                <EditField label="Industry" value={draft.industry} onChange={(industry) => setDraft({ ...draft, industry })} />
                <EditField label="City" value={draft.city} onChange={(city) => setDraft({ ...draft, city })} />
                <EditField label="Team size" value={draft.teamSize} onChange={(teamSize) => setDraft({ ...draft, teamSize })} />
              </div>
            ) : (
              <div className="read-list">
                <ReadRow label="Organization" value={deal.organization} link />
                <ReadRow label="Website" value={deal.website} link />
                <ReadRow label="Industry" value={deal.industry} />
                <ReadRow label="City" value={deal.city} />
                <ReadRow label="Team size" value={deal.teamSize} />
              </div>
            )}
          </Section>

          <Section title="Source & Access" icon="link" open={openSections['Source & Access']} onToggle={() => toggle('Source & Access')} action={editAction('Source & Access')}>
            {editing === 'Source & Access' ? (
              <div className="compact-form">
                <EditField label="Source channel" value={draft.sourceChannel || ''} onChange={(sourceChannel) => setDraft({ ...draft, sourceChannel })} />
                <EditField label="Additional source channels" value={draft.additionalSourceChannels || ''} onChange={(additionalSourceChannels) => setDraft({ ...draft, additionalSourceChannels })} />
                <EditField label="Referral source" value={draft.referralSource || ''} onChange={(referralSource) => setDraft({ ...draft, referralSource })} />
                <EditField label="Referral channel ID" value={draft.referralChannelId || ''} onChange={(referralChannelId) => setDraft({ ...draft, referralChannelId })} />
                <EditField label="Visibility" value={draft.visibility} onChange={() => {}} locked />
              </div>
            ) : (
              <div className="read-list">
                <ReadRow label="Source channel" value={deal.sourceChannel} />
                <ReadRow label="Additional source channels" value={deal.additionalSourceChannels} />
                <ReadRow label="Referral source" value={deal.referralSource} />
                <ReadRow label="Referral channel ID" value={deal.referralChannelId} />
                <ReadRow label="Visibility" value={deal.visibility} locked />
              </div>
            )}
          </Section>

          <Section title="Related Deals" icon="link" open={openSections['Related Deals']} onToggle={() => toggle('Related Deals')}>
            <RelatedDealsSection deal={deal} relatedDeals={relatedDeals} onNewDeal={onNewDeal} />
          </Section>


          <Section title="AI Summary" icon="spark" open={openSections['AI Summary']} onToggle={() => toggle('AI Summary')}>
            <div className="ai-summary">
              <span><Icon name="spark" size={16} />AI-generated</span>
              <p>Hotel Jindal is evaluating a coordinated brand and website refresh. Budget and decision maker are confirmed. The strongest next step is to validate deliverables, booking integration expectations and the final approval process during the consultation.</p>
            </div>
          </Section>
        </div>

        <footer className="record-meta-footer">
          <div><span>Updated:</span><strong>{deal.updated || '09 Aug 2026, 6:43 PM'}</strong></div>
          <div><span>Created:</span><strong>{deal.created}</strong></div>
        </footer>
      </div>

      {requirementsOpen && <RequirementsModal deal={deal} onClose={() => setRequirementsOpen(false)} onSave={saveRequirements} />}
    </aside>
  );
}
function ActivityCard({ activity, onComplete }) {
  return (
    <article className={`focus-card ${activity.status === 'done' ? 'completed' : ''}`}>
      <button type="button" className="completion" aria-label="Mark activity complete" onClick={() => onComplete(activity.id)}>{activity.status === 'done' && <Icon name="check" size={14} />}</button>
      <span className={`activity-type ${activity.type.toLowerCase()}`}><Icon name={activity.type === 'Meeting' ? 'users' : 'activity'} size={16} /></span>
      <div className="focus-copy">
        <strong>{activity.title}</strong>
        <div className="focus-meta"><span>{activity.date}</span><span>·</span><span>{activity.owner}</span></div>
        <p>{activity.detail}</p>
      </div>
      <button type="button" className="icon-btn borderless" aria-label="Activity menu"><Icon name="more" /></button>
    </article>
  );
}

function MainWorkspace({ deal, activities, setActivities, history, setHistory, onAddActivity, onQuickCreate }) {
  const filters = ['All', 'Activities', 'Notes', 'Emails', 'Files', 'Documents', 'Invoices', 'Changelog'];
  const [filter, setFilter] = useState('All');
  const [expandAll, setExpandAll] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(true);
  const [note, setNote] = useState('');
  const filteredHistory = useMemo(() => filter === 'All' ? history : history.filter((item) => item.category === filter), [filter, history]);
  const counts = useMemo(() => filters.reduce((result, item) => {
    result[item] = item === 'All' ? history.length : history.filter((entry) => entry.category === item).length;
    return result;
  }, {}), [history]);
  const changeCount = counts.Changelog || 0;
  const openActivities = activities.filter((item) => item.status !== 'done');
  const primaryActivity = openActivities[0];
  const upcomingActivities = openActivities.slice(1);

  const completeActivity = (id) => {
    setActivities((items) => items.map((item) => item.id === id ? { ...item, status: item.status === 'done' ? 'upcoming' : 'done' } : item));
  };

  const addNote = () => {
    if (!note.trim()) return;
    setHistory((items) => [{ id: Date.now(), category: 'Notes', icon: 'note', title: note.trim(), meta: 'Just now · Priya Sharma', detail: '' }, ...items]);
    setNote('');
    setFilter('All');
  };

  const quickActions = [
    { id: 'activity', label: 'Add Activity', icon: 'plus', onClick: onAddActivity, primary: true },
    { id: 'proposal', label: 'Proposal', icon: 'proposal', onClick: () => onQuickCreate('Proposal') },
    { id: 'invoice', label: 'Invoice', icon: 'invoice', onClick: () => onQuickCreate('Invoice') },
    { id: 'milestone', label: 'Payment Milestone', icon: 'milestone', onClick: () => onQuickCreate('Payment Milestone') },
  ];

  return (
    <main className="main-workspace energy-main-workspace improved-focus-workspace">
      <div className="activity-command-bar refined-action-bar action-buttons-only">
        <div className="quick-actions-grid energy-quick-actions">
          {quickActions.map((action) => (
            <button type="button" key={action.id} className={`quick-action ${action.primary ? 'primary' : ''}`} onClick={action.onClick}>
              <span className="quick-action-icon"><Icon name={action.icon} size={18} /></span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      <section className="focus-section energy-focus-section enhanced-focus-section">
        <div className="enhanced-focus-heading">
          <div>
            <h2>Focus</h2>
          </div>
        </div>

        {primaryActivity ? (
          <article className="priority-focus-card">
            <div className="priority-focus-icon"><Icon name={primaryActivity.type === 'Meeting' ? 'users' : 'activity'} size={23} /></div>
            <div className="priority-focus-copy">
              <div className="priority-label">Next action</div>
              <h3>{primaryActivity.title}</h3>
              <p>{primaryActivity.detail}</p>
              <div className="priority-focus-meta"><span>{primaryActivity.date}</span><span>{primaryActivity.owner}</span><span>{primaryActivity.type}</span></div>
            </div>
            <button type="button" className="complete-focus-btn" onClick={() => completeActivity(primaryActivity.id)}><Icon name="check" size={16} />Mark complete</button>
          </article>
        ) : (
          <div className="focus-empty-state"><Icon name="check" size={24} /><strong>No open activities</strong><span>Add an activity to create the next action.</span></div>
        )}

        {upcomingActivities.length > 0 && (
          <div className="upcoming-focus-block">
            <div className="upcoming-focus-heading"><h3>Coming Up</h3><span>{upcomingActivities.length} more</span></div>
            <div className="focus-list energy-focus-list compact-upcoming-list">
              {upcomingActivities.map((activity) => <ActivityCard key={activity.id} activity={activity} onComplete={completeActivity} />)}
            </div>
          </div>
        )}
      </section>

      <section className={`history-section reference-history energy-history ${historyOpen ? 'open' : 'collapsed'}`}>
        <button type="button" className="history-title-row" onClick={() => setHistoryOpen((open) => !open)} aria-expanded={historyOpen}>
          <div><h2>Activity Timeline</h2><span>{history.length} updates</span></div>
          <Icon name={historyOpen ? 'chevronUp' : 'chevronDown'} size={19} />
        </button>

        {historyOpen && (
          <>
            <div className="history-tools reference-history-tools">
              <div className="history-filters reference-tabs">
                {filters.map((item) => (
                  <button type="button" key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>
                    {item}{counts[item] > 0 && item !== 'All' ? ` (${counts[item]})` : ''}
                  </button>
                ))}
              </div>
              <div className="add-note-row reference-note-input"><span className="note-avatar">PS</span><input value={note} onChange={(event) => setNote(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') addNote(); }} placeholder="Add an internal note…" /><button type="button" onClick={addNote} disabled={!note.trim()}>Add note</button></div>
            </div>

            <div className="history-summary-row">
              <span className="change-count">{changeCount} {changeCount === 1 ? 'CHANGE' : 'CHANGES'}</span>
              <button type="button" className="show-all-control" onClick={() => setExpandAll((value) => !value)}><Icon name="sort" size={16} />{expandAll ? 'Show less' : 'Show all'}</button>
            </div>

            <div className="history-timeline reference-timeline">
              {filteredHistory.length ? filteredHistory.map((item) => {
                const isNote = item.category === 'Notes';
                const isChange = item.category === 'Changelog';
                return (
                  <article className={`history-item ${isChange ? 'change-event' : ''}`} key={item.id}>
                    <div className="history-marker"><span><Icon name={item.icon} size={16} /></span></div>
                    <div className={`history-card ${isNote ? 'note-card reference-note-card' : ''} ${isChange ? 'plain-event' : ''}`}>
                      {isNote ? (
                        <>
                          <div className="note-card-meta"><small>{item.meta}</small><div><button type="button">Add a comment</button><button type="button" className="icon-btn borderless" aria-label="Pin note"><Icon name="pin" size={17} /></button><button type="button" className="icon-btn borderless" aria-label="Note actions"><Icon name="more" /></button></div></div>
                          <p className="note-card-content">{item.title}</p>
                          {expandAll && item.detail && <p className="note-card-detail">{item.detail}</p>}
                        </>
                      ) : (
                        <>
                          <div className="history-card-top"><strong>{item.title}</strong>{!isChange && <button type="button" className="icon-btn borderless"><Icon name="more" /></button>}</div>
                          <small>{item.meta}</small>
                          {(expandAll || !isChange) && item.detail && <p>{item.detail}</p>}
                        </>
                      )}
                    </div>
                  </article>
                );
              }) : <div className="empty-history">No {filter.toLowerCase()} available for this deal.</div>}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
function ActivityModal({ onClose, onSave }) {
  const types = ['Call', 'Meeting', 'Email', 'Task', 'Deadline', 'Lunch'];
  const [form, setForm] = useState({
    title: 'Follow-up consultation',
    type: 'Meeting',
    date: '2026-08-04',
    start: '11:30',
    end: '12:15',
    priority: 'High',
    reminder: '30 minutes before',
    assignedTo: 'Priya Sharma',
    participants: 'Chinmay Jindal',
    location: 'Google Meet',
    description: 'Review the confirmed requirements and align on the proposal timeline.',
  });
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <section className="activity-modal" role="dialog" aria-modal="true" aria-labelledby="schedule-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="modal-header"><div><span>Deal activity</span><h2 id="schedule-title">Schedule an activity</h2></div><button type="button" className="icon-btn borderless" onClick={onClose}><Icon name="close" /></button></header>
        <div className="modal-grid">
          <div className="activity-form-area">
            <label className="modal-field title-field"><span>Activity title</span><input value={form.title} onChange={(event) => set('title', event.target.value)} /></label>
            <div className="type-picker">{types.map((type) => <button type="button" key={type} className={form.type === type ? 'active' : ''} onClick={() => set('type', type)}>{type}</button>)}</div>
            <div className="modal-form-grid">
              <label className="modal-field"><span>Date</span><input type="date" value={form.date} onChange={(event) => set('date', event.target.value)} /></label>
              <label className="modal-field"><span>Start time</span><input type="time" value={form.start} onChange={(event) => set('start', event.target.value)} /></label>
              <label className="modal-field"><span>End time</span><input type="time" value={form.end} onChange={(event) => set('end', event.target.value)} /></label>
              <label className="modal-field"><span>Priority</span><select value={form.priority} onChange={(event) => set('priority', event.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label>
              <label className="modal-field"><span>Reminder</span><select value={form.reminder} onChange={(event) => set('reminder', event.target.value)}><option>At start time</option><option>15 minutes before</option><option>30 minutes before</option><option>1 hour before</option><option>1 day before</option></select></label>
              <label className="modal-field"><span>Assigned to</span><select value={form.assignedTo} onChange={(event) => set('assignedTo', event.target.value)}><option>Priya Sharma</option><option>Arjun Mehta</option><option>Kavya Singh</option></select></label>
              <label className="modal-field"><span>Participant</span><input value={form.participants} onChange={(event) => set('participants', event.target.value)} /></label>
              <label className="modal-field"><span>Location / video call</span><input value={form.location} onChange={(event) => set('location', event.target.value)} /></label>
              <label className="modal-field full"><span>Description</span><textarea rows="5" value={form.description} onChange={(event) => set('description', event.target.value)} /></label>
            </div>
          </div>
          <aside className="day-preview">
            <div className="preview-date"><button type="button">‹</button><div><strong>Tuesday</strong><span>04 August 2026</span></div><button type="button">›</button></div>
            <div className="day-hours">
              {['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'].map((hour) => <div className="hour-row" key={hour}><span>{hour}</span><i /></div>)}
              <div className="preview-event" style={{ top: '166px' }}><strong>{form.type}: {form.title || 'Untitled activity'}</strong><span>{form.start}–{form.end}</span></div>
            </div>
          </aside>
        </div>
        <footer className="modal-footer"><label><input type="checkbox" defaultChecked />Set as next activity</label><div><button type="button" className="btn neutral" onClick={onClose}>Cancel</button><button type="button" className="btn primary" onClick={() => onSave(form)}>Save Activity</button></div></footer>
      </section>
    </div>
  );
}


function DealProductsModalLegacy({ deal, mode = 'products', onClose, onSave }) {
  const [items, setItems] = useState(() => (deal.products || []).map((item) => ({
    active: item.active !== false,
    billingType: item.billingType || 'One-time',
    billingStartDate: item.billingStartDate || '',
    quantity: Number(item.quantity) || 1,
    unitPrice: Number(item.unitPrice) || 0,
    discount: Number(item.discount) || 0,
    tax: Number(item.tax) || 0,
    service: item.service || deal.projectNeeds?.[0] || 'Other',
    ...item,
  })));
  const [amountsAre, setAmountsAre] = useState('Tax exclusive');
  const [currency] = useState('Indian Rupee (INR)');
  const [catalogOpen, setCatalogOpen] = useState(true);

  const suggestions = useMemo(() => (deal.projectNeeds || []).flatMap((service) =>
    (suggestedProductsByService[service] || []).map((product) => ({ ...product, service }))), [deal.projectNeeds]);

  const calculateLine = (item) => {
    const base = Math.max(0, Number(item.quantity) || 0) * Math.max(0, Number(item.unitPrice) || 0);
    const discountAmount = base * Math.min(100, Math.max(0, Number(item.discount) || 0)) / 100;
    const afterDiscount = base - discountAmount;
    const taxRate = Math.min(100, Math.max(0, Number(item.tax) || 0));
    const taxAmount = amountsAre === 'Tax inclusive'
      ? afterDiscount - (afterDiscount / (1 + (taxRate / 100 || 0)))
      : afterDiscount * taxRate / 100;
    const total = amountsAre === 'Tax inclusive' ? afterDiscount : afterDiscount + taxAmount;
    return { base, discountAmount, taxAmount: Number.isFinite(taxAmount) ? taxAmount : 0, total };
  };

  const totals = useMemo(() => items.filter((item) => item.active !== false).reduce((sum, item) => {
    const line = calculateLine(item);
    return {
      subtotal: sum.subtotal + line.base,
      discount: sum.discount + line.discountAmount,
      tax: sum.tax + line.taxAmount,
      total: sum.total + line.total,
    };
  }, { subtotal: 0, discount: 0, tax: 0, total: 0 }), [items, amountsAre]);

  const updateItem = (id, key, value) => setItems((current) => current.map((item) => item.id === id ? { ...item, [key]: value } : item));
  const removeItem = (id) => setItems((current) => current.filter((item) => item.id !== id));
  const addItem = (product = {}) => {
    setItems((current) => [...current, {
      id: `product-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: product.name || 'New product or service',
      service: product.service || deal.projectNeeds?.[0] || 'Other',
      billingType: product.billingType || 'One-time',
      billingStartDate: product.billingStartDate || '',
      quantity: 1,
      unitPrice: Number(product.unitPrice) || 0,
      discount: 0,
      tax: 18,
      active: true,
    }]);
  };
  const isAdded = (name) => items.some((item) => item.name === name);
  const save = (createInvoice) => onSave({
    items,
    amountsAre,
    currency,
    totals,
    createInvoice,
  });

  return (
    <div className="modal-backdrop billing-backdrop" onMouseDown={onClose} role="presentation">
      <section className="deal-billing-modal" role="dialog" aria-modal="true" aria-labelledby="deal-billing-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className={`billing-header ${mode === 'invoice' ? 'invoice-only-header' : ''}`}>
          <div>
            {mode === 'invoice' ? (
              <h2 id="deal-billing-title">Invoice</h2>
            ) : (
              <>
                <span>Deal products & services</span>
                <h2 id="deal-billing-title">Build the commercial scope</h2>
                <p>{deal.title}</p>
              </>
            )}
          </div>
          <button type="button" className="icon-btn borderless" onClick={onClose} aria-label="Close"><Icon name="close" size={21} /></button>
        </header>

        {mode !== 'invoice' && (
          <div className="billing-context">
            <div className="billing-context-copy">
              <span className="context-icon"><Icon name="target" size={18} /></span>
              <div><strong>Specific to this deal</strong><p>Products and invoice lines are built from this deal&apos;s selected project requirements.</p></div>
            </div>
            <div className="requirement-chips">{(deal.projectNeeds || []).map((service) => <span key={service}>{service}</span>)}</div>
          </div>
        )}

        <div className={`billing-body ${mode === 'invoice' ? 'invoice-body-mode' : ''}`}>
          <main className="billing-editor">
            <div className="billing-toolbar">
              <label><span>Deal currency</span><span className="billing-select-wrap"><select value={currency} disabled><option>Indian Rupee (INR)</option></select><Icon name="chevronDown" size={16} /></span></label>
              <label><span>Amounts are</span><span className="billing-select-wrap"><select value={amountsAre} onChange={(event) => setAmountsAre(event.target.value)}><option>Tax exclusive</option><option>Tax inclusive</option></select><Icon name="chevronDown" size={16} /></span></label>
              <div className="billing-toolbar-note"><Icon name="lock" size={14} /><span>Currency follows the deal</span></div>
            </div>

            {mode !== 'invoice' && (
              <section className="suggested-products">
                <button type="button" className="suggested-heading" onClick={() => setCatalogOpen((open) => !open)}>
                  <div><strong>Suggested from project requirements</strong><span>Add relevant services without rebuilding the scope manually.</span></div>
                  <Icon name="chevronDown" size={17} />
                </button>
                {catalogOpen && <div className="suggestion-grid">
                  {suggestions.map((product) => (
                    <button type="button" key={`${product.service}-${product.name}`} className={`suggestion-card ${isAdded(product.name) ? 'added' : ''}`} onClick={() => !isAdded(product.name) && addItem(product)} disabled={isAdded(product.name)}>
                      <span className={`service-mark ${serviceTone[product.service] || 'blue'}`}>{product.service.charAt(0)}</span>
                      <span><strong>{product.name}</strong><small>{product.service} · {product.billingType}</small></span>
                      <b>{isAdded(product.name) ? 'Added' : formatINR(product.unitPrice)}</b>
                    </button>
                  ))}
                </div>}
              </section>
            )}

            <section className="deal-items-section">
              <div className="deal-items-heading">
                <div><h3>Deal items</h3><span>{items.length} {items.length === 1 ? 'item' : 'items'} · editable before invoicing</span></div>
                <button type="button" className="btn neutral add-product-button" onClick={() => addItem()}><Icon name="plus" size={16} />Add product</button>
              </div>

              <div className="deal-items-table">
                <div className="deal-items-columns"><span>Product or service</span><span>{mode === 'invoice' ? 'Billing start date' : 'Billing'}</span><span>Qty</span><span>Unit price</span><span>Discount</span><span>Tax</span><span>Amount</span><span /></div>
                {items.length ? items.map((item) => {
                  const line = calculateLine(item);
                  return (
                    <article className={`deal-item-row ${item.active === false ? 'inactive' : ''}`} key={item.id}>
                      <div className="product-cell">
                        <label className="item-toggle" title={item.active === false ? 'Excluded from invoice' : 'Included in invoice'}><input type="checkbox" checked={item.active !== false} onChange={(event) => updateItem(item.id, 'active', event.target.checked)} /><span /></label>
                        <div className={`product-fields ${mode === 'invoice' ? 'invoice-product-fields' : ''}`}><input value={item.name} onChange={(event) => updateItem(item.id, 'name', event.target.value)} aria-label="Product name" />{mode !== 'invoice' && <select value={item.service} onChange={(event) => updateItem(item.id, 'service', event.target.value)} aria-label="Linked project requirement">{[...(deal.projectNeeds || []), 'Other'].map((service) => <option key={service}>{service}</option>)}</select>}</div>
                      </div>
                      {mode === 'invoice' ? <input className="billing-start-date" type="date" value={item.billingStartDate || ''} onChange={(event) => updateItem(item.id, 'billingStartDate', event.target.value)} aria-label="Billing start date" /> : <select value={item.billingType} onChange={(event) => updateItem(item.id, 'billingType', event.target.value)} aria-label="Billing type"><option>One-time</option><option>Milestone</option><option>Recurring</option></select>}
                      <input type="number" min="0" value={item.quantity} onChange={(event) => updateItem(item.id, 'quantity', event.target.value)} aria-label="Quantity" />
                      <div className="money-input"><span>₹</span><input type="number" min="0" value={item.unitPrice} onChange={(event) => updateItem(item.id, 'unitPrice', event.target.value)} aria-label="Unit price" /></div>
                      <div className="percent-input"><input type="number" min="0" max="100" value={item.discount} onChange={(event) => updateItem(item.id, 'discount', event.target.value)} aria-label="Discount" /><span>%</span></div>
                      <div className="percent-input"><input type="number" min="0" max="100" value={item.tax} onChange={(event) => updateItem(item.id, 'tax', event.target.value)} aria-label="Tax" /><span>%</span></div>
                      <strong className="line-total">{formatINR(line.total)}</strong>
                      <button type="button" className="icon-btn borderless remove-product" onClick={() => removeItem(item.id)} aria-label="Remove product"><Icon name="trash" size={16} /></button>
                    </article>
                  );
                }) : <div className="empty-deal-items"><Icon name="invoice" size={24} /><strong>No deal items yet</strong><span>Add a suggested service or create a custom product.</span></div>}
              </div>
            </section>
          </main>

          <aside className={`invoice-preview ${mode === 'invoice' ? 'invoice-preview-wide' : ''}`}>
            <div className="invoice-preview-card">
              <div className="invoice-summary-copy">
                <span className="preview-kicker">Summary</span>
                <h3>{deal.organization}</h3>
                <p>{deal.title}</p>
                <div className="preview-stat included-products"><span>Included products</span><strong>{items.filter((item) => item.active !== false).length}</strong></div>
              </div>
              <div className="invoice-summary-totals">
                <div className="preview-total-row"><span>Subtotal</span><strong>{formatINR(totals.subtotal)}</strong></div>
                <div className="preview-total-row muted"><span>Discount</span><strong>− {formatINR(totals.discount)}</strong></div>
                <div className="preview-total-row muted"><span>Tax</span><strong>{formatINR(totals.tax)}</strong></div>
                <div className="preview-grand-total"><span>Invoice total</span><strong>{formatINR(totals.total)}</strong></div>
              </div>
            </div>
          </aside>
        </div>

        <footer className="billing-footer">
          <div><Icon name="invoice" size={16} /><span>Saving updates this deal only. Related deals keep their own products and requirements.</span></div>
          <div className="billing-footer-actions"><button type="button" className="btn neutral" onClick={onClose}>Cancel</button><button type="button" className="btn neutral save-products" onClick={() => save(false)} disabled={!items.length}>Save deal items</button><button type="button" className="btn primary" onClick={() => save(true)} disabled={!items.some((item) => item.active !== false)}>{mode === 'invoice' ? 'Create Invoice' : 'Save & Create Invoice'}</button></div>
        </footer>
      </section>
    </div>
  );
}


/* eslint-disable react-hooks/refs */
function InvoiceRichTextEditor({ value, onChange, maxLength = 2000 }) {
  const editorRef = useRef(null);
  const plainLength = (html = '') => {
    if (typeof document === 'undefined') return String(html).replace(/<[^>]*>/g, '').length;
    const div = document.createElement('div');
    div.innerHTML = html;
    return (div.textContent || div.innerText || '').length;
  };
  const [count, setCount] = useState(() => plainLength(value));

  const syncValue = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const textLength = (editor.textContent || '').length;
    if (textLength > maxLength) {
      document.execCommand('undo');
      return;
    }
    setCount(textLength);
    onChange(editor.innerHTML);
  };

  const runCommand = (command, commandValue = null) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand(command, false, commandValue);
    syncValue();
  };

  const addLink = () => {
    const selection = window.getSelection?.();
    const selectedText = selection?.toString?.() || '';
    const url = window.prompt('Enter link URL', 'https://');
    if (!url) return;
    if (selectedText) runCommand('createLink', url);
    else {
      const label = window.prompt('Link text', url) || url;
      runCommand('insertHTML', `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`);
    }
  };

  const toolbarButton = (label, title, action, className = '') => (
    <button
      type="button"
      className={`invoice-editor-tool ${className}`}
      title={title}
      aria-label={title}
      onMouseDown={(event) => event.preventDefault()}
      onClick={action}
    >{label}</button>
  );

  return (
    <div className="invoice-rich-editor">
      <div
        ref={editorRef}
        className="invoice-rich-editor-area"
        contentEditable
        suppressContentEditableWarning
        data-placeholder="Add product description, scope, terms or notes..."
        dangerouslySetInnerHTML={{ __html: value || '' }}
        onInput={syncValue}
      />
      <div className="invoice-description-toolbar">
        <div className="invoice-editor-tools">
          {toolbarButton(<strong>B</strong>, 'Bold', () => runCommand('bold'))}
          {toolbarButton(<em>I</em>, 'Italic', () => runCommand('italic'))}
          {toolbarButton(<span className="underline-tool">U</span>, 'Underline', () => runCommand('underline'))}
          {toolbarButton(<Icon name="listOrdered" size={17} />, 'Numbered list', () => runCommand('insertOrderedList'))}
          {toolbarButton(<Icon name="listBullets" size={17} />, 'Bulleted list', () => runCommand('insertUnorderedList'))}
          {toolbarButton(<Icon name="link" size={17} />, 'Insert link', addLink)}
        </div>
        <small>{Math.max(0, maxLength - count)} characters left</small>
      </div>
    </div>
  );
}
/* eslint-enable react-hooks/refs */


function InvoiceWorkspaceModal({ deal, onClose, onSave }) {
  const currencies = [
    'Indian Rupee (INR)', 'UAE Dirham (AED)', 'US Dollar (USD)', 'Euro (EUR)', 'British Pound (GBP)',
    'Australian Dollar (AUD)', 'Canadian Dollar (CAD)', 'Singapore Dollar (SGD)', 'Swiss Franc (CHF)',
    'Japanese Yen (JPY)', 'Chinese Yuan (CNY)', 'Hong Kong Dollar (HKD)', 'New Zealand Dollar (NZD)',
    'Saudi Riyal (SAR)', 'Qatari Riyal (QAR)', 'Kuwaiti Dinar (KWD)', 'Bahraini Dinar (BHD)', 'Omani Rial (OMR)',
    'Bangladeshi Taka (BDT)', 'Nepalese Rupee (NPR)', 'Sri Lankan Rupee (LKR)', 'Pakistani Rupee (PKR)',
    'South African Rand (ZAR)', 'Malaysian Ringgit (MYR)', 'Thai Baht (THB)', 'Indonesian Rupiah (IDR)',
    'Philippine Peso (PHP)', 'South Korean Won (KRW)', 'Turkish Lira (TRY)', 'Israeli New Shekel (ILS)',
    'Mexican Peso (MXN)', 'Brazilian Real (BRL)', 'Danish Krone (DKK)', 'Norwegian Krone (NOK)',
    'Swedish Krona (SEK)', 'Polish Zloty (PLN)', 'Czech Koruna (CZK)', 'Hungarian Forint (HUF)',
    'Afghan Afghani (AFN)', 'Albanian Lek (ALL)', 'Algerian Dinar (DZD)', 'Angolan Kwanza (AOA)',
    'Argentine Peso (ARS)', 'Armenian Dram (AMD)', 'Aruban Guilder (AWG)', 'Azerbaijani Manat (AZN)',
    'Bahamian Dollar (BSD)', 'Barbadian Dollar (BBD)', 'Belize Dollar (BZD)'
  ];
  const taxModes = [
    { value: 'Tax inclusive', title: 'Tax inclusive', detail: 'Tax is included in product price and in deal value.' },
    { value: 'Tax exclusive', title: 'Tax exclusive', detail: 'Tax is not included in product price. Tax is added to the total amount.' },
    { value: 'No tax', title: 'No tax', detail: 'Tax is not included.' },
  ];
  const billingFrequencies = ['One time', 'Weekly', 'Monthly', 'Quarterly', 'Every 6 months', 'Annually'];

  const [items, setItems] = useState(() => (deal.products || []).map((item) => ({
    active: item.active !== false,
    billingStartDate: item.billingStartDate || '',
    billingFrequency: item.billingFrequency || (item.billingType === 'Recurring' ? 'Monthly' : 'One time'),
    quantity: Number(item.quantity) || 1,
    unitPrice: Number(item.unitPrice) || 0,
    discount: Number(item.discount) || 0,
    discountType: item.discountType || 'Percentage',
    tax: Number(item.tax) || 0,
    description: item.description || '',
    ...item,
  })));
  const [currency, setCurrency] = useState('Indian Rupee (INR)');
  const [amountsAre, setAmountsAre] = useState('Tax inclusive');
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currencySearch, setCurrencySearch] = useState('');
  const [amountsOpen, setAmountsOpen] = useState(false);
  const [expandedIds, setExpandedIds] = useState([]);
  const [summaryTab, setSummaryTab] = useState('Summary');
  const [additionalDiscounts, setAdditionalDiscounts] = useState([]);
  const [discountOpen, setDiscountOpen] = useState(false);
  const [discountDraft, setDiscountDraft] = useState({ description: '', type: 'Percentage', amount: '' });
  const [draggedItemId, setDraggedItemId] = useState(null);

  const currencyCode = currency.match(/\(([^)]+)\)$/)?.[1] || 'INR';
  const money = (value) => {
    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency', currency: currencyCode, maximumFractionDigits: 2,
      }).format(Number(value) || 0);
    } catch {
      return `${currencyCode} ${(Number(value) || 0).toFixed(2)}`;
    }
  };

  const updateItem = (id, key, value) => setItems((current) => current.map((item) => item.id === id ? { ...item, [key]: value } : item));
  const removeItem = (id) => setItems((current) => current.filter((item) => item.id !== id));
  const reorderItem = (sourceId, targetId, placeAfter = false) => setItems((current) => {
    if (!sourceId || !targetId || sourceId === targetId) return current;
    const sourceIndex = current.findIndex((item) => item.id === sourceId);
    if (sourceIndex < 0) return current;
    const next = [...current];
    const [moved] = next.splice(sourceIndex, 1);
    const targetIndex = next.findIndex((item) => item.id === targetId);
    if (targetIndex < 0) return current;
    next.splice(targetIndex + (placeAfter ? 1 : 0), 0, moved);
    return next;
  });
  const addItem = () => setItems((current) => [...current, {
    id: `invoice-product-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: '', active: true, billingStartDate: '', billingFrequency: 'One time', quantity: 1,
    unitPrice: 0, discount: 0, discountType: 'Percentage', tax: amountsAre === 'No tax' ? 0 : 18, description: '',
  }]);

  const calculateLine = (item) => {
    const base = Math.max(0, Number(item.quantity) || 0) * Math.max(0, Number(item.unitPrice) || 0);
    const rawDiscount = Math.max(0, Number(item.discount) || 0);
    const discountAmount = item.discountType === 'Fixed'
      ? Math.min(base, rawDiscount)
      : base * Math.min(100, rawDiscount) / 100;
    const afterDiscount = Math.max(0, base - discountAmount);
    const taxRate = amountsAre === 'No tax' ? 0 : Math.min(100, Math.max(0, Number(item.tax) || 0));
    const taxAmount = amountsAre === 'Tax inclusive' && taxRate > 0
      ? afterDiscount - (afterDiscount / (1 + taxRate / 100))
      : amountsAre === 'Tax exclusive'
        ? afterDiscount * taxRate / 100
        : 0;
    const total = amountsAre === 'Tax exclusive' ? afterDiscount + taxAmount : afterDiscount;
    return { base, discountAmount, afterDiscount, taxAmount, total };
  };

  const lineTotals = useMemo(() => items.filter((item) => item.active !== false).reduce((sum, item) => {
    const line = calculateLine(item);
    return {
      subtotal: sum.subtotal + line.base,
      productDiscount: sum.productDiscount + line.discountAmount,
      tax: sum.tax + line.taxAmount,
      total: sum.total + line.total,
    };
  }, { subtotal: 0, productDiscount: 0, tax: 0, total: 0 }), [items, amountsAre]);

  const eligibleAdditionalBase = useMemo(() => items.filter((item) => item.active !== false && item.billingFrequency === 'One time')
    .reduce((sum, item) => sum + calculateLine(item).total, 0), [items, amountsAre]);
  const additionalDiscountTotal = additionalDiscounts.reduce((sum, discount) => {
    const amount = Math.max(0, Number(discount.amount) || 0);
    return sum + (discount.type === 'Fixed' ? amount : eligibleAdditionalBase * Math.min(100, amount) / 100);
  }, 0);
  const finalTotal = Math.max(0, lineTotals.total - additionalDiscountTotal);
  const totals = { ...lineTotals, additionalDiscount: additionalDiscountTotal, total: finalTotal };

  const revenue = useMemo(() => {
    let mrr = 0;
    let tcv = 0;
    items.filter((item) => item.active !== false).forEach((item) => {
      const amount = calculateLine(item).total;
      tcv += amount;
      const factor = {
        Weekly: 52 / 12,
        Monthly: 1,
        Quarterly: 1 / 3,
        'Every 6 months': 1 / 6,
        Annually: 1 / 12,
      }[item.billingFrequency] || 0;
      mrr += amount * factor;
    });
    const arr = mrr * 12;
    const oneTime = items.filter((item) => item.active !== false && item.billingFrequency === 'One time')
      .reduce((sum, item) => sum + calculateLine(item).total, 0);
    return { mrr, arr, acv: arr + oneTime, tcv };
  }, [items, amountsAre]);

  const filteredCurrencies = currencies.filter((item) => item.toLowerCase().includes(currencySearch.toLowerCase().trim()));
  const allExpanded = items.length > 0 && expandedIds.length === items.length;
  const toggleAll = () => setExpandedIds(allExpanded ? [] : items.map((item) => item.id));
  const toggleExpanded = (id) => setExpandedIds((current) => current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]);
  const saveDiscount = () => {
    if (!discountDraft.amount) return;
    setAdditionalDiscounts((current) => [...current, { ...discountDraft, id: `discount-${Date.now()}` }]);
    setDiscountDraft({ description: '', type: 'Percentage', amount: '' });
    setDiscountOpen(false);
  };
  const saveDealItems = () => onSave({ items, amountsAre, currency, totals, createInvoice: false });
  const saveInvoice = () => onSave({ items, amountsAre, currency, totals, createInvoice: true });

  return (
    <div className="modal-backdrop billing-backdrop" onMouseDown={onClose} role="presentation">
      <section className="invoice-reference-modal" role="dialog" aria-modal="true" aria-labelledby="invoice-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="invoice-reference-header">
          <h2 id="invoice-title">Invoice</h2>
          <button type="button" className="icon-btn borderless" onClick={onClose} aria-label="Close"><Icon name="close" size={21} /></button>
        </header>

        <div className="invoice-reference-tabs"><button type="button" className="active">Products ({items.length})</button></div>

        <div className="invoice-reference-scroll">
          <section className="invoice-reference-toolbar">
            <label className="invoice-field-group">
              <span>Deal currency</span>
              <div className="invoice-custom-select">
                <button type="button" className="invoice-select-trigger" onClick={() => { setCurrencyOpen((open) => !open); setAmountsOpen(false); }}>
                  <span>{currency}</span><Icon name="chevronDown" size={15} />
                </button>
                {currencyOpen && <div className="invoice-select-menu currency-menu">
                  <label className="invoice-select-search"><Icon name="search" size={16} /><input autoFocus value={currencySearch} onChange={(event) => setCurrencySearch(event.target.value)} placeholder="Search currency" /></label>
                  <div className="currency-options">
                    {filteredCurrencies.map((option) => <button type="button" key={option} className={option === currency ? 'selected' : ''} onClick={() => { setCurrency(option); setCurrencyOpen(false); setCurrencySearch(''); }}><span>{option}</span>{option === currency && <Icon name="check" size={15} />}</button>)}
                  </div>
                </div>}
              </div>
            </label>

            <label className="invoice-field-group amounts-field">
              <span>Amounts are</span>
              <div className="invoice-custom-select">
                <button type="button" className="invoice-select-trigger" onClick={() => { setAmountsOpen((open) => !open); setCurrencyOpen(false); }}>
                  <span>{amountsAre}</span><Icon name="chevronDown" size={15} />
                </button>
                {amountsOpen && <div className="invoice-select-menu tax-mode-menu">
                  {taxModes.map((mode) => <button type="button" key={mode.value} className={mode.value === amountsAre ? 'selected' : ''} onClick={() => { setAmountsAre(mode.value); setAmountsOpen(false); if (mode.value === 'No tax') setItems((current) => current.map((item) => ({ ...item, tax: 0 }))); }}>
                    <span><strong>{mode.title}</strong><small>{mode.detail}</small></span>{mode.value === amountsAre && <Icon name="check" size={16} />}
                  </button>)}
                </div>}
              </div>
              <button type="button" className="tax-settings-link">Change tax settings</button>
            </label>
          </section>

          <section className="invoice-products-section">
            <div className="invoice-product-header">
              <span>Products</span><span>Billing start date</span><span>Price</span><span>Quantity</span><span>Discount</span><span>Tax %</span><span>Amount</span><button type="button" onClick={toggleAll}>{allExpanded ? 'Collapse all' : 'Expand all'}</button>
            </div>

            <div className="invoice-products-list">
              {items.map((item) => {
                const line = calculateLine(item);
                const expanded = expandedIds.includes(item.id);
                return <article
                  className={`invoice-product-line ${expanded ? 'expanded' : ''} ${draggedItemId === item.id ? 'dragging' : ''}`}
                  key={item.id}
                  onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; }}
                  onDrop={(event) => {
                    event.preventDefault();
                    const sourceId = event.dataTransfer.getData('text/plain') || draggedItemId;
                    const rect = event.currentTarget.getBoundingClientRect();
                    const placeAfter = event.clientY > rect.top + rect.height / 2;
                    reorderItem(sourceId, item.id, placeAfter);
                    setDraggedItemId(null);
                  }}
                >
                  <div className="invoice-product-main-grid">
                    <div className="invoice-product-name-cell">
                      <button
                        type="button"
                        className="invoice-drag-handle"
                        draggable
                        title="Drag to reorder product"
                        aria-label={`Drag ${item.name || 'product'} to reorder`}
                        onDragStart={(event) => {
                          setDraggedItemId(item.id);
                          event.dataTransfer.effectAllowed = 'move';
                          event.dataTransfer.setData('text/plain', item.id);
                        }}
                        onDragEnd={() => setDraggedItemId(null)}
                      >
                        <span />
                        <span />
                        <span />
                      </button>
                      <label className="item-toggle"><input type="checkbox" checked={item.active !== false} onChange={(event) => updateItem(item.id, 'active', event.target.checked)} /><span /></label>
                      <input value={item.name} onChange={(event) => updateItem(item.id, 'name', event.target.value)} placeholder="Start typing to search" aria-label="Product" />
                    </div>
                    <input className="invoice-date-input" type="date" value={item.billingStartDate || ''} onChange={(event) => updateItem(item.id, 'billingStartDate', event.target.value)} aria-label="Billing start date" />
                    <input className="invoice-number-input" type="number" min="0" value={item.unitPrice} onChange={(event) => updateItem(item.id, 'unitPrice', event.target.value)} aria-label="Price" />
                    <input className="invoice-number-input" type="number" min="0" value={item.quantity} onChange={(event) => updateItem(item.id, 'quantity', event.target.value)} aria-label="Quantity" />
                    <div className="invoice-discount-input">
                      <select value={item.discountType} onChange={(event) => updateItem(item.id, 'discountType', event.target.value)} aria-label="Discount type"><option value="Percentage">%</option><option value="Fixed">{currencyCode}</option></select>
                      <input type="number" min="0" value={item.discount} onChange={(event) => updateItem(item.id, 'discount', event.target.value)} aria-label="Discount amount" />
                    </div>
                    <input className="invoice-number-input" type="number" min="0" max="100" disabled={amountsAre === 'No tax'} value={amountsAre === 'No tax' ? 0 : item.tax} onChange={(event) => updateItem(item.id, 'tax', event.target.value)} aria-label="Tax percentage" />
                    <strong className="invoice-line-amount">{money(line.total)}</strong>
                    <div className="invoice-line-actions">
                      <button type="button" className="icon-btn borderless" title="Description" onClick={() => toggleExpanded(item.id)}><Icon name="note" size={16} /></button>
                      <button type="button" className="icon-btn borderless" title="Remove" onClick={() => removeItem(item.id)}><Icon name="trash" size={16} /></button>
                    </div>
                  </div>
                  <div className="invoice-product-subrow">
                    <label>Billing frequency
                      <select value={item.billingFrequency} onChange={(event) => updateItem(item.id, 'billingFrequency', event.target.value)}>{billingFrequencies.map((frequency) => <option key={frequency}>{frequency}</option>)}</select>
                    </label>
                    <span>TCV: {money(line.total)}</span>
                  </div>
                  {expanded && <div className="invoice-product-description">
                    <InvoiceRichTextEditor value={item.description} onChange={(description) => updateItem(item.id, 'description', description)} maxLength={2000} />
                  </div>}
                </article>;
              })}
            </div>

            <div className="invoice-add-product-row"><button type="button" className="btn neutral" onClick={addItem}><Icon name="plus" size={16} />Product</button><span>Products: {items.length} · Total product quantity: {items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)}</span></div>
          </section>

          <section className="invoice-additional-discounts">
            <strong>Additional discounts</strong>
            <p>Additional discounts apply to non-recurring products only.</p>
            <button type="button" onClick={() => setDiscountOpen(true)}><Icon name="plus" size={15} />Add discount</button>
            {additionalDiscounts.length > 0 && <div className="additional-discount-list">{additionalDiscounts.map((discount) => <div key={discount.id}><span>{discount.description || 'Additional discount'}</span><strong>− {discount.type === 'Percentage' ? `${discount.amount}%` : money(discount.amount)}</strong><button type="button" onClick={() => setAdditionalDiscounts((current) => current.filter((item) => item.id !== discount.id))}>×</button></div>)}</div>}
            {discountOpen && <div className="additional-discount-popover">
              <label><span>Discount description</span><input value={discountDraft.description} onChange={(event) => setDiscountDraft((current) => ({ ...current, description: event.target.value }))} /></label>
              <label><span>Discount amount</span><div className="discount-draft-control"><select value={discountDraft.type} onChange={(event) => setDiscountDraft((current) => ({ ...current, type: event.target.value }))}><option value="Percentage">%</option><option value="Fixed">{currencyCode}</option></select><input type="number" min="0" value={discountDraft.amount} onChange={(event) => setDiscountDraft((current) => ({ ...current, amount: event.target.value }))} /></div></label>
              <div><button type="button" className="btn neutral" onClick={() => setDiscountOpen(false)}>Cancel</button><button type="button" className="btn primary" onClick={saveDiscount}>Save</button></div>
            </div>}
          </section>

          <section className="invoice-reference-summary">
            <div className="invoice-summary-tabs"><button type="button" className={summaryTab === 'Summary' ? 'active' : ''} onClick={() => setSummaryTab('Summary')}>Summary</button><button type="button" className={summaryTab === 'Revenue' ? 'active' : ''} onClick={() => setSummaryTab('Revenue')}>Revenue</button></div>
            {summaryTab === 'Summary' ? <div className="invoice-summary-values">
              <div><span>Subtotal excluding tax</span><i /><strong>{money(Math.max(0, lineTotals.subtotal - lineTotals.productDiscount - additionalDiscountTotal))}</strong></div>
              {additionalDiscountTotal > 0 && <div><span>Additional discounts</span><i /><strong>− {money(additionalDiscountTotal)}</strong></div>}
              {amountsAre !== 'No tax' && <div><span>Tax</span><i /><strong>{money(lineTotals.tax)}</strong></div>}
              <div className="total"><span>Total with tax</span><i /><strong>{money(finalTotal)}</strong></div>
            </div> : <div className="invoice-summary-values revenue-values">
              <div><span>Monthly recurring revenue (MRR)</span><i /><strong>{money(revenue.mrr)}</strong></div>
              <div><span>Annual recurring revenue (ARR)</span><i /><strong>{money(revenue.arr)}</strong></div>
              <div><span>Annual contract value (ACV)</span><i /><strong>{money(revenue.acv)}</strong></div>
              <div><span>Total contract value (TCV)</span><i /><strong>{money(revenue.tcv)}</strong></div>
            </div>}
          </section>
        </div>

        <footer className="invoice-reference-footer">
          <button type="button" className="btn neutral" onClick={onClose}>Cancel</button>
          <button type="button" className="btn neutral invoice-save-btn" onClick={saveDealItems} disabled={!items.length}>Save</button>
          <button type="button" className="btn primary create-invoice-btn" onClick={saveInvoice} disabled={!items.some((item) => item.active !== false)}>Create Invoice</button>
        </footer>
      </section>
    </div>
  );
}

function DealBillingModal(props) {
  if (props.mode === 'invoice') return <InvoiceWorkspaceModal {...props} />;
  return <DealProductsModalLegacy {...props} />;
}

function QuickRecordModal({ type, onClose, onSave }) {
  const config = {
    Proposal: { heading: 'Create Proposal', titleLabel: 'Proposal title', title: 'Hotel Jindal Brand & Website Proposal', amountLabel: 'Proposed value', dateLabel: 'Valid until', category: 'Documents', icon: 'proposal' },
    Invoice: { heading: 'Create Invoice', titleLabel: 'Invoice title', title: 'Initial Project Invoice', amountLabel: 'Invoice amount', dateLabel: 'Due date', category: 'Invoices', icon: 'invoice' },
    'Payment Milestone': { heading: 'Add Payment Milestone', titleLabel: 'Milestone name', title: 'Advance payment', amountLabel: 'Milestone amount', dateLabel: 'Expected date', category: 'Changelog', icon: 'milestone' },
  }[type];
  const [form, setForm] = useState({ title: config.title, amount: '₹1,12,000', date: '2026-08-12', description: '' });
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <section className="quick-record-modal" role="dialog" aria-modal="true" aria-labelledby="quick-record-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="modal-header"><div><span>Deal quick action</span><h2 id="quick-record-title">{config.heading}</h2></div><button type="button" className="icon-btn borderless" onClick={onClose}><Icon name="close" /></button></header>
        <div className="quick-record-form">
          <label className="modal-field full"><span>{config.titleLabel}</span><input value={form.title} onChange={(event) => set('title', event.target.value)} /></label>
          <label className="modal-field"><span>{config.amountLabel}</span><input value={form.amount} onChange={(event) => set('amount', event.target.value)} /></label>
          <label className="modal-field"><span>{config.dateLabel}</span><input type="date" value={form.date} onChange={(event) => set('date', event.target.value)} /></label>
          <label className="modal-field full"><span>Notes</span><textarea rows="4" value={form.description} onChange={(event) => set('description', event.target.value)} placeholder="Add any internal notes or client context" /></label>
        </div>
        <footer className="modal-footer"><span className="quick-record-hint"><Icon name={config.icon} size={16} />This will be added to the deal history.</span><div><button type="button" className="btn neutral" onClick={onClose}>Cancel</button><button type="button" className="btn primary" disabled={!form.title.trim()} onClick={() => onSave({ ...form, type, category: config.category, icon: config.icon })}>{config.heading}</button></div></footer>
      </section>
    </div>
  );
}

function NewDealModal({ organization, onClose, onSave }) {
  const [form, setForm] = useState({
    title: `${organization} New Opportunity`,
    projectNeeds: ['Digital Marketing'],
    projectRequirements: { 'Digital Marketing': '' },
    value: '₹0',
    stage: 'New Inquiry',
    assignedTo: 'Priya Sharma',
  });
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const toggleService = (service) => {
    setForm((current) => {
      const exists = current.projectNeeds.includes(service);
      const projectNeeds = exists ? current.projectNeeds.filter((item) => item !== service) : [...current.projectNeeds, service];
      const projectRequirements = { ...current.projectRequirements };
      if (exists) delete projectRequirements[service];
      else projectRequirements[service] = projectRequirements[service] || '';
      return { ...current, projectNeeds, projectRequirements };
    });
  };
  const setRequirement = (service, value) => setForm((current) => ({
    ...current,
    projectRequirements: { ...current.projectRequirements, [service]: value },
  }));

  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <section className="new-deal-modal" role="dialog" aria-modal="true" aria-labelledby="new-deal-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="modal-header"><div><span>{organization}</span><h2 id="new-deal-title">Create a new deal</h2></div><button type="button" className="icon-btn borderless" onClick={onClose}><Icon name="close" /></button></header>
        <div className="new-deal-form">
          <label className="modal-field full"><span>Deal name</span><input value={form.title} onChange={(event) => set('title', event.target.value)} /></label>
          <div className="modal-field full new-deal-requirements">
            <span>Project requirements</span>
            <div className="new-deal-service-picker">
              {projectServiceOptions.map((service) => (
                <button type="button" key={service} className={form.projectNeeds.includes(service) ? 'selected' : ''} onClick={() => toggleService(service)}>
                  {service}<span>{form.projectNeeds.includes(service) ? '✓' : '+'}</span>
                </button>
              ))}
            </div>
            {form.projectNeeds.map((service) => (
              <label className="new-deal-requirement-field" key={service}>
                <span>{service} requirements</span>
                <textarea rows="3" value={form.projectRequirements[service] || ''} onChange={(event) => setRequirement(service, event.target.value)} placeholder={`Add requirements for ${service}`} />
              </label>
            ))}
          </div>
          <label className="modal-field"><span>Deal value</span><input value={form.value} onChange={(event) => set('value', event.target.value)} /></label>
          <label className="modal-field"><span>Stage</span><select value={form.stage} onChange={(event) => set('stage', event.target.value)}>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></label>
          <label className="modal-field"><span>Assigned to</span><select value={form.assignedTo} onChange={(event) => set('assignedTo', event.target.value)}><option>Priya Sharma</option><option>Arjun Mehta</option><option>Kavya Singh</option></select></label>
        </div>
        <footer className="modal-footer new-deal-footer"><span>The organization will be prefilled as {organization}.</span><div><button type="button" className="btn neutral" onClick={onClose}>Cancel</button><button type="button" className="btn primary" onClick={() => onSave(form)} disabled={!form.title.trim() || !form.projectNeeds.length}>Create Deal</button></div></footer>
      </section>
    </div>
  );
}

function Toast({ message }) {
  return <div className="toast"><Icon name="check" size={16} />{message}</div>;
}

export default function DealDetailReference({ selectedDeal, onBack = () => {} }) {
  const [deal, setDeal] = useState(() => mapSelectedDeal(selectedDeal));
  const [status, setStatus] = useState('open');
  const [activities, setActivities] = useState(initialActivities);
  const [history, setHistory] = useState(initialHistory);
  const [activityOpen, setActivityOpen] = useState(false);
  const [newDealOpen, setNewDealOpen] = useState(false);
  const [quickRecordType, setQuickRecordType] = useState('');
  const [billingMode, setBillingMode] = useState('');
  const [relatedDeals, setRelatedDeals] = useState(initialRelatedDeals);
  const [toast, setToast] = useState('');

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.__volymolyToast);
    window.__volymolyToast = window.setTimeout(() => setToast(''), 2600);
  };

  const saveNewDeal = (form) => {
    const newDeal = {
      id: `deal-${Date.now()}`,
      title: form.title.trim(),
      stage: form.stage,
      value: form.value || '₹0',
      projectNeeds: form.projectNeeds,
      projectRequirements: form.projectRequirements,
      current: false,
    };
    setRelatedDeals((items) => [...items, newDeal]);
    setHistory((items) => [{ id: Date.now() + 2, category: 'Changelog', icon: 'deal', title: `New related deal created: ${newDeal.title}`, meta: `Just now · ${form.assignedTo}`, detail: `${newDeal.projectNeeds.join(', ')} · ${newDeal.stage} · ${newDeal.value}` }, ...items]);
    setNewDealOpen(false);
    notify(`New deal created for ${deal.organization}`);
  };

  const openQuickRecord = (type) => {
    if (type === 'Invoice') {
      setBillingMode('invoice');
      return;
    }
    setQuickRecordType(type);
  };

  const saveBilling = ({ items, amountsAre, currency = 'Indian Rupee (INR)', totals, createInvoice }) => {
    const activeItems = items.filter((item) => item.active !== false);
    const currencyCode = currency.match(/\(([^)]+)\)$/)?.[1] || 'INR';
    const formatBillingMoney = (value) => {
      try {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: currencyCode, maximumFractionDigits: 2 }).format(Number(value) || 0);
      } catch {
        return `${currencyCode} ${(Number(value) || 0).toFixed(2)}`;
      }
    };
    setDeal((current) => ({ ...current, products: items, value: formatBillingMoney(totals.subtotal) }));
    setHistory((current) => [{
      id: Date.now() + 4,
      category: createInvoice ? 'Invoices' : 'Changelog',
      icon: createInvoice ? 'invoice' : 'money',
      title: createInvoice ? `Invoice created from ${activeItems.length} deal items` : 'Deal products and services updated',
      meta: 'Just now · Priya Sharma',
      detail: createInvoice
        ? `${formatBillingMoney(totals.total)} · ${amountsAre} · ${activeItems.map((item) => item.name || 'Untitled product').join(', ')}`
        : `${items.length} products · Deal value ${formatBillingMoney(totals.subtotal)}`,
    }, ...current]);
    setBillingMode('');
    notify(createInvoice ? 'Invoice created from deal items' : 'Deal items saved');
  };

  const saveQuickRecord = (form) => {
    const dateLabel = new Date(`${form.date}T12:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const titlePrefix = form.type === 'Payment Milestone' ? 'Payment milestone added' : `${form.type} created`;
    setHistory((items) => [{
      id: Date.now() + 3,
      category: form.category,
      icon: form.icon,
      title: `${titlePrefix}: ${form.title}`,
      meta: 'Just now · Priya Sharma',
      detail: `${form.amount} · ${dateLabel}${form.description ? ` · ${form.description}` : ''}`,
    }, ...items]);
    setQuickRecordType('');
    notify(`${form.type} added to the deal`);
  };

  const saveActivity = (form) => {
    const dateLabel = new Date(`${form.date}T${form.start}`).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
    const activity = {
      id: Date.now(),
      type: form.type,
      title: form.title || 'Untitled activity',
      date: dateLabel,
      detail: form.description,
      owner: form.assignedTo,
      status: 'upcoming',
      scheduledDate: form.date,
      startTime: form.start,
      endTime: form.end,
      priority: form.priority,
      reminder: form.reminder,
      participants: form.participants,
      videoLink: form.videoLink,
    };
    setActivities((items) => [activity, ...items]);
    setHistory((items) => [{ id: Date.now() + 1, category: 'Activities', icon: 'activity', title: `${form.type} scheduled: ${activity.title}`, meta: `Just now · ${form.assignedTo}`, detail: `${dateLabel}${form.location ? ` · ${form.location}` : ''}` }, ...items]);
    setActivityOpen(false);
    notify('Activity scheduled');
  };

  return (
    <div className="deal-detail-reference">
      <div className="app-shell">
        <div className="app-main">
          <DealHeader deal={deal} setDeal={setDeal} status={status} setStatus={setStatus} onBack={onBack} onNewDeal={() => setNewDealOpen(true)} notify={notify} />
          <div className="deal-workspace">
            <DetailPanel deal={deal} setDeal={setDeal} relatedDeals={relatedDeals} onNewDeal={() => setNewDealOpen(true)} onManageProducts={() => setBillingMode('products')} activities={activities} history={history} />
            <MainWorkspace deal={deal} activities={activities} setActivities={setActivities} history={history} setHistory={setHistory} onAddActivity={() => setActivityOpen(true)} onQuickCreate={openQuickRecord} />
          </div>
        </div>
      </div>
      {activityOpen && <ActivitySchedulerModal deal={deal} activities={activities} onClose={() => setActivityOpen(false)} onSave={saveActivity} />}
      {newDealOpen && <NewDealModal organization={deal.organization} onClose={() => setNewDealOpen(false)} onSave={saveNewDeal} />}
      {billingMode && <DealBillingModal deal={deal} mode={billingMode} onClose={() => setBillingMode('')} onSave={saveBilling} />}
      {quickRecordType && <QuickRecordModal type={quickRecordType} onClose={() => setQuickRecordType('')} onSave={saveQuickRecord} />}
      {toast && <Toast message={toast} />}
    </div>
  );
}
