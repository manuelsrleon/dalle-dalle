export const createScenarioTable = 
    "CREATE TABLE IF NOT EXISTS SCENARIO ("+
    "type TEXT NOT NULL," +
    "title TEXT NOT NULL," +
    "subtitle TEXT," +
    "challenge_prompt TEXT NOT NULL," +
    "challenge_mediaPath TEXT," +
    "challenge_maxTime NUMERIC (0.0)," +
    "challenge_rfidObjectCode NOT NULL," +
    "success_text TEXT NOT NULL," +
    "success_mediaPath TEXT," +
    "success_soundPath TEXT," +
    "failure_text TEXT NOT NULL," +
    "failure_mediaPath TEXT," +
    "failure_soundPath TEXT" +
    ")"