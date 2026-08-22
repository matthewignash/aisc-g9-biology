#!/usr/bin/env python3
"""Regenerate every section's apps-script/Index.html from its standalone index.html.

The standalone page and the deployed page are the same page twice. The only differences are
that the deployed copy has no site nav, because it renders inside a Google Sites iframe where
the nav would be a second navigation bar, and that its content comes from the Sheet through
the template instead of being inlined. Editing index.html and forgetting the served copy is
the one way these two can disagree in front of a student, so this does it in one step.

    python3 unit-3/make-apps-script.py

Then paste the new Index.html into the Apps Script project and redeploy as a new version.
"""
import pathlib
import re

UNIT = pathlib.Path(__file__).resolve().parent
CONTENT_LINE = re.compile(r"^window\.__CONTENT__ = .*;$", re.M)


def strip_site_nav(page):
    start = page.index('<nav class="site-nav"')
    end = page.index("</nav>\n", start) + len("</nav>\n\n")
    without_markup = page[:start] + page[end:]
    rules = [line for line in without_markup.splitlines(keepends=True) if line.startswith(".site-nav")]
    for rule in rules:
        without_markup = without_markup.replace(rule, "")
    return without_markup


def main():
    for source in sorted(UNIT.glob("section-*/index.html")):
        served = strip_site_nav(source.read_text(encoding="utf-8"))
        served, swapped = CONTENT_LINE.subn("window.__CONTENT__ = <?!= contentJson ?>;", served, count=1)
        if not swapped:
            raise SystemExit(f"{source}: no window.__CONTENT__ line to replace")
        target = source.parent / "apps-script/Index.html"
        target.write_text(served, encoding="utf-8")
        print(f"wrote {target.relative_to(UNIT.parent)}")


if __name__ == "__main__":
    main()
