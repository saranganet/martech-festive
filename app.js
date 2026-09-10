/**
 * MarTech Panthers - Festive Offer Interactivity
 * Focus: High-conversion B2B Strategy Meetings & Custom Enquiries
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 2. Fast-Track Consultation Goal Chips
  const goalChips = document.querySelectorAll('.goal-chip');
  const scopeSelect = document.getElementById('userScopeInterest');
  const plannerQuickCta = document.getElementById('plannerQuickCta');

  goalChips.forEach(chip => {
    chip.addEventListener('click', () => {
      goalChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const goal = chip.getAttribute('data-goal');
      
      // Auto-populate form dropdown
      if (scopeSelect) {
        if (goal.includes('Lead Leakage')) {
          scopeSelect.value = 'Growth & Multi-Channel Automation';
        } else if (goal.includes('CRM Setup')) {
          scopeSelect.value = 'CRM & Lead Flow Foundation';
        } else if (goal.includes('Integration')) {
          scopeSelect.value = 'Full Stack MarTech & Systems Sync';
        } else {
          scopeSelect.value = 'Growth & Multi-Channel Automation';
        }
      }

      if (plannerQuickCta) {
        plannerQuickCta.querySelector('span').textContent = `Discuss "${chip.textContent.replace(/^[^a-zA-Z0-9]+/, '').trim()}" on Call`;
      }
    });
  });

  // 3. Solution Scope Card CTAs - Link to form with pre-selected scope
  const scopeCtas = document.querySelectorAll('[data-scope-select]');
  scopeCtas.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedScope = btn.getAttribute('data-scope-select');
      if (scopeSelect && selectedScope) {
        scopeSelect.value = selectedScope;
        
        // Highlight form momentarily
        const formWrapper = document.querySelector('.emerald-form-wrapper');
        if (formWrapper) {
          formWrapper.style.transition = 'box-shadow 0.3s ease';
          formWrapper.style.boxShadow = '0 0 0 4px #22C55E';
          setTimeout(() => {
            formWrapper.style.boxShadow = '';
          }, 1500);
        }
      }
    });
  });

  // 4. Modals & Lead Booking Handling
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const expertModal = document.getElementById('expertModal');
  const closeExpertX = document.getElementById('closeExpertX');
  const leadForm = document.getElementById('leadForm');
  const expertForm = document.getElementById('expertForm');
  const modalMessage = document.getElementById('modalMessage');
  const modalSummaryBox = document.getElementById('modalSummaryBox');

  if (closeExpertX && expertModal) {
    closeExpertX.addEventListener('click', () => {
      expertModal.close();
    });
  }

  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.close();
    });
  }

  // Close modals on outside backdrop click
  [successModal, expertModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        const dialogDimensions = modal.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          modal.close();
        }
      });
    }
  });

  // Form Submissions
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('userName').value.trim();
      const email = document.getElementById('userEmail').value.trim();
      const company = document.getElementById('userCompany').value.trim();
      const scope = scopeSelect ? scopeSelect.value : 'Sales Enablement & Automation';

      if (modalMessage) {
        modalMessage.innerHTML = `Thank you, <strong>${name}</strong> from <strong>${company}</strong>! Your strategy session request for <em>"${scope}"</em> has been received.`;
      }

      if (modalSummaryBox) {
        modalSummaryBox.innerHTML = `<strong>Festive Benefit Reserved:</strong> Priority strategy slot &amp; implementation grant reserved for ${company}. Meeting invite sent to <strong>${email}</strong>.`;
      }

      leadForm.reset();
      if (successModal) {
        successModal.showModal();
        triggerFestiveConfetti();
      }
    });
  }

  if (expertForm) {
    expertForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (expertModal) expertModal.close();
      if (modalMessage) {
        modalMessage.innerHTML = `Your discovery session has been scheduled. Our senior sales enablement architect will reach out shortly!`;
      }
      if (modalSummaryBox) {
        modalSummaryBox.innerHTML = `<strong>Festive Benefit Reserved:</strong> Priority strategy slot &amp; implementation grant reserved for your team. Check your inbox for details.`;
      }
      if (successModal) {
        successModal.showModal();
        triggerFestiveConfetti();
      }
      expertForm.reset();
    });
  }

  // Festive Confetti Animation
  function triggerFestiveConfetti() {
    const colors = ['#16A34A', '#22C55E', '#060C3B', '#E5C158', '#C5933A', '#EAFFEE'];
    for (let i = 0; i < 40; i++) {
      const confetto = document.createElement('div');
      confetto.className = 'festive-confetto';
      confetto.style.position = 'fixed';
      confetto.style.top = '-10px';
      confetto.style.left = Math.random() * 100 + 'vw';
      confetto.style.width = (Math.random() * 8 + 6) + 'px';
      confetto.style.height = (Math.random() * 10 + 6) + 'px';
      confetto.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetto.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      confetto.style.zIndex = '9999';
      confetto.style.pointerEvents = 'none';
      confetto.style.opacity = '0.95';
      confetto.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      document.body.appendChild(confetto);

      const animDuration = Math.random() * 2000 + 2000;
      const anim = confetto.animate([
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${(Math.random() - 0.5) * 180}px, 105vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], {
        duration: animDuration,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
      });

      anim.onfinish = () => confetto.remove();
    }
  }

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
