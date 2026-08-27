Buatkan saya sebuah **website photobox / digital photo booth** modern yang terasa seperti pengalaman masuk ke booth foto sungguhan. Fokus utama: user bisa membuka kamera, mengambil beberapa foto secara berurutan, memilih filter, menyusun hasil ke dalam **photo strip/kertas photobox**, lalu **download atau print**.

## Tech Stack

Gunakan:

* **Next.js** versi terbaru dengan App Router
* **TypeScript**
* **Tailwind CSS**
* Gunakan browser API seperti `navigator.mediaDevices.getUserMedia()` untuk kamera
* Gunakan **Canvas API** untuk menghasilkan photo strip final
* Jangan gunakan backend jika tidak diperlukan
* Semua proses foto sebaiknya client-side
* Gunakan library tambahan hanya jika memang memberikan manfaat nyata

Project harus bisa dijalankan dengan:

```bash
npm install
npm run dev
```

Prioritaskan clean code, reusable components, type safety, responsive design, dan struktur project yang mudah dikembangkan.

---

# Product Concept

Website ini bukan sekadar webcam app.

Saya ingin experience seperti:

**Masuk photobox → pilih layout → pilih filter → mulai sesi → countdown → foto berkali-kali → preview → hasil menjadi photo strip → download / print**

Experience harus terasa playful, nostalgic, tetapi tetap modern.

Jangan membuat dashboard SaaS.

Jangan membuat UI yang terlihat seperti template AI.

---

# Design Direction

SANGAT PENTING:

**HINDARI "AI SLOP UI".**

Jangan gunakan desain seperti:

* gradient ungu/biru generik
* glassmorphism berlebihan
* terlalu banyak rounded card
* dashboard SaaS
* card di dalam card
* random floating blobs
* tulisan "Powered by AI"
* neon glow
* hero section generik
* statistik palsu
* testimonial
* navbar marketing SaaS
* ikon random yang tidak diperlukan
* animasi berlebihan
* border radius besar di setiap elemen

Saya ingin desain yang mempunyai **identitas visual photobox**.

Referensi feel:

* Japanese / Korean photo booth
* analog camera
* disposable camera
* film photography
* old-school photobooth
* editorial minimalism
* sedikit retro 2000s
* clean modern typography

Tetapi jangan terlalu vintage sampai sulit digunakan.

Gunakan banyak whitespace dan komposisi layout yang intentional.

Button boleh sedikit tactile seperti tombol kamera sungguhan.

Contoh tone:

```text
ready?
3
2
1
click!
```

Daripada:

```text
Capture Your Magical Memories ✨
```

Copywriting harus pendek, natural, playful, dan tidak terdengar seperti tulisan AI.

---

# Homepage

Homepage sangat sederhana.

Tampilkan branding kecil di atas, misalnya:

```text
PHOTOBOX
```

Main area:

```text
take some pictures.
keep some memories.
```

Kemudian satu CTA utama:

```text
enter booth
```

Tambahkan visual kecil berupa contoh **photo strip** sebagai preview.

Tidak perlu navbar kompleks.

Footer minimal.

Contoh:

```text
photobox — made for little moments.
```

Klik `enter booth` masuk ke flow photobox.

---

# Booth Screen

Booth adalah bagian paling penting.

Layout desktop kurang lebih:

```text
┌──────────────────────────────────────────────┐
│ PHOTOBOX                         session 01   │
│                                              │
│     ┌───────────────────────────────┐        │
│     │                               │        │
│     │                               │        │
│     │         CAMERA PREVIEW        │        │
│     │                               │        │
│     │                               │        │
│     └───────────────────────────────┘        │
│                                              │
│       [ filter ] [ layout ] [ timer ]       │
│                                              │
│                  ●                           │
│                capture                       │
│                                              │
└──────────────────────────────────────────────┘
```

Camera preview harus menjadi fokus visual.

Jangan dikelilingi terlalu banyak panel.

---

# Camera Feature

Gunakan:

```typescript
navigator.mediaDevices.getUserMedia()
```

Requirement:

* minta permission camera
* camera preview real-time
* support front-facing camera
* mirror preview untuk selfie
* captured image jangan salah orientasi
* handle permission denied
* handle browser tidak mendukung camera
* handle device tidak memiliki camera
* stop MediaStream ketika meninggalkan booth

Jika ada beberapa kamera, tambahkan opsi mengganti kamera.

Misalnya:

```text
camera
front camera ▾
```

Jangan membuat camera picker terlalu menonjol.

---

# Capture Session

