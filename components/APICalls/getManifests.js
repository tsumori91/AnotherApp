import * as cheerio from "cheerio";
import * as firebase from "firebase";
import ApiKeys from "../Config/ApiKeys";

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.firebaseConfig);
}

export default getManifests = async (characterList) => {
  let page = await fetch(
    "https://anothereden.miraheze.org/wiki/Weapon_Manifestation",
    {
      method: "GET",
    }
  );
  let pageData = await page.text();
  const $ = cheerio.load(pageData);
  const weaponList = [];
  const manifestTable = $("table > tbody").find($("tr"));
  manifestTable.each((id, element) => {
    const linkBase = "https://anothereden.miraheze.org";
    const weaponLink =
      linkBase + $(element).find($("td:nth-child(2) > div > a")).attr("href");
    const characterLink =
      linkBase +
      $(element).find($("td:nth-child(1) > div> div > a")).attr("href");
    const charName = $(element)
      .find($(" td:nth-child(1) > div >div>a"))
      .attr("title");
    const weaponName = $(element)
      .find($("td:nth-child(2) > div > a"))
      .attr("title");
    const stats = [
      parseInt($(element).find($(" td:nth-child(4)")).text()),
      parseInt($(element).find($(" td:nth-child(5)")).text()),
    ];
    const trueManifestEffectRaw = $(element)
      .find($("td:nth-child(6) > ul > ul"))
      .find("li");
    let trueManifestEffect = "";
    if (trueManifestEffectRaw.length > 0) {
      trueManifestEffectRaw.each((id, element) => {
        id !== 0 ? (trueManifestEffect += "\n") : null;
        trueManifestEffect += $(element).text();
      });
    }
    const thisWeapon = {
      weaponLink,
      characterLink,
      weaponName,
      charName,
      stats,
      trueManifestEffect,
    };
    thisWeapon.weaponName ? weaponList.push(thisWeapon) : null;
  });
  const updatedWeaponList = await addManifestDetails(weaponList);
  updatedWeaponList.forEach((weapon) => {
    characterList.forEach((character) => {
      if (character.link == weapon.characterLink) {
        character.manifestSkills = weapon.skills;
      }
    });
  });
  await firebase
    .database()
    .ref("charactersTest")
    .set({ charactersTest: characterList });
};

const addManifestDetails = async (weaponList) => {
  if (weaponList.length < 10) return;
  let i = 0;
  for (const weapon of weaponList) {
    i++;
    const scrapeData = async () => {
      let weaponPage = await fetch(weapon.weaponLink, {
        method: "GET",
      });
      let pageData = await weaponPage.text();
      const $ = cheerio.load(pageData);
      const skillEffectTable = $(".character-skill-row");
      const skills = [];
      skillEffectTable.each((id, element) => {
        const skillName = $(element).find($(".skill-name >a")).attr("title");
        const skillDescriptionRaw = $(element).find($(".skill-description"));
        const skillMultiplierRaw = $(element).find($(".character-skill-mod"));
        const skillElementRaw = $(element)
          .find($(".character-skill-element-type"))
          .find($(".upper-grid"));
        let skillElement = "";
        let skillMultiplier = "";
        let skillDescription = "";
        skillDescriptionRaw.each((i, e) => {
          i == skillDescriptionRaw.length - 1
            ? (skillDescription = $(e).text())
            : null;
        });
        skillMultiplierRaw.each((i, e) => {
          i == skillMultiplierRaw.length - 1
            ? (skillMultiplier = $(e).text().split(" × Mod")[0])
            : null;
        });
        skillElementRaw.each((i, e) => {
          i == skillElementRaw.length - 1
            ? (skillElement = $(e)
                .text()
                .replace(/[^a-zA-Z]/g, ""))
            : null;
        });
        skills.push({
          skillName,
          skillDescription,
          skillMultiplier,
          skillElement,
        });
      });
      weapon.skills = skills;
    };
    console.log(i);
    try {
      await scrapeData();
    } catch (error) {
      console.log(error);
    }
  }
  return weaponList;
};
