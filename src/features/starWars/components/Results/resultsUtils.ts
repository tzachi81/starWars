
export const resultsUtils = {

    //TODO: handle empty string/ errors
    reduceCategoryNames: (resultUrl: string) => {
        return resultUrl.split('https://swapi.dev/api/').pop()?.split('/')[0] || ''
    }
}