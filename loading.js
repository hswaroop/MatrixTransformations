const app = new PIXI.Application({
    resolution: 1.0,
    autoResize: true,
    width: 400,
    height: 400,
    antialias: true,
    backgroundColor: 0x333333
})
document.body.appendChild(app.view)

PIXI.loader.add('bunny', 'https://pbs.twimg.com/profile_images/965036344216039424/NQOVAYZ-_400x400.jpg').load((loader, resources)=>{

    const docParent = new PIXI.Container()
    docParent.position.set(10,10)
    docParent.scale.set(1)
    app.stage.addChild(docParent);
    const doc = new PIXI.Container()
    doc.position.set(75,50)
    doc.scale.set(0.5)
    docParent.addChild(doc)
    const sprite = new PIXI.Sprite(resources.bunny.texture)

    sprite.anchor.set(0)
    sprite.scale.set(1)
    sprite.position.set(150,200)
    //sprite.rotation = Math.PI/12
    doc.addChild(sprite)

    const global = new PIXI.Graphics()
    global.beginFill(0xff0000).drawCircle(0,0,5)
    app.stage.addChild(global)

    const local = new PIXI.Graphics()
    local.beginFill(0x0000ff).drawCircle(0,0,20)
    sprite.addChild(local)

    sprite.interactive = true
    sprite.on('pointerdown', function(e){

        // the best way so far!
        const p_local = new PIXI.Point(
            this.texture.width * (1 - this.anchor.x), // right
            this.texture.height * (1 - this.anchor.y)	// bottom
        )
        // from local to global

        const stagePos0 = this.parent.parent.toGlobal(new PIXI.Point(0,0));
        const stagePos = this.toLocal(stagePos0);

        const globalCirclePos = this.toGlobal(p_local);
        global.position.set(globalCirclePos.x, globalCirclePos.y);

        // from global to local
        const localCirclePos = this.toLocal(global.position);
        local.position.set(localCirclePos.x, localCirclePos.y);
    })
})