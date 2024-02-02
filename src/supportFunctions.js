function generateNewEpisodeArray(inputArray) {
    const episodeArray = [...inputArray]; // clones the array of episode objects

    for (let episode of episodeArray) {
        episode.epCode = createEpCode(episode); //this line creates a new value to pair with new key
    }

    return episodeArray;
}

function createEpCode(episode) {
    let strSeason = episode.season.toString();
    let strNumber = episode.number.toString();

    let epCode =
        "S" + strSeason.padStart(2, "0") + "E" + strNumber.padStart(2, "0");

    return epCode; //expected example: S02E01
}

module.exports = { generateNewEpisodeArray };

// using .map() to generate new array of GOT episode objects
//
// function addEpCodeToAll(inputArray) {
//     let modifiedArray = inputArray.map((episode) => {
//         const stringSeason = episode.season.toString().padStart(2, "0");
//         const stringNumber = episode.number.toString().padStart(2, "0");
//         const epCode = S${stringSeason}E${stringNumber};
//         let decoratedEpisodeObject = { ...episode, epCode };
//         return decoratedEpisodeObject;
//     });
//     return modifiedArray;
// }
