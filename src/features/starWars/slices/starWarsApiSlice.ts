import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'

// @ts-ignore
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes"


export interface ICategories {
  [key: string]: string
}

export interface IStarWarsApiResponse {
  count: number,
  next: string,
  previous: string | null,
  results: any[]
}

const baseUrl = 'https://swapi.info/api';

// Define a starwars API service using a base URL and expected endpoints
export const starWarsApiSlice = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  // baseQuery: fetchBaseQuery({ baseUrl, fetchFn: customApiFetch }),
  // Tag types for caching and invalidation for scaling-ups the slices/api responses.
  tagTypes: ['starWarsSearchResults', 'starWarsCategories'],
  endpoints: (build) => ({
    getStarWarsCategories: build.query({
      providesTags: ['starWarsCategories'],
      query: () => '',
    }),

    getStarWarsData: build.query<IStarWarsApiResponse[], { categories: ICategories }>({
      providesTags: ['starWarsSearchResults'],
      async queryFn({ categories }, _queryApi, _extraOptions, fetchWithBQ) {
        //In case the search term is empty, return an empty array
        //Otherwise try to fetch results for each category, and handle errors
        const results = await Promise.all(Object.keys(categories).map(async (categoryUrl, index) => {
          const response = await fetchWithBQ(`${baseUrl}/${categoryUrl}`);
          if (response.error) throw response.error;
          return response.data as IStarWarsApiResponse[];
        }));
        return { data: results } as QueryReturnValue<IStarWarsApiResponse[], FetchBaseQueryError, FetchBaseQueryMeta>;
      },
    }),
  }),
})

export const { useGetStarWarsCategoriesQuery, useGetStarWarsDataQuery } = starWarsApiSlice;
