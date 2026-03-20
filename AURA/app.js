const state = {
  lang: 'zh', // 'zh' | 'en'
  mobileMenuOpen: false,
  legal: {
    open: false,
    doc: 'privacy', // 'privacy' | 'terms' | 'claim'
  },
  admin: {
    unlocked: false,
    unlockedAt: 0,
    unlockModalOpen: false,
    eggClicks: 0,
    eggLastAt: 0,
  },
  auth: {
    isAuthed: false,
    modalOpen: false,
    mode: 'login', // 'login' | 'register'
    redirectHash: '',
    passHash: '',
  },
  user: {
    displayName: '',
    phone: '',
    email: '',
  },
  security: {
    changePassOpen: false,
  },
  // Dashboard demo state
  dashboard: {
    progress: 0,
    visitModalOpen: false,
    showAllClaimBookings: false,
    visitBookings: [
      { id: 1, date: '2026-03-20', time: '上午 (09:00 - 12:00)', count: 2, status: 'visited', plot: 'A01', note: '首次体验菜园，带 1 位朋友一同前来。' },
      { id: 2, date: '2026-03-28', time: '下午 (14:00 - 17:00)', count: 3, status: 'visited', plot: 'A01', note: '家人一起采收小番茄，并完成一次除草。' },
      { id: 3, date: '2026-04-05', time: '上午 (09:00 - 12:00)', count: 2, status: 'upcoming', plot: 'A01', note: '计划检查支架、追施一次有机肥。' },
    ],
    claimBookings: [],
    viewBookingModalOpen: false,
    viewBooking: null, // { kind: 'visit' | 'claim', data: {...} }
  },
  // Map selection demo state
  selectedPlotId: null,
};

const PLOTS = [
  {
    id: 'L1',
    name: '保育区 一',
    nameEn: 'Rehab Zone 1',
    size: 40,
    status: 'unavailable',
    tags: ['保育中'],
    tagsEn: ['Soil rehab'],
    image: 'https://images.unsplash.com/photo-1592424001815-581d4b6555cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '当前地块正在进行土壤养护，暂不可用。',
    descriptionEn: 'This plot is under soil rehabilitation and temporarily unavailable.',
  },
  {
    id: 'L2',
    name: '保育区 二',
    nameEn: 'Rehab Zone 2',
    size: 40,
    status: 'unavailable',
    tags: ['保育中'],
    tagsEn: ['Soil rehab'],
    image: 'https://images.unsplash.com/photo-1505929281313-05ec2f42a03f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '当前地块正在进行土壤养护，暂不可用。',
    descriptionEn: 'This plot is under soil rehabilitation and temporarily unavailable.',
  },
  {
    id: 'L3',
    name: '保育区 三',
    nameEn: 'Rehab Zone 3',
    size: 40,
    status: 'unavailable',
    tags: ['保育中'],
    tagsEn: ['Soil rehab'],
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '当前地块正在进行土壤养护，暂不可用。',
    descriptionEn: 'This plot is under soil rehabilitation and temporarily unavailable.',
  },
  {
    id: 'R1',
    name: '绿漪 R1 号',
    nameEn: 'Aura Plot R1',
    size: 15,
    status: 'available',
    tags: ['近水源', '新手友好'],
    tagsEn: ['Near water', 'Beginner-friendly'],
    image: 'https://images.unsplash.com/photo-1657383765722-1e2354dbba61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '位于右侧上方的优质地块，采光良好。',
    descriptionEn: 'A premium plot in the upper-right area with excellent sunlight.',
  },
  {
    id: 'R2',
    name: '绿漪 R2 号',
    nameEn: 'Aura Plot R2',
    size: 15,
    status: 'rented',
    tags: ['含种子套餐'],
    tagsEn: ['Seeds included'],
    image: 'https://images.unsplash.com/photo-1727099079513-952d40de9d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '该地块已被其他农场主认领。',
    descriptionEn: 'This plot has already been claimed by another grower.',
  },
  {
    id: 'R3',
    name: '绿漪 R3 号',
    nameEn: 'Aura Plot R3',
    size: 15,
    status: 'available',
    tags: ['深土层', '半遮阴'],
    tagsEn: ['Deep soil', 'Partial shade'],
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '右下角区域，适合种植根茎类蔬菜。',
    descriptionEn: 'Lower-right area—great for root vegetables.',
  },
  {
    id: 'R4',
    name: '绿漪 R4 号',
    nameEn: 'Aura Plot R4',
    size: 15,
    status: 'pending',
    tags: ['独立灌溉'],
    tagsEn: ['Private irrigation'],
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '该地块正在等待确认中。',
    descriptionEn: 'This plot is pending confirmation.',
  },
];

function t(zh, en) {
  return state.lang === 'zh' ? zh : en;
}

function plotLabel(plot) {
  if (!plot) return '';
  return state.lang === 'zh' ? (plot.name || '') : (plot.nameEn || plot.name || '');
}

function plotTags(plot) {
  if (!plot) return [];
  if (state.lang === 'zh') return plot.tags || [];
  return plot.tagsEn || plot.tags || [];
}

function plotDesc(plot) {
  if (!plot) return '';
  return state.lang === 'zh'
    ? (plot.description || '')
    : (plot.descriptionEn || plot.description || '');
}

