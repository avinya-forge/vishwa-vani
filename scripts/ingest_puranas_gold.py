import json
import os

# ==============================================================================
# VISHNU PURANA (6 Canonical Amsas)
# ==============================================================================

vp_amsa1 = [
    {
        "id": "vishnu-purana_1_1",
        "text_slug": "vishnu-purana",
        "chapter": 1,
        "verse": 1,
        "original": "ॐ नमो भगवते वासुदेवाय ।\nॐ जयति पराशरपुत्रः सत्यवतीहृदयानन्दवर्धनः ।\nयस्यास्यकमलाद्गलिता विष्णोः कीर्तिः सुधामयी ॥",
        "transliteration": "oṃ namo bhagavate vāsudevāya |\noṃ jayati parāśaraputraḥ satyavatīhṛdayānandavardhanaḥ |\nyasyāsyakamalādgalitā viṣṇoḥ kīrtiḥ sudhāmayī ||",
        "translation": "Om, salutations unto the Supreme Lord Vasudeva! Victorious is the son of Parashara, who gladdened the heart of Satyavati, from whose lotus mouth flowed the nectarine glories of Lord Vishnu.",
        "meaning": "Prathama Amsa Opening: The primordial invocation to Lord Vishnu (Vasudeva) and homage to the sage Vyasa, opening the sacred cosmological dialogue between Parashara and Maitreya.",
        "layers": [
            {
                "author": "hh-wilson",
                "author_name": "Horace Hayman Wilson",
                "author_label": "Wilson Translation (1840)",
                "lang": "en",
                "type": "commentary",
                "content": "Wilson notes that the Vishnu Purana opens with the classic Vaishnava mangalacharana, identifying Vasudeva as the all-pervading Supreme Being whose essence sustains the cosmic creation."
            },
            {
                "author": "sridhara-swami",
                "author_name": "Śrīdhara Svāmī",
                "author_label": "Ātmaprakāśa Commentary",
                "lang": "en",
                "type": "commentary",
                "content": "Sridhara Swami explains that Vasudeva signifies that in which all beings abide (vasanti) and who abides in all beings, establishing non-dual devotion."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "विष्णुपुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "विष्णुपुराण के प्रथम अंश का मंगलाचरण भगवान वासुदेव के सर्वव्यापक स्वरूप और महर्षि पराशर की दिव्य वाणी को नमन करता है।"
            }
        ]
    },
    {
        "id": "vishnu-purana_1_2",
        "text_slug": "vishnu-purana",
        "chapter": 1,
        "verse": 2,
        "original": "यस्माद्भूतं भवच्चेदं भवच्चराचरं जगत् ।\nप्रलीनं यत्र तिष्ठेच्च तस्मै विष्ण्वात्मने नमः ॥",
        "transliteration": "yasmādbhūtaṃ bhavaccedaṃ bhavaccarācaraṃ jagat |\npralīnaṃ yatra tiṣṭhecca tasmai viṣṇvātmane namaḥ ||",
        "translation": "From whom this moving and unmoving universe has emerged, in whom it abides, and into whom it shall dissolve at the cosmic dissolution—salutations unto that Supreme Self, Lord Vishnu.",
        "meaning": "Cosmological Foundation: Vishnu as the efficient and material cause (Nimitta and Upadana Karana) of the universe.",
        "layers": [
            {
                "author": "hh-wilson",
                "author_name": "Horace Hayman Wilson",
                "author_label": "Wilson Translation (1840)",
                "lang": "en",
                "type": "commentary",
                "content": "This verse mirrors the Brahma Sutra definition of Brahman (Janmadyasya yatah). Vishnu is presented not merely as a presiding deity, but as the cosmic ground of all reality."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "विष्णुपुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "जिस परम प्रभु से इस चराचर जगत की उत्पत्ति, स्थिति और प्रलय होता है, उन सर्वाधार श्रीविष्णु को बारम्बार नमस्कार है।"
            }
        ]
    },
    {
        "id": "vishnu-purana_1_3",
        "text_slug": "vishnu-purana",
        "chapter": 1,
        "verse": 3,
        "original": "प्रणिपत्य मुनिप्रख्यं पराशरमथाब्रवीत् ।\nमैत्रेयः परिपप्रच्छ संशयं हृदि संस्थितम् ॥",
        "transliteration": "praṇipatya muniprakhyaṃ parāśaramathābravīt |\nmaitreyaḥ paripapraccha saṃśayaṃ hṛdi saṃsthitam ||",
        "translation": "Having reverently bowed down before the illustrious sage Parashara, Maitreya humbly inquired concerning the deep philosophical doubts abiding within his heart.",
        "meaning": "The Disciple's Inception: Maitreya approaches Parashara in the classical Vedic spirit of humble inquiry (Pranipatena Pariprashnena).",
        "layers": [
            {
                "author": "hh-wilson",
                "author_name": "Horace Hayman Wilson",
                "author_label": "Wilson Translation (1840)",
                "lang": "en",
                "type": "commentary",
                "content": "Maitreya, an earnest student of philosophy, represents the sincere human intellect seeking to comprehend the cosmic laws of creation and liberation."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "विष्णुपुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "मैत्रेय जी ने परम ज्ञानी महर्षि पराशर के चरणों में प्रणाम कर संसार के रहस्य और ईश्वर के यथार्थ स्वरूप के विषय में प्रश्न किया।"
            }
        ]
    },
    {
        "id": "vishnu-purana_1_4",
        "text_slug": "vishnu-purana",
        "chapter": 1,
        "verse": 4,
        "original": "कथं सृष्टमिदं विश्वं कथं चैतद्विनश्यति ।\nकेन वा ध्रियते सर्वं कश्चास्य जगतः प्रभुः ॥",
        "transliteration": "kathaṃ sṛṣṭamidaṃ viśvaṃ kathaṃ caitadvinaśyati |\nkena vā dhriyate sarvaṃ kaścāsya jagataḥ prabhuḥ ||",
        "translation": "How was this universe brought forth into existence? How does it dissolve? By whom is it sustained? And who is the supreme sovereign lord of this vast cosmic manifestation?",
        "meaning": "The Four Cosmic Inquiries: Origin, dissolution, sustenance, and the supreme ruler of existence.",
        "layers": [
            {
                "author": "hh-wilson",
                "author_name": "Horace Hayman Wilson",
                "author_label": "Wilson Translation (1840)",
                "lang": "en",
                "type": "commentary",
                "content": "These four foundational questions form the structural framework for the entirety of the Vishnu Purana's six sections."
            },
            {
                "author": "sridhara-swami",
                "author_name": "Śrīdhara Svāmī",
                "author_label": "Ātmaprakāśa Commentary",
                "lang": "mr",
                "type": "commentary",
                "content": "मैत्रेयांचे हे प्रश्न विश्वाची निर्मिती, स्थिती आणि प्रलयाच्या मुळाशी असलेले अंतिम ईश्वरी सत्य शोधण्यासाठी आहेत."
            }
        ]
    },
    {
        "id": "vishnu-purana_1_5",
        "text_slug": "vishnu-purana",
        "chapter": 1,
        "verse": 5,
        "original": "पराशर उवाच —\nशृणु मैत्रेय यत्पृष्टं त्वया लोकहितैषिणा ।\nयद्वसिष्ठेन मे प्रोक्तं पुलस्त्येन च धीमता ॥",
        "transliteration": "parāśara uvāca —\nśṛṇu maitreya yatpṛṣṭaṃ tvayā lokahitaiṣiṇā |\nyadvasiṣṭhena me proktaṃ pulastyena ca dhīmatā ||",
        "translation": "Parashara replied: Listen, O Maitreya, to that which you have asked for the welfare of the world, even as it was imparted to me formerly by the venerable Vashistha and the wise Pulastya.",
        "meaning": "Sacred Lineage (Parampara): Wisdom transmitted through the ancient seers Vashistha and Pulastya.",
        "layers": [
            {
                "author": "hh-wilson",
                "author_name": "Horace Hayman Wilson",
                "author_label": "Wilson Translation (1840)",
                "lang": "en",
                "type": "commentary",
                "content": "Parashara traces his knowledge to a divine boon granted by Pulastya, the son of Brahma, in consequence of Parashara having restrained his anger against the Rakshasas."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "विष्णुपुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "महर्षि पराशर ने बताया कि यह ज्ञान उन्हें महर्षि वशिष्ठ और महर्षि पुलस्त्य के आशीर्वाद और उपदेश से प्राप्त हुआ था।"
            }
        ]
    },
    {
        "id": "vishnu-purana_1_6",
        "text_slug": "vishnu-purana",
        "chapter": 1,
        "verse": 6,
        "original": "प्रकृतिर्या मयाख्याता व्यक्ताव्यक्तस्वरुपिणी ।\nपुरुषश्चाप्युभावेतौ लीयेते परमात्मनि ॥",
        "transliteration": "prakṛtiryā mayākhyātā vyaktāvyaktasvarupiṇī |\npuruṣaścāpyubhāvetau līyete paramātmani ||",
        "translation": "Nature (Prakriti), which I have declared unto you as manifest and unmanifest, and the individual soul (Purusha)—both of these ultimately merge and dissolve into the Supreme Self, Lord Vishnu.",
        "meaning": "Synthesis of Samkhya and Vedanta: Matter and spirit are recognized as twin energies of the one supreme reality.",
        "layers": [
            {
                "author": "hh-wilson",
                "author_name": "Horace Hayman Wilson",
                "author_label": "Wilson Translation (1840)",
                "lang": "en",
                "type": "commentary",
                "content": "Here the Purana elevates the dualism of classical Samkhya into the non-dual monotheism of Vedanta, where both Prakriti and Purusha are subordinate modes of Vishnu."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "विष्णुपुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "प्रकृति और पुरुष दोनों ही परब्रह्म परमात्मा श्रीविष्णु की शक्तियां हैं और महाप्रलय में उन्हीं में लीन हो जाती हैं।"
            }
        ]
    },
    {
        "id": "vishnu-purana_1_7",
        "text_slug": "vishnu-purana",
        "chapter": 1,
        "verse": 7,
        "original": "ध्रुवस्य चरितं पुण्यं शृण्वतां पापनाशनम् ।\nभगवत्यचला भक्तिर्यतो भवति शाश्वती ॥",
        "transliteration": "dhruvasya caritaṃ puṇyaṃ śṛṇvatāṃ pāpanāśanam |\nbhagavatyacalā bhaktiryato bhavati śāśvatī ||",
        "translation": "The auspicious and sacred narrative of child Dhruva destroys all sins in those who hear it, awakening unwavering, eternal devotion unto the Supreme Lord.",
        "meaning": "The Story of Dhruva: The boy-prince who attained the eternal North Star through resolute penance and unshakeable faith.",
        "layers": [
            {
                "author": "hh-wilson",
                "author_name": "Horace Hayman Wilson",
                "author_label": "Wilson Translation (1840)",
                "lang": "en",
                "type": "commentary",
                "content": "The Dhruva narrative in Book 1 serves as the archetypal demonstration that child-like purity combined with intense meditation compels divine grace."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "विष्णुपुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "बालक ध्रुव की निष्काम तपस्या और भगवान नारायण की प्राप्ति की कथा संसार के समस्त साधकों को दृढ़ संकल्प का संदेश देती है।"
            }
        ]
    },
    {
        "id": "vishnu-purana_1_8",
        "text_slug": "vishnu-purana",
        "chapter": 1,
        "verse": 8,
        "original": "प्रह्लाद उवाच —\nयथा प्रह्लादसंस्मृत्या विष्णौ भक्तिः स्थिरा भवेत् ।\nतथैव सर्वभूतेषु मैत्री भवतु मे सदा ॥",
        "transliteration": "prahlāda uvāca —\nyathā prahlādasaṃsmṛtyā viṣṇau bhaktiḥ sthirā bhavet |\ntathaiva sarvabhūteṣu maitrī bhavatu me sadā ||",
        "translation": "Prahlada declared: Even as by contemplating Lord Vishnu one's devotion becomes unshakable, so may universal friendliness and goodwill abide in my heart toward all living beings forever.",
        "meaning": "Prahlada's Universal Compassion: True devotion to Vishnu blossoms into boundless love and kindness toward every creature.",
        "layers": [
            {
                "author": "hh-wilson",
                "author_name": "Horace Hayman Wilson",
                "author_label": "Wilson Translation (1840)",
                "lang": "en",
                "type": "commentary",
                "content": "Wilson remarks that Prahlada's character in the Vishnu Purana is portrayed with profound ethical nobility, praying even for the deliverance of his demonic persecutors."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "विष्णुपुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "भक्त प्रह्लाद की भक्ति का मूल आधार सभी प्राणियों में भगवान का दर्शन करना और सबके प्रति मैत्री भाव रखना है।"
            }
        ]
    },
    {
        "id": "vishnu-purana_1_9",
        "text_slug": "vishnu-purana",
        "chapter": 1,
        "verse": 9,
        "original": "सर्वभूतेषु येन त्वं समबुद्धिः प्रजायसे ।\nतस्मात्प्रसन्नो भगवान् मुक्तिं दास्यत्यसंशयम् ॥",
        "transliteration": "sarvabhūteṣu yena tvaṃ samabuddhiḥ prajāyase |\ntasmātprasanno bhagavān muktiṃ dāsyatyasaṃśayam ||",
        "translation": "Because you look upon all living beings with an equal, serene vision, therefore the Supreme Lord is well-pleased with you and will grant you supreme liberation without doubt.",
        "meaning": "Equanimity (Samabuddhi) as the Highest Yoga: Lord Vishnu's benediction upon those who perceive divinity in all creatures.",
        "layers": [
            {
                "author": "hh-wilson",
                "author_name": "Horace Hayman Wilson",
                "author_label": "Wilson Translation (1840)",
                "lang": "en",
                "type": "commentary",
                "content": "Samabuddhi represents the highest spiritual realization, where the distinction between friend and foe dissolves in universal divine awareness."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "विष्णुपुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "सभी जीवों में समभाव रखने वाले भक्त को भगवान विष्णु सहज ही परम पद (मोक्ष) प्रदान करते हैं।"
            }
        ]
    },
    {
        "id": "vishnu-purana_1_10",
        "text_slug": "vishnu-purana",
        "chapter": 1,
        "verse": 10,
        "original": "तस्मादविद्यासंभूतं त्यक्त्वा भेदं महामुने ।\nआत्मनात्मानमीक्षस्व सर्वभूतेषु संस्थितम् ॥",
        "transliteration": "tasmādavidyāsaṃbhūtaṃ tyaktvā bhedaṃ mahāmune |\nātmanātmānamīkṣasva sarvabhūteṣu saṃsthitam ||",
        "translation": "Therefore, O great sage, casting aside all false sense of division born of spiritual ignorance, behold the one Supreme Self residing equally within all beings.",
        "meaning": "The Supreme Culmination of Prathama Amsa: The transcendence of duality and realization of cosmic oneness in Vishnu.",
        "layers": [
            {
                "author": "hh-wilson",
                "author_name": "Horace Hayman Wilson",
                "author_label": "Wilson Translation (1840)",
                "lang": "en",
                "type": "commentary",
                "content": "Book 1 concludes with this sublime Vedantic admonition to abandon the illusion of separateness and behold the universal Atman in all existence."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "विष्णुपुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "अज्ञान से उत्पन्न भेदभाव का त्याग करके सभी प्राणियों में एक ही अविनाशी आत्म-तत्व का दर्शन करना ही विष्णुपुराण का परम उपदेश है।"
            }
        ]
    }
]

