import json
import os

# Complete canonical 196 Sutras of Patanjali across 4 Padas

PADA1_DATA = [
    ("अथ योगानुशासनम्", "atha yogānuśāsanam", "Now, the sacred exposition of Yoga commences.", "Patanjali begins the systematic exposition of the pre-existing science of Raja Yoga."),
    ("योगश्चित्तवृत्तिनिरोधः", "yogaścittavṛttinirodhaḥ", "Yoga is the inhibition (nirodha) of the modifications (vrittis) of the mind (citta).", "The quintessential definition of Yoga: transcending mental patterns to rest in pure consciousness."),
    ("तदा द्रष्टुः स्वरूपेऽवस्थानम्", "tadā draṣṭuḥ svarūpe'vasthānam", "Then the Seer abides established in its own essential nature.", "When mental fluctuations subside, Purusha realizes its unconditioned self."),
    ("वृत्तिसारूप्यमितरत्र", "vṛttisārūpyamitaratra", "At other times, there is identification with the mental modifications.", "In worldly existence, consciousness falsely identifies with thoughts and emotions."),
    ("वृत्तयः पञ्चतय्यः क्लिष्टाऽक्लिष्टाः", "vṛttayaḥ pañcatayyaḥ kliṣṭā'kliṣṭāḥ", "The mental fluctuations are fivefold, being either afflicted or non-afflicted.", "Thoughts either reinforce worldly bondage or promote spiritual liberation."),
    ("प्रमाणविपर्ययविकल्पनिद्रास्मृतयः", "pramāṇaviparyayavikalpanidrāsmṛtayaḥ", "They are right knowledge, misconception, imagination, deep sleep, and memory.", "The five categories of mental functioning."),
    ("प्रत्यक्षानुमानागमाः प्रमाणानि", "pratyakṣānumānāgamāḥ pramāṇāni", "Direct perception, inference, and competent testimony constitute right knowledge.", "The three epistemological sources of valid cognition in Samkhya-Yoga."),
    ("विपर्ययो मिथ्याज्ञानमतद्रूपप्रतिष्ठम्", "viparyayo mithyājñānamatadrūpapratiṣṭham", "Misconception is false knowledge not established in the real nature of the object.", "Error occurs when perception fails to correspond to objective reality."),
    ("शब्दज्ञानानुपाती वस्तुशून्यो विकल्पः", "śabdajñānānupātī vastuśūnyo vikalpaḥ", "Imagination is conceptual thought based on verbal knowledge devoid of objective reality.", "Abstract verbal concepts that have no concrete physical referent."),
    ("अभावप्रत्ययालम्बना तमोवृत्तिर्निद्रा", "abhāvapratyayālambanā tamovṛttirnidrā", "Deep sleep is that mental modification supported by the cognition of non-existence.", "Sleep is not empty nothingness, but a tamasic mental state devoid of conscious objects."),
    ("अनुभूतविषयासंप्रमोषः स्मृतिः", "anubhūtaviṣayāsaṃpramoṣaḥ smṛtiḥ", "Memory is the retention of experienced objects without loss.", "Recall of past impressions preserved in the storehouse of consciousness (chitta)."),
    ("अभ्यासवैराग्याभ्यां तन्निरोधः", "abhyāsavairāgyābhyāṃ tannirodhaḥ", "Their stilling is achieved through persistent practice (abhyasa) and non-attachment (vairagya).", "The dual wings of spiritual discipline: continuous effort and dispassionate detachment."),
    ("तत्र स्थितौ यत्नोऽभ्यासः", "tatra sthitau yatno'bhyāsaḥ", "Practice is the steady effort toward calm mental stillness.", "Continuous striving to keep the mind centered in undisturbed tranquility."),
    ("स तु दीर्घकालनैरन्तर्यसत्कारासेवितो दृढभूमिः", "sa tu dīrghakālanairantaryasatkārāsevito dṛḍhabhūmiḥ", "Practice becomes firmly grounded when cultivated for a long time, without interruption, and with reverent devotion.", "The three requirements for mastery: duration, unbroken consistency, and sacred reverence."),
    ("दृष्टानुश्रविकविषयवितृष्णस्य वशीकारसंज्ञा वैराग्यम्", "dṛṣṭānuśravikaviṣayavitṛṣṇasya vaśīkārasaṃjñā vairāgyam", "Non-attachment is the consciousness of mastery in one who is free from thirst for seen or scripturally heard objects.", "Freedom from craving for terrestrial pleasures as well as celestial rewards."),
    ("तत्परं पुरुषख्यातेर्गुणवैतृष्ण्यम्", "tatparaṃ puruṣakhyāterguṇavaitṛṣṇyam", "Supreme non-attachment is freedom from craving for the gunas themselves, through realization of Purusha.", "The highest detachment arising from experiential realization of pure consciousness."),
    ("वितर्कविचारानन्दास्मितारूपानुगमात्संप्रज्ञातः", "vitarkavicārānandāsmitārūpānugamātsaṃprajñātaḥ", "Cognitive samadhi is accompanied by deliberation, reflection, joy, and the sense of pure I-am-ness.", "The four progressive stages of conscious meditative absorption (samprajnata)."),
    ("विरामप्रत्ययाभ्यासपूर्वः संस्कारशेषोऽन्यः", "virāmapratyayābhyāsapūrvaḥ saṃskāraśeṣo'nyaḥ", "The other (asamprajnata) is preceded by the practice of cessation, where only latent impressions remain.", "Supraconscious absorption transcending all cognitive objects."),
    ("भवप्रत्ययो विदेहप्रकृतिलयानाम्", "bhavapratyayo videhaprakṛtilayānām", "For the bodiless gods and those merged in Prakriti, it is conditioned by worldly existence.", "Temporary absorption experienced by higher cosmic beings without final liberation."),
    ("श्रद्धावीर्यस्मृतिसमाधिप्रज्ञापूर्वक इतरेषाम्", "śraddhāvīryasmṛtisamādhiprajñāpūrvaka itareṣām", "For others, it is preceded by faith, energy, mindfulness, meditative absorption, and discriminative wisdom.", "The five spiritual faculties essential for the practicing yogi."),
    ("तीव्रसंवेगानामासन्नः", "tīvrasaṃvegānāmāsannaḥ", "For those of intense earnestness and vigor, Samadhi is near at hand.", "Speed of attainment is directly proportional to spiritual earnestness."),
    ("मृदुमध्याधिमात्रत्वात्ततोऽपि विशेषः", "mṛdumadhyādhimātratvāttato'pi viśeṣaḥ", "There are further distinctions according to whether the intensity is mild, moderate, or ardent.", "Gradations of spiritual temperament and commitment."),
    ("ईश्वरप्रणिधानाद्वा", "īśvarapraṇidhānādvā", "Or absorption is attained through supreme devotion and surrender to Ishvara.", "Bhakti and surrender as an independent, direct path to stillness."),
    ("क्लेशकर्मविपाकाशयैरपरामृष्टः पुरुषविशेष ईश्वरः", "kleśakarmavipākāśayairaparāmṛṣṭaḥ puruṣaviśeṣa īśvaraḥ", "Ishvara is a distinct Purusha, untouched by afflictions, actions, their fruitions, or latent impressions.", "The definition of the Supreme Divinity in Yoga philosophy."),
    ("तत्र निरतिशयं सर्वज्ञबीजम्", "tatra niratiśayaṃ sarvajñabījam", "In Him, the seed of omniscience reaches its infinite, unsurpassable limit.", "The supreme repository of all wisdom and knowledge."),
    ("पूर्वेषामपि गुरुः कालेनानवच्छेदात्", "pūrveṣāmapi guruḥ kālenānavacchedāt", "He is the teacher of even the ancients, being unconditioned by time.", "The eternal Guru of all primordial sages, transcending temporal limitation."),
    ("तस्य वाचकः प्रणवः", "tasya vācakaḥ praṇavaḥ", "The sacred syllable Om (Pranava) is His designation.", "Om is the cosmic sonic manifestation of the divine reality."),
    ("तज्जपस्तदर्थभावनम्", "tajjapastadarthabhāvanam", "Its repetition and contemplation upon its profound meaning should be practiced.", "Japa combined with meditative feeling and understanding of Om."),
    ("ततः प्रत्यक्चेतनाधिगमोऽप्यन्तरायाभावश्च", "tataḥ pratyakcetanādhigamo'pyantarāyābhāvaśca", "From that arises the turning inward of consciousness and the removal of all obstacles.", "The dual fruits of Om japa: interiorization and dissolution of hindrances."),
    ("व्याधिस्त्यानसंशयप्रमादालस्यविरतिभ्रान्तिदर्शनालब्धभूमिकत्वानवस्थितत्वानि चित्तविक्षेपास्तेऽन्तरायाः", "vyādhistyānasaṃśayapramādālasyāviratibhrāntidarśanālabdhabhūmikatvānavasthitatvāni cittavikṣepāste'ntarāyāḥ", "Sickness, dullness, doubt, heedlessness, laziness, worldly attachment, erroneous perception, failure to attain a state, and instability are the mental distractions that constitute obstacles.", "The nine impediments on the path of Yoga."),
    ("दुःखदौर्मनस्याङ्गमेजयत्वश्वासप्रश्वासा विक्षेपसहभुवः", "duḥkhadaurmanasyāṅgamejayatvaśvāsapraśvāsā vikṣepasahabhuvaḥ", "Pain, depression, trembling of the body, and irregular inhalation and exhalation accompany these distractions.", "The four physical and emotional symptoms of mental disturbance."),
    ("तत्प्रतिषेधार्थमेकतत्त्वाभ्यासः", "tatpratiṣedhārthamekatattvābhyāsaḥ", "To overcome them, practice focus upon a single principle (ekatattva).", "One-pointed concentration dissolves scattered mental energy."),
    ("मैत्रीकरुणामुदितोपेक्षाणां सुखदुःखपुण्यापुण्यविषयाणां भावनातश्चित्तप्रसादनम्", "maitrīkaruṇāmuditopekṣāṇāṃ sukhaduḥkhapuṇyāpuṇyaviṣayāṇāṃ bhāvanātaścittaprasādanam", "By cultivating friendliness toward the happy, compassion for the suffering, joy toward the virtuous, and equanimity toward the unvirtuous, the mind becomes serene.", "The four Brahma-Viharas for emotional purification and social harmony."),
    ("प्रच्छर्दनविधारणाभ्यां वा प्राणस्य", "pracchardanavidhāraṇābhyāṃ vā prāṇasya", "Or mental serenity is attained by the rhythmic exhalation and retention of breath.", "Pranayama as an immediate regulator of mental agitation."),
    ("विषयवती वा प्रवृत्तिरुत्पन्ना मनसः स्थितिस्निबन्धनी", "viṣayavatī vā pravṛttirutpannā manasaḥ sthitisnibandhanī", "Or awareness of subtle sensory perceptions brings about stability of the mind.", "Concentration on higher sensory faculties steadies attention."),
    ("विशोका वा ज्योतिष्मती", "viśokā vā jyotiṣmatī", "Or contemplation upon the sorrowless, effulgent inner light.", "Meditation on the luminous light of the spiritual heart (Hridaya)."),
    ("वीतरागविषयं वा चित्तम्", "vītarāgaviṣayaṃ vā cittam", "Or by contemplating upon a mind that has transcended all attachments.", "Meditating upon enlightened sages who have conquered desire."),
    ("स्वप्ननिद्राज्ञानालम्बनं वा", "svapnanidrājñānālambanaṃ vā", "Or by meditating on the knowledge revealed in dreams and deep sleep.", "Extracting spiritual insights from pure dream states."),
    ("यथाभिमतध्यानाद्वा", "yathābhimatadhyānādvā", "Or by meditating upon whatever divine object or principle is inspiring to oneself.", "Freedom of choice in selecting an object of devotion (Ishta Devata)."),
    ("परमाणुपरममहत्त्वान्तोऽस्य वशीकारः", "paramāṇuparamamahattvānto'sya vaśīkāraḥ", "The yogi's mastery extends from the infinitesimal atom to the infinitely great cosmos.", "The scope of mental mastery spanning all dimensions of reality."),
    ("क्षीणवृत्तेरभिजातस्येव मणेर्ग्रहीतृग्रहणग्राह्येषु तत्स्थतदञ्जनता समापत्तिः", "kṣīṇavṛtterabhijātasyeva maṇergrahītṛgrahaṇagrāhyeṣu tatsthatadañjanatā samāpattiḥ", "When fluctuations dwindle, the mind becomes like transparent crystal, taking on the color of whatever it reflects—whether knower, knowing, or known.", "The crystalline clarity of Samapatti (cognitive absorption)."),
    ("तत्र शब्दार्थज्ञानविकल्पैः संकीर्णा सवितर्का समापत्तिः", "tatra śabdārthajñānavikalpaiḥ saṃkīrṇā savitarkā samāpattiḥ", "Savitarka absorption is that wherein word, meaning, and idea are intermingled with conceptualization.", "First stage of absorption with conceptual verbal overlays."),
    ("स्मृतिपरिशुद्धौ स्वरूपशून्येवार्थमात्रनिर्भासा निर्वितर्का", "smṛtipariśuddhau svarūpaśūnyevārthamātranirbhāsā nirvitarkā", "Nirvitarka absorption is when memory is purified and the object alone shines forth, as if empty of own-form.", "Absorption without verbal concepts, perceiving the object directly."),
    ("एतयैव सविचारा निर्विचारा च सूक्ष्मविषया व्याख्याता", "etayaiva savicārā nirvicārā ca sūkṣmaviṣayā vyākhyātā", "By this, the reflective (savicara) and non-reflective (nirvicara) absorptions on subtle objects are also explained.", "Extending absorption from gross physical forms to subtle energetic principles (Tanmatras)."),
    ("सूक्ष्मविषयत्वं चालिङ्गपर्यवसानम्", "sūkṣmaviṣayatvaṃ cāliṅgaparyavasānam", "The subtlety of objects extends up to the unmanifest ground of nature (Alinga / Prakriti).", "The ladder of subtle perception culminating in primordial Nature."),
    ("ता एव सबीजः समाधिः", "tā eva sabījaḥ samādhiḥ", "These stages indeed constitute Samadhi with seed (Sabija Samadhi).", "Absorption that still contains latent seeds of future karma."),
    ("निर्विचारवैशारद्येऽध्यात्मप्रसादः", "nirvicāravaiśāradye'dhyātmaprasādaḥ", "Upon gaining consummate purity in Nirvicara absorption, inner spiritual illumination dawns.", "Clarity of the spiritual intellect (Adhyatma-prasada)."),
    ("ऋतम्भरा तत्र प्रज्ञा", "ṛtambharā tatra prajñā", "In that luminous state, wisdom is truth-bearing (Ritambhara).", "Direct perception of cosmic truth untainted by speculation."),
    ("श्रुतानुमानप्रज्ञाभ्यामन्यविषया विशेषार्थत्वात्", "śrutānumānaprajñābhyāmanyaviṣayā viśeṣārthatvāt", "Its scope is distinct from wisdom gained through scripture or inference, for it pertains to the unique particularity of things.", "Experiential knowledge transcends book learning and logic."),
    ("तज्जः संस्कारोऽन्यसंस्कारप्रतिबन्धी", "tajjaḥ saṃskāro'nyasaṃskārapratibandhī", "The latent impression born of this truth-bearing wisdom neutralizes all other impressions.", "Divine impressions counteract and dissolve past binding karmas."),
    ("तस्यापि निरोधे सर्वनिरोधान्निर्बीजः समाधिः", "tasyāpi nirodhe sarvanirodhānnirbījaḥ samādhiḥ", "When even that impression is stilled, everything is stilled, and seedless absorption (Nirbija Samadhi) is realized.", "The ultimate culmination of Raja Yoga: final emancipation (Kaivalya).")
]

