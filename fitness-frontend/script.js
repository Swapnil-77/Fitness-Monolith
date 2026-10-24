const BASE_URL = "http://localhost:8080";

/* ============================================================
   UTILITIES
   ============================================================ */
function showToast(msg, type = 'error') {
  if (window._showModalToast) window._showModalToast(msg, type);
  else if (window._showToast)  window._showToast(msg, type);
}

function setLoading(btnId, loading, label = '') {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.disabled = loading;
  if (label) btn.innerHTML = loading
    ? `<span class="spinner"></span> ${label}`
    : label;
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("token")
  };
}

const ACTIVITY_ICONS = {
  RUNNING: '🏃', CYCLING: '🚴', SWIMMING: '🏊',
  YOGA: '🧘', WEIGHTLIFTING: '🏋️', WALKING: '🚶'
};

/* ============================================================
   AUTH
   ============================================================ */

// POST /api/auth/login
function login() {
  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) { showToast("Please fill in all fields."); return; }

  setLoading("authBtn", true, "Signing in…");

  fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(res => { if (!res.ok) throw new Error("Invalid credentials"); return res.json(); })
  .then(data => {
    localStorage.setItem("token",     data.token);
    localStorage.setItem("userId",    data.userId || data.user?.id);
    localStorage.setItem("userEmail", email);
    showToast("Signed in! Redirecting…", "success");
    setTimeout(() => { window.location.href = "dashboard.html"; }, 700);
  })
  .catch(err => {
    showToast(err.message || "Login failed.");
    setLoading("authBtn", false, "Sign In");
  });
}

// POST /api/auth/register
function register() {
  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) { showToast("Please fill in all fields."); return; }
  if (password.length < 6)  { showToast("Password must be at least 6 characters."); return; }

  setLoading("authBtn", true, "Creating account…");

  fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(res => { if (!res.ok) throw new Error("Registration failed"); return res.json(); })
  .then(() => {
    showToast("Account created! You can now sign in.", "success");
    setLoading("authBtn", false, "Create Account");
    setTimeout(() => { if (typeof switchTab === 'function') switchTab('login'); }, 1200);
  })
  .catch(err => {
    showToast(err.message || "Registration failed.");
    setLoading("authBtn", false, "Create Account");
  });
}

/* ============================================================
   ACTIVITIES
   ============================================================ */

// POST /api/activities
function addActivity() {
  const type     = document.getElementById("type").value;
  const duration = parseInt(document.getElementById("duration").value);
  const calories = parseInt(document.getElementById("calories").value);
  const userId   = localStorage.getItem("userId");

  if (!duration || !calories)       { showToast("Please fill in duration and calories."); return; }
  if (duration <= 0 || calories <= 0) { showToast("Values must be positive."); return; }

  fetch(`${BASE_URL}/api/activities`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ userId, type, duration, caloriesBurned: calories })
  })
  .then(res => { if (!res.ok) throw new Error("Failed to add"); return res.json(); })
  .then(() => {
    showToast("Activity logged!", "success");
    document.getElementById("duration").value = "";
    document.getElementById("calories").value = "";
    setTimeout(() => {
      if (typeof closeModalDirect === 'function') closeModalDirect();
      loadActivities();
    }, 700);
  })
  .catch(err => showToast(err.message || "Failed to add activity."));
}

// GET /api/activities
function loadActivities() {
  const list = document.getElementById("activityList");
  if (!list) return;
  list.innerHTML = `<div class="loading-state">Loading your activities…</div>`;

  fetch(`${BASE_URL}/api/activities`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
      "X-User-ID":     localStorage.getItem("userId")
    }
  })
  .then(res => { if (!res.ok) throw new Error("Fetch failed"); return res.json(); })
  .then(data => {
    list.innerHTML = "";
    if (!data || !data.length) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🏋️</div>
          <p>No activities yet.<br>Log your first workout!</p>
          <button class="btn-primary" onclick="openModal()">+ Log Activity</button>
        </div>`;
      return;
    }
    if (typeof updateStats === 'function') updateStats(data);

    [...data].reverse().forEach((act, i) => {
      const icon = ACTIVITY_ICONS[act.type] || '💪';
      const date = act.createdAt
        ? new Date(act.createdAt).toLocaleDateString('en', { weekday:'short', month:'short', day:'numeric' })
        : '';
      const card = document.createElement("div");
      card.className = "activity-card";
      card.style.animationDelay = `${i * 45}ms`;
      card.innerHTML = `
        <div class="activity-card-icon">${icon}</div>
        <div class="activity-card-body">
          <div class="activity-card-type">${act.type}</div>
          <div class="activity-card-meta">
            <div class="meta-item">⏱ ${act.duration} min</div>
            <div class="meta-item">🔥 ${act.caloriesBurned} cal</div>
          </div>
          ${date ? `<div class="activity-card-date">${date}</div>` : ''}
        </div>
        <button class="btn-ghost" style="font-size:.75rem;padding:6px 10px;margin-left:auto;flex-shrink:0"
          onclick="loadActivityRecommendation('${act.id}')">AI Tip</button>`;
      list.appendChild(card);
    });
  })
  .catch(() => {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⚠️</div>
        <p>Could not load activities.<br>Check your connection.</p>
        <button class="btn-primary" onclick="loadActivities()">Try Again</button>
      </div>`;
  });
}

/* ============================================================
   RECOMMENDATIONS
   ============================================================ */

