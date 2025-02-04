<script>
	// 10 mental health questions
	const questions = [
		{ key: 'overallMood', label: 'How would you rate your overall mood today?' },
		{ key: 'stressLevel', label: 'How stressed or tense do you feel right now?' },
		{ key: 'excitementLevel', label: 'How excited or positive do you feel for the day?' },
		{ key: 'worryLevel', label: 'How worried or anxious are you feeling?' },
		{ key: 'sleepQuality', label: 'How would you rate your recent quality of sleep?' },
		{ key: 'supportLevel', label: 'How connected or supported do you feel by friends/family?' },
		{ key: 'motivationLevel', label: 'How motivated do you feel for your daily tasks?' },
		{ key: 'physicalEnergy', label: 'How physically energized or active do you feel?' },
		{ key: 'happinessMoments', label: 'How often do you feel moments of happiness or calm?' },
		{ key: 'confidenceLevel', label: 'How confident do you feel in handling challenges now?' }
	];

	// MBTI options
	const mbtiOptions = [
		'ISTJ',
		'ISFJ',
		'INFJ',
		'INTJ',
		'ISTP',
		'ISFP',
		'INFP',
		'INTP',
		'ESTP',
		'ESFP',
		'ENFP',
		'ENTP',
		'ESTJ',
		'ESFJ',
		'ENFJ',
		'ENTJ'
	];

	// The user’s answers
	let answers = {
		overallMood: 5,
		stressLevel: 5,
		excitementLevel: 5,
		worryLevel: 5,
		sleepQuality: 5,
		supportLevel: 5,
		motivationLevel: 5,
		physicalEnergy: 5,
		happinessMoments: 5,
		confidenceLevel: 5,
		mbti: ''
	};

	let showQuestions = false; // Whether we’re showing the form
	let loading = false; // Spinner after form submit
	let showChatbot = false; // After spinner, show chatbot
	let summaryPrompt = ''; // The final prompt text

	let chatbotUrl =
		'https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/01/21/08/20250121085924-R8Q809X4.json';

	// Show the question form
	function startQuestions() {
		showQuestions = true;
	}

	// Build the gradient background for the range slider
	function getSliderBackground(value) {
		const min = 1;
		const max = 10;
		const percent = ((value - min) / (max - min)) * 100;
		return `
        background: linear-gradient(
          to right,
          #00C383 0%,
          #00C383 ${percent}%,
          #f0f0f0 ${percent}%,
          #f0f0f0 100%
        )
      `;
	}

	/*
     On Submit:
      1) Validate MBTI selection
      2) Build a summary prompt of user’s ratings
      3) Show spinner
      4) Then show the chatbot plus a “Copy Prompt” button
    */
	function handleSubmit() {
		if (!answers.mbti) {
			alert('Please select your MBTI type before submitting.');
			return;
		}
		loading = true;

		// Build the summary text
		let lines = [];
		lines.push(`MBTI: ${answers.mbti}`);
		lines.push(`Overall Mood: ${answers.overallMood}`);
		lines.push(`Stress Level: ${answers.stressLevel}`);
		lines.push(`Excitement Level: ${answers.excitementLevel}`);
		lines.push(`Worry Level: ${answers.worryLevel}`);
		lines.push(`Sleep Quality: ${answers.sleepQuality}`);
		lines.push(`Support Level: ${answers.supportLevel}`);
		lines.push(`Motivation Level: ${answers.motivationLevel}`);
		lines.push(`Physical Energy: ${answers.physicalEnergy}`);
		lines.push(`Happiness Moments: ${answers.happinessMoments}`);
		lines.push(`Confidence Level: ${answers.confidenceLevel}`);

		summaryPrompt = `User's mental health info:\n${lines.join('\n')}\n\nTailor the experience accordingly.`;

		// Simulate load time or wait for any actual logic
		setTimeout(() => {
			loading = false;
			showChatbot = true;
		}, 1500);
	}

	// Copy the summary prompt text to the user’s clipboard
	async function copyPrompt() {
		try {
			await navigator.clipboard.writeText(summaryPrompt);
			alert('Prompt copied to clipboard!');
		} catch (error) {
			alert('Failed to copy prompt to clipboard.');
			console.error(error);
		}
	}
</script>

