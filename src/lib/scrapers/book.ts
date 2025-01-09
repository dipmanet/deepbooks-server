import puppeteer from "puppeteer";

export const getBookInfo = async (novelLink: string) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	try {
		await page.goto(`https://novelfull.net${novelLink}`, {
			waitUntil: "domcontentloaded",
		});

		const infoSelector = "#truyen > div.csstransforms3d > div > div.col-xs-12.col-info-desc";
		const paginationSelector = "#list-chapter > ul > li.last > a";

		const bookInfo = await page.evaluate((infoSelector) => {
			const container = document.querySelector(infoSelector);
			const cover_image_url = container
				?.querySelector("div.col-xs-12.col-sm-4.col-md-4.info-holder > div.books > div.book > img")
				?.getAttribute("src");
			// const infoBlock = container.querySelectorAll("div.info-holder > div.info > div");
			// const genre =
			// 	infoBlock?.length > 0
			// 		? infoBlock.find((item) => item.querySelector("h3")?.text === "Genre:")?.text
			// 		: "N/A";
			const cover_description = container?.querySelector(
				"div.col-xs-12.col-sm-8.col-md-8.desc > div.desc-text"
			)?.innerHTML;
			const rating = container?.querySelector("#rateit-range-2")?.getAttribute("aria-valuenow");

			return { cover_image_url, cover_description, rating: Number(rating) };
		}, infoSelector);

		const noPages = await page.evaluate((paginationSelector) => {
			const paginationEl = document.querySelector(paginationSelector);
			const totalPages = paginationEl ? Number(paginationEl.getAttribute("data-page")) : 1;

			return totalPages;
		}, paginationSelector);

		return { ...bookInfo, noPages };
	} catch (error) {
		console.error("Error fetching chapters:", error);
	} finally {
		await page.close();
	}
};

export const getBookChapters = async (novelLink: string, pageNo = 1) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	try {
		await page.goto(`https://novelfull.net${novelLink}?page=${pageNo}`, {
			waitUntil: "domcontentloaded",
		});

		const resultsSelector = "#list-chapter > div.row > div > ul > li";
		const chapters = await page.evaluate((resultsSelector) => {
			const anchors = Array.from(document.querySelectorAll(resultsSelector));
			const links = anchors.map((anchor, idx) => {
				const id = idx + 1;
				const chapter_title = anchor.querySelector("a")?.getAttribute("title");
				const chapter_link = anchor.querySelector("a")?.getAttribute("href");
				return { id, chapter_title, chapter_link };
			});

			return links;
		}, resultsSelector);

		return chapters;
	} catch (error) {
		console.error("Error fetching chapters:", error);
	} finally {
		await page.close();
	}
};

export const getChapterContent = async (chapter_link: any) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	try {
		await page.goto(`https://novelfull.net${chapter_link}`, {
			waitUntil: "domcontentloaded",
		});

		const contentSelector = "#chapter-content > p";
		await page.waitForSelector(contentSelector);

		const chapter_content = await page.evaluate((contentSelector) => {
			const contents = Array.from(document.querySelectorAll(contentSelector));
			return contents.map((content) => content.outerHTML).join("");
		}, contentSelector);

		return chapter_content;
	} catch (error) {
		console.error("Error fetching chapter content:", error);
	} finally {
		await page.close();
	}
};
