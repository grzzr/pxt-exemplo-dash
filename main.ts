
let projectile: Sprite = null
let direction = 0
let movingLeft = false
// let prevSpeed = 0
let dashing = false
let imagensHeroDireita = [
    assets.image`heroMoving0`,
        assets.image`heroMoving1`,
        assets.image`heroMoving2`,
        assets.image`heroMoving4`,
        assets.image`heroMoving5`,
        assets.image`heroMoving6`,
        assets.image`heroMoving7`,
        assets.image`heroMoving8`,
]
let imagensHeroEsquerda = [
    assets.image`heroMovingRev0`,
    assets.image`heroMovingRev1`,
    assets.image`heroMovingRev2`,
    assets.image`heroMovingRev4`,
    assets.image`heroMovingRev5`,
    assets.image`heroMovingRev6`,
    assets.image`heroMovingRev7`,
    assets.image`heroMovingRev8`,
]

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    movingLeft = true
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    movingLeft = false
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(dashing)) {
        dashing = true
        // prevSpeed = hero.vx
        controller.moveSprite(hero, 0, 0)
        if (movingLeft) {
            direction = -1
        } else {
            direction = 1
        }
        hero.setVelocity(direction * 200, 0)
        for (let index = 0; index < imagensHeroDireita.length; index++) {
            timer.background(function () {
                if (movingLeft) {
                    projectile = sprites.createProjectileFromSprite(imagensHeroEsquerda[index], hero, 0 - direction * 5, 0)
                } else{
                    projectile = sprites.createProjectileFromSprite(imagensHeroDireita[index], hero, 0 - direction * 5, 0)
                } 
                projectile.lifespan = 40
            })
            pause(20)
        }
        timer.after(50, function () {
            // hero.vx = prevSpeed
            hero.vx = 0
            controller.moveSprite(hero, 50, 0)
            dashing = false
        })
    }
})

// variables
let hero = sprites.create(assets.image`heroBase0`, SpriteKind.Player)
let gravity = 500
let heroJumpHeight = 20
let heroJumpVelocity = 0 - Math.sqrt(2 * (gravity * heroJumpHeight))
let doubleJump = true
let jumpNum = 0

hero.ay = gravity

scene.cameraFollowSprite(hero)

// maps
tiles.loadMap(tiles.createSmallMap(assets.tilemap`levelTest`))
hero.setPosition(90, 101)

// controls
controller.moveSprite(hero, 50, 0)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
    }
    if (jumpNum < 2) {
        jumpNum++
        hero.vy = heroJumpVelocity
    }
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    if (hero.vy < 0) {
        hero.vy = 0
    }
})

characterAnimations.loopFrames(
    hero,
    [
        assets.image`heroIdle0`,
        assets.image`heroIdle1`,
        assets.image`heroIdle2`,
        assets.image`heroIdle3`,
        assets.image`heroIdle4`,
    ],
    100,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
)
// idle left
characterAnimations.loopFrames(
    hero,
    [
        assets.image`heroIdleRev0`,
        assets.image`heroIdleRev1`,
        assets.image`heroIdleRev2`,
        assets.image`heroIdleRev3`,
        assets.image`heroIdleRev4`,
    ],
    100,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
)
// moving right
characterAnimations.loopFrames(
    hero,
    [
        assets.image`heroMoving0`,
        assets.image`heroMoving1`,
        assets.image`heroMoving2`,
        assets.image`heroMoving4`,
        assets.image`heroMoving5`,
        assets.image`heroMoving6`,
        assets.image`heroMoving7`,
        assets.image`heroMoving8`,
    ],
    100,
    characterAnimations.rule(
        Predicate.Moving,
        Predicate.FacingRight,
        Predicate.HittingWallDown
    )
)
// moving left
characterAnimations.loopFrames(
    hero,
    [
        assets.image`heroMovingRev0`,
        assets.image`heroMovingRev1`,
        assets.image`heroMovingRev2`,
        assets.image`heroMovingRev4`,
        assets.image`heroMovingRev5`,
        assets.image`heroMovingRev6`,
        assets.image`heroMovingRev7`,
        assets.image`heroMovingRev8`,
    ],
    100,
    characterAnimations.rule(
        Predicate.Moving,
        Predicate.FacingLeft,
        Predicate.HittingWallDown
    )
)
// jumping right

characterAnimations.runFrames(
    hero,
    [
        assets.image`heroMoving2`,
        assets.image`heroMoving4`,
        assets.image`heroMoving5`,
    ],
    50,
    characterAnimations.rule(Predicate.FacingRight)
)

// jumping left

characterAnimations.runFrames(
    hero,
    [
        assets.image`heroMovingRev2`,
        assets.image`heroMovingRev4`,
        assets.image`heroMovingRev5`,
    ],
    50,
    characterAnimations.rule(Predicate.FacingLeft)
)

game.onUpdate(() => {
 
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        jumpNum = 0
    }
})
