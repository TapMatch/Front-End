export default function capitalizeString(s: string) {
    const str = s.trim();
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}