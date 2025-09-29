import { addItem, removeItem, listItems } from "./inventory.mjs";

addItem("tomato");
listItems();

addItem("carrot");
addItem("blender");
listItems();

removeItem("carrot");
listItems();

removeItem("snail");
listItems();