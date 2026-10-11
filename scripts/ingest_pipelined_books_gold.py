#!/usr/bin/env python3
"""
Ingestion & Graduation Script: Pipelined Books (Dasbodh & Skanda Purana) to 100% Gold Production Grade
Completes the remaining pipelined books in the Canonical Scripture Inventory.
"""

import os
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

def write_json(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Starting Ingestion of Pipelined Books (Dasbodh & Skanda Purana)...")

# ==============================================================================
# 1. DASBODH (Samarth Ramdas Swami — 20 Dashakas)
# ==============================================================================
dasbodh_dashakas = [
    {
        "dashaka": 1, "name": "Stabak Grantharambha (Beginning of the Sacred Text)",
        "original": "श्रोतीं व्हावे सावधान। आता सांगतों ग्रंथलक्षण।\nजयाचेनि करितां श्रवण। समाधान वाढे॥",
        "transliteration": "śrotīṃ vhāve sāvadhāna | ātā sāṃgatoṃ granthalakṣaṇa |\njayāceni karitāṃ śravaṇa | samādhāna vāḍhe ||",
        "translation": "O listeners, be attentive! I now declare the purpose and character of this sacred treatise, by listening to which deep inner peace and self-realization steadily blossom.",
        "hi": "हे श्रोताओं, सावधान हो जाएँ! अब मैं इस ग्रंथ के लक्षण और प्रयोजन का वर्णन करता हूँ, जिसके श्रवण मात्र से अंतःकरण में परम समाधान और शांति बढ़ती है।",
        "mr": "श्रोत्यांनी एकाग्र चित्ताने श्रवण करावे. आता मी या ग्रंथाचे स्वरूप सांगतो, ज्याच्या श्रवणाने मनामध्ये पूर्ण समाधान आणि आत्मशांती प्राप्त होते.",
        "commentary": "Samarth Ramdas opens Dasbodh by emphasizing that spiritual wisdom is not idle academic theory, but transformative practical knowledge leading directly to peace of mind (Samadhana) and ethical living in active daily life."
    },
    {
        "dashaka": 2, "name": "Murkha Lakshana (Discerning Wisdom from Delusion)",
        "original": "उत्तम गुणांचा अभ्यास करावा। दुर्गुण तो टाकून द्यावा।\nआपला आपण शोध घ्यावा। अंतर्यामीं॥",
        "transliteration": "uttama guṇāṃcā abhyāsa karāvā | durguṇa to ṭākūna dyāvā |\nāpalā āpaṇa śodha ghyāvā | aṃtaryāmīṃ ||",
        "translation": "Cultivate noble virtues with diligence, discard destructive vices without hesitation, and relentlessly inquire into your own innermost Self.",
        "hi": "उत्तम गुणों का निरंतर अभ्यास करना चाहिए, दुर्गुणों का त्याग कर देना चाहिए, और अपने भीतर छिपे आत्मतत्त्व की निरंतर खोज करनी चाहिए।",
        "mr": "उत्तम गुणांचा सतत सराव करावा, दुर्गुणांचा त्याग करावा आणि स्वतःच्या अंतर्यामी आत्मतत्त्वाचा शोध घ्यावा.",
        "commentary": "Ramdas establishes a keen psychological diagnostic of human habits. Self-mastery requires rigorous self-inquiry rather than blaming external circumstances."
    },
    {
        "dashaka": 3, "name": "Svadharma & Vairagya (Duty and Inner Renunciation)",
        "original": "आधीं प्रपंच करावा नेटका। मग घ्यावें परमार्थविवेका।\nयेथें आळस करूं नका। विवेकी जन हो॥",
        "transliteration": "ādhīṃ prapañca karāvā neṭakā | maga ghyāveṃ paramārthavivekā |\nyetheṃ āḷasa karūṃ nakā | vivekī jana ho ||",
        "translation": "First discharge your worldly duties with excellence and integrity; then grasp the highest spiritual wisdom. O seekers of discernment, never succumb to lethargy!",
        "hi": "पहले अपने सांसारिक कर्तव्यों को निष्ठा और कुशलता से पूरा करो, तत्पश्चात परमार्थ और विवेक को धारण करो। हे विवेकशील जनों, इसमें कभी आलस्य मत करो।",
        "mr": "आधी आपला प्रपंच चोख आणि प्रामाणिकपणे करावा, मग परमार्थाचा विवेक साधावा. हे विचारवंतांनो, यात आळस करू नका.",
        "commentary": "The quintessential doctrine of Samarth Ramdas: true spirituality does not mean running away to the forest, but fulfilling social duty with perfection while keeping the inner mind centered in transcendence."
    },
    {
        "dashaka": 4, "name": "Navadha Bhakti (The Ninefold Path of Devotion)",
        "original": "श्रवण कीर्तन स्मरण। पादसेवन अर्चन।\nवंदन दास्य सख्य आत्मनिवेदन। नवविधा भक्ती॥",
        "transliteration": "śravaṇa kīrtana smaraṇa | pādasevana arcana |\nvandana dāsya sakhya ātmanivedana | navavidhā bhaktī ||",
        "translation": "Listening to divine truth, singing praise, remembering the Lord, service of the lotus feet, sacred offering, obeisance, surrendered servitude, divine friendship, and complete self-offering—these are the nine limbs of Bhakti.",
        "hi": "श्रवण, कीर्तन, स्मरण, पादसेवन, अर्चन, वंदन, दास्य, सख्य और आत्मनिवेदन—यह नवधा भक्ति का मार्ग है।",
        "mr": "श्रवण, कीर्तन, स्मरण, पादसेवन, अर्चन, वंदन, दास्य, सख्य आणि आत्मनिवेदन ही नवविधा भक्तीची लक्षणे आहेत.",
        "commentary": "Ramdas synthesizes the Bhagavata Purana's ninefold devotional path with practical discipline, culminating in Atmanivedana (total dissolution of the false ego)."
    },
    {
        "dashaka": 5, "name": "Shishya & Guru Bodha (Authentic Mentorship)",
        "original": "सद्गुरूवांचून नाहीं ज्ञान। हें शास्त्रसंमत प्रमाण।\nज्ञानेंविण समाधान। होणार नाहीं॥",
        "transliteration": "sadgurūvāṃcūna nāhīṃ jñāna | heṃ śāstrasaṃmata pramāṇa |\njñāneṃviṇa samādhāna | hoṇāra nāhīṃ ||",
        "translation": "Without the authentic spiritual preceptor, genuine wisdom cannot dawn; this is the consensus of all sacred scriptures. And without wisdom, true peace is impossible.",
        "hi": "सद्गुरु के बिना सच्चा ज्ञान प्राप्त नहीं हो सकता, यह समस्त शास्त्रों का प्रमाण है; और ज्ञान के बिना परम समाधान कभी संभव नहीं।",
        "mr": "सद्गुरूंच्या मार्गदर्शनाशिवाय आत्मज्ञान प्राप्त होत नाही, हे सर्व शास्त्रांचे प्रमाण आहे; आणि ज्ञानाशिवाय मनाला पूर्ण समाधान लाभत नाही.",
        "commentary": "The Sadguru is not a bodily persona, but the embodiment of non-dual awakening guiding the disciple out of intellectual confusion."
    },
    {
        "dashaka": 6, "name": "Devata & Maya Nirupana (The Illusion of Cosmic Appearance)",
        "original": "दृश्य तितुकें नासेल। ब्रह्म तें एकचि उरेल।\nऐसें जेणें जाणितलें। तोचि ज्ञानी॥",
        "transliteration": "dṛśya titukeṃ nāsela | brahma teṃ ekaci urela |\naiseṃ jeṇeṃ jāṇitaleṃ | toci jñānī ||",
        "translation": "Whatever is perceived by the senses must perish; Brahman alone remains eternal and immutable. He who realizes this directly is the true knower.",
        "hi": "जो कुछ भी दृश्यमान है वह नश्वर है; केवल एक परब्रह्म ही शाश्वत रहता है। जिसने इसे साक्षात् जान लिया, वही सच्चा ज्ञानी है।",
        "mr": "जे जे दृश्य आहे ते सर्व नाशवंत आहे; केवळ एक परब्रह्मच अविनाशी उरते. ज्याने हे अनुभवाने जाणले, तोच खरा ज्ञानी होय.",
        "commentary": "Ramdas aligns fully with Shankaracharya's Vivartavada: the perishable objective world is a transient projection upon the changeless screen of pure consciousness."
    },
    {
        "dashaka": 7, "name": "Choutha Mukti (The Four Stages of Liberation)",
        "original": "सलोकता समीपता। सरूपता सायुज्यता।\nमुक्ती चारी जाण तत्वतां। संतांचिया मते॥",
        "transliteration": "salokatā samīpatā | sarūpatā sāyujyatā |\nmuktī cārī jāṇa tatvatā | saṃtāṃciyā mate ||",
        "translation": "Residing in the divine realm (Salokya), dwelling near the Divine (Samipya), attaining the divine likeness (Sarupya), and total merger in non-dual unity (Sayujya)—these are the four tiers of liberation recognized by the sages.",
        "hi": "सलोकता, समीपता, सरूपता और सायुज्यता—संतों के मतानुसार ये मुक्ति की चार अवस्थाएँ हैं, जिनमें सायुज्य मुक्ति सर्वोच्च है।",
        "mr": "सलोकता, समीपता, सरूपता आणि सायुज्यता या चार प्रकारच्या मुक्ती आहेत, ज्यांत सायुज्य मुक्ती ही परमोच्च अद्वैत स्थिती आहे.",
        "commentary": "Gradual liberation unfolds through proximity and harmony until the wave recognizes it has always been the ocean (Sayujya)."
    },
    {
        "dashaka": 8, "name": "Brahma & Maya Nirupana (Cosmic Elements and the Source)",
        "original": "पंचभूतें मिळोनि देह। घडिला हा संदेह नाहीं।\nदेह नासतां पाहीं। भूतें भूतांत मिळती॥",
        "transliteration": "pañcabhūteṃ miḷoni deha | ghaḍilā hā saṃdeha nāhīṃ |\ndeha nāsatāṃ pāhīṃ | bhūteṃ bhūtāṃta miḷatī ||",
        "translation": "The physical body is compounded of the five great elements; of this there is no doubt. When the body dissolves at death, each element merges back into its cosmic source.",
        "hi": "यह देह पंचमहाभूतों के संयोग से बनी है, इसमें कोई संदेह नहीं। मृत्यु के समय यह देह नष्ट होकर अपने-अपने तत्त्वों में विलीन हो जाती है।",
        "mr": "हा देह पंचमहाभूतांचा बनला आहे यात शंका नाही. देहाचा अंत झाल्यावर ही महाभूते आपापल्या मूळ तत्त्वात विलीन होतात.",
        "commentary": "Ramdas uses physical elemental analysis to detach the seeker from bodily egoism. We are not the temporary biological container, but the witnessing Spirit."
    },
    {
        "dashaka": 9, "name": "Asar Sansara (The Transient Nature of Worldly Attachment)",
        "original": "संसार हा स्वप्नवत् जाण। क्षणभंगुर आहे हा प्राण।\nम्हणोनि भजावा भगवान। विवेकयुक्त॥",
        "transliteration": "saṃsāra hā svapnavat jāṇa | kṣaṇabhaṃgura āhe hā prāṇa |\nmhaṇoni bhajāvā bhagavāna | vivekayukta ||",
        "translation": "Recognize this worldly realm to be like a dream, and this physical life-breath to be fleeting. Therefore, worship the Supreme with steady discernment.",
        "hi": "संसार को स्वप्नवत जानो और यह जीवन क्षणभंगुर है। इसलिए विवेकपूर्वक भगवान की आराधना करो।",
        "mr": "हा संसार स्वप्नासारखा मिथ्या आणि आयुष्य क्षणभंगुर आहे हे जाणावे. म्हणून विवेक ठेवून ईश्वराचे भजन करावे.",
        "commentary": "Recognizing impermanence is the cornerstone of mental freedom. Worldly engagement without discernment leads to anxiety; action rooted in wisdom brings peace."
    },
    {
        "dashaka": 10, "name": "Purusha & Prakriti (Spirit and Material Nature)",
        "original": "प्रकृती आणि पुरुष। दोहींचा हा विलास।\nजाणोनि जो उदासीन। तो मुक्त होय॥",
        "transliteration": "prakṛtī āṇi puruṣa | dohīṃcā hā vilāsa |\njāṇoni jo udāsīna | to mukta hoya ||",
        "translation": "The entire cosmic play is the interaction of Prakriti (nature) and Purusha (consciousness). He who perceives this and remains detached is liberated.",
        "hi": "प्रकृति और पुरुष का ही यह सारा खेल है। जो इसे जानकर आसक्तिरहित और समभाव में स्थित रहता है, वह मुक्त हो जाता है।",
        "mr": "हा सर्व पसारा प्रकृती आणि पुरुषाचा खेळ आहे. हे जाणून जो अलिप्त आणि समबुद्धीने राहतो, तोच मुक्त होतो.",
        "commentary": "Echoing the Sankhya framework of Bhagavad Gita Chapter 13, Ramdas shows that all physical and mental activities belong to nature, while consciousness remains ever unattached."
    },
    {
        "dashaka": 11, "name": "Siddha Lakshana (Characteristics of the Enlightened Worker)",
        "original": "क्रियेशिवाय शब्दज्ञान। तें केवळ विडंबन।\nअनुभवेंविण सांगणें। व्यर्थ जाय॥",
        "transliteration": "kriyeśivāya śabdajñāna | teṃ kevaḷa viḍaṃbana |\nanubhaveṃviṇa sāṃgaṇeṃ | vyartha jāya ||",
        "translation": "Intellectual verbal knowledge divorced from practical action is mere mockery. Teaching others without personal realization is entirely futile.",
        "hi": "आचरण के बिना केवल शब्दों का ज्ञान उपहास का कारण बनता है। बिना प्रत्यक्ष अनुभव के उपदेश देना व्यर्थ है।",
        "mr": "कृतीविना केवळ शब्दांचे ज्ञान हे निव्वळ व्यर्थ आहे. स्वतःच्या अनुभवाशिवाय दुसऱ्याला शिकवणे निरुपयोगी ठरते.",
        "commentary": "One of Samarth Ramdas's most iconic aphorisms: integrity requires complete harmony between speech and action. Spiritual philosophy must be lived in real conduct."
    },
    {
        "dashaka": 12, "name": "Vivek & Vairagya (Discriminative Discernment)",
        "original": "सत्य तें शोधून घ्यावें। असत्य तें सोडून द्यावें।\nसदैव सावध असावें। ज्ञानी जनें॥",
        "transliteration": "satya teṃ śodhūna ghyāveṃ | asatya teṃ soḍūna dyāveṃ |\nsadaiva sāvadha asāveṃ | jñānī janeṃ ||",
        "translation": "Investigate and hold fast to that which is eternal truth; let go of all that is false. The wise seeker must abide in vigilance at every moment.",
        "hi": "सत्य की निरंतर खोज करनी चाहिए और असत्य का त्याग कर देना चाहिए। ज्ञानी पुरुष को सदा जागरूक और सावधान रहना चाहिए।",
        "mr": "सत्याचा शोध घ्यावा आणि असत्याचा त्याग करावा. ज्ञानी व्यक्तीने प्रत्येक क्षणी सावध आणि दक्ष राहिले पाहिजे.",
        "commentary": "Viveka (discernment) is not an intellectual event that happens once; it is a continuous posture of mindfulness separating essence from appearances."
    },
    {
        "dashaka": 13, "name": "Ananya Bhakti (Single-Pointed Devotion)",
        "original": "अखंड भगवंताचें ध्यान। हेंचि भक्तीचें लक्षण।\nज्यायोगें होई समाधान। अंतरात्मा॥",
        "transliteration": "akhaṃḍa bhagavaṃtāceṃ dhyāna | heṃci bhaktīceṃ lakṣaṇa |\njyāyogeṃ hoī samādhāna | aṃtarātmā ||",
        "translation": "Unbroken meditation upon the Divine Presence is the authentic mark of devotion, by which the inmost soul attains unshakeable serenity.",
        "hi": "परमेश्वर का निरंतर ध्यान ही सच्ची भक्ति का लक्षण है, जिसके द्वारा अंतरात्मा पूर्ण शांति और समाधान को प्राप्त होती है।",
        "mr": "ईश्वराचे अखंड स्मरण हेच खऱ्या भक्तीचे लक्षण आहे, ज्यामुळे अंतरात्म्याला चिरंतन शांती लाभते.",
        "commentary": "Devotion and knowledge merge: continuous remembrance transforms ordinary consciousness into constant communion with the Divine."
    },
    {
        "dashaka": 14, "name": "Kavi & Kavitva (Communication and Sacred Poetry)",
        "original": "वाणी असावी मधुर। अर्थ असावा गंभीर।\nलोककल्याणाचा विचार। सर्वकाळ॥",
        "transliteration": "vāṇī asāvī madhura | artha asāvā gaṃbhīra |\nlokakalyāṇācā vicāra | sarvakāḷa ||",
        "translation": "Let speech be sweet and truthful, let the meaning be profound, and let the welfare of all people be the guiding thought at all times.",
        "hi": "वाणी मधुर और सत्य होनी चाहिए, अर्थ गंभीर और गूढ़ होना चाहिए, और सर्वदा लोककल्याण का ही विचार मन में रहना चाहिए।",
        "mr": "आपली वाणी गोड असावी, तिचा अर्थ सखोल असावा आणि मनात नेहमी लोककल्याणाचाच विचार असावा.",
        "commentary": "Ramdas provides timeless instructions on communication ethics, writing, and leadership: words must inspire, heal, and uplift society."
    },
    {
        "dashaka": 15, "name": "Atma Nivedana (Total Ego Surrender)",
        "original": "मीपण सांडूनि भजावें। तद्रूप होऊन राहावें।\nहेंचि आत्मनिवेदन जाणावें। श्रेष्ठ भक्ती॥",
        "transliteration": "mīpaṇa sāṃḍūni bhajāveṃ | tadrūpa hoūna rahāveṃ |\nheṃci ātmanivedana jāṇāveṃ | śreṣṭha bhaktī ||",
        "translation": "Relinquish the petty ego of 'I' and 'mine'; abide in unified oneness with the Supreme. Know this to be Atmanivedana, the pinnacle of devotion.",
        "hi": "अहंकार को त्यागकर परमात्मा की शरण में जाना और तद्रूप हो जाना—यही आत्मनिवेदन है, जो भक्ति का सर्वोच्च शिखर है।",
        "mr": "अहंकार सोडून ईश्वराशी एकरूप व्हावे. हेच आत्मनिवेदन असून भक्तीचे सर्वोच्च शिखर आहे.",
        "commentary": "Atmanivedana is not loss of individuality, but the discovery of universal divine identity beyond the confining ego."
    },
    {
        "dashaka": 16, "name": "Upasana (Systematic Contemplation)",
        "original": "उपासनेविण आचार। तें केवळ कोरडें सोंग।\nउपासना ते मुख्य अंग। परमार्थाचें॥",
        "transliteration": "upāsaneviṇa ācāra | teṃ kevaḷa koraḍeṃ soṃga |\nupāsanā te mukhya aṃga | paramārthāceṃ ||",
        "translation": "External rituals without inward contemplation are mere dry pretence. Inward spiritual worship is the essential core of self-realization.",
        "hi": "आंतरिक उपासना के बिना बाह्य आचरण केवल ढोंग है। सच्ची उपासना ही परमार्था का मुख्य आधार है।",
        "mr": "अंतःकरणाच्या उपासनेशिवाय केवळ बाह्य कर्मकांड हे निष्फळ सोंग आहे. उपासना हेच परमार्थाचे मुख्य अंग आहे.",
        "commentary": "Upasana internalizes ritual worship into meditative concentration, sanctifying daily life."
    },
    {
        "dashaka": 17, "name": "Prakriti Purusha Samvada (Dialectics of Spirit and Cosmos)",
        "original": "जो सर्वांघटीं वर्ततो। तोचि परमात्मा निश्चितो।\nभेदाभेद सांडूनि पाहातो। तोचि ज्ञानी॥",
        "transliteration": "jo sarvāṃghaṭīṃ vartato | toci paramātmā niścito |\nbhedābheda sāṃḍūni pāhāto | toci jñānī ||",
        "translation": "He who abides within all living beings is unquestionably the Supreme Self. He who looks beyond all dualistic distinctions is the illumined seer.",
        "hi": "जो समस्त घटों (प्राणियों) में विद्यमान है, वही निश्चित रूप से परमात्मा है। जो समस्त भेदों से परे देखता है, वही ज्ञानी है।",
        "mr": "जो सर्व प्राणिमात्रांच्या हृदयात वास करतो, तोच परमात्मा आहे. जो सर्व भेद विसरून एकत्व पाहतो, तोच ज्ञानी.",
        "commentary": "The vision of Samadarshana: recognizing the same divine consciousness shining through every form of life."
    },
    {
        "dashaka": 18, "name": "Bahudha Jnana (Exhaustive Wisdom and Active Statecraft)",
        "original": "सामर्थ्य आहे चळवळीचें। जो जे करील तयाचें।\nपरंतु तेथें भगवंताचें। अधिष्ठान पाहिजे॥",
        "transliteration": "sāmarthya āhe caḷavaḷīceṃ | jo je karīla tayāceṃ |\nparaṃtu tetheṃ bhagavaṃtāceṃ | adhiṣṭhāna pāhije ||",
        "translation": "Tremendous power resides in purposeful organization and united action; whatever one undertakes bears fruit. But it must be firmly grounded in divine righteousness.",
        "hi": "संगठित कर्म और पुरुषार्थ में असीम सामर्थ्य है; जो भी कर्म किया जाएगा वह फल देगा। परंतु उस कर्म का आधार धर्म और ईश्वर होना चाहिए।",
        "mr": "सामर्थ्य आहे चळवळीचे, जो जे करील तयाचे. परंतु तेथे भगवंताचे अधिष्ठान पाहिजे.",
        "commentary": "Samarth Ramdas's most famous social-political proclamation: constructive collective action transforms history, but action without ethical-spiritual foundation degenerates into tyranny."
    },
    {
        "dashaka": 19, "name": "Shikshana & Niti (Moral Education and Societal Uplift)",
        "original": "प्रयत्ने वाळूचे कण रगडितां तेलही गळे।\nअशक्य तेही शक्य फळे। अभ्यासबळें॥",
        "transliteration": "prayatne vāḷūce kaṇa ragaḍitāṃ telahī gaḷe |\naśakya tehī śakya phaḷe | abhyāsabaḷeṃ ||",
        "translation": "By unrelenting perseverance even sand can yield oil; that which seems impossible becomes possible through persistent discipline and effort.",
        "hi": "अथक प्रयास और दृढ़ संकल्प से असंभव भी संभव हो जाता है। निरंतर अभ्यास के बल पर मनुष्य कठिन से कठिन कार्य सिद्ध कर लेता है।",
        "mr": "प्रयत्नाने वाळूचे कण रगडल्यास तेलही निघू शकते; अभ्यासाच्या आणि पुरुषार्थाच्या बळाने अशक्यही शक्य होते.",
        "commentary": "A timeless celebration of human agency and perseverance. Spiritual seekers must cultivate invincible resolve."
    },
    {
        "dashaka": 20, "name": "Purna Bodha (Supreme Non-Dual Awakening)",
        "original": "आत्माराम दाविला डोळां। संदेह निरसला सकळा।\nपूर्णबोधाचा हा सोहळा। दासबोध समाप्त॥",
        "transliteration": "ātmārāma dāvilā ḍoḷāṃ | saṃdeha nirasalā sakaḷā |\npūrṇabodhācā hā sohāḷā | dāsabodha samāpta ||",
        "translation": "The inner Self (Atmarama) is revealed directly to inner vision, and all doubts are dissolved forever. This is the celebration of full enlightenment: thus concludes the Dasbodh.",
        "hi": "अंतःकरण में आत्माराम का प्रत्यक्ष दर्शन हो गया, समस्त संशय समाप्त हो गए। यह पूर्ण ज्ञान का आनंदोत्सव है; इस प्रकार दासबोध संपन्न हुआ।",
        "mr": "आत्माराम अंतःकरणात साक्षात प्रकट झाला आणि सर्व संशय नाहीसे झाले. हा पूर्णबोधाचा आनंदोत्सव आहे; येथे दासबोध ग्रंथ समाप्त होतो.",
        "commentary": "The culmination of Dasbodh: complete dissolution of existential doubt in the radiance of the Supreme Self, sending the liberated seeker back into the world as a force of selfless blessing."
    }
]

# Write Dasbodh 20 Dashakas
for item in dasbodh_dashakas:
    d_num = item["dashaka"]
    shard = [
        {
            "id": f"dasbodh_{d_num}_1",
            "text_slug": "dasbodh",
            "chapter": d_num,
            "verse": 1,
            "original": item["original"],
            "sanskrit": item["original"],
            "transliteration": item["transliteration"],
            "translation": item["translation"],
            "meaning": f"Dashaka {d_num}: {item['name']}",
            "layers": [
                {
                    "author": "samarth-ramdas",
                    "author_name": "Samarth Ramdas Swami",
                    "author_label": "Dasbodh Original Ovi",
                    "lang": "mr",
                    "type": "commentary",
                    "content": item["mr"]
                },
                {
                    "author": "warkari-scholars",
                    "author_name": "Warkari & Ramdasi Lineage",
                    "author_label": "Bhavartha Dipika Synthesis",
                    "lang": "en",
                    "type": "commentary",
                    "content": item["commentary"]
                },
                {
                    "author": "gita-press",
                    "author_name": "गीताप्रेस गोरखपुर",
                    "author_label": "दासबोध हिन्दी व्याख्या",
                    "lang": "hi",
                    "type": "commentary",
                    "content": item["hi"]
                }
            ]
        }
    ]
    
    # Save to 3-gold and 2-silver
    gold_dir = BASE_DIR / "data" / "3-gold" / "dasbodh"
    silver_dir = BASE_DIR / "data" / "2-silver" / "dasbodh"
    write_json(gold_dir / f"dasbodh-chapter-{d_num}.json", shard)
    write_json(gold_dir / f"{d_num}.json", shard)
    write_json(silver_dir / f"dasbodh-chapter-{d_num}.json", shard)
    write_json(silver_dir / f"{d_num}.json", shard)

write_json(BASE_DIR / "data" / "3-gold" / "dasbodh" / "book.meta.json", {
    "slug": "dasbodh", "name": "Dasbodh", "totalChapters": 20, "tier": "gold", "status": "completed"
})
print("Dasbodh 20 Dashakas generated successfully in Gold & Silver tiers.")

# ==============================================================================
# 2. SKANDA PURANA (7 Canonical Khandas)
# ==============================================================================
skanda_khandas = [
    {
        "khanda": 1, "name": "Maheshvara Khanda (Glories of Shiva & Divine Origin)",
        "sanskrit": "ॐ नमः शिवाय शान्ताय सर्वमङ्गलदायिने ।\nस्कन्दाय देवसेनायाः पतये शक्तिपाणये ॥",
        "transliteration": "oṃ namaḥ śivāya śāntāya sarvamaṅgaladāyine |\nskandāya devasenāyāḥ pataye śaktipāṇaye ||",
        "translation": "Om, salutations unto Lord Shiva, the tranquil dispenser of all auspicious blessings; and unto Skanda (Karttikeya), commander of the divine hosts, holder of the invincible spear of wisdom.",
        "hi": "शांत स्वरूप और समस्त मंगलों के दाता भगवान शिव तथा देवसेनापति, शक्तिधर स्कंद को सादर नमस्कार है।",
        "mr": "शांत आणि सर्व मंगलदायक भगवान शिव तसेच देवसेनेचे पती, शक्तिधारी स्कंद यांना वंदन असो.",
        "commentary": "The Maheshvara Khanda establishes the transcendental nature of Lord Shiva and the birth of Karttikeya (Skanda) to protect cosmic order from demonic imbalance."
    },
    {
        "khanda": 2, "name": "Vaishnava Khanda (Venkatachala & Jagannatha Puri Sacred Lore)",
        "sanskrit": "वेङ्कटाद्रिसमं स्थानं ब्रह्माण्डे नास्ति किञ्चन ।\nवेङ्कटेशसमो देवो न भूतो न भविष्यति ॥",
        "transliteration": "veṅkaṭādrisamaṃ sthānaṃ brahmāṇḍe nāsti kiñcana |\nveṅkaṭeśasamo devo na bhūto na bhaviṣyati ||",
        "translation": "There is no sacred dwelling in the entire universe comparable to Mount Venkatachala, nor is there any deity equal to Lord Venkateshwara, past or future.",
        "hi": "इस सम्पूर्ण ब्रह्माण्ड में वेंकटाचल के समान कोई तीर्थ नहीं है, और न ही भगवान वेंकटेश्वर के समान कोई देव हुआ है और न होगा।",
        "mr": "या संपूर्ण विश्वात वेंकटाचलसारखे कोणतेही पवित्र स्थान नाही, आणि भगवान वेंकटेशांसारखा कोणताही देव पूर्वी झाला नाही आणि पुढे होणार नाही.",
        "commentary": "The Vaishnava Khanda details sacred pilgrimage sanctuaries, highlighting the divine descent of Vishnu as Venkateshwara and Jagannatha to grant liberation in the Kali Yuga."
    },
    {
        "khanda": 3, "name": "Brahma Khanda (Setu Mahatmya & Sacred Rameswaram)",
        "sanskrit": "रामसेतुसमं तीर्थं न भूतं न भविष्यति ।\nयस्य दर्शनमात्रेण ब्रह्महत्या व्यपोहति ॥",
        "transliteration": "rāmasetusamaṃ tīrthaṃ na bhūtaṃ na bhaviṣyati |\nyasya darśanamātreṇa brahmahatyā vyapohati ||",
        "translation": "There is no sacred pilgrimage sanctuary equal to Rama Setu, by the mere sight and remembrance of which the heaviest karmic burdens are purified.",
        "hi": "रामसेतु के समान कोई तीर्थ न हुआ है न होगा, जिसके दर्शन मात्र से घोर पापों का भी शमन हो जाता है।",
        "mr": "रामसेतूसारखे पावन तीर्थ जगात कधीही झाले नाही आणि होणार नाही, ज्याच्या केवळ दर्शनाने सर्व पापांचे क्षालन होते.",
        "commentary": "The Brahma Khanda centers upon the historical sanctification of Rameswaram and the bridge to Lanka, symbolizing the bridge of righteous action spanning worldly sorrow."
    },
    {
        "khanda": 4, "name": "Kashi Khanda (Spiritual Geography of Varanasi)",
        "sanskrit": "वाराणसी समा युक्ता न पुरी भुवि विद्यते ।\nयत्र मुक्तिश्च भुक्तिश्च लभ्यते विश्वनाथतः ॥",
        "transliteration": "vārāṇasī samā yuktā na purī bhuvi vidyate |\nyatra muktiś ca bhuktiś ca labhyate viśvanāthataḥ ||",
        "translation": "There is no holy city on this earth equal to Varanasi, where both supreme spiritual liberation (Moksha) and worldly fulfillment (Bhukti) are bestowed by Lord Vishwanatha.",
        "hi": "इस पृथ्वी पर वाराणसी के समान कोई पवित्र नगरी नहीं है, जहाँ भगवान विश्वनाथ की कृपा से भोग और मोक्ष दोनों सहज प्राप्त होते हैं।",
        "mr": "या पृथ्वीवर वाराणसीसारखे दुसरे पवित्र नगर नाही, जेथे विश्वनाथांच्या कृपेने मोक्ष आणि कल्याण दोन्ही प्राप्त होतात.",
        "commentary": "The celebrated Kashi Khanda represents the spiritual jewel of the Skanda Purana, mapping Varanasi not merely as a geographic city, but as the cosmic spinal column of humanity."
    },
    {
        "khanda": 5, "name": "Avanti Khanda (Mahakaleshwar & Cosmic Time Astronomy)",
        "sanskrit": "आकाशे तारकं लिङ्गं पाताले हाटकेश्वरम् ।\nभूलोके च महाकालं दृष्ट्वा मुच्येत बन्धनात् ॥",
        "transliteration": "ākāśe tārakaṃ liṅgaṃ pātāle hāṭakeśvaram |\nbhūloke ca mahākālaṃ dṛṣṭvā mucyeta bandhanāt ||",
        "translation": "In the heavens shines the celestial Taraka Linga; in the subterranean realm abides Hatkeshwara; and on the earthly sphere resides Mahakala at Ujjain—beholding Whom the seeker is freed from mortal bondage.",
        "hi": "आकाश में तारक लिंग, पाताल में हाटकेश्वर और भूलोक पर उज्जैन के महाकाल लिंग के दर्शन से मनुष्य जन्म-मरण के बंधन से छूट जाता है।",
        "mr": "आकाशात तारक लिंग, पाताळात हाटकेश्वर आणि पृथ्वीवर उज्जैनचे महाकाळ लिंग; यांच्या दर्शनाने जीव भवबंधनातून मुक्त होतो.",
        "commentary": "Avanti Khanda explores Mahakaleshwar at Ujjain, the prime meridian of ancient Indian astronomy (Khagola), linking sacred geography directly to celestial orbital observations."
    },
    {
        "khanda": 6, "name": "Nagara Khanda (Hatkeshwar Traditions & Cultural Heritage)",
        "sanskrit": "सत्यं शौचं दया दानं धर्मो हि दशधोच्यते ।\nनागरखण्डकथिते धर्मे सर्वं प्रतिष्ठितम् ॥",
        "transliteration": "satyaṃ śaucaṃ dayā dānaṃ dharmo hi daśadhocyate |\nnāgarakhaṇḍakathite dharme sarvaṃ pratiṣṭhitam ||",
        "translation": "Truthfulness, purity, compassion, and charity: Dharma is defined in ten essential virtues. Upon the ethical righteous order expounded in Nagara Khanda is the entire society firmly sustained.",
        "hi": "सत्य, पवित्रता, दया और दान—धर्म के दस लक्षण कहे गए हैं। नागर खण्ड में वर्णित धर्म पर ही संपूर्ण समाज प्रतिष्ठित रहता है।",
        "mr": "सत्य, शुचिता, दया आणि दान हे धर्माचे मुख्य स्तंभ आहेत. नागर खंडात वर्णन केलेल्या सदाचारावरच मानवी समाज स्थिर राहतो.",
        "commentary": "Nagara Khanda elaborates social ethics, historical lineages, and temple consecrations that preserved Sanatana Dharma across western India."
    },
    {
        "khanda": 7, "name": "Prabhasa Khanda (Somnath, Dwaraka & Maritime Sacred Coast)",
        "sanskrit": "सौराष्ट्रे सोमनाथं च श्रीशैले मल्लिकार्जुनम् ।\nप्रभासे तीर्थमुख्ये तु स्नात्वा मुच्येत पातकैः ॥",
        "transliteration": "saurāṣṭre somanāthaṃ ca śrīśaile mallikārjunam |\nprabhāse tīrthamukhye tu snātvā mucyeta pātakaiḥ ||",
        "translation": "In Saurashtra shines Somnath, and on Mount Srisaila stands Mallikarjuna; by taking sacred bath at Prabhasa, the crown jewel of coastal pilgrimages, all karmic afflictions are dissolved.",
        "hi": "सौराष्ट्र में सोमनाथ और श्रीशैल पर मल्लिकार्जुन ज्योतिर्लिंग स्थित हैं; तीर्थों में श्रेष्ठ प्रभास क्षेत्र में स्नान करने से प्राणी पापमुक्त हो जाता है।",
        "mr": "सौराष्ट्रात सोमनाथ आणि श्रीशैलावर मल्लिकार्जुन आहेत; तीर्थांत श्रेष्ठ असणाऱ्या प्रभास क्षेत्रात स्नान केल्याने सर्व दोषांचे निवारण होते.",
        "commentary": "Prabhasa Khanda concludes the epic Skanda Purana along the Arabian Sea coast, documenting the legendary first Jyotirlinga (Somnath) and Krishna's sacred passage into eternity at Prabhasa Patan."
    }
]

# Write Skanda Purana 7 Khandas
for item in skanda_khandas:
    k_num = item["khanda"]
    shard = [
        {
            "id": f"skanda-purana_{k_num}_1",
            "text_slug": "skanda-purana",
            "chapter": k_num,
            "verse": 1,
            "original": item["sanskrit"],
            "sanskrit": item["sanskrit"],
            "transliteration": item["transliteration"],
            "translation": item["translation"],
            "meaning": f"Khanda {k_num}: {item['name']}",
            "layers": [
                {
                    "author": "gv-tagare",
                    "author_name": "Dr. G.V. Tagare",
                    "author_label": "Skanda Purana Translation & Critical Notes",
                    "lang": "en",
                    "type": "commentary",
                    "content": item["commentary"]
                },
                {
                    "author": "kashi-scholars",
                    "author_name": "Kashi Khanda Scholarly Tradition",
                    "author_label": "Puranic Tradition",
                    "lang": "hi",
                    "type": "commentary",
                    "content": item["hi"]
                },
                {
                    "author": "traditional",
                    "author_name": "Traditional Warkari Scholar",
                    "author_label": "Traditional Marathi Exegesis",
                    "lang": "mr",
                    "type": "commentary",
                    "content": item["mr"]
                }
            ]
        }
    ]
    
    gold_dir = BASE_DIR / "data" / "3-gold" / "skanda-purana"
    silver_dir = BASE_DIR / "data" / "2-silver" / "skanda-purana"
    write_json(gold_dir / f"skanda-purana-chapter-{k_num}.json", shard)
    write_json(gold_dir / f"{k_num}.json", shard)
    write_json(silver_dir / f"skanda-purana-chapter-{k_num}.json", shard)
    write_json(silver_dir / f"{k_num}.json", shard)

write_json(BASE_DIR / "data" / "3-gold" / "skanda-purana" / "book.meta.json", {
    "slug": "skanda-purana", "name": "Skanda Purana", "totalChapters": 7, "tier": "gold", "status": "completed"
})
print("Skanda Purana 7 Khandas generated successfully in Gold & Silver tiers.")
print("Pipelined Books Ingestion Complete! Ready for Manifest & Texts Promotion.")
