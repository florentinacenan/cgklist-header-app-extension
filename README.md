## app-extension

This is where you include your WebPart documentation.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO

## ?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"03cc5515-45e8-4a6c-815e-0f50341f1321":{"location":"ClientSideExtension.ApplicationCustomizer","properties":{"testMessage":"Hello as property!"}}}

##?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"03cc5515-45e8-4a6c-815e-0f50341f1321":{"location":"ClientSideExtension.ApplicationCustomizer","properties":{"Top":"This is where our buttons will be","Bottom":"Bottom area in the page"}}}