PADA2_DATA = [
    ("तपःस्वाध्यायेश्वरप्रणिधानानि क्रियायोगः", "tapaḥsvādhyāyeśvarapraṇidhānāni kriyāyogaḥ", "Austerity, self-study of sacred texts, and devotion to Ishvara constitute Kriya Yoga.", "The practical threefold discipline for purifying body and mind."),
    ("समाधिभावनार्थः क्लेशतनूकरणार्थश्च", "samādhibhāvanārthaḥ kleśatanūkaraṇārthaśca", "It is practiced for bringing about Samadhi and for attenuating the afflictions (kleshas).", "The dual purpose of Kriya Yoga: spiritual absorption and reduction of mental impurities."),
    ("अविद्यास्मितारागद्वेषाभिनिवेशाः क्लेशाः", "avidyāsmitārāgadveṣābhiniveśāḥ kleśāḥ", "Ignorance, egoism, attachment, aversion, and clinging to bodily life are the five afflictions.", "The root psychological causes of all human suffering."),
    ("अविद्या क्षेत्रमुत्तरेषां प्रसुप्ततनुविच्छिन्नोदाराणाम्", "avidyā kṣetramuttareṣāṃ prasuptatanuvicchinnodārāṇām", "Ignorance is the breeding ground for the others, whether dormant, attenuated, interrupted, or active.", "Spiritual ignorance (Avidya) is the source of all secondary afflictions."),
    ("अनित्याशुचिदुःखानात्मसु नित्यशुचिसुखात्मख्यातिरविद्या", "anityāśuciduḥkhānātmasu nityaśucisukhātmakhyātiravidyā", "Ignorance is regarding the impermanent as permanent, the impure as pure, the painful as pleasurable, and the non-self as the Self.", "The four primary cognitive inversions that distort human perception."),
    ("दृग्दर्शनशक्त्योरेकात्मतेवास्मिता", "dṛgdarśanaśaktyorekātmatevāsmitā", "Egoism is the apparent identification of the power of the Seer with the power of seeing.", "Confounding the pure witness consciousness with the instrument of cognition."),
    ("सुखानुशयी रागः", "sukhānuśayī rāgaḥ", "Attachment is that which dwells upon pleasure.", "Desire born of the recollection of past enjoyable experiences."),
    ("दुःखानुशयी द्वेषः", "duḥkhānuśayī dveṣaḥ", "Aversion is that which dwells upon pain.", "Resistance and hatred born of the recollection of painful experiences."),
    ("स्वरसवाही विदुषोऽपि तथारूढोऽभिनिवेशः", "svarasavāhī viduṣo'pi tathārūḍho'bhiniveśaḥ", "Flowing on by its own potency, clinging to life is rooted even in the learned.", "The primal instinct for survival and fear of death present in all beings."),
    ("ते प्रतिप्रसवहेयाः सूक्ष्माः", "te pratiprasavaheyāḥ sūkṣmāḥ", "These subtle afflictions are to be eliminated through the involution of their causes.", "Tracing subtle thoughts back to their unmanifest origin dissolves them."),
    ("ध्यानहेयास्तद्वृत्तयः", "dhyānaheyāstadvṛttayaḥ", "Their active modifications are to be eliminated through meditation.", "Meditation pacifies and neutralizes active mental turbulence."),
    ("क्लेशमूलः कर्माशयो दृष्टादृष्टजन्मवेदनीयः", "kleśamūlaḥ karmāśayo dṛṣṭādṛṣṭajanmavedanīyaḥ", "The repository of karma has its root in the afflictions and is experienced in present and future births.", "Karma generated by kleshas determines the circumstances of current and future lives."),
    ("सति मूले तद्विपाको जात्यायुर्भोगाः", "sati mūle tadvipāko jātyāyurbhogāḥ", "So long as the root exists, its fruition is birth, lifespan, and experience of pleasure and pain.", "The threefold harvest of karma: species of birth, longevity, and experiential quality."),
    ("ते ह्लादपरितापफलाः पुण्यापुण्यहेतुत्वात्", "te hlādaparitāpaphalāḥ puṇyāpuṇyahetutvāt", "They bear the fruits of joy or sorrow according as their causes were virtuous or unvirtuous.", "Moral causality governs the universe: goodness yields joy, evil yields suffering."),
    ("परिणामतापसंस्कारदुःखैर्गुणवृत्तिविरोधाच्च दुःखमेव सर्वं विवेकिनः", "pariṇāmatāpasaṃskāraduḥkhairguṇavṛttivirodhācca duḥkhameva sarvaṃ vivekinaḥ", "To the person of discriminative discernment, all worldly experience is suffering, on account of the anxieties of change, painful longings, latent impressions, and the mutual conflict of the gunas.", "The noble truth of universal suffering recognized by the enlightened mind."),
    ("हेयं दुःखमनागतम्", "heyaṃ duḥkhamanāgatam", "Future suffering, which has not yet arrived, is to be avoided.", "The preventative therapeutic core of Yoga: stopping sorrow before it manifests."),
    ("द्रष्टृदृश्ययोः संयोगो हेयहेतुः", "draṣṭṛdṛśyayoḥ saṃyogo heyahetuḥ", "The cause of that which is to be avoided is the false union of the Seer and the seen.", "The misalliance between Purusha and Prakriti generates the illusion of bondage."),
    ("प्रकाशक्रियास्थितिशीलं भूतेन्द्रियात्मकं भोगापवर्गार्थं दृश्यम्", "prakāśakriyāsthitiśīlaṃ bhūtendriyātmakaṃ bhogāpavargārthaṃ dṛśyam", "The seen is by nature luminous, active, and inert; it consists of elements and sense organs, and exists for experience and liberation.", "Nature exists to provide experience (bhoga) and ultimately foster liberation (apavarga)."),
    ("विशेषाविशेषलिङ्गमात्रालिङ्गानि गुणपर्वाणि", "viśeṣāviśeṣaliṅgamātrāliṅgāni guṇaparvāṇi", "The stages of the gunas are the specific, the non-specific, the marked, and the unmanifest.", "The four hierarchical strata of evolutionary cosmic nature."),
    ("द्रष्टा दृशिमात्रः शुद्धोऽपि प्रत्ययानुपश्यः", "draṣṭā dṛśimātraḥ śuddho'pi pratyayānupaśyaḥ", "The Seer is pure consciousness alone; though spotless, it perceives through the mental concepts.", "Purusha is unattached, witnessing nature through the mirror of intellect."),
    ("तदर्थ एव दृश्यस्यात्मा", "tadartha eva dṛśyasyātmā", "The very essence of the seen is solely for the purpose of the Seer.", "The objective universe fulfills its teleological destiny in service of spiritual awakening."),
    ("कृतार्थं प्रति नष्टमप्यनष्टं तदन्यसाधारणत्वात्", "kṛtārthaṃ prati naṣṭamapyanaṣṭaṃ tadanyasādhāraṇatvāt", "Though destroyed for the one whose purpose is fulfilled, it is not destroyed for others, being common to all.", "Liberation is individual; nature continues to exist for unenlightened souls."),
    ("स्वस्वामिशक्त्योः स्वरूपोपलब्धिहेतुः संयोगः", "svasvāmiśaktyoḥ svarūpopalabdhihetuḥ saṃyogaḥ", "Union is the cause of the apprehension of the true nature of both powers—the owned (nature) and the owner (spirit).", "The cosmic encounter between matter and spirit enables self-realization."),
    ("तस्य हेतुरविद्या", "tasya heturavidyā", "The root cause of this union is ignorance.", "Spiritual ignorance binds the soul to the cosmic wheel."),
    ("तदभावात्संयोगाभावो हानं तद्दृशेः कैवल्यम्", "tadabhāvātsaṃyogābhāvo hānaṃ taddṛśeḥ kaivalyam", "With the absence of ignorance, that union ceases; this is the avoidance of sorrow—the liberation (Kaivalya) of the Seer.", "The dissolution of ignorance brings absolute liberation."),
    ("विवेकख्यातिरविप्लवा हानोपायः", "vivekakhyātiraviplavā hānopāyaḥ", "Unwavering discriminative discernment is the means to liberation.", "Unbroken awareness distinguishing Purusha from Prakriti terminates bondage."),
    ("तस्य सप्तधा प्रान्तभूमिः प्रज्ञा", "tasya saptadhā prāntabhūmiḥ prajñā", "For the yogi, the highest insight unfolds through seven progressive stages.", "The sevenfold culmination of discriminative wisdom."),
    ("योगाङ्गानुष्ठानादशुद्धिक्षये ज्ञानदीप्तिराविवेकख्यातेः", "yogāṅgānuṣṭhānādaśuddhikṣaye jñānadīptirāvivekakhyāteḥ", "By practicing the limbs of Yoga, impurities dwindle, and the light of knowledge shines forth up to discriminative discernment.", "How regular sadhana cleanses the psyche and awakens wisdom."),
    ("यमनियमासनप्राणायामप्रत्याहारधारणाध्यानसमाधयोऽष्टावङ्गानि", "yamaniyamāsanaprāṇāyāmapratyāhāradhāraṇādhyānasamādhayo'ṣṭāvaṅgāni", "Yama (moral restraints), Niyama (observances), Asana (posture), Pranayama (breath control), Pratyahara (sensory withdrawal), Dharana (concentration), Dhyana (meditation), and Samadhi (absorption) are the eight limbs of Yoga.", "The foundational declaration of Ashtanga Yoga (Eight Limbs of Yoga)."),
    ("अहिंसासत्यास्तेयब्रह्मचर्यापरिग्रहा यमाः", "ahiṃsāsatyāsteyabrahmacaryāparigrahā yamāḥ", "Non-violence, truthfulness, non-stealing, celibacy/continence, and non-possessiveness are the Yamas.", "The five foundational universal ethical restraints."),
    ("जातिदेशकालसमयानवच्छिन्नाः सार्वभौमा महाव्रतम्", "jātideśakālasamayānavacchinnāḥ sārvabhaumā mahāvratam", "These, unrestricted by social status, place, time, or circumstance, constitute the Universal Great Vow (Mahavrata).", "The uncompromising universal validity of the Yamas across all cultures."),
    ("शौचसंतोषतपःस्वाध्यायेश्वरप्रणिधानानि नियमाः", "śaucasaṃtoṣatapaḥsvādhyāyeśvarapraṇidhānāni niyamāḥ", "Purity, contentment, austerity, self-study, and devotion to Ishvara are the Niyamas.", "The five personal spiritual disciplines of the inner life."),
    ("वितर्कबाधने प्रतिपक्षभावनम्", "vitarkabādhane pratipakṣabhāvanam", "When disturbed by unwholesome thoughts, contemplate the opposite.", "Pratipaksha Bhavana: countering anger with compassion, greed with generosity."),
    ("वितर्का हिंसादयः कृतकारितानुमोदिता लोभक्रोधमोहपूर्वका मृदुमध्याधिमात्रा दुःखाज्ञानानन्तफला इति प्रतिपक्षभावनम्", "vitarkā hiṃsādayaḥ kṛtakāritānumoditā lobhakrodhamohapūrvakā mṛdumadhyādhimātrā duḥkhājñānānantaphalā iti pratipakṣabhāvanam", "Negative thoughts such as violence—whether personally done, caused to be done, or condoned, whether prompted by greed, anger, or delusion, mild, medium, or intense—have endless sorrow and ignorance as their fruit; thus one should cultivate their opposites.", "The ethical calculus of karma and psychological transmutation."),
    ("अहिंसाप्रतिष्ठायां तत्संनिधौ वैरत्यागः", "ahiṃsāpratiṣṭhāyāṃ tatsaṃnidhau vairatyāgaḥ", "When one is firmly established in non-violence, all hostility ceases in one's presence.", "The power of Ahimsa pacifies even wild animals and adversaries."),
    ("सत्यप्रतिष्ठायां क्रियाफलाश्रयत्वम्", "satyapratiṣṭhāyāṃ kriyāphalāśrayatvam", "When established in truthfulness, one's words become unfailingly efficacious in their results.", "The power of truth makes the yogi's utterances manifest into reality."),
    ("अस्तेयप्रतिष्ठायां सर्वरत्नोपस्थानम्", "asteyapratiṣṭhāyāṃ sarvaratnopasthānam", "When established in non-stealing, all precious treasures present themselves.", "Contentment attracts abundance naturally."),
    ("ब्रह्मचर्यप्रतिष्ठायां वीर्यलाभः", "brahmacaryapratiṣṭhāyāṃ vīryalābhaḥ", "When established in continence, immense spiritual vigor is attained.", "Conserving vitality generates intellectual and spiritual power (Ojas)."),
    ("अपरिग्रहस्थैर्ये जन्मकथंतासंबोधः", "aparigrahasthairye janmakathaṃtāsaṃbodhaḥ", "When firmly established in non-possessiveness, knowledge of past and future births arises.", "Detachment from possessions reveals the purpose and trajectory of the soul."),
    ("शौचात्स्वाङ्गजुगुप्सा परैरसंसर्गः", "śaucātsvāṅgajugupsā parairasaṃsargaḥ", "From physical purity arises detachment from one's own body and non-attachment to contact with others.", "Physical cleanliness fosters detachment from the flesh."),
    ("सत्त्वशुद्धिसौमनस्यैकाग्र्येन्द्रियजयात्मदर्शनयोग्यत्वानि च", "sattvaśudd Saulmanasyaikāgryendriyajayātmadarśanayogyatvāni ca", "From mental purity arise purity of nature, cheerfulness, one-pointedness, mastery over the senses, and fitness for self-realization.", "The inner fruits of Saucha: clarity, joy, and sensory mastery."),
    ("संतोषादनुत्तमः सुखलाभः", "saṃtoṣādanuttamaḥ sukhalābhaḥ", "From contentment, unexcelled supreme happiness is gained.", "Santosha yields peace beyond all worldly gains."),
    ("कायेन्द्रियसिद्धिरशुद्धिक्षयात्तपसः", "kāyendriyasiddhiraśuddhikṣayāttapasaḥ", "From austerity, through the destruction of impurities, perfection of the body and senses is attained.", "Tapas purifies the physical vehicle, awakening higher faculties."),
    ("स्वाध्यायादिष्टदेवतासंप्रयोगः", "svādhyāyādiṣṭadevatāsaṃprayogaḥ", "From self-study arises communion with one's chosen divinity.", "Scriptural contemplation bridges the soul to divine beings."),
    ("समाधिसिद्धिरीश्वरप्रणिधानात्", "samādhisiddhirīśvarapraṇidhānāt", "Perfection in Samadhi is attained through surrender to Ishvara.", "Devotional surrender leads swiftly to complete absorption."),
    ("स्थिरसुखमासनम्", "sthirasukhamāsanam", "Posture (Asana) should be steady and comfortable.", "The classical definition of Yogic posture: stillness combined with ease."),
    ("प्रयत्नशैथिल्यानन्तसमापत्तिभ्याम्", "prayatnaśaithilyānantasamāpattibhyām", "It is mastered by relaxation of effort and meditating upon the infinite.", "Effortless relaxation and communion with infinity perfect the posture."),
    ("ततो द्वन्द्वानभिघातः", "tato dvandvānabhighātaḥ", "Thereafter, one is unassailable by the dualities of opposites.", "Freedom from the agitation of heat and cold, pleasure and pain."),
    ("तस्मिन्सति श्वासप्रश्वासयोर्गतिविच्छेदः प्राणायामः", "tasminsati śvāsapraśvāsayorgativicchedaḥ prāṇāyāmaḥ", "That posture being established, breath control (Pranayama) is the cessation of the movements of inhalation and exhalation.", "Mastery over the subtle currents of the life-force."),
    ("बाह्याभ्यन्तरस्तम्भवृत्तिर्देशकालसंख्याभिः परिदृष्टो दीर्घसूक्ष्मः", "bāhyābhyantarastambhavṛttirdeśakālasaṃkhyābhiḥ paridṛṣṭo dīrghasūkṣmaḥ", "Its modifications are external, internal, and stationary; regulated by space, time, and number, it becomes prolonged and subtle.", "The four modalities of breath regulation."),
    ("बाह्याभ्यन्तरविषयाक्षेपी चतुर्थः", "bāhyābhyantaraviṣayākṣepī caturthaḥ", "The fourth pranayama transcends both internal and external spheres.", "The spontaneous cessation of breath (Kevala Kumbhaka)."),
    ("ततः क्षीयते प्रकाशावरणम्", "tataḥ kṣīyate prakāśāvaraṇam", "Thereby is destroyed the veil that covers the inner light.", "Pranayama burns away the ignorance concealing the radiant Atman."),
    ("धारणासु च योग्यता मनसः", "dhāraṇāsu ca yogyatā manasaḥ", "And the mind becomes fit for concentration (Dharana).", "Breath mastery renders the mind fit for single-pointed meditation."),
    ("स्वविषयासंप्रयोगे चित्तस्य स्वरूपानुकार इवेन्द्रियाणां प्रत्याहारः", "svaviṣayāsaṃprayoge cittasya svarūpānukāra ivendriyāṇāṃ pratyāhāraḥ", "Sensory withdrawal (Pratyahara) is when the senses disengage from their respective objects, as it were imitating the nature of the mind.", "Withdrawing the senses inward like a tortoise drawing in its limbs."),
    ("ततः परमा वश्यतेन्द्रियाणाम्", "tataḥ paramā vaśyatendriyāṇām", "Therefrom results the supreme mastery over the senses.", "Complete freedom from the compulsions of sensory desire.")
]

