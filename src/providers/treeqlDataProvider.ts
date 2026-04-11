// treeqlProviderPatched.ts
import { fetchUtils } from 'react-admin';
import type {
    CreateParams,
    CreateResult,
    DataProvider,
    DeleteParams,
    Identifier,
    RaRecord
} from 'react-admin';

const apiUrlMustEndWithoutSlash = (url: string) =>
    url.endsWith('/') ? url.slice(0, -1) : url;

const formatFilterValue = (op: string, value: any): string | null => {
    switch (op) {
        case 'bt':
            if (!Array.isArray(value) || value.length !== 2)
                throw new Error('bt filter needs [min, max]');
            return `${value[0]},${value[1]}`;
        case 'in':
            if (!Array.isArray(value)) throw new Error('in filter needs array');
            return value.join(',');
        case 'is':
            return null;
        default:
            return String(value);
    }
};

const formatFilter = (filter: Record<string, any>): string[] => {
    return Object.entries(filter).flatMap(([key, val]) => {
        if (key === 'q') return [`search=${val}`];

        let operator = 'cs';
        let field = key;

        const match = key.match(/(.+?)(?:_([a-z]{2}))?$/);
        if (match) {
            field = match[1];
            if (match[2]) operator = match[2];
        }

        const isNegated = key.endsWith('_n' + operator);
        const base = isNegated ? `${field},n${operator}` : `${field},${operator}`;

        const formattedVal = formatFilterValue(operator, val);
        if (formattedVal === null) return [`filter=${base}`];

        return [`filter=${base},${formattedVal}`];
    });
};

const formatParams = (params: any): string => {
    const { filter, meta, ...rest } = params || {};
    const searchParams = new URLSearchParams(rest as Record<string, string>);

    if (filter) {
        formatFilter(filter).forEach(f => {
            const [k, v] = f.split('=');
            searchParams.append(k, v);
        });
    }

    if (meta) {
        Object.entries(meta).forEach(([k, v]) => {
            if (!['order', 'page', 'filter'].includes(k)) {
                searchParams.append(k, String(v));
            }
        });
    }

    const query = searchParams.toString();
    return query ? `?${decodeURIComponent(query)}` : '';
};

export const treeqlDataProvider = (
    apiUrl: string,
    httpClient = fetchUtils.fetchJson
): DataProvider => {
    const baseUrl = apiUrlMustEndWithoutSlash(apiUrl);

    const getUrl = (resource: string, extra: any = {}) => {
        const { id, ids, ...params } = extra;
        let path = resource;

        if (id != null) {
            path += `/${id}`;
        } else if (ids?.length) {
            path += `/${ids.join(',')}`;
        }

        return `${baseUrl}/records/${path}${formatParams(params)}`;
    };

    return {
        /* ---------------- LIST ---------------- */
        getList: async (resource, { pagination = {}, sort = {}, filter = {}, meta }) => {
            const { page = 1, perPage = 10 } = pagination;
            const { field = 'id', order = 'ASC' } = sort;

            const url = getUrl(resource, {
                page: `${page},${perPage}`,
                order: `${field},${order}`,
                filter,
                meta,
            });

            const { json } = await httpClient(url);
            return {
                data: json.records || [],
                total: json.results || 0,
            };
        },

        /* ---------------- ONE ---------------- */
        getOne: async (resource, { id, meta }) => {
            const url = getUrl(resource, { id, meta });
            const { json } = await httpClient(url);
            return { data: json };
        },

        /* ---------------- MANY ---------------- */
        getMany: async (resource, { ids, meta }) => {
            const url = getUrl(resource, { ids, meta });
            const { json } = await httpClient(url);
            const data = Array.isArray(json) ? json : [json];
            return { data };
        },

        /* ---------------- MANY REF ---------------- */
        getManyReference: async (resource, { id, target, pagination, sort, filter = {}, meta }) => {
            const { page = 1, perPage = 10 } = pagination;
            const { field = 'id', order = 'ASC' } = sort;

            const enhancedFilter = { ...filter, [target]: id };

            const url = getUrl(resource, {
                page: `${page},${perPage}`,
                order: `${field},${order}`,
                filter: enhancedFilter,
                meta,
            });

            const { json } = await httpClient(url);
            return {
                data: json.records || [],
                total: json.results || 0,
            };
        },

        /* ---------------- UPDATE ---------------- */
        update: async (resource, { id, data, meta }) => {
            const url = getUrl(resource, { id, meta });

            const { json } = await httpClient(url, {
                method: 'PUT',
                body: JSON.stringify(data),
            });

            return { data: json };
        },

        updateMany: async (resource, { ids, data, meta }) => {
            const url = getUrl(resource, { ids, meta });

            const { json } = await httpClient(url, {
                method: 'PUT',
                body: JSON.stringify(data),
            });

            return { data: json };
        },

        /* ---------------- CREATE ---------------- */
        create: async <RecordType extends Omit<RaRecord, 'id'> = any, ResultRecordType extends RaRecord = RecordType & { id: Identifier }>(
            resource: string,
            { data, meta }: CreateParams<RecordType>
        ): Promise<CreateResult<ResultRecordType>> => {

            const url = getUrl(resource, { meta });

            const { json } = await httpClient(url, {
                method: 'POST',
                body: JSON.stringify(data),
            });

            return { data: json as ResultRecordType };
        },

        /* ---------------- DELETE ---------------- */
        delete: async (resource: string, { id, meta }: DeleteParams) => {
            const url = getUrl(resource, { id, meta });

            const { json } = await httpClient(url, { method: 'DELETE' });

            return { data: json };
        },

        deleteMany: async (resource, { ids, meta }) => {
            const url = getUrl(resource, { ids, meta });

            const { json } = await httpClient(url, { method: 'DELETE' });

            return { data: json };
        },
    };
};

export default treeqlDataProvider;
