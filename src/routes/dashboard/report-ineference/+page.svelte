<script>
	import axios from 'axios';
	import { marked } from 'marked';

	let file = null;
	let language = 'en'; // Default language is English ("hi" for Hindi)
	let generatedInference = '';
	let generatedInferenceHtml = '';
	let isLoading = false;
	let error = '';

	// When the generated inference updates, convert it to HTML.
	// If Hindi is selected, replace any fancy dashes with a standard hyphen.
	$: {
		let text = generatedInference;
		if (language === 'hi') {
			text = text.replace(/[–—]/g, '-');
			// Optionally, remove duplicate pipes if any (uncomment if needed):
			// text = text.replace(/\|\s*\|/g, '|');
		}
		generatedInferenceHtml = marked(text);
	}

	async function handleFileUpload() {
		if (!file) {
			error = 'Please upload a PDF file.';
			return;
		}
		// Clear previous results and errors.
		generatedInference = '';
		error = '';
		isLoading = true;

		const formData = new FormData();
		formData.append('file', file);
		formData.append('language', language);

		try {
			const response = await axios.post('/api/report-inference', formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			});
			generatedInference = response.data.result;
		} catch (err) {
			console.error(err);
			error = 'An error occurred while generating the inference.';
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="mx-auto flex max-w-2xl flex-col items-center p-4 sm:p-6">
	<h1 class="mb-6 text-center text-2xl font-bold">Upload Your Report</h1>

	<!-- File Upload Input -->
	<input
		type="file"
		accept=".pdf"
		on:change={(e) => {
			file = e.target.files[0];
		}}
		class="mb-4 w-full rounded border p-2"
	/>

	<!-- Language selection -->
	<div class="mb-4 w-full">
		<label class="mr-2 font-semibold">Select Language:</label>
		<select bind:value={language} class="rounded border p-1">
			<option value="en">English</option>
			<option value="hi">Hindi</option>
		</select>
	</div>

	{#if error}
		<p class="mb-4 text-red-500">{error}</p>
	{/if}

	<button
		on:click={handleFileUpload}
		class="w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-50 sm:w-auto"
		disabled={isLoading}
	>
		{isLoading ? 'Analysing' : 'Generate Inference'}
	</button>

	{#if isLoading}
		<div class="mt-4 flex items-center">
			<svg
				class="mr-2 h-6 w-6 animate-spin text-green-500"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
				></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
				></path>
			</svg>
			<span>Analysing</span>
		</div>
	{/if}

	{#if generatedInference && !isLoading}
		<div class="mt-6 w-full rounded bg-gray-100 p-6 shadow">
			<h2 class="mb-4 text-xl font-bold">Generated Inference</h2>
			<div class="generated-inference prose max-w-full">
				{@html generatedInferenceHtml}
			</div>
		</div>
	{/if}
</div>

<style>
	.generated-inference table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 1rem;
	}
	.generated-inference th,
	.generated-inference td {
		border: 1px solid #ddd;
		padding: 0.5rem;
		text-align: left;
	}
	.generated-inference th {
		background-color: #f2f2f2;
	}
	.generated-inference pre {
		background-color: #f7f7f7;
		padding: 1rem;
		overflow-x: auto;
	}
</style>
