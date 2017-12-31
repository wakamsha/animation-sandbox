import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';
import {Ship} from '../../../../domains/entities/Ship';
import {KeyType} from '../../../../domains/valueobjects/KeyType';

@Component(baseOptions)
export class ShipSimComponent extends BaseComponent {

    private ship: Ship;
    private vr = 0;
    private thrust = 0;  // 推進力
    private vx = 0;
    private vy = 0;

    private friction = .97;  // Chapter.6 で追加

    constructor(a: Title) {
        super(a);
        this.title = 'Ship sim';
    }

    ngOnInit() {
        super.init();

        this.ship = new Ship();
        this.ship.x = this.centerX;
        this.ship.y = this.centerY;
        this.stage.addChild(this.ship);

        document.addEventListener('keydown', (event: KeyboardEvent) => this.onKeyDown(event));
        document.addEventListener('keyup', () => this.onKeyUp());
    }

    onEnterFrame() {
        this.ship.rotation += this.vr;
        const angle = this.ship.rotation * Math.PI / 180;
        const ax = Math.cos(angle) * this.thrust;
        const ay = Math.sin(angle) * this.thrust;
        this.vx += ax;
        this.vy += ay;

        this.vx *= this.friction;  // Chapter.6 で追加
        this.vy *= this.friction;  // Chapter.6 で追加

        this.ship.x += this.vx;
        this.ship.y += this.vy;

        const bounds = this.ship.getBounds();
        if (this.ship.x - bounds.width / 2 > this.right) {
            this.ship.x = this.left - bounds.width / 2;
        } else if (this.ship.x + bounds.width / 2 < this.left) {
            this.ship.x = this.right + bounds.width / 2;
        }
        if (this.ship.y - bounds.height / 2 > this.bottom) {
            this.ship.y = 0 - bounds.height / 2;
        } else if (this.ship.y < 0 - bounds.height / 2) {
            this.ship.y = this.bottom + bounds.height / 2;
        }

        this.stage.update();
    }

    onKeyDown(event: KeyboardEvent) {
        const keyType = KeyType.getInstance(event.keyCode);
        switch (keyType) {
            case KeyType.LEFT:
                this.vr = -5;
                break;
            case KeyType.RIGHT:
                this.vr = 5;
                break;
            case KeyType.UP:
                this.thrust = .2;
                this.ship.drawShip(true);
                break;
        }
    }

    onKeyUp() {
        this.vr = 0;
        this.thrust = 0;
        this.ship.drawShip(false);
    }
}
