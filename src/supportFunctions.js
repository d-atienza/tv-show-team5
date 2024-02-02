function createEpCode(episode) {
    let strSeason = episode.season.toString();

    let strNumber = episode.number.toString();

    let epCode =
        "S" + strSeason.padStart(2, "0") + "E" + strNumber.padStart(2, "0");

    return epCode; //S02E01
}

module.exports = { createEpCode };
