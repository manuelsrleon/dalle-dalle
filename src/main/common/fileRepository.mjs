const fs = require('fs');

class FileRepository {
    constructor(filePath) {
        this.filePath = filePath;
    }

    // Method to load and parse the JSON file
    loadJsonFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err); // Reject the promise on error
                } else {
                    try {
                        const jsonData = JSON.parse(data); // Parse JSON data
                        resolve(jsonData); // Resolve the promise with parsed data
                    } catch (parseErr) {
                        reject(parseErr); // Reject the promise on parse error
                    }
                }
            });
        });
    }
}

module.exports = FileRepository;
