import { Scene as PScene } from "phaser";
import SceneManager from "../SceneManager";

export default class Scene extends PScene {
    constructor() {
        super();
        SceneManager.currentScene = this;
    }
}
