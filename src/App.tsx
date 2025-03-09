import { useEffect, useState, useCallback } from "react";
import "./App.css";
import { BotData } from "./types";
import { formatUptimeDHMS, formatUptimeHM } from "./utils/formatTime.ts";

const API_URL = "http://192.168.20.108:3000/status";

function App() {
    const [botData, setBotData] = useState<BotData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    // Fungsi untuk mengambil data dari API
    const fetchBotData = useCallback(async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data: BotData = await response.json();
            setBotData(data);
            setError(false);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    // useEffect untuk memanggil data pertama kali & set interval
    useEffect(() => {
        fetchBotData();
        const interval = setInterval(fetchBotData, 1000);
        return () => clearInterval(interval);
    }, [fetchBotData]);

    return (
        <body>
        <div className="container">
            <div className="glow-border blureffect"></div>

            <h1>Bot Status</h1>

            {loading ? (
                <div className="loading-spinner"></div>
            ) : error ? (
                <div className="error-message">
                    <p>Failed to load data. Retrying...</p>
                    <div className="loading-spinner"></div>
                </div>
            ) : botData ? (
                <>
                    <div className="status-summary">
                        <p><strong>Average Latency:</strong> {botData.avgLatency || '-'} ms</p>
                        <p><strong>Total Servers:</strong> {botData.totalServers || '-'}</p>
                        <p><strong>Uptime:</strong> {formatUptimeDHMS(botData.uptime) || '-'}</p>
                    </div>

                    <div className="cluster-grid">
                        {botData.cluster.map((cluster) => {
                            // Menentukan warna berdasarkan status dan latency
                            let clusterColor = "#03ff00"; // Default warna putih

                            if (cluster.status.toLowerCase() === "offline") {
                                clusterColor = "red"; // Jika offline, warna merah
                            } else if (cluster.avgLatency > 300) {
                                clusterColor = "yellow"; // Jika latency di atas 300ms, warna kuning
                            }

                            return (
                                <div key={cluster.clusterId} className="cluster-box">
                                    <span style={{ color: clusterColor }}>{cluster.clusterId}</span>
                                    <div className="cluster-info">
                                        <p><strong>Status: </strong> {cluster.status}</p>
                                        <p><strong>Avg Latency: </strong> {cluster.avgLatency} ms</p>
                                        <div className="shard-list">
                                            {cluster.shard.map((sh) => (
                                                <div key={sh.shardId} className="shard-item">
                                                    <p><strong>Shard {sh.shardId}: </strong>{sh.latency}ms</p>
                                                </div>
                                            ))}
                                        </div>
                                        <p><strong>Servers: </strong> {cluster.servers}</p>
                                        <p><strong>Uptime: </strong> {formatUptimeHM(cluster.uptime)}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <div className="error-message">
                    <p>No data available.</p>
                </div>
            )}
            </div>
        </body>
    );
}

export default App;
