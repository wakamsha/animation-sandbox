import {Component} from '@angular/core';
import {BaseComponent, baseOptions} from '../../base.component';
import {Title} from '@angular/platform-browser';

@Component(baseOptions)
export class NodeGardenComponent extends BaseComponent {

    private NUM_NODES = 30;
    private MIN_DIST = 200;
    private SPRING_AMOUNT = 0.000001;
    private NODE_COLOR = '#c8cbce';

    private nodes: any[];

    constructor(a: Title) {
        super(a);
        this.title = 'Node Garden';
    }

    ngOnInit() {
        super.init();
        this.nodes = this.createNodes();
        this.ctx.lineWidth = 1.5;
        for (let i = 0; i < this.NUM_NODES; i = (i + 1)|0) {
            this.nodes[i].draw();
        }
    }

    protected onEnterFrame() {
        this.nodes_loop();
    }

    private createNodes() {
        const nodes = [];
        for (let i=0; i< this.NUM_NODES; i++) {
            const me = this;
            const node = {
                radius: 3,
                x: Math.round(Math.random() * me.stageWidth),
                y: Math.round(Math.random() * me.stageHeight),
                vx: Math.random() * 6 - 3, // -3 から 3 までのランダムな数値
                vy: Math.random() * 6 - 3,
                update: function() {
                    this.x += this.vx;
                    this.y += this.vy;
                    // 画面の端に到達したら反対側へ
                    if (this.x > me.stageWidth) {
                        this.x = 0;
                    } else if (this.x < 0) {
                        this.x = me.stageWidth;
                    }
                    if (this.y > me.stageHeight) {
                        this.y = 0;
                    } else if (this.y < 0) {
                        this.y = me.stageHeight;
                    }
                },
                draw: function() {
                    me.ctx.fillStyle = me.NODE_COLOR;
                    me.ctx.beginPath();
                    me.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
                    me.ctx.closePath();
                    me.ctx.fill();
                }
            };
            nodes.push(node);
        }
        return nodes;
    }

    private nodes_loop() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        // 移動させる
        for (let i=0; i < this.NUM_NODES; i++) {
            this.nodes[i].update();
            this.nodes[i].draw();

            // 同じnode同士にならないように1つずらして総当たり
            const node1 = this.nodes[i];
            for (let j = i + 1; j < this.NUM_NODES; j++) {
                const node2 = this.nodes[j];

                // node同士の距離を求める
                const dx = node1.x - node2.x;
                const dy = node1.y - node2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // 2つのnodeの距離が閾値を下回ったらつなげる
                if (dist < this.MIN_DIST) {
                    // 2つの間に線を引く
                    this.ctx.beginPath();
                    // 距離が近いほど透明度を下げる
                    this.ctx.strokeStyle = 'rgba(200 ,203, 206,' + (1 - dist / this.MIN_DIST) + ')';
                    this.ctx.moveTo(node1.x, node1.y);
                    this.ctx.lineTo(node2.x, node2.y);
                    this.ctx.stroke();
                    this.ctx.closePath();

                    // お互いに逃げる
                    const ax = dx * this.SPRING_AMOUNT;
                    const ay = dy * this.SPRING_AMOUNT;
                    node1.vx += ax;
                    node1.vy += ay;
                    node2.vx -= ax;
                    node2.vy -= ay;
                }
            }
        }
    }
}
