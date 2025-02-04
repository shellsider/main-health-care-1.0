<script>
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';

	// We'll store the current utility title so we can show it in the sub-header.
	// By default: "Dashboard"
	export let currentUtility = writable('Dashboard');

	// Updated menu items with route paths:
	const menuItems = [
		{
			title: 'Dashboard',
			icon: 'M3 12h18M3 6h18M3 18h18',
			path: '/dashboard'
		},
		{
			title: 'General Health Support',
			icon: 'M5 13l4 4L19 7',
			path: '/dashboard/general-health-support'
		},
		{
			title: 'Report Ineference Generaor',
			icon: 'M15 10l4.5 4.5M9 10l-4.5 4.5',
			path: '/dashboard/report-ineference'
		},
		{
			title: 'MBTI Mental Health Chatbot',
			icon: 'M12 4v16M4 12h16',
			path: '/dashboard/mbti-chatbot'
		},
		{
			title: 'Radiology',
			icon: 'M6 12l6 6 6-6',
			path: '/dashboard/radiology'
		},
		{
			title: 'Task 5',
			icon: 'M4 6h16M4 10h16M4 14h16M4 18h16',
			path: '/dashboard/task5'
		},
		{
			title: 'Task 6',
			icon: 'M9 12h6',
			path: '/dashboard/task6'
		}
	];

	const otherItems = [
		{ title: 'Task7', icon: '', path: '/dashboard/task7' },
		{ title: 'Task8', icon: '', path: '/dashboard/task8' }
	];

	let sidebarOpen = false;

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	// Called when a sidebar item is clicked
	function handleNavClick(item) {
		// Update the utility title (shown in sub-header)
		currentUtility.set(item.title);
		// Navigate to the route
		goto(item.path);
		// Close sidebar on mobile
		sidebarOpen = false;
	}
</script>

<!-- 
    Container: 
    - h-screen so it fills the viewport 
    - flex row for sidebar + main content 
  -->
<div class="relative flex h-screen w-full bg-gray-100">
	<!-- SIDEBAR (collapsible on mobile) -->
	<aside
		class="
        fixed
        inset-y-0
        left-0
        z-50
        flex
        w-2/3
        transform
        flex-col
        border-r border-gray-200
        bg-[#002057]
        text-gray-800
        shadow-md
        transition-transform
        duration-300
        sm:relative
        sm:w-1/4
        sm:translate-x-0
        {sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        overflow-y-auto
      "
	>
		<!-- Logo Row -->
		<div class="flex items-center justify-between bg-[#002057] px-4 py-4 sm:justify-start">
			<!-- Logo / Brand -->
			<button on:click={() => goto('/')} class="text-2xl font-bold text-[#FFFFFF]">
				MedMaster
			</button>

			<!-- Close button (mobile only) -->
			<button
				on:click={toggleSidebar}
				class="inline-flex items-center justify-center p-2 text-gray-600
                 hover:text-gray-800 focus:outline-none sm:hidden"
			>
				<!-- “X” icon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<!-- Nav Links -->
		<nav class="flex flex-1 flex-col px-4 py-6">
			<div class="flex flex-col space-y-2">
				<!-- Main items -->
				{#each menuItems as item}
					<button
						on:click={() => handleNavClick(item)}
						class="flex items-center space-x-3 rounded-md
                     px-4 py-3 text-left text-lg font-medium
                     transition-colors hover:bg-[#008D6E] hover:text-[#00C383]"
					>
						{#if item.icon}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="h-5 w-5 text-gray-500"
							>
								<path d={item.icon} />
							</svg>
						{/if}
						<span class="text-[#FFFFFF]">{item.title}</span>
					</button>
				{/each}

				<!-- OTHERS heading -->
				<h3 class="mb-2 mt-4 text-sm font-semibold uppercase text-gray-400">Others</h3>

				<!-- Other items -->
				{#each otherItems as other}
					<button
						on:click={() => handleNavClick(other)}
						class="block w-full rounded-md px-4 py-3 text-left text-lg font-medium
                     transition-colors hover:bg-[#008D6E] hover:text-[#00C383]"
					>
						{other.title}
					</button>
				{/each}
			</div>
		</nav>
	</aside>

	<!-- MAIN CONTENT -->
	<div class="flex flex-1 flex-col">
		<!-- MOBILE TOP BAR: hamburger to open sidebar -->
		<header class="flex items-center bg-white p-4 shadow sm:hidden">
			<button
				on:click={toggleSidebar}
				class="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
			>
				<!-- Hamburger Icon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
			<h2 class="ml-4 text-lg font-bold">Dashboard</h2>
		</header>

		<!-- “Utility Navbar” for large screens -->
		<nav class="hidden bg-white px-6 py-3 shadow sm:block">
			<span class="font-semibold text-gray-700">Current Utility:</span>
			<span class="ml-2 font-bold text-[#002057]">
				{#await currentUtility}
					Loading...
				{:then utility}
					{$currentUtility}
				{/await}
			</span>
		</nav>

		<!-- Sub-route content goes in <slot/> -->
		<main class="flex-1 overflow-y-auto p-4 sm:p-6">
			<slot />
		</main>
	</div>
</div>
