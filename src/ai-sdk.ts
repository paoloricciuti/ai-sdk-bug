import { Experimental_Agent as Agent, stepCountIs } from 'ai';
import { experimental_createMCPClient as createMCPClient } from '@ai-sdk/mcp';
import { writeFileSync } from 'node:fs';
import 'dotenv/config';

const mcp_client = await createMCPClient({
	transport: {
		type: 'http',
		url: 'http://localhost:3000/mcp',
	},
});

console.log('Does it reach here?'); // spoiler: no

const agent = new Agent({
	model: 'anthropic/claude-haiku-4.5',
	tools: await mcp_client.tools(),
	stopWhen: stepCountIs(10),
});

const result = await agent.generate({
	prompt: 'Can you greet me?',
});

writeFileSync(`result-${Date.now()}.json`, JSON.stringify(result, null, 2));
