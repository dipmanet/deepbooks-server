import puppeteer from "puppeteer";

export type BookListType =
	| "latest-release-novel"
	| "hot-novel"
	| "completed-novel"
	| "most-popular";

export const getBooksByListType = async (listType: BookListType, pageNo = 1) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`https://novelfull.net/${listType}?page=${pageNo}`, {
		waitUntil: "domcontentloaded",
	});
	const resultsSelector = ".col-truyen-main > .list-truyen > .row";
	const paginationSelector = "div.pagination-container > div > ul > li.last > a";

	const links = await page.evaluate((resultsSelector: string) => {
		const anchors = Array.from(document.querySelectorAll(resultsSelector));
		const novels = anchors.map((anchor, idx) => {
			const id = idx + 1;
			const img = anchor.querySelector("img.cover")?.getAttribute("src");
			const title = anchor.querySelector(".truyen-title > a")?.getAttribute("title");
			const link = anchor.querySelector(".truyen-title > a")?.getAttribute("href");
			const author = anchor.querySelector(".author")?.textContent?.trim();
			const last_chapter = anchor.querySelector(".text-info > div > a")?.getAttribute("title");
			const last_chapter_link = anchor.querySelector(".text-info > div > a")?.getAttribute("href");

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

	const noPages = await page.evaluate((paginationSelector: string) => {
		const paginationEl = document.querySelector(paginationSelector);
		return paginationEl ? Number(paginationEl.getAttribute("data-page")) : 0;
	}, paginationSelector);

	await browser.close();
	return { pageCount: noPages, pageNo, results: links };
};

export const getBooksBySearch = async (searchKey: string, pageNo = 1) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`https://novelfull.net/search?keyword=${searchKey}&page=${pageNo}`, {
		waitUntil: "domcontentloaded",
	});
	const resultsSelector = ".col-truyen-main > .list-truyen > .row";
	const paginationSelector = "div.pagination-container > div > ul > li.last > a";

	const links = await page.evaluate((resultsSelector: string) => {
		const anchors = Array.from(document.querySelectorAll(resultsSelector));
		const novels = anchors.map((anchor, idx) => {
			const id = idx + 1;
			const img = anchor.querySelector("img.cover")?.getAttribute("src");
			const title = anchor.querySelector(".truyen-title > a")?.getAttribute("title");
			const link = anchor.querySelector(".truyen-title > a")?.getAttribute("href");
			const author = anchor.querySelector(".author")?.textContent?.trim();
			const last_chapter = anchor.querySelector(".text-info > div > a")?.getAttribute("title");
			const last_chapter_link = anchor.querySelector(".text-info > div > a")?.getAttribute("href");

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

	const noPages = await page.evaluate((paginationSelector: string) => {
		const paginationEl = document.querySelector(paginationSelector);
		return paginationEl ? Number(paginationEl.getAttribute("data-page")) : 0;
	}, paginationSelector);

	await browser.close();
	return { pageCount: noPages, pageNo, results: links };
};

export const getBookGenres = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`https://novelfull.net/`, {
		waitUntil: "domcontentloaded",
	});
	const resultsSelector = "#nav > div > div > ul > li.dropdown > div > div > div > ul > li > a";

	const genres = await page.evaluate((resultsSelector: string) => {
		const anchors = Array.from(document.querySelectorAll(resultsSelector));
		const novels = anchors.map((anchor, idx) => {
			const id = idx + 1;
			const title = anchor?.getAttribute("title");
			const link = anchor?.getAttribute("href")?.split("/")[-1];

			return {
				id,
				title,
				link,
			};
		});

		return novels;
	}, resultsSelector);

	await browser.close();
	return genres;
};
export const getBooksByGenre = async (genre: string, pageNo = 1) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`https://novelfull.net/genre/${genre}?page=${pageNo}`, {
		waitUntil: "domcontentloaded",
	});
	const resultsSelector = ".col-truyen-main > .list-truyen > .row";
	const paginationSelector = "div.pagination-container > div > ul > li.last > a";

	const links = await page.evaluate((resultsSelector: string) => {
		const anchors = Array.from(document.querySelectorAll(resultsSelector));
		const novels = anchors.map((anchor, idx) => {
			const id = idx + 1;
			const img = anchor.querySelector("img.cover")?.getAttribute("src");
			const title = anchor.querySelector(".truyen-title > a")?.getAttribute("title");
			const link = anchor.querySelector(".truyen-title > a")?.getAttribute("href");
			const author = anchor.querySelector(".author")?.textContent?.trim();
			const last_chapter = anchor.querySelector(".text-info > div > a")?.getAttribute("title");
			const last_chapter_link = anchor.querySelector(".text-info > div > a")?.getAttribute("href");

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

	const noPages = await page.evaluate((paginationSelector: string) => {
		const paginationEl = document.querySelector(paginationSelector);
		return paginationEl ? Number(paginationEl.getAttribute("data-page")) : 0;
	}, paginationSelector);

	await browser.close();
	return { pageCount: noPages, pageNo, results: links };
};
