import * as cheerio from "cheerio";
import updateWeapons from "./UpdateWeapons";

export default getWeapons = async () => {
  let page = await fetch("https://anothereden.miraheze.org/wiki/Weapons", {
    method: "GET",
  });
  let pageData = await page.text();
  const $ = cheerio.load(pageData);

  let weaponsList = [];
  let weaponsRaw = $(".wikitable.sortable").find("tr");
  weaponsRaw.each((id, element) => {
    let crafted = false;
    let enhance = false;
    const details = $(element).find($("td:nth-child(7)"));
    const garbage = $(element).find($("td:nth-child(7)>ul")).text();
    let effect = [];
    let getHow = "";
    if (details.text().indexOf("Blacksmith") !== -1) {
      (crafted = true),
        details.text().indexOf("(+10)") !== -1 ? (enhance = true) : null;
    }
    if (details.contents()[0]) {
      const effectRaw = details.find($("ul>ul>li"));
      effectRaw.each((i, item) => {
        effect.push($(item).text());
      });
    }
    const name = $(element).attr("data-name");
    try {
      if (crafted) getHow = "Purchased from Blacksmith";
      else getHow = details.text().split(garbage)[0];
    } catch (error) {
      console.log(error + name);
    }
    if (name)
      weaponsList.push({
        name: name,
        type: $(element).attr("data-weapon"),
        stats: [
          parseInt($(element).find($("td:nth-child(5)")).text()),
          parseInt($(element).find($("td:nth-child(6)")).text()),
        ],
        craft: crafted,
        enhance: enhance,
        uri: $(element).find($("img")).attr("src"),
        getHow: getHow,
        effects: effect.join("\n"),
        source:
          "https://anothereden.miraheze.org" +
          $(element).find($(" td:nth-child(3) > a")).attr("href"),
      });
  });
  updateWeapons(weaponsList, "weapon");
};
