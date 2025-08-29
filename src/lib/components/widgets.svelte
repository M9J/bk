<script lang="ts">
  import type { IWidget } from "$lib/interfaces/Widget";
  import { getWidgets, runWidgets, widgetResults } from "$lib/util/widgets";
  import { onMount } from "svelte";

  let widgets: IWidget[] = [];
  const results = widgetResults;

  onMount(async () => {
    const widgetModules = await getWidgets();
    if (widgetModules) {
      const hasWidgets = Array.isArray(widgetModules) ? widgetModules.length > 0 : false;
      if (hasWidgets) {
        widgets = widgetModules;
        const appenderFn = (widgetElement: HTMLElement, index: number) => {
          if (widgetElement) {
            const container = document.getElementById("widget-element-container-" + index);
            container?.appendChild(widgetElement);
          }
        };
        runWidgets(widgets, appenderFn);
      }
    }
  });
</script>

{#if widgets.length > 0}
  <div class="widgets-container">
    {#each widgets as widget, index (index)}
      <div class="widget">
        {#if widget.title}
          <div class="widget-title">
            {widget.title}
          </div>
        {/if}
        <div class="widget-element-container" id={"widget-element-container-" + index}></div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .widgets-container {
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 16px;
    padding-top: 0;
  }

  .widget {
    background-color: #111;
    color: #fff;
    padding: 16px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
