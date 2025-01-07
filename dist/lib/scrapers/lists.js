var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import puppeteer from "puppeteer";
export const getNovelLists = (listType_1, ...args_1) => __awaiter(void 0, [listType_1, ...args_1], void 0, function* (listType, pageNo = 1) {
    const browser = yield puppeteer.launch();
    const page = yield browser.newPage();
    yield page.goto(`https://novelfull.net/${listType}?page=${pageNo}`, {
        waitUntil: "domcontentloaded",
    });
    const resultsSelector = ".col-truyen-main > .list-truyen > .row";
    const paginationSelector = "div.pagination-container > div > ul > li.last > a";
    const links = yield page.evaluate((resultsSelector) => {
        const anchors = Array.from(document.querySelectorAll(resultsSelector));
        const novels = anchors.map((anchor, idx) => {
            var _a, _b, _c, _d, _e, _f, _g;
            const id = idx + 1;
            const img = (_a = anchor.querySelector("img.cover")) === null || _a === void 0 ? void 0 : _a.getAttribute("src");
            const title = (_b = anchor.querySelector(".truyen-title > a")) === null || _b === void 0 ? void 0 : _b.getAttribute("title");
            const link = (_c = anchor.querySelector(".truyen-title > a")) === null || _c === void 0 ? void 0 : _c.getAttribute("href");
            const author = (_e = (_d = anchor.querySelector(".author")) === null || _d === void 0 ? void 0 : _d.textContent) === null || _e === void 0 ? void 0 : _e.trim();
            const last_chapter = (_f = anchor.querySelector(".text-info > div > a")) === null || _f === void 0 ? void 0 : _f.getAttribute("title");
            const last_chapter_link = (_g = anchor.querySelector(".text-info > div > a")) === null || _g === void 0 ? void 0 : _g.getAttribute("href");
            return {
                id,
                title,
                link,
                author,
                img,
                last_chapter,
                last_chapter_link,
            };
        });
        return novels;
    }, resultsSelector);
    const noPages = yield page.evaluate((paginationSelector) => {
        const paginationEl = document.querySelector(paginationSelector);
        return paginationEl ? Number(paginationEl.getAttribute("data-page")) : 0;
    }, paginationSelector);
    yield browser.close();
    return links;
});
export const searchNovel = (searchKey_1, ...args_1) => __awaiter(void 0, [searchKey_1, ...args_1], void 0, function* (searchKey, searchPageNo = 1) {
    const browser = yield puppeteer.launch();
    const page = yield browser.newPage();
    yield page.goto(`https://novelfull.net/search?keyword=${searchKey}&page=${searchPageNo}`, {
        waitUntil: "domcontentloaded",
    });
    const resultsSelector = ".col-truyen-main > .list-truyen > .row";
    const paginationSelector = "div.pagination-container > div > ul > li.last > a";
    const links = yield page.evaluate((resultsSelector) => {
        const anchors = Array.from(document.querySelectorAll(resultsSelector));
        const novels = anchors.map((anchor, idx) => {
            var _a, _b, _c, _d, _e, _f, _g;
            const id = idx + 1;
            const img = (_a = anchor.querySelector("img.cover")) === null || _a === void 0 ? void 0 : _a.getAttribute("src");
            const title = (_b = anchor.querySelector(".truyen-title > a")) === null || _b === void 0 ? void 0 : _b.getAttribute("title");
            const link = (_c = anchor.querySelector(".truyen-title > a")) === null || _c === void 0 ? void 0 : _c.getAttribute("href");
            const author = (_e = (_d = anchor.querySelector(".author")) === null || _d === void 0 ? void 0 : _d.textContent) === null || _e === void 0 ? void 0 : _e.trim();
            const last_chapter = (_f = anchor.querySelector(".text-info > div > a")) === null || _f === void 0 ? void 0 : _f.getAttribute("title");
            const last_chapter_link = (_g = anchor.querySelector(".text-info > div > a")) === null || _g === void 0 ? void 0 : _g.getAttribute("href");
            return {
                id,
                title,
                link,
                author,
                img,
                last_chapter,
                last_chapter_link,
            };
        });
        return novels;
    }, resultsSelector);
    const noPages = yield page.evaluate((paginationSelector) => {
        const paginationEl = document.querySelector(paginationSelector);
        return paginationEl ? Number(paginationEl.getAttribute("data-page")) : 0;
    }, paginationSelector);
    yield browser.close();
    return { links, noPages };
});
//# sourceMappingURL=lists.js.map