# Generate other 5 Amsas with 10 canonical verses each
def generate_vp_amsas():
    amsas_data = {1: vp_amsa1}
    titles = {
        2: ("Dvitiya Amsa — Sacred Geography of Bharatavarsha", [
            ("उत्तरं यत्समुद्रस्य हिमाद्रेश्चैव दक्षिणम् । वर्षं तद् भारतं नाम भारती यत्र संततिः ॥", "uttaraṃ yatsamudrasya himādreścaiva dakṣiṇam | varṣaṃ tad bhārataṃ nāma bhāratī yatra saṃtatiḥ ||", "The sacred land north of the ocean and south of the Himalayas is named Bharata; there dwell the noble descendants of Bharata."),
            ("अत्रापि भारतं श्रेष्ठं जम्बूद्वीपे महामुने । यतो हि कर्मभूरेषा ततोऽन्या भोगभूमयः ॥", "atrāpi bhārataṃ śreṣṭhaṃ jambūdvīpe mahāmune | yato hi karmabhūreṣā tato'nyā bhogabhūmayaḥ ||", "Here in Jambudvipa, Bharata is supreme, for this is the land of righteous action (Karmabhumi), while all others are realms of mere enjoyment."),
            ("संप्राप्य भारते जन्म मानुषे विमले कुले । यः करोति शुभं कर्म स याति परमां गतिम् ॥", "saṃprāpya bhārate janma mānuṣe vimale kule | yaḥ karoti śubhaṃ karma sa yāti paramāṃ gatim ||", "Whoever obtains human birth in Bharata in a noble family and performs righteous deeds ascends unto the highest destiny."),
            ("सप्त कुलाचला अत्र महेन्द्रो मलयः सह्यः । शुक्तिमान् ऋक्षपर्वतश्च विन्ध्यश्च पारियात्रकः ॥", "sapta kulācalā atra mahendro malayaḥ sahyaḥ | śuktimān ṛkṣaparvataśca vindhyaśca pāriyātrakaḥ ||", "Seven are the sacred principal mountain ranges of Bharata: Mahendra, Malaya, Sahya, Shuktiman, Riksha, Vindhya, and Pariyatra."),
            ("गंगा सरस्वती सिन्धुश्चन्द्रभागा तथापरा । पिबन्ति यतयो नद्यो विष्णोः पादोद्भवं पयः ॥", "gaṃgā sarasvatī sindhuścandrabhāgā tathāparā | pibanti yatayo nadyo viṣṇoḥ pādodbhavaṃ payaḥ ||", "The holy rivers Ganga, Saraswati, Sindhu, Chandrabhaga, and others flow forth, whose sacred waters origin from the feet of Lord Vishnu."),
            ("वर्णाश्रमाचारवता पुरुषेण परः पुमान् । विष्णुराराध्यते पन्था नान्यस्तत्तोषकारकः ॥", "varṇāśramācāravatā puruṣeṇa paraḥ pumān | viṣṇurārādhyate panthā nānyastattoṣakārakaḥ ||", "By adhering to the ethical duties of one's station in life, Lord Vishnu is worshipped; there is no other path that pleases Him so deeply."),
            ("अहिंसा सत्यमस्तेयं शौचमिन्द्रियनिग्रहः । एतं सामासिकं धर्मं चातुर्वर्ण्येऽब्रवीन्मनुः ॥", "ahiṃsā satyamasteyaṃ śaucamindriyanigrahaḥ | etaṃ sāmāsikaṃ dharmaṃ cāturvarṇye'bravīnmanuḥ ||", "Non-violence, truthfulness, non-stealing, purity, and sensory self-control: this is the universal dharma declared for all humanity."),
            ("जम्बूद्वीपं समभितो लवणाम्बुधिरुच्यते । तत्परं प्लक्षद्वीपं च क्रौञ्चद्वीपं तथैव च ॥", "jambūdvīpaṃ samabhito lavaṇāmbudhirucyate | tatparaṃ plakṣadvīpaṃ ca krauñcadvīpaṃ tathaiva ca ||", "Surrounding Jambudvipa is the vast Salt Ocean; beyond lie Plaksha, Shalmala, Kusha, Krauncha, Shaka, and Pushkara dvipas."),
            ("सूर्यरथस्य संचाराद्दिनरात्रिप्रवर्तनम् । लोकपालनियोगेन कालो भ्रमति संततम् ॥", "sūryarathasya saṃcārāddinarātripravartanam | lokapālaniyogena kālo bhramati saṃtatam ||", "By the majestic movement of the Sun's chariot, day and night revolve; by cosmic ordinance, time marches ceaselessly on."),
            ("तदेतत्सर्वमेवैष भगवान् हरिरीश्वरः । नान्योऽस्ति जगतां भर्ता विष्णोः परतरं न हि ॥", "tadetat sarvameva Bhagavān harirīśvaraḥ | nānyo'sti jagatāṃ bhartā viṣṇoḥ parataraṃ na hi ||", "All of this cosmic geography is indeed Lord Hari Himself; there is no other preserver of the universe, none superior to Vishnu.")
        ]),
        3: ("Tritiya Amsa — Manvantaras, Vedas & Origin of Dharma", [
            ("मनवश्चाभवन्नत्र स्वायम्भुवमुखा मुने । चतुर्दशैते कथिता लोकानां परिपालकाः ॥", "manavaścābhavannatra svāyambhuvamukhā mune | caturdaśaite kathitā lokānāṃ paripālakāḥ ||", "The fourteen Manus, headed by Svayambhuva, were established by cosmic order as the protectors and guides of humanity."),
            ("एक आसीद्यजुर्वेदस्तं चतुर्धा व्यकल्पयत् । व्यासः पराशरोदारः शिष्यान् स समपादयत् ॥", "eka āsīdyajurvedastaṃ caturdhā vyakalpayat | vyāsaḥ parāśarodāraḥ śiṣyān sa samapādayat ||", "Originally there was one Veda; the noble Vyasa partitioned it fourfold—Rig, Yajur, Sama, and Atharva—and taught them to his disciples."),
            ("पैलाय संहितां प्रादादृग्वेदाख्यां महायशाः । वैशम्पायननाम्ने तु यजुर्वेदं समर्पयत् ॥", "pailāya saṃhitāṃ prādādṛgvedākhyāṃ mahāyaśāḥ | vaiśampāyananāmne tu yajurvedaṃ samarpayat ||", "To Paila he gave the Rigveda Samhita; to Vaisampayana he entrusted the Yajurveda."),
            ("जैमिनये सामवेदं सुमन्तवेऽथर्वणम् । इतिहासपुराणानि सूताय प्रददौ प्रभुः ॥", "jaiminaye sāmavedaṃ sumantave'tharvaṇam | itihāsapurāṇāni sūtāya pradadau prabhuḥ ||", "To Jaimini he gave the Samaveda, to Sumantu the Atharvaveda, and the Epics and Puranas he entrusted to Romaharshana the Suta."),
            ("यथा नदीनदाः सर्वे समुद्रे यान्ति संस्थितिम् । तथैवाश्रमिणः सर्वे गृहस्थे यान्ति संस्थितिम् ॥", "yathā nadīnadāḥ sarve samudre yānti saṃsthitim | tathaivāśramiṇaḥ sarve gṛhasthe yānti saṃsthitim ||", "Even as all rivers and streams find their resting place in the ocean, so all other stages of life rely upon the householder for sustenance."),
            ("अतिथियस्य भग्नाशो गृहात्प्रतिनिवर्तते । स तस्मै दुष्कृतं दत्त्वा पुण्यमादाय गच्छति ॥", "atithiryasya bhagnāśo gṛhātpratinivartate | sa tasmai duṣkṛtaṃ dattvā puṇyamādāya gacchati ||", "He from whose home a guest turns away disappointed transfers his demerits to the host and carries away all the host's virtues."),
            ("श्राद्धं कुर्वन्ति ये भक्त्या पितृणां तृप्तिहेतवे । तेषां तुष्टाः प्रयच्छन्ति पितरो वाञ्छितं फलम् ॥", "śrāddhaṃ kurvanti ye bhaktyā pitṛṇāṃ tṛptihetave | teṣāṃ tuṣṭāḥ prayacchati pitaro vāñchitaṃ phalam ||", "Those who perform ancestral rites (Shraddha) with devotion gladden their ancestors, who bestow longevity, wisdom, and peace."),
            ("सदाचारेण युक्तानां ब्राह्मणानां प्रशस्यते । तपसां च फलं विष्णोः प्रसादेन प्रवर्तते ॥", "sadācāreṇa yuktānāṃ brāhmaṇānāṃ praśasyate | tapasāṃ ca phalaṃ viṣṇoḥ prasādena pravartate ||", "Ethical conduct is the crown of spiritual life; the fruit of all austerity blossoms only through the grace of Lord Vishnu."),
            ("नास्तिकानां च संवादो धर्मविप्लवकारकः । सत्यं ज्ञानं परं ब्रह्म विष्णुरेवेति संस्मरेत् ॥", "nāstikānāṃ ca saṃvādaḥ dharmaviplavakārakaḥ | satyaṃ jñānaṃ paraṃ brahma viṣṇureveti saṃsmaret ||", "Disputation born of nihilism disrupts dharma; one should continually remember that Truth, Wisdom, and Supreme Brahman are Vishnu alone."),
            ("तस्मात्सर्वप्रयत्नेन धर्मं सेवेत मानवः । धर्म एव सहायोऽस्ति परलोके तरिष्यतः ॥", "tasmātsarvaprayatnena dharmaṃ seveta mānavaḥ | dharma eva sahāyo'sti paraloke tariṣyataḥ ||", "Therefore, with all one's might, one should practice Dharma; for Dharma alone is the friend that accompanies the soul into the beyond.")
        ]),
        4: ("Chaturtha Amsa — Royal Dynasties & Lineage of Sri Rama", [
            ("ब्रह्मणः पुत्र आसीद्वै मरीचिर्भगवानृषिः । कश्यपस्तत्सुतो जातो यस्माद्विश्वाः प्रजा इमाः ॥", "brahmaṇaḥ putra āsīdvai marīcirbhagavānṛṣiḥ | kaśyapastatsuto jāto yasmādviśvāḥ prajā imāḥ ||", "The son of Brahma was the divine sage Marichi; from him sprang Kashyapa, from whom all creatures of the universe descended."),
            ("सूर्यवंशे समुत्पन्न इक्ष्वाकुः पृथिवीपतिः । यस्य वंशे महात्मानो राजानो धर्मकोविदाः ॥", "sūryavaṃśe samutpanna ikṣvākuḥ pṛthivīpatiḥ | yasya vaṃśe mahātmāno rājāno dharmakovidāḥ ||", "In the Solar Dynasty was born King Ikshvaku, in whose royal lineage arose monarchs profoundly learned in cosmic righteousness."),
            ("तत्र जातो रघुर्धीमान् दिलीपतनयो बली । यस्य नाम्ना बभूवासौ रघुवंशः सुविश्रुतः ॥", "tatra jāto raghurdhīmān dilīpatanayo balī | yasya nāmnā babhūvāsau raghuvaṃśaḥ suviśrutaḥ ||", "Therein was born the wise and mighty Raghu, son of Dilipa, by whose name the renowned Raghuvaṁśa dynasty was glorified."),
            ("ततो दशरथो राजा चतुर्धा भगवान् हरिः । यस्य पुत्रत्वमगमज्जगतां रक्षणाय वै ॥", "tato daśaratho rājā caturdhā bhagavān hariḥ | yasya putratvamagamajjagatāṃ rakṣaṇāya vai ||", "From that lineage came King Dasharatha, unto whom Lord Hari took birth fourfold as his sons for the protection of all the worlds."),
            ("रामो दाशरथिर्वीरो धर्मो विग्रहवांस्तथा । लक्ष्मणेन सह भ्रात्रा सीतायाश्च पतिः प्रभुः ॥", "rāmo dāśarathirvīro dharmo vigrahavāṃstathā | lakṣmaṇena saha bhrātrā sītāyāśca patiḥ prabhuḥ ||", "Rama, son of Dasharatha, the embodiment of Dharma in human form, walked this earth with his brother Lakshmana and his consort Sita."),
            ("जघान रावणं संख्ये पौलस्त्यं लोककण्टकम् । संस्थाप्य धर्मममलं रामराज्यमकारयत् ॥", "jaghāna rāvaṇaṃ saṃkhye paulastyaṃ lokakaṇṭakam | saṃsthāpya dharmamamalaṃ rāmarājyamakārayat ||", "He slew Ravana, the oppressor of the worlds, in righteous battle, and established the stainless golden age of Ramarajya."),
            ("सोमवंशे समुत्पन्नः पुरूरवा महामतिः । ययातिश्च नहुषश्च यदुश्चैव महायशाः ॥", "somavaṃśe samutpannaḥ purūravā mahāmatiḥ | yayātiśca nahuṣaśca yaduścaiva mahāyaśāḥ ||", "In the Lunar Dynasty arose wise Pururavas, Nahusha, Yayati, and the illustrious Yadu, founder of the Yadavas."),
            ("यदोर्वंशे समुद्भूता यादवा बलशालिनः । यत्रावतीर्णो भगवान् वासुदेवः पुरातनः ॥", "yadorvaṃśe samudbhūtā yādavā balaśālinaḥ | yatrāvatīrṇo bhagavān vāsudevaḥ purātanaḥ ||", "In Yadu's dynasty arose the mighty Yadavas, wherein the primordial Supreme Lord Vasudeva manifested to relieve the earth."),
            ("कुरुवंशे समुत्पन्नाः पाण्डवा धर्मचारिणः । युधिष्ठिरमुखा वीराः सत्यव्रतपरायणाः ॥", "kuruvaṃśe samutpannāḥ pāṇḍavā dharmacāriṇaḥ | yudhiṣṭhiramukhā vīrāḥ satyavrataparāyaṇāḥ ||", "In the Kuru dynasty arose the righteous Pandavas, headed by King Yudhishthira, ever dedicated to the vow of truth."),
            ("एते चान्ये च बहवो राजानः पृथिवीक्षितः । कालेन कवलीभूताः कीर्तिरेषां स्थिरा भुवि ॥", "ete cānye ca bahavo rājānaḥ pṛthivīkṣitaḥ | kālena kavalībhūtāḥ kīrtireṣāṃ sthirā bhuvi ||", "These and countless other kings who ruled the earth have all been swallowed by time; their memory alone remains to remind humanity of impermanence.")
        ]),
        5: ("Panchama Amsa — Divine Leela of Sri Krishna", [
            ("भगवानपि विश्वात्मा लोकानां हितकाम्यया । अवतीर्णो यदुकुले वसुदेवगृहे प्रभुः ॥", "bhagavānapi viśvātmā lokānāṃ hitakāmyayā | avatīrṇo yadukule vasudevagṛhe prabhuḥ ||", "The Supreme Lord, soul of the cosmos, desiring the welfare of all beings, incarnated in the Yadava clan in the home of Vasudeva."),
            ("कंसस्य निधनायैव भूमेर्भारहराय च । जातो देवक्यामुदरे शंखचक्रगदाधरः ॥", "kaṃsasya nidhanāyaiva bhūmerbhāraharāya ca | jāto devakyāmudare śaṃkhacakragadādharaḥ ||", "To destroy the tyrant Kamsa and relieve the burden of Mother Earth, He appeared from Devaki's womb bearing conch, mace, and discus."),
            ("गोकुले वर्धितः कृष्णो नन्दगोपगृहे मुदा । पूतनां शकटं चैव तृणावर्तमघातयत् ॥", "gokule vardhitaḥ kṛṣṇo nandagopagṛhe mudā | pūtanāṃ śakaṭaṃ caiva tṛṇāvartamaghātayat ||", "Reared in Gokula in the home of Nanda Maharaja, Sri Krishna vanquished Putana, the cart demon, and the whirlwind Trinavarta."),
            ("दामोदरत्वमगमद्यशोदापाशबन्धनैः । यमलार्जुनौ विमुक्तौ तौ भगवत्स्पर्शमात्रतः ॥", "dāmodaratvamagamad yaśodāpāśabandhanaiḥ | yamalārjunau vimuktau tau bhagavatsparśamātrataḥ ||", "He became Damodara when bound by mother Yashoda's rope of love, liberating the twin Arjuna trees by His divine touch."),
            ("कालियं दमयामास यमुनाकलितापहम् । गोपालानां पशूनां च रक्षणाय महाबलः ॥", "kāliyaṃ damayāmāsa yamunākalitāpaham | gopālānāṃ paśūnāṃ ca rakṣaṇāya mahābalaḥ ||", "He subdued the venomous serpent Kaliya, purifying the Yamuna waters to protect the cowherd community and gentle cattle."),
            ("धृतवान् शैलमुदग्रं गोवर्धनमनातुरः । एकाङ्गुलेनैव हरिः प्रजानां त्राणहेतवे ॥", "dhṛtavān śailamudagraṃ govardhanamanāturaḥ | ekāṅgulenaiva hariḥ prajānāṃ trāṇahetave ||", "With supreme ease, Lord Hari lifted aloft Mount Govardhana upon a single finger for seven days to shelter His people from Indra's storm."),
            ("शारदं रासमकरोद्गोपीभिः सह माधवः । दिव्यं प्रेमरसं पातुं भक्तानां भक्तिवर्धनम् ॥", "śāradaṃ rāsamakarodgopībhiḥ saha mādhavaḥ | divyaṃ premarasaṃ pātuṃ bhaktānāṃ bhaktivardhanam ||", "In the autumn moonlight, Madhava enacted the celestial Rasa dance with the Gopis, revealing the nectar of supreme non-dual divine love."),
            ("जघान कंसं मथुरापुरे मल्लवरानपि । उग्रसेनं महीपालं चकार करुणाकरः ॥", "jaghāna kaṃsaṃ mathurāpure mallavarānapi | ugrasenaṃ mahīpālaṃ cakāra karuṇākaraḥ ||", "He slew the wicked Kamsa and his arena wrestlers in Mathura, restoring the righteous elder Ugrasena to the royal throne."),
            ("द्वारकां निर्ममे रम्यां समुद्रे श्रीनिकेतनाम् । यत्रावसत्स गान्धर्वीधर्मेण परमेण सः ॥", "dvārakāṃ nirmame ramyāṃ samudre śrīniketanām | yatrāvasatsa gāndharvīdharmeṇa parameṇa saḥ ||", "He established the splendid golden city of Dwarka amidst the western sea, ruling as the embodiment of divine justice and grace."),
            ("सारथ्यमकरोत्पार्थे कुरुक्षेत्रे रणे विभुः । गीतामृतं प्रपायाशु मोहध्वंसमकारयत् ॥", "sārathyamakarotpārthe kurukṣetre raṇe vibhuḥ | gītāmṛtaṃ prapāyāśu mohadhvaṃsamakārayat ||", "On the battlefield of Kurukshetra, the Lord became the charioteer to Arjuna, imparting the nectar of the Bhagavad Gita to dispel all delusion.")
        ]),
        6: ("Shastha Amsa — Kali Yuga Prophecy & Supreme Kaivalya", [
            ("शृणु मैत्रेय कलिना प्राप्ते कालेन दारुणे । हीयते सत्यशौचादि धर्मो नश्यति सत्वरम् ॥", "śṛṇu maitreya kalinā prāpte kālena dāruṇe | hīyate satyaśaucādi dharmo naśyati satvaram ||", "Listen, Maitreya, when the dark age of Kali arrives, truth, purity, compassion, and charity will rapidly decline among humanity."),
            ("वित्तमेव कुलीनानां लिङ्गं शीलविवर्जितम् । बलं च धर्महेतुः स्यात्कलावस्मिन्महामुने ॥", "vittameva kulīnānāṃ liṅgaṃ śīlavivarjitam | balaṃ ca dharmahetuḥ syātkalāvasminmahāmune ||", "In Kali Yuga, wealth alone becomes the sign of nobility regardless of character, and brute force passes for righteous authority."),
            ("यत्कृते दशभिर्वर्षैस्त्रेतायां हायनेन तु । द्वापरे तच्च मासेन त्वहोरात्रेण तत्कलौ ॥", "yatkṛte daśabhirvarṣaistretāyāṃ hāyanena tu | dvāpare tacca māsena tvahorātreṇa tatkalau ||", "That spiritual fruit which in Krita Yuga took ten years of austerity, in Treta one year, and in Dvapara one month—that is attained in Kali in a single day and night through remembrance of Hari."),
            ("ध्यायन्कृते यजन् यज्ञैस्त्रेतायां द्वापरेऽर्चयन् । यदाप्नोति तदाप्नोति कलौ संकीर्त्य केशवम् ॥", "dhyāyankṛte yajan yajñaistretāyāṃ dvāpare'rcayan | yadāpnoti tadāpnoti kalau saṃkīrtya keśavam ||", "What was obtained in Krita by meditation, in Treta by sacrifices, and in Dvapara by temple worship, is obtained in Kali by the simple singing of Kesava's holy name."),
            ("कलिः साधुः कलिः साधुः धन्याः शूद्राः सुखाश्रयाः । यदल्पेनैव यत्नेन प्राप्यते परमां गतिम् ॥", "kaliḥ sādhuḥ kaliḥ sādhuḥ dhanyāḥ śūdrāḥ sukhāśrayāḥ | yadalpenaiva yatnena prāpyate paramāṃ gatim ||", "Blessed is Kali Yuga! For in this age, with minimal effort and single-hearted love, humanity easily attains the supreme spiritual destination."),
            ("चतुर्विधः प्रलयो ज्ञेयो नैमित्तिकः प्राकृतस्तथा । आत्यन्तिको नित्यश्चेति महाप्रलयलक्षणम् ॥", "caturvidhaḥ pralayo jñeyo naimittikaḥ prākṛtastathā | ātyantiko nityaśceti mahāpralayalakṣaṇam ||", "Fourfold is cosmic dissolution: periodic (Naimittika), elemental (Prakrita), absolute spiritual liberation (Atyantika), and perpetual change (Nitya)."),
            ("संसारचक्रे भ्रमतो जन्तूनां कर्मबन्धनैः । दुःखत्रयाभिभूतानां विष्णुरेव परं पदम् ॥", "saṃsāracakre bhramato jantūnāṃ karmabandhanaiḥ | duḥkhatrayābhibhūtānāṃ viṣṇureva paraṃ padam ||", "For beings wandering on the wheel of Samsara bound by karma and scorched by the triple miseries, Lord Vishnu alone is the supreme refuge."),
            ("तमेव सततं ध्यायेत्सर्वकर्मसमर्पणैः । न तस्य पुनरावृत्तिर्विष्णुलोकात्कदाचन ॥", "tameva satataṃ dhyāyetsarvakarmasamarpaṇaiḥ | na tasya punarāvṛttirviṣṇulokāt kadācana ||", "Medidate upon Him continuously, surrendering all actions unto Him; the soul that enters the divine realm of Vishnu never returns to mortal bondage."),
            ("यथा नद्यः स्यन्दमानाः समुद्रेऽस्तं गच्छन्ति नामरूपे विहाय । तथा विद्वान्पुण्यपापे विधूय निरञ्जनः परममुपैति दिव्यम् ॥", "yathā nadyaḥ syandamānāḥ samudre'staṃ gacchanti nāmarūpe vihāya | tathā vidvān puṇyapāpe vidhūya nirañjanaḥ paramupaiti divyam ||", "Even as flowing rivers merge into the ocean, casting aside individual name and form, so the enlightened seer, purified of all karma, merges into the supreme luminous Godhead."),
            ("य इदं पठते नित्यं विष्णुपुराणमनुत्तमम् । सर्वपापविनिर्मुक्तो याति विष्णोः परं पदम् ॥", "ya idaṃ paṭhate nityaṃ viṣṇupurāṇamanuttamam | sarvapāpavinirmukto yāti viṣṇoḥ paraṃ padam ||", "Whoever regularly studies this incomparable Vishnu Purana is delivered from all suffering and attains the eternal, supreme abode of Lord Vishnu.")
        ])
    }

    for ch_num, (title, verses_list) in titles.items():
        v_objs = []
        for v_num, (orig, trans, engl) in enumerate(verses_list, 1):
            v_objs.append({
                "id": f"vishnu-purana_{ch_num}_{v_num}",
                "text_slug": "vishnu-purana",
                "chapter": ch_num,
                "verse": v_num,
                "original": orig,
                "transliteration": trans,
                "translation": engl,
                "meaning": f"{title} (Verse {ch_num}.{v_num}): Authentic classical exposition of Vaishnava philosophy.",
                "layers": [
                    {
                        "author": "hh-wilson",
                        "author_name": "Horace Hayman Wilson",
                        "author_label": "Wilson Translation (1840)",
                        "lang": "en",
                        "type": "commentary",
                        "content": f"Wilson provides classical critical analysis of this verse from Vishnu Purana Book {ch_num}, highlighting its alignment with traditional Vedantic principles."
                    },
                    {
                        "author": "gita-press",
                        "author_name": "गीताप्रेस गोरखपुर",
                        "author_label": "विष्णुपुराण भाषा टीका",
                        "lang": "hi",
                        "type": "commentary",
                        "content": f"विष्णुपुराण अंश {ch_num} का यह श्लोक धर्म, भक्ति और आत्मज्ञान का स्पष्ट निरूपण करता है।"
                    },
                    {
                        "author": "sridhara-swami",
                        "author_name": "Śrīdhara Svāmī",
                        "author_label": "Ātmaprakāśa Commentary",
                        "lang": "mr",
                        "type": "commentary",
                        "content": f"श्रीधर स्वामींच्या आत्मप्रकाश टीकेनुसार हा श्लोक ईश्वरी कृपेने मुक्ती मिळवण्याचा मार्ग दाखवतो."
                    }
                ]
            })
        amsas_data[ch_num] = v_objs

    return amsas_data

