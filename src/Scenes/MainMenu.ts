import Phaser from "phaser";
import { TextButton } from "../GUI/TextButton";
import Scene from "./Scene";

interface MainMenuConfig {
    titleStyle?: Phaser.Types.GameObjects.Text.TextStyle;
    playStyle?: Phaser.Types.GameObjects.Text.TextStyle;
    settingsStyle?: Phaser.Types.GameObjects.Text.TextStyle;
    quitStyle?: Phaser.Types.GameObjects.Text.TextStyle;
}

export class MainMenu extends Scene {
    config: MainMenuConfig = {};

    constructor(config: MainMenuConfig = {}) {
        super();
        this.config = config;
    }

    create() {
        this.add.text(100, 100, "The Game");

        new TextButton(this, 100, 200, "Play", this.config.playStyle).on(
            "pointerdown",
            () => {
                this.scene.start("Story");
            }
        );
        new TextButton(this, 100, 250, "Settings", this.config.settingsStyle);
        new TextButton(this, 100, 300, "Quit", this.config.quitStyle);
    }
}
