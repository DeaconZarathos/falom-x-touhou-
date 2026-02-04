namespace SpriteKind {
    export const Item = SpriteKind.create()
    export const GrazeHitbox = SpriteKind.create()
}
// --- 5. Manejo de Colisiones (Registros finales) ---
sprites.onOverlap(SpriteKind.GrazeHitbox, SpriteKind.Projectile, function (g, b) {
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Food, SpriteKind.Enemy, function (proy, b) {
    proy.destroy()
    vidaBoss.value -= 1
if (vidaBoss.value <= 200 && !(faseDos)) {
        faseDos = true
        boss.sayText("SPELL CARD!", 2000, false)
        music.bigCrash.play()
    }
    if (vidaBoss.value <= 0) {
        game.over(true)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (p, b) {
    if (p == hitbox) {
        game.over(false)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Item, function (p, item) {
    item.destroy()
    nivelPoder = 2
    music.powerUp.play()
    falom.sayText("POWER UP!", 1000, false)
})
let rad2 = 0
let bala2: Sprite = null
let angulo = 0
let rad = 0
let bala: Sprite = null
let pUp: Sprite = null
let p: Sprite = null
let vidaBoss: StatusBarSprite = null
let boss: Sprite = null
let hitbox: Sprite = null
let falom: Sprite = null
let nivelPoder = 0
let faseDos = false
// --- 1. Variables de Estado ---
nivelPoder = 1
info.setScore(0)
// --- 2. Configuración de Personajes (Falom y Hitboxes) ---
falom = sprites.create(img`
    . . . . . f f f f f . . . . . . . 
    . . . . f f d d d f f . . . . . . 
    . . . . f d 8 d 8 d f . . . . . . 
    . . . . f d d d d d f . . . . . . 
    . . . . f 2 1 d 1 2 f . . . . . . 
    . . . . 2 f 1 1 1 f 2 . . . . . . 
    . . . . 2 f 1 1 1 f 2 . . . . . . 
    . . . . 2 2 8 8 8 2 2 . . . . . . 
    . . . . d 8 8 . 8 8 d . . . . . . 
    . . . . . 8 8 . 8 8 . . . . . . . 
    . . . . e e 8 . 8 e e . . . . . . 
    . . . . e e e . e e e . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(falom, 110, 110)
falom.setStayInScreen(true)
// Hitbox de muerte mejorada
hitbox = sprites.create(img`
    . 5 . 
    5 5 5 
    . 5 . 
    `, SpriteKind.Player)
hitbox.setFlag(SpriteFlag.Invisible, true)
let grazeZone = sprites.create(img`
    . . f f f . . 
    . f . . . f . 
    f . . . . . f 
    f . . . . . f 
    f . . . . . f 
    . f . . . f . 
    . . f f f . . 
    `, SpriteKind.GrazeHitbox)
grazeZone.setFlag(SpriteFlag.Invisible, true)
// --- 3. Configuración del Jefe ---
boss = sprites.create(img`
    . . . . . 5 5 5 5 5 . . . . . . . 
    . . . . 5 5 e d d 5 5 . . . . . . 
    . . . . 5 e f d f e 5 . . . . . . 
    . . . . 5 d d d e d 5 . . . . . . 
    . . . . 5 2 c e c 2 5 . . . . . . 
    . . . . c 5 c c c 5 c . . . . . . 
    . . . . c 5 e c c 5 c . . . . . . 
    . . . . c c 6 6 6 c c . . . . . . 
    . . . . e 6 6 . 6 6 d . . . . . . 
    . . . . 6 6 6 . 6 6 6 . . . . . . 
    . . . . 2 2 6 . 6 2 2 . . . . . . 
    . . . . 2 2 2 . 2 2 2 . . . . . . 
    `, SpriteKind.Enemy)
boss.setPosition(80, 30)
vidaBoss = statusbars.create(24, 4, StatusBarKind.Health)
vidaBoss.attachToSprite(boss)
vidaBoss.max = 400
vidaBoss.value = 400
// --- 4. Lógica de Juego ---
game.onUpdate(function () {
    hitbox.setPosition(falom.x, falom.y)
    grazeZone.setPosition(falom.x, falom.y)
    if (controller.A.isPressed()) {
        controller.moveSprite(falom, 50, 50)
        hitbox.setFlag(SpriteFlag.Invisible, false)
        if (game.runtime() % 100 < 20) {
            let vXs = nivelPoder == 1 ? [0] : [-40, 0, 40]
for (let vx of vXs) {
                p = sprites.createProjectileFromSprite(img`
                    . 9 . 
                    `, falom, vx, -150)
                p.setKind(SpriteKind.Food)
            }
        }
    } else {
        controller.moveSprite(falom, 110, 110)
        hitbox.setFlag(SpriteFlag.Invisible, true)
    }
})
game.onUpdateInterval(7000, function () {
    pUp = sprites.create(img`
        . f f f . 
        f f 1 f f 
        f 1 1 1 f 
        f f 1 f f 
        . f f f . 
        `, SpriteKind.Item)
    pUp.setPosition(Math.randomRange(20, 140), 0)
    pUp.vy = 40
})
forever(function () {
	
})
game.onUpdateInterval(150, function () {
    let numBalas = faseDos ? 14 : 8
for (let i = 0; i <= numBalas - 1; i++) {
        bala = sprites.create(img`
            . 4 . 
            `, SpriteKind.Projectile)
        bala.setPosition(boss.x, boss.y)
        rad = (i * (360 / numBalas) + angulo) * (Math.PI / 180)
        bala.vx = Math.cos(rad) * (faseDos ? 85 : 65)
        bala.vy = Math.sin(rad) * (faseDos ? 85 : 65)
        bala.setFlag(SpriteFlag.AutoDestroy, true)
        if (faseDos) {
            bala2 = sprites.create(img`
                . 2 . 
                `, SpriteKind.Projectile)
            bala2.setPosition(boss.x, boss.y)
            rad2 = (i * (360 / numBalas) - angulo) * (Math.PI / 180)
            bala2.vx = Math.cos(rad2) * 75
            bala2.vy = Math.sin(rad2) * 75
            bala2.setFlag(SpriteFlag.AutoDestroy, true)
        }
    }
    angulo += faseDos ? 20 : 12
})
