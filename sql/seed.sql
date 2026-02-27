-- Insert Dictionary Entries
-- Using root_word 'Aum' but original word 'Cm' (Aum symbol)

DO $$ 
DECLARE 
    id_om uuid; 
    id_namaste uuid; 
    id_gp uuid; 
    id_tv uuid; 
    id_pr uuid; 
    id_tt uuid;
BEGIN

    -- 1. Dictionary Inserts
    INSERT INTO public.dictionary (root_word, meaning_en, meaning_hi, meaning_mr, metadata) VALUES 
      ('Aum', 'The primal sound', 'Brahm', 'Onkar', '{"type": "mystic_syllable"}') RETURNING id INTO id_om;

    INSERT INTO public.dictionary (root_word, meaning_en, meaning_hi, meaning_mr, metadata) VALUES 
      ('Namaste', 'Salutations to you', 'Namaskar', 'Namaskar', '{"grammar": "compound"}') RETURNING id INTO id_namaste;

    INSERT INTO public.dictionary (root_word, meaning_en, meaning_hi, meaning_mr, metadata) VALUES 
      ('Ganapataye', 'To Ganapati', 'Ganapati ko', 'Ganapatila', '{"case": "dative", "gender": "masculine"}') RETURNING id INTO id_gp;

    INSERT INTO public.dictionary (root_word, meaning_en, meaning_hi, meaning_mr, metadata) VALUES 
      ('Twameva', 'You alone', 'Tum hi', 'Tu ch', '{"sandhi": "tvam + eva"}') RETURNING id INTO id_tv;

    INSERT INTO public.dictionary (root_word, meaning_en, meaning_hi, meaning_mr, metadata) VALUES 
      ('Pratyaksham', 'Perceptible/Visible', 'Pratyaksh', 'Pratyaksh', '{"adj": "qualifier"}') RETURNING id INTO id_pr;

    INSERT INTO public.dictionary (root_word, meaning_en, meaning_hi, meaning_mr, metadata) VALUES 
      ('Tattvamasi', 'You are that essence', 'Woh tatva tum ho', 'Te tatva tu ahes', '{"philosophy": "advaita"}') RETURNING id INTO id_tt;


    -- 2. Shloka Insert using fetched IDs
    INSERT INTO public.shlokas (deity, source_text, verse_index, sanskrit_text, word_mapping) VALUES (
      'Ganesha',
      'Ganapati Atharvashirsha',
      1,
      'Cm Namaste Ganapataye. Twameva Pratyaksham Tattvamasi.',
      jsonb_build_array(
        jsonb_build_object('original_word', 'Cm', 'word_id_ref', id_om),
        jsonb_build_object('original_word', 'Namaste', 'word_id_ref', id_namaste),
        jsonb_build_object('original_word', 'Ganapataye', 'word_id_ref', id_gp),
        jsonb_build_object('original_word', ' Twameva', 'word_id_ref', id_tv),  -- Note spaces if not handled by UI trim
        jsonb_build_object('original_word', ' Pratyaksham', 'word_id_ref', id_pr),
        jsonb_build_object('original_word', ' Tattvamasi', 'word_id_ref', id_tt)
      )
    );

END $$;
