const cheerio = require("cheerio");

function getRankings() {
  const myFunction = () => {
    fetch(
      "https://nameless-retreat-32013.herokuapp.com/https://anothereden.miraheze.org/wiki/Tier_Lists",
      {
        method: "GET",
      }
    ).then(async (response) => {
      const data = await response.text();
      let things1 = [];
      const $ = cheerio.load(data);
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
      console.log(things3);
    });
  };
  myFunction();
  return (
    <div className="App">
      <header className="App-header">
        <p>Working baby</p>
      </header>
    </div>
  );
}

export default getRankings;