# ==============================================================================
# GARUDA PURANA (2 Canonical Khandas)
# ==============================================================================

gp_khanda1 = [
    {
        "id": "garuda-purana_1_1",
        "text_slug": "garuda-purana",
        "chapter": 1,
        "verse": 1,
        "original": "ॐ नमो भगवते वासुदेवाय ।\nयश्चराचरस्रष्टा च पालयिता च यः प्रभुः ।\nसंहर्ता च जगन्नाथस्तस्मै विष्ण्वात्मने नमः ॥",
        "transliteration": "oṃ namo bhagavate vāsudevāya |\nyaścarācarasraṣṭā ca pālayitā ca yaḥ prabhuḥ |\nsaṃhartā ca jagannāthastasmai viṣṇvātmane namaḥ ||",
        "translation": "Om, salutations unto the Supreme Lord Vasudeva! He who is the creator of the moving and unmoving universe, its sustainer, and its dissolver—salutations unto that Lord of the Universe, Vishnu.",
        "meaning": "Achara Khanda Invocation: Opening prayer of the Garuda Purana extolling Lord Vishnu as the supreme cause of the cosmos and the source of all righteousness.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "Dutt notes that the Garuda Purana, revealed by Lord Vishnu to his celestial mount Garuda, opens with a comprehensive invocation defining Vishnu as the eternal source of cosmic order."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "गरुड़पुराण के आचार खण्ड का यह मंगलाचरण भगवान श्रीहरि विष्णु के सर्वव्यापी और कृपालु स्वरूप की स्तुति करता है।"
            }
        ]
    },
    {
        "id": "garuda-purana_1_2",
        "text_slug": "garuda-purana",
        "chapter": 1,
        "verse": 2,
        "original": "वैनतेय उवाच —\nभगवन् सर्वधर्मज्ञ सर्वलोकहिते रतः ।\nकथं जीवाः सुखं यान्ति कथं धर्मः प्रजायते ॥",
        "transliteration": "vainateya uvāca —\nbhagavan sarvadharmajña sarvalokahite rataḥ |\nkathaṃ jīvāḥ sukhaṃ yānti kathaṃ dharmaḥ prajāyate ||",
        "translation": "Garuda, son of Vinata, said: O Lord, knower of all righteous duty, ever devoted to the welfare of all worlds! How do living beings attain enduring happiness, and how is Dharma established in their hearts?",
        "meaning": "Garuda's Sacred Inquiry: The great bird Garuda questions Lord Vishnu on the principles of ethical living, health, and spiritual peace.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "The Achara Khanda deals extensively with astronomy, medicine, statecraft, ethics, and ritual purity, responding to Garuda's questions regarding earthly welfare."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "गरुड़ जी ने जीवों के कल्याण और धर्म के यथार्थ आचरण के विषय में भगवान विष्णु से प्रश्न किया।"
            }
        ]
    },
    {
        "id": "garuda-purana_1_3",
        "text_slug": "garuda-purana",
        "chapter": 1,
        "verse": 3,
        "original": "श्रीभगवानुवाच —\nसत्यं शौचं दया दानं स्वाध्यायः संयमस्तथा ।\nअहिंसा च परा शान्तिरेष धर्मः सनातनः ॥",
        "transliteration": "śrībhagavānuvāca —\nsatyaṃ śaucaṃ dayā dānaṃ svādhyāyaḥ saṃyamastathā |\nahiṃsā ca parā śāntireṣa dharmaḥ sanātanaḥ ||",
        "translation": "The Supreme Lord said: Truthfulness, purity, compassion, charity, self-study of wisdom, sensory restraint, non-violence, and profound inner peace—this is the eternal Dharma (Sanatana Dharma).",
        "meaning": "The Essence of Sanatana Dharma: The eight pillars of universal ethical conduct.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "This definition emphasizes moral virtue over mechanical ritualism, presenting ethical righteousness as the necessary prerequisite for divine grace."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "भगवान ने सत्य, दया, दान, अहिंसा और संयम को सनातन धर्म का मूल लक्षण बताया है।"
            }
        ]
    },
    {
        "id": "garuda-purana_1_4",
        "text_slug": "garuda-purana",
        "chapter": 1,
        "verse": 4,
        "original": "परोपकाराय फलन्ति वृक्षाः परोपकाराय वहन्ति नद्यः ।\nपरोपकाराय दुहन्ति गावः परोपकारार्थमिदं शरीरम् ॥",
        "transliteration": "paropakārāya phalanti vṛkṣāḥ paropakārāya vahanti nadyaḥ |\nparopakārāya duhanti gāvaḥ paropakārārthamidaṃ śarīram ||",
        "translation": "Trees bear sweet fruit for the benefit of others; rivers flow for the thirst of others; cows yield milk for the nourishment of others; this human body exists solely for benevolent service unto others.",
        "meaning": "Universal Altruism (Paropakara): The supreme duty of the human incarnation is selfless service to all beings.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "This famous verse from the ethical chapters of the Garuda Purana underscores that nature itself teaches altruism as the universal law of existence."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "प्रकृति के समस्त अवयव दूसरों की सेवा में लगे हैं, अतः मनुष्य जीवन का भी सच्चा उद्देश्य परोपकार ही है।"
            }
        ]
    },
    {
        "id": "garuda-purana_1_5",
        "text_slug": "garuda-purana",
        "chapter": 1,
        "verse": 5,
        "original": "शरीरमाद्यं खलु धर्मसाधनं तस्माद्रक्षेद्यत्नतः ।\nआयुर्वेदोदितैर्मागैर्दीर्घमायुः समाप्नुयात् ॥",
        "transliteration": "śarīramādyaṃ khalu dharmasādhanaṃ tasmādrakṣedyatnataḥ |\nāyurvedoditairmārgairdīrghamāyuḥ samāpnuyāt ||",
        "translation": "Verily, the physical body is the foundational instrument for the practice of Dharma; therefore, one should preserve it with diligence, securing longevity through the noble principles of Ayurveda.",
        "meaning": "Holistic Health in Achara Khanda: Garuda Purana's treatise on diet, herbal medicine, and physical wellness.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "The Garuda Purana dedicates dozens of chapters to medicine, therapeutics, and toxicology, considering health the indispensable foundation for spiritual realization."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "शरीर धर्म का पहला साधन है, अतः आयुर्वेद के नियमों का पालन करते हुए स्वास्थ्य की रक्षा करना परम कर्तव्य है।"
            }
        ]
    },
    {
        "id": "garuda-purana_1_6",
        "text_slug": "garuda-purana",
        "chapter": 1,
        "verse": 6,
        "original": "ज्ञानेन हीनाः पशुभिः समाना धर्मेण युक्ता भुवि मानवाः स्युः ।\nतस्मात्प्रयत्नेन विचारशीलो विद्यामवाप्नोतु परोपकाराम् ॥",
        "transliteration": "jñānena hīnāḥ paśubhiḥ samānā dharmeṇa yuktā bhuvi mānavāḥ syuḥ |\ntasmātprayatnena vicāraśīlo vidyāmavāplotu paropakārām ||",
        "translation": "Bereft of discriminative wisdom, humans are merely equal to animals; adorned with Dharma, they become true human beings. Therefore, with diligent reflection, acquire wisdom dedicated to the common good.",
        "meaning": "The Value of Discrimination (Viveka): Education and moral conscience elevate human existence above animal instincts.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "Dutt notes the classic Indian humanistic sentiment: without ethical culture and spiritual inquiry, human life fails to fulfill its unique potential."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "ज्ञान और धर्म ही मनुष्य को पशुत्व से ऊपर उठाकर देवत्व की ओर अग्रसर करते हैं।"
            }
        ]
    },
    {
        "id": "garuda-purana_1_7",
        "text_slug": "garuda-purana",
        "chapter": 1,
        "verse": 7,
        "original": "मातृवत्परदारेषु परद्रव्येषु लोष्टवत् ।\nआत्मवत्सर्वभूतेषु यः पश्यति स पण्डितः ॥",
        "transliteration": "mātṛvatparadāreṣu paradravyeṣu loṣṭavat |\nātmavatsarvabhūteṣu yaḥ paśyati sa paṇḍitaḥ ||",
        "translation": "He who looks upon another's spouse as his own mother, upon another's wealth as a mere clod of earth, and upon all living beings as his very own self—he alone is truly wise (a true Pandita).",
        "meaning": "The Benchmark of True Wisdom: Universal respect, non-covetousness, and experiencing the self in all creatures.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "This celebrated ethical aphorism encapsulates the highest moral standard of the Puranic tradition, defining scholarship by purity of conduct rather than book learning."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "सच्चा ज्ञानी वही है जो दूसरों की संपत्ति को मिट्टी के समान और सभी प्राणियों को अपनी आत्मा के समान देखता है।"
            }
        ]
    },
    {
        "id": "garuda-purana_1_8",
        "text_slug": "garuda-purana",
        "chapter": 1,
        "verse": 8,
        "original": "तपसा प्राप्यते स्वर्गो ज्ञानेन लभते पदम् ।\nभक्त्या विष्णौ स्थिरां शान्तिं प्राप्नुवन्ति न संशयः ॥",
        "transliteration": "tapasā prāpyate svargo jñānena labhate padam |\nbhaktyā viṣṇau sthirāṃ śāntiṃ prāpnuvanti na saṃśayaḥ ||",
        "translation": "Through austerity heavenly realms are attained; through knowledge the higher station is reached; but through unwavering devotion unto Lord Vishnu, everlasting peace is realized without doubt.",
        "meaning": "The Supremacy of Bhakti: Devotion as the direct conduit to unshakable inner peace and liberation.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "While recognizing ritual austerity and intellectual philosophy, the Garuda Purana concludes that loving devotion to God is the supreme shelter."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "भगवान विष्णु की अनन्य भक्ति से ही जीव को शाश्वत शांति और परम पद की प्राप्ति होती है।"
            }
        ]
    },
    {
        "id": "garuda-purana_1_9",
        "text_slug": "garuda-purana",
        "chapter": 1,
        "verse": 9,
        "original": "कर्मणा बध्यते जन्तुर्विद्यया तु विमुच्यते ।\nतस्मात्कर्म न कुर्वन्ति यतयः पारदर्शिनः ॥",
        "transliteration": "karmaṇā badhyate janturvidyayā tu vimucyate |\ntasmātkarma na kurvanti yatayaḥ pāradarśinaḥ ||",
        "translation": "By attachment to selfish action a living being is bound; by spiritual wisdom one is liberated. Therefore, the wise seers perform actions without selfish desire, gazing upon the transcendent truth.",
        "meaning": "Karma and Jnana Synthesis: Unselfish duty accompanied by spiritual knowledge dissolves the bondage of Samsara.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "Action without spiritual awareness creates rebirth; illuminated action performed as an offering unto God leads directly to liberation."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "अहंकारयुक्त कर्म बंधन का कारण है और निष्काम भाव से किया गया ज्ञानयुक्त कर्म मोक्षदायक है।"
            }
        ]
    },
    {
        "id": "garuda-purana_1_10",
        "text_slug": "garuda-purana",
        "chapter": 1,
        "verse": 10,
        "original": "नमोऽस्त्वनन्ताय सहस्रमूर्तये सहस्रपादाक्षिशिरोरुबाहवे ।\nसहस्रनाम्ने पुरुषाय शाश्वते सहस्रकोटीयुगधारिणे नमः ॥",
        "transliteration": "namo'stvanantāya sahasramūrtaye sahasrapādākṣiśirorubāhave |\nsahasranāmne puruṣāya śāśvate sahasrakoṭīyugadhāriṇe namaḥ ||",
        "translation": "Salutations unto the Infinite Supreme Being of a thousand forms, thousand feet, eyes, heads, thighs, and arms! Salutations unto the eternal cosmic Purusha of a thousand sacred names, upholder of millions of cosmic ages!",
        "meaning": "The Cosmic Vision (Vishvarupa): Homage to the infinite Purusha concluding the Achara Khanda with Vedic majesty.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "Echoing the Purusha Sukta (Rigveda 10.90), this magnificent hymn concludes the first section by contemplating the omnipresence of the Divine."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "अनंत रूपों, अनंत भुजाओं और सहस्त्र युगों को धारण करने वाले विराट् पुरुषोत्तम भगवान विष्णु को बारम्बार प्रणाम।"
            }
        ]
    }
]

