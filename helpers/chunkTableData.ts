export function chunkTableData<T>(data: T[], itemsPerPage: number): T[][] {

    if (itemsPerPage <= 0 || data.length === 0) {
        return [];
    }

    const chunkedData: T[][] = [];

    let chunkCount = 0;
    let currentChunk: T[] = [];
    for (let i = 0; i < data.length; i++) {

        currentChunk.push(data[i]);
        chunkCount++;
        
        if (chunkCount === itemsPerPage || i === data.length - 1) {
            chunkedData.push(currentChunk);
            currentChunk = [];
            chunkCount = 0;
        }
    }

    return chunkedData;
}