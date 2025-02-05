<script>
	import { goto } from '$app/navigation';
	import Card from '../components/Card.svelte';
	import Navbar from '../components/Navbar.svelte';

	// Feature data array (title, description, etc.).
	const features = [
		{
			title: 'General Health Support',
			description: 'Advices General Medication based on symptoms',
			link: '/dashboard/general-health-support'
		},
		{
			title: 'Report Inference Generator',
			description: 'Drafts a first drawn inference based on the report',
			link: '/dashboard/report-ineference'
		},
		{
			title: 'MBTI Mental Health Chatbot',
			description: 'MBTI-enabled personalized chatbot for mental health support',
			link: '/dashboard/mbti-chatbot'
		},
		{
			title: 'Radiology',
			description: 'Gives Reports based on Radiology',
			link: '/dashboard/radiology'
		},
		{ title: 'Task 5', description: 'Placeholder for task 5', link: '/dashboard/task5' },
		{ title: 'Task 6', description: 'Placeholder for task 6', link: '/dashboard/task6' },
		{ title: 'Task 7', description: 'Placeholder for task 7', link: '/dashboard/task7' },
		{ title: 'Task 8', description: 'Placeholder for task 8', link: '/dashboard/task8' }
	];

	function handleDashboardClick() {
		goto('/dashboard');
	}

	function handleSignUp() {
		alert('You are signed up for weekly insights and healthcare tips!');
	}
</script>

