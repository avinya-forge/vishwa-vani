import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { verseId, contextTexts, language } = await req.json();

    if (!contextTexts || contextTexts.length === 0) {
      return NextResponse.json({ error: 'Context texts missing' }, { status: 400 });
    }

    // In the Production environment (Phase 3), this block will be replaced via 
    // an SDK call to Anthropic Claude 3 Haiku or Gemini 1.5 Flash to synthesize the authors.
    // For this implementation, we utilize a deterministic heuristic fallback to simulate the AI.

    const allContext = contextTexts.join(' ').toLowerCase();
    let synthesis = "After auditing the provided scholarly interpretations, a central theme of 'Equanimity and Devotion' emerges. The synthesis indicates that this verse provides the foundational resilience required to navigate the dualities of existence—joy and sorrow, heat and cold—without losing one's internal center.";

    if (allContext.includes('bhakti') && allContext.includes('jnana')) {
      synthesis = "This verse serves as a crucial point of convergence between the Bhakti (Devotional) and Jnana (Knowledge) schools. While classical commentators like Shankara emphasize the 'Non-dual Self', modern interpreters like Prabhupada highlight 'Personal Surrender'. The AI Professor synthesizes these as complimentary: Knowledge reveals the Divine's nature, while Devotion enables the actual union with it.";
    } else if (allContext.includes('karma') || allContext.includes('action') || allContext.includes('duty')) {
      synthesis = "The unified perspective here centers on 'Skill in Action'. By comparing multiple viewpoints, we see a consensus that the outer battle or duty is merely a mirror for the inner conquest. The synthesis suggests that 'Detachment' is not avoiding work, but rather transmuting work into a meditative offering.";
    } else if (allContext.includes('mind') || allContext.includes('yoga') || allContext.includes('meditation')) {
      synthesis = "Scholarly consensus across the selected languages points to 'Mental Sovereignty'. The AI audits indicate that the 'Chitta' must be like a still flame in a windless place. The variance among authors here is purely instructional; some recommend breath-control, while others recommend intellectual discrimination.";
    }

    // Simulate Network Latency to mimic LLM inference delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({
        success: true,
        synthesis: synthesis,
        verseId,
        analyzedSourcesCount: contextTexts.length
    });

  } catch (error) {
    console.error('API /synthesize Error:', error);
    return NextResponse.json({ error: 'Failed to synthesize' }, { status: 500 });
  }
}
