import type Phaser from "phaser";
import { GameObjects as PGameObjects } from "phaser";

export class TextButton extends PGameObjects.Text {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        text: string,
        style?: Phaser.Types.GameObjects.Text.TextStyle
    ) {
        // @ts-expect-error The style is optional. It will use the default style if no style is provided.
        super(scene, x, y, text, style);

        this.setInteractive();
        this.on("pointerover", () => this.setFontStyle("bold"));
        this.on("pointerout", () => this.setFontStyle(""));
        this.scene.add.existing(this);
    }
}