User bukan hanya mengambil satu foto.

Photobox harus memiliki **photo session**.

Default:

```text
4 photos
```

Flow:

```text
START SESSION

3
2
1
📸

photo 1 captured

3
2
1
📸

photo 2 captured

3
2
1
📸

photo 3 captured

3
2
1
📸

photo 4 captured
```

Interval antar foto sekitar 1–2 detik.

Countdown harus besar dan muncul di atas camera preview.

Contoh:

```text
3
2
1
```

Kemudian flash effect singkat saat capture.

Jangan gunakan emoji kamera pada final UI; gunakan visual shutter/flash yang lebih clean.

---

# Capture Modes

User bisa memilih:

```text
1 photo
2 photos
3 photos
4 photos
6 photos
```

Default:

```text
4 photos
```

---

# Timer

Pilihan:

```text
3 sec
5 sec
10 sec
```

Default:

```text
3 sec
```

---

# Filters

Tambahkan filter real-time.

Filter minimal:

### Original

Tidak ada filter.

### B&W

```css
grayscale(100%)
```

### Mono

Black & white dengan contrast sedikit lebih tinggi.

### Warm

Sedikit warmer seperti disposable camera.

### Cool

Sedikit cooler.

### Vintage

Slight sepia + reduced saturation.

### Film

Contrast lembut + slight warm tone.

### Fade

Low contrast / faded film.

Filter harus terlihat langsung pada camera preview.

Buat horizontal filter selector:

```text
original
b&w
mono
warm
cool
film
fade
```

Selected filter harus jelas tetapi tidak berlebihan.

---

# Photo Strip Layout

Setelah semua foto selesai, masuk ke **Result / Print Room**.

Generate satu gambar final menggunakan Canvas API.

Default layout photobox klasik:

```text
┌───────────────┐
│               │
│    PHOTO 1    │
│               │
├───────────────┤
│               │
│    PHOTO 2    │
│               │
├───────────────┤
│               │
│    PHOTO 3    │
│               │
├───────────────┤
│               │
│    PHOTO 4    │
│               │
│               │
│   PHOTOBOX    │
│  27.08.2026   │
└───────────────┘
```

Photo strip harus terlihat seperti kertas foto sungguhan.

Gunakan aspect ratio photostrip yang realistis.

Foto harus menggunakan crop `cover`, bukan stretch.

---

# Layout Options

Berikan beberapa opsi.

## Classic Strip

```text
┌───────┐
│ photo │
│ photo │
│ photo │
│ photo │
│       │
│ date  │
└───────┘
```

## Double Strip

Dua strip berdampingan seperti hasil photobox yang bisa dipotong.

```text
┌──────┬──────┐
│photo │photo │
│photo │photo │
│photo │photo │
│photo │photo │
└──────┴──────┘
```

## Grid

```text
┌─────────────┐
│ photo photo │
│ photo photo │
│             │
│  PHOTOBOX   │
└─────────────┘
```

## Polaroid

Satu atau beberapa foto dengan bottom white space lebih besar.

---

# Paper Color

User dapat memilih warna paper:

```text
white
cream
black
```

Untuk black paper, typography otomatis berubah menjadi warna terang.

Boleh tambah beberapa subtle color pilihan seperti:

```text
soft pink
soft blue
```

Tetapi jangan terlalu banyak.

---

# Photo Strip Customization

Pada halaman result tambahkan customization sederhana.

User dapat mengubah:

```text
paper
layout
filter
date
caption
```

Caption optional.

Contoh:

```text
summer '26
```

atau:

```text
us being us.
```

Batasi caption misalnya 30 karakter.

Jangan membuat editor yang rumit.

---

# Result Screen

Layout desktop:

```text
┌──────────────────────────────────────────────────┐
│                                                  │
│        PHOTO STRIP            CUSTOMIZE          │
│                                                  │
│        ┌────────┐           paper                │
│        │ photo  │           ○ white              │
│        │ photo  │           ○ cream              │
│        │ photo  │                                 │
│        │ photo  │           layout               │
│        │        │           classic ▾            │
│        │ 2026   │                                 │
│        └────────┘           caption              │
│                             [____________]        │
│                                                  │
│                       [download] [print]          │
│                                                  │
└──────────────────────────────────────────────────┘
```

Photo strip harus menjadi objek utama visual.

Customization controls tidak boleh mengalahkan hasil foto.

---

# Retake Feature

User harus bisa mengganti foto tertentu.

Misalnya thumbnail:

```text
01
02
03
04
```

Klik salah satu:

```text
retake
```

