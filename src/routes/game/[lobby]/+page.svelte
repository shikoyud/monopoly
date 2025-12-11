<script lang="ts">
  import { page } from "$app/state";
  import Board from "$components/Board.svelte";
  import BoardOverlay from "$components/BoardOverlay.svelte";
  import { Player } from "$lib/models/Player.svelte";
  import { database, user } from "$lib";
  import { gameManager } from "$lib/managers/GameManager.svelte";
  import { playerManager } from "$lib/managers/PlayerManager.svelte";
  import {
    get,
    onChildChanged,
    onValue,
    ref,
    remove,
    update,
  } from "firebase/database";
  import { onMount } from "svelte";
  import GameHUD from "$components/GameHUD.svelte";

  let lobby = page.params.lobby!;

  const playersRef = ref(database, "lobbies/" + lobby + "/players");
  const lobbyTurnRef = ref(
    database,
    "lobbies/" + lobby + "/currentTurnPlayerId",
  );

  let tiles = gameManager.tiles;

  let players = $derived(playerManager.playerList);
  let group = $derived(playerManager.playerByTiles);
  let currentTurnPlayerId = $state("");

  async function initPlayersData() {
    const snapshot = await get(playersRef);
    const playersData: { [id: string]: any } = snapshot.val();
    for (const id in playersData) {
      const playerData = playersData[id];
      if (!playerData.money) {
        playerManager.addNewPlayer(id, playerData.name);
      } else {
        playerManager.playerList.push(Player.fromFirebase(id, playerData));
      }
    }

    playerManager.playerList.forEach((player) => {
      const playerRef = ref(
        database,
        "lobbies/" + lobby + "/players/" + player.id,
      );
      update(playerRef, {
        id: player.id,
        name: player.name,
        money: player.money,
        color: player.color,
        position: player.position,
        ownedProperty: JSON.stringify(player.ownedProperty),
        inJail: player.inJail,
      });
    });

    remove(
      ref(database, "lobbies/" + lobby + "/players/" + user.uid + "/isReady"),
    );
    remove(
      ref(database, "lobbies/" + lobby + "/players/" + user.uid + "/isHost"),
    );
  }

  onMount(() => {
    initPlayersData();
    const unsubcribeChanged = onChildChanged(playersRef, async (snapshot) => {
      const changedPlayer = Player.fromFirebase(snapshot.key!, snapshot.val());
      if (user.uid != snapshot.key) {
        await playerManager.movePlayer(snapshot.key!, snapshot.val().position);
      }
      playerManager.updatePlayer(changedPlayer);
    });
    const unsubcribeTurnChanged = onValue(lobbyTurnRef, (snapshot) => {
      currentTurnPlayerId = snapshot.val();
    });
    return () => {
      unsubcribeChanged();
      unsubcribeTurnChanged();
    };
  });
</script>

<div class="flex h-screen w-screen">
  <BoardOverlay {group} />
  <Board {tiles} />
  <GameHUD {players} {currentTurnPlayerId} />
</div>
