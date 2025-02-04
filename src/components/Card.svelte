<script>
	export let title;
	export let description;

	function handleClick() {
		alert(`More info about "${title}" clicked!`);
	}
</script>

<div class="flex h-full flex-col justify-between rounded-md bg-white p-4 shadow-md">
	<h2 class="mb-2 text-xl font-semibold text-gray-800">
		{title}
	</h2>
	<p class="flex-grow text-gray-600">
		{description}
	</p>
	<button
		on:click={handleClick}
		class="mt-4 self-start rounded bg-[#002057] px-4 py-2 text-[#FFFEFE] transition-colors hover:bg-[#00a373]"
	>
		More Info
	</button>
</div>
