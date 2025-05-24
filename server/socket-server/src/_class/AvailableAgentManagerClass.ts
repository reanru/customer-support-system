type AvailableAgent = {
    client: string,
    agent: string
}

export default class AvailableAgentManager {
    // private agents = new Set<string>();
    private agents: AvailableAgent[] = []; // ['agentId']

    add(clientId: string, agentId: string) {
        this.agents.push({client: clientId, agent: agentId});
    }

    remove(clientId: string) {
        // this.agents.delete(agentId);
        const index = this.agents.findIndex(item => item.client === clientId)
        if (index !== -1) {
          this.agents.splice(index, 1);
        }
    }

    getAll() {
        return this.agents;
    }
}