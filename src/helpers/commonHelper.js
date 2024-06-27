const moment = require('moment');
const bcrypt = require('bcrypt');
const fs = require('fs');

module.exports = {
    generateUid: function (uid) {
        const uuid = require('uuid');
        uid = uuid.v4();
        return uid;
    },
    currentDatetime() {
        var d = moment().format("YYYY-MM-DD HH:mm:ss");
        return d;
    },
    currentDate() {
        var d = moment().format("YYYY-MM-DD");
        return d;
    },
    datetimeFormat(datetime) {
        return moment(datetime).format("MM-DD-YYYY h:mm a");
    },
    standardDatetime(datetime) {
        return moment(datetime).format("YYYY-MM-DD HH:mm:ss");
    },
    standardDateOnly(datetime) {
        return moment(datetime).format("YYYY-MM-DD");
    },
    dateFormat(datetime, format = "MM-DD-YYYY") {
        return moment(datetime).format(format);
    },
    encryptPassword(password) {
        const salt = bcrypt.genSaltSync(10);
        const pass = bcrypt.hashSync(password, salt);
        return pass;
    },
    comparePassword(password, hash) {
        if (bcrypt.compareSync(password, hash)) {
            return true;
        } else {
            return false;
        }
    },
    createJwtToken(uid) {
        var jwt = require('jsonwebtoken');
        var token = jwt.sign({ uid: uid }, process.env.JWT_TOKEN);
        return token;
    },
    verifyJWT(token) {
        var jwt = require('jsonwebtoken');
        if (jwt.verify(token, process.env.JWT_TOKEN)) {
            return true;
        }
        else {
            return false;
        }
    },
    generateOTP(length) {
        const otpGenerator = require('otp-generator');
        return 123456;
        // return otpGenerator.generate(length, { upperCaseAlphabets: false,lowerCaseAlphabets: false, specialChars: false });
    },
    apiResponse(array) {
        var json = Object.assign({}, array);
        return json;
    },
    date_diff(d1, d2, get_item) {
        var date1 = new Date(d1)
        var date2 = new Date(d2)
        var Difference_In_Time = date1.getTime() - date2.getTime();
        switch (get_item) {
            case 'month':
                return Math.round(Difference_In_Time / (1000 * 3600 * 24 * 30));
            case 'day':
                return Math.round(Difference_In_Time / (1000 * 3600 * 24));
            case 'hour':
                return Math.round(Difference_In_Time / (1000 * 3600));
            case 'minute':
                return Math.round(Difference_In_Time / (1000 * 60));
            case 'second':
                return Math.round(Difference_In_Time / 1000);
            default:
                break;
        }
    },
    addLog(data) {
        var d = moment().format("YYYY-MM-DD");
        var dt = moment().format("YYYY-MM-DD H:i:s");
        data = dt + ': ' + data;
        var filename = './logs/' + d + '_log.txt';
        fs.appendFile(filename, "\n\n" + data, function (err) {
            if (err) throw console.log(err);
        });
    },
    encrypto(text) {
        var key = process.env.ENCRYPTION_KEY;
        const crypto = require("crypto");
        const ENCRYPTION_KEY = key.substr(0, 32);
        const IV_LENGTH = 16;
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(
            "aes-256-cbc",
            Buffer.from(ENCRYPTION_KEY),
            Buffer.from(iv)
        );
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

        return iv.toString("hex") + ":" + encrypted.toString("hex");
    },
    decrypto(text) {
        var key = process.env.ENCRYPTION_KEY;
        const crypto = require("crypto");
        const ENCRYPTION_KEY = key.substr(0, 32);
        const IV_LENGTH = 16;
        const textParts = text.split(":");
        const iv = Buffer.from(textParts.shift(), "hex");
        const encryptedText = Buffer.from(textParts.join(":"), "hex");
        const decipher = crypto.createDecipheriv(
            "aes-256-cbc",
            Buffer.from(ENCRYPTION_KEY),
            iv
        );
        const decrypted = Buffer.concat([
            decipher.update(encryptedText),
            decipher.final(),
        ]);

        return decrypted.toString();
    },
    validateEmail(email) {
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegexp.test(email);
    },
    removeTZFromDate(datetime) {
        return datetime.toISOString().replace('T', ' ')
            .replace('Z', '');
    },
    generateString(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    addLeadingZeros(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    },
    addCronLog(data) {
        var d = moment().format("YYYY-MM-DD");
        var dt = moment().format("YYYY-MM-DD H:i:s");
        data = dt + ': ' + data;
        var filename = './logs/cron/' + d + '_log.txt';
        fs.appendFile(filename, "\n\n" + data, function (err) {
            if (err) throw console.log(err);
        });
    },
    calculateFeeAmount(num) {
        var per = process.env.FEE_PERCENTAGE;
        return ((num / 100) * per).toFixed(2);
    },
    sanitizeInput(input) {
        if (typeof input === 'object') {
            input = input;
        }
        else if (input) {
            input = input.trim();
        }
        else {
            input = null
        }
        return input;
    },
    hideEmailPartial(email) {
        return email.replace(/(.{2})(.*)(?=@)/,
            function (gp1, gp2, gp3) {
                for (let i = 0; i < gp3.length; i++) {
                    gp2 += "*";
                } return gp2;
            });
    },
    hidePhonePartial(phone) {
        return replaced = phone.slice(0, 2) + phone.slice(2).replace(/.(?=...)/g, '*');
    },
    isEmpty(object) {
        return Object.keys(object).length === 0
    },
    getCurrentWeek() {
        return moment().format('W');
    },
    addSilaLogs(data) {
        var d = moment().format("YYYY-MM-DD");
        var dt = moment().format("YYYY-MM-DD H:i:s");
        data = dt + ': ' + data;
        var filename = './logs/sila/' + d + '_log.txt';
        fs.appendFile(filename, "\n\n" + data, function (err) {
            if (err) throw console.log(err);
        });
    },
    addPlaidLogs(data) {
        var d = moment().format("YYYY-MM-DD");
        var dt = moment().format("YYYY-MM-DD H:i:s");
        data = dt + ': ' + data;
        var filename = './logs/plaid/' + d + '_log.txt';
        fs.appendFile(filename, "\n\n" + data, function (err) {
            if (err) throw console.log(err);
        });
    },
    addDwollaLogs(data) {
        var d = moment().format("YYYY-MM-DD");
        var dt = moment().format("YYYY-MM-DD H:i:s");
        data = dt + ': ' + data;
        var filename = './logs/dwolla/' + d + '_log.txt';
        fs.appendFile(filename, "\n\n" + data, function (err) {
            if (err) throw console.log(err);
        });
    },
    addApiLogs(apiname, data) {
        var d = moment().format("YYYY-MM-DD");
        var dt = moment().format("YYYY-MM-DD H:i:s");
        data = dt + ': ' + data;
        var filename = './logs/' + apiname + '/' + d + '_log.txt';
        fs.appendFile(filename, "\n\n" + data, function (err) {
            if (err) throw console.log(err);
        });
    },
    secureString(str) {
        var trailingCharsIntactCount = 4;
        str = new Array(str.length - trailingCharsIntactCount + 1).join('x') + str.slice(-trailingCharsIntactCount);
        return str;
    },
    simpleEncryptString(plainText) {
        return Buffer.from(plainText).toString('base64');

        /* const crypto = require("crypto");
        var secretKey = process.env.ENCRYPTION_KEY;
        const cipher = crypto.createCipher('aes-256-cbc', secretKey);
        let encrypted = cipher.update(plainText, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted; */
    },
    formatSSNNumber(ssn) {
        return ssn.slice(0, 3) + "-" + ssn.slice(3, 5) + "-" + ssn.slice(5, 9);
    },
    getCurrentWeekDates() {
        const currentDate = new Date();
        const currentDay = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)

        // Calculate the difference between the current day and the start of the week (Sunday)
        const daysSinceSunday = (currentDay + 7 - 0) % 7;

        // Calculate the start date of the current week by subtracting the daysSinceSunday from the current date
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - daysSinceSunday);

        // Calculate the end date of the current week by adding the remaining days (6 - daysSinceSunday)
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        return { startDate, endDate };
    },
    getCategoriesByMCCCode(code) {
        var category = {};
        if (code >= 4800 && code <= 499) {
            category = {
                name: 'Online Services',
                uid: '',
                id: '1'
            };
        }
        else if (code >= 5200 && code <= 5599) {
            category = {
                name: 'Shopping',
                uid: '',
                id: '2'
            };
        }
        else if (code >= 5600 && code <= 5699) {
            category = {
                name: 'Miscellaneous',
                uid: '',
                id: '5'
            };
        }
        else if (code >= 7900 && code <= 7999) {
            category = {
                name: 'Fitness & Sports',
                uid: '',
                id: '6'
            };
        }
        else if (code >= 7800 && code <= 7899) {
            category = {
                name: 'Entertainment',
                uid: '',
                id: '7'
            };
        }
        else if ((code >= 6010 && code <= 6012) || (code == 6014) || (code >= 6017 && code <= 6019)) {
            category = {
                name: 'Financial Services',
                uid: '',
                id: '8'
            };
        }
        else if (code == 5812 || code == 5814) {
            category = {
                name: 'Restaurants & Dining',
                uid: '',
                id: '9'
            };
        }
        else if (code == 7392 || code == 7393 || code == 7394) {
            category = {
                name: 'Professional Services',
                uid: '',
                id: '10'
            };
        }
        else if (code == 5732 || code == 5733) {
            category = {
                name: 'Electronics',
                uid: '',
                id: '11'
            };
        }
        else if ((code >= 5621 && code <= 5631) || (code >= 5651 && code <= 5655) || code == 5661) {
            category = {
                name: 'Clothing & Fashion',
                uid: '',
                id: '12'
            };
        }
        else if (5411 == 5200 || code == 5422 || (code >= 5441 && code <= 5443)) {
            category = {
                name: 'Groceries & Retail',
                uid: '',
                id: '13'
            };
        }
        else if ((code >= 3000 && code <= 3299) || (code >= 3500 && code <= 3999)) {
            category = {
                name: 'Travel & Lodging',
                uid: '',
                id: '4'
            };
        }
        else if ((code >= 8211 && code <= 8299)) {
            category = {
                name: 'Education',
                uid: '',
                id: '15'
            };
        }
        else if (code == 5541 || code == 5542) {
            category = {
                name: 'Gas',
                uid: '',
                id: '16'
            };
        }
        else if (code == 5912 || code == 5970 || code == 5971 || code == 5972 || code == 5975) {
            category = {
                name: 'Health & Beauty',
                uid: '',
                id: '17'
            };
        }
        return category;
    },

    getAllCurrentWeekDates() {
        const currentDate = new Date();
        const currentDay = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)

        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - currentDay); // Move to the beginning of the week

        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            weekDates.push(date.toISOString().slice(0, 10)); // Format: YYYY-MM-DD
        }

        return weekDates;
    },

    getPagination(page, size) {
        const limit = size ? +size : 100;
        const offset = page ? page * limit : 0;

        return { limit, offset };
    },

    getPagingData(dataset, page, limit) {
        const { count: totalItems, rows: data } = dataset;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, data, totalPages, currentPage };
    },

    getAllDatesBetweenTwoDates(startDate, endDate) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        let dateArray = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dateArray.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dateArray;
    },
    compareObjectArray(a, b) {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    },
    addStripeLogs(data) {
        var d = moment().format("YYYY-MM-DD");
        var dt = moment().format("YYYY-MM-DD H:i:s");
        data = dt + ': ' + data;
        var filename = './logs/stripe/' + d + '_log.txt';
        fs.appendFile(filename, "\n\n" + data, function (err) {
            if (err) throw console.log(err);
        });
    },

    getSystemName(ua) {
        $ = {};
        var name = null;
        if (/mobile/i.test(ua))
            name = 'Mobile';

        if (/like Mac OS X/.test(ua)) {
            $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
            $.iPhone = /iPhone/.test(ua);
            $.iPad = /iPad/.test(ua);
            name = `${$.iOS}, ${$.iPhone}, ${$.iPad} `;
        }

        if (/Android/.test(ua))
            name = /Android ([0-9\.]+)[\);]/.exec(ua)[1];

        if (/webOS\//.test(ua))
            name = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];

        if (/(Intel|PPC) Mac OS X/.test(ua))
            name = 'Mac OS ' + /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;

        if (/Windows NT/.test(ua))
            name = 'Windows ' + /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];

        return name;
    },

    getUserAgentName(userAgent) {
        let browserName = userAgent;

        if (userAgent.includes('MSIE')) {
            browserName = 'Internet Explorer';
        } else if (userAgent.includes('Trident')) {
            browserName = 'Internet Explorer 11';
        } else if (userAgent.includes('Edge')) {
            browserName = 'Microsoft Edge';
        } else if (userAgent.includes('Chrome')) {
            browserName = 'Google Chrome';
        } else if (userAgent.includes('Firefox')) {
            browserName = 'Mozilla Firefox';
        } else if (userAgent.includes('Safari') && userAgent.includes('Version/')) {
            browserName = 'Safari';
        } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
            browserName = 'Opera';
        }
        return browserName;
    },

    getDeviceType(userAgent) {
        let deviceType = 'Unknown';

        if (userAgent.includes('Mobi') || userAgent.includes('Android') || userAgent.includes('Mobile')) {
            deviceType = 'Mobile';
        } else if (userAgent.includes('Tablet') || userAgent.includes('iPad')) {
            deviceType = 'Tablet';
        } else {
            deviceType = 'Desktop/Laptop';
        }

        return deviceType;
    },

    removeFFFFFromIPv6(ipv6Address) {
        // Check if the IPv6 address is in IPv4-mapped IPv6 format
        if (ipv6Address.includes('::ffff:')) {
            // Remove the trailing ffff
            return ipv6Address.replace(/::ffff:/, '');
        }
    },

    getPreviousMonth(currentDate) {
        // Get the previous month
        const previousMonth = new Date(currentDate);
        previousMonth.setMonth(currentDate.getMonth() - 1);

        // Extract the year and month from the previous month
        const previousMonthYear = previousMonth.getFullYear();
        const previousMonthMonth = previousMonth.getMonth() + 1;
        return { month: previousMonthMonth, year: previousMonthYear }
    },

    daysBetweenDates(date1, date2) {
        date1 = new Date(date1);
        date2 = new Date(date2);
        const utcDate1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const utcDate2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const timeDifference = Math.abs(utcDate2 - utcDate1);
        const daysDifference = Math.floor(timeDifference / millisecondsPerDay);
        return daysDifference;
    },

    replacerFunc() {
        const visited = new WeakSet();
        return (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (visited.has(value)) {
                    return;
                }
                visited.add(value);
            }
            return value;
        };
    },

    addOrumLogs(data) {
        var d = moment().format("YYYY-MM-DD");
        var dt = moment().format("YYYY-MM-DD H:i:s");
        data = dt + ': ' + data;
        var filename = './logs/orum/' + d + '_log.txt';
        fs.appendFile(filename, "\n\n" + data, function (err) {
            if (err) throw console.log(err);
        });
    },

    addUpwardliLogs(data) {
        var d = moment().format("YYYY-MM-DD");
        var dt = moment().format("YYYY-MM-DD H:i:s");
        data = dt + ': ' + data;
        var filename = './logs/upwardli/' + d + '_log.txt';
        fs.appendFile(filename, "\n\n" + data, function (err) {
            if (err) throw console.log(err);
        });
    },

    hoursBetweenDates(date1, date2) {
        const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
        const hours = diffInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
        return hours;
    },

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    addCheckbookiLogs(data) {
        
        var d = moment().format("YYYY-MM-DD");
        var dt = moment().format("YYYY-MM-DD H:m:s");
        data = dt + ': ' + data;
        var filename = './logs/checkbook/' + d + '_log.txt';
        fs.appendFile(filename, "\n\n" + data, function (err) {
            if (err) throw console.log(err);
        });
    },

    moveFile(oldPath, newPath) {
        return new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(oldPath);
            const writeStream = fs.createWriteStream(newPath);
            readStream.on('error', reject);
            writeStream.on('error', reject);
            writeStream.on('finish', () => {
                fs.unlink(oldPath, (err) => {
                    if (err) reject(err);
                    resolve();
                });
            });
            readStream.pipe(writeStream);
        });
    }
}