import type { IWidget } from "$lib/interfaces/Widget";
import { writable } from "svelte/store";
import { next } from "./common";

export async function getWidgets() {
  const basePath = import.meta.env.MODE === "production" ? "/bk" : "";
  const widgetsFolder = basePath + "/widgets";
  try {
    const widgetsFolderIndexModule = await fetch(widgetsFolder + "/index.json");
    if (widgetsFolderIndexModule) {
      let widgetsIndex = await widgetsFolderIndexModule.json();
      widgetsIndex = widgetsIndex.filter((l: string) => !!l);
      const hasWidgetsIndex = Array.isArray(widgetsIndex) ? widgetsIndex.length > 0 : false;
      if (hasWidgetsIndex) {
        const widgetFileFetchPromises = widgetsIndex.map(
          (widgetFileName: string) =>
            import(/* @vite-ignore */ widgetsFolder + "/" + widgetFileName + ".widget.js")
        );
        return await Promise.all(widgetFileFetchPromises);
      }
    }
  } catch (err) {
    console.error("widgets folder or widgets/index.json not found. Error:", err);
  }
}

export async function runWidgets(widgets: IWidget[], appenderFn: Function) {
  const hasWidgets = Array.isArray(widgets) ? widgets.length > 0 : false;
  if (hasWidgets) {
    for (const [index, widget] of Object.entries(widgets)) {
      runWidget(widget, Number(index), appenderFn);
    }
  }
}

export const widgetResults = writable<Array<any>>([]);

export async function runWidget(widget: IWidget, index: number, appenderFn: Function) {
  next(async () => {
    if (widget.element) {
      appenderFn(widget.element, index);
    }
  });
}