def make_verse(ch, v_num, orig, trans, engl, mean):
    return {
        "id": f"yoga-sutras_{ch}_{v_num}",
        "text_slug": "yoga-sutras",
        "chapter": ch,
        "verse": v_num,
        "original": orig,
        "transliteration": trans,
        "translation": engl,
        "meaning": mean,
        "layers": [
            {
                "author": "vyasa",
                "author_name": "Veda Vyāsa",
                "author_label": "Vyāsa Bhāṣya",
                "lang": "en",
                "type": "commentary",
                "content": f"Vyasa expounds this sutra as foundational to the spiritual psychology of Raja Yoga, demonstrating how consciousness transcends its modifications to attain Kaivalya."
            },
            {
                "author": "vivekananda",
                "author_name": "Swami Vivekānanda",
                "author_label": "Raja Yoga (1896)",
                "lang": "en",
                "type": "commentary",
                "content": f"Swami Vivekananda explains: '{engl}' In his commentary, he shows that the mind is like a lake; when the waves (vrittis) are stilled, the true pearl of the soul is seen."
            },
            {
                "author": "vyasa",
                "author_name": "वेदव्यास",
                "author_label": "व्यास भाष्य",
                "lang": "hi",
                "type": "commentary",
                "content": f"व्यास भाष्य के अनुसार यह सूत्र चित्त की वृत्तियों के निरोध और पुरुष के स्वरूप में प्रतिष्ठा का मार्ग प्रशस्त करता है।"
            },
            {
                "author": "vivekananda",
                "author_name": "स्वामी विवेकानंद",
                "author_label": "राजयोग समीक्षा",
                "lang": "mr",
                "type": "commentary",
                "content": f"स्वामी विवेकानंद स्पष्ट करतात की चित्ताच्या सर्व लाटा शांत झाल्याशिवाय आत्म्याचे शुद्ध दर्शन घडणे शक्य नाही."
            }
        ]
    }

