export function formatUptimeDHMS(seconds: number) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (seconds == -1) {
        return 'Offline'
    } else if (seconds < 60) {
        return `${secs}s`;
    } else if (seconds < 3600) {
        return `${minutes}m ${secs}s`;
    } else if (seconds < 86400) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else {
        return `${days}d : ${hours}h : ${minutes}m : ${secs}s`;
    }

    }

export function formatUptimeHM(seconds: number) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (seconds == -1) {
        return 'Offline'
    } else if (seconds < 60) {
        return `${secs}s`;
    } else if (seconds < 3600) {
        return `${minutes}m ${secs}s`;
    } else if (seconds < 86400) {
        return `${hours}h ${minutes}m`;
    } else {
        return `${days}d ${hours}h ${minutes}m`;
    }
}
