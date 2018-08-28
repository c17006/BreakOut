const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
const WINDOW_WIDTH = canvas.width;
const WINDOW_HEIGHT = canvas.height;
const SPF = 1000 / 60;
const PADDLE_SPEED = 5;
const BLOCK_WIDTH = 50;
const BLOCK_HEIGHT = 20;

const input = new Input();
const ball = new Ball(400, 300, 10, 'red');
const paddle = new Paddle(400, 550, 80, 10, 'deepskyblue');
const blocks = [];

let score = 0;
let block_x = 200;
let block_y = 50;


// block生成
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 8; j++) {
        blocks.push((new Block(block_x, block_y, BLOCK_WIDTH, BLOCK_HEIGHT, "lime")));
        block_x += 55;
    }
    block_x = 200;
    block_y += 25;
}

window.setInterval(game_tick, SPF);

function game_tick() {
    // 入力状況に応じた呼び出し
    if (input.space) {
        ball.start(5);
    }
    if (input.left) {
        paddle.move(-PADDLE_SPEED);
    }
    if (input.right) {
        paddle.move(PADDLE_SPEED);
    }

    // ボールの移動
    ball.move();
    // console.log(ball.y);

    // ボールとパドルの当たり判定
    paddle.collide(ball);
    // ボールとブロックの当たり判定
    blocks_collide();

    if (blocks.length === 0) {
        Clear_Miss("Clear");
    } else if (ball.y >= 650) {
        Clear_Miss("Miss");
    }

    // 各種オブジェクトの描画
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    paddle.draw(ctx);
    ball.draw(ctx);
    blocks.forEach((block) => block.draw(ctx));
    Score();
}

function blocks_collide() {
    // 動作確認用のサンプルコード
    for (let i = 0; i < blocks.length; i++)
        if (blocks[0] && blocks[i].collide(ball)) {
            blocks.splice(i, 1);
        }
}

function Score() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Score: " + score + " pt", 8, 20);
}

function Clear_Miss(str) {
    alert(str);
    document.location.reload();
}