Setelah retake, hanya foto tersebut yang berubah.

Jangan memaksa user mengulang seluruh session.

Tambahkan juga:

```text
retake all
```

---

# Download

Button:

```text
download
```

Generate image final menggunakan Canvas.

Format:

```text
PNG
```

Resolution harus cukup tinggi untuk print.

Contoh target:

```text
1200 × 3600
```

atau ukuran proporsional tergantung layout.

File:

```text
photobox-2026-08-27.png
```

Pastikan hasil download sama dengan preview photo strip.

Jangan screenshot DOM jika Canvas bisa menghasilkan hasil yang lebih konsisten.

---

# Print

Tambahkan:

```text
print
```

Gunakan browser print dialog:

```javascript
window.print()
```

Buat print CSS khusus menggunakan:

```css
@media print
```

Saat print:

* sembunyikan navbar
* sembunyikan buttons
* sembunyikan editor
* hanya tampilkan photo strip
* center photo strip
* background bersih
* jangan print UI lain

---

# Session State

State minimal:

```typescript
type BoothSession = {
  photos: string[];
  filter: FilterType;
  layout: LayoutType;
  timer: number;
  captureCount: number;
  paper: PaperType;
  caption?: string;
  showDate: boolean;
};
```

Gunakan state management sederhana.

Tidak perlu Redux.

React state/context cukup.

---

# Privacy

Karena ini camera app, privacy penting.

Semua foto diproses locally di browser.

Jangan upload foto ke server.

Tambahkan copy kecil:

```text
your photos stay on this device.
```

Tidak perlu privacy modal besar.

---

# Animations

Gunakan animasi dengan sangat hati-hati.

Yang saya butuhkan hanya:

* countdown
* camera shutter
* quick flash
* smooth page transition
* subtle button interaction

Camera capture:

```text
screen
   ↓
white flash ~100ms
   ↓
photo captured
```

Jangan gunakan:

* bouncing elements
* excessive Framer Motion animation
* floating gradients
* unnecessary parallax

Jika menggunakan Framer Motion, gunakan hanya untuk micro-interactions yang benar-benar membantu.

---

# Sound

Optional tetapi bagus jika dibuat.

Tambahkan shutter sound.

Control kecil:

```text
sound
on / off
```

Default boleh ON.

Jika tidak ada asset audio, jangan mengambil audio random dari internet. Buat agar mudah ditambahkan melalui `/public`.

---

# Responsive Design

Website harus sangat nyaman di mobile.

Mobile booth:

```text
PHOTOBOX

┌──────────────────┐
│                  │
│      CAMERA      │
│                  │
└──────────────────┘

original  bw  warm  film →

        ●
      capture
```

Result mobile:

```text
PHOTOBOX

     ┌────────┐
     │ photo  │
     │ photo  │
     │ photo  │
     │ photo  │
     └────────┘

paper
○ white ○ cream ○ black

[ download ]

[ print ]

retake
```

Tidak boleh horizontal overflow selain filter carousel yang memang disengaja.

---

# Keyboard Shortcuts

Desktop:

```text
SPACE = capture / start session
R = retake
F = cycle filter
```

Jangan trigger shortcut ketika user sedang mengetik caption.

---

# Components

Pisahkan setidaknya:

```text
components/
  CameraPreview.tsx
  CameraControls.tsx
  CountdownOverlay.tsx
  FilterSelector.tsx
  LayoutSelector.tsx
  PhotoStrip.tsx
  PhotoStripCanvas.ts
  PhotoThumbnail.tsx
  ResultEditor.tsx
  ShutterButton.tsx
```

Boleh ubah struktur jika ada arsitektur yang lebih baik.

---

# Pages

Minimal:

```text
/
```

Landing page.

```text
/booth
```

Camera experience.

```text
/result
```

Photo strip + customization + download + print.

Jika lebih baik menggunakan satu page dengan internal state machine, boleh lakukan, selama routing dan UX tetap bersih.

---

# State Machine

Pertimbangkan flow:

```text
idle
  ↓
camera-ready
  ↓
countdown
  ↓
capturing
  ↓
waiting-next-photo
  ↓
countdown
  ↓
capturing
  ↓
completed
  ↓
editing
  ↓
download / print
```

Jangan biarkan user menekan tombol capture berkali-kali ketika session sedang berlangsung.

---

# Edge Cases

Handle:

* camera permission denied
* camera tidak tersedia
* browser tidak support MediaDevices
* photo belum lengkap
* user keluar saat camera aktif
* changing camera
* mobile orientation
* canvas image belum loaded
* print gagal/unsupported
* repeated capture button clicks
* download saat canvas belum ready

