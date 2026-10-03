# Eu, mulher — Landing page para GitHub Pages

Extraia os arquivos deste ZIP para a raiz do repositório appeumulher/landing-page.

## Habilitar GitHub Pages

1. Abra Settings > Pages no repositório.
2. Em Source, selecione Deploy from a branch.
3. Selecione main e / (root).
4. Clique em Save e aguarde a publicação.

Endereço esperado: https://appeumulher.github.io/landing-page/

Não envie apenas o ZIP; envie os arquivos extraídos. O arquivo .nojekyll está incluído para servir os arquivos estáticos diretamente.

## Executar localmente

```bash
python3 -m http.server 8000
```

Abra http://localhost:8000.

## Conteúdo

index.html, style.css, app.js, portrait.png e favicon.svg compõem a landing page e a degustação. Os caminhos relativos funcionam no endereço do projeto no GitHub Pages.

A degustação oferece uma escolha inicial e três perguntas por caminho. As respostas ficam em memória e são apagadas ao recarregar ou fechar a página.

O questionário completo é uma aplicação separada. Checkout e liberação após pagamento não fazem parte deste pacote.
