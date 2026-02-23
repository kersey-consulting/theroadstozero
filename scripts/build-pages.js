import fs from "fs";
import path from "path";

const LIVE_DOMAIN = "";

const pages = JSON.parse(
    fs.readFileSync("pages.json", "utf-8")
);

const template = fs.readFileSync(
    "template.html",
    "utf-8"
);

function buildStructuredData(page) {
    return "";
}

function buildHreflangLinks(page, allPages) {
    const supportedLanguageRoots = ["es"];
    const langPrefixRegex = new RegExp(
        `^\\/(${supportedLanguageRoots.join("|")})`
    )
    const normalizePath = p => {
        const normalized = p.path.replace(langPrefixRegex, "");
        return normalized === "" ? "/" : normalized;
    };
    const siblings = allPages.filter(
        p => normalizePath(p) === normalizePath(page)
    );

    if (siblings.length <= 1) {
        return "";
    }

    const links = siblings.map(p => {
        return `<link rel="alternate" hreflang="${p.lang || 'en'}" href="https://${LIVE_DOMAIN}${p.path}" />`;
    });

    links.push(
        `<link rel="alternate" hreflang="x-default" href="https://${LIVE_DOMAIN}${normalizePath(page)}" />`
    );

    return links.join("\n");
}


// Generate HTML files in the project root so Vite can discover them
for (const page of pages) {
    const robotsMeta = page.noindex
        ? '<meta name="robots" content="noindex,nofollow" />'
        : '<meta name="robots" content="index,follow"/>';
    const structuredData = buildStructuredData(page);
    const hreflangLinks = buildHreflangLinks(page, pages);
    const htmlLang = page.lang || "en";
    const html = template
        .replace(/{{title}}/g, page.title)
        .replace(/{{description}}/g, page.description)
        .replace(/{{image}}/g, page.image)
        .replace(/{{url}}/g, `${LIVE_DOMAIN}${page.path}`)
        .replace(/{{entry}}/g, page.entry)
        .replace(/{{robots}}/g, robotsMeta)
        .replace(/{{structuredData}}/g, structuredData)
        .replace(/{{hreflang}}/g, hreflangLinks)
        .replace(/{{lang}}/g, htmlLang);

    const dir = path.dirname(page.html);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
        path.resolve(page.html),
        html
    );
}
