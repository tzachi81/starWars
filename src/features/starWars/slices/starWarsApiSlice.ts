import { createApi, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'

// @ts-ignore
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes"


export interface ICategories {
  [key: string]: string
}

// export type TCategories = ICategory[];

export interface IStarWarsApiResponse {
  count: number,
  next: string,
  previous: string | null,
  results: any[]
}

const baseUrl = 'https://swapi.dev/api';

// Define a starwars API service using a base URL and expected endpoints
export const starWarsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  reducerPath: 'starWarsApi',
  // Tag types for caching and invalidation for scaling-ups the slices/api responses.
  tagTypes: ['starWarsSearchResults', 'starWarsCategories'],
  endpoints: build => ({

    getStarWarsCategories: build.query<ICategories, void>({
      providesTags: ['starWarsCategories'],
        query: () => '/',
        merge: (existingCategories, newCategories) => {
          return { ...existingCategories, ...newCategories };
        },
        keepUnusedDataFor: 3600, // Cache the data for 1 hour
    }),
    
    getStarWarsData: build.query<IStarWarsApiResponse[], { categories: ICategories, searchTerm: string }>({
      providesTags: ['starWarsSearchResults'],
      async queryFn({ categories, searchTerm }, _queryApi, _extraOptions, fetchWithBQ) {
        //In case the search term is empty, return an empty array
        if (searchTerm === '') {
          return { data: [] } as QueryReturnValue<IStarWarsApiResponse[], FetchBaseQueryError, FetchBaseQueryMeta>;
        }
        //Otherwise try to fetch results for each category, and handle errors
        const results = await Promise.all(Object.keys(categories).map(async (categoryUrl, index) => {
          const response = await fetchWithBQ(`${categoryUrl}?search=${searchTerm}`);
          if (response.error) throw response.error;
          return response.data as IStarWarsApiResponse[];
        }));
        return { data: results } as QueryReturnValue<IStarWarsApiResponse[], FetchBaseQueryError, FetchBaseQueryMeta>;
      },
    }),
  }),
})

export const { useGetStarWarsCategoriesQuery, useGetStarWarsDataQuery } = starWarsApiSlice;
