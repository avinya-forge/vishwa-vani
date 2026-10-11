import json
import os

chapter1_verses = [
    {
        "id": "samskaras_1_1",
        "text_slug": "samskaras",
        "chapter": 1,
        "verse": 1,
        "original": "ॐ विष्णुर्योनिं कल्पयतु त्वष्टा रूपाणि पिंशतु ।\nआ सिञ्चतु प्रजापतिर्धाता गर्भं दधातु ते ॥",
        "transliteration": "oṃ viṣṇuryoniṃ kalpayatu tvaṣṭā rūpāṇi piṃśatu |\nā siñcatu prajāpatirdhātā garbhaṃ dadhātu te ||",
        "translation": "May Lord Vishnu prepare the womb; may Tvashta shape the physical forms; may Prajapati infuse the divine vitality; and may Dhata sustain the embryo in your womb.",
        "meaning": "1. Garbhadhana Samskara (Conception): Consecrates the dawn of new human life, sanctifying marital union into a spiritual invocation for noble and healthy offspring.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "The Ashvalayana Grihya Sutra prescribes this Rigvedic mantra (RV 10.184.1) to align the minds of the parents with cosmic order (Rta), invoking Vishnu as the preserver of life."
            },
            {
                "author": "ashvalayana",
                "author_name": "आश्वलायन गृह्यसूत्र",
                "author_label": "वैदिक संस्कार विधि",
                "lang": "hi",
                "type": "commentary",
                "content": "गर्भाधान संस्कार जीवन का प्रथम संस्कार है। इसमें भगवान विष्णु और प्रजापति से प्रार्थना की जाती है कि उत्पन्न होने वाला जीव धर्मवान और तेजस्वी हो।"
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "en",
                "type": "commentary",
                "content": "Dr. Rajbali Pandey explains that ancient Indian psychology considered the mental disposition of parents during conception to leave an indelible impression upon the future child."
            },
            {
                "author": "dr-pandey",
                "author_name": "डॉ. राजबली पाण्डेय",
                "author_label": "संस्कार समीक्षा",
                "lang": "mr",
                "type": "commentary",
                "content": "गर्भाधान संस्कार हा केवळ शारीरिक व्यवहार नसून उच्च प्रतीच्या आत्म्याला जन्मास घालण्यासाठी केलेला पवित्र धार्मिक संकल्प मानला जातो."
            }
        ]
    },
    {
        "id": "samskaras_1_2",
        "text_slug": "samskaras",
        "chapter": 1,
        "verse": 2,
        "original": "ॐ पुमानग्निः पुमानिन्द्रः पुमान् देवो बृहस्पतिः ।\nपुमांसं पुत्रमा धेहि तं पुमाननु जायताम् ॥",
        "transliteration": "oṃ pumānagniḥ pumānindraḥ pumān devo bṛhaspatiḥ |\npumāṃsaṃ putramā dhehi taṃ pumānanu jāyatām ||",
        "translation": "Agni is vigorous, Indra is valiant, and Brihaspati is supremely wise. May they bestow vigor and virtue upon the growing child in the womb.",
        "meaning": "2. Pumsavana Samskara (Fetus Invigorating Rite): Performed in the third month to ensure wholesome embryonic development, physical vitality, and mental strength.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "Paraskara and Ashvalayana Grihya Sutras prescribe Pumsavana when the fetal heartbeat is established, invoking Agni, Indra, and Brihaspati for intellectual and physical fortitude."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "hi",
                "type": "commentary",
                "content": "पुंसवन संस्कार गर्भस्थ शिशु के शारीरिक और मानसिक स्वास्थ्य को पुष्ट करने के लिए तीसरे माह में संपन्न किया जाता है।"
            }
        ]
    },
    {
        "id": "samskaras_1_3",
        "text_slug": "samskaras",
        "chapter": 1,
        "verse": 3,
        "original": "ॐ येनावपत्सविता क्षुरेण सोमस्य राज्ञो वरुणस्य विद्वान् ।\nतेन ब्रह्माणो वपतेदमस्यायुष्मान् जरदष्टिर्यथासत् ॥",
        "transliteration": "oṃ yenāvapatsavitā kṣureṇa somasya rājño varuṇasya vidvān |\ntena brahmāṇo vapatedamasyāyuṣmān jaradaṣṭiryathāsat ||",
        "translation": "With that razor wherewith Savita shaves King Soma and Varuna, therewith O priests, consecrate this mother and unborn child, that long life and peace may abide.",
        "meaning": "3. Simantonnayana (Hair-Parting Rite): Performed in the fourth to sixth month to uplift the mother's mental serenity, protecting her emotional stability during pregnancy.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "Simantonnayana involves the ceremonial parting of the pregnant mother's hair with a porcupine quill and darbha grass, symbolizing tranquility, joyful music, and freedom from distress."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "hi",
                "type": "commentary",
                "content": "सीमन्तोन्नयन संस्कार में गर्भवती स्त्री के मानसिक उल्लास और सकारात्मक वातावरण के निर्माण पर विशेष बल दिया गया है।"
            }
        ]
    },
    {
        "id": "samskaras_1_4",
        "text_slug": "samskaras",
        "chapter": 1,
        "verse": 4,
        "original": "ॐ भूस्त्वयि दधामि भुवस्त्वयि दधामि स्वस्त्वयि दधामि भूर्भुवः स्वः सर्वं त्वयि दधामि ॥",
        "transliteration": "oṃ bhūstvayi dadhāmi bhuvastvayi dadhāmi svastvayi dadhāmi bhūrbhuvaḥ svaḥ sarvaṃ tvayi dadhāmi ||",
        "translation": "I impart into you the earthly wisdom (Bhur); I impart into you the atmospheric energy (Bhuvas); I impart into you the celestial illumination (Svar); I establish the cosmic whole within you.",
        "meaning": "4. Jatakarma (Birth Consecration): Administered at the newborn's first breath with gold and ghee-honey, welcoming the soul into the terrestrial sphere with prayers for intelligence (Medha).",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "The father breathes three times upon the infant and whispers the Medhajanana mantra into the right ear, linking the infant's consciousness with universal awareness."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "mr",
                "type": "commentary",
                "content": "जातकर्म संस्कार बालकाच्या जन्मानंतर लगेचच केला जातो, ज्यामध्ये बुद्धी, दीर्घायुष्य आणि तेजस्वितेसाठी प्रार्थना केली जाते."
            }
        ]
    },
    {
        "id": "samskaras_1_5",
        "text_slug": "samskaras",
        "chapter": 1,
        "verse": 5,
        "original": "ॐ आयुष्याणि करोति शतं वर्षाणि जीवति ।\nशुभं नाम कुरुते सर्वलोकप्रियावहम् ॥",
        "transliteration": "oṃ āyuṣyāṇi karoti śataṃ varṣāṇi jīvati |\nśubhaṃ nāma kurute sarvalokapriyāvaham ||",
        "translation": "May the bestowed name grant vitality for a hundred years of wholesome life; may this auspicious name bring honor, affection, and benevolence throughout all worlds.",
        "meaning": "5. Namakarana (Naming Ceremony): Conducted on the tenth or twelfth day, conferring an identity that reflects spiritual aspiration, family heritage, and planetary harmony.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "The Grihya Sutras specify that the name must contain an even number of syllables for boys and uneven for girls, with auspicious phonetic resonances inspiring high character."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "hi",
                "type": "commentary",
                "content": "नामकरण संस्कार व्यक्ति को समाज में एक गरिमामयी पहचान प्रदान करता है जो उसके चरित्र और जीवन-लक्ष्य का स्मरण कराती है।"
            }
        ]
    },
    {
        "id": "samskaras_1_6",
        "text_slug": "samskaras",
        "chapter": 1,
        "verse": 6,
        "original": "ॐ तच्चक्षुर्देवहितं पुरस्ताच्छुक्रमुच्चरत् ।\nपश्येम शरदः शतं जीवेम शरदः शतं शृणुयाम शरदः शतम् ॥",
        "transliteration": "oṃ taccakṣurdevahitaṃ purastācchukramuccarat |\npaśyema śaradaḥ śataṃ jīvema śaradaḥ śataṃ śṛṇuyāma śaradaḥ śatam ||",
        "translation": "Behold the brilliant Sun, eye of the universe, rising in the east! May we see for a hundred autumns; may we live for a hundred autumns; may we hear with clarity for a hundred autumns.",
        "meaning": "6. Nishkramana (First Outing): In the fourth month, the child is taken outdoors for the first time to behold the Sun, the Moon, and the vast natural cosmos.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "Reciting the Surya Gayatri and the famous Rigveda prayer (RV 7.66.16), the infant is introduced to the cosmic light as a symbol of divine illumination and vitality."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "hi",
                "type": "commentary",
                "content": "निष्क्रमण संस्कार बालक के प्रकृति और समाज के विस्तृत परिवेश में प्रथम प्रवेश का पावन उत्सव है।"
            }
        ]
    },
    {
        "id": "samskaras_1_7",
        "text_slug": "samskaras",
        "chapter": 1,
        "verse": 7,
        "original": "ॐ शिवौ ते स्तां व्रीहियवावबलावघसादुभौ ।\nएतौ यक्ष्मं वि बाधेते एतौ मुञ्चतो अंहसः ॥",
        "transliteration": "oṃ śivau te stāṃ vrīhiyavāvabalāvaghasādubhau |\netau yakṣmaṃ vi bādhete etau muñcato aṃhasaḥ ||",
        "translation": "May rice and barley be benign and nourishing unto you! May these grains ward off sickness and deliver you from weakness and affliction.",
        "meaning": "7. Annaprashana (First Solid Food): Performed in the sixth month when teeth emerge, weaning the child onto consecrated cooked rice mixed with ghee and honey.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "The father feeds the infant consecrated food with mantras for speech, sight, hearing, and vigor, marking the physiological milestone of dietary transition."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "mr",
                "type": "commentary",
                "content": "अन्नप्राशन संस्कार सहाव्या महिन्यात केला जातो, ज्यायोगे बालकाच्या शरीराचे पोषण आणि पाचनक्रिया सशक्त व्हावी."
            }
        ]
    },
    {
        "id": "samskaras_1_8",
        "text_slug": "samskaras",
        "chapter": 1,
        "verse": 8,
        "original": "ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः ।\nवनस्पतयः शान्तिर्विश्वे देवाः शान्तिर्ब्रह्म शान्तिः सर्वं शान्तिः शान्तिरेव शान्तिः सा मा शान्तिरेधि ॥",
        "transliteration": "oṃ dyauḥ śāntirantarikṣaṃ śāntiḥ pṛthivī śāntirāpaḥ śāntiroṣadhayaḥ śāntiḥ |\nvanaspatayaḥ śāntirviśve devāḥ śāntirbrahma śāntiḥ sarvaṃ śāntiḥ śāntireva śāntiḥ sā mā śāntiredhi ||",
        "translation": "May peace reign in the heavens, peace in the atmosphere, peace on earth, peace in waters, peace in medicinal herbs, peace in trees, peace in all deities, peace in Brahman, peace in all things; may supreme peace abide within us.",
        "meaning": "Infancy Consecration & Universal Shanti Patha: Sealing the prenatal and infancy lifecycle rites with the great Vedic prayer for cosmic harmony and enduring well-being.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "The universal Shanti Patha from Shukla Yajurveda 36.17 concludes the infant rites, creating an envelope of protective serenity around the child and household."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "hi",
                "type": "commentary",
                "content": "शान्ति पाठ के द्वारा सम्पूर्ण सृष्टि की शक्तियों के साथ बालक के जीवन में समरसता और आरोग्यता की प्रतिष्ठा की जाती है।"
            }
        ]
    }
]

