import * as cheerio from "cheerio";
import updateCharacters from "./UpdateCharacters";
import * as firebase from "firebase";
import ApiKeys from "../Config/ApiKeys";

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.firebaseConfig);
}

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
  const things4 = await updateCharacters(things3);
  const characterList = await updateWithTomeLocations(things4);
  if (characterList == null) {
    console.log("fail");
    return;
  } else
    await firebase
      .database()
      .ref("charactersTest")
      .set({ charactersTest: characterList });
};

export default getCharacters;

const updateWithTomeLocations = async (characterList) => {
  if (!characterList) return null;
  console.log("here");
  let page = await fetch(
    "https://anothereden.miraheze.org/wiki/Tome_Location_List",
    {
      method: "GET",
    }
  );
  let pageData = await page.text();
  const $ = cheerio.load(pageData);

  const tomeTable = $(".anotherTable").find("tr");
  const tomeList = [];
  tomeTable.each((id, element) => {
    const locationList = $(element).find($("td:nth-child(3)"));
    let location = "";
    locationList.find($("li")).each((i, e) => {
      if (i == locationList.find($("li")).length - 1) {
        location = $(e).text();
      }
    });
    tomeList.push({
      tomeName: $(element).find($("td:nth-child(1) > a")).attr("title"),
      characterLink:
        "https://anothereden.miraheze.org" +
        $(element).find($("td:nth-child(2)")).find($("a")).attr("href"),
      tomeLocation: location,
    });
  });
  characterList.forEach((character) => {
    if (
      character.tomeName.indexOf("Treatise") !== -1 ||
      character.tomeName.indexOf("Codex") !== -1
    ) {
      character.tomeLocation = "VH Dungeons/Garulea/UnderWorld";
    } else if (character.tomeName.indexOf("Opus") !== -1) {
      character.tomeLocation = "VH Dungeons only";
    } else
      tomeList.forEach((tome) => {
        if (tome.characterLink == character.link) {
          if (tome.tomeName == character.tomeName) {
            character.tomeLocation = tome.tomeLocation;
          }
        }
      });
  });
  return characterList;
};
