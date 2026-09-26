# Tshepo Sekete — Portfolio

Personal portfolio site for Tshepo Sekete, a software developer and cloud engineer based in Johannesburg, South Africa.

**Live site:** [tshepo1000.github.io/portfolio](https://tshepo1000.github.io/portfolio)

## Pages

| Page | Contents |
| --- | --- |
| Home | Introduction, tech stack marquee, why work with me, links to each section and a CV download |
| About | Background, stats, skills, certifications, work timeline, education and languages |
| Work | Client and organisation websites with links to the live sites |
| Contact | Contact details and a message form, sent through Web3Forms |

## Built with

- HTML5 and CSS3 (custom properties, flexbox and grid, fluid `clamp()` typography)
- Vanilla JavaScript: scroll reveals, count-up stats, animated hero title, mobile menu and the contact form
- [Web3Forms](https://web3forms.com) to deliver contact form messages by email
- Google Fonts: Bricolage Grotesque and Inter

No frameworks, build step or dependencies are needed.

## Features

- Fully responsive layout, with breakpoints at 900px and 600px
- Accessible mobile menu: keyboard (Escape) support, `aria-expanded` state and scroll lock
- Animations respect the `prefers-reduced-motion` setting
- Hover-only effects are limited to devices that support hover
- Page-to-page view transitions in supporting browsers

## Project structure

```
portfolio/
├── index.html          # Home page
├── Pages/
│   ├── about.html
│   ├── work.html
│   └── contact.html
├── styles/
│   └── style.css       # All site styles
├── script.js           # All site behaviour
├── files/
│   └── Tshepo_Sekete_Resume.pdf
└── img/                # Images
```

## Running locally

Clone the repository and open `index.html` in a browser:

```bash
git clone https://github.com/Tshepo1000/portfolio.git
cd portfolio
```

To test it the way it runs on GitHub Pages, serve it from a local web server instead:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

The site is hosted on GitHub Pages from the `main` branch. All links are relative, so it works under the `/portfolio/` sub-path. Paths are case-sensitive on GitHub Pages; the `Pages/` folder must keep its capital P.

## Contact form setup

The form on the Contact page sends messages through [Web3Forms](https://web3forms.com), which emails them to you. To enable it:

1. Go to [web3forms.com](https://web3forms.com), enter the email address that should receive messages, and copy the access key they send you.
2. In `Pages/contact.html`, replace `YOUR_WEB3FORMS_ACCESS_KEY` in the form's `data-access-key` attribute with that key.

The access key is meant to be public, so committing it is safe. Until a key is set, the form falls back to opening the visitor's email app with the message pre-filled.

## Contact

- Email: [tshepotubatsi@gmail.com](mailto:tshepotubatsi@gmail.com)
- LinkedIn: [tshepo-sekete](https://linkedin.com/in/tshepo-sekete-154094157)
- GitHub: [Tshepo1000](https://github.com/Tshepo1000)
