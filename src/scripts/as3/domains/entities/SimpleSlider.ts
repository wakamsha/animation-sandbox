export class SimpleSlider extends createjs.Container {

        private _width = 16;
        private _height = 100;
        private _handle: createjs.Shape;
        private _back: createjs.Shape;
        private _backWidth = 4;
        private _handleHeight = 6;
        private _backColor = '#cccccc';
        private _backBorderColor = '#999999';
        private _handleColor = '#eeeeee';
        private _handleBorderColor = '#cccccc';
        private _handleRadius = 2;
        private _backRadius = 2;

        constructor(private _min: number = 0,
                    private _max: number = 100,
                    private _value: number = 100) {
            super();
            this._value = Math.min(Math.max(this._value, this._min), this._max);
            this.init();
        }

        private init() {
            this._back = new createjs.Shape();
            this.addChild(this._back);

            this._handle = new createjs.Shape();
            this.addChild(this._handle);
            this._handle.addEventListener('mousedown', () => this.onMouseDown());

            this.drawSlider();
            this.updatePosition();
        }

        private drawSlider() {
            this.drawBack();
            this.drawHandle();
        }

        private drawBack() {
            this._back.graphics.clear();
            this._back.graphics.beginFill(this._backColor);
            this._back.graphics.setStrokeStyle(0, this._backBorderColor);
            this._back.graphics.drawRoundRect(0, 0, this._backWidth, this._height, this._backRadius);
            this._back.graphics.endFill();
            this._back.x = this._width / 2 - this._backWidth / 2;
        }

        private drawHandle() {
            this._handle.graphics.clear();
            this._handle.graphics.beginFill(this._handleColor);
            this._handle.graphics.setStrokeStyle(0, this._handleBorderColor);
            this._handle.graphics.drawRoundRect(0, 0, this._width, this._handleHeight,this. _handleRadius);
            this._handle.graphics.endFill();
        }

        private updatePosition() {
            var handleRange = this._height - this._handleHeight;
            var valueRange = this._max - this._min;
            this._handle.y = handleRange - (this._value - this._min) / valueRange * handleRange;
        }

        private updateValue() {
            var handleRange = this._height - this._handleHeight;
            var valueRange = this._max - this._min;
            this._value = (handleRange - this._handle.y) / handleRange * valueRange + this._min;
            dispatchEvent(new Event('change'));
        }

        private onMouseUp() {
            this.stage.removeEventListener('pressmove', () => this.onMouseMove());
            this.stage.removeEventListener('pressup', () => this.onMouseUp());
            // this._handle.stopDrag();
        }

        private onMouseDown() {
            this.stage.addEventListener('pressmove', () => this.onMouseMove());
            this.stage.addEventListener('pressup', () => this.onMouseUp());
            // this._handle.startDrag(false, new createjs.Rectangle(0, 0, 0, this._height - this._handleHeight));
        }

        private onMouseMove() {
            this.updateValue();
        }



        public invalidate() {
            this.drawSlider();
        }

        public move(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        public setSize(w: number, h: number) {
            this._width = w;
            this._height = h;
            this.drawSlider();
        }

        public set backBorderColor(n: string) {
            this._backBorderColor = n;
            this.drawSlider();
        }
        public get backBorderColor(): string {
            return this._backBorderColor;
        }

        public set backColor(n: string) {
            this._backColor = n;
            this.drawSlider();
        }
        public get backColor(): string {
            return this._backColor;
        }

        public set backRadius(n: number) {
            this._backRadius = n;
        }
        public get backRadius(): number {
            return this._backRadius;
        }

        public set backWidth(n: number) {
            this._backWidth = n;
            this.drawSlider();
        }
        public get backWidth(): number {
            return this._backWidth;
        }

        public set handleBorderColor(n: string) {
            this._handleBorderColor = n;
            this.drawSlider();
        }
        public get handleBorderColor(): string {
            return this._handleBorderColor;
        }

        public set handleColor(n: string) {
            this._handleColor = n;
            this.drawSlider();
        }
        public get handleColor(): string {
            return this._handleColor;
        }

        public set handleRadius(n: number) {
            this._handleRadius = n;
            this.drawSlider();
        }
        public get handleRadius(): number {
            return this._handleRadius;
        }

        public set handleHeight(n: number) {
            this._handleHeight = n;
            this.drawSlider();
            this.updatePosition();
        }
        public get handleHeight(): number {
            return this._handleHeight;
        }

        public set height(n: number) {
            this._height = n;
            this.drawSlider();
        }
        public get height(): number {
            return this._height;
        }

        public set max(n: number) {
            this._max = n;
            this.updatePosition();
        }
        public get max(): number {
            return this._max;
        }

        public set min(n: number) {
            this._min = n;
            this.updatePosition();
        }
        public get min(): number {
            return this._min;
        }

        public set value(n: number) {
            this._value = n;
            this._value = Math.min(this._max, Math.max(this._value, this._min));
            this.updatePosition();
        }
        public get value(): number {
            return this._value;
        }

        public set width(n: number) {
            this._width = n;
            this.drawSlider();
        }
        public get width(): number {
            return this._width;
        }
}
