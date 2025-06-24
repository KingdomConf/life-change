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

  // Show modal with block display for iframe compatibility
  const modal = document.getElementById("staffModal");
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