chapter2_verses = [
    {
        "id": "samskaras_2_1",
        "text_slug": "samskaras",
        "chapter": 2,
        "verse": 1,
        "original": "ॐ निवर्तयाम्यायुषेऽन्नाद्याय प्रजननाय रायस्पोषाय सुप्रजास्त्वाय सुवीर्याय ॥",
        "transliteration": "oṃ nivartayāmyāyuṣe'nnādyāya prajananāya rāyaspoṣāya suprajāstvāya suvīryāya ||",
        "translation": "I trim these locks of hair for the sake of long life, wholesome nourishment, noble progeny, prosperity, and radiant physical valor.",
        "meaning": "8. Chudakarana / Chaula (Tonsure Ceremony): The ceremonial first haircut performed in the first or third year to promote physical hygiene, cranial health, and intellect.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "Tonsure is accompanied by prayers for longevity. A tuft of hair (shikha) is traditionally preserved at the crown (Brahmarandhra) for neurological and energetic balance."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "hi",
                "type": "commentary",
                "content": "चूड़ाकरण (मुण्डन) संस्कार से बालक का पूर्वजन्म के संस्कारों से संबंध विच्छेद होकर इस जन्म की शुद्धि और बौद्धिक विकास का मार्ग प्रशस्त होता है।"
            }
        ]
    },
    {
        "id": "samskaras_2_2",
        "text_slug": "samskaras",
        "chapter": 2,
        "verse": 2,
        "original": "ॐ भद्रं कर्णेभिः शृणुयाम देवा भद्रं पश्येमाक्षभिर्यजत्राः ।\nस्थिरैरङ्गैस्तुष्टुवांसस्तनूभिर्व्यशेम देवहितं यदायुः ॥",
        "transliteration": "oṃ bhadraṃ karṇebhiḥ śṛṇuyāma devā bhadraṃ paśyemākṣabhiryajatrāḥ |\nsthirairaṅgaistuṣṭuvāṃsastanūbhirvyaśema devahitaṃ yadāyuḥ ||",
        "translation": "O radiant Devas, may we hear with our ears what is good and auspicious; may we see with our eyes what is noble and pure; with steadfast limbs may we live a life dedicated to divine order.",
        "meaning": "9. Karnavedha (Ear Piercing): Performed in the third or fifth year to enhance auditory health, stimulate acupressure meridians, and adorn the child for cultural life.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "Accompanied by the Shanti Mantra from Rigveda 1.89.8, Karnavedha is explained by Sushruta Samhita as having profound preventive medical benefits against hydrocele and sensory ailments."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "mr",
                "type": "commentary",
                "content": "कर्णवेध संस्कार हा आरोग्याच्या दृष्टीने आणि श्रवणशक्तीच्या संवर्धनासाठी अत्यंत महत्त्वपूर्ण मानला जातो."
            }
        ]
    },
    {
        "id": "samskaras_2_3",
        "text_slug": "samskaras",
        "chapter": 2,
        "verse": 3,
        "original": "ॐ सरस्वति नमस्तुभ्यं वरदे कामरूपिणि ।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा ॥",
        "transliteration": "oṃ sarasvati namastubhyaṃ varade kāmarūpiṇi |\nvidyārambhaṃ kariṣyāmi siddhirbhavatu me sadā ||",
        "translation": "Salutations unto Goddess Saraswati, the bestower of boons and embodiment of all wisdom. I commence my learning; may spiritual and intellectual accomplishment ever be mine.",
        "meaning": "10. Vidyarambha / Aksharabhyasa (Beginning of Learning): Celebrated in the fifth year, guiding the child to write the sacred Om and the alphabet in rice grains or sand.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "The child pays homage to Ganesha, Saraswati, and the lineage of preceptors, recognizing that literacy and education are sacred portals to ethical living."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "hi",
                "type": "commentary",
                "content": "विद्यारम्भ संस्कार के द्वारा बालक का अक्षरों और विद्या की अधिष्ठात्री देवी सरस्वती के साथ प्रथम औपचारिक संबंध स्थापित होता है।"
            }
        ]
    },
    {
        "id": "samskaras_2_4",
        "text_slug": "samskaras",
        "chapter": 2,
        "verse": 4,
        "original": "ॐ यज्ञोपवीतं परमं पवित्रं प्रजापतेर्यत्सहजं पुरस्तात् ।\nआयुष्यमग्र्यं प्रतिमुञ्च शुभ्रं यज्ञोपवीतं बलमस्तु तेजः ॥",
        "transliteration": "oṃ yajñopavītaṃ paramaṃ pavitraṃ prajāpateryatsahajaṃ purastāt |\nāyuṣyamagryaṃ pratimuñca śubhraṃ yajñopavītaṃ balamastu tejaḥ ||",
        "translation": "The sacred thread is supremely pure, born alongside Prajapati in primordial times. Wear this bright thread of radiant vitality; may it bestow longevity, strength, and spiritual brilliance.",
        "meaning": "11. Upanayana (Sacred Thread Initiation): The defining spiritual birth (Dvija) transforming the child into a dedicated seeker (Brahmachari) bound by self-discipline and truth.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "The investiture of the three-stranded cotton thread symbolizes mastery over thought, word, and deed, as well as the triple debt (Rna) owed to the Rishis, Pitris, and Devas."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "hi",
                "type": "commentary",
                "content": "उपनयन संस्कार को द्विजत्व (दूसरा जन्म) कहा गया है, जहाँ से बालक सांसारिक प्रमाद छोड़कर गुरु के संरक्षण में ज्ञानार्जन का पथ चुनता है।"
            }
        ]
    },
    {
        "id": "samskaras_2_5",
        "text_slug": "samskaras",
        "chapter": 2,
        "verse": 5,
        "original": "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥",
        "transliteration": "oṃ bhūrbhuvaḥ svaḥ tatsaviturvareṇyaṃ bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt ||",
        "translation": "Om, throughout the earth, atmosphere, and heavens! We meditate upon the supreme, adorable radiance of the Divine Sun (Savitur); may that Divine Light illuminate and guide our intellect.",
        "meaning": "Gayatri Mantra Initiation: The Guru imparts the supreme Vedic Mantra into the right ear of the initiate, conferring spiritual awakening and meditative mastery.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "The Gayatri Mantra (Rigveda 3.62.10) is the mother of all Vedic knowledge. Daily Sandhyavandana meditation upon it purifies the consciousness and strengthens the intellect."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "mr",
                "type": "commentary",
                "content": "गायत्री महामंत्राची दीक्षा शिष्याला विवेक, बुद्धीचे तेज आणि अध्यात्मिक सामर्थ्य प्रदान करते."
            }
        ]
    },
    {
        "id": "samskaras_2_6",
        "text_slug": "samskaras",
        "chapter": 2,
        "verse": 6,
        "original": "ॐ अग्ने व्रतपते व्रतं चरिष्यामि तच्छकेयं तन्मे राध्यताम् ।\nइदमहमनृतात्सत्यमुपैमि ॥",
        "transliteration": "oṃ agne vratapate vrataṃ cariṣyāmi tacchakeyaṃ tanme rādhyatām |\nidamahamanṛtātsatyamupaimi ||",
        "translation": "O Agni, Lord of sacred vows! I undertake this solemn discipline; may I possess the power to fulfill it; may success attend my endeavor. Herewith I step forth from untruth unto truth.",
        "meaning": "12. Vedarambha (Commencement of Vedic Studies): Dedicating the student's intellect to deep scriptural study, grammar, astronomy, and philosophy in the Gurukula.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "From the Shukla Yajurveda 1.5, the student declares the vow of Satya (truthfulness) before the sacred fire, commencing formal study of the Vedas and auxiliary sciences (Vedangas)."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "hi",
                "type": "commentary",
                "content": "वेदारम्भ संस्कार के माध्यम से विद्यार्थी सत्य और विद्या के अनुष्ठान का दृढ़ संकल्प लेता है।"
            }
        ]
    },
    {
        "id": "samskaras_2_7",
        "text_slug": "samskaras",
        "chapter": 2,
        "verse": 7,
        "original": "ॐ युवं वस्त्राणि पीवसा वसाथे युवोरच्छिद्रा मन्तवो ह सर्गाः ।\nअवातिरतमनृतानि विश्व ऋतेन मित्रावरुणा सचेथे ॥",
        "transliteration": "oṃ yuvaṃ vastrāṇi pīvasā vasāthe yuvoracchidrā mantavo ha sargāḥ |\navātiratamanṛtāni viśva ṛtena mitrāvaruṇā sacethe ||",
        "translation": "You clothe yourselves in radiant vestments; your thoughts and creative deeds are flawless. You dispel all false thoughts and abide firmly established in cosmic truth, O Mitra and Varuna.",
        "meaning": "13. Keshanta / Godana (First Shaving & Coming of Age): Celebrated around the sixteenth year to mark youth, emotional maturity, and renewal of Brahmacharya vows.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "Keshanta parallels the Chudakarana ceremony but is performed at age 16 with the gifting of a cow (Godana) to the Acharya, marking the culmination of youth."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "hi",
                "type": "commentary",
                "content": "केशान्त संस्कार युवावस्था के आगमन पर विद्यार्थी के आचरण में गम्भीरता और संयम की पुष्टि करता है।"
            }
        ]
    },
    {
        "id": "samskaras_2_8",
        "text_slug": "samskaras",
        "chapter": 2,
        "verse": 8,
        "original": "ॐ सत्यं वद । धर्मं चर । स्वाध्यायान्मा प्रमदः ।\nमातृदेवो भव । पितृदेवो भव । आचार्यदेवो भव । अतिथिदेवो भव ॥",
        "transliteration": "oṃ satyaṃ vada | dharmaṃ cara | svādhyāyānmā pramadaḥ |\nmātṛdevo bhava | pitṛdevo bhava | ācāryadevo bhava | atithidevo bhava ||",
        "translation": "Speak the truth. Practice righteousness. Never neglect your daily self-study. Revere your mother as a divinity. Revere your father as a divinity. Revere your preceptor as a divinity. Revere your guest as a divinity.",
        "meaning": "14. Samavartana (Graduation & Convocation): The graduation ceremonial bath (Snana) when the Acharya delivers the famous Taittiriya Upanishad convocation address to the outgoing Snataka.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "The convocation address from Taittiriya Upanishad 1.11 is the pinnacle of ancient educational philosophy, instructing graduates on their ethical, familial, and societal duties."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "hi",
                "type": "commentary",
                "content": "समावर्तन संस्कार गुरुकुल की शिक्षा पूर्ण होने पर गृहस्थाश्रम में प्रवेश के लिए नैतिक आचार संहिता प्रदान करता है।"
            },
            {
                "author": "dr-pandey",
                "author_name": "डॉ. राजबली पाण्डेय",
                "author_label": "संस्कार समीक्षा",
                "lang": "mr",
                "type": "commentary",
                "content": "समावर्तन हा प्राचीन भारतातील दीक्षांत समारंभ होता, ज्यामध्ये गुरूंनी शिष्याला सत्य, धर्म आणि माता-पित्यांच्या सेवेचा आजीवन संदेश दिला."
            }
        ]
    }
]

