import * as cheerio from "cheerio";

const updateCharacters = async (input) => {
  if (!input) return;
  let characterList = input;
  for (const character of characterList) {
    let name = character.name;
    const scrapeData = async () => {
      try {
        let characterPage = await fetch(character.link, {
          method: "GET",
        });
        let pageData = await characterPage.text();
        const $ = cheerio.load(pageData);

        character.activeSkills = getActiveSkills($);
        character.passiveSkills = getPassiveSkills($);
        character.stats = getStatsData($);
        character.bonusStats = getBonusStatsData($);
        character.valorChant = getValorChantData($);
        character.tomeName = getTomeName($);

        console.log("y");
      } catch {
        console.log(name + " failed");
      }
      function getTomeName($) {
        let tomeTable = $(".character-class");
        let tomeName = $(tomeTable)
          .find($("tbody > tr:nth-child(5) > td:nth-child(2) > div > a"))
          .attr("title");
        if (typeof tomeName !== "string")
          tomeName = $(tomeTable)
            .find(
              $("tbody > tr:nth-child(5) > td:nth-child(2) > div:nth-child(1)")
            )
            .text();
        if (typeof tomeName == "string") return tomeName;
        else return "";
      }
      function getValorChantData($) {
        let valorChantTable = $(".character-valor-chant").find("tr");
        let valorChant = [];
        valorChantTable.each((id, element) => {
          if (id >= valorChantTable.length - 2)
            valorChant.push($(element).find($("td:nth-child(2)")).text());
        });
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
          stats = {
            HP: parseInt(
              $(element)
                .find($("tr:nth-child(2) > td:nth-child(3)"))
                .text()
                .replace(/\D/g, "")
            ),
            MP: parseInt(
              $(element)
                .find($("tr:nth-child(3) > td:nth-child(3)"))
                .text()
                .replace(/\D/g, "")
            ),
            PWR: parseInt(PWR.replace(/\D/g, "")),
            INT: parseInt(INT.replace(/\D/g, "")),
            END: parseInt(END.replace(/\D/g, "")),
            SPR: parseInt(SPR.replace(/\D/g, "")),
            SPD: parseInt(SPD.replace(/\D/g, "")),
            LCK: parseInt(LCK.replace(/\D/g, "")),
          };
        });
        return stats;
      }

      function getActiveSkills($) {
        let skillsRaw = [];
        let skillTable = $('[title = "Active Skills"]').find(
          ".character-skill-row"
        );
        skillTable.each((index, element) => {
          let multiplier = $(element)
            .find($(".character-skill-mod"))
            .first()
            .text();
          skillsRaw.push({
            name: $(element).find($(".skill-name")).first().text(),
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
            effect: $(element).find($(".skill-description")).first().text(),
          });
        });
        let activeSkills = skillsRaw.filter((e) => e.name);
        return activeSkills;
      }
      function getPassiveSkills($) {
        let skillsRaw = [];
        let passiveSkillRows = $('[title = "Passive Skills"]').find(
          ".character-skill-row"
        );
        passiveSkillRows.each((index, element) => {
          skillsRaw.push({
            name: $(element).find($(".skill-name")).text(),
            effect: $(element).find($(".skill-description")).text(),
          });
        });
        let passiveSkills = skillsRaw.filter((e) => e.name);
        return passiveSkills;
      }
    };
    await scrapeData();
  }
  return characterList;
};

export default updateCharacters;