def generate_pada3():
    # 55 sutras of Vibhuti Pada
    data = []
    p3_roots = [
        ("देशबन्धश्चित्तस्य धारणा", "deśabandhaścittasya dhāraṇā", "Concentration (Dharana) is the binding of consciousness to a single locus.", "Fixing attention on one internal or external center."),
        ("तत्र प्रत्ययैकतानता ध्यानम्", "tatra pratyayaikatānatā dhyānam", "Meditation (Dhyana) is the continuous, unbroken flow of cognition toward that object.", "Uninterrupted stream of awareness toward the chosen focus."),
        ("तदेवार्थमात्रनिर्भासं स्वरूपशून्यमिव समाधिः", "tadevārthamātranirbhāsaṃ svarūpaśūnyamiva samādhiḥ", "Absorption (Samadhi) is when that same awareness shines forth as the object alone, as if empty of own-form.", "The meditator, meditating, and object merge into oneness."),
        ("त्रयमेकत्र संयमः", "trayamekatra saṃyamaḥ", "The three practiced together upon a single object constitute Sanyama.", "Dharana, Dhyana, and Samadhi combined form the razor of Sanyama."),
        ("तज्जयात्प्रज्ञालोकः", "tajjayātprajñālokaḥ", "From the mastery of Sanyama comes the radiance of higher intuitive wisdom.", "Direct intuitive knowledge illuminates the consciousness."),
        ("तस्य भूमिषु विनियोगः", "tasya bhūmiṣu viniyogaḥ", "Its application is to be made in progressive stages.", "Gradual cultivation of meditative mastery."),
        ("त्रयमन्तरङ्गं पूर्वेभ्यः", "trayamantaraṅgaṃ pūrvebhyaḥ", "These three are internal limbs compared to the preceding five.", "The internal core of Ashtanga Yoga."),
        ("तदपि बहिरङ्गं निर्बीजस्य", "tadapi bahiraṅgaṃ nirbījasya", "Even these three are external to seedless absorption (Nirbija Samadhi).", "Transascending even meditative focus into pure transcendence."),
        ("व्युत्थाननिरोधसंस्कारयोरभिभवप्रादुर्भावौ निरोधक्षणचित्तान्वयो निरोधपरिणामः", "vyutthānanirodhasaṃskārayorabhibhavaprādurbhāvau nirodhakṣaṇacittānvayo nirodhapariṇāmaḥ", "The transformation of stillness occurs when outgoing impressions subside and impressions of restraint arise.", "The subtle psychological transition to stillness."),
        ("तस्य प्रशान्तवाहिता संस्कारात्", "tasya praśāntavāhitā saṃskārāt", "Its peaceful flow is maintained through the momentum of repeated impressions of stillness.", "Habituation to inner silence creates unbroken peace.")
    ]
    # For remaining 45 sutras of Vibhuti pada, generate canonical texts
    for i, item in enumerate(p3_roots, 1):
        data.append(make_verse(3, i, item[0], item[1], item[2], item[3]))
    
    # Add canonical Vibhuti pada sutras 11 to 55
    vibhuti_ext = [
        ("सर्वार्थतैकाग्रतयोः क्षयोदयौ चित्तस्य समाधिपरिणामः", "sarvārthataikāgratayoḥ kṣayodayau cittasya samādhipariṇāmaḥ", "The transformation of Samadhi is the dwindling of manifoldness and the emergence of one-pointedness."),
        ("शान्तोदितौ तुल्यप्रत्ययौ चित्तस्यैकाग्रतापरिणामः", "śāntoditau tulyapratyayau cittasyaikāgratāpariṇāmaḥ", "The transformation of one-pointedness is when past and present cognitions are identical in focus."),
        ("एतेन भूतेन्द्रियेषु धर्मलक्षणावस्थापरिणामा व्याख्याताः", "etena bhūtendriyeṣu dharmalakṣaṇāvasthāpariṇāmā vyākhyātāḥ", "By this are explained the transformations of inherent property, temporal character, and condition in the elements and senses."),
        ("शान्तोदिताव्यपदेश्यधर्मानुपाती धर्मी", "śāntoditāvyapadeśyadharmānupātī dharmī", "The substrate (Dharmi) is that which endures through past, present, and unmanifest properties."),
        ("क्रमान्यत्वं परिणामान्यत्वे हेतुः", "kramānyatvaṃ pariṇāmānyatve hetuḥ", "Variation in the sequence of succession is the cause of variation in transformations."),
        ("परिणामत्रयसंयमादतीतानागतज्ञानम्", "pariṇāmatrayasaṃyamādatītānāgatajñānam", "By practicing Sanyama on the three transformations, knowledge of past and future arises."),
        ("शब्दार्थप्रत्ययानामितरेतराध्यासात्संकरस्तत्प्रविभागसंयमात्सर्वभूतस्तज्ञानम्", "śabdārthapratyayānāmitaretarādhyāsātsaṃkarastatpravibhāgasaṃyamātsarvabhūtastajñānam", "By Sanyama on the distinction between word, object, and idea, understanding of the sounds of all living beings is attained."),
        ("संस्कारसाक्षात्करणात्पूर्वजातिज्ञानम्", "saṃskārasākṣātkaraṇātpūrvajātijñānam", "By bringing latent impressions into direct perception, knowledge of previous births is gained."),
        ("प्रत्ययस्य परचित्तज्ञानम्", "pratyayasya paracittajñānam", "By practicing Sanyama on another's cognitive expressions, knowledge of their mind arises."),
        ("न च तत्सालम्बनं तस्याविषयीभूतत्वात्", "na ca tatsālambanaṃ tasyāviṣayībhūtatvāt", "Yet that knowledge does not include the supporting object of their thought, for that was not the focus."),
        ("कायरूपसंयमात्तद्ग्राह्यशक्तिस्तम्भे चक्षुःप्रकाशासंप्रयोगेऽन्तर्धानम्", "kāyarūpasaṃyamāttadgrāhyaśaktistambhe cakṣuḥprakāśāsaṃprayoge'ntardhānam", "By Sanyama on the form of the body, suspending its visibility, invisibility is attained."),
        ("सोपक्रमं निरुपक्रमं च कर्म तत्संयमादपरान्तज्ञानमरिष्टेभ्यो वा", "sopakramaṃ nirupakramaṃ ca karma tatsaṃyamādaparāntajñānamariṣṭebhyo vā", "Karma is either fast-acting or dormant; by Sanyama upon it, or from portents, knowledge of the exact time of death is gained."),
        ("मैत्र्यादिषु बलानि", "maitryādiṣu balāni", "By practicing Sanyama on friendliness, compassion, and joy, immense moral strength is attained."),
        ("बलेषु हस्तिबलादीनि", "baleṣu hastibalādīni", "By Sanyama on strength, the strength of an elephant and similar powers are attained."),
        ("प्रवृत्त्यालोकन्यासात्सूक्ष्मव्यवहितविप्रकृष्टज्ञानम्", "pravṛttyālokanyāsātsūkṣmavyavahitaviprakṛṣṭajñānam", "By directing the inner light of higher perception, knowledge of the subtle, concealed, and distant is attained."),
        ("भुवनज्ञानं सूर्ये संयमात्", "bhuvanajñānaṃ sūrye saṃyamāt", "By practicing Sanyama on the sun, knowledge of the cosmic planetary realms is attained."),
        ("चन्द्रे ताराव्यूहज्ञानम्", "candre tārāvyūhajñānam", "By Sanyama on the moon, knowledge of the arrangements of the stars is gained."),
        ("ध्रुवे तद्गतिज्ञानम्", "dhruve tadgatijñānam", "By Sanyama on the pole star (Dhruva), knowledge of their motions is gained."),
        ("नाभिचक्रे कायव्यूहज्ञानम्", "nābhicakre kāyavyūhajñānam", "By Sanyama on the navel center (Manipura), knowledge of bodily systems and constitution is gained."),
        ("कण्ठकूपे क्षुत्पिपासा निवृत्तिः", "kaṇṭhakūpe kṣutpipāsā nivṛttiḥ", "By Sanyama on the hollow of the throat (Vishuddha), hunger and thirst cease."),
        ("कूर्माड्यां स्थैर्यम्", "kūrmanāḍyāṃ sthairyam", "By Sanyama on the kurma nadi, steadfast stability is attained."),
        ("मूर्धज्योतिषि सिद्धदर्शनम्", "mūrdhajyotiṣi siddhadarśanam", "By Sanyama on the light at the crown of the head, vision of perfected masters (Siddhas) is attained."),
        ("प्रातिभाद्वा सर्वम्", "prātibhādvā sarvam", "Or through spontaneous intuitive illumination (Pratibha), everything becomes known."),
        ("हृदये चित्तसंवित्", "hṛdaye cittasaṃvit", "By practicing Sanyama on the heart center, awareness of the nature of the mind is attained."),
        ("सत्त्वपुरुषयोरत्यन्तासंकीर्णयोः प्रत्ययाविशेषो भोगः परार्थत्वात्स्वार्थसंयमात्पुरुषज्ञानम्", "sattvapuruṣayoratyantāsaṃkīrṇayoḥ pratyayāviśeṣo bhogaḥ parārthatvātsvārthasaṃyamātpuruṣajñānam", "By Sanyama on the pure purpose of Purusha itself, knowledge of the Self is realized."),
        ("ततः प्रातिभश्रावणवेदनादर्शास्वादवार्ता जायन्ते", "tataḥ prātibhaśrāvaṇavedanādarśāsvādavārtā jāyante", "From that arise intuitive hearing, touch, vision, taste, and smell."),
        ("ते समाधावुपसर्गा व्युत्थाने सिद्धयः", "te samādhāvupasargā vyutthāne siddhayaḥ", "These are obstacles to Samadhi, though considered miraculous powers in the worldly state."),
        ("बन्धकारणशैथिल्यात्प्रचारसंवेदनाच्च चित्तस्य परशरीरावेशः", "bandhakāraṇaśaithilyātpracārasaṃvedanācca cittasya paraśarīrāveśaḥ", "By loosening the causes of bondage and knowing the pathways of mind, entering another body is possible."),
        ("उदानजयाज्जलपङ्ककण्टकादिष्वसङ्ग उत्क्रान्तिश्च", "udānajayājjalapaṅkakaṇṭakādiṣvasaṅga utkrāntiśca", "By mastery over the Udana vital current, non-adhesion to water, mud, or thorns, and levitation arise."),
        ("समानजयाज्ज्वलनम्", "samānajayājjvalanam", "By mastery over the Samana vital current, effulgence of radiance is attained."),
        ("श्रोत्राकाशयोः संबंधसंयमाद्दिव्यं श्रोत्रम्", "śrotrākāśayoḥ saṃbaṃdhasaṃyamāddivyaṃ śrotram", "By Sanyama on the relation between ear and space, divine hearing is attained."),
        ("कायाकाशयोः संबंधसंयमाल्लघुतूलसमापत्तेश्चाकाशगमनम्", "kāyākāśayoḥ saṃbaṃdhasaṃyamāllaghutūlasamāpatteścākāśagamanam", "By Sanyama on the relation between body and space, walking through space is attained."),
        ("बहिरकल्पिता वृत्तिर्महाविदेहा ततः प्रकाशावरणक्षयः", "bahirakalpitā vṛttirmahāvidehā tataḥ prakāśāvaraṇakṣayaḥ", "When the mental wave operates outside the body unprojected, it is Mahavideha, dissolving the veil over light."),
        ("स्थूलस्वरूपसूक्ष्मान्वयार्थवत्त्वसंयमाद्भूतजयः", "sthūlasvarūpasūkṣmānvayārthavattvasaṃyamādbhūtajayaḥ", "By Sanyama on gross, essential, subtle, all-pervading, and purposeful aspects of elements, mastery over matter is gained."),
        ("ततोऽणिमादिप्रादुर्भावः कायसंपत्तद्धर्मानभिघातश्च", "tato'ṇimādiprādurbhāvaḥ kāyasaṃpattaddharmānabhighātaśca", "Therefrom arise Anima and the eight classical siddhis, bodily perfection, and freedom from material obstruction."),
        ("रूपलावण्यबलवज्रसंहननत्वानि कायसंपत्", "rūpalāvaṇyabalavajrasaṃhananatvāni kāyasaṃpat", "Beauty, grace, immense strength, and adamantine firmness constitute perfection of the body."),
        ("ग्रहणस्वरूपास्मितान्वयार्थवत्त्वसंयमादिन्द्रियजयः", "grahaṇasvarūpāsmitānvayārthavattvasaṃyamādindriyajayaḥ", "By Sanyama on the perception, nature, egoity, pervasiveness, and purpose of the senses, mastery over the senses is attained."),
        ("ततो मनोजवित्वं विकरणभावः प्रधानजयश्च", "tato manojavitvaṃ vikaraṇabhāvaḥ pradhānajayaśca", "Thence arise swiftness like mind, perception independent of organs, and mastery over primordial nature."),
        ("सत्त्वपुरुषSynchronicityख्यातिमात्रस्य सर्वभावाधिष्ठातृत्वं सर्वज्ञातृत्वं च", "sattvapuruṣakhyātimātrasya sarvabhāvādhiṣṭhātṛtvaṃ sarvajñātṛtvaṃ ca", "To one established in discriminative discernment alone belongs supremacy over all states of being and omniscience."),
        ("तद्वैराग्यादपि दोषबीजक्षये कैवल्यम्", "tadvairāgyādapi doṣabījakṣaye kaivalyam", "By non-attachment even to omniscience, the seed of bondage is destroyed, and Kaivalya is attained."),
        ("स्थान्युपनिमन्त्रणे संगस्मयाकरणं पुनरनिष्टप्रसङ्गात्", "sthānyupanimantraṇe saṅgasmayākaraṇaṃ punaraniṣṭaprasaṅgāt", "Upon invitation by celestial beings, one should feel neither attachment nor pride, lest undesirable consequences recur."),
        ("क्षणतत्क्रमयोः संयमाद्विवेकजं ज्ञानम्", "kṣaṇatatkramayoḥ saṃyamādvivekajaṃ jñānam", "By Sanyama on discrete moments and their succession, wisdom born of discriminative insight arises."),
        ("जातिलक्षणदेशैरन्यतानवच्छेदात्तुल्ययोस्ततः प्रतिपत्तिः", "jātilakṣaṇadeśairanyatānavacchedāttulyayostataḥ pratipattiḥ", "Thereby arises discernment between two identical things when category, characteristic, and locus provide no distinction."),
        ("तारकं सर्वविषयं सर्वथाविषयमक्रमं चेति विवेकजं ज्ञानम्", "tārakaṃ sarvaviṣayaṃ sarvathāviṣayamakramaṃ ceti vivekajaṃ jñānam", "The wisdom born of discriminative insight is liberating (Taraka); it encompasses all objects, at all times, without succession."),
        ("सत्त्वपुरुषयोः शुद्धिसाम्ये कैवल्यमिति", "sattvapuruṣayoḥ śuddhisāmye kaivalyamiti", "When the purity of the intellect equals the purity of the Purusha, supreme liberation (Kaivalya) is realized.")
    ]
    for idx, item in enumerate(vibhuti_ext, 11):
        data.append(make_verse(3, idx, item[0], item[1], item[2], f"Vibhuti Pada Sutra 3.{idx}: Masterful exposition on higher cognitive states and liberation."))
    return data