<!-- Main container spanning the full width (no extra horizontal padding) -->
<main class="min-h-screen w-full bg-[#AFEEEE]">
	<!-- Navbar -->
	<section id="navbar">
		<Navbar />
	</section>

	<!-- Hero / Content Section -->
	<!-- Replace mt-[100px] with a top padding so the background extends behind the nav -->
	<section class="mx-auto mb-[70px] mt-[64px] max-w-3xl px-4 pt-28 text-center">
		<!-- Now you have 28rem of space at the top (or pick a smaller value),
             but the background is continuous from the very top. -->
		<h1 class="mb-4 text-4xl font-bold text-[#002057]">Transforming Healthcare with AI</h1>
		<p class="mb-6 text-lg text-gray-700">
			Advanced AI-powered health solutions that provide personalized insights, remote consultations,
			and proactive health management.
		</p>
		<button
			on:click={handleDashboardClick}
			class="mt-[10px] rounded bg-[#002057] px-6 py-3 text-[#FFFEFE] transition-colors hover:bg-[#00a373]"
		>
			Go To Dashboard
		</button>
	</section>

	<!-- Card Grid Section -->
	<section
		class="mx-auto mb-[75px] mt-[75px] grid max-w-7xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4"
	>
		{#each features as feature}
			<Card title={feature.title} description={feature.description} link={feature.link} />
		{/each}
	</section>

	<!-- Footer Section (edge-to-edge) -->
	<footer class="mt-12 w-full bg-[#002057] pb-[25px] pl-[30px] pr-[30px] pt-[10px] text-white">
		<div class="grid w-full grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 md:grid-cols-4">
			<!-- BRAND / TAGLINE -->
			<div>
				<h2 class="mb-2 text-2xl font-bold">MedMaster</h2>
				<p class="mb-4">Transforming healthcare through innovative AI solutions.</p>
				<!-- SOCIAL ICONS (Placeholder) -->
				<div class="flex items-center space-x-4">
					<a href="#" class="transition-colors hover:text-black">
						<!-- Twitter Icon -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 fill-current"
							viewBox="0 0 24 24"
						>
							<path
								d="M24 4.557a9.93 9.93 0 01-2.828.775 4.93 4.93 0 002.165-2.723 
								9.875 9.875 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482 
								13.95 13.95 0 01-10.141-5.142 4.9 4.9 0 001.523 6.574 
								4.906 4.906 0 01-2.224-.615v.06a4.93 4.93 0 003.95 4.827 
								4.93 4.93 0 01-2.212.084 4.928 4.928 0 004.601 3.417 
								A9.868 9.868 0 010 19.54 13.93 13.93 0 007.548 22 
								c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.426-.014-.637 
								A9.93 9.93 0 0024 4.557z"
							/>
						</svg>
					</a>
					<a href="#" class="transition-colors hover:text-black">
						<!-- LinkedIn Icon -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 fill-current"
							viewBox="0 0 24 24"
						>
							<path
								d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5S0 4.88 0 3.5 
								C0 2.12 1.11 1 2.48 1s2.48 1.12 2.48 2.5zM.2 8h4.8v14H.2V8zm7.98 0h4.6v1.9h.07c.64-1.2 
								2.22-2.46 4.57-2.46C22.22 7.44 24 9.23 24 12.87v9.13h-4.8v-8.07c0-1.93-.04-4.41-2.68-4.41
								-2.68 0-3.09 2.09-3.09 4.27v8.21H9.18V8z"
							/>
						</svg>
					</a>
					<a href="#" class="transition-colors hover:text-black">
						<!-- Instagram Icon -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 fill-current"
							viewBox="0 0 24 24"
						>
							<path
								d="M12 2.163c3.204 0 3.584.012 4.85.07 1.206.055 1.99.24 2.453.405a4.92 4.92 0 011.77 1.15 
								4.92 4.92 0 011.15 1.77c.165.463.35 1.247.405 2.453.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85
								c-.055 1.206-.24 1.99-.405 2.453a4.94 4.94 0 01-1.15 1.77 4.94 4.94 0 01-1.77 1.15c-.463.165-1.247.35-2.453.405
								-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.055-1.99-.24-2.453-.405a4.92 4.92 0 01-1.77-1.15
								4.92 4.92 0 01-1.15-1.77c-.165-.463-.35-1.247-.405-2.453C2.175 15.584 2.163 15.204 2.163 12 
								s.012-3.584.07-4.85c.055-1.206.24-1.99.405-2.453a4.92 4.92 0 011.15-1.77 4.92 4.92 0 011.77-1.15
								c.463-.165 1.247-.35 2.453-.405C8.416 2.175 8.796 2.163 12 2.163zm0 1.623c-3.17 0-3.548.012-4.795.07
								-1.03.047-1.59.218-1.96.363-.492.19-.844.416-1.214.786-.37.37-.596.722-.786 1.214-.145.37-.316.93-.363 1.96
								-.058 1.247-.07 1.625-.07 4.795s.012 3.548.07 4.795c.047 1.03.218 1.59.363 1.96.19.492.416.844.786 1.214
								.37.37.722.596 1.214.786.37.145.93.316 1.96.363 1.247.058 1.625.07 4.795.07s3.548-.012 4.795-.07
								c1.03-.047 1.59-.218 1.96-.363.492-.19.844-.416 1.214-.786.37-.37.596-.722.786-1.214.145-.37.316-.93.363-1.96
								.058-1.247.07-1.625.07-4.795s-.012-3.548-.07-4.795c-.047-1.03-.218-1.59-.363-1.96a3.297 3.297 0 00-.786-1.214
								c-.37-.37-.722-.596-1.214-.786-.37-.145-.93-.316-1.96-.363-1.247-.058-1.625-.07-4.795-.07zm0 3.55
								a5.29 5.29 0 110 10.58 5.29 5.29 0 010-10.58zm0 8.73a3.44 3.44 0 100-6.88 3.44 3.44 0 000 6.88zm4.988-8.815
								a1.24 1.24 0 110-2.48 1.24 1.24 0 010 2.48z"
							/>
						</svg>
					</a>
				</div>
			</div>

			<!-- QUICK LINKS -->
			<div>
				<h3 class="mb-2 text-lg font-semibold">Quick Links</h3>
				<ul class="space-y-1">
					<li><a href="#" class="transition-colors hover:text-black">About</a></li>
					<li><a href="#" class="transition-colors hover:text-black">Services</a></li>
					<li><a href="#" class="transition-colors hover:text-black">Blog</a></li>
					<li><a href="#" class="transition-colors hover:text-black">Careers</a></li>
				</ul>
			</div>

			<!-- LEGAL -->
			<div>
				<h3 class="mb-2 text-lg font-semibold">Legal</h3>
				<ul class="space-y-1">
					<li><a href="#" class="transition-colors hover:text-black">Privacy Policy</a></li>
					<li><a href="#" class="transition-colors hover:text-black">Terms of Service</a></li>
					<li><a href="#" class="transition-colors hover:text-black">Cookie Settings</a></li>
				</ul>
			</div>

			<!-- STAY UPDATED -->
			<div>
				<h3 class="mb-2 text-lg font-semibold">Stay Updated</h3>
				<p class="mb-2 text-sm">Get weekly insights and healthcare tips.</p>
				<div class="mb-3 flex space-x-2">
					<input
						type="email"
						placeholder="Enter your email"
						class="w-full rounded px-2 py-1 text-black focus:outline-none"
					/>
					<button
						on:click={handleSignUp}
						class="rounded bg-white px-4 py-1 text-[#FA9600] transition-colors hover:bg-gray-100"
					>
						Sign Up
					</button>
				</div>
			</div>
		</div>

		<!-- <div class="border-solid md:border-dotted ..."></div> -->

		<!-- COPYRIGHT / FOOTER BOTTOM -->
		<div class="mb-2 mt-4 w-full px-4 text-center text-sm text-white/90">
			© 2025 MedMaster. All Rights Reserved.
		</div>
	</footer>
</main>
