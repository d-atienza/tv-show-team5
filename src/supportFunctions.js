/**
 * Clones a given array of objects then inserts two new key value pairs: a formatted Episode Code and a formatted Episode Summary.
 *
 * @param {Object[]} inputArray - Array of given Objects
 * @returns {Object[]} Formatted array with two new key value pairs added (EpisodeCode, Neat Summary)
 */
function generateNewEpisodeArray(inputArray) {
    const episodeArray = [...inputArray]; // clones the array of episode objects

    for (let episode of episodeArray) {
        episode.epCode = createEpCode(episode);
        episode.neatSummary = removePTags(episode);
    }

    return episodeArray;
}
/**
 * Takes a single episode object, inserts a new key value pair using the original episode summary as a base. The new value has <p></p> tags removed.
 * @param {Object} episode - Individual object representing episodes.
 * @returns {String} Decorated summary with <p> tags removed.
 */
function removePTags(episode) {
    const newSummary = episode.summary.replace(/<\/?p>/gi, "");
    return newSummary;
}
/**
 * Takes an individual episode object and inserts a new key value pair using the Season and Episode numbers as a base. The new value is a formatted Episode Code e.g "S01E01"
 * @param {Object} episode - Individual object representing episodes.
 * @returns {String} Formatted season code e.g. "S01E01"
 */
function createEpCode(episode) {
    let strSeason = episode.season.toString();
    let strNumber = episode.number.toString();

    let epCode =
        "S" + strSeason.padStart(2, "0") + "E" + strNumber.padStart(2, "0");

    return epCode; //expected example: S02E01
}
/**
 * Takes a string and converts to a number. Takes an array of objects, finds the first instance where an object contains the search number.
 * @param {String} searchTerm - Input search string.
 * @param {Object[]} arrayOfObjects - Array of objects representing episodes.
 * @returns {Object} Matching episode where search number is found within object. Returns undefined if not found.
 */
function findIndividualEpisode(searchTerm, arrayOfObjects) {
    let numTerm = parseInt(searchTerm);
    let individualEpisode = arrayOfObjects.find(
        (object) => object.id === numTerm,
    );
    return individualEpisode;
}
/**
 * Takes a String, converts it to lower case and stores in a variable. Takes an array of objects, cross references the String against the name of the episode and neat summary of the episode returning true if String is contained within. Where true, object is added to a new array which is returned. New Array will be empty if no matches found.
 * @param {String} searchTerm - Input search string.
 * @param {Object[]} arrayOfObjects - Array of objects representing episodes.
 * @returns {Object[]} Array of episode objects where search term matched within name or summary key value pairs. If no matches found, returns an empty array.
 */
function filterEpisodeArrayWithSearch(searchTerm, arrayOfObjects) {
    let lowerSearchTerm = searchTerm.toLowerCase();

    let resultArray = arrayOfObjects.filter((object) => {
        return (
            object.name.toLowerCase().includes(lowerSearchTerm) ||
            object.neatSummary.toLowerCase().includes(lowerSearchTerm)
        );
    });

    return resultArray;
}
/**
 * Takes an array of objects, creates a new array with just the episode id's as numbers in an array.
 * @param {Object[]} EpisodeObjectArray - Array of objects representing episodes.
 * @returns {Number[]} Array of numbers representing episode id's.
 */
function extractFavouriteEpId(EpisodeObjectArray) {
    let resultArray = EpisodeObjectArray.map((object) => object["episode_id"]);
    return resultArray;
}
/**
 * Creates an empty array. Converts an array of episode objects into an array of just episode id's. Compares each element of episode id array against each element of array of episode objects, where episode id matches between elements are found, the object is pushed to the empty array.
 * @param {Object[]} ArrayOfFavEpObj - Array of objects representing favopurite episodes.
 * @param {Object[]} ArrayOfEpisodeObjects - Array of objects representing episodes.
 * @returns {Object[]} Array of objects representing favourite episodes.
 */
function filterOutFavourites(ArrayOfFavEpObj, ArrayOfEpisodeObjects) {
    let resultObjArray = [];
    let filteredFavouritesArray = extractFavouriteEpId(ArrayOfFavEpObj); //e.g. [{123, 456}] becomes [123, 456]
    filteredFavouritesArray.forEach((element) => {
        for (let episodeObj of ArrayOfEpisodeObjects) {
            if (element === episodeObj.id) {
                resultObjArray.push(episodeObj);
            }
        }
    });
    return resultObjArray;
}

module.exports = {
    generateNewEpisodeArray,
    findIndividualEpisode,
    createEpCode,
    filterEpisodeArrayWithSearch,
    extractFavouriteEpId,
    filterOutFavourites,
};
