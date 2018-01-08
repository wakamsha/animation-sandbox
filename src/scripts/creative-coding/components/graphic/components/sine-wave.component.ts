import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';

type Wave = {
    timeModifier: number;
    lineWidth: number;
    amplitude: number;
    wavelength: number;
    segmentLength: number;
}

@Component(abstractOptions)
export class SineWaveComponent extends AbstractComponent {

    private waves: Wave[];
    private lineStrokeStyle: CanvasGradient;
    private waveLeft = 0;
    private waveWidth = 0;
    private speed = 4;
    private time = 0;

    constructor(a: Title) {
        super(a);
        this.title = 'Sine wave';
    }

    ngOnInit() {
        super.init();

        this.waves = [
            {
                timeModifier: 1,
                lineWidth: 3,
                amplitude: 150,
                wavelength: 200,
                segmentLength: 20
            },
            {
                timeModifier: 1,
                lineWidth: 2,
                amplitude: 150,
                wavelength: 100,
                segmentLength: 10
            },
            {
                timeModifier: 1,
                lineWidth: 1,
                amplitude: -150,
                wavelength: 50,
                segmentLength: 10,
            },
            {
                timeModifier: 1,
                lineWidth: 0.5,
                amplitude: -100,
                wavelength: 100,
                segmentLength: 10,
            }
        ];

        this.refresh();
    }

    onEnterFrame() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.update();
    }

    onResized() {
        this.refresh();
    }

    private update() {
        this.time = this.time - .007;
        for (let i = 0; i < this.waves.length; i++) {
            const timeModifier = this.waves[i].timeModifier || 1;
            this.drawSine({
                time: this.time * timeModifier,
                wave: this.waves[i]
            });
        }
    }

    private drawSine({time, wave}: {
        time: number;
        wave: Wave;
    }) {
        this.ctx.lineWidth = wave.lineWidth;
        this.ctx.strokeStyle = this.lineStrokeStyle;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.beginPath();

        this.ctx.moveTo(0, this.centerY);
        this.ctx.lineTo(this.waveLeft, this.centerY);

        for (let i = 0; i < this.waveWidth; i += wave.segmentLength) {
            const x = (time * this.speed) + (-this.centerY + i) / wave.wavelength;
            const y = Math.sin(x);
            const amp = this.ease({
                percent: i / this.waveWidth,
                amplitude: wave.amplitude
            });
            this.ctx.lineTo(i + this.waveLeft, amp * y + this.centerY);
        }

        this.ctx.lineTo(this.stageWidth, this.centerY);
        this.ctx.stroke();
    }

    private ease({percent, amplitude}: {
        percent: number;
        amplitude: number;
    }): number {
        return amplitude * (Math.sin(percent * Math.PI * 2 - Math.PI / 2) + 1)* .5;
    }

    private refresh() {
        this.lineStrokeStyle = this.ctx.createLinearGradient(0, 0, this.stageWidth, 0);
        this.lineStrokeStyle.addColorStop(0,'rgba(0, 0, 0, 0)');
        this.lineStrokeStyle.addColorStop(0.5,'rgba(255, 255, 255, 0.5)');
        this.lineStrokeStyle.addColorStop(1,'rgba(0, 0, 0, 0)');

        this.waveWidth = this.stageWidth * 0.95;
        this.waveLeft = this.stageWidth * 0.025;
    }
}
