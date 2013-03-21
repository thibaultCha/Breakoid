// Good JS class template: http://labs.tomasino.org/2011/11/10/javascript-class-template/

;(function (window) {

    function Breakoid (canvasId) {

        Breakoid.TICKS_INTERVAL = 10
        Breakoid.NBROWS         = 6
        Breakoid.NBCOLS         = 10
        Breakoid.BRICK_HEIGHT   = 15
        Breakoid.EMPTY_SPACE    = 5
        Breakoid.BAR_HEIGHT     = 10
        Breakoid.BAR_COLOR      = '#333333'
        Breakoid.BAR_SPEED      = 4
        Breakoid.BAR_FRICTION   = 0.95
        Breakoid.BALL_COLOR     = 'red'
        Breakoid.BALL_SIZE      = 8

        var _bricksArray = new Array(Breakoid.NBROWS)
        , _gameWidth, _gameHeight // canvas width/height
        , _brickWidth
        , _ctx // context
        , _barX, _barY, _barWidth, _barVelocity = 0 // bar properties
        , _ballX = 100, _ballY = 250, _ballDirX = 1, _ballDirY = -1 // ball vars //TODO PLACE BALL AUTO
        , _interval // interval
        , _won, _pause = false // state of the game
        , _keys = []

        function __construct (canvasId) {
            var canvas = document.getElementById(canvasId)
            if (canvas) {
                _ctx        = canvas.getContext('2d')
                _gameWidth  = canvas.width
                _gameHeight = canvas.height
                _barWidth   = _gameWidth / 7.0
                _brickWidth = (_gameWidth / Breakoid.NBCOLS) - (Breakoid.EMPTY_SPACE * Breakoid.NBCOLS / Breakoid.NBCOLS+0.5)
                _barX       = (canvas.width / 2) - (_barWidth / 2)
                _barY       = canvas.height - Breakoid.BAR_HEIGHT - 2
                buildGame()
            } else {
                console.log('No canvas with id: %s', canvasId)
            }
        }  __construct(canvasId);

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
            _ctx.fillRect(_barX, _barY, _barWidth, Breakoid.BAR_HEIGHT)
            // Bar movements
            //window.document.onkeydown = keyboardListener
            document.body.addEventListener("keydown", function (e) {
                _keys[e.keyCode] = true
            });
            document.body.addEventListener("keyup", function (e) {
                _keys[e.keyCode] = false
            });
        };

        function keyboardListener (e) {
            /*switch (e.keyCode) {
                case 80: // pause
                    if (!_pause)
                        pause()
                    else
                        resume()
                break
            }*/
        };

        function tick () {
            clearContext()
            ballOnTick()
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
            // Bar
            barOnTick()
        };

        function ballOnTick () {
            _ballX += _ballDirX
            _ballY += _ballDirY
            if (_ballX + Breakoid.BALL_SIZE > _gameWidth) _ballDirX  = -1 // right border
            else if (_ballX < 0 + Breakoid.BALL_SIZE)     _ballDirX  = 1 // left border
            if (_ballY + Breakoid.BALL_SIZE > _gameHeight) _ballDirY = -1 // game is lost gameLost()
            else {
                if (_ballY < 0 + Breakoid.BALL_SIZE) _ballDirY = 1 // top border
                else {
                    // Ball touches the bar
                    if ( 
                        _ballY > _gameHeight - Breakoid.BAR_HEIGHT - Breakoid.BALL_SIZE
                        && (_ballX >= _barX && _ballX <= _barX + _barWidth)
                        ) {
                        _ballDirY = -1
                        //_ballDirX = 2 * (_ballX - (_barX + _barWidth / 2)) / _gameWidth
                    }
                }
            }
            
            if (_ballY - Breakoid.BALL_SIZE <= Breakoid.NBROWS * (Breakoid.BRICK_HEIGHT + Breakoid.EMPTY_SPACE) // ball is in brick zone
                && _ballY - Breakoid.BALL_SIZE > Breakoid.BALL_SIZE/2) { // ball touched the top border: no need to enter here.
                var Y = Math.floor((_ballY - Breakoid.BALL_SIZE + Breakoid.BRICK_HEIGHT) / (Breakoid.BRICK_HEIGHT + Breakoid.EMPTY_SPACE)) - 1
                var X = Math.floor(_ballX / (_brickWidth + Breakoid.EMPTY_SPACE))
                if (_bricksArray[Y][X]) {
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

        function barOnTick () {
            if (_keys[39]) { // right
                if (_barVelocity < Breakoid.BAR_SPEED)
                    _barVelocity++
            }
            else if (_keys[37]) { // left
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

        function clearContext () {
            _ctx.clearRect(0, 0, _gameWidth, _gameHeight)
        };

        function gameWon () {
            clearInterval(_interval)
            alert('You win')
        };

        function gameLost () {
            clearInterval(_interval)
            alert('You lost')
        };

        function pause () {
            _pause = true
            clearInterval(_interval)
        };

        function resume () {
            _pause = false
            _interval = setInterval(tick, Breakoid.TICKS_INTERVAL)
        };

        /* PUBLIC METHODS */

        this.start = function () {
            if (_ctx)
                _interval = setInterval(tick, Breakoid.TICKS_INTERVAL)
            else
                console.log('Error during initialization. Start aborted.')
        };
    }

window.Breakoid = Breakoid

}(window));