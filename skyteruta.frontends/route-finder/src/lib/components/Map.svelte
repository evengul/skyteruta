<script lang="ts">
	import { onMount } from 'svelte';
	import { Loader } from '@googlemaps/js-api-loader';
	import type { DistanceMatrix } from '$lib/types/distanceMatrix.interface';
	import type { Competition } from '$lib/types/competition.interface';

	export let rows: DistanceMatrix;
	export let competitions: Competition[];

	let mapDiv: HTMLElement;

	let ready = false;

	onMount(async () => {
		const loader = new Loader({
			apiKey: 'AIzaSyDyzWuYc4vfUKR5lBHimVYh13V_65Hf4Yc',
			version: 'weekly'
		});
		await loader.load();
		ready = true;
	});
	let zoom = 4.6;
	let center = { lat: 65.5, lng: 15 };
	$: map = ready ? new google.maps.Map(mapDiv, { zoom, center }) : null;

	$: existingMarkers = map
		? (() => {
				// Remove all
				if (existingMarkers && existingMarkers.length > 0) {
					existingMarkers.forEach((existingMarker) => {
						existingMarker.setMap(null);
					});
					existingMarkers = [];
				}

				// If we have rows, create markers from those
				if (rows && Object.keys(rows).length > 0) {
					return Object.entries(rows)
						.map(([id1, row]) => {
							const { from, fromTitle } = Object.values(row)[0];
							return { id: id1, title: fromTitle, coordinates: Object.values(row)[0].from };
						})
						.map(({ id, title, coordinates: [lat, lng] }) => {
							const marker = new google.maps.Marker({ title, position: { lat, lng } });
							marker.set('id', id);
							marker.setMap(map);
							return marker;
						});
				}

				// Otherwise, show selected
				return competitions.map(({ coordinates: [lat, lng], id, title }) => {
					const marker = new google.maps.Marker({ position: { lat, lng }, title });
					marker.set('id', id);
					marker.setMap(map);
					return marker;
				});
		  })()
		: undefined;
</script>

<div class="map" bind:this={mapDiv} />

<style>
	.map {
		height: 100%;
		width: 100%;
	}
</style>
