"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.details = void 0;
var fileUtils_1 = require("../../../../FlowHelpers/1.0.0/fileUtils");
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable no-param-reassign */
var details = function () {
    return ({
        name: 'ffmpeg - Remux DoVi MKV',
        description: "\n  If input is MP4, then the video stream from that with other streams from original file into mp4.\n  Otherwise the file is an MKV, remux that as is into MP4. Unsupported audio streams are removed in the process.\n  ",
        style: {
            borderColor: '#6efefc',
        },
        tags: 'video',
        isStartPlugin: false,
        pType: '',
        requiresVersion: '2.11.01',
        sidebarPosition: -1,
        icon: '',
        inputs: [],
        outputs: [
            {
                number: 1,
                tooltip: 'Continue to next plugin',
            },
        ],
    });
};
exports.details = details;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var plugin = function (args) {
    var _a, _b;
    var extension = (0, fileUtils_1.getContainer)(args.inputFileObj._id);
    var outputFileId = '';
    var inputArguments = [];
    var outputArguments = [];

    // Map the video from the converted mkv file & map to the audio & subtiles of the original file
    inputArguments = [
        '-i', args.inputFileObj._id,
    ];
    outputArguments = [
        '-map', '1:a?', '-map', '1:s?', '-map_metadata', '1', '-c', 'copy'
    ];

    outputFileId = args.originalLibraryFile._id;

    (_a = args.variables.ffmpegCommand.overallInputArguments).push.apply(_a, inputArguments);
    (_b = args.variables.ffmpegCommand.overallOuputArguments).push.apply(_b, outputArguments);
    return {
        outputFileObj: {
            _id: outputFileId,
        },
        outputNumber: 1,
        variables: args.variables,
    };
};
exports.plugin = plugin;
