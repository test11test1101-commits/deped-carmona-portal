/**
 * CITY SCHOOLS DIVISION OF CARMONA - OFFICIAL PORTAL SCRIPT
 * Native Vanilla JavaScript (Plugin-Free Architecture)
 * Version: 2.0 (GWDS Compliant)
 */

document.addEventListener('DOMContentLoaded', () => {
  initPSTClock();
  initHeroSlider();
  initIssuancesHub();
  initDocumentTracker();
  initAccessibilitySuite();
  initModals();
  initMobileDrawer();
  initVisitorCounter();
});

/* ==========================================================================
   1. PHILIPPINE STANDARD TIME (PST) LIVE CLOCK (UTC+8)
   ========================================================================== */
function initPSTClock() {
  const clockElement = document.getElementById('pst-live-clock');
  if (!clockElement) return;

  function updateClock() {
    const now = new Date();
    // Convert to Philippine Standard Time (UTC+8)
    const options = {
      timeZone: 'Asia/Manila',
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const formatter = new Intl.DateTimeFormat('en-PH', options);
    clockElement.textContent = formatter.format(now);
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   2. NATIVE HERO CAROUSEL / SLIDER
   ========================================================================== */
function initHeroSlider() {
  const track = document.getElementById('slider-track');
  const slides = document.querySelectorAll('.slide-item');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');

  if (!track || slides.length === 0) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoPlayTimer = null;

  // Generate dots
  dotsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(idx);
      resetAutoPlay();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.slider-dot');

  function updateSlidePosition() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    updateSlidePosition();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

  function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, 6500);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  // Pause on hover
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    sliderContainer.addEventListener('mouseleave', () => startAutoPlay());
  }

  startAutoPlay();
}

/* ==========================================================================
   3. ISSUANCES & MEMORANDUM DATABASE & LIVE SEARCH
   ========================================================================== */
const issuancesData = [
  {
    id: "DM-339-2026",
    number: "DM 339, s. 2026",
    type: "memo",
    typeName: "Division Memorandum",
    date: "October 20, 2026",
    title: "CONDUCT OF INTERNAL AUDIT OF SCHOOL MAINTENANCE AND OTHER OPERATING EXPENSES (MOOE)",
    excerpt: "In the interest of transparency, accountability, and the effective utilization of public funds, an internal audit of the School Maintenance and Other Operating Expenses (MOOE) of Angelo L. Loyola Senior High School shall be conducted on November 9–27, 2026.",
    signatory: "Schools Division Superintendent",
    target: "Public Secondary School Heads, Administrative Officers, Accountants"
  },
  {
    id: "DM-338-2026",
    number: "DM 338, s. 2026",
    type: "memo",
    typeName: "Division Memorandum",
    date: "October 20, 2026",
    title: "NUMBER OF IDENTIFIED ATTENDEES FOR THE 1ST GAWAD DALUB-KANDILI 2026 AWARDING CEREMONY",
    excerpt: "With reference to the Division Memorandum No. 337, s. 2026 entitled '1st Gawad Dalub-Kandili 2026 Awardees,' this Office, through the Division PRAISE Committee, releases the allotment of attendees for the upcoming Awarding Ceremony.",
    signatory: "Division PRAISE Committee / SDS",
    target: "All Division Personnel, Awardees, School Heads"
  },
  {
    id: "DM-337-2026",
    number: "DM 337, s. 2026",
    type: "memo",
    typeName: "Division Memorandum",
    date: "October 19, 2026",
    title: "1ST GAWAD DALUB-KANDILI 2026 OFFICIAL LIST OF AWARDEES",
    excerpt: "This Office, through the Division PRAISE Committee, proudly announces the First Gawad Dalub-Kandili 2026 awardees in recognition of their exemplary performance, dedication, and meaningful contributions to Carmona City learners.",
    signatory: "Schools Division Superintendent",
    target: "All Public Elementary and Secondary Schools"
  },
  {
    id: "DM-336-2026",
    number: "DM 336, s. 2026",
    type: "memo",
    typeName: "Division Memorandum",
    date: "October 16, 2026",
    title: "INSTITUTIONALIZATION OF REGULAR SCHOOL SAFETY DRILLS",
    excerpt: "Pursuant to the Memorandum of the Office of the Undersecretary for Governance and Operations, this Office hereby disseminates the guidelines on school safety drills to strengthen emergency response mechanisms across all Carmona campuses.",
    signatory: "Disaster Risk Reduction and Management Service / SDS",
    target: "SDRRM Coordinators, School Heads, Teaching Staff"
  },
  {
    id: "DM-335-2026",
    number: "DM 335, s. 2026",
    type: "memo",
    typeName: "Division Memorandum",
    date: "October 15, 2026",
    title: "SUBMISSION OF THE FY 2027 ANNUAL IMPLEMENTATION PLAN (AIP) AND WORK FINANCIAL PLAN (WFP)",
    excerpt: "Relative to Division Memorandum No. 302, this Office announces the deadline for submission of the Annual Implementation Plan (AIP) and Work Financial Plan (WFP) for Fiscal Year 2027 for all public schools on or before November 15, 2026.",
    signatory: "School Governance and Operations Division (SGOD)",
    target: "All School Heads, School Planning Teams"
  },
  {
    id: "DM-334-2026",
    number: "DM 334, s. 2026",
    type: "memo",
    typeName: "Division Memorandum",
    date: "October 14, 2026",
    title: "DIVISION-WIDE OBSERVANCE OF GLOBAL HANDWASHING DAY 2026",
    excerpt: "Pursuant to DepEd Order No. 10, s. 2016, titled Policy and Guidelines for the Comprehensive Water, Sanitation, and Hygiene in Schools (WinS) Program, this Office enjoins all public elementary and secondary schools to observe Global Handwashing Day.",
    signatory: "SGOD – School Health and Nutrition Section",
    target: "WinS Coordinators, Teachers, Students"
  },
  {
    id: "DA-042-2026",
    number: "DA 042, s. 2026",
    type: "advisory",
    typeName: "Division Advisory",
    date: "October 12, 2026",
    title: "REGIONAL INVITATION FOR TEACHERS' RESEARCH COLLOQUIUM 2026",
    excerpt: "The Regional Research Committee invites all interested master teachers and researchers to participate in the upcoming Regional Research Colloquium on November 25, 2026 at the Regional Center.",
    signatory: "Curriculum Implementation Division (CID)",
    target: "Master Teachers, Head Teachers, Researchers"
  },
  {
    id: "NOM-019-2026",
    number: "NOM 019, s. 2026",
    type: "meeting",
    typeName: "Notice of Meeting",
    date: "October 10, 2026",
    title: "EMERGENCY COORDINATIVE MEETING OF ALL PUBLIC SECONDARY SCHOOL HEADS",
    excerpt: "Please be informed of an emergency coordinative meeting on October 24, 2026, 9:00 AM at the SDO Carmona Conference Hall regarding the National Learning Recovery Program (NLRP) assessment benchmarks.",
    signatory: "Office of the Schools Division Superintendent",
    target: "All Secondary School Heads and Assistant Principals"
  }
];

function initIssuancesHub() {
  const container = document.getElementById('issuances-list-container');
  const searchInput = document.getElementById('issuance-search-input');
  const tabs = document.querySelectorAll('.issuance-tabs .tab-btn');
  const countBadge = document.getElementById('issuance-count-badge');

  if (!container) return;

  let activeFilter = 'all';
  let searchTerm = '';

  function render() {
    const filtered = issuancesData.filter(item => {
      const matchesTab = activeFilter === 'all' || item.type === activeFilter;
      const matchesSearch = searchTerm === '' ||
        item.title.toLowerCase().includes(searchTerm) ||
        item.number.toLowerCase().includes(searchTerm) ||
        item.excerpt.toLowerCase().includes(searchTerm);
      return matchesTab && matchesSearch;
    });

    if (countBadge) countBadge.textContent = `${filtered.length} found`;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding: 3rem 1rem; color: #64748b;">
          <p style="font-size: 1.1rem; font-weight: 600;">No issuances found matching your query.</p>
          <p style="font-size: 0.85rem; margin-top: 0.35rem;">Try adjusting your keyword or switching filter categories.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => `
      <article class="issuance-card" data-id="${item.id}">
        <div class="issuance-meta">
          <span class="badge-issuance-type ${item.type}">${item.typeName}</span>
          <span class="issuance-date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            ${item.date}
          </span>
        </div>
        <h3 class="issuance-title">
          <a href="javascript:void(0)" onclick="openIssuanceModal('${item.id}')">${item.number} – ${item.title}</a>
        </h3>
        <p class="issuance-excerpt">${item.excerpt}</p>
        <div class="issuance-footer">
          <span class="issuance-publisher">Published by: <strong>${item.signatory}</strong></span>
          <button class="btn-view-issuance" onclick="openIssuanceModal('${item.id}')">
            <span>View Full Details</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </article>
    `).join('');
  }

  // Tab click
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.getAttribute('data-filter');
      render();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      render();
    });
  }

  render();
}

