/**
 * MarTech Panthers - Festive Offer Interactivity
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

    // Close mobile menu on clicking any link
    document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 2. Interactive Savings Calculator
  const budgetSlider = document.getElementById('customBudgetSlider');
  const calcBudgetText = document.getElementById('calcBudgetText');
  const calcPayText = document.getElementById('calcPayText');
  const calcSaveBadge = document.getElementById('calcSaveBadge');
  const tierCards = document.querySelectorAll('.price-tier-card');

  const formatRupee = (num) => {
    return '₹' + num.toLocaleString('en-IN');
  };

  const updateCalculator = (budget) => {
    // Offer terms: Up to 50% off, capped at ₹45,000
    const rawDiscount = budget * 0.5;
    const actualDiscount = Math.min(rawDiscount, 45000);
    const finalPay = budget - actualDiscount;
    const discountPercent = Math.round((actualDiscount / budget) * 100);

    if (calcBudgetText) calcBudgetText.textContent = formatRupee(budget);
    if (calcPayText) calcPayText.textContent = formatRupee(finalPay);
    if (calcSaveBadge) {
      if (actualDiscount >= 45000 && budget > 90000) {
        calcSaveBadge.textContent = `You save ${formatRupee(actualDiscount)} (Capped at ₹45,000)`;
      } else {
        calcSaveBadge.textContent = `You save ${formatRupee(actualDiscount)} (${discountPercent}% off)`;
      }
    }

    // Highlight matching tier card if budget matches
    tierCards.forEach(card => {
      const cardBudget = parseInt(card.getAttribute('data-budget'), 10);
      if (cardBudget === budget) {
        card.classList.add('active-tier');
      } else {
        card.classList.remove('active-tier');
      }
    });
  };

  if (budgetSlider) {
    budgetSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      updateCalculator(val);
    });
  }

  // Click on any pricing card to reflect on calculator
  tierCards.forEach(card => {
    card.addEventListener('click', () => {
      const budget = parseInt(card.getAttribute('data-budget'), 10);
      if (budgetSlider) {
        budgetSlider.value = budget;
      }
      updateCalculator(budget);
    });
  });

  // 3. Modals & Form Handling
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const expertModal = document.getElementById('expertModal');
  const heroTalkBtn = document.getElementById('heroTalkBtn');
  const closeExpertX = document.getElementById('closeExpertX');
  const leadForm = document.getElementById('leadForm');
  const expertForm = document.getElementById('expertForm');
  const modalMessage = document.getElementById('modalMessage');

  if (heroTalkBtn && expertModal) {
    heroTalkBtn.addEventListener('click', () => {
      expertModal.showModal();
    });
  }

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

      if (modalMessage) {
        modalMessage.innerHTML = `Thank you, <strong>${name}</strong> from <strong>${company}</strong>! Your Ganesh Chaturthi Special offer has been applied. We have sent the confirmation &amp; next steps to <strong>${email}</strong>.`;
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
      if (successModal) {
        successModal.showModal();
        triggerFestiveConfetti();
      }
      expertForm.reset();
    });
  }

  // Subtle festive celebratory confetti effect
  function triggerFestiveConfetti() {
    const colors = ['#BE4928', '#E5C158', '#C5933A', '#132B22', '#F8E2C2'];
    for (let i = 0; i < 35; i++) {
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
      confetto.style.opacity = '0.9';
      confetto.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      document.body.appendChild(confetto);

      const animDuration = Math.random() * 2000 + 2000;
      const anim = confetto.animate([
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${(Math.random() - 0.5) * 160}px, 105vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
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
