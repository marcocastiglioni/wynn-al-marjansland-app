export interface NavigationItem {
    title: string;
    link: string;
}

export interface NavigationData {
    header: NavigationItem[];
    footer: NavigationItem[];
}