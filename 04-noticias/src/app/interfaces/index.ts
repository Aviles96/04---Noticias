// Generated by https://quicktype.io

export interface NewsResponse {
    status:       string;
    totalResults: number;
    articles:     Article[];
}

export interface Article {
    source:         Source;
    author?:        string;
    title:          string;
    description?:   string;
    url:            string;
    urlToImage?:    string;
    publishedAt:    string;
    content?:       string;
}

export interface Source {
    id?:   string;
    name:  string;
}

//Cargar las news por categorias sin estar actualizando cada peticion que hagamaos
export interface ArticlesByCategoryAndPage {
    [key: string ] : {
        page: number,
        articles: Article[]
    }
}