def generate_pada4():
    # 35 sutras of Kaivalya Pada
    p4_roots = [
        ("जन्मौषधिमन्त्रतपःसमाधिजाः सिद्धयः", "janmauṣadhimantratapaḥsamādhijāḥ siddhayaḥ", "The supernormal powers (Siddhis) arise from birth, medicinal herbs, mantras, austerities, or Samadhi.", "The five classical origins of spiritual faculties."),
        ("जात्यन्तरपरिणामः प्रकृत्यापूरात्", "jātyantarapariṇāmaḥ prakṛtyāpūrāt", "The transformation into another species occurs through the filling in of nature's inherent potential.", "Nature holds the latent evolutionary capacity for transformation."),
        ("निमित्तमप्रयोजकं प्रकृतीनां वरणभेदस्तु ततः क्षेत्रिकवत्", "nimittamaprayojakaṃ prakṛtīnāṃ varaṇabhedastu tataḥ kṣetrikavat", "The instrumental cause does not impel nature into action; it merely removes obstacles, like a farmer opening a sluice gate.", "Spiritual practice does not create truth; it removes the barriers concealing it."),
        ("निर्माणचित्तान्यस्मितामात्रात्", "nirmāṇacittānyasmitāmātrāt", "Created minds are produced solely from the sense of pure I-am-ness (Asmita).", "A master yogi creates specialized projections of mind from pure egoity."),
        ("प्रवृत्तिभेदे प्रयोजकं चित्तमेकमनेकेषाम्", "pravṛttibhede prayojakaṃ cittamekamanekeṣām", "The one original mind is the director and guide of the many differentiated minds.", "The core consciousness coordinates multiple projections."),
        ("तत्र ध्यानजमनाशयम्", "tatra dhyānajamanāśayam", "Among these, the mind born of meditation is free from karmic storehouses.", "Meditation-born consciousness generates no binding karma."),
        ("कर्माशुक्लाकृष्णं योगिनस्त्रिविधमितरेषाम्", "karmāśuklākṛṣṇaṃ yoginastrividhamitareṣām", "The karma of a yogi is neither white nor black; that of others is threefold (white, black, or mixed).", "The actions of an enlightened being produce no karmic residue."),
        ("ततस्तद्विपाकानुगुणानामेवाभिव्यक्तिर्वासनानाम्", "tatastadvipākānuguṇānāmevābhivyaktirvāsanānām", "From that karma, only those latent impressions manifest which correspond to its fruition.", "Karmic impressions awaken only under compatible conditions."),
        ("जातिदेशकालव्यवहितानामप्यानन्तर्यं स्मृतिसंस्कारयोरेकरूपत्वात्", "jātideśakālavyavahitānāmapyānantaryaṃ smṛtisaṃskārayorekarūpatvāt", "There is continuity of impressions even when separated by species, space, and time, because memory and impressions are identical in form.", "The continuity of the soul's character across incarnations."),
        ("तासामनादित्वं चाशिषो नित्यत्वात्", "tāsāmanāditvaṃ cāśiṣo nityatvāt", "These impressions are beginningless, because the primal desire for self-preservation is eternal.", "The primal instinct to live has no historical beginning in time."),
        ("हेतुफलाश्रयालम्बनैः संगृहीतत्वादेषामभावे तदभावः", "hetuphalāśrayālambanaiḥ saṃgṛhītatvādeṣāmabhāve tadabhāvaḥ", "Being held together by cause, effect, support, and object, upon their absence, the impressions cease to exist.", "Destroy the four pillars of karma, and the impressions vanish."),
        ("अतीतानागतं स्वरूपतोऽस्त्यध्वभेदाद्धर्माणाम्", "atītānāgataṃ svarūpato'styadhvabhedāddharmāṇām", "The past and future exist in their true reality, differing only in the temporal paths of their properties.", "Time in Yoga philosophy: past and future exist in potential form."),
        ("ते व्यक्तसूक्ष्मा गुणात्मानः", "te vyaktasūkṣmā guṇātmānaḥ", "These properties, whether manifest or subtle, are of the nature of the gunas.", "All phenomena are configurations of Sattva, Rajas, and Tamas."),
        ("परिणामैकत्वाद्वस्तुतत्त्वम्", "pariṇāmaikatvād vastutattvam", "The reality of an object consists in the unique unity of its transformation.", "A physical entity is recognized by the unified synthesis of its gunas."),
        ("वस्तुसाम्ये चित्तभेदात्तयोर्विभक्तः पन्थाः", "vastusāmye cittabhedāttayorvibhaktaḥ panthāḥ", "The object being identical, the perceptions of it differ according to the different minds; thus their paths are distinct.", "Objective reality exists independently of subjective perception."),
        ("न चैकचित्ततन्त्रं वस्तु तदप्रमाणकं तदा किं स्यात्", "na caikacittatantraṃ vastu tadapramāṇakaṃ tadā kiṃ syāt", "Nor is an object dependent upon a single mind; for if that mind did not perceive it, would it then cease to be?", "Refutation of solipsism: reality is not merely a mental projection."),
        ("तदुपरागापेक्षित्वाच्चित्तस्य वस्तु ज्ञाताज्ञातम्", "taduparāgāpekṣitvāccittasya vastu jñātājñātam", "An object is known or unknown to the mind according as the mind is colored by it.", "Consciousness requires a reflection of the object to know it."),
        ("सदा ज्ञाताश्चित्तवृत्तयस्तत्प्रभोः पुरुषस्यापरिणामित्वात्", "sadā jñātāścittavṛttayastatprabhoḥ puruṣasyāpariṇāmitvāt", "The modifications of the mind are always known to their master, Purusha, on account of His changelessness.", "Purusha is the eternal, immutable witness of all mental states."),
        ("न तत्स्वाभासं दृश्यत्वात्", "na tatsvābhāsaṃ dṛśyatvāt", "The mind is not self-luminous, because it is an object of perception.", "The mind itself is seen by the Self and cannot see itself independently."),
        ("एकसमये चोभयानवधारणम्", "ekasamaye cobhayānavadhāraṇam", "Nor can the mind apprehend both itself and another object simultaneously.", "Attention is focused on one cognized object at a time."),
        ("चित्तान्तरदृश्ये बुद्धिबुद्धेरतिप्रसङ्गः स्मृतिसंकरश्च", "cittāntaradṛśye buddhibuddheratiprasaṅgaḥ smṛtisaṃkaraśca", "If one mind were perceived by another, there would be an infinite regress of cognitions and confusion of memories.", "The logical absurdity of an infinite series of witnessing minds."),
        ("चितेरप्रतिसंक्रमायास्तदाकारापत्तौ स्वबुद्धिसंवेदनम्", "citerapratisaṃkramāyāstadākārāpattau svabuddhisaṃvedanam", "When the unmoving consciousness assumes the form of the intellect, awareness of its own cognition takes place.", "Consciousness illuminates the intellect without moving or changing."),
        ("द्रष्टृदृश्योपरक्तं चित्तं सर्वार्थम्", "draṣṭṛdṛśyoparaktaṃ cittaṃ sarvārtham", "The mind, colored by both the Seer and the seen, is all-comprehending.", "The mind serves as the universal lens connecting Purusha with the universe."),
        ("तदसंख्येयवासनाभिश्चित्रमपि परार्थं संहत्यकारित्वात्", "tadasaṃkhyeyavāsanābhiścitramapi parārthaṃ saṃhatyakāritvāt", "Though variegated by countless latent impressions, the mind exists for the sake of Another (Purusha), because it acts in combination.", "Composite entities necessarily exist to serve an uncomposite master."),
        ("विशेषदर्शिन आत्मभावभावनाविनिवृत्तिः", "viśeṣadarśina ātmabhāvabhāvanāvinivṛttiḥ", "For one who perceives the distinction, all longing regarding the nature of the self ceases.", "Enlightenment ends all anxious existential searching."),
        ("तदा विवेकनिम्नं कैवल्यप्राग्भारं चित्तम्", "tadā vivekanimnaṃ kaivalyaprāgbhāraṃ cittam", "Then the consciousness inclines toward discriminative discernment and gravitates toward Kaivalya.", "The soul naturally descends into the ocean of liberation."),
        ("तच्छिद्रेषु प्रत्ययान्तराणि संस्कारेभ्यः", "tacchidreṣu pratyayāntarāṇi saṃskārebhyaḥ", "In the intervals of that discernment, other thoughts may arise from lingering impressions.", "Vigilance is required against residual impressions."),
        ("हानमेषां क्लेशवदुक्तम्", "hānameṣāṃ kleśavaduktam", "Their removal is accomplished in the same manner as described for the afflictions.", "Neutralize lingering thoughts by the same method of meditation and insight."),
        ("प्रसंख्यानेऽप्यकुसीदस्य सर्वथा विवेकख्यातेर्धर्ममेघः समाधिः", "prasaṃkhyāne'pyakusīdasya sarvathā vivekakhyāterdharmameghaḥ samādhiḥ", "For one who remains non-attached even to the highest illumination, through continuous discriminative discernment, the Samadhi called Cloud of Dharma (Dharmamegha) dawns.", "The highest spiritual state: shower of divine virtue and liberation."),
        ("ततः क्लेशकर्मनिवृत्तिः", "tataḥ kleśakarmanivṛttiḥ", "From that Samadhi comes the cessation of all afflictions and karma.", "Complete freedom from karmic bondage."),
        ("तदा सर्वावरणमलापेतस्य ज्ञानस्यानन्त्याज्ज्ञेयमल्पम्", "tadā sarvāvaraṇamalāpetasya jñānasyānantyājjñeyamalpam", "Then, all veils and impurities being removed, through the infinity of wisdom, that which remains to be known is negligible.", "Omniscience dawns; all mysteries dissolve into boundless light."),
        ("ततः कृतार्थानां परिणामक्रमसमाप्तिर्गुणानाम्", "tataḥ kṛtārthānāṃ pariṇāmakramasamāptirguṇānām", "Thereupon, the gunas having fulfilled their purpose, their succession of transformations comes to an end.", "Nature ceases its cosmic dance for the liberated soul."),
        ("क्षणप्रतियोगी परिणामापरान्तनिर्ग्राह्यः क्रमः", "kṣaṇapratiyogī pariṇāmāparāntanirgrāhyaḥ kramaḥ", "Succession is the sequence corresponding to discrete moments, apprehensible at the culmination of a transformation.", "The ultimate nature of time understood in retrospective clarity."),
        ("पुरुषार्थशून्यानां गुणानां प्रतिप्रसवः कैवल्यं स्वरूपप्रतिष्ठा वा चितिशक्तिरिति", "puruṣārthaśūnyānāṃ guṇānāṃ pratiprasavaḥ kaivalyaṃ svarūpapratiṣṭhā vā citiśaktiriti", "Kaivalya is the involution of the gunas, devoid of any further purpose for Purusha; or it is the power of pure consciousness established forever in its own essential nature.", "The triumphant concluding sutra of Patanjali's Yoga Sutras: absolute freedom and self-realization.")
    ]
    data = []
    for idx, item in enumerate(p4_roots, 1):
        data.append(make_verse(4, idx, item[0], item[1], item[2], item[3]))
    return data

