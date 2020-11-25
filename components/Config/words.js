[
  { Yipha: 0 },
  { Bertrand: 0 },
  { Cynthia: 0 },
  { Zeviro: 0 },
  { Tiramisu: 0 },
  { Myunfa: 0 },
  { Kikyo: 0 },
  { Premaya: 0 },
  { Hismena: 0 },
  { Dunarith: 0 },
  { Lovely: 0 },
  { Philo: 0 },
  { Rosetta: 0 },
  { Shigure: 0 },
  { Tsubame: 0 },
  { Biaka: 0 },
  { Ilulu: 0 },
  { Radica: 0 },
  { Myrus: 0 },
  { Melina: 0 },
  { Nagi: 0 },
  { Isuka: 0 },
  { Shion: 0 },
  { Suzette: 0 },
  { Claude: 0 },
  { Elga: 0 },
  { Dewey: 0 },
  { Felmina: 0 },
  { Tsukiha: 0 },
  { Renri: 0 },
  { Shannon: 0 },
  { Hozuki: 0 },
  { Veina: 0 },
  { Shanie: 0 },
  { Cetie: 0 },
  { Ewan: 0 },
  { Yuna: 0 },
  { Laclair: 0 },
  { Lokido: 0 },
  { Toova: 0 },
  { Radias: 0 },
  { Mighty: 0 },
  { Mariel: 0 },
  { Anabel: 0 },
];
[
  { "Myrus(AS)": 1 },
  { "Anabel(AS)": 1 },
  { "Mariel(AS)": 1 },
  { "Mighty(AS)": 1 },
  { "Toova(AS)": 1 },
  { "Lokido(AS)": 1 },
  { "Laclair(AS)": 1 },
  { "Yuna(AS)": 1 },
  { "Cetie(AS)": 1 },
  { "Shanie(AS)": 1 },
  { "Veina(AS)": 1 },
  { "Renri(AS)": 1 },
  { "Felmina(AS)": 1 },
  { "Nikeh(AS)": 1 },
  { "Akane(AS)": 1 },
  { "Ruina(AS)": 1 },
  { "Elga(AS)": 1 },
  { "Claude(AS)": 1 },
  { "Suzette(AS)": 1 },
  { "Shion(AS)": 1 },
  { "Isuka(AS)": 1 },
  { "Nagi(AS)": 1 },
  { "Melina(AS)": 1 },
];

if (v >= 1) {
  statsTotal.splice(
    statsTotal.findIndex((x) => x.stat === LStats[0].stat),
    1,
    {
      stat: LStats[0].stat,
      value:
        statsTotal[statsTotal.findIndex((x) => x.stat === LStats[0].stat)]
          .value + this.state.LStats[0].value,
    }
  );
}
if (v >= 2) {
  statsTotal.splice(
    statsTotal.findIndex((x) => x.stat === LStats[1].stat),
    1,
    {
      stat: LStats[1].stat,
      value:
        statsTotal[statsTotal.findIndex((x) => x.stat === LStats[1].stat)]
          .value + this.state.LStats[1].value,
    }
  );
}
if (v >= 3) {
  statsTotal.splice(
    statsTotal.findIndex((x) => x.stat === LStats[2].stat),
    1,
    {
      stat: LStats[2].stat,
      value:
        statsTotal[statsTotal.findIndex((x) => x.stat === LStats[2].stat)]
          .value + this.state.LStats[2].value,
    }
  );
}
if (v >= 4) {
  statsTotal.splice(
    statsTotal.findIndex((x) => x.stat === LStats[3].stat),
    1,
    {
      stat: LStats[3].stat,
      value:
        statsTotal[statsTotal.findIndex((x) => x.stat === LStats[3].stat)]
          .value + this.state.LStats[3].value,
    }
  );
}
if (v >= 5) {
  statsTotal.splice(
    statsTotal.findIndex((x) => x.stat === LStats[4].stat),
    1,
    {
      stat: LStats[4].stat,
      value:
        statsTotal[statsTotal.findIndex((x) => x.stat === LStats[4].stat)]
          .value + this.state.LStats[4].value,
    }
  );
}
if (v >= 6) {
  statsTotal.splice(
    statsTotal.findIndex((x) => x.stat === LStats[5].stat),
    1,
    {
      stat: LStats[5].stat,
      value:
        statsTotal[statsTotal.findIndex((x) => x.stat === LStats[5].stat)]
          .value + this.state.LStats[5].value,
    }
  );
}
if (v >= 7) {
  statsTotal.splice(
    statsTotal.findIndex((x) => x.stat === LStats[6].stat),
    1,
    {
      stat: LStats[6].stat,
      value:
        statsTotal[statsTotal.findIndex((x) => x.stat === LStats[6].stat)]
          .value + this.state.LStats[6].value,
    }
  );
}
if (v >= 8) {
  statsTotal.splice(
    statsTotal.findIndex((x) => x.stat === LStats[7].stat),
    1,
    {
      stat: LStats[7].stat,
      value:
        statsTotal[statsTotal.findIndex((x) => x.stat === LStats[7].stat)]
          .value + this.state.LStats[7].value,
    }
  );
}
if (v >= 9) {
  statsTotal.splice(
    statsTotal.findIndex((x) => x.stat === LStats[8].stat),
    1,
    {
      stat: LStats[8].stat,
      value:
        statsTotal[statsTotal.findIndex((x) => x.stat === LStats[8].stat)]
          .value + this.state.LStats[8].value,
    }
  );
}
if (v >= 10) {
  statsTotal.splice(
    statsTotal.findIndex((x) => x.stat === LStats[9].stat),
    1,
    {
      stat: LStats[9].stat,
      value:
        statsTotal[statsTotal.findIndex((x) => x.stat === LStats[9].stat)]
          .value + this.state.LStats[9].value,
    }
  );
}

LStats.forEach((a, i) => {
  let pos = statsTotal.map((x) => x.stat).indexOf(LStats[i].stat);
  statsTotal.splice(pos, 1, {
    stat: LStats[i].stat,
    value: statsTotal[pos].value + LStats[i].value,
  });
});
