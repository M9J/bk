<script lang="ts">
  import { currentVersion, latestVersion } from "$lib/stores/main";
  import { hardReloadApplication, unixEpochToVersion } from "$lib/util/settings";
  import { checkForLatestVersion, getCurrentVersion } from "$lib/util/version";
  import { get, writable } from "svelte/store";

  const isNew = writable(false);

  (async () => {
    await getCurrVersion();
    await checkLatestVersion();
  })();

  async function getCurrVersion() {
    const currentVersionResp = await getCurrentVersion();
    currentVersion.update((v) => (v = currentVersionResp));
  }

  async function checkLatestVersion() {
    const latestVersionResp = await checkForLatestVersion();
    latestVersion.update((v) => (v = latestVersionResp));
    isNew.update((v) => (v = Number(get(latestVersion)) > Number(get(currentVersion))));
  }
</script>

<div class="settings-container hide" id="settings-container">
  <div class="columns">
    {#if $currentVersion || $latestVersion}
      <div>
        Versions:<br />
        {#if $currentVersion}
          <span class="monospace">{unixEpochToVersion($currentVersion)} [CURRENT]</span> <br />
        {/if}
        {#if $latestVersion}
          <span class="monospace" class:is-new={$isNew}
            >{unixEpochToVersion($latestVersion)} [LATEST]</span
          ><br />
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
  <br />
  <div class="columns">
    <div>Repo deploy status:</div>
    <div>
      <img
        src="https://github.com/m9j/bk/actions/workflows/deploy.yml/badge.svg"
        alt="Github Deploy Status"
      />
    </div>
  </div>
</div>

<style>
  .settings-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    align-content: flex-start;
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

  .monospace {
    font-family: monospace;
  }
</style>
