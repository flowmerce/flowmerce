export interface PageParams {
    locale: string;
}

export interface PageProps {
    params: Promise<PageParams>;
    searchParams: Promise<Record<string, string>>;
}
