function getSocialIconImage(platform) {
  return {
    facebook: "facebook.jpg",
    instagram: "instagram.jpg",
    email: "email.jpg"
  }[platform] || "link.jpg";
}

function generateStaffCards() {
  const staffGrid = document.getElementById("staffGrid");

  staffData.forEach((staff, index) => {
    const card = document.createElement("div");
    card.className = "staff-card";
    card.onclick = () => openModal(index);

    const socialIcons = staff.social.map(({ platform, url }) => `
      <a href="${url}" target="_blank" class="social-icon" onclick="event.stopPropagation()">
        <img src="${getSocialIconImage(platform)}" alt="${platform}" class="social-icon-img" />
      </a>
    `).join("");

    card.innerHTML = `
      <img src="${staff.image}" alt="${staff.name}" class="staff-image" onerror="this.style.background='#ddd'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='📷';" />
      <h3 class="staff-name">${staff.name}</h3>
      <p class="staff-title">${staff.title}</p>
      <div class="social-icons">${socialIcons}</div>
    `;

    staffGrid.appendChild(card);
  });
}

function openModal(index) {
  const staff = staffData[index];
  const modalImage = document.getElementById("modalImage");
  modalImage.src = staff.image;
  modalImage.onerror = function() {
    this.style.background = '#ddd';
    this.style.display = 'flex';
    this.style.alignItems = 'center';
    this.style.justifyContent = 'center';
    this.innerHTML = '📷';
  };
  
  document.getElementById("modalName").textContent = staff.name;
  document.getElementById("modalTitle").textContent = staff.title;
  document.getElementById("modalAbout").textContent = staff.about;

  const iconsHTML = staff.social.map(({ platform, url }) => `
    <a href="${url}" target="_blank" class="social-icon">
      <img src="${getSocialIconImage(platform)}" alt="${platform}" class="social-icon-img" />
    </a>
  `).join("");

  document.getElementById("modalSocialIcons").innerHTML = iconsHTML;

  // Get current scroll position within iframe
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const viewportHeight = window.innerHeight;
  
  // Calculate center position relative to current view
  const centerPosition = scrollTop + (viewportHeight / 2);

  // Show modal and position it in the center of current viewport
  const modal = document.getElementById("staffModal");
  const modalContent = modal.querySelector('.modal-content');
  
  // Position modal content relative to current scroll position
  modalContent.style.position = 'absolute';
  modalContent.style.top = centerPosition + 'px';
  modalContent.style.left = '50%';
  modalContent.style.transform = 'translate(-50%, -50%)';
  modalContent.style.animation = 'modalSlideIn 0.2s ease';
  
  modal.style.display = "block";
  
  // Prevent iframe content scrolling
  document.body.style.overflow = "hidden";
  document.body.style.height = "100%";
}

function closeModal() {
  const modal = document.getElementById("staffModal");
  modal.style.display = "none";
  
  // Restore body styles
  document.body.style.overflow = "";
  document.body.style.height = "";
}

document.addEventListener("DOMContentLoaded", () => {
  generateStaffCards();

  document.querySelector(".close").onclick = closeModal;
  window.onclick = (e) => {
    if (e.target === document.getElementById("staffModal")) closeModal();
  };
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
