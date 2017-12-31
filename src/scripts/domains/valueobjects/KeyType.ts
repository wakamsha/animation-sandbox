export class KeyType {

    public static LEFT    = new KeyType(37, 'LEFT');
    public static UP      = new KeyType(38, 'UP');
    public static RIGHT   = new KeyType(39, 'RIGHT');
    public static DOWN    = new KeyType(40, 'DOWN');
    public static SHIFT   = new KeyType(16, 'SHIFT');
    public static CONTROL = new KeyType(17, 'CONTROL');

    constructor(private _keyCode: number,
                private _keyName: string) {}

    public get keyCode(): number {
        return this._keyCode;
    }

    public get keyName(): string {
        return this._keyName;
    }

    public static getInstance(keyCode: number): KeyType {
        switch (keyCode) {
            case KeyType.LEFT.keyCode    : return KeyType.LEFT;
            case KeyType.UP.keyCode      : return KeyType.UP;
            case KeyType.RIGHT.keyCode   : return KeyType.RIGHT;
            case KeyType.DOWN.keyCode    : return KeyType.DOWN;
            case KeyType.SHIFT.keyCode   : return KeyType.SHIFT;
            case KeyType.CONTROL.keyCode : return KeyType.CONTROL;
            default: return KeyType.DOWN;
        }
    }
}
