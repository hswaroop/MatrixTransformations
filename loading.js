const app = new PIXI.Application({
    resolution: 1.0,
    autoResize: true,
    width: 400,
    height: 400,
    antialias: true,
    backgroundColor: 0x333333
})
document.body.appendChild(app.view)

PIXI.loader.add('bunny', 'https://pbs.twimg.com/profile_images/965036344216039424/NQOVAYZ-_400x400.jpg')
           .add("bunnyStart", "./bunnyStart.jpg")
           .add("lightningLine", "./lightning.png")
           .load((loader, resources)=> {

               const docParent = new PIXI.Container()
               docParent.position.set(10, 10)
               app.stage.addChild(docParent);
               const bunnyStart = new PIXI.Sprite(resources.bunnyStart.texture);
               bunnyStart.position.set(20, 20);
               bunnyStart.anchor.set(0);
               bunnyStart.scale.set(0.5);
               docParent.addChild(bunnyStart);
               const doc = new PIXI.Container();
               doc.position.set(75, 50)
               doc.scale.set(1)
               docParent.addChild(doc)

               const sprite = new PIXI.Sprite(resources.bunny.texture)

               sprite.anchor.set(0.5)
               sprite.scale.set(0.5)
               sprite.position.set(150, 200)
               doc.addChild(sprite)
               const lightningLine = new PIXI.Sprite(resources.lightningLine.texture);
               sprite.addChild(lightningLine);
               //reaching to baby bunny's top left corner
               const bunnyLeftTop = bunnyStart.toGlobal(new PIXI.Point(0 - bunnyStart.texture.width * bunnyStart.anchor.x,
                   0 - bunnyStart.texture.height * bunnyStart.anchor.y));
               const localBunnyLeftTop = sprite.toLocal(bunnyLeftTop);
               const spriteLeftTop = new PIXI.Point(0 - sprite.texture.width * sprite.anchor.x,
                   0 - sprite.texture.height * sprite.anchor.y);
               const line = new PIXI.Graphics();
               const line2 = new PIXI.Graphics();
               line.lineStyle(10, 0xD5402B, 1);
               line2.lineStyle(10, 0xFFFFFF, 1);
               sprite.addChild(line)
               sprite.addChild(line2)
               line.moveTo(spriteLeftTop.x, spriteLeftTop.y);
               line.lineTo(localBunnyLeftTop.x, localBunnyLeftTop.y);
               lightningLine.position.set(spriteLeftTop.x, spriteLeftTop.y);
               const relativeY = spriteLeftTop.y - localBunnyLeftTop.y;
               line2.moveTo(spriteLeftTop.x, spriteLeftTop.y);
               line2.lineTo(spriteLeftTop.x, - (Math.abs(relativeY) + Math.abs(spriteLeftTop.y)));
               lightningLine.height = relativeY;
               lightningLine.width = relativeY;
               lightningLine.rotation = Math.PI
           })