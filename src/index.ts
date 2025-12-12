#!/usr/bin/env node

import { McpServer } from 'tmcp';
import { serve } from 'srvx';
import { HttpTransport } from '@tmcp/transport-http';

const server = new McpServer(
	{
		name: 'example-server',
		version: '1.0.0',
		description: 'An example TMCP server',
	},
	{
		adapter: undefined,
		capabilities: {
			tools: {},
		},
	}
);

server.tool(
	{
		name: 'example_tool',
		description: 'An example tool without schema validation',
	},
	async () => {
		return {
			content: [
				{
					type: 'text',
					text: 'This is an example tool!',
				},
			],
		};
	}
);

export const http_transport = new HttpTransport(server);

serve({
	async fetch(request) {
		const http_response = await http_transport.respond(request);
		if (http_response) {
			return http_response;
		}
		return new Response(null, { status: 404 });
	},
});
