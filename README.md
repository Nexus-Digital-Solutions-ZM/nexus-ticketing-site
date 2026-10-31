# Nexus Ticketing website

Static marketing site for Nexus Ticketing, by Nexus Digital Solutions (Lusaka).
No build step: `index.html` is the page; the brand files sit beside it.

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: Add New > Project > import the repository. Framework preset: Other. Leave build and output settings empty.
3. Project > Settings > Domains: add the domain you want to use.
4. At the DNS provider, add the records Vercel shows for that domain.

## Edit

- Text and layout: `index.html`
- Contact address: search for `hello@nexusticketing.online` (the mailbox, the mailto links and the enquiry form's error message)
- Enquiry pop-up: the `<dialog id="enquiry">` in `index.html`. Web3Forms (free, 250 a month) emails each submission to hello@, which forwards to the team. The access key is in a hidden field; a new key from web3forms.com replaces it.
- Search and sharing details: the `<meta>` tags at the top of `index.html`

## Rules for this site

- Do not claim DPC registration until the registration is issued.
- Do not publish case studies or quotes until they are real and approved.
- Sample screens and tickets are labelled as samples. Keep them labelled.

## Brand

Follows the Nexus Ticketing Brand Kit v1.0 (see the kit's `Nexus_Ticketing_Brand_Guide.pdf`).

- Colours: navy `#0A1628`, blue `#1A3C6E`, cyan `#00AACC`, gold `#E8A020`, white, grey `#F5F5F5`. They are set at the top of the `<style>` block in `index.html`.
- Type: Courier New Bold for headings and labels, Arial for body text. Courier Prime loads as a fallback where Courier New is missing.
- Logo: `brand/logo-dark.svg` (nav). Icons: `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-*.png`. Share image: `brand/og-image.png`.
- The sample ticket has no cuts or notches, like the printed ticket.
- Replace these files from a newer kit instead of redrawing them.
