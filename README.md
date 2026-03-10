# Portfolio
✦ Site profissional de @ognistie · Automação &amp; Cloud · Minimalista, responsivo e sem frameworks



# 🌐 Portfólio Pessoal · ognistie

**Site profissional de Guilherme Moraes Franco**  
Cloud · DevOps · Automação · Suporte Técnico

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-222?style=flat-square&logo=github)](https://ognistie.github.io/Projeto-Pessoal/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)](LICENSE)

</div>

---

## 📋 Sobre o Projeto

Portfolio pessoal *one-page* desenvolvido com **HTML5, CSS3 e JavaScript puro** — sem frameworks, sem dependências externas. Design **minimalista e clean** com efeito **glassmorphism**, paleta em tons de cinza e tipografia moderna.

> *"Transformando infraestrutura em código e processos em automação."*

---

## ✨ Funcionalidades

- **Design Responsivo** — adaptado para mobile, tablet e desktop
- **Glassmorphism** — cards com efeito vidro (`backdrop-filter: blur`)
- **Scroll Reveal** — animações de entrada suaves com `IntersectionObserver`
- **Navbar Inteligente** — link ativo por seção + sombra no scroll
- **Tilt 3D** — efeito sutil nos cards ao mover o mouse
- **Contadores Animados** — números do hero animados com ease-out cúbico
- **Menu Mobile** — hambúrguer animado com toggle suave
- **Smooth Scroll** — rolagem suave com offset para navbar fixa
- **Fallback de Imagens** — exibe placeholder se assets não encontrados

---

## 🗂️ Estrutura de Arquivos

```
📁 Projeto-Pessoal/
│
├── 📄 index.html          # Estrutura HTML semântica
├── 🎨 style.css           # Estilos, glassmorphism e animações
├── ⚙️  script.js           # Interatividade e comportamentos
├── 📄 README.md           # Este arquivo
│
└── 📁 assets/
     ├── 🖼️  banner.png     # Banner hero (1500×500px recomendado)
     └── 🖼️  profile.png    # Foto de perfil (400×400px recomendado)
```

---

## 🎨 Design System

| Token | Valor | Uso |
|-------|-------|-----|
| `--bg` | `#F4F4F4` | Fundo principal |
| `--bg-alt` | `#EEEEEE` | Fundo seções alternadas |
| `--txt` | `#2D2D2D` | Texto principal |
| `--txt2` | `#666666` | Texto secundário |
| `--border` | `#E0E0E0` | Bordas e divisores |
| `--glass` | `rgba(255,255,255,0.58)` | Background dos cards |
| `--sh-md` | `0 6px 28px rgba(0,0,0,0.08)` | Sombra padrão |

**Fontes:** [Montserrat](https://fonts.google.com/specimen/Montserrat) (peso 300–900) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (labels e código)

---

## 📱 Seções

| # | Seção | Descrição |
|---|-------|-----------|
| 🏠 | **Hero** | Nome, cargo, card estilo GitHub com banner e avatar |
| 01 | **Sobre** | Bio profissional + card de informações |
| 02 | **Stack** | Tecnologias em cards glassmorphism com hover 3D |
| 03 | **Projetos** | Cards horizontais linkados ao GitHub |
| 04 | **Cursos** | Grid de certificações com badges por instituição |
| 05 | **Contato** | Links para e-mail, LinkedIn e GitHub |

---

## 🚀 Como Usar Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/ognistie/Projeto-Pessoal.git

# 2. Acesse a pasta
cd Projeto-Pessoal

# 3. Abra no navegador
# — Arraste o index.html para o browser, ou
# — Use o Live Server (VS Code) para hot reload
```

> **Sem dependências!** Não é necessário `npm install` nem nenhuma configuração extra.

---

## 🌍 Deploy no GitHub Pages

1. Vá em **Settings → Pages** no repositório
2. Em *Branch*, selecione `main` e pasta `/ (root)`
3. Clique em **Save**
4. Aguarde ~1 minuto e acesse:

```
https://ognistie.github.io/Projeto-Pessoal/
```

---

## 🖼️ Personalizando as Imagens

Para atualizar as imagens, substitua os arquivos na pasta `assets/`:

| Arquivo | Tamanho recomendado | Dica |
|---------|---------------------|------|
| `banner.png` | 1500 × 500 px | Usado como fundo do card hero |
| `profile.png` | 400 × 400 px | PNG com fundo transparente fica melhor |

---

## ⚙️ JavaScript — Módulos

O `script.js` é organizado em **7 IIFEs independentes**:

```
1. initNavbar()     → Scroll shadow + active link + hamburger mobile
2. initReveal()     → Scroll reveal com stagger por data-delay
3. initSmoothScroll()→ Smooth scroll com offset para nav fixa
4. initTilt()       → Tilt 3D nos cards ao mover o mouse
5. initCounters()   → Contadores animados com ease-out cúbico
6. initLinkHints()  → Cursor pointer nos cards clicáveis
7. initImageFallbacks()→ Fallback se assets não encontrados
```

---

## 🛠️ Stack Tecnológica do Site

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-4285F4?style=for-the-badge&logo=google&logoColor=white)

---

## 📬 Contato

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/guilherme-moraes-franco-b4b1a0353/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ognistie)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:og.guifranco@gmail.com)

**Guilherme Moraes Franco** · @ognistie · Osasco, SP — Brasil

</div>

---

<div align="center">

Feito com ☕ e muito código por **Guilherme Moraes Franco**

</div>
