import type DialogEvent from "./DialogEvent";
import SceneManager from "../SceneManager";

export default class ChoiceEvent implements DialogEvent {
    onDialogReached() {
        SceneManager.currentScene.add;
    }
}
