<script lang="ts">
  import { currentVersion, latestVersion } from "$lib/stores/main";
  import { hardReloadApplication, unixEpochToVersion } from "$lib/util/settings";
  import { checkForLatestVersion, getCurrentVersion } from "$lib/util/version";
  import { writable } from "svelte/store";

  getCurrVersion();
  const isNew = writable(false);

  async function getCurrVersion() {
    const currentVersionResp = await getCurrentVersion();
    currentVersion.update((v) => (v = currentVersionResp));
  }

  async function checkLatestVersion() {
    const latestVersionResp = await checkForLatestVersion();
    latestVersion.update((v) => (v = latestVersionResp));
    isNew.update((v) => (v = Number(latestVersion) > Number(currentVersion)));
  }
</script>

<div class="settings-container hide" id="settings-container">
  <div class="columns">
    {#if $currentVersion || $latestVersion}
      <div>
        Versions:<br />
        {#if $currentVersion}
          {unixEpochToVersion($currentVersion)} [CURRENT] <br />
        {/if}
        {#if $latestVersion}
          <span class:is-new={isNew}>{unixEpochToVersion($latestVersion)} [LATEST]</span><br />
        {/if}
      </div>
    {/if}
  </div>
  <div class="rows">
    <button class="settings-button" on:click={() => checkLatestVersion()}>
      Check for latest version
    </button>
    <button class="settings-button" on:click={() => hardReloadApplication()}>
      Hard reload application
    </button>
  </div>
</div>

<style>
  .settings-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    align-content: flex-start;
    background-color: #333;
    color: #fff;
  }

  .rows {
    display: flex;
    flex-direction: row;
    gap: 16px;
    flex-wrap: wrap;
  }

  .columns {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .settings-button {
    height: fit-content;
    padding: 8px;
  }

  .is-new {
    color: #ffff00;
  }
</style>
