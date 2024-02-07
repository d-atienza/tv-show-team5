//The below are for importing specific functionalities relating to express, PG, GOT Data and support functions.
const { app } = require("./support/setupExpress");
const { query } = require("./support/db");
const { gameOfThronesEpisodes } = require("./data/gameOfThronesData");
const {
    generateNewEpisodeArray,
    findIndividualEpisode,
    filterEpisodeArrayWithSearch,
    extractFavouriteEpId,
    filterOutFavourites,
} = require("./supportFunctions");
/** 
 @typedef {import('./data/episodeType').Episode} Episode
*/

//configure the server's route handlers
//Server Route Handler for Index Page
app.get("/", (req, res) => {
    res.render("pages/index");
});
////////////////////////////////////

//Server Route Handler for GOT page.
app.get("/GOT", async (req, res) => {
    const dbResult = await query("select * from episodes"); //Queries database for all episode data stored, stores in dbResult variable.
    const dbArray = extractFavouriteEpId(dbResult.rows); //Converts dbResult rows from object array to array of numbers representing episode_id's, stored in dbArray.
    let searchTerm = req.query.filterEp; //Stores query result from HTML form on /GOT in a variable.
    let episodesWithEpCode = generateNewEpisodeArray(gameOfThronesEpisodes); //Creates a copy of existing episode array with addition of formatted episode code and summary.
    let totalEpisodes = episodesWithEpCode.length; //Stores the length of the formatted Episode Code Array in a variable.
    let filteredSearchArray; //Evaluates whether searchTerm is undefined, if so then it stores the formatted Episode Code Array in a variable. If searchTerm is not undefined, it filters Episode Code Array with the search Term to store an array of matching episodes in a variable.
    if (searchTerm == undefined) {
        filteredSearchArray = episodesWithEpCode;
    } else {
        filteredSearchArray = filterEpisodeArrayWithSearch(
            searchTerm,
            episodesWithEpCode,
        );
    }

    res.render("pages/GOT", {
        // Renders the GOT view from pages, sends objects to the EJS view including Array of Filtered Episode Objects, number of objects in that array and an array of favourite episode id's.
        GOT: filteredSearchArray,
        totalEpisodes,
        dbArray,
    });
});

//Server Route Handler for specific GOT Episode page.

app.get("/GOT/:episodeid", async (req, res) => {
    const dbResult = await query("select * from episodes"); //Queries database for all episode data stored, stores in dbResult variable.
    const dbArray = extractFavouriteEpId(dbResult.rows); //Converts dbResult rows from object array to array of numbers representing episode_id's, stored in dbArray.
    let searchTerm = req.params.episodeid; //Stores the episodeid submitted by the URL as a variable.
    let episodesWithEpCode = generateNewEpisodeArray(gameOfThronesEpisodes); //Creates a copy of existing episode array with addition of formatted episode code and summary.
    let episodeSelection = findIndividualEpisode(
        //Filters the Episode Object Array using the episodeid submitted by the url to return one episode object.
        searchTerm,
        episodesWithEpCode,
    );
    res.render("pages/GOTEpisode", { GOT: episodeSelection, dbArray }); //Renders view for individual episode object, sends individual object and array of favourite episode_id's.
});

//Server Route Handler for Favourites Page
app.get("/favourites", async (req, res) => {
    const dbResult = await query("select * from episodes"); //Queries database for all episode data stored, stores in dbResult variable.
    const dbArray = dbResult.rows; //Store the dbResult rows data into a variable.
    const episodesWithEpCode = generateNewEpisodeArray(gameOfThronesEpisodes); //Creates a copy of existing episode array with addition of formatted episode code and summary.
    const favouriteEpObjArray = filterOutFavourites(
        //Filters the Episode Object Array using the array of favourite episode_id's.
        dbArray,
        episodesWithEpCode,
    );
    res.render("pages/favourites", { GOT: favouriteEpObjArray }); //Renders view for favourites page, sends array of favourite episode objects.
});

//Server Route Handler for POST requests from form on individual episode pages to mark episodes as favourites.
app.post("/favouritesubmission", async (req, res) => {
    const newFavourite = parseInt(req.body.episode_id); //Convert req param received from individual page url to a number, store this in a variable.
    await query("insert into episodes (episode_id) values ($1)", [
        newFavourite,
    ]); //Insert favourite episode into database using parameterised SQL query.

    res.redirect("/favourites"); //On receipt of POST request, redirects user to Favourites View.
});

//Server Route Handler for testing connection to database.
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

// use the environment variable PORT, or 3000 as a fallback if it is undefined
const PORT_NUMBER = process.env.PORT ?? 3000;

//start the server listening indefinitely
app.listen(PORT_NUMBER, () => {
    console.log(
        `Your express app started listening on ${PORT_NUMBER} at ${new Date()}`,
    );
});