// POST /api/recommendation/generate
function generateRecommendation() {
  const userId = localStorage.getItem("userId");
  const btn    = document.getElementById("genBtnLabel");
  if (btn) btn.innerHTML = `<span class="spinner"></span> Generating…`;
  document.querySelector('[onclick="generateRecommendation()"]').disabled = true;

  fetch(`${BASE_URL}/api/recommendation/generate`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ userId })
  })
  .then(res => { if (!res.ok) throw new Error("Generation failed"); return res.json(); })
  .then(() => {
    if (btn) btn.textContent = "⚡ Generate New";
    document.querySelector('[onclick="generateRecommendation()"]').disabled = false;
    loadUserRecommendations();
  })
  .catch(err => {
    alert(err.message || "Failed to generate recommendation.");
    if (btn) btn.textContent = "⚡ Generate New";
    document.querySelector('[onclick="generateRecommendation()"]').disabled = false;
  });
}

// GET /api/recommendation/user/{userId}
function loadUserRecommendations() {
  const userId = localStorage.getItem("userId");
  const list   = document.getElementById("recommendationList");
  if (!list || !userId) return;
  list.innerHTML = `<div class="loading-state">Loading recommendations…</div>`;

  fetch(`${BASE_URL}/api/recommendation/user/${userId}`, {
    headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
  })
  .then(res => { if (!res.ok) throw new Error("Fetch failed"); return res.json(); })
  .then(data => {
    list.innerHTML = "";
    if (!data || !data.length) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🤖</div>
          <p>No recommendations yet.<br>Generate your first AI recommendation!</p>
          <button class="btn-primary" onclick="generateRecommendation()">⚡ Generate Now</button>
        </div>`;
      return;
    }

    [...data].reverse().forEach((rec, i) => {
      const date = rec.createdAt
        ? new Date(rec.createdAt).toLocaleDateString('en', { month:'short', day:'numeric', year:'numeric' })
        : '';
      const preview = rec.recommendation || rec.content || rec.message || JSON.stringify(rec);
      const title   = rec.activityType
        ? `${ACTIVITY_ICONS[rec.activityType] || '💪'} ${rec.activityType} Recommendation`
        : '🤖 AI Fitness Recommendation';

      const card = document.createElement("div");
      card.className = "rec-card";
      card.style.animationDelay = `${i * 45}ms`;
      card.onclick = () => openRecDetail(rec);
      card.innerHTML = `
        <div class="rec-card-top">
          <span class="rec-badge ai">AI Generated</span>
          ${rec.activityType ? `<span class="rec-badge type">${rec.activityType}</span>` : ''}
        </div>
        <div class="rec-card-title">${title}</div>
        <div class="rec-card-preview">${preview}</div>
        <div class="rec-card-footer">
          <span class="rec-card-date">${date}</span>
          <span class="rec-card-link">View details →</span>
        </div>`;
      list.appendChild(card);
    });
  })
  .catch(() => {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⚠️</div>
        <p>Could not load recommendations.</p>
        <button class="btn-primary" onclick="loadUserRecommendations()">Try Again</button>
      </div>`;
  });
}

// GET /api/recommendation/activity/{activityId}
function loadActivityRecommendation(activityId) {
  if (!activityId) return;

  const content = document.getElementById("recModalContent");
  content.innerHTML = `<div class="loading-state">Fetching AI tip for this activity…</div>`;
  if (typeof openRecModal === 'function') openRecModal();

  fetch(`${BASE_URL}/api/recommendation/activity/${activityId}`, {
    headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
  })
  .then(res => { if (!res.ok) throw new Error("No recommendation found"); return res.json(); })
  .then(data => {
    const rec     = Array.isArray(data) ? data[0] : data;
    const preview = rec?.recommendation || rec?.content || rec?.message || "No recommendation text available.";
    const date    = rec?.createdAt
      ? new Date(rec.createdAt).toLocaleDateString('en', { month:'long', day:'numeric', year:'numeric' })
      : '';
    content.innerHTML = `
      <div class="rec-meta">
        <span class="rec-badge ai">AI Generated</span>
        ${rec?.activityType ? `<span class="rec-badge type">${rec.activityType}</span>` : ''}
      </div>
      <div class="rec-body">${preview}</div>
      ${date ? `<p style="margin-top:14px;font-size:.78rem;color:var(--text-muted)">${date}</p>` : ''}`;
  })
  .catch(err => {
    content.innerHTML = `
      <div style="text-align:center;padding:32px;color:var(--text-secondary)">
        <div style="font-size:2rem;margin-bottom:12px">🤖</div>
        <p>${err.message || "No recommendation found for this activity."}</p>
        <button class="btn-primary" style="margin-top:16px" onclick="generateRecommendation()">⚡ Generate One</button>
      </div>`;
  });
}

// Open rec detail modal from a recommendation object
function openRecDetail(rec) {
  const content = document.getElementById("recModalContent");
  const preview = rec.recommendation || rec.content || rec.message || "No content available.";
  const date    = rec.createdAt
    ? new Date(rec.createdAt).toLocaleDateString('en', { month:'long', day:'numeric', year:'numeric' })
    : '';
  const title   = rec.activityType
    ? `${ACTIVITY_ICONS[rec.activityType] || '💪'} ${rec.activityType} Recommendation`
    : '🤖 AI Fitness Recommendation';

  content.innerHTML = `
    <div class="rec-meta">
      <span class="rec-badge ai">AI Generated</span>
      ${rec.activityType ? `<span class="rec-badge type">${rec.activityType}</span>` : ''}
    </div>
    <h4 style="font-family:var(--font-display);font-size:1rem;margin-bottom:14px">${title}</h4>
    <div class="rec-body">${preview}</div>
    ${date ? `<p style="margin-top:14px;font-size:.78rem;color:var(--text-muted)">${date}</p>` : ''}`;

  if (typeof openRecModal === 'function') openRecModal();
}