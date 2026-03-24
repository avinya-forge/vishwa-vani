# 🌐 VISHWA-VANI: VANI-API v1.0 (Developer Specification)

The **VANI-API** provides secure, rate-limited access to the **Vishwa-Vani Central Data Lake**. It enables scholars, researchers, and AI developers to integrate high-fidelity Vedic data into their own ecosystems.

---

## 🏛️ Base Architecture
- **Protocol**: RESTful (JSON) or GraphQL (Planned v2.0).
- **Endpoint**: `https://api.vishwa-vani.org/v1/`
- **Security**: Bearer Token (JWT) / OAuth2.

---

## 🏗️ Endpoints

### 1. Scriptural Inventory (`GET /v1/manifest`)
Returns the master list of all available scriptures, chapters, and supported languages.

### 2. Verse Retrieval (`GET /v1/verse/{slug}/{chapter}/{verse}`)
Returns the full machine-readable fragment including original Sanskrit, transliteration, and scholar layers.

### 3. Semantic Search (`POST /v1/search`)
`POST {"query": "dharma", "limit": 10}`
Returns verses scored by relevance using our internal **Axiom Index**.

### 4. Synthesis Engine (`POST /v1/synthesize`)
`POST {"verse_id": "bg_1_1", "authors": ["iskcon", "dnyan"], "lang": "hi"}`
Returns an AI-synthesized philosophical essence of the requested verse.

---

## 🧪 Rate Limits (ADF-API-SEC)
- **Standard (Free)**: 1,000 requests/day.
- **Academic (Scholar)**: 10,000 requests/day.
- **Enterprise (AI Lab)**: 100,000 requests/day.

---

## 📊 SDK Compatibility
- **JavaScript/TypeScript**: `npm install @vishwa-vani/sdk`
- **Python**: `pip install vanipy`

_This specification forms the foundation for our Global Vedic Developer Ecosystem._