/* Open Issuance Details Modal */
window.openIssuanceModal = function(id) {
  const item = issuancesData.find(i => i.id === id);
  if (!item) return;

  const modal = document.getElementById('issuance-modal');
  const modalContent = document.getElementById('issuance-modal-body');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div style="background: #f8fafc; border-left: 4px solid var(--deped-gold); padding: 1rem 1.25rem; border-radius: 6px; margin-bottom: 1.25rem;">
      <span class="badge-issuance-type ${item.type}">${item.typeName}</span>
      <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--deped-navy); margin: 0.5rem 0 0.25rem;">${item.number}</h3>
      <p style="font-size: 0.95rem; font-weight: 700; color: #334155;">${item.title}</p>
      <div style="font-size: 0.8rem; color: #64748b; margin-top: 0.5rem;">Date Released: <strong>${item.date}</strong> | City of Carmona, Cavite</div>
    </div>

    <div style="margin-bottom: 1.25rem;">
      <h4 style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--deped-navy); margin-bottom: 0.4rem;">Official Summary & Context:</h4>
      <p style="font-size: 0.925rem; line-height: 1.7; color: #1e293b;">${item.excerpt}</p>
    </div>

    <div style="background: #f1f5f9; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.85rem;">
      <div style="margin-bottom: 0.4rem;"><strong>Target Beneficiaries / Recipients:</strong> ${item.target}</div>
      <div><strong>Recommending Approval / Office:</strong> ${item.signatory}</div>
    </div>

    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
      <button class="btn btn-primary" onclick="simulateDownload('${item.number}')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Download Official PDF
      </button>
      <button class="btn" style="background:#e2e8f0; color:#334155;" onclick="window.print()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
        Print Issuance
      </button>
    </div>
  `;

  modal.classList.add('active');
};

window.simulateDownload = function(number) {
  alert(`Initiating verified download for ${number}.\nDocument verified by Schools Division Office of Carmona Records Section.`);
};

/* ==========================================================================
   4. DOCUMENT TRACKING SYSTEM (DTS) ENGINE
   ========================================================================== */
function initDocumentTracker() {
  const trackBtn = document.getElementById('dts-search-btn');
  const trackInput = document.getElementById('dts-track-code');

  if (!trackBtn || !trackInput) return;

  function runTracking() {
    const code = trackInput.value.trim().toUpperCase();
    if (!code) {
      alert("Please enter a valid Document Tracking Number (e.g. SDO-2026-0842).");
      return;
    }

    const modal = document.getElementById('dts-modal');
    const modalBody = document.getElementById('dts-modal-body');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
      <div style="background: #f8fafc; border-radius: 8px; padding: 1.25rem; border: 1px solid #e2e8f0; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-size: 0.75rem; font-weight: 700; color: #0284c7; text-transform: uppercase;">Tracking Number</span>
          <span style="font-size: 0.75rem; background: #dcfce7; color: #15803d; padding: 0.2rem 0.6rem; border-radius: 999px; font-weight: 700;">IN TRANSIT</span>
        </div>
        <h3 style="font-size: 1.3rem; color: var(--deped-navy); font-weight: 800;">${code}</h3>
        <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.25rem;">Subject: Special Order (SO) Endorsement & Service Record Verification</p>
      </div>

      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--deped-navy); margin-bottom: 1rem;">Routing History & Workflow:</h4>
      
      <div style="display: flex; flex-direction: column; gap: 1rem; border-left: 2px solid #cbd5e1; margin-left: 0.75rem; padding-left: 1.25rem;">
        <div style="position: relative;">
          <div style="position: absolute; left: -1.7rem; top: 0; width: 14px; height: 14px; border-radius: 50%; background: #16a34a; border: 3px solid #ffffff;"></div>
          <div style="font-size: 0.85rem; font-weight: 700; color: #1e293b;">Oct 20, 2026 | 02:45 PM</div>
          <div style="font-size: 0.8rem; color: #475569;">Received and Forwarded by: <strong>Records Unit (SDO Carmona)</strong></div>
          <div style="font-size: 0.75rem; color: #64748b;">Remarks: Transmitted for Legal & Administrative Review.</div>
        </div>

        <div style="position: relative;">
          <div style="position: absolute; left: -1.7rem; top: 0; width: 14px; height: 14px; border-radius: 50%; background: #2563eb; border: 3px solid #ffffff;"></div>
          <div style="font-size: 0.85rem; font-weight: 700; color: #1e293b;">Oct 20, 2026 | 04:10 PM</div>
          <div style="font-size: 0.8rem; color: #475569;">Action Officer: <strong>Office of the Assistant Schools Division Superintendent</strong></div>
          <div style="font-size: 0.75rem; color: #64748b;">Status: Signed and Endorsed to the Superintendent.</div>
        </div>

        <div style="position: relative;">
          <div style="position: absolute; left: -1.7rem; top: 0; width: 14px; height: 14px; border-radius: 50%; background: #f59e0b; border: 3px solid #ffffff;"></div>
          <div style="font-size: 0.85rem; font-weight: 700; color: #1e293b;">Oct 21, 2026 | Expected Release</div>
          <div style="font-size: 0.8rem; color: #475569;">Target Office: <strong>Office of the SDS for Final Approval</strong></div>
          <div style="font-size: 0.75rem; color: #64748b;">Remarks: Estimated processing within Citizen's Charter timeline (24-48 hrs).</div>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  trackBtn.addEventListener('click', runTracking);
  trackInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') runTracking();
  });
}

/* ==========================================================================
   5. ACCESSIBILITY SUITE (WCAG 2.1 COMPLIANT)
   ========================================================================== */
function initAccessibilitySuite() {
  const contrastToggle = document.getElementById('a11y-toggle-contrast');
  const fontDefault = document.getElementById('a11y-font-default');
  const fontReduce = document.getElementById('a11y-font-reduce');
  const fontEnlarge = document.getElementById('a11y-font-enlarge');
  const dyslexiaToggle = document.getElementById('a11y-toggle-dyslexia');

  // Load saved high-contrast state
  if (localStorage.getItem('deped_contrast') === 'high') {
    document.body.classList.add('high-contrast');
  }

  if (contrastToggle) {
    contrastToggle.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      const isHigh = document.body.classList.contains('high-contrast');
      localStorage.setItem('deped_contrast', isHigh ? 'high' : 'normal');
    });
  }

  if (fontReduce) {
    fontReduce.addEventListener('click', () => {
      document.body.classList.remove('font-md', 'font-lg');
      document.body.classList.add('font-sm');
    });
  }

  if (fontDefault) {
    fontDefault.addEventListener('click', () => {
      document.body.classList.remove('font-sm', 'font-lg');
      document.body.classList.add('font-md');
    });
  }

  if (fontEnlarge) {
    fontEnlarge.addEventListener('click', () => {
      document.body.classList.remove('font-sm', 'font-md');
      document.body.classList.add('font-lg');
    });
  }

  if (dyslexiaToggle) {
    dyslexiaToggle.addEventListener('click', () => {
      document.body.classList.toggle('dyslexia-font');
    });
  }
}

/* ==========================================================================
   6. MODAL DIALOGS ENGINE
   ========================================================================== */
function initModals() {
  // Generic close buttons
  document.querySelectorAll('.modal-close-btn, .modal-close-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
      });
    });
  });

  // Close when clicking overlay backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
      });
    }
  });

  // Accessibility statement modal trigger
  const a11yStatementBtn = document.getElementById('a11y-statement-btn');
  const a11yModal = document.getElementById('a11y-modal');
  if (a11yStatementBtn && a11yModal) {
    a11yStatementBtn.addEventListener('click', (e) => {
      e.preventDefault();
      a11yModal.classList.add('active');
    });
  }

  // CSM Survey submission logic
  const csmForm = document.getElementById('csm-feedback-form');
  if (csmForm) {
    csmForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Thank you! Your feedback has been recorded in the Schools Division Office of Carmona Client Satisfaction Measurement system.");
      document.getElementById('csm-modal').classList.remove('active');
      csmForm.reset();
    });
  }
}

window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
};

/* ==========================================================================
   7. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.add('active');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('active');
    });
  }
}

/* ==========================================================================
   8. VISITOR COUNTER SIMULATOR
   ========================================================================== */
function initVisitorCounter() {
  const counterElement = document.getElementById('visitor-count-digits');
  if (!counterElement) return;

  let baseCount = 384219;
  const digits = String(baseCount).padStart(7, '0').split('');
  counterElement.innerHTML = digits.map(d => `<span class="counter-digit">${d}</span>`).join('');
}
