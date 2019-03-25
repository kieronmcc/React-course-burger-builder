export const updateObject = (staleObject, updatedProperties) => {
    return {
        ...staleObject,
        ...updatedProperties
    }
};