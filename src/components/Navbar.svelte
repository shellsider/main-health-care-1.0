<script>
	let mobileNavOpen = false;

	function toggleMobileNav() {
		mobileNavOpen = !mobileNavOpen;
	}
</script>

<!-- Navbar container -->
<nav class="fixed left-0 top-0 z-50 w-full bg-[#002057]">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo / Brand -->
			<div class="flex-shrink-0">
				<!-- Replace with your actual logo or an <img> tag -->
				<h1 class="text-xl font-bold text-[#FFFEFE]">MedMaster</h1>
			</div>

			<!-- Desktop Nav Links -->
			<div class="hidden space-x-8 md:flex">
				<a href="#" class="text-[#FFFEFE] transition-colors hover:text-[#00C383]"> Home </a>
				<a href="#" class="text-[#FFFEFE] transition-colors hover:text-[#00C383]"> About </a>
				<a href="#" class="text-[#FFFEFE] transition-colors hover:text-[#00C383]"> Services </a>
				<a href="#" class="text-[#FFFEFE] transition-colors hover:text-[#00C383]"> Contact </a>
			</div>

			<!-- Mobile Menu Button -->
			<div class="flex items-center md:hidden">
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-md p-2 text-[#FFFEFE] hover:text-[#00C383] focus:outline-none"
					on:click={toggleMobileNav}
					aria-controls="mobile-menu"
					aria-expanded={mobileNavOpen}
				>
					<!-- "Hamburger" icon -->
					<svg
						class="h-6 w-6"
						stroke="currentColor"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
					>
						<path
							class={mobileNavOpen ? 'hidden' : 'block'}
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M4 6h16M4 12h16M4 18h16"
						/>
						<path
							class={mobileNavOpen ? 'block' : 'hidden'}
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Nav Links -->
	<div class={`md:hidden ${mobileNavOpen ? 'block' : 'hidden'}`} id="mobile-menu">
		<div class="space-y-1 bg-[#00C383]/90 px-2 pb-3 pt-2">
			<a
				href="#"
				class="block rounded-md px-3 py-2 text-base font-medium text-[#FFFEFE] hover:bg-[#FFFEFE] hover:text-[#00C383]"
			>
				Home
			</a>
			<a
				href="#"
				class="block rounded-md px-3 py-2 text-base font-medium text-[#FFFEFE] hover:bg-[#FFFEFE] hover:text-[#00C383]"
			>
				About
			</a>
			<a
				href="#"
				class="block rounded-md px-3 py-2 text-base font-medium text-[#FFFEFE] hover:bg-[#FFFEFE] hover:text-[#00C383]"
			>
				Services
			</a>
			<a
				href="#"
				class="block rounded-md px-3 py-2 text-base font-medium text-[#FFFEFE] hover:bg-[#FFFEFE] hover:text-[#00C383]"
			>
				Contact
			</a>
		</div>
	</div>
</nav>
