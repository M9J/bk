export function hardReloadApplication() {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
    console.log("All service workers have been unregistered.");
    caches
      .keys()
      .then((keys) => {
        return Promise.all(keys.map((key) => caches.delete(key)));
      })
      .then(() => {
        console.log("All caches have been cleared.");
        location.reload();
      });
  });
}

export function unixEpochToVersion(timestamp: string) {
  if (timestamp) {
    const dt = new Date(Number(timestamp));
    const year = String(dt.getFullYear());
    const month = String(dt.getMonth() + 1).padStart(2, "0");
    const day = String(dt.getDate()).padStart(2, "0");
    const secsTodayTillNow = dt.getHours() * 3600 + dt.getMinutes() * 60 + dt.getSeconds();
    const secs = String(secsTodayTillNow).padStart(5, "0");
    const version = `${year}.${month}${day}.${secs}`;
    return version;
  }
}