Berikan error message yang manusiawi.

Contoh:

```text
camera access is off.
allow camera access in your browser to use the booth.
```

Bukan:

```text
Error: NotAllowedError
```

---

# Code Quality

Saya ingin implementation production-quality.

Pastikan:

* TypeScript strict
* reusable hooks
* avoid duplicated logic
* proper cleanup `MediaStream`
* object URL/data URL handling benar
* jangan memory leak
* jangan capture stale state
* accessible buttons
* focus state jelas
* semantic HTML
* gambar memiliki alt bila diperlukan
* button memiliki type yang benar
* responsive layout
* tidak ada console error
* tidak ada hydration error

Buat custom hook jika membantu:

```text
useCamera()
usePhotoSession()
usePhotoStrip()
```

---

# Visual Detail

Saya ingin photo strip terasa seperti **physical object**, bukan card UI.

Boleh berikan:

* extremely subtle paper texture via CSS
* very subtle border
* small print typography
* realistic spacing
* tiny date stamp
* brand mark kecil

Contoh bagian bawah:

```text
PHOTOBOX

27 · 08 · 2026
```

atau:

```text
PHOTOBOX
little moments, kept.
```

Jangan terlalu banyak dekorasi.

---

# Typography

Pilih typography yang clean.

Boleh kombinasi:

* sans-serif modern untuk interface
* monospace kecil untuk metadata/date

Contoh:

```text
PHOTOBOX
session 01
27.08.26
```

Jangan menggunakan font futuristik yang terlihat seperti AI startup.

---

# Color Direction

Base:

```text
off-white
black
warm gray
```

Accent boleh satu warna muted.

Contoh:

```text
#F4F1EA
#171717
```

Tetapi tentukan design system yang konsisten sendiri.

Jangan buat semuanya pure white seperti dashboard SaaS.

---

# Important UX Detail

Setelah user mengambil foto terakhir:

Jangan langsung berpindah secara kasar.

Flow:

```text
click!
↓
photo captured
↓
small pause
↓
"that's a wrap."
↓
transition ke print room
```

Di print room:

```text
your strip is ready.
```

Kemudian tampilkan hasil.

---

# Bonus Feature

Jika core feature sudah sempurna, tambahkan beberapa dari fitur berikut:

### Film grain

Toggle:

```text
grain
off / low / medium
```

Grain harus ikut masuk ke generated Canvas.

### Timestamp styles

```text
27.08.26
AUG 27 '26
27 / VIII / 2026
```

### Photo strip duplicate

Button:

```text
make a copy
```

Menghasilkan double strip seperti photobox asli.

### Theme

```text
classic
night
```

Tetapi jangan implement bonus jika membuat core experience menjadi lebih buruk.

---

# Prioritas Implementasi

Urutan pengerjaan:

1. Camera permission + preview
2. Camera capture
3. Countdown
4. Multi-photo session
5. Filter
6. Photo session state
7. Photo strip preview
8. Canvas renderer
9. Download PNG
10. Print
11. Retake individual photo
12. Layout customization
13. Paper customization
14. Responsive/mobile polish
15. Animation polish
16. Optional bonus features

Pastikan setiap tahap berfungsi sebelum menambahkan fitur berikutnya.

---

# Final Requirement

Jangan hanya membuat mockup.

**Implementasikan aplikasinya sampai benar-benar usable.**

Saya ingin setelah project selesai saya bisa:

```text
npm install
npm run dev
```

Buka browser, lalu benar-benar:

```text
allow camera
→ pilih filter
→ pilih 4 photos
→ start
→ 3
→ 2
→ 1
→ capture
→ ulang sampai 4 foto
→ lihat photo strip
→ edit strip
→ retake jika perlu
→ download PNG
→ atau print
```

Jangan gunakan placeholder untuk feature utama.

Jangan meninggalkan TODO pada fungsi core.

Setelah selesai:

1. Jalankan TypeScript/lint check.
2. Perbaiki error yang ditemukan.
3. Pastikan build berhasil.
4. Review UI dan hapus elemen yang terasa seperti AI-generated template.
5. Pastikan mobile responsive.
6. Pastikan camera MediaStream di-cleanup dengan benar.
7. Pastikan Canvas output sesuai preview.
8. Berikan README singkat berisi cara menjalankan project dan penjelasan arsitektur.

**Design principle utama:**

> Make it feel like a real photo booth that happens to live in a browser, not a generic web app with a webcam attached.
