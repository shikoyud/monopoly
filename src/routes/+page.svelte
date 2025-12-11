<script lang="ts">
  import { goto } from "$app/navigation";
  import CreateRoomModal from "$components/CreateRoomModal.svelte";
  import JoinRoomModal from "$components/JoinRoomModal.svelte";
  import { database, randomCodeGenerator, user } from "$lib";
  import { get, ref, set, update } from "firebase/database";

  let createRoomModal = $state<HTMLDialogElement>();
  let joinRoomModal = $state<HTMLDialogElement>();

  let name = $state("");
  let lobby = $state("");

  async function handleCreate() {
    if (!name.trim().length) {
      return;
    }
    lobby = randomCodeGenerator(6);
    if (user) {
      const playerRef = ref(
        database,
        "lobbies/" + lobby + "/players/" + user.uid,
      );
      const lobbyRef = ref(database, "lobbies/" + lobby);
      try {
        await set(lobbyRef, {
          status: "waiting",
        });
        await set(playerRef, {
          name: name,
          isReady: true,
          isHost: true,
        });
        goto(`/lobby/${lobby}`);
      } catch (e) {
        console.log(
          "Error while creating player or registering onDisconect." + e,
        );
      }
    } else {
      console.log("Failed to sign in as anonymous.");
    }
  }

  async function handleJoin() {
    if (!name.trim().length) {
      return;
    }
    if (lobby.trim().length != 6) {
      return;
    }
    if (user) {
      const playerRef = ref(
        database,
        "lobbies/" + lobby + "/players/" + user.uid,
      );
      const lobbyStatusRef = ref(database, "lobbies/" + lobby + "/status");
      const lobbyRef = ref(database, "lobbies/" + lobby);
      try {
        const status = (await get(lobbyStatusRef)).val();
        if (status !== "playing") {
          await update(lobbyRef, {
            status: "waiting",
          });
        }
        await set(playerRef, {
          name: name,
          isReady: false,
          isHost: false,
        });
        goto(`/lobby/${lobby}`);
      } catch (e) {
        console.log(
          "Error while creating player or registering onDisconect." + e,
        );
      }
    } else {
      console.log("Failed to sign in as anonymous.");
    }
  }
</script>

<div class="flex flex-col items-center justify-center h-screen">
  <button
    class="btn btn-primary m-5"
    onclick={() => createRoomModal!.showModal()}>TẠO PHÒNG</button
  >
  <button class="btn btn-primary m-5" onclick={() => joinRoomModal!.showModal()}
    >THAM GIA</button
  >
</div>

<CreateRoomModal bind:modal={createRoomModal} bind:name {handleCreate} />
<JoinRoomModal bind:modal={joinRoomModal} bind:name bind:lobby {handleJoin} />
