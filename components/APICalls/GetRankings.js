import * as cheerio from "cheerio";

const getRankings = async () => {
  let page = await fetch("https://anothereden.miraheze.org/wiki/Tier_Lists", {
    method: "GET",
  });
  let pageData = await page.text();
  let things1 = [];
  const $ = cheerio.load(pageData);
  let table = $("table > tbody >");
  table.each((index, element) => {
    things1.push({
      name: $(element).find($("span")).text(),
      ranking: $(element).find($("td:nth-child(4)")).text(),
    });
  });
  const things2 = things1.filter(
    (e) =>
      e.name.length < 20 &&
      e.name.length > 2 &&
      e.ranking.length > 1 &&
      e.ranking.length < 5
  );
  const things3 = [...things2];
  things3.forEach((element) => {
    element.ranking = element.ranking.replace(/\D/g, "");
  });
  return things3;
};

export default getRankings;
