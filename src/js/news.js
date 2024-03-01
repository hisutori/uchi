'use strict';

const isStorageAvailable = () => {
    const test = 'test';

    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);

        return true;
    } catch {
        return false;
    }
};

const isCacheAvailable = () => {
    return (
        isStorageAvailable() &&
        localStorage.getItem('news') !== null &&
        new Date(Number(localStorage.getItem('ttl')) + 60 * 60 * 1000) > new Date()
    );
};

const fetchNews = async () => {
    if (isCacheAvailable()) {
        return JSON.parse(localStorage.getItem('news'));
    } else {
        const response = await fetch('https://ok.surf/api/v1/cors/news-feed');

        if (!response.ok) {
            return [];
        }

        const data = await response.json();

        const sectionsList = ['World', 'Business', 'Health', 'Science', 'Technology'];
        let news = [];

        for (const section of sectionsList) {
            news.push(...data[section].slice(0, 4));
        }

        if (isStorageAvailable()) {
            localStorage.setItem('news', JSON.stringify(news));
            localStorage.setItem('ttl', +new Date());
        }

        return news;
    }
};

const displayNews = (newsList) => {
    const list = document.body.querySelector('ul');

    for (const news of newsList) {
        const title = news.title
            .replace('‘', "'")
            .replace('’', "'")
            .replace('“', '"')
            .replace('”', '"')
            .replace(/\[.*?\]/g, '');

        const item = document.createElement('li');
        item.textContent = title;

        list.append(item);
    }
};

// Main
(async () => {
    const news = await fetchNews();

    if (/complete|interactive|loaded/.test(document.readyState)) {
        displayNews(news);
    } else {
        document.addEventListener('DOMContentLoaded', displayNews(news));
    }
})();
