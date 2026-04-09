# Final Manual Verification Checklist (PUB-015)

Before officially pointing DNS to the production release, perform these manual checks:

## 1. Scripture Navigation
- [ ] **Gita**: Open Chapter 2, Verse 47. Verify Sanskrit, Transliteration, and English Translation appear.
- [ ] **Gita**: Click on "Swami Sivananda" commentary. Verify it loads and is readable.
- [ ] **Mahabharata**: Navigate to Parva 2 (Sabha Parva), Adhyaya 5. Verify text content is present.
- [ ] **Upanishad**: Open Isha Upanishad, Verse 1. Verify layout is correct.

## 2. Search & Lab
- [ ] **Search**: Type "Dharma" in search. Verify results appear from Gita and Mahabharata.
- [ ] **Tokenizer**: Paste a Gita verse in the Sanskrit Tokenizer Lab. Verify it breaks into words.
- [ ] **Meter**: Paste an Anushtubh verse in the Meter Analyzer. Verify "Anushtubh" is detected.

## 3. UI/UX
- [ ] **Branding**: Verify NO "Beta" or "Prototype" labels are visible on the Home page.
- [ ] **Branding**: Verify "Cognitive Manuscript Synthesis" card in verses does NOT show "PoC Fallback".
- [ ] **Acknowledgments**: Visit `/acknowledgments`. Verify all links are functional.
- [ ] **Mobile**: Open the app on a mobile device. Verify Header and StudyClient are responsive.

## 4. Technical
- [ ] **SSL**: Verify `https://vishwavani.app` shows a valid SSL certificate (Cloudflare).
- [ ] **Console**: Open DevTools Console. Verify NO errors are present.
- [ ] **Headers**: Use `curl -I` to verify `Strict-Transport-Security` and `Content-Security-Policy` are present.
