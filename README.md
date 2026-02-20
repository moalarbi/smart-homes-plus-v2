# Smart Homes Plus | سمارت هوم بلس

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/shadcn/ui-latest-000000?logo=shadcnui&logoColor=white" alt="shadcn/ui" />
</p>

<p align="center">
  <strong>حلول المنازل الذكية في الرياض | Smart Home Solutions in Riyadh</strong>
</p>

---

## 🌟 المميزات | Features

- ✅ **ثنائي اللغة** - دعم كامل للعربية (RTL) والإنجليزية (LTR)
- ✅ **تصميم متجاوب** - يعمل بشكل مثالي على جميع الأجهزة
- ✅ **وضع داكن حديث** - تصميم عصري بألوان جذابة
- ✅ **تحسين SEO** - علامات Meta و JSON-LD Schema
- ✅ **أداء عالي** - تحميل سريع ورسوم متحركة محسّنة
- ✅ **CTA ثابت على الجوال** - أزرار اتصال وواتساب دائمة
- ✅ **نشر تلقائي** - GitHub Actions للنشر على GitHub Pages

---

## 🚀 البدء السريع | Quick Start

### المتطلبات | Requirements

- Node.js 20+
- npm أو yarn

### التثبيت | Installation

```bash
# استنساخ المستودع
git clone https://github.com/yourusername/smart-homes-plus.git
cd smart-homes-plus

# تثبيت التبعيات
npm install

# تشغيل الخادم المحلي
npm run dev
```

افتح المتصفح على: `http://localhost:5173`

---

## 📁 هيكل المشروع | Project Structure

```
smart-homes-plus/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── public/
│   └── favicons/               # أيقونات الموقع
├── src/
│   ├── components/             # مكونات React
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── PainPoints.tsx
│   │   ├── Solutions.tsx
│   │   ├── Packages.tsx
│   │   ├── WhyUs.tsx
│   │   ├── Steps.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── FinalCTA.tsx
│   │   ├── Footer.tsx
│   │   ├── StickyMobileCTA.tsx
│   │   └── SmartImage.tsx
│   ├── config/                 # ملفات التكوين
│   │   ├── contact.ts          # معلومات الاتصال
│   │   ├── images.ts           # روابط الصور
│   │   └── seo.ts              # إعدادات SEO
│   ├── hooks/                  # Hooks مخصصة
│   │   ├── useI18n.ts          # الترجمة واللغة
│   │   ├── useScrollSpy.ts     # تتبع التمرير
│   │   └── useLocalStorage.ts  # التخزين المحلي
│   ├── i18n/                   # ملفات الترجمة
│   │   ├── ar.json             # العربية
│   │   └── en.json             # الإنجليزية
│   ├── lib/                    # دوال مساعدة
│   │   └── utils.ts
│   ├── App.tsx                 # المكون الرئيسي
│   ├── index.css               # الأنماط العامة
│   └── main.tsx                # نقطة الدخول
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ⚙️ التخصيص | Customization

### 1. تغيير معلومات الاتصال | Change Contact Information

**ملف | File:** `src/config/contact.ts`

```typescript
export const CONTACT = {
  phone: "+966500000000",        // رقم الهاتف
  whatsapp: "+966500000000",     // رقم واتساب
  phoneDisplay: "050 000 0000",  // عرض الهاتف
  // ...
};
```

### 2. إضافة الصور | Add Images

**ملف | File:** `src/config/images.ts`

```typescript
export const IMAGES = {
  hero: "https://your-cdn.com/hero-image.jpg",
  solutions: "https://your-cdn.com/solutions.jpg",
  // ...
};
```

> **ملاحظة:** اترك القيمة فارغة `""` لعرض placeholder.

### 3. تعديل النصوص | Edit Content

**ملفات | Files:** `src/i18n/ar.json` و `src/i18n/en.json`

قم بتعديل النصوص في ملفات JSON حسب احتياجاتك.

### 4. تغيير الألوان | Change Colors

**ملف | File:** `src/index.css`

```css
:root {
  --primary: 174 72% 45%;      /* لون أساسي */
  --accent: 174 72% 45%;       /* لون مميز */
  /* ... */
}
```

---

## 🚀 النشر على GitHub Pages | Deploy to GitHub Pages

### الطريقة 1: GitHub Actions (موصى بها)

1. ارفع المشروع على GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/smart-homes-plus.git
git push -u origin main
```

2. فعّل GitHub Pages:
   - اذهب إلى **Settings** → **Pages**
   - في **Source** اختر **GitHub Actions**

3. سيتم النشر تلقائياً عند كل `push` على فرع `main`

### الطريقة 2: النشر اليدوي

```bash
# بناء المشروع
npm run build

# النشر (إذا كان لديك gh-pages مثبتاً)
npm run deploy
```

---

## 🔧 إعداد basePath | Configure basePath

إذا غيّرت اسم المستودع، عدّل `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
});
```

---

## 📱 معاينة على الجوال | Mobile Preview

```bash
# تشغيل على الشبكة المحلية
npm run dev -- --host

# ثم افتح الرابط على هاتفك
# مثال: http://192.168.1.100:5173
```

---

## 🧪 اختبار الأداء | Performance Testing

```bash
# بناء للإنتاج
npm run build

# معاينة الإنتاج
npm run preview
```

ثم افتح Lighthouse في Chrome DevTools لتحليل الأداء.

---

## 📋 قائمة المهام قبل النشر | Pre-Launch Checklist

- [ ] تحديث معلومات الاتصال في `contact.ts`
- [ ] إضافة روابط الصور في `images.ts`
- [ ] مراجعة النصوص في ملفات `i18n`
- [ ] تحديث `siteUrl` في `seo.ts`
- [ ] تغيير اسم المستودع في `vite.config.ts` (base)
- [ ] تحديث روابط GitHub في `index.html`
- [ ] إضافة favicon في مجلد `public/`
- [ ] اختبار على أجهزة مختلفة
- [ ] فحص Lighthouse

---

## 🛠️ تقنيات المشروع | Tech Stack

| التقنية | الاستخدام |
|---------|----------|
| React 18 | واجهة المستخدم |
| TypeScript | كتابة الكود |
| Vite | بناء المشروع |
| Tailwind CSS | التصميم |
| shadcn/ui | المكونات |
| Lucide React | الأيقونات |

---

## 📄 الترخيص | License

MIT License - حر في الاستخدام والتعديل.

---

## 🤝 الدعم | Support

للاستفسارات أو المشاكل، تواصل معنا عبر:
- 📧 البريد الإلكتروني
- 📱 واتساب
- 📞 الهاتف

---

<p align="center">
  صنع بـ ❤️ في الرياض، المملكة العربية السعودية
</p>