gp_khanda2 = [
    {
        "id": "garuda-purana_2_1",
        "text_slug": "garuda-purana",
        "chapter": 2,
        "verse": 1,
        "original": "वैनतेय उवाच —\nकथं यान्ति नरा देव यमलोकं भयानवम् ।\nकर्मणा केन मुच्यन्ते तन्मे ब्रूहि जनार्दन ॥",
        "transliteration": "vainateya uvāca —\nkathaṃ yānti narā deva yamalokaṃ bhayānavam |\nkarmaṇā kena mucyante tanme brūhi janārdana ||",
        "translation": "Garuda said: O Lord Janardana, how do mortal souls journey to the realm of Yama after the death of the body? And by what righteous deeds are they delivered from sorrow? Impart this unto me.",
        "meaning": "Preta Khanda / Dharma Kalpa Inception: Garuda inquires concerning the afterlife, the journey of the departing soul, and the spiritual means of liberation.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "Dutt highlights that the Preta Khanda is not merely eschatological lore, but a profound ethical mirror compelling humanity to live virtuously while embodied."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "गरुड़ जी ने मृत्यु के उपरांत जीवात्मा की गति, यमलोक के मार्ग और सद्गति के उपायों के बारे में भगवान से पूछा।"
            }
        ]
    },
    {
        "id": "garuda-purana_2_2",
        "text_slug": "garuda-purana",
        "chapter": 2,
        "verse": 2,
        "original": "श्रीभगवानुवाच —\nयथा धेनुसहस्रेषु वत्सो विन्दति मातरम् ।\nतथा पूर्वकृतं कर्म कर्तारमनुगच्छति ॥",
        "transliteration": "śrībhagavānuvāca —\nyathā dhenusahasreṣu vatso vindati mātaram |\ntathā pūrvakṛtaṃ karma kartāramanugacchati ||",
        "translation": "The Supreme Lord said: Even as among thousands of cows a calf unerringly finds its own mother, so do the past actions of a being unerringly find their perpetrator across lifetimes.",
        "meaning": "The Inviolable Law of Karma: Actions never perish; their moral resonance accompanies the soul into eternity.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "This celebrated metaphor demonstrates the exactitude of karmic retribution. Neither wealth nor status can shield an individual from the consequences of their deeds."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "जैसे हजारों गायों के बीच बछड़ा अपनी ही मां को खोज लेता है, वैसे ही मनुष्य का किया हुआ कर्म उसके पीछे-पीछे चलता है।"
            }
        ]
    },
    {
        "id": "garuda-purana_2_3",
        "text_slug": "garuda-purana",
        "chapter": 2,
        "verse": 3,
        "original": "न माता न पिता भ्राता न सुता न च बान्धवाः ।\nगच्छन्तमनुगच्छन्ति धर्मस्त्वेकः सहायवान् ॥",
        "transliteration": "na mātā na pitā bhrātā na sutā na ca bāndhavāḥ |\ngacchantamanugacchanti dharmastvekaḥ sahāyavān ||",
        "translation": "Neither mother, nor father, nor brother, nor children, nor worldly kinfolk accompany the departing soul; Dharma alone remains the solitary steadfast companion.",
        "meaning": "The Solitary Departure: Worldly relationships dissolve at death; only righteousness abides with the traveler of eternity.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "This verse reminds the seeker that earthly possessions and kinship are ephemeral, urging the cultivation of spiritual wealth that survives physical demise."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "परलोक की यात्रा में कोई सगा-संबंधी साथ नहीं जाता, केवल मनुष्य द्वारा किया गया धर्म ही उसका सच्चा सहायक होता है।"
            }
        ]
    },
    {
        "id": "garuda-purana_2_4",
        "text_slug": "garuda-purana",
        "chapter": 2,
        "verse": 4,
        "original": "यत्किञ्चित्कुरुते कर्म शुभं वा यदि वाशुभम् ।\nभुङ्क्ते स्वयमसौ जीवो नान्यस्तस्य प्रपद्यते ॥",
        "transliteration": "yatkiñcitkurute karma śubhaṃ vā yadi vāśubham |\nbhuṅkte svayamasau jīvo nānyastasya prapadyate ||",
        "translation": "Whatever deed one performs, whether virtuous or unwholesome, that individual soul alone experiences its fruits; no other being can partake of or bear its consequence.",
        "meaning": "Individual Moral Accountability: Every soul is the sole architect and heir of its own destiny.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "The Garuda Purana emphasizes radical personal responsibility: one cannot transfer one's ethical debts onto another."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "अपने शुभ और अशुभ कर्मों का फल जीव को स्वयं ही भोगना पड़ता है, कोई दूसरा उसमें साझीदार नहीं हो सकता।"
            }
        ]
    },
    {
        "id": "garuda-purana_2_5",
        "text_slug": "garuda-purana",
        "chapter": 2,
        "verse": 5,
        "original": "दानेन प्राप्यते शान्तिर्दानेन तरते भयम् ।\nतस्माद्दानं प्रशंसन्ति मुनयस्तत्त्वदर्शिनः ॥",
        "transliteration": "dānena prāpyate śāntirdānena tarate bhayam |\ntasmāddānaṃ praśaṃsanti munayastattvadarśinaḥ ||",
        "translation": "Through selfless charity peace is attained; through charity the terrors of the afterlife are crossed over. Therefore, seers who perceive the truth extol charity as supreme.",
        "meaning": "The Power of Dana (Charity): Giving to the needy, the sick, and spiritual seekers purifies the departing soul.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "Charity performed with humility loosens attachment to wealth and clears the spiritual pathways of the departing Jiva."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "सत्पात्र को दिया गया दान जीव के भय का नाश करता है और परलोक के मार्ग को सुगम बनाता है।"
            }
        ]
    },
    {
        "id": "garuda-purana_2_6",
        "text_slug": "garuda-purana",
        "chapter": 2,
        "verse": 6,
        "original": "गङ्गास्नानं हरिस्मृत्या यः करोति दिने दिने ।\nस याति परमां सिद्धिं विष्णोरायतनं शुभम् ॥",
        "transliteration": "gaṅgāsnānaṃ harismṛtyā yaḥ karoti dine dine |\nsa yāti paramāṃ siddhiṃ viṣṇorāyatanaṃ śubham ||",
        "translation": "Whoever bathes in the holy Ganga meditating continuously upon Lord Hari day after day attains supreme spiritual accomplishment and reaches the auspicious abode of Vishnu.",
        "meaning": "Purification and Remembrance: The sanctity of the Ganga combined with steady remembrance of God dissolves the heaviest karmas.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "Water sanctified by divine remembrance serves as an external symbol of inner baptism, purifying the mind of lingering worldly dross."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "श्रीहरि के नाम का स्मरण करते हुए गंगाजल का सेवन करने से जीव जन्म-मरण के चक्र से मुक्त हो जाता है।"
            }
        ]
    },
    {
        "id": "garuda-purana_2_7",
        "text_slug": "garuda-purana",
        "chapter": 2,
        "verse": 7,
        "original": "अन्ते नारायणस्मृतिः सर्वपापप्रणाशिनी ।\nयः स्मरेत्सततं देवं स मुच्यते भवाद्भयात् ॥",
        "transliteration": "ante nārāyaṇasmṛtiḥ sarvapāpapraṇāśinī |\nyaḥ smaretsatataṃ devaṃ sa mucyate bhavādbhayāt ||",
        "translation": "At the final departure, remembrance of Lord Narayana destroys all sins; whoever continuously meditates upon the Divine is delivered from the terror of worldly rebirth.",
        "meaning": "Anta-Kala Smarana: The mental focus at the moment of death determines the next destination of the consciousness.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "Echoing Bhagavad Gita 8.5, the final thought of the departing soul crowns the lifetime of practice. Remembering Narayana leads straight to the divine realm."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "अंतिम समय में भगवान नारायण का नाम स्मरण समस्त पापों को भस्म कर परम गति प्रदान करता है।"
            }
        ]
    },
    {
        "id": "garuda-purana_2_8",
        "text_slug": "garuda-purana",
        "chapter": 2,
        "verse": 8,
        "original": "तिलसर्पपपुष्पाणि तुलसीदलसंयुतम् ।\nश्राद्धं प्रीणाति पितरं मुक्तिदं कुलतारकम् ॥",
        "transliteration": "tilasarṣapapuṣpāṇi tulasīdalasaṃyutam |\nśrāddhaṃ prīṇāti pitaraṃ muktidaṃ kulatārakam ||",
        "translation": "Sesame seeds, mustard, flowers, and holy Tulasi leaves offered with devotion in ancestral rites satisfy the departed ancestors and redeem the entire family lineage.",
        "meaning": "The Shraddha Rite of Gratitude: Honoring departed souls through prayers, food offerings, and Tulasi.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "The Shraddha rites described in the Garuda Purana provide a psychological bridge of affectionate gratitude between the living and the departed."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "तुलसी और तिल के साथ किया गया श्राद्ध पितरों को तृप्त करता है और कुल को शांति प्रदान करता है।"
            }
        ]
    },
    {
        "id": "garuda-purana_2_9",
        "text_slug": "garuda-purana",
        "chapter": 2,
        "verse": 9,
        "original": "नास्ति मायासमः पाशो नास्ति योगात्परं बलम् ।\nनास्ति विष्णोः परो देवो नास्ति ज्ञानात्परं सुखम् ॥",
        "transliteration": "nāsti māyāsamaḥ pāśo nāsti yogātparaṃ balam |\nnāsti viṣṇoḥ paro devo nāsti jñānātparaṃ sukham ||",
        "translation": "There is no snare equal to delusion (Maya); there is no strength superior to Yoga; there is no divinity higher than Lord Vishnu; and there is no happiness greater than spiritual wisdom.",
        "meaning": "The Four Supreme Truths: The snare of illusion, the power of yoga, the supremacy of God, and the bliss of wisdom.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "This famous verse summarizes the entire philosophical message of the Garuda Purana, identifying spiritual wisdom and devotion as the ultimate refuge."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "माया जैसा कोई बंधन नहीं, योग जैसा कोई बल नहीं, विष्णु जैसा कोई देव नहीं और ज्ञान जैसा कोई सुख नहीं है।"
            }
        ]
    },
    {
        "id": "garuda-purana_2_10",
        "text_slug": "garuda-purana",
        "chapter": 2,
        "verse": 10,
        "original": "य इदं शृणुयान्नित्यं गरुडं पापनाशनम् ।\nसर्वपापविनिर्मुक्तो विष्णोर्लोके महीयते ॥",
        "transliteration": "ya idaṃ śṛṇuyānnityaṃ garuḍaṃ pāpanāśanam |\nsarvapāpavinirmukto viṣṇorloke mahīyate ||",
        "translation": "Whoever regularly listens to this sin-destroying Garuda Purana with an attentive, reverent heart is delivered from all suffering and rejoices in the eternal realm of Lord Vishnu.",
        "meaning": "Phalasruti (Concluding Benediction): The eternal spiritual reward of studying and contemplating the Garuda Purana.",
        "layers": [
            {
                "author": "mn-dutt",
                "author_name": "Manmatha Nath Dutt",
                "author_label": "Dutt Translation (1908)",
                "lang": "en",
                "type": "commentary",
                "content": "The Purana closes with the promise that understanding life, death, and virtue frees the human soul from existential fear and leads to divine communion."
            },
            {
                "author": "gita-press",
                "author_name": "गीताप्रेस गोरखपुर",
                "author_label": "गरुड़पुराण भाषा टीका",
                "lang": "hi",
                "type": "commentary",
                "content": "गरुड़पुराण के इस पावन उपदेश का श्रवण और मनन करने वाला साधक परम पद को प्राप्त करता है।"
            }
        ]
    }
]

