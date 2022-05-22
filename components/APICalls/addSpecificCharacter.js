import * as cheerio from "cheerio";
import * as firebase from "firebase";
import ApiKeys from "../Config/ApiKeys";

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.firebaseConfig);
}

export default addSpecificCharacter = async (input, characters) => {
  console.log(characters.length);
  if (!input || characters.length < 110)
    return console.log("Old character data not loaded in");
  const scrapeData = async () => {
    let characterPage = await fetch(input, {
      method: "GET",
    });
    let pageData = await characterPage.text();
    const $ = cheerio.load(pageData);
    let name = $(".character-name").find("b").text();
    $(".character-name")
      .find("span")
      .each((id, element) => {
        if (id === 0) name = $(element).text();
      });
    let shadow = false;
    const shadowRaw = $(
      '[title="General Data"]> table > tbody > tr:nth-child(7) > td'
    ).text();
    shadowRaw && shadowRaw.indexOf("hadow") !== -1 ? (shadow = true) : null;
    let tomeName = $(
      " table > tbody > tr:nth-child(5) > td:nth-child(2) > div > a"
    ).attr("title");
    tomeName !== undefined ? null : (tomeName = "");
    const character = {
      as: false,
      element: $('[title="General Data"]> table > tbody > tr:nth-child(3) > td')
        .text()
        .split(",")[0]
        .replace(/[^a-zA-Z]/g, ""),
      manifest: false,
      manifestAs: false,
      skills: getActiveSkills($),
      stats: getStatsData($),
      LStats: getBonusStatsData($),
      valorChant: getValorChantData($),
      name: name,
      shadow: shadow,
      tomeLocation: "?",
      tomeLocationAs: "VH/Garulea dungeons",
      tomeName: tomeName,
      tomeNameAs: "",
      uri: "",
      uriAs: "",
      key: characters.length + 1,
      vc: $(
        ".character-valor-chant> table > tbody > tr:nth-child(5) > td:nth-child(2)"
      ).text(),
      weapon: $(
        '[title = "General Data"]> table > tbody > tr:nth-child(5) > td'
      )
        .text()
        .split("(")[0]
        .replace(/[^a-zA-Z]/g, ""),
    };
    return character;
  };
  function getValorChantData($) {
    let valorChantTable = $(".character-valor-chant").find("tr");
    let valorChant = [];
    valorChantTable.each((id, element) => {
      valorChant.push($(element).find($("td:nth-child(2)")).text());
    });
    valorChant = valorChant.splice(3, valorChant.length);
    return valorChant;
  }
  function getBonusStatsData($) {
    let bonusStatsData = $(".character-stat-bonus").find(".bs-tr");
    let bonusStatsRaw = [];
    bonusStatsData.each((index, element) => {
      let rawBonus = $(element).find($(".bs-td2")).text();
      bonusStatsRaw.push({
        stat: rawBonus.replace(/[^a-z]/gi, ""),
        value: parseInt(rawBonus.replace(/\D/g, "")),
      });
    });
    let bonusStats = bonusStatsRaw.slice(0, 10);
    return bonusStats;
  }
  function getStatsData($) {
    let statsData = $('[title = "Stats Data"]');
    let stats = [];
    statsData.each((index, element) => {
      let PWR = $(element)
        .find($("tr:nth-child(4) > td:nth-child(3)"))
        .text()
        .substr(0, 3);
      let INT = $(element)
        .find($("tr:nth-child(5) > td:nth-child(3)"))
        .text()
        .substr(0, 3);
      let END = $(element)
        .find($("tr:nth-child(6) > td:nth-child(3)"))
        .text()
        .substr(0, 3);
      let SPR = $(element)
        .find($("tr:nth-child(7) > td:nth-child(3)"))
        .text()
        .substr(0, 3);
      let SPD = $(element)
        .find($("tr:nth-child(8) > td:nth-child(3)"))
        .text()
        .substr(0, 3);
      let LCK = $(element)
        .find($("tr:nth-child(9) > td:nth-child(3)"))
        .text()
        .substr(0, 3);
      stats = [
        {
          stat: "HP",
          value: parseInt(
            $(element)
              .find($("tr:nth-child(2) > td:nth-child(3)"))
              .text()
              .replace(/\D/g, "")
          ),
        },
        {
          stat: "MP",
          value: parseInt(
            $(element)
              .find($("tr:nth-child(3) > td:nth-child(3)"))
              .text()
              .replace(/\D/g, "")
          ),
        },
        {
          stat: "PWR",
          value: parseInt(PWR.replace(/\D/g, "")),
        },
        {
          stat: "INT",
          value: parseInt(INT.replace(/\D/g, "")),
        },
        {
          stat: "SPD",
          value: parseInt(SPD.replace(/\D/g, "")),
        },
        {
          stat: "LCK",
          value: parseInt(LCK.replace(/\D/g, "")),
        },
        {
          stat: "END",
          value: parseInt(END.replace(/\D/g, "")),
        },
        {
          stat: "SPR",
          value: parseInt(SPR.replace(/\D/g, "")),
        },
      ];
    });
    return stats;
  }

  function getActiveSkills($) {
    let skillsRaw = [];
    let skillTable = $('[title = "Active Skills"]').find(
      ".character-skill-row"
    );
    skillTable.each((index, element) => {
      if (index >= skillTable.length - 8) {
        let multiplier = $(element)
          .find($(".character-skill-mod"))
          .first()
          .text();
        skillsRaw.push({
          skillName: $(element).find($(".skill-name")).first().text(),
          element: $(element)
            .find($(".character-skill-element-type"))
            .first()
            .find(".upper-grid")
            .text()
            .substr(1),
          mpCost: $(element)
            .find($(".character-skill-mp"))
            .first()
            .text()
            .replace(/\D/g, ""),
          multiplier: multiplier
            .substring(0, multiplier.length - 1)
            .split("x Mod")[0],
          skillEffect: $(element).find($(".skill-description")).first().text(),
        });
      }
    });
    let activeSkills = skillsRaw.filter((e) => e.skillName);
    return activeSkills;
  }
  const newCharacter = await scrapeData();
  characters.push(newCharacter);
  await firebase.database().ref("characters").set({ characters });
};
