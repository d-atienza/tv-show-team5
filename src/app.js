const { app } = require("./support/setupExpress");
const { query } = require("./support/db");
const { gameOfThronesEpisodes } = require("./data/gameOfThronesData");
const {
    generateNewEpisodeArray,
    findIndividualEpisode,
    filterEpisodeArrayWithSearch,
    extractFavouriteEpId,
} = require("./supportFunctions");

/** 
 @typedef {import('./data/episodeType').Episode} Episode
*/

//You can delete this once you see the episodes have loaded ok.
summariseEpisodesToConsole(gameOfThronesEpisodes);

//configure the server's route handlers

app.get("/", (req, res) => {
    res.render("pages/index");
});

////////////////////////////////////

// level 100 & level 200
app.get("/GOT", (req, res) => {
    let searchTerm = req.query.filterEp;
    let episodesWithEpCode = generateNewEpisodeArray(gameOfThronesEpisodes);
    let totalEpisodes = episodesWithEpCode.length;

    let filteredSearchArray;

    if (searchTerm == undefined) {
        filteredSearchArray = episodesWithEpCode;
    } else {
        filteredSearchArray = filterEpisodeArrayWithSearch(
            searchTerm,
            episodesWithEpCode,
        );
    }

    res.render("pages/GOT", { GOT: filteredSearchArray, totalEpisodes });
});

////////////////////////////////////

// level 150 - route parameter to singular episode

app.get("/GOT/:episodeid", (req, res) => {
    let searchTerm = req.params.episodeid;
    let episodesWithEpCode = generateNewEpisodeArray(gameOfThronesEpisodes);
    let episodeSelection = findIndividualEpisode(
        searchTerm,
        episodesWithEpCode,
    );
    res.render("pages/GOTEpisode", { GOT: episodeSelection });
});

////////////////////////////////////

// level 250 - adding in favourite episodes
app.get("/favourites", async (req, res) => {
    const dbResult = await query("select * from episodes");
    const rows = dbResult.rows;
    res.json(rows);
    //res.render("pages/favourites", { GOT: filteredSearchArray, totalEpisodes });
});

////////////////////////////////////
app.get("/db-test", async (req, res) => {
    try {
        const dbResult = await query("select now()");
        const rows = dbResult.rows;
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send(
            "Sorry, an error occurred on the server.  Ask the dev team to check the server logs at time " +
                new Date(),
        );
    }
});

/**
 * You can delete this function.  It demonstrates the use of the Episode type in JSDoc.
 * @param {Episode[]} episodes
 * @returns void
 */
function summariseEpisodesToConsole(episodes) {
    console.log(`Loaded ${episodes.length} episodes`);
    console.log("The first episode has name of " + episodes[0].name);
}

// use the environment variable PORT, or 3000 as a fallback if it is undefined
const PORT_NUMBER = process.env.PORT ?? 3000;

//start the server listening indefinitely
app.listen(PORT_NUMBER, () => {
    console.log(
        `Your express app started listening on ${PORT_NUMBER} at ${new Date()}`,
    );
});
