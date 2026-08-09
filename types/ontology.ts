/**
 * FEAT-SEM-001: Tattva Ontology Schema
 * Defines the core semantic concepts (Tattvas) used across the Vedic Library
 * to build the Ontological Knowledge Graph.
 */

export interface VerseCoordinate {
  /** The unique slug of the text (e.g., 'bhagavad-gita') */
  textSlug: string;
  /** The chapter number (or Mandala/Parva/Pada depending on text type) */
  chapter: number;
  /** The verse or sutra number */
  verse: number;
  /** The original text of the verse */
  original?: string;
  /** A short preview of the translated text for UI popups */
  preview?: string;
  /** Relevance score for this linkage (0 to 1) */
  relevance?: number;
}

export interface TattvaLink {
  /** Target verse coordinate */
  target: VerseCoordinate;
  /** The type of relationship (e.g., 'defines', 'expands', 'contradicts', 'analogous') */
  relationshipType: 'defines' | 'expands' | 'references' | 'analogous' | 'contrast';
  /** Optional explanation of why this link exists */
  rationale?: string;
}

export interface Tattva {
  /** Unique identifier for the concept (e.g., 'dharma', 'karma', 'atman') */
  id: string;
  /** Primary label in English (e.g., 'Dharma') */
  label: string;
  /** Primary label in Sanskrit/Devanagari (e.g., 'धर्म') */
  sanskritLabel: string;
  /** Comprehensive definition or philosophical overview */
  definition: string;
  /** Secondary or related terms */
  synonyms: string[];
  /** Categorical grouping (e.g., 'metaphysics', 'ethics', 'ritual') */
  category: 'metaphysics' | 'ethics' | 'ritual' | 'cosmology' | 'psychology' | 'theology' | 'epistemology';
  /** Primary scripture references forming the core basis of this Tattva */
  primarySources: VerseCoordinate[];
  /** Elaborated linkages bridging multiple scriptures */
  crossReferences: TattvaLink[];
}

export interface OntologyRegistry {
  /** Semantic graph version */
  version: string;
  /** Last updated timestamp */
  lastUpdated: string;
  /** Map of all Tattvas indexed by their ID */
  tattvas: Record<string, Tattva>;
}
