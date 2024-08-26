export const createLink = (text: string) => {
    let link = text.toLowerCase();

    link = link.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    link = link.replace(/ñ/g, 'n');
    link = link.replace(/\s+/g, '-');
    link = link.replace(/[^a-z0-9-]/g, '');

    return link;
}