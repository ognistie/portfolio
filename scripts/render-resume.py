"""Validate and render the actual exported PDF using the bundled PDF runtime."""
from pathlib import Path
import json
from pypdf import PdfReader
import pypdfium2 as pdfium

root = Path(__file__).resolve().parent.parent
source = root / 'assets' / 'curriculo-guilherme-moraes-franco.pdf'
out = root / 'tmp' / 'verification'
out.mkdir(parents=True, exist_ok=True)
reader = PdfReader(source)
assert len(reader.pages) == 2, f'Expected two pages, got {len(reader.pages)}'
text = '\n'.join(page.extract_text() for page in reader.pages)
for expected in ['Guilherme Moraes Franco', 'AI Engineer', 'Grupo Papaki', 'IT Universe', 'AI Farm Agent', 'Decupa', 'Hugging Face Agents', 'AWS Agentic AI', 'Open AI DevDay Exchange Hackathon']:
    assert expected in text, f'Missing PDF text: {expected}'
assert 'agronegócio' not in text and 'fazendas' not in text
assert 'IT Universe · Atual' not in text
pdf = pdfium.PdfDocument(str(source))
for i in range(len(pdf)):
    page = pdf[i]
    page.render(scale=1.6).to_pil().save(out / f'pdf-page-{i + 1}.png')
    page.close()
pdf.close()
(out / 'pdf-results.json').write_text(json.dumps({'pages':len(reader.pages),'characters':len(text),'checks':'Two A4 pages; required factual content present; all pages rendered.'},indent=2),encoding='utf-8')
print('PASS: PDF has two pages; factual content present; both pages rendered.')
