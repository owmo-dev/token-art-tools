# token-art-tools
React Gatsby static web tool for generative artists working on token/hash based NFT artwork (ex: Artblocks)

https://ctrlshiftmake.github.io/token-art-tools/

![screenshot](docs/preview.jpg)

## Using the Application

Include this in the head of your `index.html` file

```html
<script src="https://cdn.jsdelivr.net/gh/ctrlshiftmake/token-art-tools@main/providers/artblocks.js"></script>
```

Host your generative artwork script via a local HTTP server, for example:

```python
python -m http.server 5500
```

Paste the URL of your local server into the web application

```
http://localhost:5500
```

Have fun creating with the available features in the web application!

## Running App Locally

1) Clone / fork repository
2) `npm install`
3) `make run-server`
4) Open `http://localhost:8000`

## Feature Suggestions & Bugs

Please create an issue in this repository if you have any suggestions or discover bugs.