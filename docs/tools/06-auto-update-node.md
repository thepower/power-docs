# Automated updates for node with Watchtower

If configured, every 24 hours the [Watchtower](https://containrrr.dev/watchtower/) will check if a new version of The Power Node is available and update it if so.

:::warning

If you haven't configured automatic updates, DO NOT follow this step.

Use [this guide](./07-node-update.md) instead.

:::

## Start a Watchtower container to automatically update node when a new version is available:

```bash
docker run -d \
--name watchtower \
--restart unless-stopped \
-e WATCHTOWER_CLEANUP=true -e WATCHTOWER_TIMEOUT=60s \
-v /var/run/docker.sock:/var/run/docker.sock \
containrrr/watchtower
```