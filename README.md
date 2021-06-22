# token-art-tools
React Gatsby static webapp for generative artists working on token/hash based NFT artwork, ex: Artblocks.io

**Live Application**

https://ctrlshiftmake.github.io/token-art-tools/

## Using the Application

Your `index.html` file needs the following script in it's header to get the generated hash

```javascript
<script>
    const params = new URLSearchParams(window.location.search);
    tokenData = { hash: params.get("hash") };
</script>
```

Host your generative artwork script via a local HTTP server, for example:

```python
python -m http.server 5500
```

Copy/paste the resulting localhost URL into the application

```
http://localhost:5500
```
Use the controls provided to manipulate the hash and see how your artwork updates

## Running App Locally

1) Clone / fork repository
2) `npm install`
3) `make run-server`
4) Open `http://localhost:8000`

## Version 1.0 Features

The following features are planned for the initial release of the application. If you have any suggestions - or discover bugs - please create a GitHub issue. I'm keen to hear from artists on other platforms as well, so that it can support many different formats of token / hash variables.

- [x] README preview and instructions
- [ ] HashPair Controls
- [x] ArtBlocks.io Token Format
- [ ] Screenshot Current Artwork
- [ ] Generate `n` Random Screenshots
- [ ] Lock HashPair `value` to avoid random