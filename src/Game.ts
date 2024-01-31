import { Game as PGame, Types as PTypes } from "phaser";
import { Story, StoryConfig } from "./Scenes/Story";
import { MainMenu } from "./Scenes/MainMenu";
import { EndCredits } from "./Scenes/EndCredits";

export interface GameConfig {
    width?: number;
    height?: number;
    pixelArt?: boolean;
    phaserConfig?: PTypes.Core.GameConfig;
}

export default class Game {
    scenes: Phaser.Scene[] = [];
    config: GameConfig = {};
    game?: Phaser.Game;

    initialize() {
        this.game = new PGame({
            width: this.config.width,
            height: this.config.height,
            pixelArt: this.config.pixelArt,
            scale: {
                mode: Phaser.Scale.RESIZE,
            },
            ...this.config.phaserConfig,
        });
        return this;
    }

    addMainMenu() {
        this.game?.scene.add("MainMenu", new MainMenu(), true);
        return this;
    }

    addStoryScene(config?: StoryConfig, autoStart = false) {
        this.game?.scene.add("Story", new Story(config), autoStart);
        return this;
    }

    addEndCredits() {
        this.game?.scene.add("EndCredits", new EndCredits());
        return this;
    }
}
