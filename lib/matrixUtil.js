"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matrix_js_sdk_1 = __importDefault(require("matrix-js-sdk"));
const getSyncMatrixClient = async ({ user = process.env.CYPHERNODE_MATRIX_USER, password = process.env.CYPHERNODE_MATRIX_PASS, baseUrl = process.env.CYPHERNODE_MATRIX_SERVER }) => {
    const matrixClient = await matrix_js_sdk_1.default.createClient({
        baseUrl,
        initialSyncLimit: 10,
        timelineSupport: true
    });
    await matrixClient.login("m.login.password", {
        user,
        password
    });
    matrixClient.startClient();
    let syncFailCount = 0;
    return new Promise((res, rej) => {
        matrixClient.once("sync", (syncState, a, event) => {
            if (syncState === "ERROR") {
                debug("Matrix Sync error", event, syncState, a);
                if (event) {
                    if (!event.error.data) {
                        debug("event.error.data is missing: ", event.error);
                    }
                    if (event.error.data.errcode === "M_UNKNOWN_TOKEN") {
                        debug("toggleMatrixLoginModal", true);
                    }
                    matrixClient.stop();
                    rej(event);
                }
                if (syncFailCount >= 3) {
                    debug("error", "Could not connect to matrix more than 3 time. Disconnecting.");
                    // transportMatrixClient.stop();
                    rej(`Matrix client failed to sync more than ${syncFailCount}`);
                }
                else {
                    debug("error", `Could not connect to matrix server. ${syncFailCount ? "Attempt " + syncFailCount : ""}`);
                    syncFailCount++;
                }
            }
            else if (syncState === "SYNCING") {
                // update UI to remove any "Connection Lost" message
                syncFailCount = 0;
            }
            else if (syncState === "PREPARED") {
                res(matrixClient);
            }
        });
    });
};
exports.getSyncMatrixClient = getSyncMatrixClient;