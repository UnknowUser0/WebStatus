// src/types.ts

export interface Shard {
    shardId: number;
    latency: number;
    status: number;
    servers: number;
}

export interface Cluster {
    status: string;
    clusterId: number;
    uptime: number;
    servers: number;
    shard: Shard[];
    avgLatency: number;
}

export interface BotData {
    status: string;
    avgLatency: number;
    totalServers: number;
    uptime: number;
    cluster: Cluster[];
}
