
export const resultsUtils = {

    reduceCategoryNames: (resultUrl: string) => {
        return resultUrl.split('https://swapi.dev/api/').pop()?.split('/')[0] || ''
    },

    reduceToBasicDetails: (data: any) => {
        let basicDetailsItems = data.map((dataItem: any) => {
            const tempObject = Object.entries(dataItem).reduce((acc: { [key: string]: any }, [key, value]) => {
                if (!Array.isArray(value)) {
                    return { ...acc, [key]: value };
                }
                return acc;
            }, {});
            // return dataItem
            return tempObject;
        });
        return basicDetailsItems;
    },

    splitUnderscore: (item: string) => {
        return item.split('_').join(' ');
    }
}