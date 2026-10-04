import re

with open("app/layout.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Using literal replace for the images blocks
og_images_block = """images: [
        {
          url: absoluteUrl('/og-image.jpg'),
          width: 1200,
          height: 630,
          alt: 'Vishwa-Vani - The Universal Repository of Vedic Wisdom'
        }
      ]"""

twitter_images_block = "images: [absoluteUrl('/twitter-image.jpg')]"

text = text.replace(og_images_block, "")
text = text.replace(twitter_images_block, "")

with open("app/layout.tsx", "w", encoding="utf-8") as f:
    f.write(text)
