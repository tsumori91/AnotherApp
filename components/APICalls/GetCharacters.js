import * as cheerio from "cheerio";
import updateCharacters from "./UpdateCharacters";

const getCharacters = async () => {
  let page = await fetch("https://anothereden.miraheze.org/wiki/Characters", {
    method: "GET",
  });
  let pageData = await page.text();
  let things1 = [];
  const $ = cheerio.load(pageData);
  let table = $("table > tbody >");
  table.each((index, element) => {
    let roleRaw = $(element).attr("data-role");
    if (typeof roleRaw === "string") {
      roleRaw = roleRaw.split(",");
    }
    let elementRaw = $(element).attr("data-element");
    if (typeof elementRaw === "string") {
      elementRaw = elementRaw.split(",");
    }
    things1.push({
      name: $(element).find($("td:nth-child(2) > a")).text(),
      source: $(element).find($(" a > img")).attr("src"),
      link: `https://anothereden.miraheze.org${$(element)
        .find($("td > a"))
        .attr("href")}`,
      rarity: $(element).find($(" div > b")).text(),
      roles: roleRaw,
      free: $(element).attr("data-free") == "Free" ? true : false,
      shadow: $(element).attr("data-type") == "Light" ? false : true,
      element: elementRaw,
      weapon: $(element).attr("data-weapon"),
    });
  });
  let things2 = things1.filter((item) => item.name);
  things2.forEach((element) => {
    element.rarity = element.rarity.replace(/\D/g, "");
    element.source = element.source.replace("/thumb", "").split("/80px")[0];
  });
  let things3 = things2.filter(
    (item) => item.rarity !== "3" && item.rarity !== "4" && item.rarity !== "34"
  );
  updateCharacters(things3);
};

export default getCharacters;
