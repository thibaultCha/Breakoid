/**
* Breakoid, A JavaScript Bricks Breaking game.
* Built for fun and training on free time.
*
* @author thibaultCha
* @version 0.1
*/
;(function (window) {

    function Breakoid (canvasId) {

        Breakoid.TICKS_INTERVAL = 1
        Breakoid.NBROWS         = 3
        Breakoid.NBCOLS         = 4
        Breakoid.BRICK_HEIGHT   = 30
        Breakoid.EMPTY_SPACE    = 0
        Breakoid.BAR_HEIGHT     = 10
        Breakoid.BAR_COLOR      = '#333333'
        Breakoid.BAR_SPEED      = 3
        Breakoid.BAR_FRICTION   = 0.90
        Breakoid.BALL_COLOR     = 'red'
        Breakoid.BALL_SIZE      = 8
        Breakoid.TEXT_COLOR     = '#333333'

        var _bricksArray = new Array(Breakoid.NBROWS)
        , _ctx // context
        , _gameWidth, _gameHeight // canvas width/height
        , _brickWidth
        , _barX, _barY, _barWidth, _barVelocity = 0 // bar properties
        , _ballX, _ballY, _ballDirX, _ballDirY // ball properties
        , _interval // interval
        , _running = false, _pause = false // state of the game
        , _arrowKeys = [] 

        /**
        * Class constructor from canvas' id.
        * Calculate bar and bricks widths if a
        * canvas was provided, print error if not.
        *
        * @method __construct
        * @param {string} canvasId The html canvas's id 
        * @return {void}
        */
        function __construct (canvasId) {
            var canvas = document.getElementById(canvasId)
            if (canvas) {
                _ctx        = canvas.getContext('2d')
                _gameWidth  = canvas.width
                _gameHeight = canvas.height
                _barWidth   = _gameWidth / 8.0
                _brickWidth = Math.floor((_gameWidth / Breakoid.NBCOLS) - 
                              (Breakoid.EMPTY_SPACE * Breakoid.NBCOLS / Breakoid.NBCOLS+0.5))
                bindKeyboard()
                _ctx.font = "20px sans-serif"
                buildGame()
            } else {
                console.log('No canvas with id: %s', canvasId)
            }
        }  __construct(canvasId);

        /**
        * Bind the keyboard for shortcuts and bar moves.
        *
        * @method bindKeyboard
        * return {void}
        */
        function bindKeyboard () {
            window.document.onkeydown = function (e) {
                switch (e.keyCode) {
                    case 39:
                        _arrowKeys['right'] = true
                    break
                    case 37:
                        _arrowKeys['left'] = true
                    break
                    case 80: // p (pause)
                        if (_running) pause()
                    break
                    case 82: // r (restart)
                        _running = false
                        clearInterval(_interval)
                        buildGame()
                    break
                    case 83: // s (start)
                        if (!_running) start()
                    break
                }
            }
            window.document.onkeyup = function (e) {
                switch (e.keyCode) {
                    case 39:
                        _arrowKeys['right'] = false
                    break
                    case 37:
                        _arrowKeys['left'] = false
                    break
                }
            }
        }

        /**
        * Calculates bar and ball sizes and position.
        * Also builds the first frame by drawing all bricks
        * with a randomly chosen color.
        *
        * @method buildGame
        * @return {void}
        */
        function buildGame () {
            // Sizes
            _barX     = (_gameWidth / 2) - (_barWidth / 2)
            _barY     = _gameHeight - Breakoid.BAR_HEIGHT - 2
            _ballX    = _gameWidth / 1.3
            _ballY    = _gameHeight / 2
            _ballDirX = -1
            _ballDirY = 1
            clearContext()
            // Bricks
            for (var row=0 ; row<Breakoid.NBROWS ; row++) {
                _bricksArray[row] = new Array(Breakoid.NCOLS)
                // random line color
                _ctx.fillStyle = "rgb("+Math.floor(Math.random()*256)
                                   +","+Math.floor(Math.random()*256)
                                   +","+Math.floor(Math.random()*256)+")"
                _bricksArray[row].color = _ctx.fillStyle
                for (var col=0 ; col<Breakoid.NBCOLS ; col++) {
                    var x = col * (_brickWidth + Breakoid.EMPTY_SPACE) + Breakoid.EMPTY_SPACE
                    var y = row * (Breakoid.BRICK_HEIGHT + Breakoid.EMPTY_SPACE) + Breakoid.EMPTY_SPACE
                    _ctx.fillRect(x, y, _brickWidth, Breakoid.BRICK_HEIGHT)
                     // create a brick here
                    _bricksArray[row][col] = {
                        present      : true,
                        topBorder    : Math.floor(y),
                        leftBorder   : Math.floor(x),
                        bottomBorder : Math.floor(y + Breakoid.BRICK_HEIGHT),
                        rightBorder  : Math.floor(x + _brickWidth)
                    }
                }
            }
            // Bar
            _ctx.fillStyle = Breakoid.BAR_COLOR
            _ctx.fillRect(_barX, _barY, _barWidth, Breakoid.BAR_HEIGHT)

            printText("Press S to start the game, R to reload.")
        };

        /**
        * Core method of the graphics, called by the interval.
        * Will redraw every graphic element and bricks according to the _bricksArray array.
        *
        * @method onTick
        * @return {void}
        */
        function onTick () {
            clearContext()
            ballOnTick() // Ball
            // Bricks
            var won = true
            for (var row=0 ; row<Breakoid.NBROWS ; row++) {
                _ctx.fillStyle = _bricksArray[row].color
                for (var col=0 ; col<Breakoid.NBCOLS ; col++) {
                    var brick = _bricksArray[row][col]
                    if (brick.present) {
                        _ctx.fillRect(brick.leftBorder, brick.topBorder, _brickWidth, Breakoid.BRICK_HEIGHT)
                        won = false
                    }
                }
            }
            if (won)
                finishGame('You won! Press R to reload the game.')
            barOnTick() // Bar
        };

        /**
        * Redraw the ball on each tick of the game. Handle collisions with bricks and bar.
        *
        * @method ballOnTick
        * @return {void}
        */
        function ballOnTick () {
            _ballX += _ballDirX
            _ballY += _ballDirY
            // Local variables to simplify the collisions code
            var topBall  = Math.floor(_ballY - Breakoid.BALL_SIZE)
            , bottomBall = Math.floor(_ballY + Breakoid.BALL_SIZE)
            , leftBall   = Math.floor(_ballX - Breakoid.BALL_SIZE)
            , rightBall  = Math.floor(_ballX + Breakoid.BALL_SIZE)

            // Borders collision stuff
            if (rightBall > _gameWidth)        _ballDirX = -1 // right border
            else if (leftBall < 0)             _ballDirX = 1 // left border
            else if (bottomBall > _gameHeight) _ballDirY = -1  //finishGame('You lost! Press R to reload the game.')
            else if (topBall < 0)              _ballDirY = 1 // top border
            // Bar collision stuff
            else if (bottomBall > _barY - 1
                    &&
                    (_ballX >= _barX && _ballX <= _barX + _barWidth))
            {
                _ballDirY = -1
                //if (_barVelocity > 1 || _barVelocity < -1) _ballDirX = _barVelocity * 0.35
            }
 
            // Bricks collision stuff
            if (topBall <= Breakoid.NBROWS * (Breakoid.BRICK_HEIGHT + Breakoid.EMPTY_SPACE) 
                && 
                topBall > Breakoid.BRICK_HEIGHT)
            {
                // This doesn't find the closest brick to the ball
                var col = Math.floor((_ballX + _ballDirX * Breakoid.BALL_SIZE) / (_brickWidth + Breakoid.EMPTY_SPACE))
                var row = Math.floor((_ballY + _ballDirY * Breakoid.BALL_SIZE) / (Breakoid.BRICK_HEIGHT + Breakoid.EMPTY_SPACE))                
                
            console.log("row: " + row + " col: " + col)

                var brick = _bricksArray[row][col]

            // DEBUG
            //console.log("ROW: ", _bricksArray[row])
            //console.log("COL: ", _bricksArray[row][col])
            console.log("BallTop:    " + topBall +    " BrickBottom: " + brick.bottomBorder)
            console.log("BallLeft:   " + leftBall +   " BrickRight:  " + brick.rightBorder)
            console.log("BallRight:  " + rightBall +  " BrickLeft:   " + brick.leftBorder)
            console.log("BallBottom: " + bottomBall + " BrickTop:    " + brick.topBorder)

                if (_bricksArray[row][col].present) {
                    if (topBall == brick.bottomBorder) {
                        console.log("top hit")
                        _ballDirY = 1
                        _bricksArray[row][col].present = false
                    } else if (rightBall == brick.leftBorder) {
                        console.log("right hit")
                        _ballDirX = -1
                        _bricksArray[row][col].present = false
                    } else if (bottomBall == brick.topBorder) {
                        console.log("bottom hit")
                        _ballDirY = -1
                        _bricksArray[row][col].present = false
                    } else if (leftBall == brick.rightBorder) {
                        console.log("left hit")
                        _ballDirX = 1
                        _bricksArray[row][col].present = false
                    }
                }

            // DEBUG
            //pause()
            }

            _ctx.fillStyle = Breakoid.BALL_COLOR
            _ctx.beginPath()
            _ctx.arc(_ballX, _ballY, Breakoid.BALL_SIZE, 0, Math.PI * 2, true)
            _ctx.closePath()
            _ctx.fill()
        };

        /**
        * Redraw the bar on each tick of the game.
        *
        * @method barOnTick
        * @return {void}
        */
        function barOnTick () {
            if (_arrowKeys['right']) { // right
                if (_barVelocity < Breakoid.BAR_SPEED)
                    _barVelocity++
            } else if (_arrowKeys['left']) { // left
                if (_barVelocity > -Breakoid.BAR_SPEED)
                    _barVelocity--
            }

            _barVelocity *= Breakoid.BAR_FRICTION
            _barX += _barVelocity

            if (_barX > _gameWidth - _barWidth)
                _barX = _gameWidth - _barWidth
            else if (_barX < 0) 
                _barX = 0

            _ctx.fillStyle = Breakoid.BAR_COLOR
            _ctx.fillRect(_barX, _barY, _barWidth, Breakoid.BAR_HEIGHT)
        };

        /**
        * Clear the canvas.
        *
        * @method clearContext
        * @return {void}
        */
        function clearContext () {
            _ctx.clearRect(0, 0, _gameWidth, _gameHeight)
        };

        /**
        * Print some text on the canvas.
        * 
        * @method printText
        * @param {string} msg The text to print
        * @return {void}
        */
        function printText (msg) {
            _ctx.fillStyle = Breakoid.TEXT_COLOR
            _ctx.fillText(msg
                          ,_gameWidth / 2 - _ctx.measureText(msg).width / 2
                          ,Breakoid.NBROWS * (Breakoid.BRICK_HEIGHT + Breakoid.EMPTY_SPACE) + 30)
        };

        /**
        * Pause or resume the game by clearing 
        * or setting the refreshing interval.
        *
        * @method pause
        * @return {void}
        */
        function pause () {
            if (!_pause) {
                _pause = true
                clearInterval(_interval)
                printText("Game paused. Press P to resume.")
            } else {
                _pause = false
                _interval = setInterval(onTick, Breakoid.TICKS_INTERVAL)
            }
        };

        /**
        * Notify the user that the game is finisehd, and prints the reason.
        *
        * @method finishGame
        * @return {void}
        */
        function finishGame (msg) {
            _running = false
            clearInterval(_interval)
            printText(msg)
        };

        /**
        * Start the game.
        *
        * @method start
        * @return {void}
        */
        function start () {
            if (_ctx && !_running) {
                _running = true
                _interval = setInterval(onTick, Breakoid.TICKS_INTERVAL)
            } else if (_ctx) {
                printText('Error during initialization. Can\'t start game.')
            }
        };
    }

window.Breakoid = Breakoid

}(window));