<div class="h-full w-full">
	<!-- Step 0: Introduction Section -->
	{#if !showQuestions}
		<section class="flex h-full w-full flex-col items-center justify-center p-4">
			<div class="mx-auto max-w-2xl text-center">
				<h1 class="mb-4 text-2xl font-bold text-gray-700">
					Your Personalized Mental Health Support – MBTI-imbued Chatbot
				</h1>
				<p class="mb-6 text-gray-600">
					Before chatting with our MBTI-based mental health chatbot, please answer a few quick
					questions to help us tailor the experience.
				</p>
				<button
					on:click={startQuestions}
					class="rounded bg-[#00C383] px-6 py-3 text-white transition-colors hover:bg-green-600"
				>
					Start
				</button>
			</div>
		</section>
	{/if}

	<!-- Step 1: Question Form -->
	{#if showQuestions && !loading && !showChatbot}
		<section class="mx-auto max-w-2xl px-4 py-6">
			<h2 class="mb-4 text-xl font-semibold text-gray-700">
				Please rate the following from 1 (lowest) to 10 (highest):
			</h2>
			{#each questions as q}
				<div class="mb-6">
					<label class="mb-2 block font-medium text-gray-700">{q.label}</label>
					<div class="relative w-full">
						<input
							type="range"
							min="1"
							max="10"
							bind:value={answers[q.key]}
							class="slider w-full"
							style={getSliderBackground(answers[q.key])}
						/>
					</div>
					<span class="mt-1 block text-sm text-gray-500">
						Current rating: {answers[q.key]}
					</span>
				</div>
			{/each}

			<!-- MBTI dropdown -->
			<div class="mb-6">
				<label class="mb-2 block font-medium text-gray-700">What is your MBTI type?</label>
				<select
					bind:value={answers.mbti}
					class="w-full rounded border border-gray-300 p-2 focus:outline-none"
				>
					<option value="">-- Select MBTI --</option>
					{#each mbtiOptions as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
			</div>

			<button
				on:click={handleSubmit}
				class="rounded bg-[#00C383] px-6 py-3 text-white transition-colors hover:bg-green-600"
			>
				Submit
			</button>
		</section>
	{/if}

	<!-- Step 2: Loading Spinner -->
	{#if loading}
		<div class="flex h-full w-full flex-col items-center justify-center">
			<div
				class="loader mb-4 h-16 w-16 rounded-full border-8 border-t-8 border-gray-200 ease-linear"
			></div>
			<h2 class="text-xl font-semibold text-gray-700">Loading Chatbot...</h2>
		</div>
	{/if}

	<!-- Step 3: Chatbot iFrame + “Copy Prompt” button -->
	{#if showChatbot}
		<div class="mx-auto max-w-3xl p-4">
			<h2 class="mb-2 text-xl font-semibold text-gray-700">MBTI Mental Health Chatbot</h2>
			<p class="mb-4 text-sm text-gray-500">
				Your personalized data was summarized. You may copy &amp; paste it into the chatbot:
			</p>

			<!-- Copy prompt button -->
			<button
				on:click={copyPrompt}
				class="mb-4 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
			>
				Copy Prompt
			</button>

			<!-- The chatbot iframe (Botpress CDN) -->
			<iframe title="MBTI Chatbot" src={chatbotUrl} class="h-[600px] w-full border border-gray-300">
			</iframe>
		</div>
	{/if}
</div>

<!-- Slider & Loader STYLES -->
<style>
	/* Range slider styling */
	input[type='range'] {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		width: 100%;
		height: 6px;
		border-radius: 3px;
		outline: none;
		cursor: pointer;
	}
	input[type='range']::-webkit-slider-runnable-track {
		height: 6px;
		border-radius: 3px;
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 16px;
		width: 16px;
		border-radius: 9999px;
		background: #00c383;
		border: 2px solid #fff;
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
		margin-top: -5px;
		cursor: pointer;
	}
	input[type='range']:hover::-webkit-slider-thumb,
	input[type='range']:focus::-webkit-slider-thumb {
		background: #00a373;
	}

	/* Firefox track */
	input[type='range']::-moz-range-track {
		height: 6px;
		border-radius: 3px;
		background: transparent;
	}
	input[type='range']::-moz-range-thumb {
		height: 16px;
		width: 16px;
		border-radius: 9999px;
		background: #00c383;
		border: 2px solid #fff;
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
		cursor: pointer;
	}
	input[type='range']:hover::-moz-range-thumb,
	input[type='range']:focus::-moz-range-thumb {
		background: #00a373;
	}
	input[type='range']::-moz-range-progress {
		background-color: transparent;
	}

	/* Loader (spinner) style */
	.loader {
		border-top-color: #00c383;
		animation: spinner 1s linear infinite;
	}
	@keyframes spinner {
		to {
			transform: rotate(360deg);
		}
	}
</style>
