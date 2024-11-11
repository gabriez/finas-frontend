export const formatDate = fecha => {
    let newDate = new Date(fecha)
    return newDate.toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    });
}