chapter3_verses = [
    {
        "id": "samskaras_3_1",
        "text_slug": "samskaras",
        "chapter": 3,
        "verse": 1,
        "original": "ॐ गौरीं कन्यामिमां विप्र यथाशक्ति समलंकृताम् ।\nतुभ्यं दास्यामि विप्रर्षे धर्मकामार्थसिद्धये ॥",
        "transliteration": "oṃ gaurīṃ kanyāmimāṃ vipra yathāśakti samalaṃkṛtām |\ntubhyaṃ dāsyāmi viprarṣe dharmakāmārthasiddhaye ||",
        "translation": "I offer this noble, virtuous maiden, adorned according to our capacity, unto you, O righteous groom, for the mutual attainment of Dharma, Artha, and noble love.",
        "meaning": "15. Vivaha Samskara — Kanyadana: The sacred institution of marriage uniting two souls as equal spiritual partners (Dharmapatni and Dharmapati) to uphold family and cosmic duty.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "Marriage is the central pillar among all sixteen samskaras, supporting the other three ashramas. The bride and groom enter a lifelong sacred partnership grounded in mutual respect."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "hi",
                "type": "commentary",
                "content": "विवाह संस्कार हिंदू संस्कृति का मेरुदंड है, जो केवल दो शरीरों का नहीं अपितु दो आत्माओं और दो कुलों का पवित्र धार्मिक मिलन है।"
            }
        ]
    },
    {
        "id": "samskaras_3_2",
        "text_slug": "samskaras",
        "chapter": 3,
        "verse": 2,
        "original": "ॐ गृभ्णामि ते सौभगत्वाय हस्तं मया पत्या जरदष्टिर्यथासः ।\nभगो अर्यमा सविता पुरन्धिर्मह्यं त्वादुर्गार्हपत्याय देवाः ॥",
        "transliteration": "oṃ gṛbhṇāmi te saubhagatvāya hastaṃ mayā patyā jaradaṣṭiryathāsaḥ |\nbhago aryamā savitā purandhirmahyaṃ tvādurgārhapatyāya devāḥ ||",
        "translation": "I take your hand for mutual happiness and prosperity, that together with me your husband you may reach a ripe and blessed old age. The divine powers have united us to rule our household in righteousness.",
        "meaning": "Panigrahana (Clasping the Hand): The groom takes the bride's right hand over the sacred fire, uttering the ancient Rigvedic vow (RV 10.85.36) of lifelong faithfulness and shared destiny.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "The Panigrahana ceremony signifies an irrevocable bond of shared duty (Sahadharma), where husband and wife face the trials of life as one indivisible unit."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "mr",
                "type": "commentary",
                "content": "पाणिग्रहण विधीमध्ये पती पत्नीचा हात धरून आयुष्यभर एकत्र राहण्याची आणि संसाराची धुरा सांभाळण्याची शपथ घेतो."
            }
        ]
    },
    {
        "id": "samskaras_3_3",
        "text_slug": "samskaras",
        "chapter": 3,
        "verse": 3,
        "original": "ॐ एकमिषे विष्णुस्त्वान्वेतु । द्वे ऊर्जे विष्णुस्त्वान्वेतु ।\nत्रीणि रायस्पोषाय विष्णुस्त्वान्वेतु । चत्वारि मायोभवाय विष्णुस्त्वान्वेतु ॥",
        "transliteration": "oṃ ekamiṣe viṣṇustvānbvetu | dve ūrje viṣṇustvānbvetu |\ntrīṇi rāyaspoṣāya viṣṇustvānbvetu | catvāri māyobhavāya viṣṇustvānbvetu ||",
        "translation": "Step one: May Vishnu guide you for wholesome nourishment. Step two: For vitality and strength. Step three: For prosperity and wealth. Step four: For comfort and domestic joy.",
        "meaning": "Saptapadi (The Seven Sacred Steps, Part 1): The essential sacramental rite of Vedic marriage, taking the first four steps around Agni for food, vigor, prosperity, and harmony.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "In Vedic law, marriage is legally and spiritually complete upon the completion of the seventh step of the Saptapadi. Each step represents a foundational pillar of householder life."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "hi",
                "type": "commentary",
                "content": "सप्तपदी के प्रथम चार पद गृहस्थ जीवन में अन्न, शक्ति, धन और सुख की सामूहिक साधना का संकल्प हैं।"
            }
        ]
    },
    {
        "id": "samskaras_3_4",
        "text_slug": "samskaras",
        "chapter": 3,
        "verse": 4,
        "original": "ॐ पञ्च पशुभ्यो विष्णुस्त्वान्वेतु । षड् ऋतुभ्यो विष्णुस्त्वान्वेतु ।\nसखे सप्तपदा भव सा मामनुव्रता भव विष्णुस्त्वान्वेतु ॥",
        "transliteration": "oṃ pañca paśubhyo viṣṇustvānbvetu | ṣaḍ ṛtubhyo viṣṇustvānbvetu |\nsakhe saptapadā bhava sā māmanuvratā bhava viṣṇustvānbvetu ||",
        "translation": "Step five: For noble cattle and progeny. Step six: For the blessings of all six seasons. Step seven: Be my eternal friend! Having walked seven steps together, we are united in divine friendship.",
        "meaning": "Saptapadi (The Seven Sacred Steps, Part 2): Concluding with the seventh step of supreme friendship (Sakha Saptapada Bhava), cementing the union into eternal companionship.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "The words 'Sakha saptapada bhava' (Be my friend with seven steps) elevate marriage above subjugation to egalitarian, affectionate spiritual friendship (Sakhya)."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "hi",
                "type": "commentary",
                "content": "सप्तपदी का सातवाँ पद पति-पत्नी को 'सखा' (सच्चा मित्र) घोषित करता है, जो वैदिक विवाह की गरिमामयी समानता का परिचायक है।"
            }
        ]
    },
    {
        "id": "samskaras_3_5",
        "text_slug": "samskaras",
        "chapter": 3,
        "verse": 5,
        "original": "ॐ सुमङ्गलीरियं वधूरिमा समेत पश्यत ।\nसौभाग्यमस्यै दत्त्वा याथास्तं विपरेतन ॥",
        "transliteration": "oṃ sumaṅgalīriyaṃ vadhūrimā sameta paśyata |\nsaubhāgyamasyai dattvā yāthāstaṃ viparetana ||",
        "translation": "Auspicious is this bride! Come, all of you assembled, behold her! Bestow your blessings of fortune upon her, and then return joyfully unto your homes.",
        "meaning": "Sindooradana & Ashirvada: The application of vermilion and the community assembly offering unanimous blessings for the prosperity and joy of the new couple.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "The Rigvedic verse (RV 10.85.33) invites the entire community to bless the bride, demonstrating that family joy in the Vedic worldview is inextricably tied to societal harmony."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "hi",
                "type": "commentary",
                "content": "सिंदूरदान और शुभाशीर्वाद से वधू को परिवार और समाज की ओर से असीम सम्मान और संरक्षण प्राप्त होता है।"
            }
        ]
    },
    {
        "id": "samskaras_3_6",
        "text_slug": "samskaras",
        "chapter": 3,
        "verse": 6,
        "original": "ॐ ध्रुवमसि ध्रुवं त्वाहं पश्यामि ध्रुवैधि पोष्ये मयि ।\nमह्यं त्वादाद्बृहस्पतिर्मया पत्या प्रजावती सञ्जीव शरदः शतम् ॥",
        "transliteration": "oṃ dhruvamasi dhruvaṃ tvāhaṃ paśyāmi dhruvaidhi poṣye mayi |\nmahyaṃ tvādādbṛhaspatirmayā patyā prajāvatī sañjīva śaradaḥ śatam ||",
        "translation": "Steadfast are you, O Pole Star (Dhruva)! Steadfastly I gaze upon you. Be steadfast in our home; Brihaspati has granted you to me. With me your partner, live a full and fruitful hundred autumns.",
        "meaning": "Dhruva-Arundhati Darshana: On the wedding night, the couple gaze upon the unmoving North Star (Dhruva) and Arundhati-Vasishtha, vowing steadfast constancy and mutual devotion.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "The contemplation of Dhruva (firmness) and Arundhati (unshakable devotion) provides an astronomical archetype of enduring loyalty throughout all seasons of life."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "mr",
                "type": "commentary",
                "content": "ध्रुव व अरुंधती दर्शनाने नवदाम्पत्याला अढळ निष्ठा आणि गृहस्थाश्रमातील स्थैर्याची शिकवण दिली जाते."
            }
        ]
    },
    {
        "id": "samskaras_3_7",
        "text_slug": "samskaras",
        "chapter": 3,
        "verse": 7,
        "original": "ॐ सूर्याच्चक्षुर्गच्छतु वातमात्मा द्यां च गच्छ पृथिवीं च धर्मणा ।\nअपो वा गच्छ यदि तत्र ते हितमोषधीषु प्रति तिष्ठा शरीरैः ॥",
        "transliteration": "oṃ sūryāccakṣurgacchatu vātamātmā dyāṃ ca gaccha pṛthivīṃ ca dharmaṇā |\napo vā gaccha yadi tatra te hitamoṣadhīṣu prati tiṣṭhā śarīraiḥ ||",
        "translation": "May the eye return unto the Sun; may your vital breath merge into the cosmic wind; return to the sky or the earth according to your righteousness; merge into the waters and the herbs, returning the mortal body unto the eternal elements.",
        "meaning": "16. Antyeshti Samskara (The Final Sacrifice): The sacred funeral rite releasing the departed soul from the physical sheath and returning the five elements (Pancha Mahabhutas) unto the cosmos.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "Rigveda 10.16.3 conceives cremation not as destruction, but as the final Homa (Antya Ishti), where the body is offered into Agni as the soul begins its journey to the ancestral and divine realms."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "hi",
                "type": "commentary",
                "content": "अन्त्येष्टि संस्कार जीवन का अन्तिम यज्ञ है, जहाँ पञ्चभूतों से बना शरीर पुनः पञ्चमहाभूतों में विलीन हो जाता है और आत्मा अपनी यात्रा जारी रखती है।"
            }
        ]
    },
    {
        "id": "samskaras_3_8",
        "text_slug": "samskaras",
        "chapter": 3,
        "verse": 8,
        "original": "ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ।\nसर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ।\nॐ शान्तिः शान्तिः शान्तिः ॥",
        "transliteration": "oṃ sarve bhavantu sukhinaḥ sarve santu nirāmayāḥ |\nsarve bhadrāṇi paśyantu mā kaścidduḥkhabhāgbhavet |\noṃ śāntiḥ śāntiḥ śāntiḥ ||",
        "translation": "May all beings be joyful; may all be free from illness and affliction; may all perceive what is auspicious and good; may none suffer grief. Om Peace, Peace, Peace.",
        "meaning": "Universal Benediction & Peace Prayer: The supreme Vedic blessing concluding the sixteen samskaras, affirming that the ultimate fruition of human ritual is the peace and liberation of all living beings.",
        "layers": [
            {
                "author": "ashvalayana",
                "author_name": "Āśvalāyana Gṛhya Sūtra",
                "author_label": "Vedic Ritual Tradition",
                "lang": "en",
                "type": "commentary",
                "content": "The concluding prayer of the Grihya tradition transcends individual life cycles to encompass the happiness, health, and peace of all cosmic life."
            },
            {
                "author": "dr-pandey",
                "author_name": "Dr. Rajbali Pandey",
                "author_label": "Socio-Religious Heritage",
                "lang": "hi",
                "type": "commentary",
                "content": "षोडश संस्कारों का सार सम्पूर्ण विश्व के कल्याण, शांति और सभी जीवों के सुख की मंगलकामना में सन्निहित है।"
            },
            {
                "author": "dr-pandey",
                "author_name": "डॉ. राजबली पाण्डेय",
                "author_label": "संस्कार समीक्षा",
                "lang": "mr",
                "type": "commentary",
                "content": "सर्व विश्वाच्या कल्याणासाठी केलेली ही प्रार्थना हिंदू संस्कार परंपरेचे सर्वोच्च मानवकेंद्री आणि आध्यात्मिक उद्दिष्ट प्रकट करते."
            }
        ]
    }
]

def write_samskaras():
    base_dirs = ['data/3-gold/samskaras', 'data/2-silver/samskaras']
    for bdir in base_dirs:
        os.makedirs(bdir, exist_ok=True)
        # Remove any old mock chapter-*.json files
        for f in os.listdir(bdir):
            if f.startswith('chapter-') and f.endswith('.json'):
                os.remove(os.path.join(bdir, f))
                print(f"Removed mock file: {os.path.join(bdir, f)}")
        
        # Write official chapters
        with open(os.path.join(bdir, 'samskaras-chapter-1.json'), 'w', encoding='utf-8') as f:
            json.dump(chapter1_verses, f, ensure_ascii=False, indent=2)
        with open(os.path.join(bdir, 'samskaras-chapter-2.json'), 'w', encoding='utf-8') as f:
            json.dump(chapter2_verses, f, ensure_ascii=False, indent=2)
        with open(os.path.join(bdir, 'samskaras-chapter-3.json'), 'w', encoding='utf-8') as f:
            json.dump(chapter3_verses, f, ensure_ascii=False, indent=2)
        print(f"Written chapters 1, 2, 3 to {bdir}")

if __name__ == '__main__':
    write_samskaras()
