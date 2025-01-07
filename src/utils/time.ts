const calculateHoursAndMinutes = (start: Date | string, end: Date | string | null) => {
    if (!start || !end) {
        return '00:00';
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationMs = endDate.getTime() - startDate.getTime();
    const durationMinutes = Math.floor(durationMs / 60000);
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

const calculateMinutesAndSeconds = (start: Date | string, end: Date | string | null) => {
    if (!start || !end) {
        return '00:00';
    }





    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationMs = endDate.getTime() - startDate.getTime();
    const durationSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = durationSeconds % 60;

        // if duration is greater than 60 minutes, return hours, minutes, and seconds
    if (minutes > 60) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}



export { calculateHoursAndMinutes, calculateMinutesAndSeconds };

