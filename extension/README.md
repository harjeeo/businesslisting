# GMB Listing Capture — Chrome Extension

Google Maps par jab bhi aap koi business listing open karo (jaise ek cafe),
uska **Name, Address, Phone** (aur Category, Website, Rating agar dikh rahe
hon) apne aap capture ho kar ek list mein save ho jaate hain. Poori list ek
naye tab mein dekh sakte ho aur CSV file mein export kar sakte ho, jise
Google Sheets mein directly import kiya ja sakta hai.

## Install kaise kare (Load unpacked)

1. Chrome mein `chrome://extensions` open karo.
2. Top-right mein **Developer mode** ON karo.
3. **Load unpacked** button par click karo.
4. Is `gmb-listing-scraper` folder ko select karo.
5. Extension icon toolbar mein aa jayega — usme ek badge number dikhega
   jitni listings capture ho chuki hain.

## Use kaise kare

1. `google.com/maps` par jaakar koi bhi business search karo aur uski
   listing open karo.
2. Kuch second baad screen ke **niche-right corner mein ek button** dikhega:
   **"📥 List mein Save Karo"**. Isko click karo — tabhi wo listing save
   hogi (automatic nahi hai, manual click zaroori hai).
3. Save hone ke baad button **"✓ Save ho gaya"** ho jaayega aur ek toast bhi
   dikhega jisme kitni images capture hui, wo count bhi dikhega.
4. Extension icon par click karke **"Poori list dekho"** dabao — ek naye tab
   mein saari captured listings table format mein dikhengi.
5. List page par:
   - **Search box** — naam ya address se filter karo.
   - **30 listings ke baad "Load more" button** apne aap aa jaata hai, aur
     click karne par agli 30 load ho jaati hain.
   - **☁️ Platform ko bhejo** — captured listings seedha aapke Business
     Listing Marketplace ke database mein bhej deta hai (neeche dekho).
   - **CSV export karo** — CSV file download hoti hai (save location poochega).
   - **Hatao** — kisi bhi row ko individually list se hata sakte ho.
   - **Sab clear karo** — poori list delete kar deta hai (confirm poochega).

## Platform se connect kaise kare

1. Backend chalane wale se (ya khud, agar aapne hi backend deploy kiya hai)
   `backend/.env` file mein `IMPORT_API_KEY` set karwao/karo — koi bhi
   random secret string. `.env.example` mein iska format hai.
2. Backend restart karo taaki naya key load ho.
3. List page par **⚙️ Settings** button dabao aur do cheezein bharo:
   - **Platform API URL** — backend ka address + `/api`, jaise
     `http://localhost:4000/api` (local dev) ya production URL
     `https://yourdomain.com/api`.
   - **Import API Key** — wahi key jo `.env` mein `IMPORT_API_KEY` set
     ki thi.
4. **Save Karo** dabao.
5. Ab jab bhi listings capture ho jayen, **☁️ Platform ko bhejo** button
   dabao — jo bhi listing pehle nahi bheji gayi, wo bhej di jayegi. Har
   row mein **Platform** column dikhayega ki wo "Sent" hai ya "Pending".
6. Backend mein har imported business **Pending** status mein banta hai
   (Super Admin panel ke Businesses page par jaake verify/edit/publish
   karna hoga) — automatically live nahi ho jaata.
7. Agar wahi business dobara bheji jaaye (naam same ho), to wo naya
   duplicate nahi banega — existing wala update ho jayega.

**Production ke liye:** agar aap backend ko `localhost` ke alawa kisi aur
domain par deploy karte ho, to `manifest.json` ke `host_permissions` mein
us domain ko bhi add karna hoga (jaise `"https://yourdomain.com/*"`),
warna extension us URL ko call nahi kar payega.

## Kaunse fields capture hote hain

| Field | Reliability |
|---|---|
| Shop Name | Reliable |
| Address | Reliable |
| Phone | Reliable (agar listing par phone number diya ho) |
| Website | Reliable (agar listing par website diya ho) |
| Images (max 5) | Best-effort — jitni bhi photos panel mein load hui hongi utni milengi (max 5), kabhi kam bhi ho sakti hain |
| Timing/Hours | Best-effort — abhi sirf jo status line dikh rahi hai (jaise "Open · Closes 7:30 pm") wahi capture hoti hai |
| Email | **Prayah khaali rahega** — Google Maps businesses ka email normally dikhata hi nahi hai. Agar description mein kahin likha mila to hi aayega, warna website se manually nikalna hoga |
| Category, Rating | Best-effort extras |

## CSV ko Google Sheets mein import kaise kare

1. Downloaded `gmb-listings-YYYY-MM-DD.csv` file kholo.
2. Google Sheets mein: **File → Import → Upload**, CSV file select karo.
3. "Replace current sheet" ya "Insert new sheet" — jo chahiye choose karo.

## Important notes

- Ye extension sirf **`google.com/maps`** pages par kaam karta hai.
- Data sirf aapke apne browser mein (`chrome.storage.local`) save hota hai —
  kahin bahar nahi bheja jaata.
- Google Maps apna page design/HTML class names samay samay par badalta
  rehta hai. Agar kabhi capture hona band ho jaye, to ho sakta hai
  `content.js` ke selectors update karne padein.
- Google Maps ko automatically scrape karna Google ki Terms of Service ke
  hisaab se dhyan rakhne wali baat hai — ye tool sirf wahi data capture
  karta hai jo aap khud manually browse karte waqt dekh rahe ho (bulk
  automated scraping nahi karta), lekin apne use ke hisaab se ToS zaroor
  check kar lena.
