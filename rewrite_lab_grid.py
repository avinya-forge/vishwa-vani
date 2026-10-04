import re

with open("app/lab/page.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Replace the simple grid with a bento grid wrapper
old_grid = r'<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">.*?</main>'

new_grid = """<div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 items-stretch auto-rows-fr">
           <div className="col-span-1 md:col-span-4 lg:col-span-4 row-span-2 h-full"><PranayamaTimer /></div>
           <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 h-full"><AkshauhiniCalc /></div>
           <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 h-full"><VedicInstruments /></div>
           
           <div className="col-span-1 md:col-span-2 lg:col-span-3 row-span-1 h-full"><KarmaYogaSimulator /></div>
           <div className="col-span-1 md:col-span-2 lg:col-span-3 row-span-1 h-full"><JnanaYogaExplorer /></div>
           
           <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 h-full"><BhaktiYogaCompass /></div>
           <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 h-full"><DharmaDecisionMatrix /></div>
           <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 h-full"><TimeConsciousnessWheel /></div>

           <div className="col-span-1 md:col-span-4 lg:col-span-3 row-span-1 h-full"><DivineQualitiesAssessment /></div>
           <div className="col-span-1 md:col-span-4 lg:col-span-3 row-span-1 h-full"><MeditationStateTracker /></div>

           <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 h-full"><AstroExplorer /></div>
           <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 h-full"><ChhandaAnalyzer /></div>
           <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 h-full"><CharacterRelationshipMap /></div>

           <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 h-full"><GrammarTokenizer /></div>
           <div className="col-span-1 md:col-span-2 lg:col-span-4 row-span-1 h-full"><IshaContemplationGuide /></div>

           {/* Remaining items default to 2 columns in large view */}
           {[
             <ArjunasCrisisCounselor key="1"/>,
             <GunaBalancingSimulator key="2"/>,
             <MokshaPathwaysEngine key="3"/>,
             <MokshaPathNavigator key="4"/>,
             <YogaMindControl key="5"/>,
             <BhagavataBhaktiFlow key="6"/>,
             <KenaSensoryInquiry key="7"/>,
             <SanyasaParadoxResolver key="8"/>,
             <VisvarupaContemplation key="9"/>,
             <RoyalScienceDecoder key="10"/>,
             <JnanaProgressionPath key="11"/>,
             <PurushottamaSelfInquiry key="12"/>,
             <DharmicConflictResolver key="13"/>,
             <VerseGunaAnalyzer key="14"/>,
             <CommentaryComparisonTool key="15"/>,
             <MarathiHeritageExplorer key="16"/>,
             <KenaInquiryLab key="17"/>,
             <ConsciousnessStateMapper key="18"/>,
             <VishnuPuranaCosmicExplorer key="19"/>
           ].map((Comp, i) => (
             <div key={i} className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 h-full">
               {Comp}
             </div>
           ))}
        </div>
      </div>
    </main>"""

text = re.sub(old_grid, new_grid, text, flags=re.DOTALL)

with open("app/lab/page.tsx", "w", encoding="utf-8") as f:
    f.write(text)
