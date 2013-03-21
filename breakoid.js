<<<<<<< .merge_file_bvtCCL
/**
* JavaScript Bricks Breaking game.
*/
=======
// Good JS class template: http://labs.tomasino.org/2011/11/10/javascript-class-template/

>>>>>>> .merge_file_hv5wce
;(function (window) {

    function Breakoid (canvasId) {

<<<<<<< .merge_file_bvtCCL
        Breakoid.TICKS_INTERVAL = 1
        Breakoid.NBROWS         = 1
        Breakoid.NBCOLS         = 10
        Breakoid.BRICK_HEIGHT   = 15
        Breakoid.EMPTY_SPACE    = 5
        Breakoid.BAR_HEIGHT     = 10
        Breakoid.BAR_COLOR      = '#333333'
        Breakoid.BAR_SPEED      = 3
        Breakoid.BAR_FRICTION   = 0.95
        Breakoid.BALL_COLOR     = 'red'
        Breakoid.BALL_SIZE      = 8

        var _bricksArray = new Array(Breakoid.NBROWS)
        , _ctx // context
        , _gameWidth, _gameHeight // canvas width/height
        , _brickWidth
        , _barX, _barY, _barWidth, _barVelocity = 0 // bar properties
        , _ballX, _ballY, _ballDirX = -1, _ballDirY = 1 // ball properties
        , _interval // interval
        , _won, _pause = false // state of the game
        , _keys = [] 

        /**
        * Class constructor from canvas' id. Will calculate all element's positions.
        *
        * @method __construct
        * @param {string} canvasId The html canvas's id 
        * @return {void}
        */
=======
        Breakoid.TICKS_INTERVAL = 10
        Breakoid.NBROWS         = 6
        Breakoid.NBCOLS         = 10
        Breakoid.BRICK_HEIGHT   = 15
        Breakoid.EMPTY_SPACE    = 5
        Breakoid.BAR_WIDTH      = 80
        Breakoid.BAR_HEIGHT     = 10
        Breakoid.BAR_COLOR      = '#333333'
        Breakoid.BAR_MOVE       = 40
        Breakoid.BALL_COLOR     = '#222222'
        Breakoid.BALL_SIZE      = 8

        var _bricksArray = new Array(Breakoid.NBROWS)
        , _gameWidth, _gameHeight // canvas width/height
        , _brickWidth
        , _ctx // context
        , _barX, _barY // bar position
        , _ballX = 100, _ballY = 250, _ballDirX = 1, _ballDirY = -1, _ballSpeed = 1 // ball vars //TODO PLACE BALL AUTO
        , _interval // interval
        , _won, _pause = false // state of the game

>>>>>>> .merge_file_hv5wce
        function __construct (canvasId) {
            var canvas = document.getElementById(canvasId)
            if (canvas) {
                _ctx        = canvas.getContext('2d')
                _gameWidth  = canvas.width
                _gameHeight = canvas.height
<<<<<<< .merge_file_bvtCCL
                _barWidth   = _gameWidth / 8.0
                _brickWidth = (_gameWidth / Breakoid.NBCOLS) - (Breakoid.EMPTY_SPACE * Breakoid.NBCOLS / Breakoid.NBCOLS+0.5)
                _barX       = (canvas.width / 2) - (_barWidth / 2)
                _barY       = canvas.height - Breakoid.BAR_HEIGHT - 2
                _ballX      = _gameWidth / 1.3
                _ballY      = _gameHeight / 2
=======
                _brickWidth = (_gameWidth / Breakoid.NBCOLS) - (Breakoid.EMPTY_SPACE * Breakoid.NBCOLS / Breakoid.NBCOLS+0.5)
                _barX       = (canvas.width / 2) - (Breakoid.BAR_WIDTH / 2)
                _barY       = canvas.height - Breakoid.BAR_HEIGHT
>>>>>>> .merge_file_hv5wce
                buildGame()
            } else {
                console.log('No canvas with id: %s', canvasId)
            }
        }  __construct(canvasId);

<<<<<<< .merge_file_bvtCCL
        /**
        * Build bricks and bar assuming that all elements' positions have been calculated.
        * Bind the keyboard for shortcuts and bar moves.
        *
        * @method buildGame
        * @return {void}
        */
=======
>>>>>>> .merge_file_hv5wce
        function buildGame () {
            // Bricks
            for (var i=0 ; i<Breakoid.NBROWS ; i++) {
                _bricksArray[i] = new Array(Breakoid.NCOLS)
                // random line color
                _ctx.fillStyle = "rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")"
                _bricksArray[i].color = _ctx.fillStyle
                for (var j=0 ; j<Breakoid.NBCOLS ; j++) {
                    _ctx.fillRect( (j * (_brickWidth + Breakoid.EMPTY_SPACE)) + Breakoid.EMPTY_SPACE, (i * (Breakoid.BRICK_HEIGHT + Breakoid.EMPTY_SPACE)) + Breakoid.EMPTY_SPACE, _brickWidth, Breakoid.BRICK_HEIGHT)
                    _bricksArray[i][j] = true // a brick is present
                }
            }
            // Bar
            _ctx.fillStyle = Breakoid.BAR_COLOR
<<<<<<< .merge_file_bvtCCL
            _ctx.fillRect(_barX, _barY, _barWidth, Breakoid.BAR_HEIGHT)
            // Bar movements and keyboard shortcuts
            window.document.onkeydown = function (e) {
                _keys[e.keyCode] = true
                if (e.keyCode == 80) {
                    if (!_pause) pause()
                    else resume()
                } 
            }
            window.document.onkeyup = function (e) {
                _keys[e.keyCode] = false
            }
        };

        /**
        * Core method of the graphics, to be called by an interval.
        * Will redraw every graphic element and bricks according to the _bricksArray array.
        *
        * @method tick
        * @return {void}
        */
        function tick () {
            clearContext()
            ballOnTick() // Ball
=======
            _ctx.fillRect(_barX, _barY, Breakoid.BAR_WIDTH, Breakoid.BAR_HEIGHT)
            // Bar movements
            window.document.onkeydown = keyboardListener
        };

        function keyboardListener (e) {
            switch (e.keyCode) {
                case 39: // right
                    if (_barX + Breakoid.BAR_MOVE + Breakoid.BAR_WIDTH <= _gameWidth)
                        _barX += Breakoid.BAR_MOVE
                    else
                        _barX = _gameWidth - Breakoid.BAR_WIDTH
                break
                case 37: // left
                    if (_barX - Breakoid.BAR_MOVE >= 0)
                        _barX -= Breakoid.BAR_MOVE
                    else
                        _barX = 0
                break
                case 80: // pause
                    if (!_pause)
                        pause()
                    else
                        resume()
                break
            }
        };

        function tick () {
            clearContext()
            ballOnTick()
>>>>>>> .merge_file_hv5wce
            // Bricks
            _won = true
            for (var i=0 ; i<Breakoid.NBROWS ; i++) {
                _ctx.fillStyle = _bricksArray[i].color
                for (var j=0 ; j<Breakoid.NBCOLS ; j++) {
                    if (_bricksArray[i][j]) {
                        _ctx.fillRect( (j * (_brickWidth+Breakoid.EMPTY_SPACE)) + Breakoid.EMPTY_SPACE, (i * (Breakoid.BRICK_HEIGHT+Breakoid.EMPTY_SPACE)) + Breakoid.EMPTY_SPACE, _brickWidth, Breakoid.BRICK_HEIGHT)
                        _won = false
                    }
                }
            }
            //if (_won)
                //gameWon()
<<<<<<< .merge_file_bvtCCL
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
            if (_ballX + Breakoid.BALL_SIZE > _gameWidth) _ballDirX  = -1 // right border
            else if (_ballX - Breakoid.BALL_SIZE < 0 )    _ballDirX  = 1 // left border
            if (_ballY + Breakoid.BALL_SIZE > _gameHeight) _ballDirY = -1 // game is lost gameLost()
            else {
                if (_ballY - Breakoid.BALL_SIZE < 0 ) _ballDirY = 1 // top border
                else {
                    // Ball touch the bar
                    if  (
                        _ballY + Breakoid.BALL_SIZE > _barY - 1
                        && (_ballX >= _barX && _ballX <= _barX + _barWidth)
                        ) {
                        _ballDirY = -1
                        //_ballDirX = 2 * (_ballX - (_barX + _barWidth / 2)) / _gameWidth
                    }
                }
            }

            // Ball is in brick zone (First empty space row, the top of the game, is NOT considered as brick zone because of...)
            if (_ballY - Breakoid.BALL_SIZE <= Breakoid.NBROWS * (Breakoid.BRICK_HEIGHT + Breakoid.EMPTY_SPACE) 
                && _ballY - Breakoid.BALL_SIZE > Breakoid.BRICK_HEIGHT) {
                var Y = Math.floor((_ballY - Breakoid.BALL_SIZE + Breakoid.BRICK_HEIGHT) / (Breakoid.BRICK_HEIGHT + Breakoid.EMPTY_SPACE)) - 1
                var X = Math.floor(_ballX / (_brickWidth + Breakoid.EMPTY_SPACE))
                if (_bricksArray[Y][X]) { // ...this. And because we don't need to do this stuff anyway.
=======
            // Bar
            _ctx.fillStyle = Breakoid.BAR_COLOR
            _ctx.fillRect(_barX, _barY, Breakoid.BAR_WIDTH, Breakoid.BAR_HEIGHT)
        };

        function ballOnTick () {
            _ballX += _ballDirX * _ballSpeed
            _ballY += _ballDirY * _ballSpeed
            if (_ballX + Breakoid.BALL_SIZE > _gameWidth) _ballDirX  = -1 // right border
            else if (_ballX < 0 + Breakoid.BALL_SIZE)     _ballDirX  = 1 // left border
            if (_ballY + Breakoid.BALL_SIZE > _gameHeight) _ballDirY = -1 // game is lost gameLost()
            else {
                if (_ballY < 0 + Breakoid.BALL_SIZE) _ballDirY = 1 // top border
                else {
                    // Ball touches the bar
                    if ( 
                        _ballY > _gameHeight - Breakoid.BAR_HEIGHT - Breakoid.BALL_SIZE
                        && (_ballX >= _barX && _ballX <= _barX + Breakoid.BAR_WIDTH)
                        ) {
                        _ballDirY = -1
                        //_ballDirX = 2 * (_ballX - (_barX + Breakoid.BAR_WIDTH / 2)) / _gameWidth
                    }
                }
            }
            
            if (_ballY - Breakoid.BALL_SIZE <= Breakoid.NBROWS * (Breakoid.BRICK_HEIGHT + Breakoid.EMPTY_SPACE) // ball is in brick zone
                && _ballY - Breakoid.BALL_SIZE > Breakoid.BALL_SIZE/2) { // ball touched the top border: no need to enter here.
                var Y = Math.floor((_ballY - Breakoid.BALL_SIZE + Breakoid.BRICK_HEIGHT) / (Breakoid.BRICK_HEIGHT + Breakoid.EMPTY_SPACE)) - 1
                var X = Math.floor(_ballX / (_brickWidth + Breakoid.EMPTY_SPACE))
                if (_bricksArray[Y][X]) {
>>>>>>> .merge_file_hv5wce
                    _bricksArray[Y][X] = false
                    _ballDirY = 1
                }
            }

            _ctx.fillStyle = Breakoid.BALL_COLOR
            _ctx.beginPath()
            _ctx.arc(_ballX, _ballY, Breakoid.BALL_SIZE, 0, Math.PI * 2, true)
            _ctx.closePath()
            _ctx.fill()
        };

<<<<<<< .merge_file_bvtCCL
        /**
        * Redraw the bar on each tick of the game.
        *
        * @method barOnTick
        * @return {void}
        */
        function barOnTick () {
            if (_keys[39]) { // right
                if (_barVelocity < Breakoid.BAR_SPEED)
                    _barVelocity++
            } else if (_keys[37]) { // left
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
=======
>>>>>>> .merge_file_hv5wce
        function clearContext () {
            _ctx.clearRect(0, 0, _gameWidth, _gameHeight)
        };

<<<<<<< .merge_file_bvtCCL
        /**
        * Notificate the user he won the game.
        *
        * @method gameWon
        * @return {void}
        */
=======
>>>>>>> .merge_file_hv5wce
        function gameWon () {
            clearInterval(_interval)
            alert('You win')
        };

<<<<<<< .merge_file_bvtCCL
        /**
        * Notificate the user he lost the game.
        *
        * @method gameLost
        * @return {void}
        */
=======
>>>>>>> .merge_file_hv5wce
        function gameLost () {
            clearInterval(_interval)
            alert('You lost')
        };

<<<<<<< .merge_file_bvtCCL
        /**
        * Pause the game by clearing the refreshing interval.
        *
        * @method pause
        * @return {void}
        */
=======
>>>>>>> .merge_file_hv5wce
        function pause () {
            _pause = true
            clearInterval(_interval)
        };

<<<<<<< .merge_file_bvtCCL
        /**
        * Resume the game by setting the refreshing interval.
        *
        * @method resume
        * @return {void}
        */
=======
>>>>>>> .merge_file_hv5wce
        function resume () {
            _pause = false
            _interval = setInterval(tick, Breakoid.TICKS_INTERVAL)
        };

        /* PUBLIC METHODS */

<<<<<<< .merge_file_bvtCCL
        /**
        * Start the game.
        *
        * @method start
        * @return {void}
        */
=======
>>>>>>> .merge_file_hv5wce
        this.start = function () {
            if (_ctx)
                _interval = setInterval(tick, Breakoid.TICKS_INTERVAL)
            else
                console.log('Error during initialization. Start aborted.')
        };
    }

window.Breakoid = Breakoid

}(window));