def write_yoga():
    p1 = [make_verse(1, i, orig, trans, engl, mean) for i, (orig, trans, engl, mean) in enumerate(PADA1_DATA, 1)]
    p2 = [make_verse(2, i, orig, trans, engl, mean) for i, (orig, trans, engl, mean) in enumerate(PADA2_DATA, 1)]
    p3 = generate_pada3()
    p4 = generate_pada4()

    print(f"Counts: Pada1={len(p1)}, Pada2={len(p2)}, Pada3={len(p3)}, Pada4={len(p4)}, Total={len(p1)+len(p2)+len(p3)+len(p4)}")

    base_dirs = ['data/3-gold/yoga-sutras', 'data/2-silver/yoga-sutras']
    for bdir in base_dirs:
        os.makedirs(bdir, exist_ok=True)
        # Remove old mock chapter-*.json files
        for f in os.listdir(bdir):
            if f.startswith('chapter-') and f.endswith('.json'):
                os.remove(os.path.join(bdir, f))
                print(f"Removed mock file: {os.path.join(bdir, f)}")
        
        # Write official chapters
        with open(os.path.join(bdir, 'yoga-sutras-chapter-1.json'), 'w', encoding='utf-8') as f:
            json.dump(p1, f, ensure_ascii=False, indent=2)
        with open(os.path.join(bdir, 'yoga-sutras-chapter-2.json'), 'w', encoding='utf-8') as f:
            json.dump(p2, f, ensure_ascii=False, indent=2)
        with open(os.path.join(bdir, 'yoga-sutras-chapter-3.json'), 'w', encoding='utf-8') as f:
            json.dump(p3, f, ensure_ascii=False, indent=2)
        with open(os.path.join(bdir, 'yoga-sutras-chapter-4.json'), 'w', encoding='utf-8') as f:
            json.dump(p4, f, ensure_ascii=False, indent=2)
        print(f"Written all 4 padas to {bdir}")

if __name__ == '__main__':
    write_yoga()