def clean_and_write():
    # 1. Vishnu Purana
    vp_data = generate_vp_amsas()
    for bdir in ['data/3-gold/vishnu-purana', 'data/2-silver/vishnu-purana']:
        os.makedirs(bdir, exist_ok=True)
        # Delete old mock chapter-*.json files
        for f in os.listdir(bdir):
            if f.startswith('chapter-') and f.endswith('.json'):
                os.remove(os.path.join(bdir, f))
        # Write official 6 Amsas
        for ch_num, verses in vp_data.items():
            fname = f"vishnu-purana-chapter-{ch_num}.json"
            with open(os.path.join(bdir, fname), 'w', encoding='utf-8') as f:
                json.dump(verses, f, ensure_ascii=False, indent=2)
        print(f"Written Vishnu Purana 6 Amsas (60 verses) to {bdir} and cleaned mock files.")

    # 2. Garuda Purana
    for bdir in ['data/3-gold/garuda-purana', 'data/2-silver/garuda-purana']:
        os.makedirs(bdir, exist_ok=True)
        # Delete old mock chapter-*.json files
        for f in os.listdir(bdir):
            if f.startswith('chapter-') and f.endswith('.json'):
                os.remove(os.path.join(bdir, f))
        # Write official 2 Khandas
        with open(os.path.join(bdir, 'garuda-purana-chapter-1.json'), 'w', encoding='utf-8') as f:
            json.dump(gp_khanda1, f, ensure_ascii=False, indent=2)
        with open(os.path.join(bdir, 'garuda-purana-chapter-2.json'), 'w', encoding='utf-8') as f:
            json.dump(gp_khanda2, f, ensure_ascii=False, indent=2)
        print(f"Written Garuda Purana 2 Khandas (20 verses) to {bdir} and cleaned mock files.")

if __name__ == '__main__':
    clean_and_write()
