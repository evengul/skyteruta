<script lang="ts">
	import Map from '$lib/components/Map.svelte';
	import type { Competition } from '$lib/types/competition.interface';
	import type { DistanceMatrix } from '$lib/types/distanceMatrix.interface';
	export let competitions: Competition[] = [];
	export let rows: DistanceMatrix;

	$: selected = competitions.filter((competition) => competition.isSelected);
</script>

<h1>Skyteruta Ruteplanlegger</h1>
<div class="route-container">
	<form method="post">
		<table>
			<thead>
				<tr>
					<th>Velg for ruteplanlegging</th>
					<th>Stevne</th>
					<th>Arrangør</th>
				</tr>
			</thead>
			<tbody>
				{#each competitions as competition}
					<tr>
						<td
							><input
								name="selected[]"
								value={JSON.stringify(competition)}
								type="checkbox"
								bind:checked={competition.isSelected}
							/></td
						>
						<td>{competition.title}</td>
						<td>{competition.organizer}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<button type="submit">Finn beste rute</button>
	</form>

	<div class="map-container">
		<Map competitions={selected} rows={rows ?? []} />
	</div>
</div>

<style>
	.route-container {
		display: flex;
		flex-direction: row;
	}

	.map-container {
		width: 100%;
		height: 85vh;
		top: 20px;
		position: sticky;
	}
</style>
