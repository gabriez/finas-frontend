export const formatDate = fecha => {
    let newDate = new Date(fecha)
    return newDate.toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    });
}

export const formatInputDate = fecha => {
    return new Date(fecha).toISOString().split('T')[0]
}