"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
var details = function () {
    return ({
        name: 'Check Video Write Tags',
        description: 'Check if a file has upto date Write Tags',
        style: {
            borderColor: 'orange',
        },
        tags: 'video',
        isStartPlugin: false,
        pType: '',
        requiresVersion: '2.11.01',
        sidebarPosition: -1,
        icon: 'faQuestion',
        inputs: [
        ],
        outputs: [
            {
                number: 1,
                tooltip: 'File has upto date stats',
            },
            {
                number: 2,
                tooltip: 'File does not have upto date stats',
            },
        ],
    });
};
exports.details = details;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var plugin = function (args) {
    var lib = require('../../../../../methods/lib')();
    var statsAreRecent = false;
    const THRESHOLD_MINUTES = 10080; // You can customize this
    const nowUtc = Date.now(); // Current UTC timestamp

    let datStats = Date.parse(new Date(0).toISOString()); // Safe fallback
    if (args.inputFileObj.ffProbeData.streams[0].tags !== undefined
        && args.inputFileObj.ffProbeData.streams[0].tags['_STATISTICS_WRITING_DATE_UTC'] !== undefined) {
        datStats = Date.parse(`${args.inputFileObj.ffProbeData.streams[0].tags['_STATISTICS_WRITING_DATE_UTC']}`);
    }

    const diffMinutes = (nowUtc - datStats) / (1000 * 60);
    if (diffMinutes > THRESHOLD_MINUTES) {
        args.jobLog('Statistics are too old or missing — continuing with script logic.');
    } else {
        args.jobLog('Statistics look fresh — no further action needed.');
        args.jobLog(`Current Date is "${nowUtc}".`);
        args.jobLog(`File Date is "${datStats}".`);
        args.jobLog(`Difference between them is "${diffMinutes}".`);
        statsAreRecent = true;
    }

    return {
        outputFileObj: args.inputFileObj,
        outputNumber: statsAreRecent ? 1 : 2,
        variables: args.variables,
    };
};
exports.plugin = plugin;
