function createSpine(params) {
  window.addEventListener("DOMContentLoaded", () => {
    const DEFAULT = {
      resolution: window.devicePixelRatio,
      backgroundAlpha: 0
    }
    let options = Object.assign({}, DEFAULT, params);

    // skip hello
    // PIXI.utils.skipHello();

    // create PIXI application
    const app = new PIXI.Application({
      resizeTo: options.container,
      resolution: options.resolution,
      backgroundAlpha: options.backgroundAlpha,
      antialias: true,
      autoDensity: true,
      powerPreference: "high-performance"
    });
    options.container.appendChild(app.view);

    // load spine data
    app.loader.add("pixie", options.path).load(onAssetsLoaded);

    function onAssetsLoaded(loader, res) {
      // create a spine
      const pixie = new PIXI.spine.Spine(res.pixie.spineData);
      app.stage.addChild(pixie);

      // set the position
      pixie.position.set(app.screen.width / 2, app.screen.height / 2);
      pixie.scale.set(0.6);
      
      // run animation
      pixie.state.setAnimation(0, "animation", true);
    }
  });
}
