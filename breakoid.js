// Good JS class template: http://labs.tomasino.org/2011/11/10/javascript-class-template/

;(function (window) {

    function Breakoid (canvasId) {

        Breakoid.NBROWS       = 7
        Breakoid.NBCOLS       = 10
        Breakoid.BRICK_WIDTH  = 48
        Breakoid.BRICK_HEIGHT = 15
        Breakoid.EMPTY_SPACE  = 5
        Breakoid.BAR_WIDTH    = 80
        Breakoid.BAR_HEIGHT   = 10
        Breakoid.BAR_COLOR    = '#333333'
        Breakoid.BAR_MOVE     = 35
        Breakoid.BALL_COLOR   = '#222222'
        Breakoid.BALL_SIZE    = 8
        Breakoid.BALL_SPEED   = 2


        var _bricksArray = new Array(Breakoid.NBROWS)
        , _gameWidth, _gameHeight // canvas width/height
        , _ctx // context
        , _barX, _barY // bar position
        , _ballX = 100, _ballY = 250, _ballDirX = 1, _ballDirY = -1
        , _interval

        function __construct (canvasId) {
            var canvas = document.getElementById(canvasId)
            if (canvas) {
                _ctx        = canvas.getContext('2d')
                _gameWidth  = canvas.width
                _gameHeight = canvas.height
                _barX       = (canvas.width / 2) - (Breakoid.BAR_WIDTH / 2)
                _barY       = canvas.height - Breakoid.BAR_HEIGHT

                buildGame()
            } else {
                console.log('No canvas with id: %s', canvasId)
                return
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
                    _ctx.fillRect( (j * (Breakoid.BRICK_WIDTH+Breakoid.EMPTY_SPACE)), (i * (Breakoid.BRICK_HEIGHT+Breakoid.EMPTY_SPACE)), Breakoid.BRICK_WIDTH, Breakoid.BRICK_HEIGHT)
                    _bricksArray[i][j] = true // a brick is present
                }
            }
            // Bar
            _ctx.fillStyle = Breakoid.BAR_COLOR
            _ctx.fillRect(_barX, _barY, Breakoid.BAR_WIDTH, Breakoid.BAR_HEIGHT)
            // Bar movements
            window.document.onkeydown = moveBar
        };

        function tick () {
            clearContext()
            // Ball
            if ((_ballX + _ballDirX * Breakoid.BALL_SPEED) > _gameWidth) _ballDirX  = -1
            else if ((_ballX + _ballDirX * Breakoid.BALL_SPEED) <  0) _ballDirX     =  1
            if ((_ballY + _ballDirY * Breakoid.BALL_SPEED) > _gameHeight) _ballDirY = -1
            else if ((_ballY + _ballDirY * Breakoid.BALL_SPEED) < 0) _ballDirY      =  1
            
            _ballX += _ballDirX * Breakoid.BALL_SPEED
            _ballY += _ballDirY * Breakoid.BALL_SPEED

            _ctx.fillStyle = Breakoid.BALL_COLOR
            _ctx.beginPath()
            _ctx.arc(_ballX, _ballY, Breakoid.BALL_SIZE, 0, Math.PI*2, true)
            _ctx.closePath()
            _ctx.fill()
            // Bricks
            for (var i=0 ; i<Breakoid.NBROWS ; i++) {
                _ctx.fillStyle = _bricksArray[i].color
                for (var j=0 ; j<Breakoid.NBCOLS ; j++) {
                    if (_bricksArray[i][j])
                        _ctx.fillRect( (j * (Breakoid.BRICK_WIDTH+Breakoid.EMPTY_SPACE)), (i * (Breakoid.BRICK_HEIGHT+Breakoid.EMPTY_SPACE)), Breakoid.BRICK_WIDTH, Breakoid.BRICK_HEIGHT)
                }
            }
            // Bar
            _ctx.fillStyle = Breakoid.BAR_COLOR
            _ctx.fillRect(_barX, _barY, Breakoid.BAR_WIDTH, Breakoid.BAR_HEIGHT)
        };

        function moveBar (e) {
            if (e.keyCode == 39) { // Right
                if ( (_barX + Breakoid.BAR_MOVE + Breakoid.BAR_WIDTH) <= _gameWidth ) _barX += Breakoid.BAR_MOVE 
            }
            else if (e.keyCode == 37) { // Left
                if ( ((_barX - Breakoid.BAR_MOVE)) >= 0 ) _barX -= Breakoid.BAR_MOVE
            }
        };

        function clearContext () {
            _ctx.clearRect(0, 0, _gameWidth, _gameHeight)
        };

        this.start = function () {
            if (_ctx)
                _interval = setInterval(tick, 10)
            else
                console.log('Error during initialization. Start aborted.')
        };
    }

window.Breakoid = Breakoid

}(window));