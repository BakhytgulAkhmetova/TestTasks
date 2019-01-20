export const filterDuration = (minutes: number) => {
    const hours = Math.trunc(minutes/60);
    const min = minutes - (60 * hours);
    return { hours, min }
};