function h(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

const ADMIN_PASSPHRASE_SHA256 = '8e0db465f77e905af8b37f003a50eb9d96d799a43067672881bf8a68a366a8f0';

async function sha256Hex(input) {
  const data = new TextEncoder().encode(String(input ?? ''));
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function parseRoute() {
  const raw = (location.hash || '#/').slice(1); // "/..."
  const path = raw.startsWith('/') ? raw : `/${raw}`;

  const seg = path.split('/').filter(Boolean);
  if (seg.length === 0) return { name: 'home', params: {} };
  if (seg[0] === 'map') return { name: 'map', params: {} };
  if (seg[0] === 'dashboard') return { name: 'dashboard', params: {} };
  if (seg[0] === 'visits') return { name: 'visits', params: {} };
  if (seg[0] === 'settings') return { name: 'settings', params: {} };
  if (seg[0] === 'admin') return { name: 'admin', params: {} };
  if (seg[0] === 'plot' && seg[1]) return { name: 'plot', params: { id: seg[1] } };
  if (seg[0] === 'booking' && seg[1]) return { name: 'booking', params: { id: seg[1] } };
  return { name: 'home', params: {} };
}

function setLang(next) {
  state.lang = next;
  render();
}

// Dark mode has been removed in this demo.

function navLink(to, zh, en, isActive, requiresAuth = false) {
  const cls = isActive ? 'text-[#87A96B]' : 'text-[#5A5A5A]';
  const authAttr = requiresAuth ? 'data-requires-auth="1"' : '';
  return `
    <a href="#${to}" ${authAttr} class="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#87A96B] ${cls}">
      <span>${state.lang === 'zh' ? zh : en}</span>
    </a>
  `;
}

function persistUser() {
  try {
    localStorage.setItem('aura_user', JSON.stringify({
      displayName: state.user.displayName || '',
      phone: state.user.phone || '',
      email: state.user.email || '',
    }));
  } catch {}
}

function authModal() {
  if (!state.auth.modalOpen) return '';
  const title = state.auth.mode === 'login' ? t('登录', 'Sign in') : t('注册', 'Create account');
  const subtitle = state.auth.mode === 'login'
    ? t('登录后可选地认领、查看菜园与预约入场。', 'Sign in to claim plots, view your garden, and book visits.')
    : t('注册后可选地认领、查看菜园与预约入场。', 'Create an account to claim plots, view your garden, and book visits.');
  const isReg = state.auth.mode === 'register';
  return `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div data-action="auth-close" class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md bg-white dark:bg-[#0F1511] rounded-3xl border border-[#E8E2D9] dark:border-[#22302A]/60 shadow-2xl overflow-hidden">
        <div class="p-6 sm:p-7">
          <div class="flex items-start justify-between gap-4 mb-5">
            <div>
              <h3 class="text-xl font-serif text-[#2A2A2A] dark:text-[#F3F4F6]">${title}</h3>
              <p class="text-sm text-[#5A5A5A] dark:text-[#B7C0BA] mt-1">${subtitle}</p>
            </div>
            <button data-action="auth-close" class="w-9 h-9 rounded-full bg-[#F5F0E8] dark:bg-[#17211B] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#1E2A23] transition-colors">✕</button>
          </div>

          <div class="flex bg-[#FAF9F6] dark:bg-[#0B0F0C] rounded-2xl p-1 border border-[#E8E2D9] dark:border-[#22302A]/60 mb-6">
            <button data-action="auth-switch" data-auth-mode="login" class="flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${state.auth.mode === 'login' ? 'bg-white dark:bg-[#0F1511] text-[#87A96B] shadow-sm' : 'text-[#5A5A5A] dark:text-[#B7C0BA] hover:text-[#2A2A2A] dark:hover:text-[#F3F4F6]'}">${t('登录', 'Sign in')}</button>
            <button data-action="auth-switch" data-auth-mode="register" class="flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${state.auth.mode === 'register' ? 'bg-white dark:bg-[#0F1511] text-[#87A96B] shadow-sm' : 'text-[#5A5A5A] dark:text-[#B7C0BA] hover:text-[#2A2A2A] dark:hover:text-[#F3F4F6]'}">${t('注册', 'Register')}</button>
          </div>

          <div class="space-y-4">
            ${isReg ? `
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-[#5A5A5A] mb-1.5">${t('昵称', 'Display name')}</label>
                  <input id="auth-name" type="text" value="${escapeHtml(state.user.displayName || '')}" placeholder="${t('例如：李女士', 'e.g. Lin')}" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all" />
                </div>
                <div>
                  <label class="block text-sm text-[#5A5A5A] mb-1.5">${t('手机号码', 'Phone')}</label>
                  <input id="auth-phone" type="tel" value="${escapeHtml(state.user.phone || '')}" placeholder="${t('例如：13800000000', 'e.g. +86 138…')}" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all" />
                </div>
              </div>
            ` : ''}
            <div>
              <label class="block text-sm text-[#5A5A5A] mb-1.5">${t('邮箱', 'Email')}</label>
              <input id="auth-email" type="email" value="${escapeHtml(state.user.email || '')}" placeholder="${t('请输入邮箱', 'Enter your email')}" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all" />
            </div>
            <div>
              <label class="block text-sm text-[#5A5A5A] mb-1.5">${t('密码', 'Password')}</label>
              <input id="auth-pass" type="password" placeholder="${t('请输入密码', 'Enter your password')}" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all" />
            </div>
            ${isReg ? `
              <div>
                <label class="block text-sm text-[#5A5A5A] mb-1.5">${t('确认密码', 'Confirm password')}</label>
                <input id="auth-pass2" type="password" placeholder="${t('再次输入密码', 'Re-enter your password')}" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all" />
              </div>
              <label class="flex items-start gap-3 cursor-pointer mt-1 group">
                <input id="auth-agree" type="checkbox" class="mt-1" />
                <span class="text-xs text-[#5A5A5A] leading-relaxed">
                  ${t('我已阅读并同意', 'I agree to the')}
                  <button type="button" data-action="open-legal" data-legal="privacy" class="text-[#87A96B] hover:underline underline-offset-2">${t('隐私政策', 'Privacy policy')}</button>
                  ${t('与', 'and')}
                  <button type="button" data-action="open-legal" data-legal="terms" class="text-[#87A96B] hover:underline underline-offset-2">${t('用户协议', 'Terms')}</button>
                </span>
              </label>
            ` : ''}
          </div>

          <button data-action="auth-submit" class="w-full mt-6 py-3.5 rounded-2xl bg-[#2A2A2A] text-white font-medium hover:bg-black transition-colors shadow-md">
            ${state.auth.mode === 'login' ? t('登录并继续', 'Sign in & continue') : t('注册并继续', 'Register & continue')}
          </button>

          <p class="text-[11px] text-[#8C867D] dark:text-[#7C857F] mt-4 leading-relaxed">
            ${t('这是演示版：信息会保存到本地“账户设置”。', 'Demo mode: info is saved locally to Account settings.')}
          </p>
        </div>
      </div>
    </div>
  `;
}

function changePasswordModal() {
  if (!state.security.changePassOpen) return '';
  const hasExisting = !!state.auth.passHash;
  return `
    <div class="fixed inset-0 z-[98] flex items-center justify-center p-4">
      <div data-action="change-password-close" class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md bg-white dark:bg-[#0F1511] rounded-3xl border border-[#E8E2D9] dark:border-[#22302A]/60 shadow-2xl overflow-hidden">
        <div class="p-6 sm:p-7 space-y-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-xl font-serif text-[#2A2A2A] dark:text-[#F3F4F6]">${t('修改密码', 'Change password')}</h3>
              <p class="text-xs text-[#5A5A5A] dark:text-[#B7C0BA] mt-1">
                ${t('此为演示版，只在本设备本浏览器中生效。', 'Demo only: password is stored locally in this browser.')}
              </p>
            </div>
            <button data-action="change-password-close" class="w-8 h-8 rounded-full bg-[#F5F0E8] dark:bg-[#17211B] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#1E2A23] transition-colors text-sm">✕</button>
          </div>

          <div class="space-y-4">
            ${hasExisting ? `
              <div>
                <label class="block text-xs text-[#5A5A5A] mb-1.5">${t('当前密码', 'Current password')}</label>
                <input id="change-pass-old" type="password" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] text-sm transition-all" />
              </div>
            ` : ''}
            <div>
              <label class="block text-xs text-[#5A5A5A] mb-1.5">${t('新密码', 'New password')}</label>
              <input id="change-pass-new" type="password" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] text-sm transition-all" />
            </div>
            <div>
              <label class="block text-xs text-[#5A5A5A] mb-1.5">${t('确认新密码', 'Confirm new password')}</label>
              <input id="change-pass-new2" type="password" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] text-sm transition-all" />
            </div>
          </div>

          <button data-action="change-password-submit" class="w-full py-3.5 rounded-full bg-[#2A2A2A] text-white text-sm font-medium hover:bg-black transition-colors flex items-center justify-center gap-2">
            🔐 ${t('保存新密码', 'Save new password')}
          </button>
        </div>
      </div>
    </div>
  `;
}

function bookingDetailModal() {
  if (!state.dashboard.viewBookingModalOpen || !state.dashboard.viewBooking) return '';
  const vb = state.dashboard.viewBooking;
  const kind = vb.kind === 'claim' ? 'claim' : 'visit';
  const b = vb.data || {};
  const title =
    kind === 'visit'
      ? t('入场预约详情', 'Visit booking detail')
      : t('认领申请详情', 'Claim request detail');
  return `
    <div class="fixed inset-0 z-[96] flex items-center justify-center p-4">
      <div data-action="close-booking-detail" class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md bg-white dark:bg-[#0F1511] rounded-3xl border border-[#E8E2D9] dark:border-[#22302A]/60 shadow-2xl overflow-hidden">
        <div class="p-6 sm:p-7 space-y-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-xl font-serif text-[#2A2A2A] dark:text-[#F3F4F6]">${title}</h3>
              <p class="text-xs text-[#5A5A5A] dark:text-[#B7C0BA] mt-1">
                ${kind === 'visit'
                  ? t('这是您在绿漪的入场预约记录，仅作为演示使用。', 'This is your visit booking record in Aura (demo only).')
                  : t('这是您提交的地块认领申请记录，仅作为演示使用。', 'This is your plot claim record (demo only).')}
              </p>
            </div>
            <button data-action="close-booking-detail" class="w-8 h-8 rounded-full bg-[#F5F0E8] dark:bg-[#17211B] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#1E2A23] transition-colors text-sm">✕</button>
          </div>

          <div class="space-y-2 text-xs text-[#5A5A5A] dark:text-[#B7C0BA]">
            <div><span class="inline-block w-16 text-[#8C867D]">${t('日期', 'Date')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(b.date || '')}</span></div>
            ${kind === 'visit'
              ? `<div><span class="inline-block w-16 text-[#8C867D]">${t('时间段', 'Time')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(b.time || '')}</span></div>`
              : ''}
            <div><span class="inline-block w-16 text-[#8C867D]">${t('地块', 'Plot')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(b.plot || 'A01')}</span></div>
            ${kind === 'visit'
              ? `<div><span class="inline-block w-16 text-[#8C867D]">${t('人数', 'Guests')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(String(b.count ?? 0))}</span></div>`
              : `<div><span class="inline-block w-16 text-[#8C867D]">${t('种子套餐', 'Seeds')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(b.seed || t('未记录', 'Not recorded'))}</span></div>`}
            ${kind === 'claim'
              ? `<div><span class="inline-block w-16 text-[#8C867D]">${t('周期', 'Duration')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(b.duration || t('未记录', 'Not recorded'))}</span></div>`
              : ''}
            <div><span class="inline-block w-16 text-[#8C867D]">${t('状态', 'Status')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">
              ${kind === 'visit'
                ? (b.status === 'upcoming' ? t('待出行', 'Upcoming') : t('已完成', 'Completed'))
                : (b.status === 'pending' ? t('待确认', 'Pending') : t('已处理', 'Processed'))}
            </span></div>
          </div>

          <div class="pt-2 border-t border-[#E8E2D9] dark:border-[#22302A]/60">
            <div class="text-xs text-[#8C867D] dark:text-[#7C857F] mb-1">${t('备注', 'Notes')}</div>
            <p class="text-xs text-[#5A5A5A] dark:text-[#B7C0BA] leading-relaxed">
              ${escapeHtml(b.note || (kind === 'visit'
                ? t('本次入场预约暂无补充说明。', 'No additional notes for this visit.')
                : t('本次认领申请暂无补充说明。', 'No additional notes for this claim.')))}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function visitModal() {
  if (!state.dashboard.visitModalOpen) return '';
  return `
    <div class="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <div data-action="visit-close" class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md bg-white dark:bg-[#0F1511] rounded-3xl border border-[#E8E2D9] dark:border-[#22302A]/60 shadow-2xl overflow-hidden">
        <div class="p-6 sm:p-7 space-y-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-xl font-serif text-[#2A2A2A] dark:text-[#F3F4F6]">${t('预约入场', 'Book a farm visit')}</h3>
              <p class="text-xs text-[#5A5A5A] dark:text-[#B7C0BA] mt-1">
                ${t('本预约仅选择入场时间，与地块认领无关。', 'This booking is only for visit time, separate from plot claiming.')}
              </p>
            </div>
            <button data-action="visit-close" class="w-8 h-8 rounded-full bg-[#F5F0E8] dark:bg-[#17211B] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#1E2A23] transition-colors text-sm">✕</button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-xs text-[#5A5A5A] mb-1.5">${t('入场日期', 'Visit date')}</label>
              <input id="visit-date" type="text" placeholder="${t('例如：2026年4月6日（周一）', 'e.g. Apr 6, 2026 (Mon)')}" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] text-sm transition-all" />
            </div>
            <div>
              <label class="block text-xs text-[#5A5A5A] mb-1.5">${t('时间段', 'Time slot')}</label>
              <select id="visit-slot" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] text-sm transition-all">
                <option value="">${t('请选择时间段', 'Select a time slot')}</option>
                <option value="上午 (09:00 - 12:00)">${t('上午 (09:00 - 12:00)', 'Morning (09:00 - 12:00)')}</option>
                <option value="下午 (14:00 - 17:00)">${t('下午 (14:00 - 17:00)', 'Afternoon (14:00 - 17:00)')}</option>
                <option value="傍晚 (17:00 - 19:00)">${t('傍晚 (17:00 - 19:00)', 'Evening (17:00 - 19:00)')}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-[#5A5A5A] mb-1.5">${t('入场人数', 'Number of guests')}</label>
              <input id="visit-count" type="number" min="1" max="8" placeholder="${t('例如：2 人', 'e.g. 2')}" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] text-sm transition-all" />
            </div>
            <div>
              <label class="block text-xs text-[#5A5A5A] mb-1.5">${t('备注（选填）', 'Notes (optional)')}</label>
              <textarea id="visit-note" rows="2" placeholder="${t('例如：携带 1 名儿童，需要简单讲解参观路线。', 'e.g. bringing 1 child, would like a quick tour.')}" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] text-xs transition-all resize-none"></textarea>
            </div>
          </div>

          <button data-action="visit-submit" class="w-full py-3.5 rounded-full bg-[#87A96B] text-white text-sm font-medium hover:bg-[#76965B] transition-colors flex items-center justify-center gap-2">
            🗓️ ${t('提交入场预约', 'Submit visit booking')}
          </button>
        </div>
      </div>
    </div>
  `;
}

function adminUnlockModal() {
  if (!state.admin.unlockModalOpen) return '';
  return `
    <div class="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div data-action="admin-unlock-close" class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md bg-white dark:bg-[#0F1511] rounded-3xl border border-[#E8E2D9] dark:border-[#22302A]/60 shadow-2xl overflow-hidden">
        <div class="p-6 sm:p-7">
          <div class="flex items-start justify-between gap-4 mb-5">
            <div>
              <h3 class="text-xl font-serif text-[#2A2A2A] dark:text-[#F3F4F6]">${t('输入口令', 'Enter passphrase')}</h3>
              <p class="text-sm text-[#5A5A5A] dark:text-[#B7C0BA] mt-1">${t('用于解锁隐藏管理区域。', 'Unlock the hidden admin area.')}</p>
            </div>
            <button data-action="admin-unlock-close" class="w-9 h-9 rounded-full bg-[#F5F0E8] dark:bg-[#17211B] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#1E2A23] transition-colors">✕</button>
          </div>

          <div class="space-y-3">
            <label class="block text-sm text-[#5A5A5A] dark:text-[#B7C0BA]">${t('口令', 'Passphrase')}</label>
            <input id="admin-passphrase" type="password" autocomplete="off" placeholder="${t('请输入口令', 'Enter passphrase')}" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all" />
            <p class="text-[11px] text-[#8C867D] dark:text-[#7C857F] leading-relaxed">
              ${t('提示：这是“隐藏”而非真正安全的权限系统。后续接入后端后应使用服务端权限控制。', 'Note: this is obscurity, not real security. Use server-side authorization once you have a backend.')}
            </p>
          </div>

          <div class="mt-6 flex items-center justify-end gap-3">
            <button data-action="admin-unlock-close" class="px-4 py-2 rounded-full text-sm font-medium bg-[#F5F0E8] dark:bg-[#17211B] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#1E2A23] transition-colors">
              ${t('取消', 'Cancel')}
            </button>
            <button data-action="admin-unlock-submit" class="px-5 py-2 rounded-full text-sm font-medium bg-[#2A2A2A] text-white hover:bg-black transition-colors shadow-sm">
              ${t('解锁', 'Unlock')}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function legalModal() {
  if (!state.legal.open) return '';

  const isPrivacy = state.legal.doc === 'privacy';
  const isTerms = state.legal.doc === 'terms';
  const title = isPrivacy
    ? t('隐私政策', 'Privacy policy')
    : (isTerms ? t('用户协议', 'Terms of service') : t('绿漪共享菜园认领协议', 'Shared Garden Claim Agreement'));

  const privacyHtml = `
    <div class="space-y-5 text-sm leading-relaxed text-[#2A2A2A] dark:text-[#F3F4F6]">
      <div class="text-xs text-[#8C867D] dark:text-[#7C857F]">
        <div>${t('运营方：绿漪AURA', 'Operator: Green Ripple AURA')}</div>
        <div>${t('联系邮箱：AURA@outlook.com', 'Email: AURA@outlook.com')}</div>
        <div>${t('生效日期：以应用内展示为准', 'Effective date: as shown in-app')}</div>
      </div>

      <section class="space-y-2">
        <h3 class="font-medium">${t('1. 我们收集的信息与用途', '1. What we collect and why')}</h3>
        <ul class="list-disc pl-5 space-y-1 text-[#5A5A5A] dark:text-[#B7C0BA]">
          <li>${t('账号信息（如注册/登录）：邮箱/手机号、验证码、昵称、头像等，用于注册登录与账号管理。', 'Account info (if you sign up/sign in): email/phone, verification, profile details, used for account access and management.')}</li>
          <li>${t('你提交的内容：你输入/上传/生成的文本、图片、音视频、文件、反馈与客服记录，用于提供对应功能与改进服务。', 'Content you provide: text, images, audio/video, files, feedback, and support messages, used to deliver features and improve services.')}</li>
          <li>${t('交易信息（如付费）：订单、支付状态、退款状态，用于交易完成、对账与售后。', 'Payment/transaction info (if paid): orders and payment/refund status, used for billing, reconciliation, and support.')}</li>
          <li>${t('设备与日志信息：设备信息、IP、网络类型、应用版本、崩溃日志与操作日志，用于安全、排障与统计优化。', 'Device & log data: device details, IP, network, app version, crash and usage logs, used for security, debugging, and analytics.')}</li>
        </ul>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('2. 权限说明（相机）', '2. Permissions (Camera)')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('在你授权后，我们可能调用相机用于拍摄/上传照片或视频等功能。你可随时在系统设置中关闭授权；关闭后不影响基础功能，但相关功能可能不可用。', 'With your permission, we may access the camera for taking/uploading photos or videos. You can disable it in system settings at any time; core features remain, but related features may not work.')}
        </p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('3. 存储与保存期限（Supabase）', '3. Storage & retention (Supabase)')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('我们使用 Supabase 及其底层云基础设施存储与处理数据。我们将在实现服务目的所必需的期间内保存信息；在你注销账号或我们停止运营/相关服务器关闭后，我们将根据法律法规要求与技术可行性删除或匿名化处理（法律要求或争议处理所必需的除外）。', 'We use Supabase and its underlying cloud infrastructure to store and process data. We retain data only as necessary for service purposes; after account deletion or service shutdown/server decommissioning, we will delete or anonymize where feasible and required by law (except where retention is legally required or needed for dispute resolution).')}
        </p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('4. 共享与第三方SDK', '4. Sharing & third-party SDKs')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('我们不会出售个人信息。仅在提供服务所必需（如云服务、支付、消息通知、统计/崩溃分析等）或法律要求时共享必要信息，并会在接入第三方SDK前后更新并公示SDK清单（名称、用途、收集信息类型、隐私链接）。', 'We do not sell personal data. We share only what is necessary to provide the service (e.g., cloud services, payments, notifications, analytics/crash reporting) or as required by law, and we will publish/update a third‑party SDK list (name, purpose, data types, privacy link) when integrated.')}</p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('5. 跨境传输', '5. Cross-border transfers')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('由于 Supabase 等基础设施可能位于境外或由境外实体提供支持，你的信息可能发生跨境存储/访问/传输。我们将尽力按适用法律采取必要保护措施，并在法律要求时取得你的单独同意。', 'Because Supabase and related infrastructure may be located outside your country/region or supported by overseas entities, your data may be stored/accessed/transferred cross‑border. We will take required safeguards under applicable law and obtain separate consent where required.')}</p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('6. 你的权利与联系我们', '6. Your rights & contact')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('你可通过 AURA@outlook.com 申请访问、更正、删除、注销账号、撤回同意等。我们会在合理期限内处理。', 'You can email AURA@outlook.com to request access, correction, deletion, account deletion, or consent withdrawal. We will respond within a reasonable time.')}
        </p>
      </section>
    </div>
  `;

  const termsHtml = `
    <div class="space-y-5 text-sm leading-relaxed text-[#2A2A2A] dark:text-[#F3F4F6]">
      <div class="text-xs text-[#8C867D] dark:text-[#7C857F]">
        <div>${t('运营方：绿漪AURA', 'Operator: Green Ripple AURA')}</div>
        <div>${t('联系邮箱：AURA@outlook.com', 'Email: AURA@outlook.com')}</div>
        <div>${t('生效日期：以应用内展示为准', 'Effective date: as shown in-app')}</div>
      </div>

      <section class="space-y-2">
        <h3 class="font-medium">${t('1. 账号与使用规范', '1. Accounts & acceptable use')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('你应合法合规使用 AURA，不得发布违法违规或侵权内容，不得干扰、攻击、逆向工程、爬取或滥用服务。账号仅限你本人/本组织使用。', 'You must use AURA lawfully. Do not post illegal/infringing content, interfere with the service, attack, reverse engineer, scrape, or abuse it. Accounts are for your own use (or your organization) only.')}
        </p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('2. 内容与知识产权', '2. Content & IP')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('AURA 的软件与相关内容的知识产权归我们或权利人所有。你上传/提交的内容由你或原权利人享有权利；你授予我们为提供与运营服务之目的进行必要处理（存储、展示、格式转换等）的非独占许可。', 'AURA software and related IP belong to us or rights holders. You retain rights to content you provide (or the original rights holder does). You grant us a non-exclusive license to process it as needed to provide and operate the service (storage, display, format conversion, etc.).')}
        </p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('3. 付费与退款规则（通用）', '3. Payments & refunds (general)')}</h3>
        <ul class="list-disc pl-5 space-y-1 text-[#5A5A5A] dark:text-[#B7C0BA]">
          <li>${t('付费项目、价格、权益与期限以购买页面为准。', 'Paid items, pricing, benefits, and terms are shown on the purchase page.')}</li>
          <li>${t('订阅类（如有）：你可随时取消自动续费，取消后在当前周期到期前仍可继续使用；一般情况下已开始的订阅周期不支持按比例退款，但重复扣费/系统异常/未获得相应权益等情形可申请核实处理。', 'Subscriptions (if any): you can cancel auto-renew anytime; access continues until the current period ends. Generally, started periods are non-refundable, but you may request review for duplicate charges, system errors, or missing entitlements.')}</li>
          <li>${t('一次性数字化服务/即时交付内容（如有）：除法律另有规定或我们另行承诺外，一般不支持无条件退款；如未交付或明显缺陷无法使用，可申请处理。', 'One-time digital goods/instant delivery (if any): generally non-refundable unless required by law or otherwise promised; if not delivered or unusable due to defects, you may request support.')}</li>
          <li>${t('退款申请：请邮件联系 AURA@outlook.com，提供账号信息、订单号、支付凭证截图（如有）与原因，我们会在合理期限内处理。', 'Refund requests: email AURA@outlook.com with account info, order number, proof of payment (if any), and reason; we will respond within a reasonable time.')}</li>
        </ul>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('4. 未成年人', '4. Minors')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('未成年人应在监护人同意与指导下使用。我们可能基于合规需要对未成年人账号或部分功能进行限制。', 'Minors should use the service with guardian consent and guidance. We may restrict minor accounts or certain features for compliance.')}
        </p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('5. 责任限制与争议解决', '5. Liability & disputes')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('在法律允许范围内，我们不对不可抗力、网络/系统故障、第三方原因导致的中断或损失承担全部责任。争议优先协商，协商不成提交运营方所在地有管辖权法院处理。', 'To the extent permitted by law, we are not liable for interruptions or losses caused by force majeure, network/system failures, or third parties. Disputes should be negotiated first; unresolved disputes go to the competent court where the operator is located.')}
        </p>
      </section>
    </div>
  `;

  const claimHtml = `
    <div class="space-y-5 text-sm leading-relaxed text-[#2A2A2A] dark:text-[#F3F4F6]">
      <div class="text-xs text-[#8C867D] dark:text-[#7C857F]">
        <div>${t('协议名称：绿漪共享菜园认领协议（演示版）', 'Title: Green Ripple Shared Garden Claim Agreement (Demo)')}</div>
        <div>${t('运营方：绿漪AURA', 'Operator: Green Ripple AURA')}</div>
        <div>${t('联系邮箱：AURA@outlook.com', 'Email: AURA@outlook.com')}</div>
      </div>

      <section class="space-y-2">
        <h3 class="font-medium">${t('1. 认领与使用说明', '1. Claim & usage')}</h3>
        <ul class="list-disc pl-5 space-y-1 text-[#5A5A5A] dark:text-[#B7C0BA]">
          <li>${t('“认领”系指你提交对指定地块/时段的使用意向与预约信息；最终是否确认，以我们邮件/站内确认结果为准。', '"Claim" means submitting your intent and booking details for a plot/time; final confirmation is subject to our email/in-app confirmation.')}</li>
          <li>${t('你应按约定时间入场与使用；如需改期/取消，请尽早通过邮件联系。', 'You should arrive and use the plot as scheduled; for reschedule/cancellation, contact us as early as possible via email.')}</li>
        </ul>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('2. 有机与安全承诺（重要）', '2. Organic & safety commitments (Important)')}</h3>
        <ul class="list-disc pl-5 space-y-1 text-[#5A5A5A] dark:text-[#B7C0BA]">
          <li>${t('不得使用化学农药、化学除草剂与其他可能破坏土壤/水体的化学品。', 'No chemical pesticides, herbicides, or other chemicals that may harm soil or water.')}</li>
          <li>${t('遵守现场安全与工具使用规则；儿童/未成年人应在监护人全程看护下活动。', 'Follow on-site safety and tool-use rules; children/minors must be supervised by a guardian at all times.')}</li>
          <li>${t('不得破坏公共设施、他人作物或地块边界；尊重邻里与公共秩序。', 'Do not damage shared facilities, others’ crops, or plot boundaries; respect others and public order.')}</li>
        </ul>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('3. 费用与退款（如适用）', '3. Fees & refunds (if applicable)')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('如认领涉及付费，具体价格、权益与退款规则以购买页面/订单页展示为准；如发生重复扣费、系统异常或未获得对应权益，可邮件申请核实处理。', 'If fees apply, pricing, benefits, and refund rules are shown on the purchase/order page. For duplicate charges, system errors, or missing entitlements, you may request review via email.')}
        </p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('4. 责任与风险提示', '4. Risk & liability')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('农事活动存在一定风险（如划伤、过敏、晒伤等）。在法律允许范围内，你应对自身健康状况与行为负责；若因你违反现场规则造成损失，你应承担相应责任。', 'Farming activities involve risks (cuts, allergies, sunburn, etc.). To the extent permitted by law, you are responsible for your health and actions; you are liable for losses caused by rule violations.')}
        </p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('5. 争议解决与联系我们', '5. Disputes & contact')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('如发生争议，优先协商；协商不成，提交运营方所在地有管辖权法院处理。联系邮箱：AURA@outlook.com。', 'Disputes should be negotiated first; unresolved disputes go to the competent court where the operator is located. Email: AURA@outlook.com.')}
        </p>
      </section>
    </div>
  `;

  const body = isPrivacy ? privacyHtml : (isTerms ? termsHtml : claimHtml);

  return `
    <div class="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div data-action="legal-close" class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-3xl bg-white dark:bg-[#0F1511] rounded-3xl border border-[#E8E2D9] dark:border-[#22302A]/60 shadow-2xl overflow-hidden">
        <div class="p-6 sm:p-7 border-b border-[#E8E2D9] dark:border-[#22302A]/60 flex items-start justify-between gap-4">
          <div>
            <h3 class="text-xl font-serif text-[#2A2A2A] dark:text-[#F3F4F6]">${title}</h3>
            <p class="text-xs text-[#8C867D] dark:text-[#7C857F] mt-1">${t('阅读即表示你理解并同意相关条款（如适用）。', 'By reading you acknowledge the applicable terms (if any).')}</p>
          </div>
          <button data-action="legal-close" class="w-9 h-9 rounded-full bg-[#F5F0E8] dark:bg-[#17211B] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#1E2A23] transition-colors">✕</button>
        </div>

        <div class="p-6 sm:p-7 max-h-[70vh] overflow-auto">
          ${body}
        </div>

        <div class="p-5 sm:p-6 border-t border-[#E8E2D9] dark:border-[#22302A]/60 bg-[#FAF9F6] dark:bg-[#0B0F0C] flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <button data-action="open-legal" data-legal="privacy" class="px-3 py-2 rounded-full text-xs font-medium border transition-colors ${state.legal.doc === 'privacy' ? 'bg-[#2A2A2A] text-white border-[#2A2A2A]' : 'bg-white dark:bg-[#0F1511] text-[#5A5A5A] dark:text-[#B7C0BA] border-[#E8E2D9] dark:border-[#22302A]/60 hover:border-[#87A96B]'}">${t('隐私政策', 'Privacy')}</button>
            <button data-action="open-legal" data-legal="terms" class="px-3 py-2 rounded-full text-xs font-medium border transition-colors ${state.legal.doc === 'terms' ? 'bg-[#2A2A2A] text-white border-[#2A2A2A]' : 'bg-white dark:bg-[#0F1511] text-[#5A5A5A] dark:text-[#B7C0BA] border-[#E8E2D9] dark:border-[#22302A]/60 hover:border-[#87A96B]'}">${t('用户协议', 'Terms')}</button>
            <button data-action="open-legal" data-legal="claim" class="px-3 py-2 rounded-full text-xs font-medium border transition-colors ${state.legal.doc === 'claim' ? 'bg-[#2A2A2A] text-white border-[#2A2A2A]' : 'bg-white dark:bg-[#0F1511] text-[#5A5A5A] dark:text-[#B7C0BA] border-[#E8E2D9] dark:border-[#22302A]/60 hover:border-[#87A96B]'}">${t('认领协议', 'Claim')}</button>
          </div>
          <button data-action="legal-close" class="px-4 py-2 rounded-full text-sm font-medium bg-[#87A96B] text-white hover:bg-[#76965B] transition-colors">${t('关闭', 'Close')}</button>
        </div>
      </div>
    </div>
  `;
}

function layout(contentHtml) {
  const route = parseRoute();
  const path = `#/${route.name === 'home' ? '' : route.name}`;

  return `
    <div class="min-h-screen bg-[#FAF9F6] text-[#2A2A2A] dark:bg-[#0B0F0C] dark:text-[#F3F4F6] font-sans selection:bg-[#B0D3A1] selection:text-[#2A2A2A] flex flex-col">
      <nav class="sticky top-0 z-50 bg-[#FAF9F6]/90 dark:bg-[#0B0F0C]/90 backdrop-blur-xl border-b border-[#E8E2D9]/50 dark:border-[#22302A]/60 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-20">
            <a href="#/" class="flex items-center gap-2">
              <span class="w-8 h-8 rounded-full bg-[#87A96B]/15 inline-flex items-center justify-center text-[#87A96B] font-bold">芽</span>
              <span class="font-semibold text-lg tracking-wide text-[#2A2A2A] dark:text-[#F3F4F6]">
                绿漪 <span class="text-[#87A96B] font-medium text-sm ml-1">Aura</span>
              </span>
            </a>

            <div class="hidden md:flex items-center space-x-8">
              ${navLink('/', '首页', 'Home', route.name === 'home')}
              ${navLink('/map', '选地认领', 'Plots', route.name === 'map' || route.name === 'plot' || route.name === 'booking', true)}
              ${navLink('/dashboard', '我的菜园', 'My Garden', route.name === 'dashboard', true)}
              <div class="h-4 w-[1px] bg-[#E8E2D9]"></div>
              <div class="flex items-center gap-3">
                ${state.auth.isAuthed ? `
                  <div class="hidden lg:flex items-center gap-2 text-xs bg-[#87A96B]/10 text-[#87A96B] px-3 py-1.5 rounded-full border border-[#87A96B]/20">
                    <span>👤</span><span>${t('已登录', 'Signed in')}</span>
                  </div>
                ` : `
                  <button data-action="auth-open" data-auth-mode="login" class="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2A2A2A] text-white text-sm font-medium hover:bg-black transition-colors shadow-sm">
                    ${t('登录/注册', 'Sign in')}
                  </button>
                `}
                <button data-action="toggle-lang" class="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F0E8] dark:bg-[#0F1511] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#17211B] transition-colors text-xs font-semibold tracking-wider" title="${state.lang === 'zh' ? '切换为英文' : 'Switch to Chinese'}">
                  ${state.lang === 'zh' ? 'EN' : '中'}
                </button>
                <a href="#/settings" class="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F0E8] dark:bg-[#0F1511] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#17211B] transition-colors" title="${state.lang === 'zh' ? '设置' : 'Settings'}">
                  <span class="text-sm">⚙</span>
                </a>
              </div>
            </div>

            <div class="md:hidden flex items-center gap-3">
              <button data-action="toggle-lang" class="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F0E8] dark:bg-[#0F1511] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#17211B] transition-colors text-xs font-semibold tracking-wider">
                ${state.lang === 'zh' ? 'EN' : '中'}
              </button>
              <button data-action="toggle-mobile-menu" class="text-[#2A2A2A] dark:text-[#F3F4F6] p-2 hover:bg-[#F5F0E8] dark:hover:bg-[#17211B] rounded-full transition-colors" aria-label="${state.mobileMenuOpen ? '关闭菜单' : '打开菜单'}">
                ${state.mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>

        ${state.mobileMenuOpen ? `
          <div class="md:hidden absolute top-full left-0 w-full bg-[#FAF9F6] dark:bg-[#0B0F0C] border-b border-[#E8E2D9]/50 dark:border-[#22302A]/60 shadow-lg animate-in">
            <div class="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              <a href="#/" data-action="close-mobile-menu" class="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${route.name === 'home' ? 'bg-[#87A96B]/10 text-[#87A96B]' : 'text-[#5A5A5A] hover:bg-[#F5F0E8]'}">
                ${state.lang === 'zh' ? '首页' : 'Home'}
              </a>
              <a href="#/map" data-requires-auth="1" data-action="close-mobile-menu" class="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${route.name === 'map' ? 'bg-[#87A96B]/10 text-[#87A96B]' : 'text-[#5A5A5A] hover:bg-[#F5F0E8]'}">
                ${state.lang === 'zh' ? '选地认领' : 'Plots'}
              </a>
              <a href="#/dashboard" data-requires-auth="1" data-action="close-mobile-menu" class="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${route.name === 'dashboard' ? 'bg-[#87A96B]/10 text-[#87A96B]' : 'text-[#5A5A5A] hover:bg-[#F5F0E8]'}">
                ${state.lang === 'zh' ? '我的菜园' : 'My Garden'}
              </a>
              <a href="#/settings" data-action="close-mobile-menu" class="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${route.name === 'settings' ? 'bg-[#87A96B]/10 text-[#87A96B]' : 'text-[#5A5A5A] hover:bg-[#F5F0E8]'}">
                ${state.lang === 'zh' ? '设置' : 'Settings'}
              </a>
            </div>
          </div>
        ` : ''}
      </nav>

      <main class="flex-1 flex flex-col relative">
        ${contentHtml}
      </main>

      <footer class="bg-white dark:bg-[#0F1511] text-[#5A5A5A] dark:text-[#B7C0BA] py-12 shrink-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-[#87A96B]/15 inline-flex items-center justify-center text-[#87A96B] font-bold text-xs">芽</span>
            <span class="font-medium tracking-wide text-[#2A2A2A] dark:text-[#F3F4F6]">绿漪 Aura</span>
          </div>
          <div class="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <div class="flex items-center gap-4 text-sm">
              <button data-action="open-legal" data-legal="privacy" class="hover:text-[#87A96B] transition-colors">${t('隐私政策', 'Privacy policy')}</button>
              <button data-action="open-legal" data-legal="terms" class="hover:text-[#87A96B] transition-colors">${t('用户协议', 'Terms')}</button>
              <button data-action="open-legal" data-legal="claim" class="hover:text-[#87A96B] transition-colors">${t('认领协议', 'Claim agreement')}</button>
            </div>
            <p class="text-sm">© 2026 Aura. ${t('保留所有权利。', 'All rights reserved.')}</p>
          </div>
        </div>
      </footer>

      ${authModal()}
      ${changePasswordModal()}
      ${visitModal()}
      ${bookingDetailModal()}
      ${legalModal()}
      ${adminUnlockModal()}
    </div>
  `;
}

function pageHome() {
  return `
    <div class="flex-1 w-full text-[#2A2A2A]">
      <section class="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1642676677233-9bc8e693dc28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Family farming in a sunny organic garden" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/80 via-[#2A2A2A]/40 to-transparent"></div>
        </div>
        <div class="relative z-10 max-w-4xl mx-auto px-4 text-center mt-32">
          <h1 class="text-5xl md:text-6xl font-serif text-[#FAF9F6] mb-6 tracking-tight">
            ${t('在CWA，拥有一块田', 'Own a garden plot—right in the CWA')}
          </h1>
          <p class="text-xl md:text-2xl text-[#F5F0E8] mb-12 font-light">
            ${t('远离都市喧嚣，认领你的私家小菜园，感受播种到收获的自然喜悦。', 'Escape the noise. Claim your personal plot and enjoy the journey from seed to harvest.')}
          </p>
          <a href="#/map" data-requires-auth="1" class="inline-flex items-center gap-2 bg-[#E8A86C] text-[#2A2A2A] px-10 py-4 rounded-full text-lg font-medium hover:bg-[#D99A60] hover:scale-105 transition-all shadow-lg">
            ${t('立即选地', 'Choose a plot')} <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-serif text-[#2A2A2A] mb-4">
            ${t('简单三步，成为农场主', 'Three steps to become a grower')}
          </h2>
          <p class="text-[#5A5A5A] max-w-2xl mx-auto">
            ${t('我们提供完善的配套服务，耕种能让你轻松享受田园生活。', 'We provide end-to-end support—planting can enjoy the garden life with ease.')}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div class="bg-white rounded-3xl p-8 shadow-sm border border-[#E8E2D9] hover:shadow-md transition-shadow text-center group">
            <div class="w-16 h-16 mx-auto bg-[#F5F0E8] text-[#87A96B] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#87A96B] group-hover:text-white transition-colors">
              <span class="text-2xl">🛒</span>
            </div>
            <h3 class="text-xl font-medium mb-3">${t('线上下单', 'Order online')}</h3>
            <p class="text-[#5A5A5A] text-sm leading-relaxed">
              ${t('在地图上挑选心仪地块,一键完成认领', 'Pick your favorite plot on the map and claim it in one click.')}
            </p>
          </div>

          <div class="bg-white rounded-3xl p-8 shadow-sm border border-[#E8E2D9] hover:shadow-md transition-shadow text-center group">
            <div class="w-16 h-16 mx-auto bg-[#F5F0E8] text-[#B35C44] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#B35C44] group-hover:text-white transition-colors">
              <span class="text-2xl">✉️</span>
            </div>
            <h3 class="text-xl font-medium mb-3">${t('邮件通知', 'Email confirmation')}</h3>
            <p class="text-[#5A5A5A] text-sm leading-relaxed">
              ${t('认领成功后，我们会在第一时间发送确认邮件，包含您的专属地块凭证、农场导航及新手种植指南等', 'After claiming, we’ll send a confirmation email with your plot pass, directions, and other materials that can help you plant.')}
            </p>
          </div>

          <div class="bg-white rounded-3xl p-8 shadow-sm border border-[#E8E2D9] hover:shadow-md transition-shadow text-center group">
            <div class="w-16 h-16 mx-auto bg-[#F5F0E8] text-[#E8A86C] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#E8A86C] group-hover:text-white transition-colors">
              <span class="text-2xl">🌱</span>
            </div>
            <h3 class="text-xl font-medium mb-3">${t('前往种地', 'Start growing')}</h3>
            <p class="text-[#5A5A5A] text-sm leading-relaxed">
              ${t('凭邮件指引前往绿漪农场，领取农具与种子，挽起袖子，即可开启属于你的田园种植之旅', 'Follow the email guide, pick up tools and seeds, and begin your growing journey.')}
            </p>
          </div>
        </div>
      </section>
    </div>
  `;
}

function plotStyles(id, customBaseColor) {
  const plot = PLOTS.find((p) => p.id === id);
  if (!plot) return '';
  let stateStyles = '';
  if (plot.status === 'available') stateStyles = `${customBaseColor || 'bg-[#87A96B]'} hover:brightness-110 cursor-pointer text-white shadow-sm`;
  if (plot.status === 'rented') stateStyles = `bg-[#B8B2A9] opacity-70 cursor-not-allowed text-[#5A5A5A]`;
  if (plot.status === 'pending') stateStyles = `bg-[#E8A86C]/90 cursor-pointer text-white shadow-sm`;
  if (plot.status === 'unavailable') stateStyles = `bg-[#E8E2D9] text-[#BDB6AC] cursor-not-allowed border border-dashed border-[#D1CCC5] shadow-inner`;
  const selectedStyles = state.selectedPlotId === id && plot.status !== 'unavailable'
    ? 'ring-4 ring-white shadow-xl z-10 scale-[1.03] font-bold text-white border-2 border-[#87A96B]'
    : 'border border-white/20';
  return `transition-all duration-300 relative flex items-center justify-center text-center font-medium overflow-hidden ${stateStyles} ${selectedStyles}`;
}

function pageMap() {
  const selectedPlot = state.selectedPlotId ? PLOTS.find((p) => p.id === state.selectedPlotId) : null;
  return `
    <div class="absolute inset-0 flex flex-col bg-[#FAF9F6] dark:bg-[#0B0F0C] overflow-hidden">
      <div class="w-full bg-white/90 dark:bg-[#0F1511]/90 backdrop-blur-md px-6 py-4 md:px-10 md:py-5 shadow-sm border-b border-[#E8E2D9] dark:border-[#22302A]/60 z-30 shrink-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 class="text-[#2A2A2A] font-medium text-xl flex items-center gap-2">
          ${t('绿漪农场全景图', 'Aura Farm Overview')}
        </h3>
        <div class="flex flex-wrap gap-4 text-sm text-[#5A5A5A]">
          <div class="flex items-center gap-2"><div class="w-4 h-4 bg-[#87A96B] rounded shadow-sm border border-black/5"></div> ${t('可选', 'Available')}</div>
          <div class="flex items-center gap-2"><div class="w-4 h-4 bg-[#E8A86C] rounded shadow-sm border border-black/5"></div> ${t('待审核', 'Pending')}</div>
          <div class="flex items-center gap-2"><div class="w-4 h-4 bg-[#B8B2A9] rounded shadow-sm border border-black/5"></div> ${t('已认领', 'Claimed')}</div>
          <div class="flex items-center gap-2"><div class="w-4 h-4 bg-[#E8E2D9] border border-dashed border-[#D1CCC5] rounded"></div> ${t('保育中', 'Rehab')}</div>
        </div>
      </div>

      <div class="relative flex-1 flex overflow-hidden">
        ${selectedPlot && selectedPlot.status !== 'unavailable' ? `
          <div class="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-40 w-80 bg-white dark:bg-[#0F1511] rounded-3xl pt-4 pb-5 px-5 shadow-2xl border border-[#E8E2D9] dark:border-[#22302A]/60 animate-in">
            <button data-action="clear-selected-plot" class="ml-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 dark:bg-[#111] text-[#8C867D] hover:text-[#2A2A2A] hover:bg-white shadow-sm transition-colors">✕</button>
            <img src="${selectedPlot.image}" alt="${escapeHtml(plotLabel(selectedPlot))}" class="w-full h-32 object-cover rounded-2xl mb-4" />
            <div class="mb-4">
              <div class="flex justify-between items-start mb-1">
                <h3 class="font-medium text-lg text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(plotLabel(selectedPlot))}</h3>
                <span class="text-[#87A96B] bg-[#87A96B]/10 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                  ${t('试营业免费', 'Free trial')}
                </span>
              </div>
              <div class="flex items-center gap-2 text-sm text-[#5A5A5A]">
                <span class="flex items-center gap-1">📍 ${selectedPlot.size}㎡</span>
                ${selectedPlot.status === 'rented' ? `<span class="text-white bg-[#B8B2A9] px-2 py-0.5 rounded text-xs">${t('已认领', 'Claimed')}</span>` : ''}
                ${selectedPlot.status === 'pending' ? `<span class="text-white bg-[#E8A86C] px-2 py-0.5 rounded text-xs">${t('待审核', 'Pending')}</span>` : ''}
              </div>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              ${plotTags(selectedPlot).map((tag) => `<span class="text-xs px-2.5 py-1 rounded-md bg-[#F5F0E8] text-[#5A5A5A]">${escapeHtml(tag)}</span>`).join('')}
            </div>
            <p class="text-sm text-[#5A5A5A] mb-5">
              ${escapeHtml(plotDesc(selectedPlot) || t('现在预订，立享新手种植大礼包。', 'Book now and get a beginner grow kit.'))}
            </p>
            ${selectedPlot.status === 'available' ? `
              <a href="#/plot/${encodeURIComponent(selectedPlot.id)}" class="w-full bg-[#87A96B] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#76965B] transition-colors shadow-sm flex items-center justify-center gap-2">
                🌿 ${t('查看地块详情', 'View details')}
              </a>
            ` : `
              <button disabled class="w-full bg-[#F5F0E8] text-[#BDB6AC] py-3 rounded-xl text-sm font-medium cursor-not-allowed">${t('不可预订', 'Unavailable')}</button>
            `}
          </div>
        ` : ''}

        <div class="flex-1 overflow-auto flex p-6 md:p-10 lg:p-16 relative w-full h-full">
          <div class="m-auto shrink-0 w-full min-w-[800px] min-h-[600px] md:min-h-0 max-w-5xl aspect-[4/3] md:aspect-[16/9] bg-[#E8E2D9]/40 p-6 md:p-8 rounded-[2rem] flex flex-col gap-6 md:gap-8 shadow-inner relative border-2 border-[#D1CCC5]/30">
            <div class="flex-1 flex flex-col md:flex-row gap-6 md:gap-12 w-full min-h-0 justify-center items-center">
              <div class="w-full md:w-[450px] lg:w-[500px] flex gap-4 md:gap-6 h-full shrink-0">
                <div class="flex-1 rounded-2xl flex-col flex items-center justify-center ${plotStyles('L1')}">
                  <span class="text-base md:text-lg tracking-[0.5em] writing-vertical-lr text-[#BDB6AC]/80">
                    ${t('保育区 一', 'Rehab Zone 1')}
                  </span>
                </div>
                <div class="flex-1 rounded-2xl flex-col flex items-center justify-center ${plotStyles('L2')}">
                  <span class="text-base md:text-lg tracking-[0.5em] writing-vertical-lr text-[#BDB6AC]/80">
                    ${t('保育区 二', 'Rehab Zone 2')}
                  </span>
                </div>
                <div class="flex-1 rounded-2xl flex-col flex items-center justify-center ${plotStyles('L3')}">
                  <span class="text-base md:text-lg tracking-[0.5em] writing-vertical-lr text-[#BDB6AC]/80">
                    ${t('保育区 三', 'Rehab Zone 3')}
                  </span>
                </div>
              </div>
              <div class="hidden md:block flex-1"></div>
              <div class="w-full md:w-[260px] lg:w-[320px] shrink-0 grid grid-cols-2 grid-rows-2 gap-4 md:gap-8 h-full">
                <button data-action="select-plot" data-plot-id="R1" class="rounded-2xl md:rounded-[2rem] shadow-md flex items-center justify-center ${plotStyles('R1', 'bg-[#87A96B]')}">
                  <span class="text-lg md:text-xl font-bold tracking-[0.3em] drop-shadow-sm writing-vertical-lr">R1</span>
                </button>
                <button data-action="select-plot" data-plot-id="R2" class="rounded-2xl md:rounded-[2rem] shadow-md flex items-center justify-center ${plotStyles('R2', 'bg-[#87A96B]')}">
                  <span class="text-lg md:text-xl font-bold tracking-[0.3em] drop-shadow-sm writing-vertical-lr">R2</span>
                </button>
                <button data-action="select-plot" data-plot-id="R3" class="rounded-2xl md:rounded-[2rem] shadow-md flex items-center justify-center ${plotStyles('R3', 'bg-[#87A96B]')}">
                  <span class="text-lg md:text-xl font-bold tracking-[0.3em] drop-shadow-sm writing-vertical-lr">R3</span>
                </button>
                <button data-action="select-plot" data-plot-id="R4" class="rounded-2xl md:rounded-[2rem] shadow-md flex items-center justify-center ${plotStyles('R4', 'bg-[#87A96B]')}">
                  <span class="text-lg md:text-xl font-bold tracking-[0.3em] drop-shadow-sm writing-vertical-lr">R4</span>
                </button>
              </div>
            </div>

            <div class="w-full h-14 md:h-20 flex gap-4 md:gap-6 shrink-0">
              <div class="flex-1 bg-[#D1CCC5]/30 rounded-2xl flex items-center justify-center relative overflow-hidden border border-[#D1CCC5]/60 shadow-inner">
                <div class="w-full border-t-[3px] border-dashed border-[#BDB6AC]/30 absolute top-1/2 -translate-y-1/2"></div>
                <div class="z-10 bg-[#E8E2D9] px-6 py-1.5 rounded-full shadow-sm border border-[#D1CCC5]/60 text-[#8C867D] text-sm md:text-base font-medium tracking-[0.5em] pl-[calc(1.5rem+0.5em)]">
                  ${t('主连廊', 'Main corridor')}
                </div>
              </div>
              <div class="w-24 md:w-32 bg-[#C2A383] rounded-2xl border-[3px] md:border-4 border-[#8C6B4E] shadow-sm flex items-center justify-center">
                <div class="flex flex-col items-center gap-1 text-white font-medium drop-shadow-md">
                  <span>🚪</span>
                  <span class="text-[10px] md:text-xs tracking-widest ml-1">
                    ${t('大门', 'Gate')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function pagePlotDetail({ id }) {
  const upper = (id || 'A01').toUpperCase();
  return `
    <div class="flex-1 pb-12">
      <div class="w-full h-[45vh] min-h-[400px] bg-[#E8E2D9] relative flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
        <img src="https://images.unsplash.com/photo-1761329707861-767a160525ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="${t('地块实景 1', 'Plot view 1')}" class="w-full sm:w-2/3 h-full object-cover shrink-0 snap-center border-r-2 border-[#FAF9F6]" />
        <img src="https://images.unsplash.com/photo-1657383765722-1e2354dbba61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="${t('地块实景 2', 'Plot view 2')}" class="w-full sm:w-2/3 h-full object-cover shrink-0 snap-center border-r-2 border-[#FAF9F6]" />
        <img src="https://images.unsplash.com/photo-1727099079513-952d40de9d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="${t('地块实景 3', 'Plot view 3')}" class="w-full sm:w-2/3 h-full object-cover shrink-0 snap-center" />
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <div class="w-2 h-2 rounded-full bg-white opacity-100"></div>
          <div class="w-2 h-2 rounded-full bg-white opacity-50"></div>
          <div class="w-2 h-2 rounded-full bg-white opacity-50"></div>
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div class="bg-white dark:bg-[#0F1511] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9] dark:border-[#22302A]/60 mb-8">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <span class="bg-[#87A96B] text-white text-xs px-2 py-1 rounded-md font-medium">${t('A 区可选', 'Zone A · Available')}</span>
                <span class="bg-[#F5F0E8] text-[#5A5A5A] text-xs px-2 py-1 rounded-md font-medium">${t('20㎡', '20 m²')}</span>
              </div>
              <h1 class="text-3xl font-serif text-[#2A2A2A]">${t('绿漪', 'Aura')} ${escapeHtml(upper)} ${t('号地块', 'Plot')}</h1>
            </div>
            <div class="text-left sm:text-right">
              <div class="inline-block bg-[#87A96B]/10 text-[#87A96B] px-4 py-2 rounded-xl text-lg font-semibold mt-2 border border-[#87A96B]/20">${t('试营业免费', 'Free trial')}</div>
            </div>
          </div>
        </div>

        <div class="mb-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-serif text-[#2A2A2A]">${t('前任地主评价', 'Reviews from previous growers')}</h2>
            <div class="flex items-center gap-1 text-[#E8A86C]">
              <span>★★★★★</span>
              <span class="text-[#5A5A5A] text-sm ml-2">${t('4.8 (12条评价)', '4.8 (12 reviews)')}</span>
            </div>
          </div>
          <div class="space-y-4">
            ${[1, 2].map(() => `
              <div class="bg-white dark:bg-[#0F1511] rounded-2xl p-5 border border-[#E8E2D9] dark:border-[#22302A]/60">
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 bg-[#F5F0E8] rounded-full flex items-center justify-center text-[#87A96B]">👤</div>
                  <div>
                    <p class="text-sm font-medium text-[#2A2A2A]">${t('李女士', 'Ms. Li')}</p>
                    <p class="text-[10px] text-[#5A5A5A]">${t('认领周期：2025春季', 'Season: Spring 2025')}</p>
                  </div>
                </div>
                <p class="text-sm text-[#2A2A2A] leading-relaxed mb-3">
                  ${t(
                    '土质非常好，托管模式省心省力。每周都能收到管家发来的照片，上周去采摘了第一波小西红柿，孩子特别开心！',
                    'Great soil and the managed plan is truly hassle-free. We got weekly photos, and last week we picked our first cherry tomatoes—kids loved it!'
                  )}
                </p>
                <div class="flex gap-2">
                  <img src="https://images.unsplash.com/photo-1753172433718-d0c2a99443d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200" alt="${t('采收', 'Harvest')}" class="w-16 h-16 rounded-lg object-cover" />
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <div class="sticky bottom-0 left-0 right-0 bg-white border-t border-[#E8E2D9] p-4 sm:p-6 z-20">
        <div class="max-w-4xl mx-auto flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-sm text-[#5A5A5A]">${t('试营业特惠', 'Trial offer')}</span>
            <div class="flex items-end gap-2 mt-1">
              <span class="text-xl font-semibold text-[#87A96B]">${t('免费体验', 'Free trial')}</span>
              <span class="text-xs text-[#5A5A5A] mb-1">${t('免认领及套餐费', 'No claim or package fees')}</span>
            </div>
          </div>
          <a href="#/booking/${encodeURIComponent(id || 'A01')}" class="bg-[#B35C44] text-white px-8 py-3.5 rounded-full font-medium shadow-lg hover:bg-[#9E513A] hover:-translate-y-0.5 transition-all flex items-center gap-2">
            ${t('立即预约', 'Book now')} <span aria-hidden="true">›</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

function pageBooking({ id }) {
  const upper = (id || 'A01').toUpperCase();
  return `
    <div class="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-serif text-[#2A2A2A] mb-10 flex items-center gap-3">
          <span class="w-8 h-8 inline-flex items-center justify-center rounded-full bg-[#87A96B]/15 text-[#87A96B]">🌿</span>
          ${t('确认认领', 'Confirm claim')}
        </h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
              <h2 class="text-xl font-medium text-[#2A2A2A] mb-6 flex items-center gap-2">
                <span>🗓️</span>
                ${t('自定义认领日期', 'Pick a start date')}
              </h2>
              <div class="mb-6 relative">
                <input id="booking-date" type="text" placeholder="${t('例如：2026年5月1日 或 随时可以开始', 'e.g. May 1, 2026 — or “Anytime”')}" class="w-full pl-4 pr-10 py-3.5 bg-[#FAF9F6] border border-[#E8E2D9] rounded-2xl focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all text-[#2A2A2A] placeholder-[#A09C96]" />
                <span class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A09C96]">✎</span>
              </div>
              <div class="bg-[#F5F0E8]/50 rounded-xl p-4 text-sm text-[#5A5A5A] flex gap-3">
                <span class="w-5 h-5 shrink-0">⚠</span>
                <p>
                  ${t('当前季节适合种植：', 'Best crops this season:')}
                  <strong class="text-[#2A2A2A]">${t('生菜、菠菜、小白菜、西红柿', 'lettuce, spinach, bok choy, cherry tomatoes')}</strong>。
                  ${t('由于试营业免除所有费用，您可以在此灵活沟通意向日期。', 'During the trial, everything is free—feel free to propose any start date.')}
                </p>
              </div>
            </div>

            <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
              <h2 class="text-xl font-medium text-[#2A2A2A] mb-6 flex items-center gap-2">
                <span>🌱</span>
                ${t('种子选择与数量', 'Seeds & quantity')}
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-[#2A2A2A] mb-2">${t('选择种子', 'Select seeds')}</label>
                  <div class="relative">
                    <select id="seed-type" class="w-full appearance-none pl-4 pr-10 py-3.5 bg-[#FAF9F6] border border-[#E8E2D9] rounded-2xl focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all text-[#2A2A2A]">
                      <option value="">${t('请选择…', 'Please choose…')}</option>
                      <option value="lettuce">🥬 ${t('生菜', 'Lettuce')}</option>
                      <option value="spinach">🌿 ${t('菠菜', 'Spinach')}</option>
                      <option value="bokchoy">🥬 ${t('小白菜', 'Bok choy')}</option>
                      <option value="tomato">🍅 ${t('西红柿', 'Tomato')}</option>
                    </select>
                    <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#A09C96]">▾</div>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-[#2A2A2A] mb-2">${t('数量', 'Quantity')}</label>
                  <input id="seed-qty" type="number" min="1" step="1" inputmode="numeric" placeholder="1" class="w-full pl-4 pr-4 py-3.5 bg-[#FAF9F6] border border-[#E8E2D9] rounded-2xl focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all text-[#2A2A2A] placeholder-[#A09C96]" />
                </div>
              </div>
              <div class="mt-4 bg-[#F5F0E8]/50 rounded-xl p-4 text-sm text-[#5A5A5A] flex gap-3">
                <span class="w-5 h-5 shrink-0">ℹ</span>
                <p>${t('数量按“份/包”填写即可；后续可与管家沟通具体品种与播种计划。', 'Enter quantity by “packs/sets”. You can refine varieties and sowing plans with the steward later.')}</p>
              </div>
            </div>

            <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
              <h2 class="text-xl font-medium text-[#2A2A2A] mb-6">${t('认领周期', 'Duration')}</h2>
              <div class="flex flex-wrap gap-4 mb-4">
                ${[
                  { v: '3', t: t('一季度', '3 months') },
                  { v: '6', t: t('半年', '6 months') },
                  { v: '12', t: t('一年', '12 months') },
                  { v: 'custom', t: t('自定义', 'Custom') },
                ].map((x) => `
                  <button data-action="set-duration" data-duration="${x.v}" class="flex-1 min-w-[80px] py-3 rounded-full text-sm font-medium border-2 transition-all border-[#E8E2D9] text-[#5A5A5A] hover:border-[#B35C44]/50">
                    ${x.t}
                  </button>
                `).join('')}
              </div>
              <div id="custom-duration-wrap" class="hidden relative mt-2">
                <input id="custom-duration" type="text" placeholder="${t('请输入自定义认领周期（如：2个月、试种几周等）', 'Enter a custom duration (e.g. 2 months, a few weeks)')}" class="w-full pl-4 pr-10 py-3.5 bg-[#FAF9F6] border border-[#E8E2D9] rounded-2xl focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all text-[#2A2A2A] placeholder-[#A09C96]" />
                <span class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A09C96]">✎</span>
              </div>
            </div>
          </div>

          <div class="lg:col-span-1">
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-[#E8E2D9] sticky top-24">
              <h3 class="text-lg font-serif text-[#2A2A2A] mb-6">${t('订单明细', 'Order summary')}</h3>
              <div class="space-y-4 text-sm mb-6">
                <div class="flex justify-between text-[#5A5A5A]">
                  <span>${t('地块编号', 'Plot')}</span>
                  <span class="font-medium text-[#2A2A2A]">${t('绿漪', 'Aura')} ${escapeHtml(upper)}</span>
                </div>
                <div class="flex justify-between text-[#5A5A5A]">
                  <span>${t('认领时间', 'Schedule')}</span>
                  <span id="summary-date" class="font-medium text-[#2A2A2A] text-right">${t('待沟通', 'TBD')}<br/><span id="summary-duration" class="text-xs text-[#87A96B]">${t('(3个月)', '(3 months)')}</span></span>
                </div>
                <div class="flex justify-between text-[#5A5A5A]">
                  <span>${t('种子', 'Seeds')}</span>
                  <span id="summary-seed" class="font-medium text-[#2A2A2A] text-right">${t('待选择', 'Not selected')}</span>
                </div>
                <div class="flex justify-between text-[#5A5A5A]">
                  <span>${t('数量', 'Quantity')}</span>
                  <span id="summary-qty" class="font-medium text-[#2A2A2A] text-right">—</span>
                </div>
                <div class="flex justify-between items-center text-[#5A5A5A]">
                  <span>${t('试营业费用', 'Trial pricing')}</span>
                  <span class="font-medium text-[#87A96B] bg-[#87A96B]/10 px-2 py-0.5 rounded text-xs">${t('全免', 'Free')}</span>
                </div>
              </div>

              <div class="border-t border-[#E8E2D9] pt-4 mb-6">
                <div class="flex justify-between items-end">
                  <span class="text-[#2A2A2A] font-medium">${t('总计', 'Total')}</span>
                  <span class="text-2xl font-semibold text-[#87A96B]">${t('免费体验', 'Free trial')}</span>
                </div>
              </div>

              <label class="flex items-start gap-3 cursor-pointer mb-6 group">
                <input id="agree" type="checkbox" class="hidden" />
                <div id="agree-box" class="w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors border-[#D1CCC5] group-hover:border-[#87A96B]"></div>
                <span class="text-xs text-[#5A5A5A] leading-relaxed">
                  ${t('我已阅读并同意', 'I have read and agree to the')}
                  <button type="button" data-action="open-legal" data-legal="claim" class="text-[#87A96B] hover:underline underline-offset-2 mx-1">
                    ${t('《绿漪共享菜园认领协议》', 'Aura Shared Garden Agreement')}
                  </button>
                  ${t('，承诺不使用化学农药，共同维护有机土壤环境。', ', and commit to chemical-free farming to protect organic soil.')}
                </span>
              </label>

              <button id="confirm-booking" data-action="confirm-booking" disabled class="w-full py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all bg-[#E8E2D9] text-[#8C867D] cursor-not-allowed">
                ${t('确认预约', 'Confirm')} <span aria-hidden="true">›</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function pageDashboard() {
  const visitBookings = state.dashboard.visitBookings || [];
  const claimBookings = state.dashboard.claimBookings || [];
  const showAllClaim = !!state.dashboard.showAllClaimBookings;
  const sortedVisit = [...visitBookings].sort((a, b) => {
    const ida = typeof a.id === 'number' ? a.id : 0;
    const idb = typeof b.id === 'number' ? b.id : 0;
    return idb - ida; // newer first
  });
  const sortedClaim = [...claimBookings].sort((a, b) => {
    const ida = typeof a.id === 'number' ? a.id : 0;
    const idb = typeof b.id === 'number' ? b.id : 0;
    return idb - ida;
  });
  const visibleVisit = sortedVisit.slice(0, 2);
  const visibleClaim = showAllClaim ? sortedClaim : sortedClaim.slice(0, 2);
  const greeting = (() => {
    const h = new Date().getHours();
    if (state.lang === 'zh') return h < 11 ? '早上好' : (h < 18 ? '下午好' : '晚上好');
    return h < 11 ? 'Good morning' : (h < 18 ? 'Good afternoon' : 'Good evening');
  })();
  return `
    <div class="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div class="flex items-center gap-5">
            <div class="relative">
              <img src="https://images.unsplash.com/photo-1769225962029-f333de0c1116?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200" alt="User Avatar" class="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm" />
              <div class="absolute -bottom-1 -right-1 bg-[#87A96B] w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                <span class="text-white text-xs">🌱</span>
              </div>
            </div>
            <div>
              <h1 class="text-2xl font-serif text-[#2A2A2A] mb-1">
                ${state.lang === 'zh' ? `${greeting}，林女士` : `${greeting}, Ms. Lin`}
              </h1>
              <p class="text-[#5A5A5A] text-sm">
                ${t('绿漪农场见证了您的 128 天田园时光', 'Aura Farm has witnessed 128 days of your garden journey')}
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <button data-action="open-visit-modal" class="bg-[#2A2A2A] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors shadow-sm flex items-center gap-2">
              🗓️ ${t('预约入场', 'Book a visit')}
            </button>
          </div>
        </div>

        <div class="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-3xl p-6 shadow-sm border border-[#E8E2D9]">
              <div class="flex items-center justify-between mb-5">
                <h3 class="text-lg font-medium text-[#2A2A2A] flex items-center gap-2">🗓️ ${t('入场预约历史', 'Visit history')}</h3>
                ${visitBookings.length > 2 ? `
                  <a href="#/visits" class="text-xs text-[#8C867D] hover:text-[#2A2A2A] underline underline-offset-4">
                    ${t('查看全部入场预约', 'View all visits')}
                  </a>
                ` : `<span class="text-[#8C867D] text-xs">${t('最近两次', 'Last two')}</span>`}
              </div>

            ${visitBookings.length > 0 ? `
              <div class="space-y-3">
                ${visibleVisit.map((b) => `
                  <div class="group bg-[#F5F0E8]/50 rounded-2xl border border-transparent hover:border-[#E8E2D9] transition-all">
                    <div class="flex items-center justify-between px-4 py-3">
                      <div>
                        <div class="text-sm font-medium text-[#2A2A2A] mb-0.5">${escapeHtml(b.date || '')}</div>
                        <div class="text-xs text-[#5A5A5A]">
                          ${escapeHtml(b.time || '')} · ${escapeHtml(String(b.count ?? 0))}${t('人入场', ' guests')}
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="text-[11px] px-2 py-1 rounded-full bg-white text-[#87A96B] border border-[#87A96B]/20 font-medium">
                          ${b.status === 'upcoming' ? t('待出行', 'Upcoming') : t('已完成', 'Completed')}
                        </span>
                        <button data-action="open-booking-detail" data-booking-kind="visit" data-booking-id="${String(b.id ?? '')}" class="text-xs text-[#8C867D] hover:text-[#2A2A2A] underline underline-offset-4">
                          ${t('查看详情', 'View details')}
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="text-center py-8 text-[#5A5A5A]">
                <div class="w-10 h-10 mx-auto text-[#D1CCC5] mb-3 opacity-50">🗓️</div>
                <p class="text-sm">${t('暂无入场预约记录。', 'No visit bookings yet.')}</p>
              </div>
            `}
          </div>

          <div class="bg-white rounded-3xl p-6 shadow-sm border border-[#E8E2D9]">
            <div class="flex items-center justify-between mb-5">
              <h3 class="text-lg font-medium text-[#2A2A2A] flex items-center gap-2">📄 ${t('认领申请历史', 'Claim history')}</h3>
              ${claimBookings.length > 0 ? `
                <button data-action="toggle-claim-bookings-view" class="text-xs text-[#8C867D] hover:text-[#2A2A2A] underline underline-offset-4">
                  ${showAllClaim ? t('收起，只看最近两次', 'Collapse, show last two') : t('查看全部认领记录', 'View all claims')}
                </button>
              ` : `<span class="text-[#8C867D] text-xs">${t('暂无记录', 'No records')}</span>`}
            </div>

            ${claimBookings.length > 0 ? `
              <div class="space-y-3">
                ${visibleClaim.map((b) => `
                  <div class="group bg-[#FAF9F6] rounded-2xl border border-transparent hover:border-[#E8E2D9] transition-all">
                    <div class="flex items-center justify-between px-4 py-3">
                      <div>
                        <div class="text-sm font-medium text-[#2A2A2A] mb-0.5">${escapeHtml(b.date || '')}</div>
                        <div class="text-xs text-[#5A5A5A]">
                          ${t('地块', 'Plot')}: ${escapeHtml(b.plot || 'A01')}
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="text-[11px] px-2 py-1 rounded-full bg-white text-[#87A96B] border border-[#87A96B]/20 font-medium">
                          ${b.status === 'pending' ? t('待确认', 'Pending') : t('已处理', 'Processed')}
                        </span>
                        <button data-action="open-booking-detail" data-booking-kind="claim" data-booking-id="${String(b.id ?? '')}" class="text-xs text-[#8C867D] hover:text-[#2A2A2A] underline underline-offset-4">
                          ${t('查看详情', 'View details')}
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="text-center py-8 text-[#5A5A5A]">
                <div class="w-10 h-10 mx-auto text-[#D1CCC5] mb-3 opacity-50">📄</div>
                <p class="text-sm">${t('暂无认领申请记录。', 'No claim history yet.')}</p>
              </div>
            `}
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-8">
            <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div class="flex items-center gap-2">
                  <span class="text-[#87A96B]">📈</span>
                  <h2 class="text-xl font-medium text-[#2A2A2A]">${t('A01 种植进度', 'A01 Growth progress')}</h2>
                  <div class="relative ml-1">
                    <select class="appearance-none bg-[#F5F0E8] border border-[#E8E2D9] hover:border-[#87A96B] text-sm font-medium rounded-full px-4 py-1.5 pr-8 outline-none text-[#87A96B] cursor-pointer transition-colors focus:ring-2 focus:ring-[#87A96B]/20">
                      <option>🍅 ${t('小番茄', 'Cherry tomatoes')}</option>
                      <option>🥬 ${t('生菜', 'Lettuce')}</option>
                      <option>🥕 ${t('小萝卜', 'Radish')}</option>
                    </select>
                    <div class="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#87A96B]">▾</div>
                  </div>
                </div>
              </div>

              <div class="relative h-4 bg-[#F5F0E8] rounded-full overflow-hidden mb-6">
                <div id="dash-progress" class="absolute top-0 left-0 h-full bg-gradient-to-r from-[#B0D3A1] to-[#87A96B] rounded-full transition-[width] duration-[1200ms] ease-out" style="width: ${state.dashboard.progress}%;"></div>
              </div>

              <div class="flex justify-between text-sm text-[#5A5A5A] mb-8">
                <div class="text-center">
                  <div class="w-3 h-3 rounded-full bg-[#87A96B] mx-auto mb-2"></div>
                  <p>${t('播种期', 'Sowing')}</p>
                  <p class="text-[10px] text-[#8C867D]">${t('3月10日', 'Mar 10')}</p>
                </div>
                <div class="text-center">
                  <div class="w-3 h-3 rounded-full bg-[#87A96B] mx-auto mb-2"></div>
                  <p>${t('发芽期', 'Sprouting')}</p>
                  <p class="text-[10px] text-[#8C867D]">${t('3月25日', 'Mar 25')}</p>
                </div>
                <div class="text-center">
                  <div class="w-3 h-3 rounded-full bg-[#87A96B] mx-auto mb-2 relative ring-4 ring-[#87A96B]/20"></div>
                  <p class="font-medium text-[#2A2A2A]">${t('花果期 (当前)', 'Fruiting (now)')}</p>
                  <p class="text-[10px] text-[#8C867D]">${t('预计持续20天', 'Est. 20 days')}</p>
                </div>
                <div class="text-center opacity-50">
                  <div class="w-3 h-3 rounded-full bg-[#D1CCC5] mx-auto mb-2"></div>
                  <p>${t('采收期', 'Harvest')}</p>
                  <p class="text-[10px] text-[#8C867D]">${t('约5月中旬', 'Mid-May')}</p>
                </div>
              </div>

              <details class="group bg-[#F5F0E8]/40 rounded-2xl border border-[#E8E2D9] overflow-hidden transition-all duration-300">
                <summary class="flex justify-between items-center p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-medium text-sm text-[#2A2A2A] hover:bg-[#E8E2D9]/40 transition-colors">
                  <div class="flex items-center gap-2">
                    <span class="text-[#87A96B]">🌱</span>
                    ${t('小番茄花果期种植建议', 'Cherry tomato fruiting tips')}
                  </div>
                  <div class="transform group-open:rotate-180 transition-transform duration-300 text-[#5A5A5A]">▾</div>
                </summary>
                <div class="p-4 pt-0 text-sm text-[#5A5A5A] bg-white border-t border-[#E8E2D9]">
                  <div class="mt-4 space-y-4">
                    <div class="flex items-start gap-3">
                      <span class="w-4 shrink-0 mt-0.5">💧</span>
                      <div>
                        <p class="font-medium text-[#2A2A2A] mb-1">${t('水分管理', 'Watering')}</p>
                        <p class="text-xs leading-relaxed">${t('需水量较大，建议保持土壤微湿，但避免根部积水引发烂根。', 'Keep soil slightly moist; avoid waterlogging to prevent root rot.')}</p>
                      </div>
                    </div>
                    <div class="flex items-start gap-3">
                      <span class="w-4 shrink-0 mt-0.5">☀️</span>
                      <div>
                        <p class="font-medium text-[#2A2A2A] mb-1">${t('光照需求', 'Sunlight')}</p>
                        <p class="text-xs leading-relaxed">${t('保证每天 6-8 小时充足直射光，有助于果实上色和糖分积累。', 'Aim for 6–8 hours of direct sunlight to improve color and sweetness.')}</p>
                      </div>
                    </div>
                    <div class="flex items-start gap-3">
                      <span class="w-4 shrink-0 mt-0.5">✂️</span>
                      <div>
                        <p class="font-medium text-[#2A2A2A] mb-1">${t('修剪打杈', 'Pruning')}</p>
                        <p class="text-xs leading-relaxed">${t('及时摘除底部发黄的老叶和多余的侧枝，保证植株通风透光，集中养分供果。', 'Remove yellow leaves and excess side shoots to keep airflow and focus energy on fruit.')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>

          <div class="space-y-8">
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-[#E8E2D9]">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-medium text-[#2A2A2A] flex items-center gap-2">
                  🔔 ${t('种植提醒窗口', 'Garden reminders')}
                </h3>
                <span class="text-[#8C867D]">…</span>
              </div>
              <div class="space-y-4">
                <div class="flex gap-4 items-start bg-[#F5F0E8]/50 p-4 rounded-2xl border border-transparent hover:border-[#E8E2D9] transition-all cursor-pointer group">
                  <div class="mt-0.5 text-[#E8A86C]">○</div>
                  <div class="flex-1">
                    <div class="flex justify-between items-start mb-1">
                      <h4 class="font-medium text-[#2A2A2A] text-sm">${t('本周田间任务提醒', 'This week’s field tasks')}</h4>
                      <span class="text-[10px] bg-white px-2 py-1 rounded text-[#E8A86C] border border-[#E8A86C]/20">${t('待完成', 'To do')}</span>
                    </div>
                    <p class="text-xs text-[#5A5A5A] leading-relaxed mb-3">
                      ${t('建议本周完成一次除草、一次追施有机肥，并检查支架是否牢固。简单记录一下完成时间，有助于后续复盘。', 'Try to finish one weeding session, one organic fertilizing, and a quick check of trellises this week. Jotting down when you finish helps with future review.')}
                    </p>
                  </div>
                </div>

                <div class="flex gap-4 items-start bg-white p-4 rounded-2xl border border-[#E8E2D9] opacity-70">
                  <div class="mt-0.5 text-[#87A96B]">✓</div>
                  <div>
                    <h4 class="font-medium text-[#2A2A2A] text-sm mb-1 line-through">${t('上周浇水 & 清理枯叶', 'Last week: watering & dead leaves')}</h4>
                    <p class="text-xs text-[#5A5A5A] mb-2">${t('已于 3月25日 完成，并记录清理枯叶 2 片。', 'Completed on Mar 25. Logged: removed 2 dry leaves.')}</p>
                    <div class="w-12 h-12 rounded-lg bg-[#F5F0E8] flex items-center justify-center text-[#BDB6AC]">✔️</div>
                  </div>
                </div>

                <button class="w-full py-3 bg-[#87A96B] text-white rounded-xl text-sm font-medium hover:bg-[#7a9960] shadow-sm shadow-[#87A96B]/20 transition-colors flex items-center justify-center gap-2">
                  🔔 ${t('添加新的提醒', 'Add a new reminder')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function pageVisits() {
  const bookings = [...(state.dashboard.visitBookings || [])].sort((a, b) => {
    const ida = typeof a.id === 'number' ? a.id : 0;
    const idb = typeof b.id === 'number' ? b.id : 0;
    return idb - ida;
  });
  return `
    <div class="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-center justify-between gap-4 mb-8">
          <div class="flex items-center gap-3">
            <button onclick="location.hash = '#/dashboard'" class="w-8 h-8 rounded-full border border-[#E8E2D9] flex items-center justify-center text-[#8C867D] hover:text-[#2A2A2A] hover:bg-[#FAF9F6] transition-colors">←</button>
            <div>
              <h1 class="text-2xl font-serif text-[#2A2A2A] mb-1">
                ${t('全部入场预约', 'All visit bookings')}
              </h1>
              <p class="text-sm text-[#5A5A5A]">
                ${t('按时间倒序展示您所有的入场预约记录。', 'All your visit bookings in reverse chronological order.')}
              </p>
            </div>
          </div>
        </div>

        ${bookings.length > 0 ? `
          <div class="space-y-4">
            ${bookings.map((b) => `
              <div class="bg-white rounded-2xl border border-[#E8E2D9] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div class="text-sm font-medium text-[#2A2A2A] mb-0.5">
                    ${escapeHtml(b.date || '')}
                  </div>
                  <div class="text-xs text-[#5A5A5A] mb-1">
                    ${escapeHtml(b.time || '')} · ${escapeHtml(String(b.count ?? 0))}${t('人入场', ' guests')} · ${t('地块', 'Plot')}: ${escapeHtml(b.plot || 'A01')}
                  </div>
                  <p class="text-xs text-[#8C867D] line-clamp-2">
                    ${escapeHtml(b.note || t('本次入场预约暂无补充说明。', 'No additional notes for this visit.'))}
                  </p>
                </div>
                <div class="flex items-center gap-3 sm:flex-col sm:items-end">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-[11px] bg-[#F5F0E8] text-[#87A96B] border border-[#87A96B]/20">
                    ${b.status === 'upcoming' ? t('待出行', 'Upcoming') : t('已完成', 'Completed')}
                  </span>
                  <button data-action="open-booking-detail" data-booking-kind="visit" data-booking-id="${String(b.id ?? '')}" class="text-xs text-[#8C867D] hover:text-[#2A2A2A] underline underline-offset-4">
                    ${t('查看详情', 'View details')}
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="text-center py-16 text-[#5A5A5A]">
            <div class="w-12 h-12 mx-auto text-[#D1CCC5] mb-4 opacity-70">🗓️</div>
            <p class="text-sm mb-1">${t('暂无入场预约记录。', 'No visit bookings yet.')}</p>
            <p class="text-xs text-[#8C867D]">${t('可以从“我的菜园”页点击“预约入场”开始创建。', 'Start by clicking “Book a visit” from the dashboard.')}</p>
          </div>
        `}
      </div>
    </div>
  `;
}

function pageSettings() {
  const dn = state.user.displayName || (state.lang === 'zh' ? '未设置' : 'Not set');
  const avatar = (dn.trim() || 'A').slice(0, 1).toUpperCase();
  return `
    <div class="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-baseline justify-between gap-4 mb-8">
          <h1 class="text-3xl font-serif text-[#2A2A2A] mb-0">${t('账户设置', 'Account settings')}</h1>
          <button data-action="admin-easter-egg" class="text-[11px] text-[#8C867D] hover:text-[#5A5A5A] transition-colors select-none">${t('版本 0.1.0', 'Version 0.1.0')}</button>
        </div>

        <div class="space-y-8">
          <section class="bg-white dark:bg-[#0F1511] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9] dark:border-[#22302A]/60">
            <h2 class="text-lg font-medium text-[#2A2A2A] mb-6 flex items-center gap-2">👤 ${t('个人资料', 'Profile')}</h2>
            <div class="flex items-center gap-6 mb-6">
              <div class="w-20 h-20 bg-[#F5F0E8] rounded-full flex items-center justify-center text-[#87A96B] text-2xl font-serif">${escapeHtml(avatar)}</div>
              <div>
                <button class="px-4 py-2 bg-[#F5F0E8] text-[#2A2A2A] text-sm rounded-full font-medium hover:bg-[#E8E2D9] transition-colors mb-2">${t('更换头像', 'Change avatar')}</button>
                <p class="text-xs text-[#5A5A5A]">${t('支持 JPG, PNG 格式，最大 5MB', 'JPG/PNG supported, up to 5MB')}</p>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-[#5A5A5A] mb-1.5">${t('昵称', 'Display name')}</label>
                <input id="settings-name" type="text" value="${escapeHtml(state.user.displayName || '')}" placeholder="${t('请输入昵称', 'Enter display name')}" class="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF9F6] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all" />
              </div>
              <div>
                <label class="block text-sm text-[#5A5A5A] mb-1.5">${t('手机号码', 'Phone')}</label>
                <input id="settings-phone" type="tel" value="${escapeHtml(state.user.phone || '')}" placeholder="${t('请输入手机号', 'Enter phone')}" class="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF9F6] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-sm text-[#5A5A5A] mb-1.5">${t('电子邮箱', 'Email')}</label>
                <input id="settings-email" type="email" value="${escapeHtml(state.user.email || '')}" placeholder="${t('请输入邮箱', 'Enter email')}" class="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF9F6] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all" />
              </div>
            </div>
          </section>

          <section class="bg-white dark:bg-[#0F1511] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9] dark:border-[#22302A]/60">
            <h2 class="text-lg font-medium text-[#2A2A2A] mb-6 flex items-center gap-2">🔔 ${t('偏好与通知', 'Preferences')}</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between py-3 border-b border-[#E8E2D9] last:border-0">
                <div class="flex items-center gap-3">
                  <span class="w-5">🌐</span>
                  <div>
                    <p class="font-medium text-[#2A2A2A]">${t('语言 / Language', 'Language')}</p>
                    <p class="text-sm text-[#5A5A5A]">${t('切换应用的显示语言', 'Switch app display language')}</p>
                  </div>
                </div>
                <div class="flex items-center bg-[#FAF9F6] rounded-lg p-1 border border-[#E8E2D9]">
                  <button data-action="set-lang" data-lang="zh" class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${state.lang === 'zh' ? 'bg-white text-[#87A96B] shadow-sm' : 'text-[#5A5A5A] hover:text-[#2A2A2A]'}">中文</button>
                  <button data-action="set-lang" data-lang="en" class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${state.lang === 'en' ? 'bg-white text-[#87A96B] shadow-sm' : 'text-[#5A5A5A] hover:text-[#2A2A2A]'}">EN</button>
                </div>
              </div>

              <!-- Dark mode row removed -->
            </div>
          </section>

          <section class="bg-white dark:bg-[#0F1511] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9] dark:border-[#22302A]/60">
            <h2 class="text-lg font-medium text-[#2A2A2A] mb-4 flex items-center gap-2">🛡️ ${t('账户与安全', 'Security')}</h2>
            <div class="space-y-2">
              <button data-action="open-change-password" class="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#FAF9F6] transition-colors">
                <span class="text-[#2A2A2A]">${t('修改密码', 'Change password')}</span>
                <span class="w-4 h-4 text-[#8C867D]">›</span>
              </button>
              <button data-action="open-legal" data-legal="privacy" class="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#FAF9F6] transition-colors">
                <span class="text-[#2A2A2A]">${t('隐私政策', 'Privacy policy')}</span>
                <span class="w-4 h-4 text-[#8C867D]">›</span>
              </button>
              <button data-action="open-legal" data-legal="terms" class="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#FAF9F6] transition-colors">
                <span class="text-[#2A2A2A]">${t('用户协议', 'Terms')}</span>
                <span class="w-4 h-4 text-[#8C867D]">›</span>
              </button>
              ${state.auth.isAuthed ? `
                <button data-action="sign-out" class="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#FAF9F6] transition-colors text-[#B35C44]">
                  <span class="flex items-center gap-2">🚪 ${t('退出登录', 'Sign out')}</span>
                </button>
              ` : `
                <button data-action="auth-open" data-auth-mode="login" class="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#FAF9F6] transition-colors">
                  <span class="flex items-center gap-2">🔐 ${t('登录/注册', 'Sign in / Register')}</span>
                  <span class="w-4 h-4 text-[#8C867D]">›</span>
                </button>
              `}

              ${state.admin.unlocked ? `
                <button data-action="admin-lock" class="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#FAF9F6] transition-colors text-[#B35C44]">
                  <span class="flex items-center gap-2">🔒 ${t('锁定隐藏管理区', 'Lock hidden admin')}</span>
                </button>
              ` : ''}
            </div>
          </section>
        </div>

        <div class="mt-8 flex justify-end">
          <button data-action="save-settings" class="px-8 py-3 bg-[#2A2A2A] text-white rounded-full font-medium shadow-md hover:shadow-lg hover:bg-black transition-all">${t('保存设置', 'Save')}</button>
        </div>
      </div>
    </div>
  `;
}

function pageNotFound() {
  return `
    <div class="flex-1 flex items-center justify-center p-10">
      <div class="max-w-lg w-full bg-white rounded-3xl p-8 shadow-sm border border-[#E8E2D9] text-center">
        <h1 class="text-2xl font-serif mb-2">${t('页面不存在', 'Page not found')}</h1>
        <p class="text-sm text-[#5A5A5A] mb-6">${t('请从导航返回首页。', 'Use the navigation to return home.')}</p>
        <a href="#/" class="inline-flex items-center gap-2 bg-[#87A96B] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#76965B] transition-colors">${t('返回首页', 'Back to home')}</a>
      </div>
    </div>
  `;
}

function pageAdmin() {
  if (!state.admin.unlocked) {
    return `
      <div class="flex-1 flex items-center justify-center p-10">
        <div class="max-w-lg w-full bg-white dark:bg-[#0F1511] rounded-3xl p-8 shadow-sm border border-[#E8E2D9] dark:border-[#22302A]/60 text-center">
          <h1 class="text-2xl font-serif mb-2">${t('需要解锁', 'Locked')}</h1>
          <p class="text-sm text-[#5A5A5A] dark:text-[#B7C0BA] mb-6">
            ${t('此页面为隐藏管理区域。请输入口令以继续。', 'This is a hidden admin area. Enter the passphrase to continue.')}
          </p>
          <button data-action="open-admin-unlock" class="inline-flex items-center gap-2 bg-[#2A2A2A] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black transition-colors shadow-sm">
            ${t('输入口令', 'Enter passphrase')} <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    `;
  }

  const since = state.admin.unlockedAt ? new Date(state.admin.unlockedAt).toLocaleString() : '—';
  return `
    <div class="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 class="text-3xl font-serif text-[#2A2A2A] dark:text-[#F3F4F6]">${t('管理控制台（隐藏）', 'Admin console (hidden)')}</h1>
            <p class="text-sm text-[#5A5A5A] dark:text-[#B7C0BA] mt-2">
              ${t('已解锁时间：', 'Unlocked at: ')}${escapeHtml(since)}
            </p>
          </div>
          <button data-action="admin-lock" class="px-4 py-2 rounded-full text-sm font-medium bg-[#F5F0E8] dark:bg-[#17211B] text-[#B35C44] hover:bg-[#E8E2D9] dark:hover:bg-[#1E2A23] transition-colors border border-[#E8E2D9] dark:border-[#22302A]/60">
            ${t('锁定', 'Lock')}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white dark:bg-[#0F1511] rounded-3xl p-6 shadow-sm border border-[#E8E2D9] dark:border-[#22302A]/60">
            <div class="text-xs text-[#8C867D] dark:text-[#7C857F] mb-2">${t('快速操作', 'Quick actions')}</div>
            <div class="space-y-2">
              <button data-action="open-legal" data-legal="privacy" class="w-full text-left px-4 py-3 rounded-2xl hover:bg-[#FAF9F6] dark:hover:bg-[#0B0F0C] transition-colors">
                ${t('查看隐私政策', 'View privacy policy')}
              </button>
              <button data-action="open-legal" data-legal="terms" class="w-full text-left px-4 py-3 rounded-2xl hover:bg-[#FAF9F6] dark:hover:bg-[#0B0F0C] transition-colors">
                ${t('查看用户协议', 'View terms')}
              </button>
              <button data-action="open-legal" data-legal="claim" class="w-full text-left px-4 py-3 rounded-2xl hover:bg-[#FAF9F6] dark:hover:bg-[#0B0F0C] transition-colors">
                ${t('查看认领协议', 'View claim agreement')}
              </button>
            </div>
          </div>

          <div class="md:col-span-2 bg-white dark:bg-[#0F1511] rounded-3xl p-6 shadow-sm border border-[#E8E2D9] dark:border-[#22302A]/60">
            <div class="text-xs text-[#8C867D] dark:text-[#7C857F] mb-2">${t('说明', 'Notes')}</div>
            <p class="text-sm text-[#5A5A5A] dark:text-[#B7C0BA] leading-relaxed">
              ${t('这是纯前端演示版的隐藏管理页。若你后续接入 Supabase/后端，请把权限控制放在服务端（RLS/角色），不要依赖隐藏入口。', 'This is a demo-only hidden admin page. If you later add Supabase/backend, enforce permissions server-side (RLS/roles) instead of relying on obscurity.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function render() {
  const app = document.getElementById('app');
  const route = parseRoute();

  let pageHtml = '';
  if (route.name === 'home') pageHtml = pageHome();
  else if (route.name === 'map') pageHtml = pageMap();
  else if (route.name === 'plot') pageHtml = pagePlotDetail(route.params);
  else if (route.name === 'booking') pageHtml = pageBooking(route.params);
  else if (route.name === 'dashboard') pageHtml = pageDashboard();
   else if (route.name === 'visits') pageHtml = pageVisits();
  else if (route.name === 'settings') pageHtml = pageSettings();
  else if (route.name === 'admin') pageHtml = pageAdmin();
  else pageHtml = pageNotFound();

  app.innerHTML = layout(pageHtml);

  // post-render effects
  if (route.name === 'dashboard') {
    // animate demo progress
    if (state.dashboard.progress === 0) {
      requestAnimationFrame(() => {
        state.dashboard.progress = 65;
        const bar = document.getElementById('dash-progress');
        if (bar) bar.style.width = `${state.dashboard.progress}%`;
      });
    } else {
      const bar = document.getElementById('dash-progress');
      if (bar) bar.style.width = `${state.dashboard.progress}%`;
    }
  }
}

function onClick(e) {
  // Auth gate for nav/buttons
  const authTarget = e.target.closest('[data-requires-auth]');
  if (authTarget && !state.auth.isAuthed) {
    e.preventDefault();
    const href = authTarget.getAttribute('href') || '';
    state.auth.redirectHash = href.startsWith('#') ? href : '';
    state.auth.mode = 'login';
    state.auth.modalOpen = true;
    render();
    return;
  }

  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.getAttribute('data-action');

  if (action === 'open-legal') {
    const doc = el.getAttribute('data-legal');
    state.legal.doc = doc === 'terms' ? 'terms' : (doc === 'claim' ? 'claim' : 'privacy');
    state.legal.open = true;
    render();
    return;
  }
  if (action === 'legal-close') {
    state.legal.open = false;
    render();
    return;
  }

  if (action === 'open-admin-unlock') {
    state.admin.unlockModalOpen = true;
    render();
    requestAnimationFrame(() => {
      const input = document.getElementById('admin-passphrase');
      if (input instanceof HTMLInputElement) input.focus();
    });
    return;
  }
  if (action === 'admin-unlock-close') {
    state.admin.unlockModalOpen = false;
    render();
    return;
  }
  if (action === 'admin-unlock-submit') {
    const input = document.getElementById('admin-passphrase');
    if (!(input instanceof HTMLInputElement)) return;
    const pass = (input.value || '').trim();
    if (!pass) {
      alert(t('请输入口令。', 'Please enter the passphrase.'));
      input.focus();
      return;
    }
    (async () => {
      try {
        const hex = await sha256Hex(pass);
        if (hex !== ADMIN_PASSPHRASE_SHA256) {
          alert(t('口令不正确。', 'Incorrect passphrase.'));
          input.focus();
          return;
        }
        const now = Date.now();
        state.admin.unlocked = true;
        state.admin.unlockedAt = now;
        state.admin.unlockModalOpen = false;
        try {
          localStorage.setItem('aura_admin_unlocked', '1');
          localStorage.setItem('aura_admin_unlocked_at', String(now));
        } catch {}
        render();
        location.hash = '#/admin';
      } catch {
        alert(t('解锁失败，请稍后重试。', 'Unlock failed. Please try again.'));
      }
    })();
    return;
  }
  if (action === 'admin-lock') {
    state.admin.unlocked = false;
    state.admin.unlockedAt = 0;
    state.admin.unlockModalOpen = false;
    try {
      localStorage.removeItem('aura_admin_unlocked');
      localStorage.removeItem('aura_admin_unlocked_at');
    } catch {}
    render();
    return;
  }

  if (action === 'admin-easter-egg') {
    const now = Date.now();
    if (now - (state.admin.eggLastAt || 0) > 1500) {
      state.admin.eggClicks = 0;
    }
    state.admin.eggLastAt = now;
    state.admin.eggClicks = (state.admin.eggClicks || 0) + 1;
    if (state.admin.eggClicks >= 7) {
      state.admin.eggClicks = 0;
      state.admin.unlockModalOpen = true;
      render();
      requestAnimationFrame(() => {
        const input = document.getElementById('admin-passphrase');
        if (input instanceof HTMLInputElement) input.focus();
      });
    }
    return;
  }

  if (action === 'toggle-lang') {
    setLang(state.lang === 'zh' ? 'en' : 'zh');
    return;
  }
  if (action === 'toggle-mobile-menu') {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    render();
    return;
  }
  if (action === 'close-mobile-menu') {
    state.mobileMenuOpen = false;
    render();
    return;
  }
  if (action === 'select-plot') {
    const id = el.getAttribute('data-plot-id');
    const plot = PLOTS.find((p) => p.id === id);
    if (!plot || plot.status === 'unavailable' || plot.status === 'rented') return;
    state.selectedPlotId = id;
    render();
    return;
  }
  if (action === 'clear-selected-plot') {
    state.selectedPlotId = null;
    render();
    return;
  }
  if (action === 'open-change-password') {
    if (!state.auth.isAuthed) {
      state.auth.mode = 'login';
      state.auth.redirectHash = '#/settings';
      state.auth.modalOpen = true;
      render();
      return;
    }
    state.security.changePassOpen = true;
    render();
    return;
  }
  if (action === 'change-password-close') {
    state.security.changePassOpen = false;
    render();
    return;
  }
  if (action === 'change-password-submit') {
    const hasExisting = !!state.auth.passHash;
    const oldEl = document.getElementById('change-pass-old');
    const newEl = document.getElementById('change-pass-new');
    const new2El = document.getElementById('change-pass-new2');
    if (!(newEl instanceof HTMLInputElement) || !(new2El instanceof HTMLInputElement)) return;
    const oldVal = hasExisting && oldEl instanceof HTMLInputElement ? (oldEl.value || '').trim() : '';
    const newVal = (newEl.value || '').trim();
    const newVal2 = (new2El.value || '').trim();
    if (!newVal) {
      alert(t('请输入新密码。', 'Please enter a new password.'));
      newEl.focus();
      return;
    }
    if (newVal2 !== newVal) {
      alert(t('两次输入的新密码不一致。', 'New passwords do not match.'));
      new2El.focus();
      return;
    }
    (async () => {
      try {
        if (hasExisting) {
          if (!oldVal) {
            alert(t('请输入当前密码。', 'Please enter your current password.'));
            if (oldEl instanceof HTMLInputElement) oldEl.focus();
            return;
          }
          const oldHash = await sha256Hex(oldVal);
          if (oldHash !== state.auth.passHash) {
            alert(t('当前密码不正确。', 'Current password is incorrect.'));
            if (oldEl instanceof HTMLInputElement) oldEl.focus();
            return;
          }
        }
        const newHash = await sha256Hex(newVal);
        state.auth.passHash = newHash;
        try { localStorage.setItem('aura_pass_sha256', newHash); } catch {}
        state.security.changePassOpen = false;
        alert(t('密码已更新。下次登录将使用新密码。', 'Password updated. Please use the new password next time you sign in.'));
        render();
      } catch {
        alert(t('修改密码失败，请稍后重试。', 'Failed to change password. Please try again.'));
      }
    })();
    return;
  }
  if (action === 'set-lang') {
    const l = el.getAttribute('data-lang');
    if (l === 'zh' || l === 'en') setLang(l);
    return;
  }
  if (action === 'set-duration') {
    const v = el.getAttribute('data-duration');
    const wrap = document.getElementById('custom-duration-wrap');
    const summaryDur = document.getElementById('summary-duration');
    if (!wrap || !summaryDur) return;
    if (v === 'custom') {
      wrap.classList.remove('hidden');
      summaryDur.textContent = '(自定义时长)';
    } else {
      wrap.classList.add('hidden');
      summaryDur.textContent = `(${v}个月)`;
    }
  }
  if (action === 'toggle-claim-bookings-view') {
    state.dashboard.showAllClaimBookings = !state.dashboard.showAllClaimBookings;
    render();
    return;
  }
  if (action === 'open-visit-modal') {
    if (!state.auth.isAuthed) {
      state.auth.mode = 'login';
      state.auth.redirectHash = '#/dashboard';
      state.auth.modalOpen = true;
      render();
      return;
    }
    state.dashboard.visitModalOpen = true;
    render();
    return;
  }
  if (action === 'open-booking-detail') {
    const kind = el.getAttribute('data-booking-kind') === 'claim' ? 'claim' : 'visit';
    const idRaw = el.getAttribute('data-booking-id') || '';
    const idNum = Number.parseInt(idRaw, 10);
    const list = kind === 'claim' ? (state.dashboard.claimBookings || []) : (state.dashboard.visitBookings || []);
    const found = list.find((b) => (typeof b.id === 'number' ? b.id === idNum : String(b.id || '') === idRaw));
    if (!found) return;
    state.dashboard.viewBooking = { kind, data: found };
    state.dashboard.viewBookingModalOpen = true;
    render();
    return;
  }
  if (action === 'close-booking-detail') {
    state.dashboard.viewBookingModalOpen = false;
    state.dashboard.viewBooking = null;
    render();
    return;
  }
  if (action === 'visit-close') {
    state.dashboard.visitModalOpen = false;
    render();
    return;
  }
  if (action === 'visit-submit') {
    const dateEl = document.getElementById('visit-date');
    const slotEl = document.getElementById('visit-slot');
    const countEl = document.getElementById('visit-count');
    const noteEl = document.getElementById('visit-note');
    if (!(dateEl instanceof HTMLInputElement) || !(slotEl instanceof HTMLSelectElement) || !(countEl instanceof HTMLInputElement)) return;
    const date = (dateEl.value || '').trim();
    const slot = (slotEl.value || '').trim();
    const countRaw = (countEl.value || '').trim();
    const count = Number.parseInt(countRaw, 10);
    const note = noteEl && 'value' in noteEl ? String(noteEl.value || '').trim() : '';
    if (!date) {
      alert(t('请填写入场日期。', 'Please enter a visit date.'));
      dateEl.focus();
      return;
    }
    if (!slot) {
      alert(t('请选择时间段。', 'Please select a time slot.'));
      slotEl.focus();
      return;
    }
    if (!Number.isFinite(count) || count <= 0) {
      alert(t('请填写有效的入场人数（>= 1）。', 'Please enter a valid guest count (>= 1).'));
      countEl.focus();
      return;
    }
    const nextId = (state.dashboard.visitBookings || []).reduce((max, b) => {
      const idNum = typeof b.id === 'number' ? b.id : 0;
      return Math.max(max, idNum);
    }, 0) + 1;
    state.dashboard.visitBookings = [
      ...(state.dashboard.visitBookings || []),
      {
        id: nextId,
        date,
        time: slot,
        count,
        status: 'upcoming',
        plot: 'A01',
        note: note || t('入场预约（自动创建）。', 'Visit booking (created from dashboard).'),
      },
    ];
    state.dashboard.visitModalOpen = false;
    alert(t('已提交入场预约，我们会通过邮件与您确认具体安排。', 'Visit booking submitted. We will confirm details via email.'));
    render();
    return;
  }
  if (action === 'confirm-booking') {
    const agree = document.getElementById('agree');
    const seedType = document.getElementById('seed-type');
    const seedQty = document.getElementById('seed-qty');
    if (!(agree instanceof HTMLInputElement) || !(seedType instanceof HTMLSelectElement) || !(seedQty instanceof HTMLInputElement)) return;
    if (!agree.checked) return;

    const route = parseRoute();
    const plotUpper = String(route?.params?.id || 'A01').toUpperCase();

    const seed = (seedType.value || '').trim();
    const qtyRaw = (seedQty.value || '').trim();
    const qty = Number.parseInt(qtyRaw, 10);

    if (!seed) {
      alert(t('请选择种子后再确认。', 'Please select seeds before confirming.'));
      seedType.focus();
      return;
    }
    if (!Number.isFinite(qty) || qty <= 0) {
      alert(t('请填写有效的数量（>= 1）。', 'Please enter a valid quantity (>= 1).'));
      seedQty.focus();
      return;
    }

    const dateEl = document.getElementById('booking-date');
    const date = (dateEl && 'value' in dateEl) ? String(dateEl.value || '').trim() : '';
    const durEl = document.getElementById('summary-duration');
    const duration = durEl ? String(durEl.textContent || '').trim() : '';
    const seedLabel = seedType.options[seedType.selectedIndex]?.textContent?.trim() || seed;

    // 写入“认领申请历史”
    const nextId = (state.dashboard.claimBookings || []).reduce((max, b) => {
      const idNum = typeof b.id === 'number' ? b.id : 0;
      return Math.max(max, idNum);
    }, 0) + 1;
    state.dashboard.claimBookings = [
      ...(state.dashboard.claimBookings || []),
      {
        id: nextId,
        plot: plotUpper,
        date: date || (state.lang === 'zh' ? '待沟通' : 'TBD'),
        seed: seedLabel,
        duration: duration || (state.lang === 'zh' ? '自定义时长' : 'Custom duration'),
        status: 'pending',
        note: state.lang === 'zh'
          ? '通过网页提交的认领申请（演示数据）。'
          : 'Claim request submitted via web demo.',
      },
    ];

    alert(t(
      `已提交认领意向：地块 ${plotUpper}，种子 ${seedLabel}，数量 ${qty}${date ? `，日期 ${date}` : ''}${duration ? `，周期 ${duration}` : ''}。`,
      `Claim intent submitted: plot ${plotUpper}, seeds ${seedLabel}, qty ${qty}${date ? `, date ${date}` : ''}${duration ? `, duration ${duration}` : ''}.`
    ));

    location.hash = '#/dashboard';
  }
  if (action === 'auth-open') {
    const mode = el.getAttribute('data-auth-mode');
    state.auth.mode = mode === 'register' ? 'register' : 'login';
    state.auth.redirectHash = '';
    state.auth.modalOpen = true;
    render();
    return;
  }
  if (action === 'auth-switch') {
    const mode = el.getAttribute('data-auth-mode');
    state.auth.mode = mode === 'register' ? 'register' : 'login';
    render();
    return;
  }
  if (action === 'auth-close') {
    state.auth.modalOpen = false;
    render();
    return;
  }
  if (action === 'auth-submit') {
    const emailEl = document.getElementById('auth-email');
    const passEl = document.getElementById('auth-pass');
    if (!(emailEl instanceof HTMLInputElement) || !(passEl instanceof HTMLInputElement)) return;
    const email = (emailEl.value || '').trim();
    const pass = (passEl.value || '').trim();
    if (!email) {
      alert(t('请输入邮箱。', 'Please enter your email.'));
      emailEl.focus();
      return;
    }
    if (!pass) {
      alert(t('请输入密码。', 'Please enter your password.'));
      passEl.focus();
      return;
    }

    if (state.auth.mode === 'register') {
      const nameEl = document.getElementById('auth-name');
      const phoneEl = document.getElementById('auth-phone');
      const pass2El = document.getElementById('auth-pass2');
      const agreeEl = document.getElementById('auth-agree');
      if (!(nameEl instanceof HTMLInputElement) || !(phoneEl instanceof HTMLInputElement) || !(pass2El instanceof HTMLInputElement) || !(agreeEl instanceof HTMLInputElement)) return;
      const name = (nameEl.value || '').trim();
      const phone = (phoneEl.value || '').trim();
      const pass2 = (pass2El.value || '').trim();
      if (!name) {
        alert(t('请填写昵称。', 'Please enter a display name.'));
        nameEl.focus();
        return;
      }
      if (!phone) {
        alert(t('请填写手机号码。', 'Please enter your phone number.'));
        phoneEl.focus();
        return;
      }
      if (pass2 !== pass) {
        alert(t('两次输入的密码不一致。', 'Passwords do not match.'));
        pass2El.focus();
        return;
      }
      if (!agreeEl.checked) {
        alert(t('请先同意隐私政策与用户协议。', 'Please agree to the Terms and Privacy policy.'));
        agreeEl.focus();
        return;
      }

      state.user.displayName = name;
      state.user.phone = phone;
      state.user.email = email;
      persistUser();

      // save password hash for future logins
      (async () => {
        try {
          const hash = await sha256Hex(pass);
          state.auth.passHash = hash;
          try { localStorage.setItem('aura_pass_sha256', hash); } catch {}
        } catch {}
      })();
    } else {
      // login: if password hash exists, validate; otherwise fallback to demo behavior
      (async () => {
        try {
          let saved = state.auth.passHash;
          if (!saved) {
            try { saved = localStorage.getItem('aura_pass_sha256') || ''; } catch {}
          }
          if (saved) {
            const entered = await sha256Hex(pass);
            if (entered !== saved) {
              alert(t('密码不正确，请重试。', 'Incorrect password, please try again.'));
              passEl.focus();
              return;
            }
          }

          if (!state.user.email) {
            state.user.email = email;
            persistUser();
          }

          state.auth.isAuthed = true;
          try { localStorage.setItem('aura_authed', '1'); } catch {}
          const redirect = state.auth.redirectHash;
          state.auth.modalOpen = false;
          state.auth.redirectHash = '';
          render();
          if (redirect) location.hash = redirect;
        } catch {
          // on failure, keep old demo behavior
          if (!state.user.email) {
            state.user.email = email;
            persistUser();
          }
          state.auth.isAuthed = true;
          try { localStorage.setItem('aura_authed', '1'); } catch {}
          const redirect = state.auth.redirectHash;
          state.auth.modalOpen = false;
          state.auth.redirectHash = '';
          render();
          if (redirect) location.hash = redirect;
        }
      })();
      return;
    }

    state.auth.isAuthed = true;
    try { localStorage.setItem('aura_authed', '1'); } catch {}
    const redirect = state.auth.redirectHash;
    state.auth.modalOpen = false;
    state.auth.redirectHash = '';
    render();
    if (redirect) location.hash = redirect;
    return;
  }
  if (action === 'sign-out') {
    state.auth.isAuthed = false;
    try { localStorage.setItem('aura_authed', '0'); } catch {}
    render();
    return;
  }
  if (action === 'save-settings') {
    persistUser();
    alert(t('已保存到本地账户设置。', 'Saved to local account settings.'));
    return;
  }
}

function onInput(e) {
  const t = e.target;
  if (!(t instanceof HTMLElement)) return;

  if (t.id === 'settings-name') {
    const v = (t.value || '').trim();
    state.user.displayName = v;
    persistUser();
  }
  if (t.id === 'settings-phone') {
    const v = (t.value || '').trim();
    state.user.phone = v;
    persistUser();
  }
  if (t.id === 'settings-email') {
    const v = (t.value || '').trim();
    state.user.email = v;
    persistUser();
  }

  if (t.id === 'booking-date') {
    const summary = document.getElementById('summary-date');
    if (summary) {
      const v = t.value?.trim();
      summary.childNodes[0].textContent = v || (state.lang === 'zh' ? '待沟通' : 'TBD');
    }
  }
  if (t.id === 'custom-duration') {
    const summaryDur = document.getElementById('summary-duration');
    if (summaryDur) {
      const v = t.value?.trim();
      summaryDur.textContent = `(${v || (state.lang === 'zh' ? '自定义时长' : 'Custom')})`;
    }
  }
  if (t.id === 'agree') {
    const btn = document.getElementById('confirm-booking');
    const box = document.getElementById('agree-box');
    const checked = t.checked;
    if (box) {
      box.className = checked
        ? 'w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors bg-[#87A96B] border-[#87A96B] text-white'
        : 'w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors border-[#D1CCC5] group-hover:border-[#87A96B]';
      box.textContent = checked ? '✓' : '';
    }
    if (btn) {
      btn.disabled = !checked;
      btn.className = checked
        ? 'w-full py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all bg-[#2A2A2A] text-white hover:bg-black shadow-md hover:shadow-lg'
        : 'w-full py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all bg-[#E8E2D9] text-[#8C867D] cursor-not-allowed';
    }
  }
  if (t.id === 'seed-type') {
    const sel = t;
    if (!(sel instanceof HTMLSelectElement)) return;
    const summarySeed = document.getElementById('summary-seed');
    if (summarySeed) {
      const label = sel.value ? (sel.options[sel.selectedIndex]?.textContent || '').trim() : (state.lang === 'zh' ? '待选择' : 'Not selected');
      summarySeed.textContent = label || (state.lang === 'zh' ? '待选择' : 'Not selected');
    }
  }
  if (t.id === 'seed-qty') {
    const input = t;
    if (!(input instanceof HTMLInputElement)) return;
    const summaryQty = document.getElementById('summary-qty');
    if (summaryQty) {
      const v = (input.value || '').trim();
      summaryQty.textContent = v ? v : '—';
    }
  }
}

function onChange(e) {
  // Keep for future; currently handled via click/input
}

window.addEventListener('hashchange', () => {
  state.mobileMenuOpen = false;
  render();
});
document.addEventListener('click', onClick);
document.addEventListener('input', onInput);
document.addEventListener('change', onChange);

// init theme (before first render) — dark mode disabled, always light
(() => {
  try { localStorage.removeItem('aura_dark'); } catch {}
  document.documentElement.classList.remove('dark');
})();

// init auth (demo)
(() => {
  try {
    state.auth.isAuthed = localStorage.getItem('aura_authed') === '1';
    const savedPass = localStorage.getItem('aura_pass_sha256');
    if (savedPass) state.auth.passHash = savedPass;
  } catch {}
})();

// init user (demo)
(() => {
  try {
    const raw = localStorage.getItem('aura_user');
    if (!raw) return;
    const u = JSON.parse(raw);
    if (u && typeof u === 'object') {
      state.user.displayName = typeof u.displayName === 'string' ? u.displayName : '';
      state.user.phone = typeof u.phone === 'string' ? u.phone : '';
      state.user.email = typeof u.email === 'string' ? u.email : '';
    }
  } catch {}
})();

// init admin (hidden)
(() => {
  try {
    state.admin.unlocked = localStorage.getItem('aura_admin_unlocked') === '1';
    const ts = Number.parseInt(localStorage.getItem('aura_admin_unlocked_at') || '0', 10);
    state.admin.unlockedAt = Number.isFinite(ts) ? ts : 0;
  } catch {}
})();

if (!location.hash) location.hash = '#/';
render();

