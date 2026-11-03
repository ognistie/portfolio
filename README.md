# Guilherme Moraes Franco · Portfólio

Portfólio de Guilherme Moraes Franco, AI Engineer no Grupo Papaki, com visual de limbo inspirado no Xbox 360: dashboard, painéis verdes, seleção de personagens, névoa e navegação com brilho. Os textos apresentam perfil, projetos e competências com linguagem profissional e técnica.

## Abrir

Abra `index.html` diretamente no navegador. As imagens, os ícones e os dados são locais; não há dependências de produção, fontes externas, analytics ou backend.

Para servir por HTTP, com Node.js instalado:

```sh
node scripts/dev-server.mjs
```

Abra http://127.0.0.1:4173. Para mudar a porta, defina a variável de ambiente `PORT` antes de iniciar o servidor.

## Páginas e navegação

- Início: perfil atualizado, dashboard, projetos em destaque e personagens selecionáveis.
- Projetos: seis projetos reais com objetivo, arquitetura, decisões e escopo: AI Farm Agent, AI Virtual Mouse Controller, Decupa, ognistie.skills, CloudOps Copilot e SkateRoom.
- Sobre: perfil, experiência, formação e stack; `#stack` abre diretamente as tecnologias.
- Conquistas: 13 credenciais das capturas, 11 badges oficiais e dois símbolos de emissores, além dos 12 cursos preservados do portfólio original.
- Contato: e-mail, LinkedIn, GitHub, currículo e cópia do e-mail com recuperação em caso de bloqueio.

Use Tab e Enter nos controles. Na seleção de personagens, as setas, Home e End movem o foco. Escape fecha os modais. A navegação complementar também funciona com teclado e toque. A interface respeita a preferência por movimento reduzido.

## Currículo

`curriculo.html` é a versão responsiva e editável; `assets/curriculo-guilherme-moraes-franco.pdf` é o PDF de duas páginas. A página oferece impressão e download. O cargo atual foi atualizado pelo README público do perfil GitHub para AI Engineer no Grupo Papaki; a experiência na IT Universe foi preservada sem períodos inventados. O LinkedIn limitou a leitura pública na consulta de 3 de novembro de 2026.

Os dados das credenciais são compartilhados por `portfolio-data.js`. Após editar os dados ou o currículo, gere novamente o PDF para manter os formatos sincronizados.

## Estrutura

```text
index.html / style.css / script.js   Interface do portfólio
portfolio-data.js                    Projetos, credenciais e cursos
curriculo.html / .css / .js           Currículo e impressão
assets/                              Imagens locais, badges e PDF
docs/design-and-sources.md            Direção visual, fontes e prompts
scripts/                             Servidor, preparação de assets e verificações
tmp/                                 Renders e pesquisa local; ignorados pelo Git
```

## Verificações e manutenção

Os scripts de desenvolvimento usam `playwright` e `sharp` quando necessários. Eles procuram instalações locais e, no ambiente Codex, as bibliotecas do runtime fornecido. Fora dele, instale esses pacotes para executar os scripts; o site publicado não precisa deles. `CODEX_RUNTIME_NODE_MODULES` pode apontar para outra pasta de bibliotecas. No Windows, os scripts usam o Chrome instalado no caminho padrão; em outros sistemas, usam o Chromium do Playwright.

```sh
node scripts/verify.mjs
node scripts/generate-resume.mjs
```

`scripts/render-resume.py` usa `pypdf` e `pypdfium2` para validar e renderizar o PDF exportado. O relatório e os screenshots ficam em `tmp/verification`. O teste pode usar HTTP definindo `PORTFOLIO_TEST_URL`; por padrão usa arquivos locais.

Os badges de catálogo indicam o programa, sem substituir a validação pessoal das credenciais. Veja as fontes e a distinção entre badges e símbolos em [docs/design-and-sources.md](docs/design-and-sources.md).

## Publicação

Compatível com hospedagem estática, inclusive GitHub Pages. Publique os arquivos da raiz, `assets/` e os arquivos do currículo. Não há etapa de build. Nenhuma publicação é feita pelos scripts de verificação.
