import 'dotenv/config';
import dfsGateway from '$lib/gateways/dfs.gateway';
import routeGateway from '$lib/gateways/route.gateway';
import type { RequestEvent } from '@sveltejs/kit';
import type { Competition } from '$lib/types/competition.interface';

export const GET = async () => {
	return {
		status: 200,
		body: {
			competitions: await dfsGateway.getCompetitions()
		}
	};
};

export const POST = async ({ request }: RequestEvent) => {
	const data = await request.formData();

	const selected = (data.getAll('selected[]') as string[]).map((row) => {
		return JSON.parse(row) as Competition;
	});

	return {
		status: 200,
		body: {
			rows: await routeGateway.getMatrix(selected)
		}
	};
};
